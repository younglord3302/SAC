import { CheckCircle2, Navigation, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useTasks } from '../hooks/useTasks';
import { useUser } from '@clerk/react';
import toast from 'react-hot-toast';

const statusColors: Record<string, string> = {
  'Todo': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Done': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Blocked': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export function WorkerDashboard() {
  const { user } = useUser();
  const { tasks, loading, updateTaskStatus } = useTasks();

  // Filter tasks assigned to current user (by email or user ID)
  const myEmail = user?.primaryEmailAddress?.emailAddress;
  const myTasks = tasks.filter(t =>
    t.assigned_to === myEmail || t.assigned_to === user?.id
  );

  // Fall back to all tasks if none are assigned to me (for demo/testing)
  const displayTasks = myTasks.length > 0 ? myTasks : tasks;

  const pendingTasks = displayTasks.filter(t => t.status !== 'Done');
  const doneTasks = displayTasks.filter(t => t.status === 'Done');

  const handleComplete = async (id: string) => {
    const result = await updateTaskStatus(id, 'Done');
    if (!result.error) {
      toast.success('Task marked as complete!');
    } else {
      toast.error('Failed to update task.');
    }
  };

  const handleBlock = async (id: string) => {
    const result = await updateTaskStatus(id, 'Blocked');
    if (!result.error) {
      toast.success('Task flagged as blocked. Supervisor notified.');
    }
  };

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 pt-24 lg:pt-10">

        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
            Good day, {user?.firstName || 'Team Member'} 👷
          </h1>
          <p className="text-slate-400 text-sm">
            {pendingTasks.length} task{pendingTasks.length !== 1 ? 's' : ''} remaining today · {doneTasks.length} completed
          </p>
        </header>

        {/* Progress Bar */}
        {displayTasks.length > 0 && (
          <div className="max-w-2xl mx-auto lg:mx-0 mb-8">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              <span>Daily Progress</span>
              <span>{Math.round((doneTasks.length / displayTasks.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(doneTasks.length / displayTasks.length) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
              />
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto lg:mx-0 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="text-blue-400 animate-spin" size={32} />
            </div>
          ) : displayTasks.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-500/30" />
              <p className="font-bold text-lg text-slate-400">All clear! No tasks assigned.</p>
              <p className="text-sm mt-1">Check back with your supervisor for new assignments.</p>
            </div>
          ) : (
            displayTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-2xl bg-slate-900 border shadow-lg transition-all ${
                  task.status === 'Done' ? 'opacity-50 border-white/5' : 'border-blue-500/20 shadow-blue-500/5'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block border ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                    <h3 className={`text-xl font-bold ${task.status === 'Done' ? 'line-through text-slate-500' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    {task.due_date && (
                      <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
                        <Clock size={12} /> Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {task.status !== 'Done' && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex justify-center items-center gap-2 text-sm"
                    >
                      <CheckCircle2 size={16} /> Mark Complete
                    </button>
                    <button
                      onClick={() => handleBlock(task.id)}
                      className="py-3 bg-slate-800 hover:bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2 text-sm"
                    >
                      <AlertCircle size={16} /> Report Issue
                    </button>
                  </div>
                )}
                {task.status === 'Done' && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mt-2">
                    <CheckCircle2 size={16} /> Completed
                  </div>
                )}
              </motion.div>
            ))
          )}

          {/* Navigate button */}
          {displayTasks.length > 0 && (
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 active:scale-[0.98] flex justify-center items-center gap-2">
              <Navigation size={20} className="text-blue-400" /> Navigate to Site
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
