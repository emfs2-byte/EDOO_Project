#ifndef ARCONDICIONADO_H
#define ARCONDICIONADO_H

#include "Dispositivo.h"
#include <stdexcept> // Necessário para lançar exceções de validação

// HERANÇA: ArCondicionado herda a classe Dispositivo
class ArCondicionado : public Dispositivo {
private:
    int temperatura; // Atributo exclusivo deste dispositivo

public:
    // CONSTRUTOR: Inicializa a base e define uma temperatura padrão (22 graus)
    ArCondicionado(int id, std::string nome) 
        : Dispositivo(id, nome), temperatura(22) {}

    // LÓGICA ESPECÍFICA: Só permite temperaturas entre 16 e 30 graus
    void setTemperatura(int t) {
        if (t >= 16 && t <= 30) {
            temperatura = t;
            std::cout << "[AC] Temperatura de " << getNome() << " ajustada para " << t << "°C" << std::endl;
        } else {
            // Lançamos um erro se o valor for inválido
            std::cout << "[ERRO] Temperatura " << t << " invalida!" << std::endl;
        }
    }

    // POLIMORFISMO: Implementação dos métodos obrigatórios
    void ligar() override {
        setLigado(true);
        std::cout << "[AC] " << getNome() << " ligado no modo refrigerar." << std::endl;
    }

    void desligar() override {
        setLigado(false);
        std::cout << "[AC] " << getNome() << " desligado." << std::endl;
    }

    void exibirStatus() const override {
        std::cout << "Ar Condicionado: " << getNome() 
                  << " | Status: " << (isLigado() ? "ON" : "OFF") 
                  << " | Temp: " << temperatura << "°C" << std::endl;
    }

    // Comunicação com o frontend: O React precisa dos campos "tipo" e "temperatura"
    std::string paraJSON() const override {
        return "{\"id\":" + std::to_string(getId()) + 
               ", \"nome\":\"" + getNome() + 
               "\", \"tipo\":\"ar_condicionado\", \"ligado\":" + (isLigado() ? "true" : "false") + 
               ", \"temperatura\":" + std::to_string(temperatura) + "}";
    }
};

#endif