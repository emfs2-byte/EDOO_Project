#include "httplib.h"
#include "GerenciadorMemoria.h"
#include "Lampada.h"
#include "Camera.h"

int main() {
    GerenciadorMemoria memoria; // Nosso banco de dados
    httplib::Server svr;

    // Criando os dados iniciais na memória RAM
    memoria.adicionar(std::make_unique<Lampada>(1, "Luz da Sala"));
    memoria.adicionar(std::make_unique<Camera>(2, "Camera Portao"));

    // ROTA GET: O React pede os dados para desenhar a tela
    svr.Get("/api/status", [&](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*"); // Libera acesso para o site (CORS)
        
        std::string corpo = "{\"dispositivos\":" + memoria.gerarRelatorioJSON() + "}";
        res.set_content(corpo, "application/json");
    });

    // ROTA POST: O React avisa que o usuário clicou em um botão
    svr.Post(R"(/api/dispositivo/(\d+)/toggle)", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        
        int id = std::stoi(req.matches[1]); // Pega o ID da URL
        
        if (memoria.alternarStatusPorId(id)) {
            res.set_content("{\"status\":\"ok\"}", "application/json");
        } else {
            res.status = 404;
        }
    });

    std::cout << "Servidor rodando em http://localhost:8080" << std::endl;
    svr.listen("0.0.0.0", 8080);

    return 0;
}