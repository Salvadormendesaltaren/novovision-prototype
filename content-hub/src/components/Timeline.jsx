import { motion } from 'framer-motion';

export default function Timeline({ items }) {
  const icons = [
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="3" y="3.5" width="14" height="13" rx="2.5" />
      <path d="M6.5 7h7M6.5 10h7M6.5 13h4" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 15.5h13V4.5h-13z" />
      <path d="M6.5 8.5h7M6.5 11.5h5" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 6.5v3.5l2.5 1.8" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
      <circle cx="10" cy="10" r="7" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 14h12M6 10h8M8 6h4" />
      <circle cx="10" cy="10" r="7" />
    </svg>
  ];

  return (
    <div className="timeline">
      {items.map((item, index) => (
        <motion.div
          className="timeline-item"
          key={item.step}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.07, duration: 0.35, ease: 'easeOut' }
          }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="timeline-date">
            <span className="timeline-icon">{icons[index] || icons[0]}</span>
            {item.step}
          </div>
          <div className="timeline-content">
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-body">{item.body}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
