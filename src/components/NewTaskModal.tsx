import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, User, Calendar, Type, ChevronRight, Loader2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useDrivers } from '../hooks/useDrivers';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export function NewTaskModal({ isOpen, onClose, projectId }: NewTaskModalProps) {
  const { createTask } = useTasks(projectId);
  const { drivers } = useDrivers();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    assigned_to: '',
    due_date: '',
    status: 'Todo' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await createTask({
        project_id: projectId,
        title: formData.title,
        assigned_to: formData.assigned_to,
        due_date: formData.due_date,
        status: formData.status,
      });

      if (error) throw error;
      
      onClose();
      setFormData({ title: '', assigned_to: '', due_date: '', status: 'Todo' });
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0b1120] border border-white/5 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Assign Task</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-400 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Task Title</label>
                  <div className="relative group">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Foundation Pouring - Sector 4"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Assigned To</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                      <select 
                        required
                        value={formData.assigned_to}
                        onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white appearance-none"
                      >
                        <option value="">Select Personnel</option>
                        {drivers.map(p => (
                          <option key={p.id} value={p.full_name}>{p.full_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Due Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                      <input 
                        type="date" 
                        required
                        value={formData.due_date}
                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Assign Task
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                          <ChevronRight size={14} />
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
