#include <iostream>
#include <memory>
#include "httplib.h"              // Biblioteca para o Servidor HTTP
#include "GerenciadorMemoria.h"    // Nosso "Banco de Dados" na RAM
#include "Lampada.h"               // Classe da Lâmpada
#include "ArCondicionado.h"        // Classe do Ar Condicionado
#include "Camera.h"       // Classe da Câmara

int main() {
    // Criamos o objeto que vai segurar todos os dispositivos na memória RAM.
    GerenciadorMemoria memoria;

    // Adicionamos os dispositivos iniciais. Usamos make_unique para 
    // segurança de memória (C++ Moderno).
    memoria.adicionar(std::make_unique<Lampada>(1, "Luz da Sala"));
    memoria.adicionar(std::make_unique<ArCondicionado>(2, "Arcondicionado"));
    memoria.adicionar(std::make_unique<Camera>(3, "Câmara da Entrada"));

    //CONFIGURAÇÃO DO SERVIDOR
    httplib::Server svr;

    // ROTA GET: O Frontend (React) chama esta rota para desenhar a interface.
    // Ela retorna o estado de todos os dispositivos em formato JSON.
    svr.Get("/api/status", [&](const httplib::Request&, httplib::Response& res) {
        // CORS: Permite que o navegador aceite dados vindos do servidor C++
        res.set_header("Access-Control-Allow-Origin", "*"); 
        
        // Montamos o corpo da resposta chamando o gerador de JSON do nosso gerenciador
        std::string jsonFinal = "{\"dispositivos\":" + memoria.gerarRelatorioJSON() + "}";
        
        res.set_content(jsonFinal, "application/json");
        std::cout << "[GET] Status enviado para o Frontend." << std::endl;
    });

    // ROTA POST: O Frontend chama esta rota quando o usuário clica num botão.
    // O (\d+) captura o ID do dispositivo diretamente da URL (ex: /api/dispositivo/1/toggle)
    svr.Post(R"(/api/dispositivo/(\d+)/toggle)", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        
        // Converte o ID capturado na URL de string para inteiro
        int id = std::stoi(req.matches[1]);
        
        // Tenta alternar o status (Ligar/Desligar) no Gerenciador
        if (memoria.alternarStatusPorId(id)) {
            res.set_content("{\"status\":\"sucesso\"}", "application/json");
            std::cout << "[POST] Dispositivo " << id << " alterado com sucesso." << std::endl;
        } else {
            res.status = 404; // Caso o ID enviado pelo site não exista no C++
            res.set_content("{\"erro\":\"Dispositivo nao encontrado\"}", "application/json");
        }
    });

    // 4. INICIALIZAÇÃO
    std::cout << "------------------------------------------" << std::endl;
    std::cout << "  SERVIDOR SMARTCIN C++ EM EXECUCAO     " << std::endl;
    std::cout << "  Endereço: http://localhost:8080         " << std::endl;
    std::cout << "------------------------------------------" << std::endl;

    // O servidor fica "escutando" na porta 8080 de qualquer IP (0.0.0.0)
    svr.listen("0.0.0.0", 8080);

    return 0;
}