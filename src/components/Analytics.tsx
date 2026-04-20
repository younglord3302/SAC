import { DollarSign, ArrowUpRight, ArrowDownRight, Activity, Package, Truck } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useProjects } from '../hooks/useProjects';
import { useLogistics } from '../hooks/useLogistics';
import { useInventory } from '../hooks/useInventory';
import { motion } from 'framer-motion';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const COMPLETION_DATA = [38, 52, 61, 74, 83, 90];
const SPEND_DATA = [120, 95, 140, 110, 160, 130];

export function Analytics() {
  const { projects } = useProjects();
  const { deliveries } = useLogistics();
  const { inventory } = useInventory();

  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const totalProjects = projects.length || 1;

  const deliveredCount = deliveries.filter(d => d.status === 'Delivered').length;
  const inTransitCount = deliveries.filter(d => d.status === 'In Transit').length;
  const pendingCount = deliveries.filter(d => d.status === 'Pending').length;
  const totalDeliveries = deliveries.length || 1;

  const lowStockItems = inventory.filter(i => i.stock <= i.min_threshold).length;

  const stats = [
    { label: 'Total Revenue', value: '₹24.8L', trend: '+12.5%', isUp: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Resource Spending', value: '₹8.4L', trend: '-2.4%', isUp: false, icon: Activity, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Delivery Rate', value: `${Math.round((deliveredCount / totalDeliveries) * 100)}%`, trend: '+4.1%', isUp: true, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Low Stock Items', value: `${lowStockItems}`, trend: lowStockItems > 3 ? 'Critical' : 'Healthy', isUp: lowStockItems === 0, icon: Package, color: lowStockItems > 3 ? 'text-amber-500' : 'text-emerald-500', bg: lowStockItems > 3 ? 'bg-amber-500/10' : 'bg-emerald-500/10' },
  ];

  const maxSpend = Math.max(...SPEND_DATA);

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Performance Analytics</h1>
            <p className="text-slate-400">Deep insights into site execution and logistics efficiency.</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500/50 transition-all">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>This Quarter</option>
            </select>
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all">
              Export Report
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              key={stat.label}
              className="glass p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 ${stat.bg} rounded-xl ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Project Completion Bar Chart */}
          <div className="lg:col-span-2 glass p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Project Completion Trend</h3>
                <p className="text-slate-500 text-xs mt-1">Monthly YTD progress (% on-time)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span className="text-xs text-slate-400">Completion %</span>
              </div>
            </div>

            <div className="h-56 flex items-end gap-3">
              {COMPLETION_DATA.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">{val}%</span>
                  <div className="w-full flex items-end" style={{ height: '180px' }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="w-full bg-blue-600/20 border-t-2 border-blue-500 rounded-t-lg group-hover:bg-blue-600/40 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Status Breakdown */}
          <div className="glass p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Execution Status</h3>
            <StatusBar label="Completed" value={completedProjects} total={totalProjects} color="bg-emerald-500" />
            <StatusBar label="In Progress" value={activeProjects} total={totalProjects} color="bg-blue-500" />
            <StatusBar label="Pending Start" value={totalProjects - completedProjects - activeProjects} total={totalProjects} color="bg-amber-500" />

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Projects</span>
                <span className="font-bold text-white">{totalProjects}</span>
              </div>
            </div>

            <div className="glass p-5 bg-blue-600/5 border-blue-500/20">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">AI Signal</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Current execution velocity suggests <strong className="text-white">Phase 3</strong> will complete <strong className="text-emerald-400">6 days ahead</strong> of schedule.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource Spend Chart */}
          <div className="glass p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Resource Spend</h3>
                <p className="text-slate-500 text-xs mt-1">Monthly spend in ₹ (thousands)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="text-xs text-slate-400">₹ Spend</span>
              </div>
            </div>
            <div className="h-40 flex items-end gap-3">
              {SPEND_DATA.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end" style={{ height: '130px' }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(val / maxSpend) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="w-full bg-amber-500/20 border-t-2 border-amber-400 rounded-t-lg group-hover:bg-amber-500/40 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Funnel */}
          <div className="glass p-8">
            <h3 className="text-xl font-bold text-white mb-8">Logistics Funnel</h3>
            <div className="space-y-5">
              <FunnelBar label="Total Dispatched" value={deliveries.length} max={deliveries.length} color="bg-slate-600" />
              <FunnelBar label="In Transit" value={inTransitCount} max={deliveries.length} color="bg-blue-500" />
              <FunnelBar label="Pending" value={pendingCount} max={deliveries.length} color="bg-amber-500" />
              <FunnelBar label="Delivered" value={deliveredCount} max={deliveries.length} color="bg-emerald-500" />
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-sm">
              <span className="text-slate-400">Success Rate</span>
              <span className="font-bold text-emerald-400">{Math.round((deliveredCount / totalDeliveries) * 100)}%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-400">{label}</span>
        <span className="text-white font-bold">{value} <span className="text-slate-600 font-normal text-xs">({pct}%)</span></span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

function FunnelBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-slate-500 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
      <span className="text-xs font-bold text-white w-8 text-right">{value}</span>
    </div>
  );
}
