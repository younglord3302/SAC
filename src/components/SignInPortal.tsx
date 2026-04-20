import { motion } from 'framer-motion';
import { HardHat, Truck, Building2, ArrowRight } from 'lucide-react';
import { SignIn } from '@clerk/react';
import { useState } from 'react';

export function SignInPortal() {
  const [selectedRole, setSelectedRole] = useState<'worker' | 'contractor' | 'owner' | null>(null);

  const portals = [
    {
      id: 'worker',
      title: 'Worker Portal',
      desc: 'Site execution & daily tasks',
      icon: HardHat,
      color: 'blue',
      gradient: 'from-blue-600/20 to-blue-900/20',
      border: 'border-blue-500/20'
    },
    {
      id: 'contractor',
      title: 'Contractor Hub',
      desc: 'Logistics & project management',
      icon: Truck,
      color: 'indigo',
      gradient: 'from-indigo-600/20 to-indigo-900/20',
      border: 'border-indigo-500/20'
    },
    {
      id: 'owner',
      title: 'Executive View',
      desc: 'Portfolio analytics & ROI',
      icon: Building2,
      color: 'emerald',
      gradient: 'from-emerald-600/20 to-emerald-900/20',
      border: 'border-emerald-500/20'
    }
  ];

  if (selectedRole) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <button 
          onClick={() => setSelectedRole(null)}
          className="mb-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Role Selection
        </button>
        <div className="relative">
          <div className={`absolute -inset-1 blur-2xl opacity-20 bg-gradient-to-r ${
            selectedRole === 'worker' ? 'from-blue-500' : 
            selectedRole === 'contractor' ? 'from-indigo-500' : 'from-emerald-500'
          } to-transparent`} />
          <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/dashboard" />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white mb-4"
        >
          Welcome to SAC
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg"
        >
          Select your destination to begin
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portals.map((portal, i) => (
          <motion.div
            key={portal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedRole(portal.id as any)}
            className={`group cursor-pointer p-8 rounded-3xl bg-slate-900/50 border ${portal.border} backdrop-blur-xl relative overflow-hidden transition-all hover:bg-slate-900 hover:shadow-2xl hover:shadow-${portal.color}-500/10`}
          >
            {/* Hover Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className={`w-16 h-16 rounded-2xl bg-${portal.id === 'worker' ? 'blue' : portal.id === 'contractor' ? 'indigo' : 'emerald'}-500/10 flex items-center justify-center mb-6 relative z-10`}>
              <portal.icon className={`text-${portal.id === 'worker' ? 'blue' : portal.id === 'contractor' ? 'indigo' : 'emerald'}-400 group-hover:scale-110 transition-transform`} size={32} />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">{portal.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {portal.desc}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                Enter Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
