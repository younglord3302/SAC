import { useState } from 'react';
import { motion } from 'framer-motion';
import { HardHat, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Signup successful! Welcome to SAC.');
      }
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during authentication');
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1120] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 mb-6 group cursor-pointer" onClick={() => navigate('/')}>
            <HardHat className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join SAC'}
          </h1>
          <p className="text-slate-400 mt-2">
            {isLogin ? 'Enter your credentials to access the console' : 'Start managing construction & logistics better'}
          </p>
        </div>

        <div className="glass p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase letter tracking-widest">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-white/5 focus:border-blue-500/50 outline-none text-sm transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>


          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex gap-4">
              <button className="flex-1 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-slate-400 text-sm font-medium">
                Google Login
              </button>
              <button className="flex-1 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-slate-400 text-sm font-medium">
                GitHub Login
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="font-bold text-white ml-1">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
