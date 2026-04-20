import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { HardHat, Truck, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRole } from '../hooks/useRole';

const roleFlows = {
  owner: {
    icon: Building2,
    color: 'indigo',
    title: 'Executive Portfolio',
    description: "You have access to the full financial overview. Monitor all projects, budgets, and risks from one place.",
    steps: [
      { label: 'View Dashboard', path: '/dashboard', desc: 'See your live KPIs and capital deployment curve' },
      { label: 'Browse Projects', path: '/dashboard/projects', desc: 'Drill into individual project progress' },
      { label: 'Analytics', path: '/dashboard/analytics', desc: 'Deep-dive into operational efficiency metrics' },
    ],
  },
  contractor: {
    icon: Truck,
    color: 'blue',
    title: 'Operations Center',
    description: "You control the full construction lifecycle — from project creation to delivery execution.",
    steps: [
      { label: 'Create a Project', path: '/dashboard', desc: 'Set up site parameters and assign team members' },
      { label: 'Manage Logistics', path: '/dashboard/logistics', desc: 'Assign vehicles, track deliveries, update status' },
      { label: 'Track Materials', path: '/dashboard/inventory', desc: 'Monitor stock levels and request deliveries' },
    ],
  },
  worker: {
    icon: HardHat,
    color: 'blue',
    title: 'Site Execution',
    description: "Your workspace is focused on task execution. Complete your assignments and report issues in real-time.",
    steps: [
      { label: 'My Tasks', path: '/dashboard', desc: 'View all tasks assigned to you today' },
      { label: 'Notifications', path: '/dashboard/notifications', desc: 'Check updates and alerts from your supervisor' },
    ],
  },
};

export function OnboardingPage() {
  const { user } = useUser();
  const { role } = useRole();
  const navigate = useNavigate();

  const flow = roleFlows[role];
  const Icon = flow.icon;
  const colorMap: Record<string, string> = {
    indigo: 'from-indigo-600/20 border-indigo-500/20 text-indigo-400',
    blue: 'from-blue-600/20 border-blue-500/20 text-blue-400',
  };
  const colorClass = colorMap[flow.color];

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 rounded-3xl bg-gradient-to-br ${colorClass.split(' ')[0]} to-slate-900 border ${colorClass.split(' ')[1]} backdrop-blur-xl`}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-3 rounded-2xl bg-white/5`}>
              <Icon className={colorClass.split(' ')[2]} size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                Welcome, {user?.firstName || 'Team Member'}
              </p>
              <h1 className="text-2xl font-black text-white">{flow.title}</h1>
            </div>
          </div>

          <p className="text-slate-400 mb-10 leading-relaxed">{flow.description}</p>

          {/* Workflow Steps */}
          <div className="space-y-4 mb-10">
            {flow.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-black text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{step.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
                </div>
                <CheckCircle2 size={16} className="text-slate-700" />
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 text-base"
          >
            Enter {flow.title} <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Logged in as <span className="text-slate-400 font-medium">{user?.primaryEmailAddress?.emailAddress}</span> · Role: <span className="text-blue-400 font-bold capitalize">{role}</span>
        </p>
      </div>
    </div>
  );
}
