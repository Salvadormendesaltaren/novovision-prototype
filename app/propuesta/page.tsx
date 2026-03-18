"use client";
import { useEffect, useRef, useState } from "react";

/* ─── Scroll-driven fade-in ─── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in-view"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Section chrome (header + footer bars) ─── */
function Section({
  children, id, section, subsection, page, bg = "bg-white", className = "", noPad = false,
}: {
  children: React.ReactNode; id?: string; section: string; subsection?: string;
  page?: string; bg?: string; className?: string; noPad?: boolean;
}) {
  const ref = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`fade-section min-h-screen relative flex flex-col ${bg} ${className}`}
      style={{ scrollSnapAlign: "start" }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3 border-b border-black/10">
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-nn-600">
          / {section}{subsection && <>&nbsp;&nbsp;{subsection}</>}
        </span>
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-nn-400">TAILOR HUB</span>
      </div>

      {/* content */}
      <div className={`flex-1 ${noPad ? "" : "px-6 md:px-10 lg:px-20 py-10 md:py-16"}`}>
        {children}
      </div>

      {/* bottom bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3 border-t border-black/10">
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-nn-400">© TAILOR HUB 2024</span>
        <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-nn-400">
          {page && <>{page} — </>}NOVO NORDISK
        </span>
      </div>
    </section>
  );
}

/* ─── Divider (full-screen title slide) ─── */
function Divider({ title, subtitle }: { title: string; subtitle?: string }) {
  const ref = useInView();
  return (
    <section
      ref={ref}
      className="fade-section min-h-screen flex items-center justify-center bg-nn-900 text-white relative"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50" />
      <div className="text-center z-10 px-6">
        {subtitle && (
          <p className="font-mono uppercase tracking-[0.2em] text-[11px] text-white/50 mb-6">{subtitle}</p>
        )}
        <h2 className="font-[300] text-[clamp(40px,8vw,90px)] tracking-tight leading-[0.95]">{title}</h2>
      </div>
    </section>
  );
}

/* ─── Arrow connector for pipelines ─── */
const Arrow = () => (
  <div className="flex items-center text-nn-400 mx-1 shrink-0">
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
      <path d="M0 8h20m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ─── Pipeline step ─── */
function PipeStep({ label, detail, color = "bg-sea-100 border-sea-300" }: { label: string; detail: string; color?: string }) {
  return (
    <div className={`border rounded-lg px-4 py-3 min-w-[140px] ${color}`}>
      <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-nn-700 mb-1">{label}</p>
      <p className="text-xs text-nn-800">{detail}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════ */
export default function PropuestaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  /* reading progress bar */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(Math.min(p * 100, 100));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto"
      style={{ scrollSnapType: "y proximity" }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-50 h-[3px] bg-[#3354FF] transition-[width] duration-150" style={{ width: `${progress}%` }} />

      {/* ── 1. HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#3354FF] text-white relative" style={{ scrollSnapAlign: "start" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-white/[0.03]" />
        </div>
        <div className="z-10 text-center px-6">
          <p className="font-mono uppercase tracking-[0.25em] text-[11px] text-white/60 mb-8">/ PROPUESTA COMERCIAL</p>
          <h1 className="font-[300] text-[clamp(48px,10vw,120px)] tracking-tight leading-[0.9] mb-4">
            NOVO<br/>NORDISK
          </h1>
          <div className="w-16 h-[1px] bg-white/30 mx-auto my-8" />
          <p className="font-mono uppercase tracking-[0.15em] text-[11px] text-white/70 mb-2">Smart Monitoring & Compliance Platform</p>
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-white/40">by TAILOR HUB</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[float_2s_ease-in-out_infinite]">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 2. COVER ── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ scrollSnapAlign: "start", background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 30%, #2d6b4f 60%, #4a8c5e 80%, #1a3a5c 100%)" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="z-10 text-center px-6">
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-navy font-bold text-xs">NN</span>
            </div>
            <div className="w-[1px] h-8 bg-white/30" />
            <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-white/80">TAILOR HUB</span>
          </div>
          <h2 className="font-[300] text-[clamp(28px,5vw,56px)] tracking-tight text-white leading-tight max-w-3xl">
            SMART MONITORING<br/>AND COMPLIANCE<br/>PLATFORM
          </h2>
          <div className="w-12 h-[1px] bg-white/30 mx-auto mt-8" />
        </div>
      </section>

      {/* ── 3. HELLO — SOMOS TAILOR ── */}
      <Section section="ABOUT" subsection="QUIÉNES SOMOS" page="03/16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ HELLO</p>
            <h2 className="font-[300] text-[clamp(32px,5vw,56px)] tracking-tight leading-[1.05] text-nn-900 mb-8">
              SOMOS<br/>TAILOR HUB
            </h2>
            <div className="space-y-4 text-nn-600 text-sm leading-relaxed">
              <p>
                Somos una consultora tecnológica especializada en <strong className="text-nn-900">Inteligencia Artificial y desarrollo de software enterprise</strong>. Ayudamos a grandes compañías a transformar sus procesos operativos con soluciones digitales a medida.
              </p>
              <p>
                Nuestro equipo combina experiencia en ingeniería de software, ciencia de datos y diseño de producto para entregar plataformas que generan impacto desde el primer sprint.
              </p>
              <p>
                Trabajamos con metodologías ágiles, equipos dedicados y una cultura de ownership que nos convierte en un verdadero partner tecnológico.
              </p>
            </div>
          </div>
          {/* Team placeholder */}
          <div className="bg-nn-50 rounded-2xl aspect-[4/3] flex items-center justify-center border border-nn-100">
            <div className="text-center">
              <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-nn-300 block mb-2">TAILOR HUB</span>
              <span className="text-nn-200 text-6xl font-[200]">TH</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4. CREDENTIALS ── */}
      <Section section="CREDENTIALS" subsection="CLIENTES" page="04/16">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ TRACK RECORD</p>
          <h2 className="font-[300] text-[clamp(28px,4.5vw,48px)] tracking-tight leading-[1.05] text-nn-900 mb-12">
            AI + ENTERPRISE<br/>SOFTWARE SPECIALISTS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "CARGILL", desc: "Plataforma de monitorización de compliance para operaciones globales de trading agrícola.", tag: "AI · Compliance" },
              { name: "INDITEX", desc: "Sistema de auditoría automatizada de proveedores con procesamiento de documentos mediante IA.", tag: "AI · Supply Chain" },
              { name: "DORMAKABA", desc: "Dashboard de analítica en tiempo real para sistemas de control de acceso y seguridad.", tag: "IoT · Analytics" },
            ].map((c) => (
              <div key={c.name} className="border border-nn-100 rounded-xl p-6 hover:border-nn-200 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-nn-50 flex items-center justify-center mb-4">
                  <span className="font-mono text-[10px] font-bold text-nn-500">{c.name.slice(0, 2)}</span>
                </div>
                <h3 className="font-mono uppercase tracking-[0.08em] text-xs text-nn-900 mb-2">{c.name}</h3>
                <p className="text-sm text-nn-500 leading-relaxed mb-4">{c.desc}</p>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#3354FF]/70">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 5. THE PROBLEM (divider) ── */}
      <Divider title="THE PROBLEM" subtitle="ANÁLISIS" />

      {/* ── 6. THE PROBLEM (content) ── */}
      <Section section="PROBLEM" subsection="ANÁLISIS" page="06/16" bg="bg-nn-50">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ CHALLENGE</p>
          <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] text-nn-900 mb-10">
            SOLVING EFFICIENCY<br/>CHALLENGES IN EXPENSE<br/>COMPLIANCE
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Manual monitoring */}
            <div className="bg-white rounded-xl p-6 border border-nn-100">
              <div className="w-8 h-8 rounded-lg bg-danger-100 flex items-center justify-center mb-4">
                <span className="text-danger-700 text-sm">!</span>
              </div>
              <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-nn-900 mb-3">MONITORIZACIÓN MANUAL</h3>
              <p className="text-sm text-nn-500 leading-relaxed">
                Los equipos de compliance revisan manualmente tickets de gasto en SAP Concur, un proceso lento, propenso a errores y difícil de escalar.
              </p>
            </div>
            {/* Two disconnected systems */}
            <div className="bg-white rounded-xl p-6 border border-nn-100">
              <div className="w-8 h-8 rounded-lg bg-ocean-100 flex items-center justify-center mb-4">
                <span className="text-ocean-700 text-sm">⇄</span>
              </div>
              <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-nn-900 mb-3">SISTEMAS DESCONECTADOS</h3>
              <p className="text-sm text-nn-500 leading-relaxed">
                La información vive en silos: SAP Concur por un lado, hojas de cálculo por otro. No existe una fuente única de verdad para el estado del compliance.
              </p>
            </div>
            {/* Automated platform */}
            <div className="bg-white rounded-xl p-6 border border-nn-100">
              <div className="w-8 h-8 rounded-lg bg-sea-100 flex items-center justify-center mb-4">
                <span className="text-sea-800 text-sm">✦</span>
              </div>
              <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-nn-900 mb-3">PLATAFORMA AUTOMATIZADA</h3>
              <p className="text-sm text-nn-500 leading-relaxed">
                La solución: una plataforma que automatiza la monitorización, centraliza datos y aplica reglas de compliance con IA para detectar anomalías.
              </p>
            </div>
          </div>

          {/* Blue callout */}
          <div className="bg-[#3354FF] rounded-xl p-6 md:p-8 text-white">
            <p className="font-mono uppercase tracking-[0.12em] text-[10px] text-white/60 mb-3">/ KEY INSIGHT</p>
            <p className="text-sm md:text-base leading-relaxed font-[300]">
              El 70% del tiempo de los equipos de compliance se dedica a tareas repetitivas de revisión que pueden ser automatizadas con IA, liberando recursos para análisis estratégico y toma de decisiones.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 7. SOLUTION SCOPE (divider) ── */}
      <Divider title="SOLUTION SCOPE" subtitle="PROPUESTA" />

      {/* ── 8. FIVE PILLARS ── */}
      <Section section="SOLUTION" subsection="5 PILARES" page="08/16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ SCOPE</p>
          <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] text-nn-900 mb-10">
            THE SOLUTION IS BUILT<br/>ON 5 PILLARS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { n: "01", title: "DATA INGESTION", items: ["Integración SAP Concur API", "Extracción automática de tickets", "Procesamiento de recibos/fotos", "Normalización de datos"] },
              { n: "02", title: "AI ANALYSIS", items: ["Clasificación de gastos con LLM", "Detección de anomalías", "Extracción OCR de recibos", "Scoring de riesgo automático"] },
              { n: "03", title: "RULES ENGINE", items: ["Motor de reglas configurable", "Políticas de gasto por país", "Umbrales dinámicos", "Alertas automáticas"] },
              { n: "04", title: "MONITORING", items: ["Dashboard en tiempo real", "KPIs de compliance", "Drill-down por ticket", "Exportación de informes"] },
              { n: "05", title: "WORKFLOW", items: ["Cola de revisión priorizada", "Flujos de aprobación", "Audit trail completo", "Notificaciones integradas"] },
            ].map((p) => (
              <div key={p.n} className="border border-nn-100 rounded-xl p-5 hover:border-[#3354FF]/30 transition-colors">
                <span className="font-mono text-[#3354FF] text-[28px] font-[300] block mb-3">{p.n}</span>
                <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-nn-900 mb-4">{p.title}</h3>
                <ul className="space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="text-xs text-nn-500 leading-relaxed flex gap-2">
                      <span className="text-[#3354FF] mt-0.5 shrink-0">·</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 9. TECHNICAL ARCHITECTURE (divider) ── */}
      <Divider title="TECHNICAL ARCHITECTURE" subtitle="PLATAFORMA" />

      {/* ── 10. PLATFORM ARCHITECTURE ── */}
      <Section section="ARCHITECTURE" subsection="PLATFORM" page="10/16" bg="bg-nn-50">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ SYSTEM DESIGN</p>
          <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] text-nn-900 mb-10">
            PLATFORM<br/>ARCHITECTURE
          </h2>

          {/* Architecture diagram */}
          <div className="bg-white rounded-xl border border-nn-100 p-6 md:p-8 overflow-x-auto">
            {/* Labels */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono uppercase tracking-[0.08em] text-[9px] text-nn-400 bg-nn-50 px-2 py-1 rounded">BACK-END</span>
              <div className="flex-1 h-[1px] bg-nn-100" />
              <span className="font-mono uppercase tracking-[0.08em] text-[9px] text-nn-400 bg-nn-50 px-2 py-1 rounded">FRONT-END</span>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 min-w-[700px]">
              {/* SAP Concur */}
              <div className="border-2 border-nn-200 rounded-lg px-4 py-3 text-center min-w-[100px]">
                <p className="font-mono text-[10px] text-nn-400 mb-1">SOURCE</p>
                <p className="font-mono text-xs font-medium text-nn-800">SAP Concur</p>
              </div>
              <Arrow />
              {/* Processing */}
              <div className="border-2 border-sea-300 rounded-lg px-4 py-3 text-center bg-sea-50 min-w-[100px]">
                <p className="font-mono text-[10px] text-sea-600 mb-1">PROCESSING</p>
                <p className="font-mono text-xs font-medium text-nn-800">AI Pipeline</p>
              </div>
              <Arrow />
              {/* Rules */}
              <div className="border-2 border-sea-300 rounded-lg px-4 py-3 text-center bg-sea-50 min-w-[100px]">
                <p className="font-mono text-[10px] text-sea-600 mb-1">RULES</p>
                <p className="font-mono text-xs font-medium text-nn-800">Engine</p>
              </div>
              <Arrow />
              {/* Database */}
              <div className="border-2 border-nn-200 rounded-lg px-4 py-3 text-center min-w-[100px]">
                <p className="font-mono text-[10px] text-nn-400 mb-1">STORAGE</p>
                <p className="font-mono text-xs font-medium text-nn-800">PostgreSQL</p>
              </div>
              <Arrow />
              {/* API */}
              <div className="border-2 border-[#3354FF]/30 rounded-lg px-4 py-3 text-center bg-[#3354FF]/5 min-w-[100px]">
                <p className="font-mono text-[10px] text-[#3354FF] mb-1">API</p>
                <p className="font-mono text-xs font-medium text-nn-800">REST / GQL</p>
              </div>
              <Arrow />
              {/* Frontend */}
              <div className="border-2 border-[#3354FF] rounded-lg px-4 py-3 text-center bg-[#3354FF]/10 min-w-[100px]">
                <p className="font-mono text-[10px] text-[#3354FF] mb-1">UI</p>
                <p className="font-mono text-xs font-medium text-nn-800">Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 11. TECHNOLOGY STACK ── */}
      <Section section="ARCHITECTURE" subsection="TECH STACK" page="11/16">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ STACK</p>
          <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] text-nn-900 mb-10">
            TECHNOLOGY<br/>STACK
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "FRONT-END", items: ["Next.js / React", "TypeScript", "Tailwind CSS", "Recharts / D3"] },
              { title: "AI SERVICES", items: ["OpenAI GPT-4", "Azure Document Intelligence", "Custom classification models", "LangChain orchestration"] },
              { title: "BACK-END", items: ["Node.js / NestJS", "GraphQL + REST", "Bull queues", "Redis caching"] },
              { title: "DATA", items: ["PostgreSQL", "Prisma ORM", "TimescaleDB (analytics)", "S3 document storage"] },
              { title: "AUTH & SECURITY", items: ["Azure AD / SSO", "RBAC per tenant", "Encrypted at rest", "Audit logging"] },
              { title: "INFRASTRUCTURE", items: ["Azure Cloud", "Docker / K8s", "CI/CD (GitHub Actions)", "Monitoring (Datadog)"] },
            ].map((s) => (
              <div key={s.title} className="border border-nn-100 rounded-xl p-5">
                <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-[#3354FF] mb-4">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm text-nn-600 flex gap-2">
                      <span className="text-nn-300 shrink-0">—</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 12. AI PIPELINE ── */}
      <Section section="ARCHITECTURE" subsection="AI PIPELINE" page="12/16">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ AI</p>
          <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] text-nn-900 mb-10">
            AI PIPELINE
          </h2>

          {/* Pipeline 1: Tickets */}
          <div className="mb-10">
            <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-nn-900 mb-4">
              PIPELINE 1 — TICKET ANALYSIS
            </h3>
            <div className="flex flex-wrap items-center gap-1 overflow-x-auto pb-2">
              <PipeStep label="INGEST" detail="SAP Concur tickets" />
              <Arrow />
              <PipeStep label="EXTRACT" detail="Parse fields & metadata" />
              <Arrow />
              <PipeStep label="CLASSIFY" detail="GPT-4 categorization" />
              <Arrow />
              <PipeStep label="SCORE" detail="Risk assessment" />
              <Arrow />
              <PipeStep label="OUTPUT" detail="Dashboard + alerts" color="bg-[#3354FF]/10 border-[#3354FF]/30" />
            </div>
          </div>

          {/* Pipeline 2: Photos */}
          <div>
            <h3 className="font-mono uppercase tracking-[0.08em] text-[11px] text-nn-900 mb-4">
              PIPELINE 2 — RECEIPT PHOTOS
            </h3>
            <div className="flex flex-wrap items-center gap-1 overflow-x-auto pb-2">
              <PipeStep label="CAPTURE" detail="Receipt images" />
              <Arrow />
              <PipeStep label="OCR" detail="Azure Doc Intelligence" />
              <Arrow />
              <PipeStep label="VALIDATE" detail="Cross-reference ticket" />
              <Arrow />
              <PipeStep label="DETECT" detail="Anomaly flagging" />
              <Arrow />
              <PipeStep label="STORE" detail="Evidence archive" color="bg-[#3354FF]/10 border-[#3354FF]/30" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── 13. ROADMAP (divider) ── */}
      <Divider title="ROADMAP &amp; DELIVERABLES" subtitle="PLAN DE PROYECTO" />

      {/* ── 14. DESIGN PHASES ── */}
      <Section section="ROADMAP" subsection="FASES" page="14/16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ PHASES</p>
            <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] text-nn-900 mb-10">
              DESIGN<br/>PHASES
            </h2>
            <div className="space-y-5">
              {[
                { n: "01", title: "Discovery & Requirements", desc: "Análisis de procesos actuales, entrevistas con stakeholders, definición de alcance." },
                { n: "02", title: "UX/UI Design", desc: "Wireframes, diseño de interfaz, prototipado interactivo y validación con usuarios." },
                { n: "03", title: "Core Platform", desc: "Desarrollo del backend, integración SAP Concur, motor de reglas básico." },
                { n: "04", title: "AI Integration", desc: "Implementación de pipelines de IA, modelos de clasificación y OCR." },
                { n: "05", title: "Dashboard & Reporting", desc: "Interfaz de monitorización, KPIs, sistema de alertas y exportación." },
                { n: "06", title: "UAT & Launch", desc: "Testing con usuarios finales, ajustes, deployment y formación del equipo." },
              ].map((ph) => (
                <div key={ph.n} className="flex gap-4">
                  <span className="font-mono text-[#3354FF] text-lg font-[300] shrink-0 w-8">{ph.n}</span>
                  <div>
                    <h3 className="font-mono uppercase tracking-[0.06em] text-[11px] text-nn-900 mb-1">{ph.title}</h3>
                    <p className="text-sm text-nn-500 leading-relaxed">{ph.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative UI collage placeholder */}
          <div className="bg-nn-50 rounded-2xl aspect-square flex items-center justify-center border border-nn-100">
            <div className="space-y-3 p-6 w-full">
              {[72, 55, 88, 40, 65].map((w, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full" style={{ background: i < 2 ? "#3354FF" : "#D5D9E0" }} />
                  <div className="h-2 rounded-full bg-nn-100" style={{ width: `${w}%` }} />
                </div>
              ))}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-nn-100 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm" style={{ background: i <= 2 ? "#3354FF20" : "#EBEDF1" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 15. HOW WE WORK (Scrum) ── */}
      <section className="min-h-screen flex flex-col bg-[#2d2d35] text-white" style={{ scrollSnapAlign: "start" }}>
        <div className="flex items-center justify-between px-6 md:px-10 py-3 border-b border-white/10">
          <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-white/40">/ METHODOLOGY&nbsp;&nbsp;SCRUM</span>
          <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-white/30">TAILOR HUB</span>
        </div>
        <div className="flex-1 px-6 md:px-10 lg:px-20 py-10 md:py-16">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-[#3354FF] mb-4">/ AGILE</p>
            <h2 className="font-[300] text-[clamp(26px,4vw,44px)] tracking-tight leading-[1.1] mb-6">
              SCRUM: MONTHLY<br/>SPRINT CYCLE
            </h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-xl mb-12">
              Trabajamos en sprints de 2 semanas con entregas incrementales. Cada ciclo mensual incluye planificación, ejecución, revisión y retrospectiva con el cliente.
            </p>

            {/* Sprint cycle diagram */}
            <div className="flex justify-center mb-12">
              <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border border-white/10" />
                {/* Middle circle */}
                <div className="absolute inset-8 md:inset-10 rounded-full border border-white/10" />
                {/* Inner circle */}
                <div className="absolute inset-16 md:inset-20 rounded-full border border-[#3354FF]/40 bg-[#3354FF]/10 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#3354FF] uppercase tracking-wider">Sprint</span>
                </div>
                {/* Labels around */}
                {[
                  { label: "PLANNING", angle: -90 },
                  { label: "DAILY", angle: -30 },
                  { label: "REVIEW", angle: 30 },
                  { label: "RETRO", angle: 90 },
                  { label: "CLIENT", angle: 150 },
                  { label: "DEPLOY", angle: 210 },
                ].map((item) => {
                  const r = 155;
                  const rad = (item.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  return (
                    <div
                      key={item.label}
                      className="absolute font-mono text-[9px] tracking-[0.08em] text-white/50 whitespace-nowrap"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {item.label}
                    </div>
                  );
                })}
                {/* Dots on circle */}
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const r = 140;
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  return (
                    <div
                      key={angle}
                      className="absolute w-2 h-2 rounded-full bg-[#3354FF]"
                      style={{
                        left: `calc(50% + ${x}px - 4px)`,
                        top: `calc(50% + ${y}px - 4px)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Ceremonies */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Sprint Planning", desc: "Definición de objetivos y priorización del backlog con el equipo." },
                { title: "Daily Standup", desc: "Sincronización diaria de 15 min sobre progreso y bloqueos." },
                { title: "Sprint Review", desc: "Demo de funcionalidades al cliente con feedback directo." },
                { title: "Retrospective", desc: "Mejora continua del proceso y lecciones aprendidas." },
                { title: "Client Sync", desc: "Reunión semanal con stakeholders para alinear prioridades." },
                { title: "Deployment", desc: "Release al entorno de staging/producción tras cada sprint." },
              ].map((c) => (
                <div key={c.title} className="border border-white/10 rounded-lg p-4">
                  <h3 className="font-mono uppercase tracking-[0.06em] text-[10px] text-[#3354FF] mb-2">{c.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 md:px-10 py-3 border-t border-white/10">
          <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-white/30">© TAILOR HUB 2024</span>
          <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-white/30">15/16 — NOVO NORDISK</span>
        </div>
      </section>

      {/* ── 16. CTA ── */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-navy text-white relative" style={{ scrollSnapAlign: "start" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-[#3354FF]/10" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#3354FF]/5" />
        </div>
        <div className="z-10 text-center px-6 max-w-2xl">
          <p className="font-mono uppercase tracking-[0.2em] text-[10px] text-white/40 mb-6">/ NEXT STEPS</p>
          <h2 className="font-[300] text-[clamp(32px,6vw,64px)] tracking-tight leading-[1] mb-8">
            ¿LISTOS PARA<br/>EMPEZAR?
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mb-12">
            Hemos preparado un prototipo interactivo de la plataforma para que puedas explorar la experiencia de usuario propuesta. Haz click para iniciar la demo.
          </p>
          <a
            href="../"
            className="inline-flex items-center gap-3 bg-[#3354FF] hover:bg-[#2a45d4] text-white px-10 py-4 rounded-full font-mono uppercase tracking-[0.12em] text-sm transition-all hover:scale-105 active:scale-95"
          >
            INICIAR PROTOTIPO
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <div className="mt-16">
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4" />
            <p className="font-mono uppercase tracking-[0.12em] text-[10px] text-white/30">
              © TAILOR HUB 2024 — CONFIDENCIAL
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
