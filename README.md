Descrição do Projeto

Este projeto consiste em uma aplicação completa que coleta dados de um dispositivo EEG, processa-os em um servidor Node.js e exibe visualizações interativas no navegador usando p5.js. O objetivo principal é criar um sistema de monitoramento de ondas cerebrais que pode ser simulado ou conectado a hardware real.



Índice

1. Requisitos do Sistema
2. Configuração do Ambiente Arduino
    - Download do Arduino IDE
    - Configuração e bibliotecas necessárias
3. Configuração do Servidor Node.js
    - Instalação do Node.js
    - Dependências necessárias
4. Configuração do Frontend (p5.js)
    - Como rodar o cliente
5. Execução do Projeto



Requisitos do Sistema

1. Sistema Operacional: Windows, macOS ou Linux
2. Ferramentas Necessárias:
    - Arduino IDE
- Node.js
- Navegador atualizado (Google Chrome ou Firefox recomendado)



Configuração do Ambiente Arduino

1. Download e Instalação do Arduino IDE
    - Acesse o site oficial do Arduino: Arduino Downloads.
    - Baixe a versão correspondente ao seu sistema operacional (Windows, macOS ou Linux).
    - Instale o Arduino IDE seguindo as instruções do instalador.

2. Configuração e Bibliotecas Necessárias
    - Conecte o seu dispositivo Arduino ao computador via cabo USB.
    - Abra o Arduino IDE.
    - Vá até Ferramentas > Placa e selecione a placa correta (por exemplo, Arduino Uno ou Nano).
    - Vá até Ferramentas > Porta e selecione a porta serial onde o Arduino está conectado.
    - Instale as bibliotecas necessárias:
        - Abra o Gerenciador de Bibliotecas (em Sketch > Incluir Biblioteca > Gerenciar Bibliotecas).
        - Procure e instale as seguintes bibliotecas:
            - SoftwareSerial (se não estiver incluída por padrão).
            - Qualquer biblioteca adicional indicada no código (BioAmp, por exemplo).
           
3. Carregar o Código no Arduino
    - Abra o arquivo BioAmpEXGPill.cpp no Arduino IDE.
    - Verifique o código clicando no botão de check (✔️).
    - Carregue o código no Arduino clicando no botão de upload (⮅).



Configuração do Servidor Node.js

1. Download e Instalação do Node.js
    - Acesse o site oficial do Node.js: Node.js Downloads.
    - Baixe a versão LTS recomendada.
    - Instale o Node.js seguindo as instruções do instalador. Durante a instalação, marque a opção para adicionar o Node.js ao PATH.

2. Configuração do Servidor
    - Abra o terminal ou prompt de comando.
    - Navegue até o diretório onde o arquivo server.js está localizado.
    - Instale as dependências necessárias executando:

    npm install

    Dependências incluídas no projeto:

    - express
    - socket.io
    - serialport

    Para iniciar o servidor, execute:

    - node server.js

    O servidor será iniciado no endereço http://localhost:3000. Certifique-se de que não há outro serviço usando esta porta.



Configuração do Frontend (p5.js)

1. Requisitos para o Frontend

Certifique-se de que o navegador suporta JavaScript moderno. Não é necessário instalar nada extra no navegador, pois o p5.js é carregado automaticamente no projeto.

2. Configuração

    - O código frontend já está configurado para se conectar ao servidor via WebSocket.
    - Certifique-se de que o servidor está rodando antes de abrir o arquivo HTML correspondente ao cliente.
    - Abra o arquivo HTML principal no navegador, como index.html (ou inicie um servidor local se necessário).



Execução do Projeto

    - Conecte o dispositivo EEG (se disponível) ao Arduino.
    - Inicie o servidor Node.js executando node server.js.
    - Abra o navegador e carregue o frontend acessando http://localhost:3000 ou abrindo o arquivo index.html.
    - Visualize os gráficos e interaja com as representações das ondas cerebrais!



Notas Adicionais

    - Para simulação de dados, ative o modo de simulação no server.js modificando as variáveis apropriadas.
    - Para depuração, use ferramentas como o Monitor Serial (no Arduino IDE) e o console do navegador para capturar logs e mensagens de erro.