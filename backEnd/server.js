// Importação das bibliotecas necessárias
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// Criação do servidor Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;  // Porta onde o servidor vai rodar
const SERIAL_PORT = "COM3"; // Substitua pelo valor correto da sua porta. Altere para a porta correta do seu Arduino (ex: Linux/Mac: /dev/ttyUSB0 ou /dev/ttyACM0)
const BAUD_RATE = 115200;  // A taxa de transmissão do Arduino

// Servindo os arquivos estáticos (HTML, JS, CSS)
app.use(express.static("frontEnd"));  // Servindo o conteúdo da pasta frontEnd

// Configuração da porta serial (comunicação com Arduino)
const serialPort = new SerialPort(SERIAL_PORT, { baudRate: BAUD_RATE });
const parser = serialPort.pipe(new Readline({ delimiter: "\n" }));

// Dados iniciais para evitar erros antes de receber dados do Arduino
let eegData = {
    delta: Array(50).fill(100),
    theta: Array(50).fill(90),
    lowAlpha: Array(50).fill(80),
    highAlpha: Array(50).fill(70),
    lowBeta: Array(50).fill(60),
    highBeta: Array(50).fill(50),
    lowGamma: Array(50).fill(40),
    highGamma: Array(50).fill(30),
    attention: 100,
    meditation: 90,
};

// Processando os dados recebidos da porta serial
parser.on("data", (line) => {
    try {
        const signal = parseFloat(line); // Converte os dados da porta serial para número
        eegData.delta.push(signal);  // Adiciona o sinal na banda delta
        eegData.delta.shift();  // Remove o valor mais antigo para manter o array com tamanho fixo
    } catch (err) {
        console.error("Erro ao processar dados:", err.message);
    }
});

// WebSocket para comunicação com o frontend
io.on("connection", (socket) => {
    console.log("Cliente conectado");

    // Envia os dados para o cliente (frontend)
    const interval = setInterval(() => {
        socket.emit("data", JSON.stringify(eegData));
    }, 1000);  // Envia dados a cada 1 segundo

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
        clearInterval(interval);  // Para o envio dos dados quando o cliente se desconectar
    });
});

// Iniciando o servidor na porta configurada
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});