import { User, Shield, Key, Bell, Globe, Save, ChevronRight, HardHat, Check, Lock, Eye, EyeOff } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    lowStock: true,
    taskBlocked: true,
    deliveryComplete: false,
    dailyReport: true,
    projectDelay: true,
  });
  const [platform, setPlatform] = useState({
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'English',
    theme: 'dark',
  });

  const tabs = [
    { id: 'account',       label: 'Account',       icon: User },
    { id: 'roles',         label: 'Team Roles',    icon: Shield },
    { id: 'security',      label: 'Security',      icon: Key },
    { id: 'notifications', label: 'Alert Prefs',   icon: Bell },
    { id: 'platform',      label: 'Platform',      icon: Globe },
  ];

  const handleSave = () => {
    setSaved(true);
    toast.success('Settings saved successfully!');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Platform Settings</h1>
          <p className="text-slate-400">Configure your construction OS and team permissions.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs Sidebar */}
          <aside className="w-full lg:w-60 space-y-1 flex-shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                }`}
              >
                <tab.icon size={17} />
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto opacity-70" />}
              </button>
            ))}

            <div className="pt-6 border-t border-white/5 mt-4">
              <div className="glass p-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Current Plan</p>
                <p className="text-white font-bold text-lg">Pro</p>
                <p className="text-slate-500 text-xs mt-1">₹2,999/month</p>
                <button className="mt-3 w-full py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold rounded-lg transition-all">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </aside>

          {/* Settings Content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="glass p-8"
            >

              {/* ── ACCOUNT ─────────────────────────────── */}
              {activeTab === 'account' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-600/20">
                      SA
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">M/s. S.A Construction</h3>
                      <p className="text-slate-500 text-sm">Admin Account • Full Access</p>
                      <button className="text-xs font-bold text-blue-400 mt-2 hover:underline">Change Logo</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField label="Company Name" defaultValue="M/s. S.A Construction" />
                    <FormField label="Admin Name" defaultValue="Site Director" />
                    <FormField label="Email Address" type="email" defaultValue="admin@saconstruction.com" />
                    <FormField label="Phone Number" type="tel" defaultValue="+91 98765 43210" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Office Address</label>
                    <textarea
                      rows={2}
                      defaultValue="123 Site HQ, Sector 7, Mumbai, Maharashtra 400001"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white resize-none"
                    />
                  </div>

                  <SaveButton onSave={handleSave} saved={saved} />
                </div>
              )}

              {/* ── TEAM ROLES ───────────────────────────── */}
              {activeTab === 'roles' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Team Roles & Permissions</h3>
                    <button className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold rounded-xl transition-all">
                      + Add Role
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { role: 'Admin', access: 'Full platform access · Billing · Settings', icon: Shield, color: 'text-red-400 bg-red-500/10', members: 1 },
                      { role: 'Site Manager', access: 'Projects · Tasks · Team · Materials', icon: HardHat, color: 'text-amber-400 bg-amber-500/10', members: 3 },
                      { role: 'Logistics Op', access: 'Fleet · Deliveries · Driver management', icon: User, color: 'text-blue-400 bg-blue-500/10', members: 5 },
                      { role: 'Safety Inspector', access: 'Reports · Audits · View-only', icon: Eye, color: 'text-emerald-400 bg-emerald-500/10', members: 2 },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 ${r.color} rounded-xl`}>
                            <r.icon size={17} />
                          </div>
                          <div>
                            <p className="font-bold text-white">{r.role}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{r.access}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-600 hidden md:block">{r.members} members</span>
                          <button className="text-xs font-bold text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-all">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECURITY ─────────────────────────────── */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-white">Security Settings</h3>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                          className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <FormField label="New Password" type="password" placeholder="Min 8 characters" />
                    <FormField label="Confirm New Password" type="password" placeholder="Repeat new password" />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <Lock size={17} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-bold text-white">SMS / Email OTP</p>
                          <p className="text-xs text-slate-500">Adds an extra layer of security on login</p>
                        </div>
                      </div>
                      <Toggle defaultOn={false} />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold text-white">Active Sessions</h4>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">Chrome on Windows</p>
                        <p className="text-xs text-slate-500 mt-0.5">Mumbai, IN · Active now</p>
                      </div>
                      <span className="text-xs text-emerald-400 font-bold">Current</span>
                    </div>
                  </div>

                  <SaveButton onSave={handleSave} saved={saved} label="Update Password" />
                </div>
              )}

              {/* ── NOTIFICATION PREFS ───────────────────── */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">Alert Preferences</h3>
                  <p className="text-slate-500 text-sm">Choose which events send you an alert in your notification center.</p>

                  <div className="space-y-3 pt-2">
                    {[
                      { key: 'lowStock', label: 'Critical Low Stock', desc: 'When any inventory item drops below threshold' },
                      { key: 'taskBlocked', label: 'Task Blocked', desc: "When a task's status changes to Blocked" },
                      { key: 'deliveryComplete', label: 'Delivery Completed', desc: 'When a delivery is marked as Delivered' },
                      { key: 'dailyReport', label: 'Daily Summary Report', desc: 'A digest of daily site activity every evening' },
                      { key: 'projectDelay', label: 'Project Delay Risk', desc: 'AI detects potential schedule overrun' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <div>
                          <p className="text-sm font-bold text-white">{label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                        </div>
                        <Toggle
                          defaultOn={notifications[key as keyof typeof notifications]}
                          onChange={(val) => setNotifications(n => ({ ...n, [key]: val }))}
                        />
                      </div>
                    ))}
                  </div>

                  <SaveButton onSave={handleSave} saved={saved} label="Save Preferences" />
                </div>
              )}

              {/* ── PLATFORM ─────────────────────────────── */}
              {activeTab === 'platform' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-white">Platform Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectField
                      label="Currency"
                      value={platform.currency}
                      options={['INR', 'USD', 'AED', 'EUR']}
                      onChange={v => setPlatform(p => ({ ...p, currency: v }))}
                    />
                    <SelectField
                      label="Timezone"
                      value={platform.timezone}
                      options={['Asia/Kolkata', 'Asia/Dubai', 'America/New_York', 'Europe/London']}
                      onChange={v => setPlatform(p => ({ ...p, timezone: v }))}
                    />
                    <SelectField
                      label="Language"
                      value={platform.language}
                      options={['English', 'Hindi', 'Arabic']}
                      onChange={v => setPlatform(p => ({ ...p, language: v }))}
                    />
                    <SelectField
                      label="UI Theme"
                      value={platform.theme}
                      options={['dark', 'light']}
                      onChange={v => setPlatform(p => ({ ...p, theme: v }))}
                    />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold text-white">Danger Zone</h4>
                    <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
                      <p className="text-sm font-bold text-white mb-1">Delete Organization</p>
                      <p className="text-xs text-slate-500 mb-4">This will permanently erase all projects, deliveries, and team data. This action cannot be undone.</p>
                      <button className="px-5 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold rounded-lg transition-all border border-red-500/30">
                        Delete Organization
                      </button>
                    </div>
                  </div>

                  <SaveButton onSave={handleSave} saved={saved} label="Save Configuration" />
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Shared Sub-Components ─────────────────────── */

function FormField({ label, type = 'text', defaultValue = '', placeholder = '' }: {
  label: string; type?: string; defaultValue?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white transition-all"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/5 focus:border-blue-500/50 outline-none text-sm text-white transition-all"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({ defaultOn, onChange }: { defaultOn: boolean; onChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(defaultOn);
  const toggle = () => {
    setOn(v => { onChange?.(!v); return !v; });
  };
  return (
    <button
      onClick={toggle}
      className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${on ? 'bg-blue-600' : 'bg-slate-700'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${on ? 'left-5' : 'left-0.5'}`} />
    </button>
  );
}

function SaveButton({ onSave, saved, label = 'Save Changes' }: {
  onSave: () => void; saved: boolean; label?: string;
}) {
  return (
    <div className="pt-4 flex justify-end">
      <button
        onClick={onSave}
        className={`px-8 py-3 font-bold rounded-xl transition-all flex items-center gap-2 text-sm ${
          saved
            ? 'bg-emerald-600 text-white'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
        }`}
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? 'Saved!' : label}
      </button>
    </div>
  );
}
