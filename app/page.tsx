"use client";
import { useState, useEffect, useCallback } from "react";

/* ─── Types ─── */
type Screen = "dashboard" | "loading" | "evidences" | "ticket";
type MobileTab = "home" | "inbox" | "search" | "settings";

/* ─── SVG Icons ─── */
const I = {
  home: (a?: boolean) => <svg width="22" height="22" fill={a ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 0 : 1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>,
  search: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  inbox: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>,
  doc: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  settings: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  sparkle: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  alert: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>,
  check: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
  back: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>,
  wine: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h8l-1 7a5 5 0 01-3 4.5M10 2l1 7a5 5 0 003 4.5M12 13.5V20m-3 0h6M7 2h10"/></svg>,
  chevron: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
};

/* ─── Data ─── */
const tableRows = [
  { id: "TASK-8782", type: "Photo", project: "Ozempic E...", title: "People standing around a table", status: "In Progress", sColor: "sea", priority: "Medium", arrow: "→" },
  { id: "TASK-7878", type: "Photo", project: "Ozempic E...", title: "People standing around a table", status: "Backlog", sColor: "nn", priority: "Medium", arrow: "→" },
  { id: "TASK-7839", type: "Ticket", project: "Ozempic E...", title: "Dinner ticket", status: "Todo", sColor: "nn", priority: "High", arrow: "↑" },
  { id: "TASK-5562", type: "Photo", project: "Ozempic L...", title: "Speaker during conference", status: "Backlog", sColor: "nn", priority: "Medium", arrow: "→" },
  { id: "TASK-8686", type: "Ticket", project: "Ozempic L...", title: "Breakfast ticket", status: "Cancelled", sColor: "danger", priority: "Medium", arrow: "→" },
  { id: "TASK-1280", type: "Ticket", project: "Ozempic E...", title: "Hotel bill", status: "Done", sColor: "ocean", priority: "High", arrow: "↑" },
  { id: "TASK-7262", type: "Photo", project: "Ozempic E...", title: "People having lunch", status: "Done", sColor: "ocean", priority: "High", arrow: "↑" },
  { id: "TASK-1138", type: "Photo", project: "Ozempic E...", title: "Coffee break during an event", status: "In Progress", sColor: "sea", priority: "Medium", arrow: "→" },
  { id: "TASK-7184", type: "Photo", project: "Ozempic L...", title: "Round table in an event", status: "Todo", sColor: "nn", priority: "Low", arrow: "↓" },
  { id: "TASK-5160", type: "Photo", project: "Ozempic E...", title: "Coffee break in an event", status: "In Progress", sColor: "sea", priority: "High", arrow: "↑" },
];

const evidences = [
  { id: 1, type: "Photo", title: "Group photo at restaurant entrance", status: "ok", confidence: 94 },
  { id: 2, type: "Ticket", title: "Dinner receipt — Restaurant El Celler", status: "ok", confidence: 97 },
  { id: 3, type: "Ticket", title: "Dinner receipt — Wine & spirits detected", status: "alert", confidence: 99, alertType: "Alcohol detected" },
  { id: 4, type: "Photo", title: "Speaker presentation setup", status: "ok", confidence: 91 },
  { id: 5, type: "Photo", title: "Attendees at round table discussion", status: "ok", confidence: 88 },
];

const loadingSteps = ["Connecting to SAP Concur...", "Fetching expense tickets...", "Analyzing images with Azure Vision...", "Running Document Intelligence...", "Applying compliance rules..."];
const statusDotCls: Record<string, string> = { sea: "bg-sea-600", nn: "bg-nn-400", danger: "bg-danger-600", ocean: "bg-ocean-600" };

/* ─── Main ─── */
export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [mobileTab, setMobileTab] = useState<MobileTab>("home");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [hoveredAlert, setHoveredAlert] = useState(false);
  const [agentTriggered, setAgentTriggered] = useState(false);

  useEffect(() => {
    if (screen !== "loading") return;
    setLoadingStep(0); setLoadingDone(false);
    const t: NodeJS.Timeout[] = [];
    loadingSteps.forEach((_, i) => t.push(setTimeout(() => setLoadingStep(i + 1), (i + 1) * 800)));
    t.push(setTimeout(() => setLoadingDone(true), loadingSteps.length * 800 + 600));
    t.push(setTimeout(() => setScreen("evidences"), loadingSteps.length * 800 + 1800));
    return () => t.forEach(clearTimeout);
  }, [screen]);

  const startReview = useCallback(() => { setScreen("loading"); setSelectedPanel("william"); setMobileTab("home"); }, []);
  const backToDash = useCallback(() => { setScreen("dashboard"); setAlertVisible(true); }, []);
  const inSubFlow = screen !== "dashboard";

  /* ═══ DESKTOP SIDEBAR ═══ */
  const Sidebar = () => (
    <div className="hidden lg:flex w-[52px] h-screen bg-navy flex-col items-center py-4 gap-0.5 flex-shrink-0">
      <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center mb-6"><span className="text-white text-[10px] font-bold tracking-tight">NV</span></div>
      <SbIcon icon={I.home(true)} active /><SbIcon icon={I.search} /><SbIcon icon={I.inbox} badge={alertVisible ? 1 : 0} /><SbIcon icon={I.doc} />
      <div className="flex-1" /><SbIcon icon={I.settings} /><SbIcon icon={I.sparkle} />
    </div>
  );
  const SbIcon = ({ icon, active, badge }: { icon: React.ReactNode; active?: boolean; badge?: number }) => (
    <button className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${active ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}>
      {icon}{badge ? <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-danger-700 text-white text-[8px] font-bold rounded-full flex items-center justify-center" style={{ animation: "fadeIn .3s ease" }}>{badge}</span> : null}
    </button>
  );

  /* ═══ MOBILE BOTTOM NAV ═══ */
  const BottomNav = () => (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-nn-100 ${inSubFlow ? "hidden" : ""}`}>
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] h-14">
        {([
          { key: "home" as MobileTab, icon: I.home(mobileTab === "home"), label: "Home" },
          { key: "inbox" as MobileTab, icon: I.inbox, label: "Inbox", badge: alertVisible ? 1 : 0 },
          { key: "search" as MobileTab, icon: I.search, label: "Search" },
          { key: "settings" as MobileTab, icon: I.settings, label: "Settings" },
        ]).map((tab) => (
          <button key={tab.key} onClick={() => { setMobileTab(tab.key); if (tab.key === "home") setScreen("dashboard"); }}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-colors relative ${mobileTab === tab.key ? "text-sea-900" : "text-nn-400"}`}>
            {tab.icon}<span className="text-[10px] font-medium">{tab.label}</span>
            {tab.badge ? <span className="absolute top-0.5 right-3 w-4 h-4 bg-danger-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{tab.badge}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );

  /* ═══ DESKTOP LEFT PANEL ═══ */
  const LeftPanel = () => (
    <div className="hidden lg:flex w-[264px] h-screen border-r border-nn-100 bg-white flex-col flex-shrink-0">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[13px] text-nn-900">New Evidences</h2>
          <div className="flex items-center gap-1.5"><span className="text-[11px] text-nn-500">Unreviewed</span><div className="w-8 h-[18px] bg-sea-900 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute right-[3px] top-[3px]" /></div></div>
        </div>
        <input type="text" placeholder="Type to search" className="w-full px-2.5 py-1.5 text-[12px] border border-nn-200 rounded-lg bg-nn-50 outline-none focus:border-sea-500 transition-colors text-nn-700 placeholder:text-nn-400" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <PanelItem name="William Smith" project="Ozempic Launch London" time="09:34 AM" selected={selectedPanel === "william"} onClick={startReview} />
        <PanelItem name="Rosa Claramunt" project="Ozempic Event Madrid" time="09:34 AM" />
      </div>
    </div>
  );
  const PanelItem = ({ name, project, time, selected, onClick }: { name: string; project: string; time: string; selected?: boolean; onClick?: () => void }) => (
    <button onClick={onClick} className={`w-full text-left px-4 py-3 border-b border-nn-100 transition-colors ${selected ? "bg-sea-50 border-l-2 border-l-sea-900" : "hover:bg-nn-50 active:bg-nn-100"}`}>
      <div className="flex items-center justify-between mb-0.5"><span className="text-[13px] font-medium text-nn-900">{name}</span><span className="text-[11px] text-nn-400">{time}</span></div>
      <div className="text-[12px] text-nn-700">{project}</div><div className="text-[11px] text-nn-400 mt-0.5">5 evidences in queue</div>
    </button>
  );

  /* ═══ MOBILE HEADER ═══ */
  const MobileHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-nn-100 px-4 flex items-center gap-3 h-12">
      <button onClick={onBack} className="w-9 h-9 flex items-center justify-center -ml-1 text-nn-700 active:bg-nn-100 rounded-xl transition-colors">{I.back}</button>
      <span className="text-[14px] font-semibold text-navy truncate">{title}</span>
    </div>
  );

  /* ═══ MOBILE INBOX ═══ */
  const MobileInbox = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50 pb-20" style={{ animation: "fadeIn .2s ease" }}>
      <div className="bg-white px-4 pt-5 pb-3 border-b border-nn-100">
        <h1 className="text-[20px] font-bold text-navy mb-1">New Evidences</h1>
        <div className="flex items-center gap-2 mb-3"><span className="text-[12px] text-nn-500">Unreviewed</span><div className="w-8 h-[18px] bg-sea-900 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-[3px] top-[3px]" /></div></div>
        <input type="text" placeholder="Search evidences..." className="w-full px-3 py-2.5 text-[14px] border border-nn-200 rounded-xl bg-nn-50 outline-none focus:border-sea-500 transition-colors text-nn-700 placeholder:text-nn-400" />
      </div>
      <div className="p-4 space-y-2">
        {[{ name: "William Smith", project: "Ozempic Launch London", time: "09:34 AM", action: startReview }, { name: "Rosa Claramunt", project: "Ozempic Event Madrid", time: "09:34 AM" }].map((item) => (
          <button key={item.name} onClick={item.action} className="w-full text-left bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)] active:bg-nn-50 transition-colors">
            <div className="flex items-center justify-between mb-1"><span className="text-[14px] font-semibold text-nn-900">{item.name}</span><span className="text-[12px] text-nn-400">{item.time}</span></div>
            <div className="text-[13px] text-nn-700">{item.project}</div>
            <div className="flex items-center justify-between mt-2"><span className="text-[12px] text-nn-400">5 evidences in queue</span><span className="text-nn-400">{I.chevron}</span></div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ═══ DASHBOARD ═══ */
  const Dashboard = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50 px-4 pt-5 pb-20 lg:p-6 lg:pb-6" style={{ animation: "fadeIn .2s ease" }}>
      <div className="lg:max-w-[1080px]">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center"><span className="text-white text-[10px] font-bold">NV</span></div>
          <h1 className="text-[18px] font-bold text-navy">NovoVision</h1>
          <div className="w-8 h-8 rounded-full bg-sea-100 flex items-center justify-center text-sea-900 text-[11px] font-bold">WS</div>
        </div>
        <h1 className="hidden lg:block text-[22px] font-bold text-navy mb-0.5">Welcome back!</h1>
        <p className="hidden lg:block text-nn-500 text-[13px] mb-6">Have an overview of current operation</p>
        <div className="lg:hidden mb-4"><p className="text-[14px] text-nn-500">Welcome back, <span className="font-semibold text-navy">William</span></p></div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3 mb-5 lg:mb-6">
          <div className="bg-white rounded-xl p-3.5 lg:p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)]">
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">New evidences</span><span className="text-danger-700 text-[10px] lg:text-[11px] font-medium">↘ -20%</span></div>
            <div className="text-[24px] lg:text-[28px] font-bold text-navy leading-tight mb-0.5">{alertVisible ? 11 : 10}</div>
            <p className="text-[10px] lg:text-[11px] text-nn-500 mb-2 lg:mb-3">Acquisition needs attention</p>
            <button onClick={startReview} className="px-3 lg:px-3.5 py-1.5 bg-sea-900 text-white text-[11px] font-medium rounded-full active:bg-sea-800 hover:bg-sea-800 transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-white/60 rounded-full" /> Review now</button>
          </div>
          <div className="bg-white rounded-xl p-3.5 lg:p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)]">
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">Active projects</span><span className="text-ocean-700 text-[10px] lg:text-[11px] font-medium">↗ +12.5%</span></div>
            <div className="text-[24px] lg:text-[28px] font-bold text-navy leading-tight mb-0.5">32</div>
            <p className="text-[10px] lg:text-[11px] text-nn-500">High activity this month</p>
          </div>
          <div className="bg-white rounded-xl p-3.5 lg:p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)]">
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">Evidences received</span><span className="text-danger-700 text-[10px] lg:text-[11px] font-medium">↘ -20%</span></div>
            <div className="text-[24px] lg:text-[28px] font-bold text-navy leading-tight mb-0.5">178<span className="text-nn-300 font-normal">/240</span></div>
            <p className="text-[10px] lg:text-[11px] text-nn-500">Down 20% this period</p>
          </div>
          <div className={`bg-white rounded-xl p-3.5 lg:p-4 relative overflow-hidden ${alertVisible ? "shadow-[0_1px_6px_rgba(219,58,31,0.1)]" : "shadow-[0_1px_3px_rgba(0,25,101,0.04)]"}`}>
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">Alerts</span><span className="text-ocean-700 text-[10px] lg:text-[11px] font-medium">↗ +4.5%</span></div>
            <div className={`text-[24px] lg:text-[28px] font-bold leading-tight mb-0.5 ${alertVisible ? "text-danger-700" : "text-navy"}`}>{alertVisible ? 1 : 0}</div>
            <p className="text-[10px] lg:text-[11px] text-nn-500">{alertVisible ? "1 evidence needs review" : "No alerts"}</p>
            {alertVisible && <div className="absolute top-0 left-0 w-full h-[2px] bg-danger-700" style={{ animation: "fadeIn .4s ease" }} />}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex gap-4 lg:gap-5">
            <button className="pb-2 text-[13px] font-semibold text-navy border-b-2 border-navy">Evidences</button>
            <button className="pb-2 text-[13px] text-nn-400">Projects <span className="ml-1 text-[10px] bg-nn-100 text-nn-500 px-1.5 py-0.5 rounded-full">3</span></button>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <button className="px-2.5 py-1 text-[11px] border border-nn-200 rounded-lg text-nn-600 hover:bg-nn-50 transition-colors">Customize Columns</button>
            <button className="px-2.5 py-1 text-[11px] border border-nn-200 rounded-lg text-nn-600 hover:bg-nn-50 transition-colors">+ Add columns</button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mb-3"><input type="text" placeholder="Filter tasks..." className="w-full px-3 py-2.5 text-[14px] border border-nn-200 rounded-xl bg-white outline-none focus:border-sea-500 transition-colors text-nn-700 placeholder:text-nn-400" /></div>
        {/* Desktop filters */}
        <div className="hidden lg:flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Filter tasks..." className="px-2.5 py-1.5 text-[12px] border border-nn-200 rounded-lg w-44 outline-none focus:border-sea-500 transition-colors text-nn-700 placeholder:text-nn-400" />
            <button className="px-2.5 py-1.5 text-[11px] border border-nn-200 rounded-lg text-nn-500 hover:bg-nn-50 transition-colors">⊕ Status</button>
            <button className="px-2.5 py-1.5 text-[11px] border border-nn-200 rounded-lg text-nn-500 hover:bg-nn-50 transition-colors">⊕ Priority</button>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1.5 text-[11px] border border-nn-200 rounded-lg text-nn-500 hover:bg-nn-50 transition-colors">View</button>
            <button className="px-3 py-1.5 text-[11px] bg-sea-900 text-white rounded-lg hover:bg-sea-800 font-medium transition-colors">Add Task</button>
          </div>
        </div>

        {/* MOBILE: card list */}
        <div className="lg:hidden space-y-2">
          {alertVisible && (
            <button onClick={() => setScreen("ticket")} className="w-full text-left bg-danger-50 rounded-xl p-3.5 ring-1 ring-danger-200 active:bg-danger-100 transition-colors" style={{ animation: "slideUp .35s ease" }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-danger-600" /><span className="font-mono text-[11px] text-danger-800">TASK-9201</span></div>
                <span className="px-1.5 py-0.5 bg-danger-700 text-white text-[9px] font-bold rounded flex items-center gap-0.5">{I.alert} ALCOHOL</span>
              </div>
              <p className="text-[13px] font-medium text-danger-800 mb-1">Wine & spirits detected</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-danger-100 text-danger-800 text-[10px] font-medium rounded">Ticket</span><span className="text-[11px] text-danger-700 font-medium">↑ Critical</span></div>
                <span className="text-[11px] text-sea-900 font-medium flex items-center gap-1">{I.sparkle} Solve with Agent</span>
              </div>
            </button>
          )}
          {tableRows.slice(0, 6).map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,25,101,0.04)]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${statusDotCls[r.sColor]}`} /><span className="font-mono text-[11px] text-nn-500">{r.id}</span></div>
                <span className="text-[10px] text-nn-500">{r.arrow} {r.priority}</span>
              </div>
              <p className="text-[13px] font-medium text-nn-800 mb-1.5">{r.title}</p>
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${r.type === "Photo" ? "bg-nn-100 text-nn-600" : "bg-sea-50 text-sea-900"}`}>{r.type}</span>
                <span className="px-1.5 py-0.5 bg-nn-100 text-nn-500 text-[10px] font-medium rounded">{r.project}</span>
                <span className="text-[11px] text-nn-500 ml-auto">{r.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: table */}
        <div className="hidden lg:block bg-white rounded-xl shadow-[0_1px_3px_rgba(0,25,101,0.04)] overflow-hidden">
          <div className="grid grid-cols-[36px_110px_1fr_110px_90px_32px] px-4 py-2 border-b border-nn-100 text-[11px] text-nn-500 font-medium uppercase tracking-wider"><div /><div>Task</div><div>Title</div><div>Status</div><div>Priority</div><div /></div>
          {alertVisible && (
            <div className="grid grid-cols-[36px_110px_1fr_110px_90px_32px] px-4 py-2.5 border-b border-danger-200 bg-danger-50 items-center text-[13px] relative group cursor-pointer" onMouseEnter={() => setHoveredAlert(true)} onMouseLeave={() => setHoveredAlert(false)} style={{ animation: "slideUp .35s ease" }}>
              <div><input type="checkbox" className="rounded border-nn-300 accent-sea-900" /></div>
              <div className="font-mono text-[11px] text-danger-800">TASK-9201</div>
              <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-danger-100 text-danger-800 text-[10px] font-medium rounded">Ticket</span><span className="px-1.5 py-0.5 bg-danger-100 text-danger-800 text-[10px] font-medium rounded">Ozempic L...</span><span className="text-danger-800 font-medium text-[12px]">Wine & spirits detected</span><span className="ml-0.5 px-1.5 py-0.5 bg-danger-700 text-white text-[9px] font-bold rounded flex items-center gap-0.5">{I.alert} ALCOHOL</span></div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-danger-600" /><span className="text-danger-700 text-[11px] font-medium">Alert</span></div>
              <div className="text-danger-700 text-[11px] font-medium">↑ Critical</div>
              <div className="text-nn-400 text-[12px]">···</div>
              {hoveredAlert && <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-navy text-white rounded-lg shadow-xl px-3 py-2" style={{ animation: "fadeIn .12s ease" }}><button onClick={() => setScreen("ticket")} className="text-[11px] font-medium whitespace-nowrap hover:text-sea-300 transition-colors flex items-center gap-1.5">{I.sparkle} Solve with NovoVision Agent</button></div>}
            </div>
          )}
          {tableRows.map((r) => (
            <div key={r.id} className="grid grid-cols-[36px_110px_1fr_110px_90px_32px] px-4 py-2.5 border-b border-nn-50 items-center text-[13px] hover:bg-nn-50/60 transition-colors">
              <div><input type="checkbox" className="rounded border-nn-300 accent-sea-900" /></div>
              <div className="font-mono text-[11px] text-nn-500">{r.id}</div>
              <div className="flex items-center gap-1.5"><span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${r.type === "Photo" ? "bg-nn-100 text-nn-600" : "bg-sea-50 text-sea-900"}`}>{r.type}</span><span className="px-1.5 py-0.5 bg-nn-100 text-nn-500 text-[10px] font-medium rounded">{r.project}</span><span className="text-nn-800 text-[12px]">{r.title}</span></div>
              <div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${statusDotCls[r.sColor]}`} /><span className="text-[11px] text-nn-600">{r.status}</span></div>
              <div className="text-[11px] text-nn-600">{r.arrow} {r.priority}</div>
              <div className="text-nn-400 text-[12px] cursor-pointer hover:text-nn-600">···</div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex items-center justify-between mt-3 text-[11px] text-nn-500">
          <span>0 of 100 row(s) selected.</span>
          <div className="flex items-center gap-3"><span>Rows per page</span><select className="border border-nn-200 rounded-md px-1.5 py-0.5 text-[11px] bg-white"><option>10</option></select><span>Page 1 of 4</span>
            <div className="flex gap-0.5">{["«","‹","›","»"].map((c) => <button key={c} className="w-6 h-6 border border-nn-200 rounded-md flex items-center justify-center hover:bg-nn-50 transition-colors text-nn-500">{c}</button>)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══ LOADING ═══ */
  const LoadingScreen = () => (
    <div className="flex-1 h-full flex items-center justify-center bg-nn-50 px-5" style={{ animation: "fadeIn .2s ease" }}>
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,25,101,0.08)] p-5 lg:p-7">
          <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-sea-50 rounded-xl flex items-center justify-center text-sea-900">{I.sparkle}</div><div><h2 className="font-semibold text-[15px] text-navy">Reviewing Evidences</h2><p className="text-[11px] text-nn-500">Ozempic Launch London — W. Smith</p></div></div>
          <div className="space-y-2.5 mb-5">
            {loadingSteps.map((step, i) => { const done = loadingStep > i, active = loadingStep === i; return (
              <div key={i} className="flex items-center gap-2.5" style={{ animation: `slideUp .25s ease ${i * 0.08}s both` }}>
                {done ? <div className="w-5 h-5 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .25s ease" }}>{I.check}</div>
                  : active ? <div className="w-5 h-5 border-[1.5px] border-sea-900 border-t-transparent rounded-full" style={{ animation: "spin .7s linear infinite" }} />
                  : <div className="w-5 h-5 border-[1.5px] border-nn-200 rounded-full" />}
                <span className={`text-[12px] ${done ? "text-nn-700" : active ? "text-sea-900 font-medium" : "text-nn-300"}`}>{step}</span>
              </div>); })}
          </div>
          <div className="h-1 bg-nn-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${(loadingStep / loadingSteps.length) * 100}%`, background: loadingDone ? "#419792" : "#005AD2" }} /></div>
          {loadingDone && <div className="mt-3 flex items-center gap-2 text-[12px] text-ocean-800 font-medium" style={{ animation: "fadeIn .25s ease" }}><div className="w-4 h-4 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .3s ease" }}>{I.check}</div>5 evidences processed — 1 alert found</div>}
        </div>
      </div>
    </div>
  );

  /* ═══ EVIDENCE LIST ═══ */
  const EvidenceList = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50" style={{ animation: "fadeIn .2s ease" }}>
      <MobileHeader title="Evidence Review" onBack={backToDash} />
      <div className="px-4 pt-4 lg:pt-6 lg:px-6 pb-6 lg:max-w-[760px] lg:mx-auto">
        <button onClick={backToDash} className="hidden lg:flex items-center gap-1.5 text-[12px] text-nn-500 hover:text-navy mb-4 transition-colors">{I.back} Back to Dashboard</button>
        <div className="flex items-center justify-between mb-4 lg:mb-5">
          <div><h1 className="hidden lg:block text-[18px] font-bold text-navy">Evidence Review</h1><p className="text-[12px] text-nn-500 mt-0.5">Ozempic Launch London — W. Smith — 5 evidences</p></div>
          <div className="flex items-center gap-1.5 lg:gap-2"><span className="px-2 py-0.5 lg:py-1 bg-ocean-50 text-ocean-800 text-[11px] font-medium rounded-full">4 Clear</span><span className="px-2 py-0.5 lg:py-1 bg-danger-50 text-danger-700 text-[11px] font-medium rounded-full flex items-center gap-1">{I.alert} 1 Alert</span></div>
        </div>
        <div className="space-y-2">
          {evidences.map((ev, i) => (
            <div key={ev.id} className={`bg-white rounded-xl p-3 lg:p-3.5 transition-all ${ev.status === "alert" ? "shadow-[0_2px_12px_rgba(219,58,31,0.08)] ring-1 ring-danger-200" : "shadow-[0_1px_3px_rgba(0,25,101,0.04)]"}`} style={{ animation: `slideUp .3s ease ${i * 0.06}s both` }}>
              <div className="flex items-start gap-2.5">
                {ev.status === "ok" ? <div className="w-7 h-7 bg-ocean-50 rounded-lg flex items-center justify-center text-ocean-700 flex-shrink-0 mt-0.5">{I.check}</div>
                  : <div className="w-7 h-7 bg-danger-50 rounded-lg flex items-center justify-center text-danger-700 flex-shrink-0 mt-0.5" style={{ animation: "pulse 2s infinite" }}>{I.alert}</div>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${ev.type === "Photo" ? "bg-nn-100 text-nn-600" : "bg-sea-50 text-sea-900"}`}>{ev.type}</span>
                    {ev.status === "alert" && <span className="px-1.5 py-0.5 bg-danger-700 text-white text-[9px] font-bold rounded flex items-center gap-0.5">{I.alert} ALCOHOL</span>}
                  </div>
                  <p className="text-[12px] font-medium text-nn-900 mb-1 leading-snug">{ev.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-nn-400 flex items-center gap-2">AI: {ev.confidence}%<span className="inline-block w-10 h-[3px] bg-nn-100 rounded-full overflow-hidden align-middle"><span className={`block h-full rounded-full ${ev.confidence > 95 ? "bg-ocean-600" : ev.confidence > 90 ? "bg-sea-600" : "bg-nn-400"}`} style={{ width: `${ev.confidence}%` }} /></span></div>
                    {ev.status === "alert" ? <button onClick={() => setScreen("ticket")} className="px-3 py-1.5 lg:px-3.5 lg:py-2 bg-danger-700 text-white text-[11px] lg:text-[12px] font-medium rounded-lg active:bg-danger-800 hover:bg-danger-800 transition-colors flex items-center gap-1">{I.alert} Review</button>
                      : <span className="px-2 py-0.5 text-[10px] lg:text-[11px] text-ocean-700 bg-ocean-50 rounded-lg font-medium">Passed</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ═══ TICKET DETAIL ═══ */
  const TicketDetail = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50" style={{ animation: "fadeIn .2s ease" }}>
      <MobileHeader title="Compliance Alert" onBack={() => setScreen("evidences")} />
      <div className="px-4 pt-4 lg:pt-6 lg:px-6 pb-8 lg:max-w-[880px] lg:mx-auto">
        <button onClick={() => setScreen("evidences")} className="hidden lg:flex items-center gap-1.5 text-[12px] text-nn-500 hover:text-navy mb-4 transition-colors">{I.back} Back to Evidence List</button>
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4 lg:gap-5">
          {/* Ticket */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,25,101,0.06)] overflow-hidden">
            <div className="bg-danger-700 text-white px-4 lg:px-5 py-2.5 flex items-center gap-2">{I.alert}<span className="font-medium text-[12px]">Alcohol detected in expense ticket</span></div>
            <div className="p-4 lg:p-6">
              <div className="bg-nn-50 rounded-xl border border-nn-100 p-4 lg:p-5 lg:max-w-[360px] lg:mx-auto font-mono text-[11px] lg:text-[12px]">
                <div className="text-center mb-3 pb-3 border-b border-dashed border-nn-300"><div className="font-bold text-[13px] lg:text-[14px] text-navy mb-0.5">RESTAURANTE EL CELLER</div><div className="text-[10px] text-nn-500">C/ Gran Vía 28, Madrid</div><div className="text-[10px] text-nn-500">NIF: B-12345678</div></div>
                <div className="text-[10px] text-nn-500 mb-3 space-y-0.5"><div>Fecha: 14/03/2025 — 21:32</div><div>Mesa: 12 — Camarero: Luis</div></div>
                <div className="space-y-1 mb-3 pb-3 border-b border-dashed border-nn-300 text-nn-800">
                  <div className="flex justify-between"><span>2x Entrante del día</span><span>24.00€</span></div>
                  <div className="flex justify-between"><span>3x Solomillo ibérico</span><span>87.00€</span></div>
                  <div className="flex justify-between"><span>2x Lubina al horno</span><span>52.00€</span></div>
                  <div className="flex justify-between"><span>1x Ensalada César</span><span>14.50€</span></div>
                  <div className="flex justify-between items-center bg-danger-50 -mx-2 px-2 py-1.5 rounded-lg ring-1 ring-danger-200"><div className="flex items-center gap-1.5"><span className="text-danger-700">{I.wine(14)}</span><span className="text-danger-800 font-bold text-[11px]">2x Rioja Reserva</span></div><span className="text-danger-800 font-bold">68.00€</span></div>
                  <div className="flex justify-between items-center bg-danger-50 -mx-2 px-2 py-1.5 rounded-lg ring-1 ring-danger-200"><div className="flex items-center gap-1.5"><span className="text-danger-700">{I.wine(14)}</span><span className="text-danger-800 font-bold text-[11px]">1x Copa Albariño</span></div><span className="text-danger-800 font-bold">12.00€</span></div>
                  <div className="flex justify-between"><span>5x Café</span><span>12.50€</span></div>
                  <div className="flex justify-between"><span>2x Postre</span><span>18.00€</span></div>
                </div>
                <div className="space-y-0.5 text-nn-600"><div className="flex justify-between text-[10px]"><span>Subtotal</span><span>288.00€</span></div><div className="flex justify-between text-[10px]"><span>IVA (10%)</span><span>28.80€</span></div><div className="flex justify-between font-bold text-[13px] lg:text-[14px] text-navy pt-1.5 border-t border-nn-300"><span>TOTAL</span><span>316.80€</span></div></div>
              </div>
            </div>
          </div>
          {/* Details + Actions */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,25,101,0.04)] p-4">
              <h3 className="font-semibold text-[12px] text-navy mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-danger-700" />Alert Details</h3>
              <div className="space-y-2.5 text-[12px]">
                <div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Rule violated</span><p className="font-medium text-danger-700">Alcohol in expense receipts</p></div>
                <div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Items detected</span><p className="font-medium text-nn-800">2x Rioja Reserva 2018 — 68.00€</p><p className="font-medium text-nn-800">1x Copa Albariño — 12.00€</p></div>
                <div className="flex items-center justify-between"><div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Total alcohol</span><p className="font-bold text-danger-700 text-[18px]">80.00€</p></div><div className="text-right"><span className="text-nn-400 text-[10px] uppercase tracking-wider">AI Confidence</span><p className="font-semibold text-nn-700 text-[14px]">99%</p></div></div>
                <div className="h-1.5 bg-nn-100 rounded-full overflow-hidden"><div className="h-full bg-danger-600 rounded-full" style={{ width: "99%" }} /></div>
                <div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Reference</span><p className="text-nn-700 text-[11px]">Farmaindustria Code — Art. 17.3</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,25,101,0.04)] p-4">
              <h3 className="font-semibold text-[12px] text-navy mb-3">Context</h3>
              <div className="space-y-2 text-[12px]">
                {([["Employee","William Smith"],["Project","Ozempic Launch London"],["Activity","Dinner with HCPs"],["Date","14 Mar 2025"],["Source","SAP Concur"]] as const).map(([k,v]) => <div key={k} className="flex justify-between"><span className="text-nn-500">{k}</span><span className="font-medium text-nn-800">{v}</span></div>)}
              </div>
            </div>
            <div className="space-y-2">
              {!agentTriggered ? <button onClick={() => setAgentTriggered(true)} className="w-full py-3 lg:py-2.5 bg-navy text-white rounded-xl font-medium text-[13px] lg:text-[12px] active:bg-navy/90 hover:bg-navy/90 transition-all shadow-[0_2px_8px_rgba(0,25,101,0.2)] flex items-center justify-center gap-2"><span className="text-sea-300">{I.sparkle}</span> Solve with NovoVision Agent</button>
                : <div className="w-full py-3 lg:py-2.5 bg-sea-50 border border-sea-200 text-sea-900 rounded-xl font-medium text-[13px] lg:text-[12px] text-center flex items-center justify-center gap-2" style={{ animation: "fadeIn .25s ease" }}><div className="w-3.5 h-3.5 border-[1.5px] border-sea-900 border-t-transparent rounded-full" style={{ animation: "spin .7s linear infinite" }} />NovoVision Agent processing...</div>}
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2.5 lg:py-2 border border-nn-200 rounded-xl text-[12px] text-nn-600 active:bg-nn-50 hover:bg-nn-50 transition-colors">Mark as Valid</button>
                <button className="py-2.5 lg:py-2 border border-danger-200 rounded-xl text-[12px] text-danger-700 active:bg-danger-50 hover:bg-danger-50 transition-colors">Mark Invalid</button>
              </div>
              <button className="w-full py-2.5 lg:py-2 border border-nn-200 rounded-xl text-[12px] text-nn-500 active:bg-nn-50 hover:bg-nn-50 transition-colors">Request more evidence</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══ RENDER ═══ */
  const renderContent = () => {
    if (screen === "loading") return <LoadingScreen />;
    if (screen === "evidences") return <EvidenceList />;
    if (screen === "ticket") return <TicketDetail />;
    if (mobileTab === "inbox" && !inSubFlow) return <MobileInbox />;
    return <Dashboard />;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {screen === "dashboard" && <LeftPanel />}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">{renderContent()}</div>
      <BottomNav />
    </div>
  );
}
