import { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, Search, Plus, ArrowDownLeft, Loader2, TrendingUp } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useInventory } from '../hooks/useInventory';
import { motion } from 'framer-motion';

export function Inventory() {
  const { inventory, loading } = useInventory();
  const [search, setSearch] = useState('');

  const filtered = inventory.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.unit || '').toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = inventory.filter(i => i.stock <= i.min_threshold).length;
  const healthyCount = inventory.length - lowStockCount;

  if (loading) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen">
        <Sidebar />
        <main className="flex-1 lg:ml-72 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Material Inventory</h1>
            <p className="text-slate-400 text-sm">Track stock levels and automate procurement requests.</p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => alert('Stock-In form: Coming in next update!')}
              className="px-5 h-11 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center gap-2 text-sm"
            >
              <ArrowDownLeft size={16} /> Stock In
            </button>
            <button
              onClick={() => alert('Material form: Coming in next update!')}
              className="px-5 h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 text-sm"
            >
              <Plus size={16} /> New Material
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Items',  value: inventory.length, color: 'text-white',        icon: Package,      bg: 'bg-white/5' },
            { label: 'Low Stock',    value: lowStockCount,    color: 'text-red-400',       icon: TrendingDown, bg: 'bg-red-500/10' },
            { label: 'Healthy',      value: healthyCount,     color: 'text-emerald-400',   icon: TrendingUp,   bg: 'bg-emerald-500/10' },
            { label: 'Need Reorder', value: lowStockCount,    color: lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400', icon: AlertTriangle, bg: lowStockCount > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass p-5 flex items-center gap-4"
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${s.bg} ${s.color}`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stock Table */}
        <div className="glass overflow-hidden">
          <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package className="text-blue-500" size={18} />
              <h3 className="text-lg font-bold text-white">Stock Registry</h3>
              <span className="text-xs text-slate-500">{filtered.length} of {inventory.length} items</span>
            </div>
            {/* ✅ Search wired to state */}
            <div className="relative group w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={15} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                type="text"
                placeholder="Search by material name or unit..."
                className="w-full bg-slate-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <Package size={36} className="mx-auto mb-4 opacity-20" />
              <p className="font-bold">{search ? 'No materials match your search.' : 'No materials in inventory yet.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-5">
              {filtered.map((item, i) => {
                const isLow = item.stock <= item.min_threshold;
                const fillPct = Math.min((item.stock / Math.max(item.min_threshold * 2, 1)) * 100, 100);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`p-5 rounded-2xl border transition-all hover:border-white/20 ${
                      isLow ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-5">
                      <div className={`p-2 rounded-xl ${isLow ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {isLow ? <AlertTriangle size={18} /> : <Package size={18} />}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isLow ? 'text-red-400' : 'text-emerald-400'}`}>
                        {isLow ? '⚠ Low Stock' : 'Healthy'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 mb-4">Min: {item.min_threshold} {item.unit}</p>

                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <p className="text-2xl font-bold text-white leading-none">{item.stock}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{item.unit} in stock</p>
                      </div>
                      {isLow && (
                        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                          Request →
                        </button>
                      )}
                    </div>

                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06 }}
                        className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-emerald-500'}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
