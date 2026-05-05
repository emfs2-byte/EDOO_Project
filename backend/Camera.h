#ifndef CAMERA_H
#define CAMERA_H

#include "Dispositivo.h"
#include <iostream> // Importante para o std::cout

// HERANÇA: Camera é um tipo de Dispositivo
class Camera: public Dispositivo {
private:
    bool gravando; 

public:
    Camera(int id, std::string nome) 
        : Dispositivo(id, nome), gravando(false) {}

    // Implementação dos métodos virtuais (Polimorfismo)
    void ligar() override {
        setLigado(true);
        gravando = true;
        // Log para aparecer no servidor
        std::cout << "[CAM] " << getNome() << " ligada. Iniciando gravacao (REC)..." << std::endl;
    }

    void desligar() override {
        setLigado(false);
        gravando = false;
        // Log para aparecer no terminal do backend
        std::cout << "[CAM] " << getNome() << " desligada. Gravacao interrompida." << std::endl;
    }

    void exibirStatus() const override {
        std::cout << "Camera: " << getNome() 
                  << " | Status: " << (isLigado() ? "ON" : "OFF")
                  << " | Gravando: " << (gravando ? "Sim" : "Nao") << std::endl;
    }
    // COMUNICAÇÃO COM O FRONTEND: O React usa o campo "tipo": "camera" e o campo "gravando" para mostrar o status de gravação
    std::string paraJSON() const override {
        return "{\"id\":" + std::to_string(getId()) + 
               ", \"nome\":\"" + getNome() + 
               "\", \"tipo\":\"camera\", \"ligado\":" + (isLigado() ? "true" : "false") + 
               ", \"gravando\":" + (gravando ? "true" : "false") + "}";
    }
};

#endif