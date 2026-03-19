import { motion } from 'framer-motion';

export default function ActionList({ items }) {
  return (
    <ul className="action-list">
      {items.map((item, index) => (
        <motion.li
          key={item.number}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: index * 0.04, duration: 0.35, ease: 'easeOut' }
          }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="action-num">{item.number}</span>
          <div className="action-text">
            <strong>{item.title}</strong>
            {item.body}
            <em>Estado → {item.status}</em>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
