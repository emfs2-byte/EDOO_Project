#ifndef GERENCIADOR_MEMORIA_H
#define GERENCIADOR_MEMORIA_H

#include <vector>
#include <memory>  // Necessário para unique_ptr
#include "Dispositivo.h"

class GerenciadorMemoria {
private:
    // O CORAÇÃO DO BACKEND: Um vetor que guarda qualquer classe que herde de Dispositivo.
    // unique_ptr garante que quando o gerenciador for destruído, todos os dispositivos sumam da RAM.
    std::vector<std::unique_ptr<Dispositivo>> dispositivos;

public:
    // Adiciona um novo dispositivo à ao banco de dados (memória)
    void adicionar(std::unique_ptr<Dispositivo> d) {
        dispositivos.push_back(std::move(d));
    }

    // Percorremos o vetor procurando o ID enviado pelo React
    bool alternarStatusPorId(int id) {
        for (size_t i = 0; i < dispositivos.size(); ++i) {
            if (dispositivos[i]->getId() == id) {
                // Se estiver ligado, desliga. Se desligado, liga.
                if (dispositivos[i]->isLigado()) {
                    dispositivos[i]->desligar();
                } else {
                    dispositivos[i]->ligar();
                }
                return true; // Sucesso: achou e alterou
            }
        }
        return false; // Não achou o ID
    }

    // GERA O JSON PARA O FRONTEND: Varre a memória e cria o array de objetos
    std::string gerarRelatorioJSON() {
        std::string json = "[";
        for (size_t i = 0; i < dispositivos.size(); ++i) {
            json += dispositivos[i]->paraJSON();
            // Adiciona vírgula entre os itens, exceto no último
            if (i < dispositivos.size() - 1) {
                json += ",";
            }
        }
        json += "]";
        return json;
    }
};

#endif