import { 
  LayoutDashboard, 
  Construction, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Package
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../hooks/useNotifications';
import { useUser, useClerk } from '@clerk/react';
import { useRole } from '../hooks/useRole';
import { Bell } from 'lucide-react';
import { Logo } from './Logo';

// Define base items
const baseMenuItems = [
  { icon: LayoutDashboard, label: 'Overview',   path: '/dashboard',          roles: ['owner', 'contractor', 'worker'] },
  { icon: Construction,   label: 'Projects',   path: '/dashboard/projects', roles: ['owner', 'contractor'] },
  { icon: Truck,          label: 'Logistics',  path: '/dashboard/logistics',roles: ['contractor'] },
  { icon: Users,          label: 'Team',       path: '/dashboard/team',     roles: ['owner', 'contractor'] },
  { icon: Package,        label: 'Materials',  path: '/dashboard/inventory',roles: ['contractor'] },
  { icon: Bell,           label: 'Alerts',     path: '/dashboard/notifications',     roles: ['owner', 'contractor', 'worker'] },
  { icon: BarChart3,      label: 'Analytics',  path: '/dashboard/analytics',roles: ['owner'] },
];

function NavContent({ location, setIsOpen }: { location: ReturnType<typeof useLocation>, setIsOpen: (open: boolean) => void }) {
  const { notifications } = useNotifications();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { role } = useRole();
  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = baseMenuItems.filter(item => item.roles.includes(role));
  
  return (
    <>
      <Link to="/" className="flex items-center gap-3 mb-10 px-2 group">
        <div className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform">
          <Logo />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">S.A Construction</span>
      </Link>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = item.path === '/dashboard'
            ? location.pathname === '/dashboard'
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-blue-400' : 'group-hover:text-blue-400'} />
              {item.label}
              {item.label === 'Alerts' && unreadCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-2">
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-slate-900/50 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              {user.primaryEmailAddress?.emailAddress?.[0].toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user.primaryEmailAddress?.emailAddress}</p>
              <p className="text-[10px] text-slate-400 capitalize">{role}</p>
            </div>
          </div>
        )}
        <Link to="/dashboard/settings" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === '/dashboard/settings' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
          <Settings size={20} />
          Settings
        </Link>
        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );
}

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 h-screen fixed left-0 top-0 border-r border-white/5 bg-[#0f172a] p-6 flex-col z-50">
        <NavContent location={location} setIsOpen={setIsOpen} />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full z-[60] h-16 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 text-blue-500">
            <Logo />
          </div>
          <span className="text-base font-bold tracking-tight text-white">S.A Construction</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[70] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-80 h-screen bg-[#0f172a] p-6 flex flex-col z-[80] lg:hidden shadow-2xl"
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <NavContent location={location} setIsOpen={setIsOpen} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
