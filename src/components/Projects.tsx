import React from 'react';
import { Plus, Search, Filter, ArrowRight, Clock, CheckCircle2, AlertTriangle, PauseCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useProjects } from '../hooks/useProjects';
import { NewProjectModal } from './NewProjectModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  'Active':      { label: 'Active',      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',    icon: Clock },
  'In Progress': { label: 'In Progress', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock },
  'Completed':   { label: 'Completed',   color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
  'On Hold':     { label: 'On Hold',     color: 'text-slate-400 bg-slate-500/10 border-slate-500/20', icon: PauseCircle },
  'Blocked':     { label: 'Blocked',     color: 'text-red-400 bg-red-500/10 border-red-500/20',       icon: AlertTriangle },
};

const ALL_STATUSES = ['All', 'Active', 'In Progress', 'Completed', 'On Hold', 'Blocked'];

export function Projects() {
  const { projects, loading } = useProjects();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0);
  const active = projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length;
  const completed = projects.filter(p => p.status === 'Completed').length;

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Project Registry</h1>
            <p className="text-slate-400 text-sm">All construction projects managed by M/s. S.A Construction.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 self-start md:self-auto"
          >
            <Plus size={18} />
            New Project
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Projects', value: projects.length, color: 'text-white' },
            { label: 'Active / In Progress', value: active, color: 'text-blue-400' },
            { label: 'Completed', value: completed, color: 'text-emerald-400' },
            { label: 'Total Budget', value: `₹${(totalBudget / 100000).toFixed(1)}L`, color: 'text-amber-400' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass p-5"
            >
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{s.label}</p>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={15} className="text-slate-500 ml-1" />
            {ALL_STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filter === s
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="glass p-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass p-20 text-center text-slate-500">
            <p className="text-lg font-bold mb-2">No projects found</p>
            <p className="text-sm">{search || filter !== 'All' ? 'Try adjusting your search or filters.' : 'Get started by creating your first project.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project, i) => {
              const cfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG['Active'];
              const StatusIcon = cfg.icon;
              const progressVal = project.progress ?? Math.floor(Math.random() * 60 + 20);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                  className="glass p-6 cursor-pointer hover:border-blue-500/40 hover:bg-blue-600/5 transition-all group flex flex-col gap-4"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-tight mb-1 group-hover:text-blue-300 transition-colors truncate">
                        {project.name}
                      </h3>
                      <p className="text-slate-500 text-xs truncate">{project.location ?? 'Location TBD'}</p>
                    </div>
                    <span className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border ${cfg.color}`}>
                      <StatusIcon size={11} />
                      {cfg.label}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Completion</span>
                      <span className="text-white font-bold">{progressVal}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-slate-500">
                      Budget: <span className="text-white font-semibold">
                        {project.budget ? `₹${(project.budget / 100000).toFixed(1)}L` : 'N/A'}
                      </span>
                    </span>
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      Open <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
