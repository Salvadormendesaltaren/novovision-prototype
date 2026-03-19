import { motion } from 'framer-motion';

const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const slideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function EvolutionBox({ evolution }) {
  return (
    <div className="evolution-box">
      <div className="evolution-label">{evolution.label}</div>
      <h3 className="evolution-title">{evolution.title}</h3>
      <div className="evolution-body">
        {evolution.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="evolution-vs">
        <motion.div
          className="evolution-col before"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="evolution-col-label">{evolution.before.label}</div>
          <div className="evolution-col-title">{evolution.before.title}</div>
          <div className="evolution-col-body">{evolution.before.body}</div>
        </motion.div>
        <motion.div
          className="evolution-col after"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="evolution-col-label">{evolution.after.label}</div>
          <div className="evolution-col-title">{evolution.after.title}</div>
          <div className="evolution-col-body">{evolution.after.body}</div>
        </motion.div>
      </div>

      <div className="evolution-body">
        <p>{evolution.outro}</p>
      </div>
    </div>
  );
}
