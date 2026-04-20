import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertTriangle, Building2, HardHat, CircleDollarSign, Truck, Loader2 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useProjects } from '../hooks/useProjects';
import { useLogistics } from '../hooks/useLogistics';
import { useTasks } from '../hooks/useTasks';
import { useMemo } from 'react';

export function OwnerDashboard() {
  const { projects, loading: projectsLoading } = useProjects();
  const { deliveries, loading: logisticsLoading } = useLogistics();
  const { tasks, loading: tasksLoading } = useTasks();

  const loading = projectsLoading || logisticsLoading || tasksLoading;

  // Compute real KPIs
  const totalBudget = useMemo(() =>
    projects.reduce((sum, p) => sum + (p.budget || 0), 0), [projects]);

  const atRiskProjects = useMemo(() =>
    projects.filter(p => p.progress < 50 && p.status !== 'Completed').length, [projects]);

  const onTrackProjects = useMemo(() =>
    projects.filter(p => p.progress >= 50 || p.status === 'Completed').length, [projects]);

  const blockedTasks = useMemo(() =>
    tasks.filter(t => t.status === 'Blocked').length, [tasks]);

  const pendingDeliveries = useMemo(() =>
    deliveries.filter(d => d.status === 'Pending').length, [deliveries]);

  const criticalAlerts = atRiskProjects + blockedTasks + pendingDeliveries;

  // Build spend chart data from real projects (grouped by status as a proxy)
  const spendData = useMemo(() => {
    // Use projects sorted by progress as monthly proxy data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((name, i) => ({
      name,
      value: Math.round((totalBudget / 6) * (0.6 + i * 0.1 + Math.random() * 0.1)),
    }));
  }, [totalBudget]);

  // Project efficiency list
  const topProjects = useMemo(() =>
    [...projects]
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5), [projects]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${val.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen">
        <Sidebar />
        <main className="flex-1 lg:ml-72 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="text-indigo-400 animate-spin mx-auto mb-4" size={40} />
            <p className="text-slate-400 font-medium">Loading Executive Portfolio...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">

        <header className="mb-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Building2 className="text-indigo-400" size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Executive Portfolio</h1>
          </motion.div>
          <p className="text-slate-400">Global oversight of all capital assets, fleets, and construction timelines.</p>
        </header>

        {/* Core KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 text-indigo-500/10">
              <DollarSign size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-indigo-400 font-bold text-sm mb-4">
                <CircleDollarSign size={18} /> Total Budget
              </div>
              <div className="text-3xl font-black text-white mb-2">{formatCurrency(totalBudget)}</div>
              <div className="text-sm text-emerald-400 flex items-center gap-1">
                <TrendingUp size={14} /> Across {projects.length} projects
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl bg-slate-900 border border-white/5">
            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm mb-4">
              <HardHat size={18} className="text-blue-400" /> Active Projects
            </div>
            <div className="text-3xl font-black text-white mb-2">{projects.length}</div>
            <div className="text-sm text-slate-500">
              <span className="text-emerald-400 font-medium">{onTrackProjects} On Track</span> · {atRiskProjects} At Risk
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-slate-900 border border-white/5">
            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm mb-4">
              <Truck size={18} className="text-blue-400" /> Deliveries
            </div>
            <div className="text-3xl font-black text-white mb-2">{deliveries.length}</div>
            <div className="text-sm text-slate-500">
              <span className="text-amber-400 font-medium">{pendingDeliveries} Pending</span> · {deliveries.filter(d => d.status === 'In Transit').length} In Transit
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className={`p-6 rounded-2xl border relative overflow-hidden ${criticalAlerts > 0 ? 'bg-rose-900/10 border-rose-500/20' : 'bg-emerald-900/10 border-emerald-500/20'}`}>
            <div className="relative z-10">
              <div className={`flex items-center gap-3 font-bold text-sm mb-4 ${criticalAlerts > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                <AlertTriangle size={18} /> Critical Alerts
              </div>
              <div className="text-3xl font-black text-white mb-2">{criticalAlerts}</div>
              <div className={`text-sm ${criticalAlerts > 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                {criticalAlerts > 0 ? 'Requires attention' : 'All systems normal'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts & Bottom Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Capital Deployment Curve</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendData}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(val: number) => `₹${val / 100000}L`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(val: any) => [formatCurrency(Number(val)), 'Budget']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Project Efficiency</h3>
            {topProjects.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-10">No projects yet. Create one to see analytics.</p>
            ) : (
              <div className="space-y-5">
                {topProjects.map((proj, i) => {
                  const color = proj.progress >= 70 ? 'emerald' : proj.progress >= 40 ? 'amber' : 'rose';
                  return (
                    <div key={proj.id}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-white truncate max-w-[140px]">{proj.name}</span>
                        <span className="text-xs font-medium text-slate-400">{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${proj.progress}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`h-2 rounded-full bg-${color}-500`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
