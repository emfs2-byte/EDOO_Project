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

    //obrigam cada classe filha a implementar
    virtual void        ligar()          = 0;
    virtual void        desligar()       = 0;
    virtual void        exibirStatus()   const = 0;
    virtual std::string paraJSON()       const = 0;
 
};
