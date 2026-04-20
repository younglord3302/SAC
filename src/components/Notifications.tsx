import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle2, Clock, Trash2, ShieldAlert } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useNotifications } from '../hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';

export function Notifications() {
  const { notifications, markAsRead } = useNotifications();
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Notification Center</h1>
            <p className="text-slate-400 text-sm">Real-time alerts and site signals.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Filter tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-white/5">
              {(['all', 'unread'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                    filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
                </button>
              ))}
            </div>
            <button
              onClick={() => filtered.forEach(n => !n.read && markAsRead(n.id))}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all"
            >
              <Trash2 size={14} />
              Mark All Read
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-slate-700">
                <Bell size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">All caught up!</h3>
                <p className="text-slate-500">No new alerts or site signals at the moment.</p>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {filtered.map((notification, i) => (
                <motion.div 
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass p-6 flex items-start gap-6 group relative overflow-hidden ${!notification.read ? 'border-l-4 border-blue-500' : 'opacity-60'}`}
                >
                  <div className={`p-3 rounded-2xl ${
                    notification.type === 'Urgent' ? 'bg-red-500/10 text-red-500' :
                    notification.type === 'Warning' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {notification.type === 'Urgent' ? <ShieldAlert size={24} /> : 
                     notification.type === 'Warning' ? <AlertTriangle size={24} /> : 
                     <Info size={24} />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-lg font-bold text-white">{notification.title}</h4>
                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors">Dismiss</button>
                    </div>
                  </div>

                  {!notification.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* System Health Status */}
        <div className="mt-20 p-8 glass bg-emerald-500/5 border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white">System Heartbeat: Healthy</h4>
              <p className="text-slate-500 text-sm">All backend synchronizations are active and live.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Live</span>
          </div>
        </div>
      </main>
    </div>
  );
}
