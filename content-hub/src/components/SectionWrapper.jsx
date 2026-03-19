import { motion } from 'framer-motion';
import { fadeUp } from './animations';

export default function SectionWrapper({ id, number, title, children }) {
  return (
    <motion.section
      id={id}
      data-nav-section="true"
      className="section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="section-number">{number}</div>
      <h2 className="section-title">{title}</h2>
      {children}
    </motion.section>
  );
}
