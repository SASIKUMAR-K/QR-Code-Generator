import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, Zap, Palette, Maximize2, Link2, QrCode } from 'lucide-react';
import './App.css';

const SIZES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const PRESETS = [
  { label: 'Neon', dark: '#00f5ff', light: '#0a0a1a' },
  { label: 'Sunset', dark: '#ff6b6b', light: '#ffeaa7' },
  { label: 'Forest', dark: '#00b894', light: '#f0fff4' },
  { label: 'Galaxy', dark: '#a29bfe', light: '#1a1a2e' },
  { label: 'Fire', dark: '#fd79a8', light: '#2d1b2e' },
  { label: 'Classic', dark: '#000000', light: '#ffffff' },
];

export default function App() {
  const [url, setUrl] = useState('sasikumar-k.web.app');
  const [size, setSize] = useState(300);
  const [colorDark, setColorDark] = useState('#000000');
  const [colorLight, setColorLight] = useState('#ffffff');
  const [activePreset, setActivePreset] = useState('Classic');
  const [downloaded, setDownloaded] = useState(false);
  const svgRef = useRef(null);

  const applyPreset = (preset) => {
    setColorDark(preset.dark);
    setColorLight(preset.light);
    setActivePreset(preset.label);
  };

  const handleDownload = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const padding = Math.round(size * 0.08);
    const total = size + padding * 2;
    const canvas = document.createElement('canvas');
    canvas.width = total;
    canvas.height = total;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = colorLight;
      ctx.fillRect(0, 0, total, total);
      ctx.drawImage(img, padding, padding, size, size);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'qrcode.png';
      a.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="app-root">
      {/* Animated background orbs */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      {/* Header */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="header-icon">
          <QrCode size={28} />
        </div>
        <div>
          <h1 className="header-title">Build<span className="gradient-text">QR</span></h1>
          <p className="header-sub">Generate stunning QR codes instantly</p>
        </div>
        <div className="header-badge">
          <Sparkles size={14} />
          <span>v0.0.1</span>
        </div>
      </motion.header>

      {/* Main */}
      <main className="main-grid">
        {/* Controls Panel */}
        <motion.div
          className="panel controls-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="panel-header">
            <Zap size={18} className="panel-icon" />
            <span>Customize</span>
          </div>

          {/* URL Input */}
          <div className="field-group">
            <label className="field-label">
              <Link2 size={14} /> Content / URL
            </label>
            <div className="input-wrapper">
              <input
                className="styled-input"
                type="text"
                placeholder="Enter URL or text..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="input-glow" />
            </div>
          </div>

          {/* Size */}
          <div className="field-group">
            <label className="field-label">
              <Maximize2 size={14} /> Size
            </label>
            <div className="size-grid">
              {SIZES.map((s) => (
                <motion.button
                  key={s}
                  className={`size-btn ${size === s ? 'active' : ''}`}
                  onClick={() => setSize(s)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Presets */}
          <div className="field-group">
            <label className="field-label">
              <Palette size={14} /> Color Presets
            </label>
            <div className="preset-grid">
              {PRESETS.map((p) => (
                <motion.button
                  key={p.label}
                  className={`preset-btn ${activePreset === p.label ? 'active' : ''}`}
                  style={{ '--dark': p.dark, '--light': p.light }}
                  onClick={() => applyPreset(p)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="preset-swatch" style={{ background: `linear-gradient(135deg, ${p.dark}, ${p.light})` }} />
                  <span>{p.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="field-group">
            <label className="field-label">Custom Colors</label>
            <div className="color-row">
              <div className="color-item">
                <span>Foreground</span>
                <div className="color-picker-wrap">
                  <input type="color" value={colorDark} onChange={(e) => { setColorDark(e.target.value); setActivePreset(''); }} />
                  <span className="hex-label">{colorDark.toUpperCase()}</span>
                </div>
              </div>
              <div className="color-item">
                <span>Background</span>
                <div className="color-picker-wrap">
                  <input type="color" value={colorLight} onChange={(e) => { setColorLight(e.target.value); setActivePreset(''); }} />
                  <span className="hex-label">{colorLight.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download */}
          <motion.button
            className="download-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {downloaded ? (
                <motion.span key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="btn-inner">
                  <Sparkles size={18} /> Saved!
                </motion.span>
              ) : (
                <motion.span key="dl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="btn-inner">
                  <Download size={18} /> Download PNG
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* QR Preview Panel */}
        <motion.div
          className="panel preview-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="panel-header">
            <QrCode size={18} className="panel-icon" />
            <span>Preview</span>
          </div>

          <div className="qr-stage" style={{ background: colorLight }}>
            <div className="qr-ring qr-ring1" />
            <div className="qr-ring qr-ring2" />
            <motion.div
              ref={svgRef}
              className="qr-wrap"
              key={`${url}-${colorDark}-${colorLight}`}
              initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={url || ' '}
                fgColor={colorDark}
                bgColor={colorLight}
                viewBox="0 0 256 256"
              />
            </motion.div>
          </div>

          <div className="qr-meta">
            <div className="qr-meta-item">
              <span className="meta-label">Size</span>
              <span className="meta-value">{size}×{size}px</span>
            </div>
            <div className="qr-meta-divider" />
            <div className="qr-meta-item">
              <span className="meta-label">Format</span>
              <span className="meta-value">PNG / SVG</span>
            </div>
            <div className="qr-meta-divider" />
            <div className="qr-meta-item">
              <span className="meta-label">Characters</span>
              <span className="meta-value">{url.length}</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span>Built by </span>
        <a href="https://sasikumar-k.web.app" target="_blank" rel="noreferrer" className="footer-link">
          Sasikumar K
        </a>
        <span> — </span>
        <a href="https://sasikumar-k.web.app" target="_blank" rel="noreferrer" className="footer-site">
          sasikumar-k.web.app
        </a>
      </motion.footer>
    </div>
  );
}
