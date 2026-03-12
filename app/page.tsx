"use client"

import React, { useState } from 'react';
import { Search, Zap, Target, Layers, ArrowRight, Shield, MousePointer2, Sun, Moon } from 'lucide-react';

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- Glow Background Effect --- */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] blur-[120px] pointer-events-none transition-opacity duration-1000 ${isDark ? 'bg-indigo-600/10 opacity-100' : 'bg-indigo-400/20 opacity-50'}`} />

      {/* --- Navigation --- */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Target className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-bold tracking-tighter ${!isDark && 'text-slate-900'}`}>
            Convertex<span className="text-indigo-500">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-medium items-center">
          <a href="#" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}>Benchmarks</a>
          <a href="#" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}>Enterprise</a>
          <a href="#" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}>Docs</a>
          
          {/* --- Theme Toggle Button --- */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-white border-slate-200 text-indigo-600 shadow-sm hover:bg-slate-50'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex gap-3">
          <button className={`px-6 py-2 rounded-full font-medium transition border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
            Register
          </button>
          <button className={`px-6 py-2 rounded-full font-medium transition border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
            Login
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative z-10 px-8 pt-24 pb-32 max-w-6xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border transition-colors ${isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
          <Zap className="w-3.5 h-3.5" /> 
          Engineered for B2B Performance
        </div>
        
        <h1 className={`text-7xl font-bold tracking-tight mb-8 leading-[1.1] transition-colors ${isDark ? 'bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent' : 'text-slate-900'}`}>
          Turn your traffic into <br />
          predictable revenue.
        </h1>
        
        <p className={`text-lg mb-12 max-w-2xl mx-auto leading-relaxed transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Convertex uses multimodal AI to identify UX friction, copy misalignment, and trust gaps that are killing your B2B conversion rate.
        </p>

        {/* --- URL Input Box --- */}
        <div className={`flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto p-2 rounded-3xl backdrop-blur-md border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="yourwebsite.com/landing-page" 
              className={`w-full bg-transparent pl-12 pr-4 py-4 outline-none transition-colors ${isDark ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}
            />
          </div>
          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group">
            Try For Free<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* --- Value Prop Grid --- */}
      <section className={`relative z-10 px-8 py-20 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
              <MousePointer2 className="text-indigo-500 w-6 h-6" />
            </div>
            <h3 className={`text-xl font-semibold ${!isDark && 'text-slate-900'}`}>Psychological Audit</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Simulates your ICP (Ideal Customer Profile) to see if your messaging resonates with decision-makers.</p>
          </div>
          
          <div className="space-y-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
              <Layers className="text-purple-500 w-6 h-6" />
            </div>
            <h3 className={`text-xl font-semibold ${!isDark && 'text-slate-900'}`}>Competitive Intel</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Side-by-side comparison with your top 3 competitors to find where they are stealing your leads.</p>
          </div>

          <div className="space-y-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
              <Shield className="text-emerald-500 w-6 h-6" />
            </div>
            <h3 className={`text-xl font-semibold ${!isDark && 'text-slate-900'}`}>Trust & Safety Scan</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Identifies missing ISO, SOC2, and security signals that B2B enterprises require before signing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}