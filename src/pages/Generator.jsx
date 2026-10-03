import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Palette, Download } from 'lucide-react';
import QRGenerator from '../components/QRGenerator.jsx';
import { site, faqs } from '../config/site.js';
import { useSEO, structuredData } from '../lib/seo.js';

const tips = [
  {
    icon: ShieldCheck,
    title: 'Test before you print',
    text: 'Always scan the QR code with a phone camera to confirm it works before printing large batches.',
  },
  {
    icon: Palette,
    title: 'Keep strong contrast',
    text: 'For reliable scanning, keep a high contrast between the foreground and background colors.',
  },
  {
    icon: Download,
    title: 'Use SVG for print',
    text: 'Choose SVG when you need a vector that stays crisp at any size, and PNG for screens and social media.',
  },
];

export default function Generator() {
  useSEO({
    title: 'Free QR Code Generator',
    description: `Create a custom, high-resolution QR code with the free ${site.name} generator. Customize colors, choose your size and download PNG or SVG instantly — no signup.`,
    path: '/generator',
    jsonLd: [
      structuredData.webApp(`${site.name} — Online QR Code Generator`, undefined, '/generator'),
      structuredData.faq(faqs),
    ],
  });

  return (
    <div className="page generator-page">
      <section className="page-head">
        <div className="container">
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Sparkles size={14} /> Free · No signup · No watermark
          </motion.span>
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            QR Code Generator
          </motion.h1>
          <motion.p
            className="page-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Enter your content, customize the colors and download a crisp PNG or SVG in seconds.
          </motion.p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <QRGenerator />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><ShieldCheck size={14} /> Best practices</span>
            <h2 className="section-heading">Get the best results</h2>
          </div>
          <div className="feature-grid">
            {tips.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.article
                  key={t.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <span className="feature-icon"><Icon size={20} /></span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </motion.article>
              );
            })}
          </div>
          <p className="gen-back">
            <Link to="/" className="link-inline">← Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
