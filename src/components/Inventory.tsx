import { Package, AlertTriangle, TrendingUp, Search, Plus, ArrowDownLeft, Loader2 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useInventory } from '../hooks/useInventory';

export function Inventory() {
  const { inventory, loading } = useInventory();

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

  const lowStockCount = inventory.filter(i => i.stock <= i.min_threshold).length;

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Material Inventory</h1>
            <p className="text-slate-400">Track stock levels and automate procurement requests.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert('Inventory Update: Feature coming soon in the next update!')}
              className="px-6 h-12 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center gap-2"
            >
              <ArrowDownLeft size={18} />
              Stock In
            </button>
            <button 
              onClick={() => alert('New Material Entry: Dynamic form integration scheduled.')}
              className="px-6 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <Plus size={18} />
              New Material
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass p-6">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Total Categories</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-white">24</h3>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                <TrendingUp size={14} /> +2 this month
              </span>
            </div>
          </div>
          <div className="glass p-6">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Low Stock Items</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-red-400">{lowStockCount}</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${lowStockCount > 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {lowStockCount > 0 ? 'Action Required' : 'All Clear'}
              </span>
            </div>
          </div>
          <div className="glass p-6">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Active Orders</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-blue-400">8</h3>
              <span className="text-slate-500 text-xs font-bold">In procurement</span>
            </div>
          </div>
        </div>

        <div className="glass overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="text-blue-500" size={20} />
              <h3 className="text-xl font-bold text-white">Stock Registry</h3>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="bg-slate-900/50 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-6">
            {inventory.length === 0 ? (
              <div className="col-span-4 py-20 text-center text-slate-500">
                No materials registered in inventory.
              </div>
            ) : (
              inventory.map((item) => {
                const isLow = item.stock <= item.min_threshold;
                const status = isLow ? 'Low Stock' : 'Healthy';
                
                return (
                  <div key={item.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-2 rounded-lg ${!isLow ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {!isLow ? <Package size={20} /> : <AlertTriangle size={20} />}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${!isLow ? 'text-emerald-500' : 'text-red-500'}`}>
                        {status}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-1">{item.name}</h4>
                    <p className="text-sm text-slate-500 mb-6">Min. Threshold: {item.min_threshold} {item.unit}</p>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-white leading-none">{item.stock}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.unit} available</p>
                      </div>
                      <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">Details</button>
                    </div>
                    
                    <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${!isLow ? 'bg-emerald-500' : 'bg-red-500'}`} 
                        style={{ width: `${Math.min((item.stock / (item.min_threshold * 2)) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
