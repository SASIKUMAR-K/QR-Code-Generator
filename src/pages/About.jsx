import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Mail, Code,
  QrCode, GraduationCap, Sparkles, ExternalLink, Wrench,
} from 'lucide-react';
import SocialIcon from '../components/SocialIcon.jsx';
import { site, author, projects } from '../config/site.js';
import { useSEO, structuredData } from '../lib/seo.js';

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: author.name,
  jobTitle: author.roles[0],
  description: author.bio,
  url: `${site.url}/about`,
  email: `mailto:${author.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  alumniOf: { '@type': 'CollegeOrUniversity', name: author.education },
  sameAs: author.socials.map((s) => s.href),
};

export default function About() {
  useSEO({
    title: `About ${author.name}`,
    description: `${author.name} — ${author.headline}. ${author.bio}`,
    path: '/about',
    type: 'profile',
    jsonLd: [person, structuredData.website()],
  });

  return (
    <div className="page about-page">
      {/* ── Hero ── */}
      <section className="page-head about-head">
        <div className="container about-hero">
          <motion.div
            className="about-monogram"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span>SK</span>
          </motion.div>

          <div className="about-intro">
            <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Sparkles size={14} /> About the builder
            </motion.span>
            <motion.h1 className="page-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              {author.name}
            </motion.h1>
            <motion.p className="about-roles" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
              {author.roles.join('  ·  ')}
            </motion.p>
            <motion.p className="page-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              {author.bio}
            </motion.p>

            <motion.div className="about-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
              <span><MapPin size={14} /> {author.location}</span>
              <span><GraduationCap size={14} /> {author.education}</span>
            </motion.div>

            <motion.div className="about-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <a href={`mailto:${author.email}`} className="btn btn-primary">
                <Mail size={16} /> Get in touch
              </a>
              <a href={author.portfolio} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <ExternalLink size={16} /> Portfolio
              </a>
            </motion.div>

            <motion.div className="about-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {author.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-chip">
                  <SocialIcon name={s.icon} size={16} /> <span>{s.label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><Code size={14} /> Skills</span>
            <h2 className="section-heading">Technical expertise</h2>
            <p className="section-sub">Technologies I work with across the stack.</p>
          </div>
          <div className="skills-grid">
            {author.skillGroups.map((group, gi) => (
              <motion.div
                key={group.name}
                className="skill-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: gi * 0.06 }}
              >
                <h3>{group.name}</h3>
                <div className="skill-bars">
                  {group.skills.map((s, si) => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-row-top">
                        <span>{s.name}</span>
                        <span className="skill-pct">{s.level}%</span>
                      </div>
                      <div className="skill-track">
                        <motion.div
                          className="skill-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: si * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="tools-row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="tools-label"><Wrench size={14} /> Tools I use</span>
            <div className="tools-chips">
              {author.tools.map((t) => <span key={t} className="tool-chip">{t}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="section section-alt" id="projects">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><QrCode size={14} /> Work</span>
            <h2 className="section-heading">Selected projects</h2>
            <p className="section-sub">A few things I have designed, built and shipped.</p>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="project-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="project-card-top">
                  <h3>{p.title}</h3>
                  <ExternalLink size={16} className="project-arrow" />
                </div>
                <p>{p.text}</p>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div className="cta-glow" />
            <h2>Let&apos;s build something together</h2>
            <p>Have a project in mind or just want to say hi? I am always open to new ideas.</p>
            <div className="cta-actions">
              <a href={`mailto:${author.email}`} className="btn btn-primary btn-lg">
                <Mail size={16} /> Email me
              </a>
              <Link to="/generator" className="btn btn-ghost btn-lg">
                <QrCode size={16} /> Try {site.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
