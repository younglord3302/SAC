import { useState } from 'react';
import { Users, UserPlus, Search, Edit2, Trash2, HardHat, Truck, Shield, Phone, Mail, CheckCircle2, XCircle, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useDrivers } from '../hooks/useDrivers';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

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
const ROLES = ['Driver', 'Engineer', 'Manager', 'Inspector'];

interface AddMemberForm {
  full_name: string;
  role: string;
  license_number: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}

function AddMemberModal({ onClose, onAdd }: { onClose: () => void; onAdd: (form: AddMemberForm) => Promise<void> }) {
  const [form, setForm] = useState<AddMemberForm>({
    full_name: '', role: 'Driver', license_number: '', phone: '', email: '', status: 'Active',
  });
  const [loading, setLoading] = useState(false);

  const set = (key: keyof AddMemberForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim()) return toast.error('Name is required.');
    setLoading(true);
    await onAdd(form);
    setLoading(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Add Team Member</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full Name *" value={form.full_name} onChange={set('full_name')} placeholder="e.g. Ramesh Kumar" />
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role</label>
            <select
              value={form.role}
              onChange={set('role')}
              className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white"
            >
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <Field label="License / ID Number" value={form.license_number} onChange={set('license_number')} placeholder="e.g. DL-MH-1234567" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" value={form.phone} onChange={set('phone')} placeholder="+91 98765..." />
            <Field label="Email" value={form.email} onChange={set('email')} placeholder="name@company.com" type="email" />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 font-bold transition-all text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 text-sm disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white transition-all"
      />
    </div>
  );
}

export function TeamManagement() {
  const { drivers, loading, addDriver } = useDrivers();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [showModal, setShowModal] = useState(false);

  const filtered = drivers.filter(d =>
    d.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (d.role ?? '').toLowerCase().includes(search.toLowerCase())
  );

  // Live stats from real data
  const byRole = (role: string) => drivers.filter(d => d.role === role).length;
  const deptStats = [
    { label: 'Engineers',       count: byRole('Engineer'),  icon: HardHat, color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Drivers',         count: byRole('Driver'),    icon: Truck,   color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Safety Officers', count: byRole('Inspector'), icon: Shield,  color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Total Personnel', count: drivers.length,      icon: Users,   color: 'text-white bg-white/10' },
  ];

  const handleAdd = async (form: AddMemberForm) => {
    const { error } = await addDriver(form);
    if (!error) {
      toast.success(`${form.full_name} added to the team!`);
    } else {
      toast.error('Failed to add member. Check Supabase RLS policies.');
    }
  };

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Team & Resources</h1>
            <p className="text-slate-400 text-sm">Manage site engineers, operators, and fleet drivers.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="self-start md:self-auto px-6 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Member
          </button>
        </header>

        {/* Live Department Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {deptStats.map((s, i) => (
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
            {(['table', 'cards'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${view === v ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="glass p-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass p-20 text-center text-slate-500">
            <Users size={36} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold mb-1">{search ? 'No personnel match your search.' : 'No team members yet.'}</p>
            <p className="text-sm">{!search && 'Click "Add Member" to get started.'}</p>
          </div>
        ) : view === 'table' ? (
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
                            <div>
                              <p className="font-bold text-white text-sm">{driver.full_name}</p>
                              {driver.email && <p className="text-xs text-slate-500">{driver.email}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-lg text-[10px] font-bold ${ROLE_COLOR[role] ?? 'text-slate-400 bg-slate-800'}`}>
                            <RoleIcon size={11} /> {role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-slate-500">{driver.license_number || '—'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            {driver.phone && <a href={`tel:${driver.phone}`} className="text-slate-500 hover:text-blue-400 transition-colors"><Phone size={14} /></a>}
                            {driver.email && <a href={`mailto:${driver.email}`} className="text-slate-500 hover:text-blue-400 transition-colors"><Mail size={14} /></a>}
                            {!driver.phone && !driver.email && <span className="text-slate-700 text-xs">—</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[10px] font-bold ${driver.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                            {driver.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
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
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${driver.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {driver.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                      {driver.status || 'Unknown'}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-2">{driver.full_name}</h4>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${ROLE_COLOR[role] ?? 'text-slate-400 bg-slate-800'}`}>
                    <RoleIcon size={11} /> {role}
                  </span>
                  {driver.license_number && <p className="text-xs text-slate-500 font-mono mt-3">ID: {driver.license_number}</p>}
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

      <AnimatePresence>
        {showModal && <AddMemberModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
      </AnimatePresence>
    </div>
  );
}
