import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Construction, Package, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export function MarketingSections() {
  return (
    <div className="space-y-32 py-20">
      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-6">Building Tomorrow With <span className="text-blue-500">Precision</span>.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              M/s. S.A Construction is a premier construction and logistics powerhouse dedicated to solving the most complex infrastructure challenges. We don't just build structures; we architect the coordination between material supply and site execution.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Excellence in Engineering', desc: 'Over a decade of structural mastery.' },
                { title: 'Global Logistics Network', desc: 'Own fleet of 50+ heavy-duty vehicles.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all">
                  <div className="p-2 bg-blue-500/10 rounded-lg h-fit">
                    <ShieldCheck className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-3xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-white/5 relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 overflow-hidden" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-slate-900/30 py-32 border-y border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Our Core Solutions</h2>
          <p className="text-slate-400">Integrated services for a seamless construction lifecycle.</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Construction, title: 'Commercial Build', desc: 'High-rise complexes, malls, and corporate offices delivered with zero delay.' },
            { icon: Truck, title: 'Fleet Logistics', desc: 'Real-time tracked transport for heavy materials and oversized equipment.' },
            { icon: Package, title: 'Material Supply', desc: 'Premium grade TMT, Cement, and Raw materials sourced directly from manufacturers.' },
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-[#0b1120] border border-white/5 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                <service.icon className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.desc}</p>
              <button className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                Learn More <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials" className="max-w-7xl mx-auto px-6 scroll-mt-24">
         <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Precision Sourced Materials</h2>
          <p className="text-slate-400">We utilize only the highest grade industrially-certified materials.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['TMT Steel S-500', 'Ready-Mix Concrete', 'Civil Aggregate', 'HV Electricals'].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center group hover:bg-white/10 transition-all">
              <div className="text-slate-500 font-bold mb-2 text-xs">GRADE A</div>
              <div className="text-white font-bold">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 pb-40 scroll-mt-24">
        <div className="p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 backdrop-blur-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4 text-center">Let's Discuss Your Project</h2>
            <p className="text-blue-200/60 text-center mb-12">Connect with our executive engineering team.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               <div className="flex flex-col items-center gap-2">
                 <Mail className="text-blue-400 mb-2" size={24} />
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Email</span>
                 <span className="text-sm text-blue-200/60">admin@sacon.com</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Phone className="text-blue-400 mb-2" size={24} />
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Phone</span>
                 <span className="text-sm text-blue-200/60">+91 92324 55XXX</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <MapPin className="text-blue-400 mb-2" size={24} />
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Headquarters</span>
                 <span className="text-sm text-blue-200/60">New Delhi, India</span>
               </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-[#0b1120]/50 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all" />
                <input type="email" placeholder="Email Address" className="w-full bg-[#0b1120]/50 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all" />
              </div>
              <textarea placeholder="Message" rows={4} className="w-full bg-[#0b1120]/50 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all"></textarea>
              <button disabled className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-all">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
