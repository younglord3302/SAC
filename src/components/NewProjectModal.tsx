import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HardHat, MapPin, IndianRupee, Calendar, Construction, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useProjects } from '../hooks/useProjects';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const { createProject } = useProjects();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    budget: '',
    timeline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await createProject({
        name: formData.name,
        location: formData.location,
        budget: parseFloat(formData.budget) || 0,
        status: 'Active',
        progress: 0,
      });

      if (error) throw error;
      
      onClose();
      setFormData({ name: '', location: '', budget: '', timeline: '' });
      toast.success('Project created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#0b1120] border border-white/5 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Construction size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Initialize Project</h2>
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
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Project Name</label>
                  <div className="relative group">
                    <HardHat className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Skyline Towers Phase 2"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Location</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City, State"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Budget (Est.)</label>
                    <div className="relative group">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                      <input 
                        type="number" 
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="In Crores"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Timeline</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                      type="date" 
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all text-white"
                    />
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
                        Launch Project
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
