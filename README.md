# SmartHome.cin - Ecosystem Simulator

O **SmartHome.cin** é um simulador de ecossistema residencial inteligente desenvolvido como projeto para a disciplina de **Estrutura de Dados e Orientação a Objetos (EDOO)** no Centro de Informática (CIn - UFPE).

O projeto demonstra como os conceitos de Programação Orientada a Objetos (POO) podem ser aplicados para resolver problemas reais de interoperabilidade entre dispositivos IoT (Internet of Things) de diferentes fabricantes e funções, utilizando um Smart Hub centralizado

---

## 🚀 Sobre o Projeto

O coração do simulador é um **Smart Hub** centralizado escrito em **C++**. Este servidor gerencia dispositivos heterogêneos (Lâmpadas, Ar-Condicionado, Câmeras de Segurança) e expõe uma API REST para que uma interface moderna em **React** possa controlar a residência em tempo real.

### Principais Funcionalidades:
- **Painel de Controle:** Visualização em tempo real de quais dispositivos estão ativos.
- **Gestão de Energia:** Cálculo dinâmico do consumo estimado da residência em Watts.
- **Ações Específicas:** - Ajuste de temperatura para sistemas de climatização (Ar-Condicionado).
    - Status de gravação em tempo real (REC) para câmeras.
    - Controle de on/off para iluminação.
- **Feedback Visual:** Terminal do backend loga cada ação processada via Polimorfismo, exibindo mensagens personalizadas para cada tipo de hardware.

---

## 🏗️ Arquitetura e Conceitos de POO

O projeto foi construído sobre os pilares da Programação Orientada a Objetos para garantir escalabilidade e organização:

### 1. Herança e Classes Abstratas
Todos os dispositivos (Lâmpada, Ar-Condicionado, Câmera) herdam de uma classe base comum `Dispositivo`. Isso garante que todos possuam atributos básicos como `id`, `nome` e `status`, mas permite que cada um tenha suas particularidades.

### 2. Encapsulamento
Os atributos sensíveis, como a temperatura do Ar-Condicionado ou o status de gravação da Câmera, são protegidos (`private`/`protected`). O acesso e a modificação desses dados ocorrem exclusivamente através de métodos controlados (Getters e Setters), garantindo a integridade do estado do sistema.

### 3. Polimorfismo
O Smart Hub armazena ponteiros genéricos para a classe base. Quando o comando "ligar" é enviado, o C++ utiliza **binding dinâmico** para decidir em tempo de execução se deve executar o comportamento específico de uma lâmpada ou iniciar a gravação de uma câmera.

### 4. Gestão de Memória
Uso de C++ moderno com `std::unique_ptr` e destrutores virtuais para garantir que toda a memória alocada dinamicamente seja limpa corretamente, evitando vazamentos de memória (*memory leaks*).

---

## 🛠️ Tecnologias Utilizadas

### Backend (C++):
- **httplib.h:** Biblioteca single-header para criação do servidor HTTP.
- **nlohmann/json:** Para comunicação de dados formatados com o frontend.
- **WinSock2:** Para gestão de sockets e rede no Windows.

### Frontend (React):
- **Vite:** Build tool rápida para o ambiente React.
- **Tailwind CSS:** Para estilização responsiva e interface *dark mode*.
- **Phosphor Icons:** Biblioteca de ícones vetoriais modernos.

---

## 💻 Como Compilar e Rodar

### Pré-requisitos:
- Compilador C++ (GCC/MinGW recomendado).
- Node.js e npm (para o frontend).

### 1. Preparando o Backend (C++)
Navegue até a pasta do servidor e compile os arquivos:
```bash
# Compilação via G++ (Linkando a biblioteca de sockets do Windows)
g++ main.cpp GerenciadorMemoria.cpp -o servidor -lws2_32

# Execute o servidor
./servidor

### 2. Preparando o Frontend 
# Navegue até a pasta web-ui
# execute o frontend
npm run dev

