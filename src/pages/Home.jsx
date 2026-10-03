import { useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode, ArrowRight, Zap, Palette, Download, ShieldCheck, UserCheck,
  Infinity as InfinityIcon, Check, Star, ChevronDown, Sparkles,
} from 'lucide-react';
import { site, features, steps, faqs } from '../config/site.js';
import { useSEO, structuredData } from '../lib/seo.js';

const iconMap = {
  zap: Zap, palette: Palette, download: Download,
  shield: ShieldCheck, user: UserCheck, infinity: InfinityIcon,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  useSEO({
    title: `${site.tagline} — Free, Fast & Customizable`,
    description: site.description,
    path: '/',
    jsonLd: [structuredData.website(), structuredData.webApp(), structuredData.faq(faqs)],
  });

  return (
    <div className="page home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <motion.span className="eyebrow" variants={fadeUp} initial="hidden" animate="show">
              <Star size={14} /> Free · No signup · No watermark
            </motion.span>
            <motion.h1 className="hero-title" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
              Beautiful QR codes,
              <br />
              generated in <span className="gradient-text">seconds</span>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.12 }}>
              {site.name} is a free online QR code generator. Customize colors, pick your
              resolution and download high-quality PNG or SVG files — all in your browser.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.18 }}>
              <Link to="/generator" className="btn btn-primary btn-lg">
                <QrCode size={18} /> Build QR Code <ArrowRight size={16} />
              </Link>
              <Link to="/#features" className="btn btn-ghost btn-lg">Explore features</Link>
            </motion.div>
            <motion.ul className="hero-points" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.24 }}>
              <li><Check size={16} /> Unlimited free QR codes</li>
              <li><Check size={16} /> Up to 1000px PNG or SVG</li>
              <li><Check size={16} /> 100% private, runs locally</li>
            </motion.ul>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="hero-card">
              <div className="hero-card-qr">
                <QRCode
                  value={site.url}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#0a0f1c"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="hero-card-meta">
                <span className="live-dot" /> Live preview
                <span className="hero-card-brand">{site.name}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Sparkles size={14} /> Features</span>
            <h2 className="section-heading">Everything you need to create QR codes</h2>
            <p className="section-sub">A fast, private and completely free QR code generator — built for everyone.</p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <motion.article
                  key={f.title}
                  className="feature-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <span className="feature-icon"><Icon size={20} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section section-alt" id="how">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Zap size={14} /> How it works</span>
            <h2 className="section-heading">Three steps to your QR code</h2>
            <p className="section-sub">No account, no installs — it just works.</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                className="step-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="container faq-wrap">
          <div className="section-head">
            <span className="eyebrow"><ShieldCheck size={14} /> FAQ</span>
            <h2 className="section-heading">Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`faq-item ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                  >
                    <span>{f.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div className="cta-glow" />
            <h2>Ready to create your QR code?</h2>
            <p>Generate a beautiful, high-resolution QR code for free — no signup required.</p>
            <Link to="/generator" className="btn btn-primary btn-lg">
              <QrCode size={18} /> Build QR Code <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
