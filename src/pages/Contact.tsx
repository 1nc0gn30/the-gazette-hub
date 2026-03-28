import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [messageStatus, setMessageStatus] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageStatus('Message sent. Our newsroom will reply shortly.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <header className="text-center mb-20 border-b-4 border-black pb-12">
        <h1 className="font-serif font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none">Contact</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h3 className="font-serif font-bold text-2xl uppercase mb-6 border-b border-black pb-2">Get in Touch</h3>
            <p className="text-black/60 font-classic leading-relaxed mb-8">
              Whether you have a news tip, a subscription inquiry, or just want to say hello, we're here to listen.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center"><Mail size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Email</div>
                  <div className="font-bold">press@gazettehub.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center"><Phone size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Phone</div>
                  <div className="font-bold">+1 (212) 555-0192</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center"><MapPin size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Office</div>
                  <div className="font-bold">1200 Fleet Street, London</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form className="bg-white/50 p-12 newspaper-border space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Full Name</label>
                <input type="text" className="bg-transparent border-b-2 border-black py-2 focus:outline-none focus:border-accent-color transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Email Address</label>
                <input type="email" className="bg-transparent border-b-2 border-black py-2 focus:outline-none focus:border-accent-color transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Subject</label>
              <select className="bg-transparent border-b-2 border-black py-2 focus:outline-none focus:border-accent-color transition-colors">
                <option>News Tip</option>
                <option>Subscription Support</option>
                <option>Advertising Inquiry</option>
                <option>General Feedback</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Message</label>
              <textarea rows={6} className="bg-transparent border-b-2 border-black py-2 focus:outline-none focus:border-accent-color transition-colors resize-none"></textarea>
            </div>
            <button className="bg-black text-white px-12 py-4 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-accent-color transition-colors">
              <Send size={16} /> Send Message
            </button>
            {messageStatus && (
              <p className="text-xs font-bold uppercase tracking-widest text-black/50">{messageStatus}</p>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
