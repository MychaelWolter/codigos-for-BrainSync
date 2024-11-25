// Variáveis globais para dados e gráficos
let numPoints = 50;
let delta = [], theta = [], lowAlpha = [], highAlpha = [], lowBeta = [], highBeta = [], lowGamma = [], highGamma = [];
let targetDelta = [], targetTheta = [], targetLowAlpha = [], targetHighAlpha = [], targetLowBeta = [], targetHighBeta = [], targetLowGamma = [], targetHighGamma = [];
let displayedDelta = [], displayedTheta = [], displayedLowAlpha = [], displayedHighAlpha = [], displayedLowBeta = [], displayedHighBeta = [], displayedLowGamma = [], displayedHighGamma = [];
let attention = 0, meditation = 0;
let targetAttention = 0, targetMeditation = 0;
let displayedAttention = 0, displayedMeditation = 0;

let running = false; // Estado do sistema
let socket;          // Conexão com o servidor Node.js
let lastUpdateTime = 0;
let updateInterval = 1000; // Intervalo de atualização de dados (ms)

// Configuração inicial do sketch (p5.js)
function setup() {
    const container = document.getElementById("canvasContainer");
    const containerStyles = window.getComputedStyle(container);
    const width = parseFloat(containerStyles.width);
    const height = parseFloat(containerStyles.height);

    const canvas = createCanvas(width, height);
    canvas.parent("canvasContainer");

    frameRate(30);

    initializeData(); // Inicializa arrays com valores padrão

    document.getElementById("startButton").addEventListener("click", startSimulation);
    document.getElementById("stopButton").addEventListener("click", stopSimulation);

    window.addEventListener("resize", handleResize);
}

// Redimensiona o canvas ao alterar o tamanho da janela
function handleResize() {
    const container = document.getElementById("canvasContainer");
    const containerStyles = window.getComputedStyle(container);
    const newWidth = parseFloat(containerStyles.width);
    const newHeight = parseFloat(containerStyles.height);

    resizeCanvas(newWidth, newHeight);
}

// Loop principal (p5.js)
function draw() {
    background(255);

    if (running) {
        drawWaves();            // Renderiza as ondas cerebrais
        drawBarsAndLabels();    // Renderiza barras e rótulos

        if (millis() - lastUpdateTime > updateInterval) {
            lastUpdateTime = millis();
        }
    }

    document.getElementById("status").textContent = `Status: ${running ? "Transmitindo" : "Parado"}`;
}

// Inicializa os arrays de dados
function initializeData() {
    for (let i = 0; i < numPoints; i++) {
        delta.push(0); targetDelta.push(0); displayedDelta.push(0);
        theta.push(0); targetTheta.push(0); displayedTheta.push(0);
        lowAlpha.push(0); targetLowAlpha.push(0); displayedLowAlpha.push(0);
        highAlpha.push(0); targetHighAlpha.push(0); displayedHighAlpha.push(0);
        lowBeta.push(0); targetLowBeta.push(0); displayedLowBeta.push(0);
        highBeta.push(0); targetHighBeta.push(0); displayedHighBeta.push(0);
        lowGamma.push(0); targetLowGamma.push(0); displayedLowGamma.push(0);
        highGamma.push(0); targetHighGamma.push(0); displayedHighGamma.push(0);
    }
    attention = 0; meditation = 0;
    targetAttention = 0; targetMeditation = 0;
    displayedAttention = 0; displayedMeditation = 0;
}

// Estabelece conexão com o backend via WebSocket
function initializeSocket() {
    socket = io("http://localhost:3000");

    socket.on("data", (data) => {
        const parsedData = JSON.parse(data);

        // Atualiza os valores das ondas cerebrais e atenção/meditação
        targetDelta = parsedData.delta;
        targetTheta = parsedData.theta;
        targetLowAlpha = parsedData.lowAlpha;
        targetHighAlpha = parsedData.highAlpha;
        targetLowBeta = parsedData.lowBeta;
        targetHighBeta = parsedData.highBeta;
        targetLowGamma = parsedData.lowGamma;
        targetHighGamma = parsedData.highGamma;

        targetAttention = parsedData.attention;
        targetMeditation = parsedData.meditation;
    });

    socket.on("disconnect", () => {
        console.error("Conexão com o servidor perdida!");
    });
}

// Renderiza as ondas cerebrais como gráficos de área
function drawWaves() {
    let xStep = (width + 50) / numPoints;

    for (let i = 0; i < numPoints; i++) {
        displayedDelta[i] = lerp(displayedDelta[i], targetDelta[i], 0.1);
        displayedTheta[i] = lerp(displayedTheta[i], targetTheta[i], 0.1);
        displayedLowAlpha[i] = lerp(displayedLowAlpha[i], targetLowAlpha[i], 0.1);
        displayedHighAlpha[i] = lerp(displayedHighAlpha[i], targetHighAlpha[i], 0.1);
        displayedLowBeta[i] = lerp(displayedLowBeta[i], targetLowBeta[i], 0.1);
        displayedHighBeta[i] = lerp(displayedHighBeta[i], targetHighBeta[i], 0.1);
        displayedLowGamma[i] = lerp(displayedLowGamma[i], targetLowGamma[i], 0.1);
        displayedHighGamma[i] = lerp(displayedHighGamma[i], targetHighGamma[i], 0.1);
    }

    for (let i = 0; i < numPoints - 1; i++) {
        let x1 = i * xStep;
        let x2 = (i + 1) * xStep;

        drawLayer(displayedDelta, color(255, 255, 0, 150), x1, x2, height / 2);
        drawLayer(displayedTheta, color(255, 165, 0, 150), x1, x2, height / 2);
        drawLayer(displayedLowAlpha, color(255, 105, 180, 150), x1, x2, height / 2);
        drawLayer(displayedHighAlpha, color(255, 20, 147, 150), x1, x2, height / 2);
        drawLayer(displayedLowBeta, color(0, 191, 255, 150), x1, x2, height / 2);
        drawLayer(displayedHighBeta, color(0, 0, 255, 150), x1, x2, height / 2);
        drawLayer(displayedLowGamma, color(138, 43, 226, 150), x1, x2, height / 2);
        drawLayer(displayedHighGamma, color(75, 0, 130, 150), x1, x2, height / 2);
    }
}

// Renderiza camadas de dados individuais
function drawLayer(data, col, x1, x2, baseHeight) {
    fill(col);
    noStroke();

    beginShape();
    vertex(x1, baseHeight);
    vertex(x1, baseHeight - data[int(x1 / (width / numPoints))]);
    vertex(x2, baseHeight - data[int(x2 / (width / numPoints))]);
    vertex(x2, baseHeight);
    endShape(CLOSE);
}

// Renderiza barras e rótulos
function drawBarsAndLabels() {
    let labels = ["Atenção", "Meditação", "Delta", "Teta", "Alfa Baixo", "Alfa Alto", "Beta Baixo", "Beta Alto", "Gama Baixo", "Gama Alto"];
    let colors = [
        color(10, 10, 10),
        color(128, 128, 128),
        color(255, 255, 0),
        color(255, 165, 0),
        color(255, 105, 180),
        color(255, 20, 147),
        color(0, 191, 255),
        color(0, 0, 255),
        color(138, 43, 226),
        color(75, 0, 130),
    ];

    displayedAttention = lerp(displayedAttention, targetAttention, 0.1);
    displayedMeditation = lerp(displayedMeditation, targetMeditation, 0.1);

    let barWidth = width / labels.length;
    let barHeights = [
        displayedAttention,
        displayedMeditation,
        displayedDelta[0],
        displayedTheta[0],
        displayedLowAlpha[0],
        displayedHighAlpha[0],
        displayedLowBeta[0],
        displayedHighBeta[0],
        displayedLowGamma[0],
        displayedHighGamma[0],
    ];

    textSize(map(width, 0, 900, 6, 14));

    for (let i = 0; i < labels.length; i++) {
        fill(colors[i % colors.length]);
        rect(i * barWidth, height - 35, barWidth, -barHeights[i]);
        fill(0);
        textAlign(CENTER);

        let label = labels[i];
        let splitLabel = breakWord(label);

        if (splitLabel.length > 1) {
            text(splitLabel[0], i * barWidth + barWidth / 2, height - 22);
            text(splitLabel[1], i * barWidth + barWidth / 2, height - 22 + textSize());
        } else {
            text(label, i * barWidth + barWidth / 2, height - 22);
        }
    }
}

// Função auxiliar para dividir palavras grandes em duas linhas, se necessário
function breakWord(word) {
    if (word === "Atenção") {
        return ["Aten-", "ção"];
    } else if (word === "Meditação") {
        return ["Medi-", "tação"];
    }

    if (word === "Delta" || word === "Teta") {
        return [word];
    }

    let mid = Math.floor(word.length / 2);
    return [word.slice(0, mid), word.slice(mid)];
}

// Inicia a simulação (conexão WebSocket)
function startSimulation() {
    if (!socket) initializeSocket(); // Inicia a conexão WebSocket se ainda não estiver ativa
    running = true;
}

// Para a simulação
function stopSimulation() {
    running = false;
}

// Inicializa o WebSocket
function initializeSocket() {
    socket = io("http://localhost:3000");

    socket.on("data", (data) => {
        const parsedData = JSON.parse(data);

        targetDelta = parsedData.delta;
        targetTheta = parsedData.theta;
        targetLowAlpha = parsedData.lowAlpha;
        targetHighAlpha = parsedData.highAlpha;
        targetLowBeta = parsedData.lowBeta;
        targetHighBeta = parsedData.highBeta;
        targetLowGamma = parsedData.lowGamma;
        targetHighGamma = parsedData.highGamma;

        targetAttention = parsedData.attention;
        targetMeditation = parsedData.meditation;
    });

    socket.on("disconnect", () => {
        console.error("Conexão com o servidor perdida!");
    });
}