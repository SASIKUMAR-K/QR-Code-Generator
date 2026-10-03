import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2, Maximize2, Palette, FileImage, FileCode2,
  Check, QrCode, SlidersHorizontal, ShieldCheck,
} from 'lucide-react';
import { sizes, presets, site } from '../config/site.js';

function saveBlob(href, filename) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function QRGenerator({ compact = false }) {
  const [value, setValue] = useState(site.url);
  const [size, setSize] = useState(400);
  const [colorDark, setColorDark] = useState('#000000');
  const [colorLight, setColorLight] = useState('#ffffff');
  const [activePreset, setActivePreset] = useState('Classic');
  const [flash, setFlash] = useState(null);
  const stageRef = useRef(null);

  const applyPreset = (p) => {
    setColorDark(p.dark);
    setColorLight(p.light);
    setActivePreset(p.label);
  };

  const getSvg = () => stageRef.current?.querySelector('svg');

  const notify = (kind) => {
    setFlash(kind);
    setTimeout(() => setFlash(null), 1800);
  };

  const downloadPng = () => {
    const svg = getSvg();
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const pad = Math.round(size * 0.08);
    const total = size + pad * 2;
    const canvas = document.createElement('canvas');
    canvas.width = total;
    canvas.height = total;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = colorLight;
      ctx.fillRect(0, 0, total, total);
      ctx.drawImage(img, pad, pad, size, size);
      saveBlob(canvas.toDataURL('image/png'), `${site.nameLower}-qrcode.png`);
      notify('png');
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const downloadSvg = () => {
    const svg = getSvg();
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    saveBlob(url, `${site.nameLower}-qrcode.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('svg');
  };

  return (
    <div className={`generator ${compact ? 'generator-compact' : ''}`}>
      <div className="gen-panel gen-controls">
        <div className="gen-panel-head">
          <SlidersHorizontal size={18} />
          <span>Customize</span>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="qr-content">
            <Link2 size={14} /> Content / URL
          </label>
          <div className="input-wrap">
            <input
              id="qr-content"
              className="input"
              type="text"
              placeholder="Enter a URL or any text…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label">
            <Maximize2 size={14} /> Export size (px)
          </label>
          <div className="size-grid">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`chip ${size === s ? 'is-active' : ''}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label">
            <Palette size={14} /> Color presets
          </label>
          <div className="preset-grid">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                className={`preset ${activePreset === p.label ? 'is-active' : ''}`}
                onClick={() => applyPreset(p)}
              >
                <span
                  className="preset-swatch"
                  style={{ background: `linear-gradient(135deg, ${p.dark}, ${p.light})` }}
                />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label">Custom colors</label>
          <div className="color-row">
            <div className="color-item">
              <span>Foreground</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={colorDark}
                  aria-label="Foreground color"
                  onChange={(e) => { setColorDark(e.target.value); setActivePreset(''); }}
                />
                <span className="hex">{colorDark.toUpperCase()}</span>
              </div>
            </div>
            <div className="color-item">
              <span>Background</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={colorLight}
                  aria-label="Background color"
                  onChange={(e) => { setColorLight(e.target.value); setActivePreset(''); }}
                />
                <span className="hex">{colorLight.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>


        <div className="gen-actions">
          <button type="button" className="btn btn-primary" onClick={downloadPng}>
            <AnimatePresence mode="wait" initial={false}>
              {flash === 'png' ? (
                <motion.span key="ok" className="btn-inner" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <Check size={18} /> Downloaded!
                </motion.span>
              ) : (
                <motion.span key="dl" className="btn-inner" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <FileImage size={18} /> Download PNG
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button type="button" className="btn btn-ghost" onClick={downloadSvg}>
            <FileCode2 size={18} /> Download SVG
          </button>
        </div>

      </div>

      <div className="gen-panel gen-preview">
        <div className="gen-panel-head">
          <QrCode size={18} />
          <span>Live preview</span>
        </div>

        <div className="qr-stage" style={{ background: colorLight }}>
          <motion.div
            ref={stageRef}
            className="qr-wrap"
            key={`${value}-${colorDark}-${colorLight}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={value || ' '}
              fgColor={colorDark}
              bgColor={colorLight}
              viewBox="0 0 256 256"
            />
          </motion.div>
        </div>

        <div className="qr-meta">
          <div className="qr-meta-item">
            <span className="meta-label">Size</span>
            <span className="meta-value">{size}×{size}</span>
          </div>
          <div className="qr-meta-divider" />
          <div className="qr-meta-item">
            <span className="meta-label">Format</span>
            <span className="meta-value">PNG / SVG</span>
          </div>
          <div className="qr-meta-divider" />
          <div className="qr-meta-item">
            <span className="meta-label">Characters</span>
            <span className="meta-value">{(value || '').length}</span>
          </div>
        </div>

        <p className="gen-note">
          <ShieldCheck size={14} /> Generated locally in your browser — nothing is uploaded.
        </p>
      </div>

    </div>
  );
}
