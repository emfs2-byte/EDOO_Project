#include <winsock2.h>
#include <ws2tcpip.h>

#include <iostream>
#include <memory>
#include "httplib.h"
#include "GerenciadorMemoria.h"
#include "Lampada.h"
#include "ArCondicionado.h"
#include "Camera.h"

int main() {
    GerenciadorMemoria memoria;

    memoria.adicionar(std::make_unique<Lampada>(1, "Luz da Sala"));
    memoria.adicionar(std::make_unique<ArCondicionado>(2, "Arcondicionado"));
    memoria.adicionar(std::make_unique<Camera>(3, "Camara"));

    httplib::Server svr;

    // Isso responde às verificações prévias (pre-flight) do navegador
    svr.Options(R"(.*)", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.status = 200;
    });

    // ROTA GET: Status
    svr.Get("/api/status", [&](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*"); 
        std::string jsonFinal = "{\"dispositivos\":" + memoria.gerarRelatorioJSON() + "}";
        res.set_content(jsonFinal, "application/json");
        // std::cout << "[GET] Status enviado." << std::endl; 
    });

    // ROTA POST: Toggle (Ligar/Desligar)
    svr.Post(R"(/api/dispositivo/(\d+)/toggle)", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        int id = std::stoi(req.matches[1]);
        
        if (memoria.alternarStatusPorId(id)) {
            res.set_content("{\"status\":\"sucesso\"}", "application/json");
            std::cout << "[POST] Dispositivo " << id << " alternado." << std::endl;
        } else {
            res.status = 404;
            res.set_content("{\"erro\":\"Nao encontrado\"}", "application/json");
        }
    });

    // Rota: Mudar Temperatura do arcondicionado
    svr.Post(R"(/api/dispositivo/(\d+)/temperatura/(\d+))", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        
        int id = std::stoi(req.matches[1]);
        int novaTemp = std::stoi(req.matches[2]);
        
        // Busca o dispositivo na memória
        Dispositivo* dev = memoria.obterDispositivoPorId(id);
        
        if (!dev) {
            res.status = 404;
            res.set_content("{\"erro\":\"Dispositivo nao encontrado\"}", "application/json");
            return;
        }
        
        // Tenta converter para ArCondicionado (Downcasting)
        ArCondicionado* ar = dynamic_cast<ArCondicionado*>(dev);
        
        if (ar) {
            ar->setTemperatura(novaTemp); // Isso vai disparar o std::cout da sua classe!
            res.set_content("{\"status\":\"sucesso\"}", "application/json");
        } else {
            res.status = 400;
            res.set_content("{\"erro\":\"Dispositivo nao e um ar-condicionado\"}", "application/json");
        }
    });

    std::cout << "------------------------------------------" << std::endl;
    std::cout << "  SERVIDOR SMARTCIN C++ EM EXECUCAO      " << std::endl;
    std::cout << "  Endereco: http://localhost:8080         " << std::endl;
    std::cout << "------------------------------------------" << std::endl;

    svr.listen("0.0.0.0", 8080);

    return 0;
}