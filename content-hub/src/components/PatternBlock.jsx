import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const watermark = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

const content = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

export default function PatternBlock({ pattern }) {
  return (
    <motion.article
      className="pattern-block"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div className="pattern-watermark" variants={watermark}>
        {pattern.number}
      </motion.div>
      <motion.div className="pattern-content" variants={content}>
        <div className="pattern-label">Patrón {pattern.number}</div>
        <h3 className="pattern-title">{pattern.title}</h3>
        <p className="pattern-body">{pattern.body}</p>
      </motion.div>
    </motion.article>
  );
}
