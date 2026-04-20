import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Plus, CheckCircle2, AlertCircle, Package, Users as UsersIcon, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects, type Project } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useInventory } from '../hooks/useInventory';
import { NewTaskModal } from './NewTaskModal';
import { NewMaterialRequestModal } from './NewMaterialRequestModal';
import { Sidebar } from './Sidebar';

export function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProjectById } = useProjects();
  const { tasks, loading: tasksLoading, updateTaskStatus } = useTasks(id);
  const { inventory } = useInventory();
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

  const loadProject = useCallback(async () => {
    if (!id) return;
    const { data, error } = await fetchProjectById(id);
    if (!error && data) {
      setProject(data);
    }
    setLoading(false);
  }, [id, fetchProjectById]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  if (loading || tasksLoading) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen items-center justify-center text-white">
        Project not found.
      </div>
    );
  }

  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-72 p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </button>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest">Project ID: {id}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">On Track</span>
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">{project.name}</h1>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all border border-white/5">
                Edit Details
              </button>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                Generate Report
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="col-span-2 space-y-10">
            {/* Task Management */}
            <div className="glass overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-500" size={20} />
                  <h3 className="text-xl font-bold text-white">Execution Tasks</h3>
                </div>
                <button 
                  onClick={() => setIsTaskModalOpen(true)}
                  className="p-2 bg-blue-600/10 rounded-lg text-blue-400 hover:bg-blue-600/20 transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="p-2">
                {tasks.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">No tasks added to this project yet.</div>
                ) : (
                  tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all group"
                      onClick={() => task.status !== 'Done' && updateTaskStatus(task.id, 'Done')}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full border-2 border-white/20 flex items-center justify-center transition-all ${
                          task.status === 'Done' ? 'bg-emerald-500 border-emerald-500' : 'group-hover:border-blue-400'
                        }`}>
                          {task.status === 'Done' && <CheckCircle2 size={10} className="text-white" />}
                        </div>
                        <div>
                          <p className={`font-bold transition-all ${task.status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{task.status}</span>
                            <span className="text-[10px] text-slate-600">•</span>
                            <span className="text-[10px] text-slate-500 font-bold">{task.assigned_to}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        task.status === 'Blocked' ? 'bg-red-500/10 text-red-500' : 
                        task.status === 'Done' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Material Usage */}
            <div className="glass p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Package className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Project Resource Usage</h3>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMaterialModalOpen(true)}
                    className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20"
                  >
                    Request Delivery
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/inventory')}
                    className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Manage Stock
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {inventory.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">{item.name}</p>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-2xl font-bold text-white">{item.stock}</span>
                      <span className="text-xs text-slate-500">Threshold: {item.min_threshold} {item.unit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.stock > item.min_threshold ? 'bg-blue-500' : 'bg-amber-500'}`} 
                        style={{ width: `${Math.min((item.stock / (item.min_threshold * 2)) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                ))}
                {inventory.length === 0 && (
                  <div className="col-span-2 p-8 text-center text-slate-500 text-sm border border-dashed border-white/10 rounded-2xl">
                    No active resource tracking for this project.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-10">
            <div className="glass p-8">
              <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                <UsersIcon size={18} className="text-blue-400" />
                Project Stakeholders
              </h4>
              <div className="space-y-6">
                <Stakeholder name="Alex Rivers" role="Project Manager" />
                <Stakeholder name="Sarah Chen" role="Site Engineer" />
                <Stakeholder name="Mike Ross" role="Safety Officer" />
              </div>
            </div>

            <div className="glass p-8 bg-blue-600/5 border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                <AlertCircle size={16} />
                Safety Alert
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Strong winds forecasted for Floor 4 pouring. Ensure all safety harnesses are checked.
              </p>
            </div>
          </div>
        </div>
      </div>
      <NewTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        projectId={id || ''} 
      />
      <NewMaterialRequestModal 
        isOpen={isMaterialModalOpen} 
        onClose={() => setIsMaterialModalOpen(false)} 
        projectId={id || ''} 
        projectLocation={project.location}
      />
    </div>
  );
}

function Stakeholder({ name, role }: { name: string, role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-none mb-1">{name}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{role}</p>
      </div>
    </div>
  );
}
