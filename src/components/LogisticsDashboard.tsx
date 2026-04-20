import { useState, useMemo } from 'react';
import { Truck, MapPin, Clock, AlertCircle, Plus, Search, ChevronDown } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useLogistics } from '../hooks/useLogistics';
import { useVehicles } from '../hooks/useVehicles';
import { useProjects } from '../hooks/useProjects';
import { useDrivers } from '../hooks/useDrivers';
import { NewDeliveryModal } from './NewDeliveryModal';
import { motion } from 'framer-motion';

const STATUS_STYLES: Record<string, string> = {
  'In Transit': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'Delivered':  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Pending':    'bg-amber-500/10 text-amber-400 border border-amber-500/20',
};

const VEHICLE_STATUS_STYLES: Record<string, string> = {
  'On Delivery': 'bg-blue-500/10 text-blue-400',
  'Idle':        'bg-emerald-500/10 text-emerald-400',
  'Maintenance': 'bg-red-500/10 text-red-400',
};

export function LogisticsDashboard() {
  const { deliveries, loading: loadingDeliveries } = useLogistics();
  const { vehicles, loading: loadingVehicles, updateVehicleStatus } = useVehicles();
  const { projects, loading: loadingProjects } = useProjects();
  const { drivers } = useDrivers();
  const [isNewDeliveryModalOpen, setIsNewDeliveryModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const loading = loadingDeliveries || loadingVehicles || loadingProjects;

  // Build lookup maps so we show names instead of UUIDs
  const projectMap = useMemo(() =>
    Object.fromEntries(projects.map(p => [p.id, p.name])), [projects]);

  const vehicleMap = useMemo(() =>
    Object.fromEntries(vehicles.map(v => [v.id, `${v.registration_number} • ${v.model}`])), [vehicles]);

  // Wire search + filter
  const filtered = useMemo(() => {
    return deliveries.filter(d => {
      const projectName = projectMap[d.project_id] || d.project_id;
      const vehicleName = vehicleMap[d.vehicle_id] || d.vehicle_id || '';
      const q = search.toLowerCase();
      const matchSearch = !search ||
        projectName.toLowerCase().includes(q) ||
        vehicleName.toLowerCase().includes(q) ||
        d.material_type.toLowerCase().includes(q) ||
        d.destination.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [deliveries, search, statusFilter, projectMap, vehicleMap]);

  // Real KPI counts
  const inTransit = deliveries.filter(d => d.status === 'In Transit').length;
  const delivered  = deliveries.filter(d => d.status === 'Delivered').length;
  const pending    = deliveries.filter(d => d.status === 'Pending').length;

  if (loading) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen">
        <Sidebar />
        <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Logistics Control</h1>
            <p className="text-slate-400 text-sm">Monitor fleet health and material flow in real-time.</p>
          </div>
          <button
            onClick={() => setIsNewDeliveryModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 self-start md:self-auto"
          >
            <Plus size={18} /> New Delivery
          </button>
        </header>

        <NewDeliveryModal isOpen={isNewDeliveryModalOpen} onClose={() => setIsNewDeliveryModalOpen(false)} />

        {/* KPI Stat Chips */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'In Transit', count: inTransit,  color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
            { label: 'Pending',    count: pending,     color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
            { label: 'Delivered',  count: delivered,   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          ].map(s => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass p-5 flex items-center gap-4 border ${s.border}`}
            >
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>
                <Truck size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.count}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Delivery Table — col-span-2 */}
          <div className="xl:col-span-2 space-y-6">

            {/* Search + Filter bar */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by project, vehicle, material, destination..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white transition-all"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="h-11 px-4 pr-10 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white appearance-none transition-all"
                >
                  {['All', 'In Transit', 'Pending', 'Delivered'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Table */}
            <div className="glass overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center gap-3">
                <Clock className="text-blue-500" size={18} />
                <h3 className="text-lg font-bold text-white">Active Deliveries</h3>
                <span className="ml-auto text-xs text-slate-500">{filtered.length} of {deliveries.length} shown</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/5 font-bold">
                      <th className="px-5 py-4">Project</th>
                      <th className="px-5 py-4">Vehicle</th>
                      <th className="px-5 py-4">Material</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Destination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-10 text-center text-slate-500 text-sm">
                          {search || statusFilter !== 'All' ? 'No deliveries match your search.' : 'No active deliveries found.'}
                        </td>
                      </tr>
                    ) : (
                      filtered.map((del, i) => (
                        <motion.tr
                          key={del.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                          <td className="px-5 py-4">
                            <span className="font-bold text-white text-sm">
                              {projectMap[del.project_id] || <span className="text-slate-600 font-mono text-xs">{del.project_id.slice(0, 8)}</span>}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm text-slate-300">
                              {vehicleMap[del.vehicle_id] || <span className="text-slate-600 font-mono text-xs">{del.vehicle_id?.slice(0, 8) || 'Unassigned'}</span>}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{del.material_type}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${STATUS_STYLES[del.status] || 'bg-slate-800 text-slate-400'}`}>
                              {del.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <MapPin size={13} className="text-slate-600 flex-shrink-0" />
                              {del.destination}
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fleet Cards */}
            {vehicles.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-white mb-4">Fleet Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vehicles.map(v => (
                    <div key={v.id} className="glass p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                          <Truck size={20} />
                        </div>
                        <select
                          value={v.status}
                          onChange={e => updateVehicleStatus(v.id, e.target.value as any)}
                          className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${VEHICLE_STATUS_STYLES[v.status] || 'bg-slate-800 text-slate-400'}`}
                        >
                          <option value="Idle">Idle</option>
                          <option value="On Delivery">On Delivery</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                      <h4 className="font-bold text-white">{v.registration_number}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{v.model}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-base font-bold text-white mb-6">Performance</h3>
              <div className="space-y-6">
                <MetricItem label="Delivery Rate" value={`${deliveries.length ? Math.round((delivered / deliveries.length) * 100) : 0}%`} change={delivered > 0 ? '+live' : '—'} positive={delivered > 0} />
                <MetricItem label="In Transit Now" value={`${inTransit}`} change="live" positive />
                <MetricItem label="Pending Dispatch" value={`${pending}`} change={pending > 3 ? 'High' : 'Normal'} positive={pending <= 3} />
              </div>
            </div>

            <div className="glass p-6 bg-amber-500/5 border-amber-500/20">
              <h4 className="font-bold text-amber-500 mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                <AlertCircle size={15} /> Traffic Alert
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Congestion on Highway 4. Driver reassignment recommended for northern deliveries. Expected delay: 15 min.
              </p>
            </div>

            {/* Driver quick-list */}
            {drivers.length > 0 && (
              <div className="glass p-6">
                <h3 className="text-base font-bold text-white mb-4">Drivers On Duty</h3>
                <div className="space-y-3">
                  {drivers.filter(d => d.status === 'Active').slice(0, 5).map(d => (
                    <div key={d.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-600/30 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {d.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{d.full_name}</p>
                        <p className="text-[10px] text-slate-500">{d.role || 'Driver'}</p>
                      </div>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricItem({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</p>
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <span className={`text-xs font-bold ${positive ? 'text-emerald-400' : 'text-amber-400'}`}>{change}</span>
    </div>
  );
}
