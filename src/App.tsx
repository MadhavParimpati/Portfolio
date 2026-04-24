/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin,
  ArrowRight,
  Zap,
  ChevronRight,
  Eye
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILLS, ACHIEVEMENTS } from './constants';
import { Experience, Project } from './types';

function ExperienceBlock({ exp }: { exp: Experience }) {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-4">
          <h3 className="text-5xl font-bold tracking-tighter text-slate-900">
            {exp.company}
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            <p className="font-sans text-indigo-600 font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full text-xs">{exp.role}</p>
            <span className="opacity-40 text-sm font-medium">{exp.period}</span>
          </div>
        </div>
        
        {/* Slider Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {exp.projects.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveProject(i)}
                className={`h-2 transition-all duration-300 rounded-full ${activeProject === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveProject(prev => Math.max(0, prev - 1))}
              disabled={activeProject === 0}
              className="p-3 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-10 transition-all rounded-full bg-white shadow-sm"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button 
              onClick={() => setActiveProject(prev => Math.min(exp.projects.length - 1, prev + 1))}
              disabled={activeProject === exp.projects.length - 1}
              className="p-3 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-10 transition-all rounded-full bg-white shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full"
          >
            <ProjectSlide project={exp.projects[activeProject]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectSlide({ project }: { project: Project }) {
  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start bg-white p-10 md:p-16 rounded-[48px] shadow-2xl shadow-indigo-100/50 border border-slate-100">
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full">Case Study</span>
            <div className="h-px grow bg-slate-100" />
          </div>
          <h4 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">
            {project.title}
          </h4>
          {project.subtitle && (
            <p className="text-xl text-slate-500 font-medium">{project.subtitle}</p>
          )}
        </div>

        <p className="text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 p-10 bg-indigo-600 rounded-[32px] text-white flex flex-col justify-center h-full">
        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">High-Impact Results</h5>
        <ul className="space-y-6">
          {project.impact.map((point, iIdx) => (
            <motion.li 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: iIdx * 0.1 }}
              key={iIdx} 
              className="text-sm font-medium leading-relaxed flex gap-5 group"
            >
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 text-[10px] font-bold">
                {iIdx + 1}
              </div>
              <span className="opacity-90">{point}</span>
            </motion.li>
          ))}
        </ul>
        <div className="pt-6">
          <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-lg shadow-black/10">
            View Analysis <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-600">
      {/* SaaS Nav */}
      <nav className="px-6 py-8 flex items-center justify-between max-w-7xl mx-auto">
        <span className="text-2xl font-black tracking-tighter text-indigo-600">
          {PERSONAL_INFO.name.split(' ')[0]}<span className="text-slate-900">.</span>P
        </span>
        <div className="hidden md:flex gap-10 text-sm font-bold text-slate-500">
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#work" className="hover:text-indigo-600 transition-colors">Mission</a>
          <a href="#skills" className="hover:text-indigo-600 transition-colors">Arsenal</a>
        </div>
        {/* <button className="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-xs hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
          Download Resume
        </button> */}
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-12 pb-32 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] bg-indigo-100 text-indigo-600 rounded-full">
            {PERSONAL_INFO.title}
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-slate-900">
            Architecting <br /> 
            <span className="text-indigo-600">Modern</span> <br />
            Systems.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            {PERSONAL_INFO.about}
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <a 
              href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration Inquiry`}
              className="px-10 py-5 bg-indigo-600 text-white rounded-[20px] shadow-2xl shadow-indigo-600/30 font-bold text-lg hover:scale-105 transition-all flex items-center gap-3 group"
            >
              Start a Conversation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4">
               <a 
                 href={PERSONAL_INFO.github} 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
               >
                 <Github size={24} />
               </a>
               <a 
                 href={PERSONAL_INFO.linkedin} 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
               >
                 <Linkedin size={24} />
               </a>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex relative items-center justify-center">
          <div className="w-full aspect-[4/5] bg-gradient-to-tr from-indigo-100/50 to-transparent rounded-[60px] relative overflow-hidden flex items-center justify-center border border-indigo-100">
            <div className="w-3/4 aspect-[4/5] bg-white rounded-[40px] shadow-2xl flex items-center justify-center border border-slate-100 overflow-hidden group">
               {/* Replace src string below with your actual photo path or URL */}
               <img 
                 src={PERSONAL_INFO.image} 
                 alt={PERSONAL_INFO.name}
                 className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
               />
            </div>
            {/* SaaS accents */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-indigo-600 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-48 pb-48">
        
        {/* Mission Slider */}
        <section id="work" className="space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none">
                The Mission
              </h2>
              <p className="text-lg text-slate-400 font-bold uppercase tracking-[0.3em]">Operational Mastery</p>
            </div>
          </div>

          <div className="space-y-40">
            {EXPERIENCES.map((exp) => (
              <ExperienceBlock key={exp.company} exp={exp} />
            ))}
          </div>
        </section>

        {/* Arsenal (Skills) */}
        <section id="skills" className="space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">The Arsenal</h2>
            <p className="text-slate-500 font-medium">Engineered for extreme performance and scalability</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((group) => (
              <motion.div 
                key={group.category} 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-indigo-600 transition-all hover:shadow-2xl hover:shadow-indigo-600/5"
              >
                <div>
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-slate-900">{group.category}</h3>
                  <ul className="space-y-4">
                    {group.skills.map(skill => (
                      <li key={skill} className="text-sm font-bold text-slate-500 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Strategic Wins (Achievements) */}
        <section className="bg-indigo-600 rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">Strategic <br /> Milestones.</h2>
              <p className="text-xl text-indigo-100 font-medium max-w-md">Quantifiable impact delivered across enterprise ecosystems and mission-critical systems.</p>
            </div>
            <div className="space-y-12">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div key={idx} className="space-y-4 group">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                    <h3 className="text-2xl font-bold">{ach.title}</h3>
                  </div>
                  <p className="text-lg text-indigo-100/70 leading-relaxed font-medium pl-14">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer CTA */}
      <footer className="py-40 bg-slate-900 text-white rounded-t-[100px] border-t-8 border-indigo-600 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-20 relative z-10 text-center lg:text-left">
          <div className="space-y-12 max-w-3xl">
            <h2 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10">
              Let's <br />
              <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-[20px]">Connect.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
              Ready to architect high-performance enterprise systems together? 
              I'm available for strategic role discussions and networking.
            </p>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
               <a href={`mailto:${PERSONAL_INFO.email}`} className="px-12 py-5 bg-white text-slate-900 rounded-[24px] font-black text-xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5">
                 Send an Email
               </a>
               <div className="flex gap-4">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"><Github size={28} /></a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"><Linkedin size={28} /></a>
               </div>
            </div>
          </div>
          <div className="space-y-2 text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
              © 2026 // {PERSONAL_INFO.name} // FULLSTACK ARCHITECT
            </div>
            <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest">
              Build Ver: 1.0.4 r-stable
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
