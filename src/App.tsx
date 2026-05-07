/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Globe, 
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Rocket,
  BrainCircuit,
  Palette
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

interface Theme {
  id: string;
  name: string;
  dot: string;
}

// --- Data ---
const THEMES: Theme[] = [
  { id: 'obsidian', name: 'Obsidian', dot: 'bg-green-500' },
  { id: 'cyberpunk', name: 'Cyberpunk', dot: 'bg-pink-500' },
  { id: 'matrix', name: 'Matrix', dot: 'bg-emerald-600' },
  { id: 'solis', name: 'Solis', dot: 'bg-amber-500' }
];

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'AncientNLP',
    year: '2025',
    description: 'A multi-lingual NLP pipeline for Classical Sanskrit and Old Tamil, supporting morphological analysis and cross-lingual transfer learning.',
    tech: ['Python', 'mBERT', 'MuRIL', 'HuggingFace'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '02',
    title: 'CURATED',
    year: '2024',
    description: 'Personalized AI Fashion Stylist startup. Intelligently curates daily and event-specific outfits by analyzing your personal wardrobe using Computer Vision.',
    tech: ['Computer Vision', 'Generative AI', 'Python', 'FastAPI'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '03',
    title: 'LexConflict',
    year: '2025',
    description: 'Cross-Jurisdictional Regulatory Conflict Detection system using fine-tuned BERT classifiers for legal-tech compliance automation.',
    tech: ['Python', 'spaCy', 'BERT', 'FastAPI'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '04',
    title: 'CLUBCORE',
    year: '2024',
    description: 'Official website for ClutchRIT Esports Club. Built as a high-performance community hub with event management and live gallery updates.',
    tech: ['React', 'Node.js', 'Tailwind CSS', 'SQL'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '05',
    title: 'SkillSwap',
    year: '2025',
    description: 'Peer-to-Peer Skill Barter Platform. Architected a full-stack marketplace with AI-powered match recommendations via Claude API.',
    tech: ['Next.js 14', 'Prisma', 'Supabase', 'Claude API'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  }
];

const SKILLS_CATEGORIES = [
  { name: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'Transformers', 'LangChain', 'OpenCV', 'MARL'] },
  { name: 'Generative AI', items: ['LLM Fine-tuning', 'LoRA', 'RAG Pipelines', 'Prompt Engineering', 'Vector DBs'] },
  { name: 'Web & Backend', items: ['Next.js', 'FastAPI', 'Node.js', 'Supabase', 'Prisma', 'Tailwind'] }
];

// --- Components ---

const Marquee = ({ text }: { text: string[] }) => (
  <div className="relative flex overflow-x-hidden border-y border-[var(--color-muted)] bg-white/5 py-8 sm:py-12">
    <motion.div 
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="flex whitespace-nowrap"
    >
      {[...text, ...text].map((item, idx) => (
        <span key={idx} className="mx-8 flex items-center gap-4 text-4xl font-display uppercase tracking-tighter sm:mx-16 sm:text-7xl">
          {item}
          <span className="h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
        </span>
      ))}
    </motion.div>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('obsidian'); // Corrected typo
  const [showThemePicker, setShowThemePicker] = useState(false);
  const containerRef = useRef(null);

  // Initialize theme from CSS variables or defaults
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="relative transition-colors duration-500 overflow-x-hidden min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="noise pointer-events-none fixed inset-0 z-[100]" />

      {/* --- Theme Switcher --- */}
      <div className="fixed bottom-6 left-6 z-[60] sm:bottom-12 sm:left-12">
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-muted)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-xl backdrop-blur-md transition-all sm:h-16 sm:w-16"
          >
            <Palette size={24} />
          </motion.button>
          
          <AnimatePresence>
            {showThemePicker && (
              <motion.div 
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                className="absolute bottom-16 left-0 mb-4 flex flex-col gap-3 rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-3 backdrop-blur-xl sm:bottom-20"
              >
                {THEMES.map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => { setTheme(t.id); setShowThemePicker(false); }}
                    className={`flex items-center gap-3 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all hover:bg-[var(--color-accent)] hover:text-black rounded-lg ${theme === t.id ? 'bg-[var(--color-accent)] text-black' : ''}`}
                  >
                    <div className={`h-3 w-3 rounded-full ${t.dot}`} />
                    {t.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
        <div className="text-xl font-display tracking-[0.2em] text-white sm:text-2xl">
          SAMBHAV.<span className="text-[var(--color-accent)]">HEDA</span>
        </div>
        
        <div className="hidden items-center gap-10 text-[10px] font-mono uppercase tracking-[0.3em] sm:flex">
          <a href="#projects" className="hover:text-[var(--color-accent)] transition-colors">Projects</a>
          <a href="#about" className="hover:text-[var(--color-accent)] transition-colors">About</a>
          <a href="#contact" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all">Contact</a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="block sm:hidden text-white">
          {isMenuOpen ? <X size={28} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-surface)] sm:hidden"
          >
            <div className="flex flex-col gap-10 text-center text-4xl font-display uppercase italic">
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-20 sm:px-12">
        <div className="relative">
          <div className="pointer-events-none absolute -left-20 -top-40 hidden text-[20vw] font-display uppercase tracking-tighter opacity-5 sm:block">
            SAMBHAV
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-[14vw] font-display leading-[0.85] tracking-tighter sm:text-[12vw]">
              AI & MACHINE<br />
              <span className="text-stroke-accent italic">LEARNING</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-20">
            <p className="max-w-md font-tech text-sm leading-relaxed text-[var(--color-muted)] sm:text-lg">
              Engineering autonomous systems and state-of-the-art NLP architectures. 
              Specializing in Generative AI pipelines and Multi-Agent RL.
            </p>
            <div className="flex gap-6 text-[var(--color-accent)]">
              <a href="https://github.com/hedasambhav" target="_blank" rel="noreferrer"><Github className="cursor-pointer hover:scale-125 transition-transform" /></a>
              <a href="https://linkedin.com/in/sambhav-heda-8a71822a4" target="_blank" rel="noreferrer"><Linkedin className="cursor-pointer hover:scale-125 transition-transform" /></a>
              <a href="mailto:hedasambhav@gmail.com"><Mail className="cursor-pointer hover:scale-125 transition-transform" /></a>
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-12 right-12 hidden sm:block" style={{ rotate }}>
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[var(--color-muted)] text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)]">
            SCROLL DOWN • 
          </div>
        </motion.div>
      </section>

      {/* --- Marquee --- */}
      <Marquee text={['SAMBHAV HEDA', 'AI ENGINEER', 'NLP SPECIALIST', 'GEN AI ARCHITECT', 'SWARM INTELLIGENCE']} />

      {/* --- Projects Section --- */}
      <section id="projects" className="px-6 py-20 sm:px-12 sm:py-40">
        <div className="mb-12 flex flex-col justify-between border-b border-[var(--color-muted)] pb-10 sm:mb-20 sm:flex-row sm:items-end uppercase tracking-tighter">
          <h2 className="font-display text-7xl sm:text-9xl">Work<span className="text-[var(--color-accent)]">.</span></h2>
          <div className="mt-4 font-mono text-[10px] text-[var(--color-muted)] tracking-widest sm:mt-0">Recent Innovations</div>
        </div>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col gap-6"
            >
              <div className="relative aspect-video overflow-hidden border border-[var(--color-muted)] bg-[var(--color-surface)]">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={project.image} 
                  alt={project.title}
                  className="h-full w-full object-cover opacity-30 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[var(--color-surface)] px-4 py-2 font-mono text-xs text-[var(--color-accent)] border border-[var(--color-accent)] shadow-[4px_4px_0_var(--color-accent)]">
                    {project.year}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2 uppercase font-mono">
                  {project.tech.map(t => (
                    <span key={t} className="border border-[var(--color-muted)] px-3 py-1 text-[10px] group-hover:bg-[var(--color-accent)] group-hover:text-black transition-colors">{t}</span>
                  ))}
                </div>
                <div>
                  <h3 className="font-display text-4xl uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors sm:text-6xl">{project.title}</h3>
                  <p className="mt-4 font-tech text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Expertise Section --- */}
      <section className="bg-[var(--color-accent)] px-6 py-24 text-black sm:px-12 sm:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-6xl uppercase leading-[0.85] tracking-tighter sm:text-9xl">Technical Expert</h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8">
            {SKILLS_CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col gap-6 border-l-2 border-black/20 pl-6">
                <h4 className="flex items-center gap-3 font-mono text-xs font-black uppercase tracking-[0.2em] opacity-40">
                  <BrainCircuit size={16} /> {cat.name}
                </h4>
                <ul className="flex flex-col gap-2 font-display uppercase tracking-tight text-3xl">
                  {cat.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Experience/Education --- */}
      <section id="about" className="px-6 py-24 sm:px-12 sm:py-40">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="space-y-20">
            <div>
              <h3 className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)]">01 / Education</h3>
              <div className="border-t border-[var(--color-muted)] pt-8">
                <span className="font-mono text-xs text-[var(--color-accent)]">2023 — 2027</span>
                <h4 className="mt-4 font-display text-3xl uppercase sm:text-5xl">Ramaiah Institute of Technology</h4>
                <p className="mt-2 font-tech text-sm text-[var(--color-muted)] uppercase tracking-widest leading-loose">B.E. Computer Science (AI & ML) • 3rd Year • Bengaluru, India</p>
              </div>
            </div>
            <div>
              <h3 className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)]">02 / Certs</h3>
              <ul className="space-y-6">
                {['AWS Certified Cloud Practitioner', 'Deep Learning Spec (Andrew Ng)', 'GSoC 2026 Preparation'].map(cert => (
                  <li key={cert} className="flex items-center gap-4 border-l-2 border-[var(--color-muted)] pl-6 text-xl font-display uppercase sm:text-3xl">
                    <Rocket className="text-[var(--color-accent)]" size={24} /> {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="relative aspect-square w-full sm:w-2/3 border border-[var(--color-muted)] grayscale overflow-hidden">
               <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" className="h-full w-full object-cover opacity-50" />
               <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                  <p className="font-tech text-xl font-bold uppercase text-white">"Bridging biological intuition and algorithmic precision."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id="contact" className="relative border-t border-[var(--color-muted)] px-6 py-20 text-center sm:px-12 sm:py-40">
        <h2 className="font-display text-[12vw] leading-none tracking-tighter">LET'S <span className="text-stroke-accent italic">EVOLVE</span></h2>
        <a href="mailto:hedasambhav@gmail.com" className="group mt-12 inline-flex items-center gap-6 border-b-2 border-[var(--color-accent)] pb-4 font-display text-4xl uppercase sm:mt-24 sm:gap-12 sm:text-8xl transition-all hover:text-[var(--color-accent)]">
          Get in touch <ArrowRight className="transition-transform group-hover:translate-x-8" size={64} />
        </a>
        <div className="mt-40 grid gap-12 sm:grid-cols-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
          <div className="flex flex-col gap-2"><span>Location</span><p className="text-[var(--color-text)]">Bengaluru, India</p></div>
          <div className="flex justify-center gap-10">
            <a href="https://github.com/hedasambhav" className="hover:text-[var(--color-accent)]">Github</a>
            <a href="https://linkedin.com/in/sambhav-heda-8a71822a4" className="hover:text-[var(--color-accent)]">Linkedin</a>
          </div>
          <div className="flex flex-col gap-2"><span>© 2026</span><p className="text-[var(--color-text)]">SAMBHAV.HEDA</p></div>
        </div>
      </footer>
    </div>
  );
}
