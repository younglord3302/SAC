import { CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';

export function WorkerDashboard() {
  return (
    <div className="flex bg-[#0b1120] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 pt-24 lg:pt-10">
        
        <header className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">My Tasks</h1>
          <p className="text-slate-400">View what you need to do today.</p>
        </header>

        <div className="max-w-2xl mx-auto lg:mx-0 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-slate-900 border border-blue-500/20 shadow-lg shadow-blue-500/5">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">Current Task</span>
                   <h3 className="text-xl font-bold text-white">Deliver Foundation Concrete</h3>
                   <p className="text-slate-400 text-sm mt-1">Site C - North Wing</p>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="p-4 bg-[#0b1120] rounded-xl border border-white/5">
                 <div className="text-xs text-slate-500 font-bold uppercase mb-1">Time Due</div>
                 <div className="text-white font-medium">14:00 PM</div>
               </div>
               <div className="p-4 bg-[#0b1120] rounded-xl border border-white/5 flex flex-col items-center justify-center text-blue-400 hover:bg-blue-500/10 cursor-pointer transition-colors">
                 <Navigation size={20} className="mb-1" />
                 <span className="text-xs font-bold">Navigate</span>
               </div>
             </div>

             <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex justify-center items-center gap-2">
               <CheckCircle2 size={20} /> Complete Task
             </button>
          </motion.div>

          <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 active:scale-[0.98] flex justify-center items-center gap-2">
            <AlertCircle size={20} className="text-rose-400" /> Report Issue
          </button>
        </div>

      </main>
    </div>
  );
}
