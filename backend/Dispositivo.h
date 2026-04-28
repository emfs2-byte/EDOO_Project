#ifndef DISPOSITIVO_H
#define DISPOSITIVO_H

#include <string>
#include <iostream>

// Encapsulamento id e ligado não são acesssiveis diretamente
// pelas classes filhas nem por ninguém de fora.
class Dispositivo{
private:
    int id;
    bool ligado;

// as classes filhas podem ler,
// mas ninguém de fora consegue alterar diretamente.

protected:
    // as classes filhas podem ler,
    // mas ninguém de fora consegue alterar diretamente.
    std::string nome;


    // setter : só as filhas podem mudar o estado ligado/desligado
    void setLigado(bool estado){
        ligado = estado;
    }
   
public:
    // construtor
    Dispositivo(int id, const std::string& nome) {
    this->id   = id;  
    this->nome = nome;
    ligado = false;
    }
    //Destrutor 
    //Sem isso, ao fazer delete em um ponteiro Dispositivo*,
    // o destrutor da classe filha NUNCA seria chamado
    virtual ~Dispositivo() = default;
    
    // Métodos virtuais puros: definem a interface que todas as classes filhas devem seguir
    //obrigam cada classe filha a implementar
    virtual void        ligar()          = 0;
    virtual void        desligar()       = 0;
    virtual void        exibirStatus()   const = 0;
    virtual std::string paraJSON()       const = 0;

    // Getters públicos para acesso somente leitura dos atributos privados
    // Mantêm o encapsulamento: ninguém pode modificar diretamente os valores
    // Essenciais  para o servidor acessar dados e gerar JSON
    int getId() const { return id; }
    bool isLigado() const { return ligado; }
    std::string getNome() const { return nome; }
};

#endif