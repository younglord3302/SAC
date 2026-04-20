import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertTriangle, Building2, HardHat, CircleDollarSign } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const spendData = [
  { name: 'Jan', value: 400000 },
  { name: 'Feb', value: 300000 },
  { name: 'Mar', value: 550000 },
  { name: 'Apr', value: 480000 },
  { name: 'May', value: 600000 },
  { name: 'Jun', value: 850000 },
];

export function OwnerDashboard() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 text-indigo-500/10">
              <DollarSign size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-indigo-400 font-bold text-sm mb-4">
                <CircleDollarSign size={18} /> Total Gross Spend YTD
              </div>
              <div className="text-4xl font-black text-white mb-2">$3,180,000</div>
              <div className="text-sm text-emerald-400 flex items-center gap-1">
                <TrendingUp size={14} /> +12.4% vs last year
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden">
             <div className="relative z-10">
              <div className="flex items-center gap-3 text-slate-400 font-bold text-sm mb-4">
                <HardHat size={18} className="text-blue-400" /> Active Projects
              </div>
              <div className="text-4xl font-black text-white mb-2">12</div>
              <div className="text-sm text-slate-500">
                <span className="text-emerald-400 font-medium">9 On Track</span> • 3 At Risk
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-rose-900/10 border border-rose-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-rose-400 font-bold text-sm mb-4">
                <AlertTriangle size={18} /> Critical Alerts
              </div>
              <div className="text-4xl font-black text-white mb-2">4</div>
              <div className="text-sm text-rose-300">Requires immediate attention</div>
            </div>
          </motion.div>
        </div>

        {/* Charts & Bottom Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Capital Deployment Curve</h3>
            <div className="h-[300px] w-full">
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
                  <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(val: number) => `$${val / 1000}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Project Efficiency</h3>
            <div className="space-y-6">
              {[
                { name: 'Skyview Complex', progress: 85, status: 'emerald' },
                { name: 'Terminal 4 Paving', progress: 42, status: 'rose' },
                { name: 'River Bridge', progress: 68, status: 'amber' },
              ].map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-white">{proj.name}</span>
                    <span className="text-xs font-medium text-slate-400">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`h-2 rounded-full bg-${proj.status}-500`} style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
