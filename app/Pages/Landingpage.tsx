"use client"

import { useState } from "react"
import { Search, Zap, Target, Layers, ArrowRight, Shield, MousePointer2, CheckCircle2 } from 'lucide-react';

export default function Home() {

  const [url, setUrl] = useState("https://www.ycombinator.com/")
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!url) return

    try {
      setLoading(true)

      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      console.log("analysis result:", data)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#2866ff]/20 font-dm-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        .font-dm-sans { font-family: "DM Sans", sans-serif; }
      `}</style>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 h-full w-full opacity-[0.04]" 
          style={{ 
            backgroundImage: `linear-gradient(#2866ff 1px, transparent 1px), linear-gradient(90deg, #2866ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} 
        />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#2866ff]/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-10 py-5 max-w-7xl mx-auto border-slate-50 mb-[20px] ">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[#2866ff] rounded-lg flex items-center justify-center shadow-lg shadow-[#2866ff]/20">
            <Target className="text-white w-4.5 h-4.5" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-[#0F172A]">
            Convertex<span className="text-[#2866ff]">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[11px] font-black items-center uppercase tracking-[0.1em] text-slate-500">
          <a href="#" className="hover:text-[#2866ff] transition-colors">Benchmarks</a>
          <a href="#" className="hover:text-[#2866ff] transition-colors">Enterprise</a>
          <a href="#" className="hover:text-[#2866ff] transition-colors">Docs</a>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition border-2 border-[#2866ff] text-[#2866ff] hover:bg-[#2866ff] hover:text-white active:scale-95 shadow-sm shadow-[#2866ff]/10">
            Try For Free
          </button>
        </div>
      </nav>

      <header className="relative z-10 px-8 pt-10 pb-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-6 border bg-[#2866ff]/5 border-[#2866ff]/20 text-[#2866ff]">
          <Zap className="w-3 h-3" /> 
          Performance Audit Engine
        </div>
        
        <h1 className="text-5xl md:text-[82px] font-bold tracking-tight mb-6 leading-[1] text-[#0f172a]">
          Turn your traffic into <br />
          <span className="bg-gradient-to-r from-[#0f172a] via-[#475569] to-[#94a3b8] bg-clip-text text-transparent italic opacity-90">
            predictable revenue.
          </span>
        </h1>
        
        <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed text-slate-500 font-medium opacity-80">
          Identify UX friction and trust gaps instantly. Stop guessing and start converting with our agentic multimodal AI.
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="p-2 bg-white rounded-[24px] border border-slate-200 shadow-[0_30px_60px_-15px_rgba(40,102,255,0.18)] flex flex-col sm:flex-row gap-2 transition-all hover:border-[#2866ff]/30 ring-1 ring-slate-100">
            
            <div className="flex-1 flex items-center px-5">
              <Search className="w-5 h-5 text-[#2866ff] mr-3" />
              <input 
                type="text"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                placeholder="yourwebsite.com/landing-page" 
                className="w-full bg-transparent py-4 outline-none text-slate-900 font-medium text-lg placeholder:text-slate-300"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full sm:w-auto bg-[#2866ff] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-[18px] font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-[#2866ff]/30 flex items-center justify-center gap-2 group"
            >
              {loading ? "Analyzing..." : "Analyze Now"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
          
          <div className="mt-8 flex justify-center items-center gap-10 opacity-60">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <Shield className="w-3.5 h-3.5 text-[#2866ff]" /> Enterprise Grade
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <CheckCircle2 className="w-3.5 h-3.5 text-[#2866ff]" /> YC S26
             </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 px-8 py-16 border-t border-slate-50 bg-slate-50/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <FeatureItem 
            icon={<MousePointer2 className="w-6 h-6" />}
            title="Psychological Audit"
            desc="AI agents mimic your ICP to find friction points that standard analytics miss."
          />
          <FeatureItem 
            icon={<Layers className="w-6 h-6" />}
            title="Revenue Prediction"
            desc="Estimate the bottom-line impact of UX changes before writing a single line of code."
          />
          <FeatureItem 
            icon={<Shield className="w-6 h-6" />}
            title="Compliance Guard"
            desc="Automatically detect missing trust signals required for Fortune 500 contracts."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group space-y-4">
      <div className="w-12 h-12 rounded-xl bg-[#2866ff]/10 text-[#2866ff] flex items-center justify-center transition-all group-hover:bg-[#2866ff] group-hover:text-white group-hover:shadow-[0_8px_16px_rgba(40,102,255,0.2)]">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500 font-medium opacity-80">{desc}</p>
    </div>
  );
}