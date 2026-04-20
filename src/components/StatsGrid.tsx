import { TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useLogistics } from '../hooks/useLogistics';
import { useTasks } from '../hooks/useTasks';

export function StatsGrid() {
  const { projects } = useProjects();
  const { deliveries } = useLogistics();
  const { tasks } = useTasks();

  const activeProjectsCount = projects.filter(p => p.status === 'Active').length;
  const inTransitCount = deliveries.filter(d => d.status === 'In Transit').length;
  const blockedTasksCount = tasks.filter(t => t.status === 'Blocked').length;
  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100) 
    : 0;

  const stats = [
    { 
      label: 'Total Projects', 
      value: projects.length.toString(), 
      change: `${activeProjectsCount} active`, 
      type: 'positive',
      icon: Clock,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    { 
      label: 'Living Deliveries', 
      value: deliveries.length.toString(), 
      change: `${inTransitCount} in transit`, 
      type: 'positive',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      label: 'Critical Tasks', 
      value: blockedTasksCount.toString().padStart(2, '0'), 
      change: 'Requiring attention', 
      type: 'negative',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    { 
      label: 'Completion Rate', 
      value: `${completionRate}%`, 
      change: 'Overall roadmap', 
      type: 'positive',
      icon: CheckCircle2,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="glass p-6 group hover:border-white/20 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className={`text-xs font-semibold ${stat.type === 'positive' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
