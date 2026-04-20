import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, MapPin, Package, Construction, ChevronRight, Loader2 } from 'lucide-react';
import { useLogistics } from '../hooks/useLogistics';
import { useProjects } from '../hooks/useProjects';
import { useVehicles } from '../hooks/useVehicles';

interface NewDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewDeliveryModal({ isOpen, onClose }: NewDeliveryModalProps) {
  const { createDelivery } = useLogistics();
  const { projects } = useProjects();
  const { vehicles } = useVehicles();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    project_id: '',
    vehicle_id: '',
    destination: '',
    material_type: '',
    origin: 'Central Warehouse'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project_id || !formData.vehicle_id) {
      setError('Please select both a project and a vehicle.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await createDelivery({
        project_id: formData.project_id,
        vehicle_id: formData.vehicle_id,
        destination: formData.destination,
        material_type: formData.material_type,
        origin: formData.origin,
        status: 'In Transit'
      });

      if (error) throw error;
      
      onClose();
      setFormData({ 
        project_id: '', 
        vehicle_id: '', 
        destination: '', 
        material_type: '',
        origin: 'Central Warehouse'
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create delivery');
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
            className="relative w-full max-w-xl bg-[#0b1120] border border-white/5 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                    <Truck size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Schedule Delivery</h2>
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Project</label>
                    <div className="relative group">
                      <Construction className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                      <select 
                        required
                        value={formData.project_id}
                        onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-emerald-500/50 outline-none text-sm transition-all text-white appearance-none"
                      >
                        <option value="">Select Project</option>
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Vehicle</label>
                    <div className="relative group">
                      <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                      <select 
                        required
                        value={formData.vehicle_id}
                        onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-emerald-500/50 outline-none text-sm transition-all text-white appearance-none"
                      >
                        <option value="">Select Vehicle</option>
                        {vehicles.filter(v => v.status === 'Idle').map(v => (
                          <option key={v.id} value={v.id}>{v.registration_number} ({v.model})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Material Type</label>
                  <div className="relative group">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.material_type}
                      onChange={(e) => setFormData({ ...formData, material_type: e.target.value })}
                      placeholder="e.g. Reinforcement Steel, Ready-mix Concrete"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-emerald-500/50 outline-none text-sm transition-all text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Destination</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="Enter site delivery point"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-emerald-500/50 outline-none text-sm transition-all text-white"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Dispatch Delivery
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
