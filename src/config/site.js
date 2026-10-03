// ─────────────────────────────────────────────────────────────
// Central site configuration.
// Rebranding the whole app = edit this one file.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Qraviq',
  nameLower: 'qraviq',
  // Update this once you create the Firebase Hosting site "qraviq".
  domain: 'qraviq.web.app',
  url: 'https://qraviq.web.app',
  tagline: 'Free QR Code Generator',
  shortDesc:
    'Create beautiful, high-resolution QR codes in seconds — free, no signup, no watermark.',
  description:
    'Qraviq is a free online QR code generator. Create beautiful, high-resolution QR codes in seconds — customize colors, choose your size and download PNG or SVG instantly. No signup, no watermark, and it runs entirely in your browser.',
  keywords: [
    'Qraviq',
    'free qr code generator',
    'qr code generator',
    'custom qr code',
    'qr code maker',
    'colored qr code',
    'high resolution qr code',
    'qr code png',
    'qr code svg',
    'online qr generator',
  ],
  themeColor: '#0a0f1c',
  locale: 'en',
  version: '1.0.0',
};

export const nav = [
  { label: 'Features', to: '/#features' },
  { label: 'How it works', to: '/#how' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'About', to: '/about' },
];

export const sizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export const presets = [
  { label: 'Classic', dark: '#000000', light: '#ffffff' },
  { label: 'Midnight', dark: '#4f6ef7', light: '#0a0f1c' },
  { label: 'Ocean', dark: '#0ea5e9', light: '#eff6ff' },
  { label: 'Emerald', dark: '#059669', light: '#f0fdf4' },
  { label: 'Sunset', dark: '#f97316', light: '#fff7ed' },
  { label: 'Royal', dark: '#7c3aed', light: '#faf5ff' },
  { label: 'Rose', dark: '#e11d48', light: '#fff1f2' },
  { label: 'Graphite', dark: '#1e293b', light: '#e2e8f0' },
];

export const features = [
  {
    icon: 'zap',
    title: 'Instant generation',
    text: 'Your QR code updates live as you type — no page reloads, no waiting, no queues.',
  },
  {
    icon: 'palette',
    title: 'Custom colors',
    text: 'Pick from curated presets or set your own foreground and background colors.',
  },
  {
    icon: 'download',
    title: 'High-resolution export',
    text: 'Download crisp PNGs up to 1000×1000px or a scalable SVG for print-quality results.',
  },
  {
    icon: 'shield',
    title: 'Privacy first',
    text: 'Everything runs 100% in your browser. Your content never touches our servers.',
  },
  {
    icon: 'user',
    title: 'No signup required',
    text: 'Open the page and start generating. No account, no email, no credit card.',
  },
  {
    icon: 'infinity',
    title: 'Free forever',
    text: 'Unlimited QR codes with no watermarks, no expiry and no hidden limits.',
  },
];

export const steps = [
  {
    title: 'Enter your content',
    text: 'Paste a URL, text, phone number or any content you want to encode into the QR code.',
  },
  {
    title: 'Customize the look',
    text: 'Choose a color preset or fine-tune the foreground and background to match your brand.',
  },
  {
    title: 'Download instantly',
    text: 'Pick your resolution and download a ready-to-use PNG or SVG file in one click.',
  },
];

export const faqs = [
  {
    q: 'Is Qraviq really free?',
    a: 'Yes. Qraviq is completely free to use. There is no signup, no watermark and no limit on how many QR codes you create.',
  },
  {
    q: 'Do my QR codes expire?',
    a: 'No. The QR codes are generated directly in your browser and encode your content statically, so they never expire and never stop working.',
  },
  {
    q: 'What is the difference between PNG and SVG?',
    a: 'PNG is a raster image, perfect for screens and social media. SVG is a vector format that stays perfectly sharp at any size, which makes it ideal for printing.',
  },
  {
    q: 'Can I use the QR codes commercially?',
    a: 'Absolutely. Every QR code you create with Qraviq is yours to use for personal or commercial projects, with no attribution required.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. Qraviq generates QR codes entirely in your browser using JavaScript. The content you type is never uploaded or stored on any server.',
  },
];

export const author = {
  name: 'Sasikumar K',
  shortName: 'Sasikumar',
  roles: ['Full Stack Developer', 'Problem Solver', 'Cloud Developer'],
  headline: 'Full Stack Developer · Creator of Qraviq',
  bio: 'Building elegant digital experiences with clean code. Passionate about solving real problems through technology — from web apps and developer tools to IoT systems.',
  location: 'Chennai, Tamil Nadu, India',
  education: 'Sathyabama Institute of Science and Technology (SIST), Chennai',
  email: 'sasikumar05112004@gmail.com',
  phone: '+91 81221 04263',
  phoneHref: 'tel:+918122104263',
  portfolio: 'https://sasikumar-k.web.app',
  socials: [
    { label: 'GitHub', href: 'https://github.com/SASIKUMAR-K', handle: '@SASIKUMAR-K', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mr-sasikumar-k/', handle: 'in/mr-sasikumar-k', icon: 'linkedin' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/SASIKUMAR-K/', handle: '500+ solved', icon: 'code' },
    { label: 'Instagram', href: 'https://www.instagram.com/mr.sasikumar.k/', handle: '@mr.sasikumar.k', icon: 'instagram' },
  ],
  skillGroups: [
    {
      name: 'Frontend',
      skills: [
        { name: 'HTML & CSS', level: 90 },
        { name: 'JavaScript', level: 80 },
        { name: 'React', level: 75 },
        { name: 'Bootstrap', level: 70 },
      ],
    },
    {
      name: 'Backend',
      skills: [
        { name: 'FastAPI', level: 80 },
        { name: 'Flask', level: 70 },
        { name: 'Spring Boot', level: 55 },
        { name: 'Node.js', level: 40 },
      ],
    },
    {
      name: 'Database',
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 55 },
      ],
    },
    {
      name: 'Cloud & DevOps',
      skills: [
        { name: 'Firebase', level: 70 },
        { name: 'AWS', level: 50 },
        { name: 'Docker', level: 35 },
        { name: 'CI/CD', level: 30 },
      ],
    },
  ],
  tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Canva', 'Firebase', 'Vite'],
};
export const projects = [
  {
    title: 'Qraviq — QR Code Generator',
    text: 'A free, privacy-first QR code generator built with React. Live preview, custom colors and high-resolution PNG/SVG export.',
    tags: ['React', 'Vite', 'Firebase'],
    href: site.url,
  },
  {
    title: 'Science Club Website',
    text: 'Official website for the college Science Club with events, registration forms and an admin panel — the first club website built in the college.',
    tags: ['React', 'Google Sheets API', 'Firebase'],
    href: 'https://sistscienceclub.web.app',
  },
  {
    title: 'Horizon 2024 — Symposium Website',
    text: 'Official website for the Horizon 2024 symposium, built as Technical Co-Lead of the ACM SIST chapter.',
    tags: ['React', 'Firebase'],
    href: 'https://horizon2024.web.app',
  },
  {
    title: 'Short Link App',
    text: 'A two-app URL shortener system: an open-source link shortener with custom keys and a dedicated resume-sharing app.',
    tags: ['React', 'Firebase'],
    href: 'https://linkshort.web.app',
  },
  {
    title: 'CGPA Calculator',
    text: 'Two fast CGPA calculators — one tailored for EEE students and one for everyone to compute semester CGPA instantly.',
    tags: ['HTML', 'JavaScript', 'Django', 'MySQL'],
    href: 'https://computecgpa.web.app',
  },
  {
    title: 'Traffic Sign Prediction',
    text: 'A deep-learning model that detects and predicts traffic signs in real time to help reduce human error on the road.',
    tags: ['Python', 'Deep Learning', 'CNN'],
    href: 'https://github.com/SASIKUMAR-K',
  },
];



