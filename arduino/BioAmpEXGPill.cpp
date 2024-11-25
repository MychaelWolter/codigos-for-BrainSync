#include <Arduino.h>

#define SAMPLE_RATE 256   // Taxa de amostragem (em Hz)
#define BAUD_RATE 115200  // Taxa de transmissão de dados para o computador
#define INPUT_PIN A0      // Pino analógico onde o BioAmp EXG Pill está conectado

void setup() {
    // Inicializa a comunicação serial com o computador
    Serial.begin(BAUD_RATE);
}

void loop() {
    static unsigned long lastTime = 0;
    unsigned long currentTime = micros();

    // Verifica se o intervalo de tempo para a amostragem foi atingido
    if (currentTime - lastTime >= 1000000 / SAMPLE_RATE) {
        lastTime = currentTime;

        // Lê o valor do sensor (do BioAmp EXG Pill)
        float sensorValue = analogRead(INPUT_PIN);
        
        // Filtra o valor (aplicação do filtro para eliminar ruído)
        float filteredSignal = EEGFilter(sensorValue);

        // Envia o sinal filtrado para o computador via porta serial
        Serial.println(filteredSignal);
    }
}

// Função para filtrar os dados do sinal (usando um filtro IIR)
float EEGFilter(float input) {
    static float z1, z2;  // Estado do filtro

    float x = input - -0.95391350 * z1 - 0.25311356 * z2; // Filtro de ordem 4
    input = 0.00735282 * x + 0.01470564 * z1 + 0.00735282 * z2;

    // Atualiza o estado do filtro
    z2 = z1;
    z1 = x;

    return input;  // Retorna o valor filtrado
}