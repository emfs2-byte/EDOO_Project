import React, { useState } from 'react';
import { Lightbulb, Snowflake, Thermometer, Drop, Wind, SquaresFour, ShareNetwork, Pulse, Stack, LockKey, TreeStructure, Shuffle, Cpu } from "@phosphor-icons/react";

// 1. COMPONENTES DE APOIO

function StatCard({ label, value, unit, colorClass }) {
  return (
    <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] flex flex-col gap-1 flex-1 min-w-[180px]">
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">{label}</p>
      <p className={`text-3xl font-bold ${colorClass}`}>
        {value}<span className="text-base ml-1 opacity-80">{unit}</span>
      </p>
    </div>
  );
}

function InfoItem({ label, value, colorClass = "text-white" }) {
  return (
    <div className="flex flex-col gap-1 pr-12 border-r border-gray-800 last:border-0">
      <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">{label}</span>
      <span className={`text-xl font-bold ${colorClass}`}>{value}</span>
    </div>
  );
}

function DeviceCard({ name, room, power, status, icon: Icon, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      className={`bg-[#161b22] p-6 rounded-2xl border cursor-pointer transition-all duration-500 ${
        status ? 'border-cyan-500/40 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)] scale-[1.02]' : 'border-[#30363d] hover:border-gray-600'
      }`}
    >
      <div className="flex justify-between items-start mb-10">
        <div className={`p-3 rounded-xl transition-all duration-500 ${status ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-gray-800 text-gray-600'}`}>
          <Icon size={28} weight={status ? "fill" : "regular"} />
        </div>
        
        {/* Toggle Switch */}
        <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${status ? 'bg-cyan-500' : 'bg-gray-700'}`}>
          <div className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${status ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-white font-bold text-lg tracking-tight">{name}</h3>
        <p className="text-gray-500 text-xs mt-1 font-medium">{room}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
        <span className={`font-mono text-base font-medium transition-colors ${status ? 'text-white' : 'text-gray-600'}`}>
          {power}W
        </span>
        <span className={`text-[9px] font-black px-2 py-1 rounded border tracking-tighter transition-all ${
          status ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' : 'border-gray-800 text-gray-600'
        }`}>
          {status ? 'LIGADO' : 'DESLIGADO'}
        </span>
      </div>
    </div>
  );
}

// Novo componente para os Cards de Funcionalidades
function FeatureCard({ title, description, icon: Icon, colorClass = "text-cyan-500" }) {
  return (
    <div className="bg-[#161b22]/60 p-8 rounded-2xl border border-[#30363d] hover:border-gray-600 transition-colors">
      <div className={`w-12 h-12 rounded-xl bg-[#0b0e14] border border-[#30363d] flex items-center justify-center mb-6 ${colorClass}`}>
        <Icon size={24} weight="regular" />
      </div>
      <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// 2. COMPONENTE PRINCIPAL

export default function App() {
  // Gerenciamento de estado dos dispositivos
  const [devices, setDevices] = useState([
    { id: 1, name: "Luminária Principal", room: "Sala de Estar", power: 12, status: true, icon: Lightbulb },
    { id: 2, name: "Abajur", room: "Quarto", power: 12, status: false, icon: Lightbulb },
    { id: 3, name: "Ar Condicionado", room: "Escritório", power: 150, status: true, icon: Snowflake },
  ]);

  // Dados das Funcionalidades
  const features = [
    { id: 1, title: "Controle Centralizado", desc: "Gerencie todos os dispositivos da residência a partir de um único hub inteligente, independente do tipo de hardware.", icon: SquaresFour, color: "text-cyan-500" },
    { id: 2, title: "Automação por Cenários", desc: "Ative modos pré-configurados como \"Modo Sair\" e \"Modo Segurança\" que coordenam múltiplos dispositivos automaticamente.", icon: ShareNetwork, color: "text-cyan-500" },
    { id: 3, title: "Monitoramento em Tempo Real", desc: "Visualize o estado atual...", icon: Pulse, color: "text-cyan-500" },
    { id: 4, title: "Gestão Heterogênea", desc: "Suporte a múltiplos tipos de hardware (lâmpadas, climatização, câmeras) tratados de forma genérica via polimorfismo.", icon: Stack, color: "text-cyan-500" },
    { id: 5, title: "Encapsulamento", desc: "Atributos internos dos dispositivos — como temperatura, brilho e status de gravação — são protegidos por modificadores de acesso e manipulados exclusivamente através de interfaces controladas (getters/setters), garantindo integridade dos dados.", icon: LockKey, color: "text-orange-400" },
    { id: 6, title: "Herança", desc: "Todos os tipos de dispositivo (lâmpada, ar-condicionado, câmera) derivam de uma classe base abstrata, herdando comportamentos comuns e especializando funcionalidades próprias — eliminando duplicação de código.", icon: TreeStructure, color: "text-orange-400" },
    { id: 7, title: "Polimorfismo", desc: "O hub central opera sobre ponteiros genéricos para a classe base, invocando métodos específicos de cada dispositivo em tempo de execução (dynamic binding). Isso permite tratar hardware heterogêneo de forma uniforme.", icon: Shuffle, color: "text-orange-400" },
    { id: 8, title: "Gestão de Memória", desc: "Destrutores virtuais na classe base garantem desalocação correta ao remover dispositivos do sistema. O contêiner central assume responsabilidade pelo ciclo de vida dos objetos alocados dinamicamente.", icon: Cpu, color: "text-orange-400" },
  ];

  // Função para alternar status
  const toggleDevice = (id) => {
    setDevices(prev => prev.map(dev => 
      dev.id === id ? { ...dev, status: !dev.status } : dev
    ));
  };

  // Cálculos automáticos baseados no estado
  const activeCount = devices.filter(d => d.status).length;
  const currentPower = devices.reduce((acc, d) => d.status ? acc + d.power : acc, 0);

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white font-sans scroll-smooth">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0b0e14]/80 backdrop-blur-md flex justify-between items-center px-12 py-6 text-sm text-gray-400 border-b border-gray-800/50">
        <div className="text-cyan-400 font-bold text-lg">SmartHome<span className="text-white">.cin</span></div>
        <div className="flex gap-8">
          <a href="#sobre" className="hover:text-white transition">Sobre</a>
          <a href="#funcionalidades" className="hover:text-white transition">Funcionalidades</a>
          <a href="#simulador" className="hover:text-white transition">Simulador</a>
        </div>
        <div className="text-[10px] flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           conectando...
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-24 px-6 pb-24">
        
        {/* Hero Section */}
        <header className="text-center mb-32">
          <div className="inline-block px-4 py-1 rounded-full border border-gray-800 text-[10px] text-gray-400 mb-6 font-mono tracking-widest uppercase">
            CIN • UFPE • EDOO
          </div>
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Smart Home<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Ecosystem Simulator
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm leading-relaxed mb-8">
            Simulador de ecossistema IoT residencial inteligente, desenvolvido em C++ como projeto da disciplina de Estrutura de Dados e Orientação a Objetos.
          </p>
        </header>

        {/* NOVA SEÇÃO: Sobre o Projeto */}
        <section id="sobre" className="mb-32 scroll-mt-32">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Sobre o Projeto</h2>
            <div className="w-16 h-1 bg-cyan-800 rounded-full"></div>
          </div>
          
          <div className="bg-[#11151c] border border-[#30363d] rounded-2xl p-10 md:p-14 shadow-lg">
            <div className="space-y-6 text-gray-400 leading-relaxed text-[15px]">
              <p>
                Em residências modernas, a diversidade de dispositivos conectados — lâmpadas inteligentes, sistemas de climatização, câmeras de segurança — cria um desafio técnico: como controlar <strong className="text-white font-semibold">aparelhos com interfaces e comportamentos distintos</strong> de forma unificada e eficiente?
              </p>
              <p>
                Este projeto propõe um <strong className="text-cyan-500 font-semibold">Smart Hub centralizado</strong>, inspirado em assistentes como Alexa e Google Home, capaz de gerenciar múltiplos dispositivos IoT de uma residência a partir de um único ponto de controle.
              </p>
              <p>
                A solução utiliza os pilares da <strong className="text-white font-semibold">Programação Orientada a Objetos em C++</strong> para resolver o problema de heterogeneidade de hardware — permitindo que diferentes aparelhos sejam adicionados, removidos e operados de forma genérica através de polimorfismo e herança, com gestão segura de memória.
              </p>
            </div>
            
            <div className="mt-10 pt-8">
              <div className="border-l-4 border-cyan-800 pl-4">
                <p className="text-gray-500 text-sm italic">
                  Projeto desenvolvido para a disciplina de Estrutura de Dados e Orientação a Objetos (EDOO) — Centro de Informática, UFPE.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NOVA SEÇÃO: Funcionalidades */}
        <section id="funcionalidades" className="mb-32 scroll-mt-32">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades</h2>
            <p className="text-cyan-800 text-sm">Capacidades principais do simulador de ecossistema smart home</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(feature => (
              <FeatureCard 
                key={feature.id}
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                colorClass={feature.color}
                description={feature.desc}
              />
            ))}
          </div>
        </section>

        {/* SEÇÃO: Simulador (Status, Sensores e Dispositivos) */}
        <div id="simulador" className="scroll-mt-32">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Painel do Simulador</h2>
            <div className="w-16 h-1 bg-cyan-800 rounded-full"></div>
          </div>

          {/* Barra de Status Central (DINÂMICA) */}
          <div className="bg-[#161b22]/80 border border-[#30363d] rounded-2xl p-8 mb-16 flex items-center shadow-2xl backdrop-blur-sm">
            <div className="flex-1 flex flex-wrap gap-y-6">
              <div className="w-1/2 md:w-auto md:flex-1"><InfoItem label="Dispositivos Ativos" value={activeCount} colorClass="text-cyan-400" /></div>
              <div className="w-1/2 md:w-auto md:flex-1"><InfoItem label="Total Cadastrado" value={devices.length} /></div>
              <div className="w-1/2 md:w-auto md:flex-1"><InfoItem label="Consumo Estimado" value={`${currentPower}W`} colorClass="text-orange-400" /></div>
              <div className="w-1/2 md:w-auto md:flex-1"><InfoItem label="Endpoint" value="localhost:8080" colorClass="text-gray-400 font-mono text-sm" /></div>
            </div>
            <button className="bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-xl border border-emerald-500/20 flex items-center gap-3 font-bold text-sm hover:bg-emerald-500/20 transition-all ml-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              Online
            </button>
          </div>

          {/* Seção Sensores Ambientais */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8 text-gray-600">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase whitespace-nowrap">Sensores Ambientais</span>
              <div className="h-[1px] w-full bg-gray-800/60"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Temperatura" value="24" unit="°C" colorClass="text-orange-400" />
              <StatCard label="Umidade" value="58" unit="%" colorClass="text-cyan-400" />
              <StatCard label="Luminosidade" value="340" unit="lux" colorClass="text-purple-400" />
              <StatCard label="CO2 (PPM)" value="412" unit="ppm" colorClass="text-emerald-400" />
            </div>
          </section>

          {/* Seção de Dispositivos */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8 text-gray-600">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase whitespace-nowrap">Dispositivos</span>
              <div className="h-[1px] w-full bg-gray-800/60"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {devices.map(dev => (
                <DeviceCard 
                  key={dev.id}
                  {...dev}
                  onToggle={() => toggleDevice(dev.id)}
                />
              ))}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}