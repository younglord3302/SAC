import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth, SignIn, SignUp } from '@clerk/react';
import { motion } from 'framer-motion';
import { HardHat, Truck, BarChart3, ChevronRight } from 'lucide-react';
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

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-slate-100 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-blue-500">
                <Logo />
              </div>
              <span className="text-xl font-bold tracking-tight">M/s. S.A Construction</span>
            </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-white transition-colors"><BarChart3 size={16} /> Overview</Link>
            <Link to="/dashboard/projects" className="flex items-center gap-2 hover:text-white transition-colors"><HardHat size={16} /> Projects</Link>
            <Link to="/dashboard/logistics" className="flex items-center gap-2 hover:text-white transition-colors"><Truck size={16} /> Logistics</Link>
            <Link to="/dashboard/team" className="hover:text-white transition-colors">Team</Link>
            <Link to="/dashboard/inventory" className="hover:text-white transition-colors">Materials</Link>
            <Link to="/dashboard/analytics" className="hover:text-white transition-colors">Analytics</Link>
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

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<HardHat />}
          title="SAC Build"
          description="Track every task, worker, and material on your construction site in real-time."
        />
        <FeatureCard 
          icon={<Truck />}
          title="SAC Move"
          description="Manage your fleet, assign drivers, and optimize routes with zero friction."
        />
        <FeatureCard 
          icon={<BarChart3 />}
          title="Integrated Intel"
          description="Get deep insights into project costs, material flow, and logistics efficiency."
        />
      </section>
      
      {/* Social Proof / Stats */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-extrabold text-white mb-2">500+</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Sites</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-blue-500 mb-2">$1.2B</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Assets Managed</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-2">12k</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Fleet Vehicles</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-blue-500 mb-2">24/7</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Live Monitoring</div>
          </div>
        </div>
      </section>

      {/* How it Works / Steps */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Streamlined Execution</h2>
          <p className="text-slate-400">From site request to material delivery in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 hidden md:block" />
          <StepCard 
            number="01" 
            title="Deploy Project" 
            desc="Set up your site parameters and assign engineers in seconds."
          />
          <StepCard 
            number="02" 
            title="Request High-Flow" 
            desc="One-tap material requests triggered by real-time site needs."
          />
          <StepCard 
            number="03" 
            title="Optimize Move" 
            desc="AI-driven dispatching ensures the right asset hits the site exactly when needed."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Start free, scale as you grow. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <PriceCard
              plan="Basic"
              price="₹999"
              period="/month"
              desc="For small construction teams getting started."
              features={['Up to 3 Projects', '10 Team Members', 'Fleet Management', 'Basic Analytics', 'Email Support']}
              cta="Get Started"
              highlighted={false}
            />
            <PriceCard
              plan="Pro"
              price="₹2,999"
              period="/month"
              desc="For growing companies that need full control."
              features={['Unlimited Projects', '50 Team Members', 'Full Logistics Suite', 'Advanced Analytics', 'AI Insights', 'Priority Support']}
              cta="Start Free Trial"
              highlighted={true}
            />
            <PriceCard
              plan="Enterprise"
              price="Custom"
              period="pricing"
              desc="For large organizations with complex workflows."
              features={['Unlimited Everything', 'Custom Integrations', 'Dedicated Manager', 'SLA Guarantees', 'On-premise Options', '24/7 Phone Support']}
              cta="Contact Us"
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto glass p-16 text-center bg-gradient-to-br from-blue-600/20 to-transparent border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to upgrade your infrastructure?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">Join the leading construction firms moving at the speed of SAC.</p>
          <Link to="/auth" className="inline-flex px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-blue-600/40 transform hover:-translate-y-1">
            Build Now — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 text-slate-500 text-sm">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6 text-white font-bold">
              <div className="w-8 h-8 text-blue-600">
                <Logo />
              </div>
              M/s. S.A Construction
            </div>
            <p>The unified execution layer for modern construction and logistics. Built for scale, speed, and safety by M/s. S.A Construction.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2">Platform</h4>
              <Link to="/auth" className="hover:text-blue-400">Build OS</Link>
              <Link to="/auth" className="hover:text-blue-400">Move Logistics</Link>
              <Link to="/auth" className="hover:text-blue-400">Fleet Control</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2">Resources</h4>
              <a href="#" className="hover:text-blue-400">Documentation</a>
              <a href="#" className="hover:text-blue-400">API Reference</a>
              <a href="#" className="hover:text-blue-400">Community</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2">Company</h4>
              <a href="#" className="hover:text-blue-400">About</a>
              <a href="#" className="hover:text-blue-400">Careers</a>
              <a href="#" className="hover:text-blue-400">Privacy</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-xs text-slate-600 font-bold uppercase tracking-widest">
          © 2026 M/s. S.A Construction. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-8 hover:border-blue-500/50 transition-all group hover:bg-blue-600/5">
      <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function PriceCard({ plan, price, period, desc, features, cta, highlighted }: {
  plan: string; price: string; period: string; desc: string;
  features: string[]; cta: string; highlighted: boolean;
}) {
  return (
    <div className={`glass p-8 flex flex-col relative overflow-hidden transition-all ${
      highlighted 
        ? 'border-blue-500/50 bg-blue-600/5 scale-105 shadow-2xl shadow-blue-600/20' 
        : 'hover:border-white/20'
    }`}>
      {highlighted && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
      )}
      {highlighted && (
        <span className="absolute top-5 right-5 text-[10px] font-bold bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">
          Most Popular
        </span>
      )}
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{plan}</p>
      <div className="flex items-end gap-1 mb-3">
        <span className="text-4xl font-extrabold text-white">{price}</span>
        <span className="text-slate-500 mb-1">{period}</span>
      </div>
      <p className="text-slate-400 text-sm mb-8">{desc}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
            <span className="w-4 h-4 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/sign-up"
        className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all ${
          highlighted
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative z-10 text-center flex flex-col items-center group">
      <div className="text-6xl font-black text-white/5 mb-[-2rem] group-hover:text-blue-500/10 transition-colors">{number}</div>
      <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-6 shadow-xl relative z-20 group-hover:border-blue-500/50 transition-all">
        {number}
      </div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">{desc}</p>
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
            <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/dashboard" />
          </div>
        } />
        <Route path="/sign-up/*" element={
          <div className="min-h-screen w-full bg-[#0b1120] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent">
            <SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/dashboard" />
          </div>
        } />
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
