import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import data from '../data/novo-nordisk.json';
import HeroSection from '../components/HeroSection';
import SectionWrapper from '../components/SectionWrapper';
import MetricsGrid from '../components/MetricsGrid';
import Timeline from '../components/Timeline';
import EvolutionBox from '../components/EvolutionBox';
import ActionList from '../components/ActionList';
import Footer from '../components/Footer';

export default function NovoNordiskPage() {
  const [metricsActive, setMetricsActive] = useState(false);
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);

  const navSections = [
    { id: 'section-01', number: '01', title: 'Quiénes somos' },
    { id: 'section-02', number: '02', title: 'Números' },
    { id: 'section-03', number: '03', title: 'El problema' },
    { id: 'section-04', number: '04', title: 'Objetivos' },
    { id: 'section-05', number: '05', title: 'La solución' },
    { id: 'section-06', number: '06', title: 'Arquitectura' },
    { id: 'section-07', number: '07', title: 'AI Pipeline' },
    { id: 'section-08', number: '08', title: 'Roadmap' },
    { id: 'section-09', number: '09', title: 'Enfoque' },
    { id: 'section-10', number: '10', title: 'El Squad' },
    { id: 'section-11', number: '11', title: 'Casos de uso' },
    { id: 'section-12', number: '12', title: 'Next Steps' }
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('[data-nav-section="true"]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.title = 'Novo Nordisk — Smart Monitoring & Compliance Platform';
  }, []);

  return (
    <main className="page-shell">
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>
      <a className="hub-backlink" href="/novovision-prototype/">
        ← Volver al hub
      </a>

      <div className="app-layout">
        <HeroSection
          meta={data.meta}
          actions={{
            primary: { href: '#section-01', label: 'Empezar lectura' },
            secondary: { href: '#section-12', label: 'Próximos pasos' }
          }}
        />

        {/* Prototype banner — highlighted at the top */}
        <motion.div
          className="proto-banner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="proto-banner-inner">
            <div className="proto-banner-text">
              <span className="proto-banner-label">Prototipo interactivo disponible</span>
              <p className="proto-banner-desc">
                Explora la experiencia de usuario propuesta para la plataforma de compliance antes de leer la propuesta completa.
              </p>
            </div>
            <a
              className="proto-banner-cta"
              href={data.prototypeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Iniciar prototipo ↗
            </a>
          </div>
        </motion.div>

        <aside className="side-nav" aria-label="Navegación por secciones">
          <div className="side-nav-brand" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="var(--neutral-900)"/>
              <mask id="nms" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32"><path d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="#001965"/></mask>
              <g mask="url(#nms)"><path d="M15.8192 8.93896C19.1997 8.93896 21.9217 6.3485 21.9217 3.17778C21.9217-.0136687 19.1997-2.5834 15.8192-2.5834C12.4387-2.5834 9.7168.00705485 9.7168 3.17778C9.7168 6.36922 12.4607 8.93896 15.8192 8.93896ZM15.9948-1.23637C18.2339-1.23637 20.0339.483699 20.0339 2.57679C20.0339 4.69061 18.2339 6.38995 15.9948 6.38995C13.7558 6.38995 11.9339 4.69061 11.9339 2.57679C11.9339.462976 13.7558-1.23637 15.9948-1.23637Z" fill="var(--neutral-00)"/><path d="M46.4842 19.1143C45.672 15.4669 42.3135 15.3633 40.5355 15.4876C38.6916 15.612 35.2233 16.1301 31.6452 16.1301C26.816 16.1301 21.394 14.8452 17.2233 13.0215C16.4989 12.7106 16.8721 12.5656 17.1794 12.3998C18.7379 11.5916 20.0989 10.8662 20.933 9.58137C21.5696 8.60736 21.3282 8.2965 20.6257 8.83532C18.7379 10.3067 16.0599 11.1356 13.0526 10.1202C10.0452 9.10473 8.88183 6.3692 8.61842 5.68532C8.355 5.00144 7.98183 4.93927 7.98183 5.95473C7.98183 8.50374 9.1672 10.0373 9.58427 10.4725C9.97939 10.9077 10.177 11.3429 9.95744 11.5916C9.36476 12.2547 8.72817 12.9801 8.70622 13.2702C8.68427 13.581 8.70622 13.7468 8.57452 14.0991C8.44281 14.4514 7.95988 14.9695 7.21354 15.8399C6.79647 16.3373 7.05988 16.8761 7.4111 17.2491C7.82817 17.6843 8.11354 18.2024 8.64037 18.4304C9.1672 18.6583 9.65012 18.4926 10.2648 18.5962C10.8574 18.6998 11.6038 19.0314 12.1965 20.0261C13.0526 21.4768 13.9745 23.7356 15.6428 25.6008C16.3891 26.4297 16.3891 27.9425 16.3891 28.4399C16.433 32.8126 13.9965 36.9574 12.4379 39.5893C12.0648 40.211 12.1526 40.7291 12.6355 40.7291C13.2062 40.7291 15.3135 40.7291 15.6648 40.7291C16.0599 40.7291 16.3013 40.3353 16.3233 39.9208C16.5867 36.3356 18.7379 29.7662 20.3623 28.6472C23.0843 30.2429 25.7842 33.683 24.4672 39.6929C24.4013 40.0245 24.0721 40.7498 24.8843 40.7498H27.4964C27.8257 40.7498 28.3745 40.6254 28.3306 40.0452C28.1989 37.7034 26.1135 32.7504 25.5647 29.8284C25.2135 27.984 26.7721 24.6889 32.655 27.2172C34.9159 25.3106 37.8794 26.4712 36.6062 30.1393C35.355 33.7866 34.2794 35.4031 29.9989 39.6929C29.516 40.1902 29.4721 40.7291 30.2623 40.7291H33.0062C33.5989 40.7291 33.8403 40.5633 34.0159 40.1281C34.1916 39.6722 36.1452 33.8281 39.9867 31.0925C40.294 30.8853 40.5355 29.9527 41.1281 27.8182C42.994 30.1185 43.2354 34.3047 40.0525 39.7136C39.7233 40.2731 39.9208 40.7083 40.3159 40.7083H42.7964C43.2574 40.7083 43.3891 40.4804 43.5647 39.8172C43.7842 39.009 43.872 38.6152 44.1574 37.8485C44.333 37.3718 44.4208 37.2889 46.3964 37.3097C47.033 37.3097 46.9891 36.9988 46.9891 36.5014C47.0111 29.2689 47.055 21.7047 46.4842 19.1143Z" fill="var(--neutral-00)"/></g>
            </svg>
          </div>
          <ul className="side-nav-list">
            {navSections.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'side-nav-link active' : 'side-nav-link'}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  <span>{item.number}.</span> {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="page-content">
          {/* 01 — Quiénes somos */}
          <SectionWrapper id="section-01" number="01" title="Quiénes somos">
            {data.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <div className="evolution-box">
              <div className="evolution-label">{data.partnership.label}</div>
              <h3 className="evolution-title">{data.partnership.title}</h3>
              <div className="evolution-body">
                <p>{data.partnership.body}</p>
              </div>
              <div className="evolution-vs">
                <motion.div
                  className="evolution-col before"
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div className="evolution-col-label">{data.partnership.col1.label}</div>
                  <div className="evolution-col-title">{data.partnership.col1.title}</div>
                  <div className="evolution-col-body">{data.partnership.col1.body}</div>
                </motion.div>
                <motion.div
                  className="evolution-col after"
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div className="evolution-col-label">{data.partnership.col2.label}</div>
                  <div className="evolution-col-title">{data.partnership.col2.title}</div>
                  <div className="evolution-col-body">{data.partnership.col2.body}</div>
                </motion.div>
              </div>
            </div>

            <div className="callout">
              <p>{data.introCallout}</p>
            </div>
          </SectionWrapper>

          {/* 02 — Números */}
          <SectionWrapper id="section-02" number="02" title="El impacto en números">
            <motion.div
              onViewportEnter={() => setMetricsActive(true)}
              viewport={{ once: true, margin: '-80px' }}
            >
              <MetricsGrid metrics={data.metrics} active={metricsActive} />
            </motion.div>
          </SectionWrapper>

          {/* 03 — El problema */}
          <SectionWrapper id="section-03" number="03" title="El problema">
            <p>{data.puntoPartidaIntro}</p>

            <div className="decision-grid">
              {data.puntoPartida.map((item) => (
                <article className="decision-card" key={item.title}>
                  <h3 className="decision-card-title">{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <p className="section-note" style={{ marginTop: 28 }}>Los tres retos principales</p>
            {data.problems.map((problem) => (
              <motion.article
                className="pattern-block"
                key={problem.number}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="pattern-watermark">{problem.number}</div>
                <div className="pattern-content">
                  <div className="pattern-label">Reto {problem.number}</div>
                  <h3 className="pattern-title">{problem.title}</h3>
                  <p className="pattern-body">{problem.body}</p>
                  <p className="quick-decision-complexity">{problem.tag}</p>
                </div>
              </motion.article>
            ))}
          </SectionWrapper>

          {/* 04 — Objetivos */}
          <SectionWrapper id="section-04" number="04" title="Qué queremos conseguir">
            <ul className="action-list">
              {data.objectives.map((item, index) => (
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
                  </div>
                </motion.li>
              ))}
            </ul>
          </SectionWrapper>

          {/* 05 — Los 5 pilares */}
          <SectionWrapper id="section-05" number="05" title="La solución — 5 pilares">
            <p>
              La plataforma se construye sobre cinco pilares que cubren el ciclo completo: desde la
              ingesta de datos hasta la gestión del workflow de revisión.
            </p>
            <div className="archetype-grid">
              {data.pillars.map((pillar, index) => (
                <motion.article
                  className="archetype-card"
                  key={pillar.number}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.08, duration: 0.4, ease: 'easeOut' }
                  }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div className="archetype-number">Pilar {pillar.number}</div>
                  <h3 className="archetype-name">{pillar.name}</h3>
                  <p className="archetype-body">{pillar.body}</p>
                </motion.article>
              ))}
            </div>
          </SectionWrapper>

          {/* 06 — Arquitectura & Tech Stack */}
          <SectionWrapper id="section-06" number="06" title="Arquitectura técnica">
            <p>
              Arquitectura diseñada para escalar. El flujo va de SAP Concur (fuente) a través del
              pipeline de AI y el motor de reglas, hasta el dashboard de monitorización.
            </p>

            {/* Architecture flow diagram */}
            <div className="evolution-box" style={{ marginBottom: 32 }}>
              <div className="evolution-label">Platform Architecture</div>
              <h3 className="evolution-title">Flujo de datos end-to-end</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 16 }}>
                {[
                  { label: 'SOURCE', name: 'SAP Concur' },
                  { label: 'PROCESSING', name: 'AI Pipeline' },
                  { label: 'RULES', name: 'Engine' },
                  { label: 'STORAGE', name: 'PostgreSQL' },
                  { label: 'API', name: 'REST / GQL' },
                  { label: 'UI', name: 'Dashboard' }
                ].map((node, i, arr) => (
                  <span key={node.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        border: '1px solid var(--neutral-200)',
                        borderRadius: 10,
                        padding: '10px 14px',
                        background: 'var(--neutral-00)',
                        textAlign: 'center',
                        minWidth: 90
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                          fontSize: 9,
                          letterSpacing: '0.1em',
                          color: 'var(--blue-500)',
                          marginBottom: 4
                        }}
                      >
                        {node.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, textTransform: 'uppercase' }}>
                        {node.name}
                      </span>
                    </span>
                    {i < arr.length - 1 && (
                      <span style={{ color: 'var(--neutral-600)', fontSize: 16 }}>→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <p className="section-note" style={{ marginBottom: 18 }}>Technology Stack</p>
            <div className="signal-table-wrap">
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>Capa</th>
                    <th>Tecnologías</th>
                  </tr>
                </thead>
                <tbody>
                  {data.techStack.map((row) => (
                    <tr key={row.category}>
                      <td data-label="Capa">{row.category}</td>
                      <td data-label="Tecnologías">{row.items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          {/* 07 — AI Pipeline */}
          <SectionWrapper id="section-07" number="07" title="AI Pipeline">
            <p>{data.pipelines.intro}</p>

            <div className="evolution-box">
              <div className="evolution-label">{data.pipelines.pipeline1.label}</div>
              <h3 className="evolution-title">Análisis automático de tickets</h3>
              <div className="evolution-body">
                {data.pipelines.pipeline1.steps.map((s, i) => (
                  <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 12 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        color: 'var(--blue-500)',
                        minWidth: 70
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}. {s.step}
                    </span>
                    <span style={{ fontSize: 14 }}>{s.body}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="evolution-box">
              <div className="evolution-label">{data.pipelines.pipeline2.label}</div>
              <h3 className="evolution-title">Procesamiento de recibos</h3>
              <div className="evolution-body">
                {data.pipelines.pipeline2.steps.map((s, i) => (
                  <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 12 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        color: 'var(--blue-500)',
                        minWidth: 70
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}. {s.step}
                    </span>
                    <span style={{ fontSize: 14 }}>{s.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* 08 — Roadmap */}
          <SectionWrapper id="section-08" number="08" title="Roadmap — Fases de diseño">
            <p>
              El proyecto se estructura en 6 fases con entregas incrementales. Cada fase produce
              valor desplegable y se valida con el equipo de Novo Nordisk antes de avanzar.
            </p>
            <Timeline items={data.phases} />
          </SectionWrapper>

          {/* 09 — Enfoque */}
          <SectionWrapper id="section-09" number="09" title="Cómo trabajamos">
            <EvolutionBox evolution={data.enfoque} />
            <div className="callout">
              <p>
                Trabajamos en sprints de 2 semanas con planning, demo y retrospectiva. El cliente
                tiene visibilidad total en todo momento sobre el estado del proyecto.
              </p>
            </div>
          </SectionWrapper>

          {/* 10 — El Squad */}
          <SectionWrapper id="section-10" number="10" title="El Squad">
            <div className="scan-summary">
              <p className="scan-summary-label">Squad dedicado — {data.squad.fee}</p>
              <p>{data.squad.note}</p>
            </div>
            <div className="signal-table-wrap">
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>Perfil</th>
                    <th>Dedicación</th>
                    <th>Responsabilidades</th>
                  </tr>
                </thead>
                <tbody>
                  {data.squad.members.map((m) => (
                    <tr key={m.perfil}>
                      <td data-label="Perfil">{m.perfil}</td>
                      <td data-label="Dedicación">{m.dedicacion}</td>
                      <td data-label="Responsabilidades">{m.responsabilidades}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          {/* 11 — Casos de uso */}
          <SectionWrapper id="section-11" number="11" title="Casos de uso">
            <div className="archetype-grid">
              {data.cases.map((c, index) => (
                <motion.article
                  className="archetype-card"
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.08, duration: 0.4, ease: 'easeOut' }
                  }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div className="archetype-number">{c.tag}</div>
                  <h3 className="archetype-name">{c.name}</h3>
                  <p className="archetype-body">{c.body}</p>
                </motion.article>
              ))}
            </div>
            <p className="section-note">
              <strong>Y más:</strong> {data.moreClients}
            </p>
          </SectionWrapper>

          {/* 12 — Próximos pasos */}
          <SectionWrapper id="section-12" number="12" title="Próximos pasos">
            <ActionList items={data.nextSteps} />

            <div className="callout" style={{ marginTop: 32 }}>
              <p>
                Hemos preparado un prototipo interactivo de la plataforma para que puedas explorar
                la experiencia de usuario propuesta.
              </p>
              <p style={{ marginBottom: 0 }}>
                <a
                  className="callout-link"
                  href={data.prototypeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Iniciar prototipo ↗
                </a>
              </p>
            </div>
          </SectionWrapper>

          <Footer footer={data.footer} />
        </div>
      </div>
    </main>
  );
}
