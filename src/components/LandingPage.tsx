import { ArrowRight, BarChart2, Shield, Sparkles, LockKeyhole, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    title: 'Discreet intelligence',
    text: 'Quietly precise market analysis for founders, operators, and private investors.',
    icon: Sparkles,
  },
  {
    title: 'Clarity over noise',
    text: 'Structured signals and calm dashboards built for decisive execution.',
    icon: BarChart2,
  },
  {
    title: 'Trusted by design',
    text: 'Security and attention to detail woven into every interaction.',
    icon: Shield,
  },
];

const pillars = [
  {
    title: 'Live market intelligence',
    text: 'Monitor price movement, market depth, and portfolio context in a single refined workspace.',
    icon: Radar,
  },
  {
    title: 'Protected by design',
    text: 'Every workflow is built around secure authentication, token-based access, and private data handling.',
    icon: LockKeyhole,
  },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#171717] font-sans">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[#d8d0c2] px-6 py-6 md:px-10 lg:px-12">
        <div className="text-sm font-semibold uppercase tracking-[0.35em] text-[#171717]">
          Stratametrics
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden items-center gap-4 text-sm font-medium text-[#605a53] md:flex">
            <a href="#home" className="transition hover:text-[#171717]">
              Home
            </a>
            <a href="#about" className="transition hover:text-[#171717]">
              About us
            </a>
            <a href="#contact" className="transition hover:text-[#171717]">
              Contact us
            </a>
          </nav>
          <Link
            to="/login"
            className="rounded-full border border-[#171717] px-5 py-2 text-sm font-medium text-[#171717] transition hover:bg-[#171717] hover:text-[#f5f1e8]"
          >
            Client Login
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 md:px-10 md:py-16 lg:px-12 lg:py-20">
        <section id="home" className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-[#7a746a]">
              Private Market Intelligence
            </p>
            <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#111111] sm:text-5xl lg:text-7xl">
              A quieter kind of edge.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4b463f]">
              Refined analytics, elegant reporting, and calm execution for teams that value precision over noise.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#2b2b2b]"
              >
                Enter the studio <ArrowRight size={18} />
              </Link>
              <div className="text-sm font-medium text-[#6f685d]">
                Monochrome • Editorial • Intentional
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white p-3 shadow-[0_24px_80px_-30px_rgba(17,17,17,0.35)]">
            <img
              src="/landing-hero.svg"
              alt="Monochrome analytics dashboard illustration"
              className="h-full w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </section>

        <section className="grid gap-6 border-t border-[#d8d0c2] pt-8 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
                <Icon className="mb-4 text-[#171717]" size={22} />
                <h3 className="mb-2 text-lg font-semibold text-[#171717]">{item.title}</h3>
                <p className="text-sm leading-7 text-[#605a53]">{item.text}</p>
              </div>
            );
          })}
        </section>

        <section id="about" className="grid scroll-mt-24 gap-8 rounded-[2rem] border border-[#d8d0c2] bg-white p-8 md:grid-cols-[1fr_0.9fr] md:p-10">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-[#7a746a]">What we do</p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#171717]">
              Designed for operators who need calm, credible insight.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#4b463f]">
              Stratametrics brings together market data, portfolio context, and institutional-grade security into one experience that feels as polished as it is practical. Our focus is simple: remove noise, surface what matters, and help serious users act with confidence.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-[#d8d0c2]">
            <img src="/market-scene.svg" alt="Premium dashboard interface" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
                <Icon className="mb-4 text-[#171717]" size={22} />
                <h3 className="mb-2 text-lg font-semibold text-[#171717]">{pillar.title}</h3>
                <p className="text-sm leading-7 text-[#605a53]">{pillar.text}</p>
              </div>
            );
          })}
        </section>
      </main>

      <footer id="contact" className="border-t border-[#d8d0c2] bg-[#f3ebde] px-6 py-8 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#171717]">Stratametrics</p>
            <p className="mt-1 text-sm text-[#605a53]">Built for calm, disciplined market intelligence.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#605a53]">
            <Link to="/privacy-policy" className="transition hover:text-[#171717]">Privacy Policy</Link>
            <a href="mailto:davidopany3@gmail.com" className="transition hover:text-[#171717]">davidopany3@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};