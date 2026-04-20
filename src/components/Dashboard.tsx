import { Search, Bell, Plus } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { StatsGrid } from './StatsGrid';
import { ProjectList } from './ProjectList';
import { NewProjectModal } from './NewProjectModal';
import { AIInsights } from './AIInsights';
import { useLogistics } from '../hooks/useLogistics';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRole } from '../hooks/useRole';
import { OwnerDashboard } from './OwnerDashboard';
import { WorkerDashboard } from './WorkerDashboard';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deliveries } = useLogistics();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { role } = useRole();

  if (role === 'owner') return <OwnerDashboard />;
  if (role === 'worker') return <WorkerDashboard />;

  const inTransitCount = deliveries.filter(d => d.status === 'In Transit').length;
  const deliveredCount = deliveries.filter(d => d.status === 'Delivered').length;
  const pendingCount = deliveries.filter(d => d.status === 'Pending').length;
  
  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-4 md:p-10 pt-24 lg:pt-10">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-12 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1 lg:mb-2 text-center lg:text-left">Operations Center</h1>
            <p className="text-slate-400 text-sm text-center lg:text-left">Real-time visibility across your construction ecosystem.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
            <div className="relative group w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..." 
                className="w-full md:w-80 h-10 md:h-12 pl-12 pr-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-center">
              <button 
                onClick={() => navigate('/dashboard/notifications')}
                className="relative w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 hover:border-white/20 transition-all text-slate-400 hover:text-blue-400 group"
              >
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0b1120] animate-pulse" />
              </button>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 md:flex-none px-6 h-10 md:h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Plus size={20} />
                New Project
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-10">
          <StatsGrid />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            <div className="xl:col-span-2 space-y-10">
              <ProjectList searchTerm={searchTerm} />
            </div>
            
            <div className="space-y-10">
              {/* AI Insights Card */}
              <AIInsights />

              {/* Active Logistics Card */}
              <div className="glass p-8">
                <h3 className="text-xl font-bold text-white mb-6">Logistics Flow</h3>
                <div className="space-y-6">
                  <FlowItem label="En route to site" count={inTransitCount} color="bg-blue-500" />
                  <FlowItem label="Loading / Dispatched" count={pendingCount} color="bg-emerald-500" />
                  <FlowItem label="Delivered / Completed" count={deliveredCount} color="bg-amber-500" />
                </div>
                <button 
                  onClick={() => navigate('/dashboard/logistics')}
                  className="w-full py-4 mt-8 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all"
                >
                  Manage Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function FlowItem({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm font-medium text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-bold text-white">{count}</span>
    </div>
  );
}
