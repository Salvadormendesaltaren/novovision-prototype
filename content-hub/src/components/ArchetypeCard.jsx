import { motion } from 'framer-motion';

export default function ArchetypeCard({ item, index }) {
  return (
    <motion.article
      className="archetype-card"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.08, duration: 0.4, ease: 'easeOut' } }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="archetype-number">Arquetipo {item.number}</div>
      <h3 className="archetype-name">{item.name}</h3>
      <p className="archetype-body">{item.body}</p>

      <div className="archetype-champion">
        <div className="archetype-champion-label">Champion real</div>
        <div className="archetype-champion-name">{item.champion.name}</div>
        <div className="archetype-champion-body">{item.champion.body}</div>
      </div>

      <div className="archetype-signals">
        <div className="archetype-signals-label">Señales Signal Hunter</div>
        <div className="archetype-signals-list">{item.signals.join(' · ')}</div>
      </div>

      <div className="archetype-examples">
        Casos <span>{item.cases.join(' · ')}</span>
      </div>
    </motion.article>
  );
}
