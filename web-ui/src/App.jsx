import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, Snowflake, Thermometer, SquaresFour, 
  ShareNetwork, Pulse, Stack, LockKey, TreeStructure, 
  Shuffle, Cpu, VideoCamera, Plus, Minus 
} from "@phosphor-icons/react";

// COMPONENTES DE APOIO

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

function DeviceCard({ id, name, room, power, status, tipo, temperatura, icon: Icon, onToggle, onTempChange }) {
  return (
    <div className={`bg-[#161b22] p-6 rounded-2xl border transition-all duration-500 ${status ? 'border-cyan-500/40 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)] scale-[1.02]' : 'border-[#30363d] hover:border-gray-600'}`}>
      <div className="flex justify-between items-start mb-10">
        <div 
          onClick={onToggle}
          className={`p-3 rounded-xl cursor-pointer transition-all duration-500 ${status ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-gray-800 text-gray-600'}`}
        >
          <Icon size={28} weight={status ? "fill" : "regular"} />
        </div>
        
        <div onClick={onToggle} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${status ? 'bg-cyan-500' : 'bg-gray-700'}`}>
          <div className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${status ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-white font-bold text-lg tracking-tight">{name}</h3>
        <p className="text-gray-500 text-xs mt-1 font-medium">{room}</p>
        
        {/* Controle de Temperatura para Ar Condicionado */}
        {tipo === 'ar_condicionado' && status && (
          <div className="mt-4 flex items-center justify-between bg-[#0b0e14] p-2 rounded-xl border border-gray-800">
            <button 
              onClick={(e) => { e.stopPropagation(); onTempChange(id, 'sub'); }}
              className="p-2 hover:bg-gray-800 rounded-lg text-cyan-500 transition-colors"
            >
              <Minus size={20} weight="bold" />
            </button>
            <span className="text-xl font-mono font-bold text-white">{temperatura}°C</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onTempChange(id, 'soma'); }}
              className="p-2 hover:bg-gray-800 rounded-lg text-orange-500 transition-colors"
            >
              <Plus size={20} weight="bold" />
            </button>
          </div>
        )}

        {/* Indicador de Gravação para Câmera */}
        {tipo === 'camera' && status && (
          <div className="mt-3 flex items-center gap-2 text-red-500 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest">REC • GRAVANDO</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
        <span className={`font-mono text-base font-medium ${status ? 'text-white' : 'text-gray-600'}`}>{power}W</span>
        <span className={`text-[9px] font-black px-2 py-1 rounded border tracking-tighter ${status ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' : 'border-gray-800 text-gray-600'}`}>
          {status ? 'LIGADO' : 'DESLIGADO'}
        </span>
      </div>
    </div>
  );
}

// Componente para os Cards de Funcionalidades
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

//COMPONENTE PRINCIPAL

export default function App() {
  const [devices, setDevices] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/status');
        if (response.ok) {
          const data = await response.json();
          setIsConnected(true);
          const mapped = data.dispositivos.map(dev => ({
            ...dev,
            status: dev.ligado,
            // Usa a temperatura que vem do C++ no JSON
            temperatura: dev.temperatura || 22,
            power: dev.tipo === "luz" ? 12 : (dev.tipo === "ar_condicionado" ? 150 : 5),
            icon: dev.tipo === "luz" ? Lightbulb : (dev.tipo === "ar_condicionado" ? Snowflake : (dev.tipo === "camera" ? VideoCamera : Cpu)),
            room: "CIn - UFPE"
          }));
          setDevices(mapped);
        }
      } catch (err) {
        setIsConnected(false);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/dispositivo/${id}/toggle`, { method: 'POST' });
      if (response.ok) {
        setDevices(prev => prev.map(dev => dev.id === id ? { ...dev, status: !dev.status } : dev));
      }
    } catch (err) { console.error(err); }
  };

  const changeTemperature = async (id, operacao) => {
  // 1. Encontramos o dispositivo
  const dev = devices.find(d => d.id === id);
  if (!dev) return;

  // 2. Calculamos a nova temperatura respeitando os limites da sua classe C++
  const novaTemp = operacao === 'soma' ? dev.temperatura + 1 : dev.temperatura - 1;
  if (novaTemp < 16 || novaTemp > 30) return;

  // ATUALIZAÇÃO OTIMISTA: Mudamos no UI primeiro para dar sensação de velocidade
  setDevices(prev => prev.map(d => 
    d.id === id ? { ...d, temperatura: novaTemp } : d
  ));

  try {
    const response = await fetch(`http://localhost:8080/api/dispositivo/${id}/temperatura/${novaTemp}`, { 
      method: 'POST',
      mode: 'cors' // Garante que o modo CORS está ativo
    });

    if (!response.ok) {
      throw new Error("Erro no servidor ao mudar temperatura");
    }
  } catch (err) {
    console.error("Falha na comunicação:", err);
    // 4.Se der erro (CORS ou rede), volta para o valor anterior
    // Isso impede que o valor fique errado se o servidor não aceitar
    setDevices(prev => prev.map(d => 
      d.id === id ? { ...d, temperatura: dev.temperatura } : d
    ));
  }
}

  const features = [
    { id: 1, title: "Controle Centralizado", desc: "Gerencie todos os dispositivos da residência a partir de um único hub inteligente.", icon: SquaresFour, color: "text-cyan-500" },
    { id: 2, title: "Automação por Cenários", desc: "Ative modos pré-configurados como \"Modo Sair\" que coordenam múltiplos dispositivos.", icon: ShareNetwork, color: "text-cyan-500" },
    { id: 3, title: "Monitoramento em Tempo Real", desc: "Visualize o estado atual de consumo e sensores ambientais.", icon: Pulse, color: "text-cyan-500" },
    { id: 4, title: "Gestão Heterogênea", desc: "Suporte a múltiplos tipos de hardware tratados de forma genérica via polimorfismo.", icon: Stack, color: "text-cyan-500" },
    { id: 5, title: "Encapsulamento", desc: "Atributos internos protegidos por modificadores de acesso e manipulados via getters/setters.", icon: LockKey, color: "text-orange-400" },
    { id: 6, title: "Herança", desc: "Dispositivos derivam de uma classe base abstrata, herdando comportamentos comuns.", icon: TreeStructure, color: "text-orange-400" },
    { id: 7, title: "Polimorfismo", desc: "O hub opera sobre ponteiros genéricos, invocando métodos específicos em tempo de execução.", icon: Shuffle, color: "text-orange-400" },
    { id: 8, title: "Gestão de Memória", desc: "Destrutores virtuais garantem desalocação correta ao remover dispositivos.", icon: Cpu, color: "text-orange-400" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white font-sans scroll-smooth">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0b0e14]/80 backdrop-blur-md flex justify-between items-center px-12 py-6 border-b border-gray-800/50">
        <div className="text-cyan-400 font-bold text-lg">SmartHome<span className="text-white">.cin</span></div>
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#sobre" className="hover:text-white transition">Sobre</a>
          <a href="#funcionalidades" className="hover:text-white transition">Funcionalidades</a>
          <a href="#simulador" className="hover:text-white transition">Simulador</a>
        </div>
        <div className="text-[10px] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}></span>
            {isConnected ? 'online' : 'offline'}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-24 px-6 pb-24">
        
        {/*IDs para os links da Navbar funcionarem */}
        <section id="sobre" className="mb-32 scroll-mt-32">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Sobre o Projeto</h2>
            <div className="w-16 h-1 bg-cyan-800 rounded-full"></div>
          </div>
          <div className="bg-[#11151c] border border-[#30363d] rounded-2xl p-10 text-gray-400">
             <p>Este projeto propõe um Smart Hub centralizado, capaz de gerenciar múltiplos dispositivos IoT de uma residência através de uma interface unificada, utilizando os pilares da POO em C++.</p>
          </div>
        </section>

        <section id="funcionalidades" className="mb-32 scroll-mt-32">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades</h2>
            <div className="w-16 h-1 bg-cyan-800 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(f => <FeatureCard key={f.id} {...f} />)}
          </div>
        </section>

        <section id="simulador" className="scroll-mt-32">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Painel do Simulador</h2>
            <div className="w-16 h-1 bg-cyan-800 rounded-full"></div>
          </div>
          
          <div className="bg-[#161b22]/80 border border-[#30363d] rounded-2xl p-8 mb-16 flex items-center shadow-2xl backdrop-blur-sm">
            <div className="flex-1 flex flex-wrap gap-y-6">
              <InfoItem label="Dispositivos Ativos" value={devices.filter(d=>d.status).length} colorClass="text-cyan-400" />
              <InfoItem label="Consumo Estimado" value={`${devices.reduce((acc, d) => d.status ? acc + d.power : acc, 0)}W`} colorClass="text-orange-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devices.map(dev => (
              <DeviceCard 
                key={dev.id} 
                {...dev} 
                onToggle={() => toggleDevice(dev.id)} 
                onTempChange={changeTemperature}
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}