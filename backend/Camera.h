#ifndef CAMERA_H
#define CAMERA_H

#include "Dispositivo.h"

// HERANÇA: Camera é um tipo de Dispositivo
class Camera: public Dispositivo {
private:
    bool gravando; // Atributo específico da câmera

public:
    // Construtor: inicializa a base e o atributo específico (gravando)
    Camera(int id, std::string nome) 
        : Dispositivo(id, nome), gravando(false) {}

    // Implementação dos métodos virtuais (Polimorfismo)
    void ligar() override {
        setLigado(true);
        gravando = true; // Câmeras gravam ao serem ativadas
    }

    void desligar() override {
        setLigado(false);
        gravando = false;
    }

    void exibirStatus() const override {
        std::cout << "Camera: " << getNome() << " | Gravando: " << (gravando ? "Sim" : "Não") << std::endl;
    }

    //COMUNICAÇÃO COM O FRONTEND: O React usa tipo: camera para mostrar o ícone de vídeo e o status de gravação
    std::string paraJSON() const override {
        return "{\"id\":" + std::to_string(getId()) + 
               ", \"nome\":\"" + getNome() + 
               "\", \"tipo\":\"camera\", \"ligado\":" + (isLigado() ? "true" : "false") + 
               ", \"gravando\":" + (gravando ? "true" : "false") + "}";
    }
};

#endif