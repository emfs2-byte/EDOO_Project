#ifndef LAMPADA_H
#define LAMPADA_H

#include "Dispositivo.h"

// HERANÇA: Lampada é um tipo de Dispositivo
class Lampada : public Dispositivo {
public:
    // Construtor: Repassa o ID e Nome para a classe base (Dispositivo)
    Lampada(int id, std::string nome) : Dispositivo(id, nome) {}

    // POLIMORFISMO: Implementação específica de ligar para a Lâmpada
    void ligar() override {
        setLigado(true);
        std::cout << "[LOG] Lampada " << getNome() << " acesa." << std::endl;
    }

    void desligar() override {
        setLigado(false);
        std::cout << "[LOG] Lampada " << getNome() << " apagada." << std::endl;
    }

    // Exibe status no console do Servidor (útil para debug)
    void exibirStatus() const override {
        std::cout << "Lampada ID: " << getId() << " | Nome: " << getNome() 
                  << " | Status: " << (isLigado() ? "Ligada" : "Desligada") << std::endl;
    }

    // COMUNICAÇÃO COM O FRONTEND: O React usa o campo "tipo": "luz" 
    std::string paraJSON() const override {
        return "{\"id\":" + std::to_string(getId()) + 
               ", \"nome\":\"" + getNome() + 
               "\", \"tipo\":\"luz\", \"ligado\":" + (isLigado() ? "true" : "false") + "}";
    }
};

#endif