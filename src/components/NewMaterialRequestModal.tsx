import { useState } from 'react';
import { X, Truck, Package, MapPin } from 'lucide-react';
import { useLogistics } from '../hooks/useLogistics';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectLocation: string;
}

export function NewMaterialRequestModal({ isOpen, onClose, projectId, projectLocation }: Props) {
  const { createDelivery } = useLogistics();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    material_type: '',
    origin: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createDelivery({
        project_id: projectId,
        vehicle_id: 'pending-assignment', // Will be assigned by logistics manager
        status: 'Pending',
        origin: formData.origin,
        destination: projectLocation,
        material_type: formData.material_type,
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to create material request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1120]/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Truck className="text-blue-500" />
              Request Material
            </h2>
            <p className="text-sm text-slate-400 mt-1">Triggers a logistics delivery job.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Material Type & Quantity</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={formData.material_type}
                onChange={e => setFormData({...formData, material_type: e.target.value})}
                placeholder="e.g. 5 Tons of Cement"
                className="w-full bg-[#0b1120] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Supplier / Origin</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={formData.origin}
                onChange={e => setFormData({...formData, origin: e.target.value})}
                placeholder="Where is it coming from?"
                className="w-full bg-[#0b1120] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              {loading ? 'Submitting...' : 'Send Logistics Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
