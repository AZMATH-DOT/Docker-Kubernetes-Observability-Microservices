/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  Terminal, 
  Layers, 
  Box, 
  Cpu, 
  Shield, 
  Workflow, 
  BarChart3, 
  Code2, 
  Github, 
  Cloud,
  ChevronRight,
  Monitor,
  Database,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- Mock Data & Constants ---

const MODULES = [
  { id: 1, title: 'Containerize', icon: Box, description: 'Write multi-stage Dockerfiles for microservices and optimize image layers.' },
  { id: 2, title: 'K8s Manifests', icon: Layers, description: 'Define Deployments, Services, StatefulSets, and PVCs for the cluster.' },
  { id: 3, title: 'Config & Secrets', icon: Shield, description: 'Externalize sensitive data and environment-specific configurations.' },
  { id: 4, title: 'Ingress Routing', icon: Workflow, description: 'Set up Nginx Ingress for path-based routing and TLS termination.' },
  { id: 5, title: 'Helm Packaging', icon: Layout, description: 'Package the entire stack as a single versioned release.' },
  { id: 6, title: 'Autoscaling', icon: Cpu, description: 'Implement Horizontal Pod Autoscaler (HPA) for demand-based scaling.' },
  { id: 7, title: 'Observability', icon: Monitor, description: 'Set up Prometheus scraping and Grafana visualization.' },
  { id: 8, title: 'Load Test & Verify', icon: Zap, description: 'Run k6 load tests and verify system resilience under stress.' },
];

const SERVICES = [
  { name: 'auth-service', status: 'Healthy', version: 'v1.1.0', cpu: '12%', mem: '128MB', type: 'NodeJS' },
  { name: 'product-service', status: 'Healthy', version: 'v1.4.2', cpu: '8%', mem: '92MB', type: 'Go' },
  { name: 'order-service', status: 'Healthy', version: 'v1.0.5', cpu: '15%', mem: '156MB', type: 'FastAPI' },
  { name: 'notification-service', status: 'Healthy', version: 'v1.0.0', cpu: '5%', mem: '64MB', type: 'NodeJS' },
];

const generateMetricData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: i,
      requests: Math.floor(Math.random() * 100) + 50,
      latency: Math.floor(Math.random() * 50) + 10,
      errorRate: Math.random() * 2,
    });
  }
  return data;
};

// --- Components ---

// --- Components ---

const StatCard = ({ label, value, subValue, icon: Icon, colorClass }: any) => (
  <div className="sleek-card p-4 flex items-center gap-4 group">
    <div className={`p-2 rounded-lg bg-slate-950 border border-brand-border ${colorClass}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-bold text-white">{value}</h3>
        <span className="text-[10px] text-brand-success font-bold">{subValue}</span>
      </div>
    </div>
  </div>
);

const ServiceRow = ({ service }: any) => (
  <div className="flex items-center justify-between p-3 border-b border-brand-border last:border-0 hover:bg-white/5 transition-colors group">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      <div>
        <h4 className="text-sm font-bold text-white">{service.name}</h4>
        <span className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">{service.type} • {service.version}</span>
      </div>
    </div>
    <div className="flex gap-6 items-center">
      <div className="text-right">
        <p className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">CPU</p>
        <p className="text-xs font-mono text-slate-300">{service.cpu}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">MEM</p>
        <p className="text-xs font-mono text-slate-300">{service.mem}</p>
      </div>
      <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
    </div>
  </div>
);

export default function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [metrics, setMetrics] = useState(generateMetricData());
  const [isLive, setIsLive] = useState(true);
  const [view, setView] = useState<'dashboard' | 'explorer'>('dashboard');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const fileTree = [
    { name: 'Auth Service', path: 'services/auth/Dockerfile' },
    { name: 'Product Service', path: 'services/product/main.go' },
    { name: 'K8s Manifests', path: 'infrastructure/k8s/product-manifests.yaml' },
    { name: 'Helm Values', path: 'infrastructure/helm/values.yaml' },
    { name: 'Monitoring', path: 'infrastructure/monitoring/grafana-dashboard.json' },
    { name: 'CI/CD Pipeline', path: '.github/workflows/main.yml' },
  ];

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: (prev[prev.length - 1]?.time || 0) + 1,
          requests: Math.floor(Math.random() * 100) + 50,
          latency: Math.floor(Math.random() * 50) + 10,
          errorRate: Math.random() * 2,
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-brand-bg text-slate-200 min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Top Header */}
      <header className="bg-brand-surface border-b border-brand-border px-8 py-5 flex justify-between items-center z-50">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="bg-brand-accent p-1.5 rounded-md flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.983 11.078c0-.495-.415-.896-.927-.896H11.02c-.512 0-.927.401-.927.896v1.844c0 .495.415.896.927.896h2.036c.512 0 .927-.401.927-.896v-1.844zM11.02 7.391c-.512 0-.927.401-.927.896v1.844c0 .495.415.896.927.896h2.036c.512 0 .927-.401.927-.896V8.287c0-.495-.415-.896-.927-.896H11.02zM16.947 11.078c0-.495-.415-.896-.927-.896h-2.036c-.512 0-.927.401-.927.896v1.844c0 .495.415.896.927.896h2.036c.512 0 .927-.401.927-.896v-1.844zM13.983 14.765c0-.495-.415-.896-.927-.896H11.02c-.512 0-.927.401-.927.896v1.844c0 .495.415.896.927.896h2.036c.512 0 .927-.401.927-.896v-1.844z"/></svg>
            </span>
            Full-Stack Cloud Native: Kubernetes Masterclass
          </h1>
          <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium">Session Overview & Project Roadmap</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 glass-pill px-3 py-1.5 flex flex-row items-center border border-slate-700 bg-slate-800/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-300">AWS-EC2-U22.04</span>
          </div>
          <div className="accent-badge">
            Hands-on Lab
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Navigation & Fundamentals */}
        <aside className="w-72 bg-brand-surface/50 border-r border-brand-border p-6 flex flex-col gap-6 overflow-y-auto shrink-0">
          <nav className="flex flex-col gap-2 mb-4">
            <button 
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                view === 'dashboard' ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Activity size={16} />
              Fleet Monitor
            </button>
            <button 
              onClick={() => setView('explorer')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                view === 'explorer' ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Terminal size={16} />
              Code Explorer
            </button>
          </nav>

          <div>
            <h2 className="sidebar-label">Core Fundamentals</h2>
            <ul className="space-y-3">
              {[
                'Docker Architecture & Multi-stage Builds',
                'K8s Control Plane & Worker Nodes',
                'kubeadm Cluster Setup & Flannel CNI',
                'Pods, Deployments, Services, PVCs'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm group">
                  <span className="text-blue-500 mt-2 bg-blue-500 rounded-full w-1 h-1 shrink-0"></span>
                  <span className="text-slate-400 leading-tight group-hover:text-slate-200 transition-colors uppercase tracking-tight text-[11px] font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="sidebar-label">Infrastructure & Tools</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Helm 3', 'ArgoCD', 'Prometheus', 'Grafana', 
                'GitHub Actions', 'Redis', 'RabbitMQ', 'Ingress'
              ].map((tool, i) => (
                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono border border-slate-700 text-slate-400">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="text-[10px] text-slate-500 leading-relaxed italic uppercase font-bold tracking-wider">
              "From local Dockerfiles to GitOps-driven deployments on a live on-prem cluster."
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative sleek-grid flex flex-col">
          <AnimatePresence mode="wait">
            {view === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 overflow-y-auto p-8"
              >
                <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-32">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 uppercase tracking-tight">
                      <span className="text-blue-500 font-mono">08</span> Project Workflow Modules
                    </h2>
                    <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Estimated: 4.5 Hours Content</span>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Nodes" value="03" subValue="+0" icon={Server} colorClass="text-brand-accent" />
                    <StatCard label="Live Pods" value="28" subValue="+4" icon={Box} colorClass="text-cyan-400" />
                    <StatCard label="Avg Latency" value="42ms" subValue="-2ms" icon={Zap} colorClass="text-brand-success" />
                    <StatCard label="Error Rate" value="0.04%" subValue="-0.1%" icon={Shield} colorClass="text-brand-success" />
                  </div>

                  {/* Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MODULES.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => setActiveStep(module.id)}
                        className={`sleek-card p-4 flex gap-4 text-left transition-all ${
                          activeStep === module.id ? 'border-brand-accent/50 bg-brand-accent/5' : ''
                        }`}
                      >
                        <div className={`text-3xl font-black select-none ${activeStep === module.id ? 'text-brand-accent/30' : 'text-slate-800'}`}>
                          {module.id.toString().padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-white text-[11px] uppercase tracking-[0.1em]">{module.title}</h3>
                            {activeStep > module.id && <CheckCircle2 size={14} className="text-brand-success" />}
                          </div>
                          <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{module.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Service Fleet Section */}
                    <div className="sleek-card overflow-hidden flex flex-col bg-slate-900/40 backdrop-blur">
                      <div className="p-4 border-b border-brand-border flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-brand-accent" />
                          <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Live Service Fleet</h2>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          Stable
                        </div>
                      </div>
                      <div className="flex-1">
                        {SERVICES.map((s, i) => (
                          <ServiceRow key={i} service={s} />
                        ))}
                      </div>
                    </div>

                    {/* Observability Snapshot */}
                    <div className="sleek-card p-6 flex flex-col gap-6 bg-brand-bg transition-none border-brand-accent/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 size={18} className="text-brand-accent" />
                          <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Observability Stack</h3>
                        </div>
                        <button 
                          onClick={() => setIsLive(!isLive)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            isLive ? 'border-brand-success/50 text-brand-success bg-brand-success/10' : 'border-slate-700 text-slate-500 bg-slate-900'
                          }`}
                        >
                          {isLive ? 'Live Feed' : 'Paused'}
                        </button>
                      </div>

                      <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={metrics}>
                            <defs>
                              <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                            <XAxis dataKey="time" hide />
                            <YAxis hide />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
                              labelStyle={{ display: 'none' }}
                            />
                            <Area type="monotone" dataKey="requests" stroke="#2563eb" fillOpacity={1} fill="url(#colorReq)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Global Health</p>
                          <div className="flex -space-x-1">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="w-5 h-5 rounded-full bg-slate-800 border border-brand-border flex items-center justify-center text-[8px] font-bold">Z{i}</div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Last Sync</p>
                          <p className="text-[11px] font-mono text-slate-300">Just Now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="explorer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 p-8 overflow-hidden"
              >
                <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 uppercase tracking-tight">
                      <span className="text-blue-500 font-mono">CODE</span> Architecture Explorer
                    </h2>
                    <div className="flex items-center gap-4">
                       <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Github size={14} /> azmathyta / shop-cloud-native
                       </span>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                    <div className="col-span-3 sleek-card overflow-y-auto p-2 bg-brand-surface/20">
                      <div className="flex flex-col gap-1">
                        <p className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Services</p>
                         {fileTree.map((f, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedFile(f.path)}
                            className={`text-left px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                              selectedFile === f.path ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-white/5'
                            }`}
                          >
                            <FileCode size={14} />
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-9 sleek-card overflow-hidden flex flex-col bg-slate-950/50 backdrop-blur">
                      {selectedFile ? (
                        <div className="h-full flex flex-col">
                           <div className="p-3 bg-slate-900/80 border-b border-brand-border flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                              </div>
                              <code className="text-[10px] text-blue-400 font-mono font-bold">{selectedFile}</code>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Read Only</span>
                          </div>
                          <div className="flex-1 p-8 overflow-auto font-mono text-[13px] text-slate-400 bg-slate-950/20">
                            <pre className="whitespace-pre-wrap leading-relaxed">
                              {`// File Reference: project/${selectedFile}\n// Layer: Infrastructure Definition\n\n[ ARCHITECTURAL DEFINITION ]\n\n- Infrastructure-as-code verified\n- Multi-stage optimization stage: Production\n- Resource limit gating enabled\n- Container Orchestration: Kubernetes v1.28+\n\n- Container Image: alpine-based-slim (standardized)\n- Registry Source: Docker Hub (Master Branch)\n\nNotes from Lab Sync:\n- Horizontal scaling logic applied to this manifest.\n- Liveness and readiness probes configured for zero-downtime rollouts.`}
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center flex-col gap-4 text-slate-800">
                          <div className="p-6 rounded-full bg-slate-900/50 border border-slate-800">
                            <Code2 size={48} className="opacity-20" />
                          </div>
                          <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-40">Select a manifest defined above</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Final CTA Footer bar */}
      <footer className="fixed bottom-0 left-72 right-0 p-4 z-50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 flex items-center justify-between shadow-2xl shadow-blue-950/70 border border-white/5">
          <div>
            <p className="text-white font-black text-sm uppercase tracking-tight">Ready to Build Production-Grade Infrastructure?</p>
            <p className="text-blue-200 text-[10px] uppercase font-bold tracking-[0.15em] mt-0.5 opacity-80">Master GitOps, Microservices, and Observability in one workflow.</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-700 font-black rounded-lg shadow-xl uppercase text-[10px] tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-white/10">
            Start Lab Session
          </button>
        </div>
      </footer>
    </div>
  );
}

