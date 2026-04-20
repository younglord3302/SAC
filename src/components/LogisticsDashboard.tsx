import { useState } from 'react';
import { Truck, MapPin, Clock, AlertCircle, Plus, Search } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useLogistics } from '../hooks/useLogistics';
import { useVehicles } from '../hooks/useVehicles';
import { NewDeliveryModal } from './NewDeliveryModal';

export function LogisticsDashboard() {
  const { deliveries, loading: loadingDeliveries } = useLogistics();
  const { vehicles, loading: loadingVehicles } = useVehicles();
  const [isNewDeliveryModalOpen, setIsNewDeliveryModalOpen] = useState(false);

  const loading = loadingDeliveries || loadingVehicles;

  if (loading) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen">
        <Sidebar />
        <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Logistics Control</h1>
            <p className="text-slate-400">Monitor fleet health and material flow in real-time.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search deliveries, vehicles..." 
                className="w-80 h-12 pl-12 pr-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all"
              />
            </div>
            
            <button 
              onClick={() => setIsNewDeliveryModalOpen(true)}
              className="px-6 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <Plus size={20} />
              New Delivery
            </button>
          </div>
        </header>

        <NewDeliveryModal 
          isOpen={isNewDeliveryModalOpen} 
          onClose={() => setIsNewDeliveryModalOpen(false)} 
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Active Deliveries */}
          <div className="xl:col-span-2 space-y-10">
            <div className="glass overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-500" size={20} />
                  <h3 className="text-xl font-bold text-white">Active Deliveries</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-white/5 font-semibold">
                      <th className="px-6 py-4">Delivery ID</th>
                      <th className="px-6 py-4">Project</th>
                      <th className="px-6 py-4">Vehicle / Driver</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Destination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {deliveries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                          No active deliveries found.
                        </td>
                      </tr>
                    ) : (
                      deliveries.map((del) => (
                        <tr key={del.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                          <td className="px-6 py-4">
                            <span className="font-bold text-blue-400">{del.id.slice(0, 8)}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300 font-medium">
                            {del.project_id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">{del.vehicle_id?.slice(0, 8) || 'N/A'}</span>
                              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{del.material_type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                              del.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' : 
                              del.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {del.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-slate-600" />
                              {del.destination}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.length === 0 ? (
                <div className="col-span-3 glass p-10 text-center text-slate-500">
                  No vehicles registered in fleet.
                </div>
              ) : (
                vehicles.map((item) => (
                  <div key={item.id} className="glass p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                        <Truck size={24} />
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        item.status === 'On Delivery' ? 'bg-blue-500/10 text-blue-400' : 
                        item.status === 'Idle' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.registration_number}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">{item.model}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '100%' }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Full Fuel</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Logistics Analytics */}
          <div className="space-y-10">
            <div className="glass p-8">
              <h3 className="text-xl font-bold text-white mb-8">Performance</h3>
              <div className="space-y-8">
                <MetricItem label="Avg. Trip Time" value="1.4 hrs" change="-12%" positive />
                <MetricItem label="Fuel Efficiency" value="8.4 km/l" change="+4.2%" positive />
                <MetricItem label="Route Compliance" value="98.2%" change="+1.2%" positive />
              </div>
            </div>

            <div className="glass p-8 bg-amber-500/5 border-amber-500/20">
              <h4 className="font-bold text-amber-500 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                <AlertCircle size={16} />
                Traffic Alert
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Congestion on Highway 4. Rerouting **Truck #12** to secondary access road. Expected delay: 15 mins.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricItem({ label, value, change, positive }: { label: string, value: string, change: string, positive: boolean }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</p>
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <span className={`text-xs font-bold ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
  );
}
