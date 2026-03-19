import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

function MetricValue({ metric, active }) {
  const canCount = Number.isInteger(metric.value) && metric.display === String(metric.value);
  const base = useMotionValue(0);
  const rounded = useTransform(base, (latest) => Math.round(latest));

  useEffect(() => {
    if (!active || !canCount) {
      return;
    }
    const controls = animate(base, metric.value, { duration: 1.2, ease: 'easeOut' });
    return () => controls.stop();
  }, [active, base, canCount, metric.value]);

  if (!canCount) {
    return <div className="metric-value">{metric.display}</div>;
  }

  return <motion.div className="metric-value">{rounded}</motion.div>;
}

export default function MetricsGrid({ metrics, active }) {
  const icons = [
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="3" />
      <path d="M6 8h8M6 11h5" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h14M10 3v14" />
      <circle cx="10" cy="10" r="7" />
    </svg>,
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v14M6 6h8M6 14h8" />
      <circle cx="10" cy="10" r="7" />
    </svg>
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((metric, index) => (
        <div className="metric-cell" key={metric.label}>
          <div className="metric-label-row">
            <span className="metric-icon">{icons[index] || icons[0]}</span>
            <div className="metric-label">{metric.label}</div>
          </div>
          <MetricValue metric={metric} active={active} />
          <div className="metric-desc">{metric.desc}</div>
        </div>
      ))}
    </div>
  );
}
