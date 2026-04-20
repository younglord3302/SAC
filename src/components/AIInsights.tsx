import { BrainCircuit, TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useInventory } from '../hooks/useInventory';

export function AIInsights() {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { inventory } = useInventory();

  const blockedTasks = tasks.filter(t => t.status === 'Blocked');
  const criticalStock = inventory.filter(i => i.stock <= i.min_threshold);
  const activeProjects = projects.filter(p => p.status === 'In Progress' || p.status === 'Active');
  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)
    : 0;

  const insights = [
    {
      title: blockedTasks.length > 0 ? `${blockedTasks.length} Task${blockedTasks.length > 1 ? 's' : ''} Blocked` : 'All Tasks On Track',
      description: blockedTasks.length > 0
        ? `"${blockedTasks[0]?.title ?? 'Unknown task'}" is currently blocked and needs immediate attention to avoid schedule overrun.`
        : 'No blocked tasks detected. All site operations are flowing on schedule.',
      type: blockedTasks.length > 0 ? 'risk' : 'opportunity',
      action: blockedTasks.length > 0 ? 'View Blocked Tasks' : 'View All Tasks',
    },
    {
      title: criticalStock.length > 0 ? `${criticalStock.length} Items at Critical Stock` : 'Inventory Healthy',
      description: criticalStock.length > 0
        ? `"${criticalStock[0]?.name ?? 'Material'}" is below minimum threshold. Reorder immediately to prevent site stoppage.`
        : 'All inventory items are above their minimum re-order levels. No action required.',
      type: criticalStock.length > 0 ? 'maintenance' : 'opportunity',
      action: 'Review Inventory',
    },
    {
      title: `${completionRate}% Overall Completion`,
      description: activeProjects.length > 0
        ? `${activeProjects.length} project${activeProjects.length > 1 ? 's are' : ' is'} actively in progress. Based on current velocity, on-time delivery looks ${completionRate >= 60 ? 'achievable' : 'at risk'}.`
        : 'No projects currently in progress. Deploy a new project to begin site tracking.',
      type: completionRate >= 60 ? 'opportunity' : 'risk',
      action: 'Open Project Board',
    },
  ];

  return (
    <div className="glass p-8 bg-blue-600/5 border-blue-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
          <BrainCircuit size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">AI Operational Insights</h3>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Live Intelligence · Real Data</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${
                insight.type === 'risk'        ? 'bg-red-500/10 text-red-400' :
                insight.type === 'opportunity' ? 'bg-emerald-500/10 text-emerald-400' :
                                                 'bg-amber-500/10 text-amber-400'
              }`}>
                {insight.type === 'risk'        ? <AlertTriangle size={17} /> :
                 insight.type === 'opportunity' ? <TrendingUp size={17} /> :
                                                  <Lightbulb size={17} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold mb-1 text-sm">{insight.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{insight.description}</p>
                <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  {insight.action}
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
