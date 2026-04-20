import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth, SignUp } from '@clerk/react';
import { SignInPortal } from './components/SignInPortal';
import { motion } from 'framer-motion';
import { BarChart3, ChevronRight } from 'lucide-react';
import heroImg from './assets/hero.png';
import { Dashboard } from './components/Dashboard';
import { ProjectDetails } from './components/ProjectDetails';
import { LogisticsDashboard } from './components/LogisticsDashboard';
import { TeamManagement } from './components/TeamManagement';
import { Inventory } from './components/Inventory';
import { Projects } from './components/Projects';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { Notifications } from './components/Notifications';
import { Logo } from './components/Logo';
import { MarketingSections } from './components/MarketingSections';
import { OnboardingPage } from './components/OnboardingPage';

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-slate-100 selection:bg-blue-500/30 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-blue-500">
                <Logo />
              </div>
              <span className="text-xl font-bold tracking-tight">M/s. S.A Construction</span>
            </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#materials" className="hover:text-white transition-colors">Materials</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="px-5 py-2 text-sm font-semibold hover:text-blue-400 transition-colors">Login</Link>
            <Link to="/sign-up" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              Launch Console
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            SAC — The OS for Construction & Logistics
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold max-w-4xl text-white leading-tight mb-8"
          >
            Construct Fast.<br />
            Move Smarter.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mb-12"
          >
            The first unified execution layer that connects build sites, transport fleets, and delivery logistics in one powerful platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link to="/sign-up" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 group">
              Start Free Trial
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700">
              Watch Demo
            </button>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
            <img src={heroImg} alt="SAC Dashboard" className="w-full object-cover aspect-video" />
            
            {/* Floating Stats */}
            <div className="absolute top-10 left-10 z-20 flex flex-col gap-4">
              <div className="glass p-6 text-left w-64 animate-pulse">
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <BarChart3 size={24} />
                  <span className="font-bold">Project Pulse</span>
                </div>
                <div className="text-3xl font-bold mb-1">94.2%</div>
                <div className="text-xs text-slate-400">On-time delivery rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <MarketingSections />


      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#0b1120] px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-slate-500 text-sm">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6 text-white font-bold">
              <div className="w-8 h-8 text-blue-600">
                <Logo />
              </div>
              M/s. S.A Construction
            </div>
            <p>The unified execution layer for modern construction and logistics. Built for scale, speed, and safety.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex gap-6">
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#materials" className="hover:text-blue-400 transition-colors">Materials</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <p className="text-xs text-slate-600 font-medium">© 2026 M/s. S.A Construction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}



function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex bg-[#0b1120] min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userId) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in/*" element={
          <div className="min-h-screen w-full bg-[#0b1120] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent">
            <SignInPortal />
          </div>
        } />
        <Route path="/sign-up/*" element={
          <div className="min-h-screen w-full bg-[#0b1120] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent">
            <SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/welcome" />
          </div>
        } />
        <Route path="/welcome" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/logistics" element={<ProtectedRoute><LogisticsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/team" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
        <Route path="/dashboard/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/dashboard/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/dashboard/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App
