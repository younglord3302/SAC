import { useState } from 'react';
import { Users, UserPlus, Search, Edit2, Trash2, HardHat, Truck, Shield, Phone, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useDrivers } from '../hooks/useDrivers';
import { motion } from 'framer-motion';

const ROLE_ICON: Record<string, React.ElementType> = {
  Driver    : Truck,
  Engineer  : HardHat,
  Manager   : Shield,
  Inspector : Shield,
};
const ROLE_COLOR: Record<string, string> = {
  Driver    : 'text-blue-400 bg-blue-500/10',
  Engineer  : 'text-amber-400 bg-amber-500/10',
  Manager   : 'text-indigo-400 bg-indigo-500/10',
  Inspector : 'text-emerald-400 bg-emerald-500/10',
};

const DEPT_STATS = [
  { label: 'Site Engineers',  count: 8,  icon: HardHat, color: 'text-amber-400 bg-amber-500/10'  },
  { label: 'Fleet Drivers',   count: 12, icon: Truck,   color: 'text-blue-400 bg-blue-500/10'    },
  { label: 'Safety Officers', count: 3,  icon: Shield,  color: 'text-emerald-400 bg-emerald-500/10' },
  { label: 'Total Personnel', count: 23, icon: Users,   color: 'text-white bg-white/10'           },
];

export function TeamManagement() {
  const { drivers, loading } = useDrivers();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'cards'>('table');

  const filtered = drivers.filter(d =>
    d.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (d.role ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Team & Resources</h1>
            <p className="text-slate-400 text-sm">Manage site engineers, operators, and fleet drivers.</p>
          </div>
          <button className="self-start md:self-auto px-6 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
            <UserPlus size={18} />
            Add Member
          </button>
        </header>

        {/* Department Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {DEPT_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass p-5 flex items-center gap-4"
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${s.color}`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-extrabold text-white">{s.count}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative group w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={15} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or role..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Table
            </button>
            <button
              onClick={() => setView('cards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'cards' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Cards
            </button>
          </div>
        </div>

        {loading ? (
          <div className="glass p-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass p-20 text-center text-slate-500">
            <Users size={36} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold mb-1">No personnel found</p>
            <p className="text-sm">{search ? 'Try a different search term.' : 'Add team members to get started.'}</p>
          </div>
        ) : view === 'table' ? (
          /* ── Table View ── */
          <div className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/5 font-bold">
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">License / ID</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((driver, i) => {
                    const role = driver.role || 'Personnel';
                    const RoleIcon = ROLE_ICON[role] ?? Users;
                    return (
                      <motion.tr
                        key={driver.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {driver.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <span className="font-bold text-white">{driver.full_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-lg text-[10px] font-bold ${ROLE_COLOR[role] ?? 'text-slate-400 bg-slate-800'}`}>
                            <RoleIcon size={11} />
                            {role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-slate-500">{driver.license_number || '—'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            {driver.phone && (
                              <button className="text-slate-500 hover:text-blue-400 transition-colors">
                                <Phone size={15} />
                              </button>
                            )}
                            {driver.email && (
                              <button className="text-slate-500 hover:text-blue-400 transition-colors">
                                <Mail size={15} />
                              </button>
                            )}
                            {!driver.phone && !driver.email && (
                              <span className="text-slate-600 text-xs">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            driver.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {driver.status === 'Active'
                              ? <CheckCircle2 size={10} />
                              : <XCircle size={10} />
                            }
                            {driver.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                              <Edit2 size={14} />
                            </button>
                            <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ── Card View ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((driver, i) => {
              const role = driver.role || 'Personnel';
              const RoleIcon = ROLE_ICON[role] ?? Users;
              return (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass p-6 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 flex items-center justify-center text-white font-bold text-lg">
                      {driver.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      driver.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {driver.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                      {driver.status || 'Unknown'}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">{driver.full_name}</h4>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${ROLE_COLOR[role] ?? 'text-slate-400 bg-slate-800'}`}>
                    <RoleIcon size={11} />
                    {role}
                  </span>
                  {driver.license_number && (
                    <p className="text-xs text-slate-500 font-mono mt-3">ID: {driver.license_number}</p>
                  )}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="flex-1 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5">
                      <Edit2 size={12} /> Edit
                    </button>
                    <button className="px-3 py-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold rounded-lg transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
