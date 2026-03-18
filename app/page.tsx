"use client";
import { useState, useEffect, useCallback } from "react";

/* ─── Types ─── */
type Screen = "dashboard" | "loading" | "evidences" | "ticket";

/* ─── Icon helpers (inline SVG to avoid deps) ─── */
const Icon = {
  home: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
    </svg>
  ),
  search: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  inbox: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
  doc: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  sparkle: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  alert: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  wine: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.5}>
      <path d="M8 2h8l-1 7a5 5 0 01-3 4.5M10 2l1 7a5 5 0 003 4.5M12 13.5V20m-3 0h6M7 2h10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  back: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  trend_down: <span className="text-red-500 text-xs font-medium flex items-center gap-0.5">↘ -20%</span>,
  trend_up_12: <span className="text-emerald-500 text-xs font-medium flex items-center gap-0.5">↗ +12.5%</span>,
  trend_down_20: <span className="text-red-500 text-xs font-medium flex items-center gap-0.5">↘ -20%</span>,
  trend_up_4: <span className="text-emerald-500 text-xs font-medium flex items-center gap-0.5">↗ +4.5%</span>,
};

/* ─── Data ─── */
const tableRows = [
  { id: "TASK-8782", type: "Photo", project: "Ozempic E...", title: "People standing around a table", status: "In Progress", statusColor: "blue", priority: "Medium", arrow: "→" },
  { id: "TASK-7878", type: "Photo", project: "Ozempic E...", title: "People standing around a table", status: "Backlog", statusColor: "gray", priority: "Medium", arrow: "→" },
  { id: "TASK-7839", type: "Ticket", project: "Ozempic E...", title: "Dinner ticket", status: "Todo", statusColor: "gray", priority: "High", arrow: "↑" },
  { id: "TASK-5562", type: "Photo", project: "Ozempic L...", title: "Speaker during conference", status: "Backlog", statusColor: "gray", priority: "Medium", arrow: "→" },
  { id: "TASK-8686", type: "Ticket", project: "Ozempic L...", title: "Breakfast ticket", status: "Cancelled", statusColor: "red", priority: "Medium", arrow: "→" },
  { id: "TASK-1280", type: "Ticket", project: "Ozempic E...", title: "Hotel bill", status: "Done", statusColor: "green", priority: "High", arrow: "↑" },
  { id: "TASK-7262", type: "Photo", project: "Ozempic E...", title: "People having lunch", status: "Done", statusColor: "green", priority: "High", arrow: "↑" },
  { id: "TASK-1138", type: "Photo", project: "Ozempic E...", title: "Coffee break during an event", status: "In Progress", statusColor: "blue", priority: "Medium", arrow: "→" },
  { id: "TASK-7184", type: "Photo", project: "Ozempic L...", title: "Round table in an event", status: "Todo", statusColor: "gray", priority: "Low", arrow: "↓" },
  { id: "TASK-5160", type: "Photo", project: "Ozempic E...", title: "Coffee break in an event", status: "In Progress", statusColor: "blue", priority: "High", arrow: "↑" },
];

const evidences = [
  { id: 1, type: "Photo", title: "Group photo at restaurant entrance", status: "ok", confidence: 94 },
  { id: 2, type: "Ticket", title: "Dinner receipt — Restaurant El Celler", status: "ok", confidence: 97 },
  { id: 3, type: "Ticket", title: "Dinner receipt — Wine & spirits detected", status: "alert", confidence: 99, alertType: "Alcohol detected" },
  { id: 4, type: "Photo", title: "Speaker presentation setup", status: "ok", confidence: 91 },
  { id: 5, type: "Photo", title: "Attendees at round table discussion", status: "ok", confidence: 88 },
];

const loadingSteps = [
  "Connecting to SAP Concur...",
  "Fetching expense tickets...",
  "Analyzing images with Azure Vision...",
  "Running Document Intelligence...",
  "Applying compliance rules...",
];

/* ─── Main Component ─── */
export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [hoveredAlertRow, setHoveredAlertRow] = useState(false);
  const [agentTriggered, setAgentTriggered] = useState(false);

  // Loading sequence
  useEffect(() => {
    if (screen !== "loading") return;
    setLoadingStep(0);
    setLoadingDone(false);
    const timers: NodeJS.Timeout[] = [];
    loadingSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setLoadingStep(i + 1), (i + 1) * 800));
    });
    timers.push(setTimeout(() => setLoadingDone(true), loadingSteps.length * 800 + 600));
    timers.push(setTimeout(() => setScreen("evidences"), loadingSteps.length * 800 + 1800));
    return () => timers.forEach(clearTimeout);
  }, [screen]);

  const handleReviewNow = useCallback(() => {
    setScreen("loading");
    setSelectedEvidence("William Smith");
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setScreen("dashboard");
    setAlertVisible(true);
  }, []);

  const handleSolveAgent = useCallback(() => {
    setAgentTriggered(true);
  }, []);

  /* ─── Sidebar ─── */
  const Sidebar = () => (
    <div className="w-14 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-1 flex-shrink-0">
      {/* Logo */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
        <span className="text-white text-xs font-bold">NV</span>
      </div>
      <SidebarIcon icon={Icon.home} active />
      <SidebarIcon icon={Icon.search} />
      <SidebarIcon icon={Icon.inbox} badge={alertVisible ? 1 : 0} />
      <SidebarIcon icon={Icon.doc} />
      <div className="flex-1" />
      <SidebarIcon icon={Icon.settings} />
      <SidebarIcon icon={Icon.sparkle} />
    </div>
  );

  const SidebarIcon = ({ icon, active, badge }: { icon: React.ReactNode; active?: boolean; badge?: number }) => (
    <button className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative ${active ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}`}>
      {icon}
      {badge ? (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center" style={{ animation: "fadeIn .3s ease" }}>
          {badge}
        </span>
      ) : null}
    </button>
  );

  /* ─── Left Panel ─── */
  const LeftPanel = () => (
    <div className="w-[280px] h-screen border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">New Evidences</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Unreviewed</span>
            <div className="w-9 h-5 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-0.5 top-[3px]" />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type to search"
          className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 outline-none focus:border-blue-300"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* William Smith */}
        <button
          onClick={handleReviewNow}
          className={`w-full text-left p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors ${selectedEvidence === "William Smith" ? "bg-blue-50" : ""}`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">William Smith</span>
            <span className="text-xs text-gray-400">09:34 AM</span>
          </div>
          <div className="text-sm text-gray-700">Ozempic Launch London</div>
          <div className="text-xs text-gray-400 mt-0.5">5 evidences in queue</div>
        </button>
        {/* Rosa Claramunt */}
        <button className="w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Rosa Claramunt</span>
            <span className="text-xs text-gray-400">09:34 AM</span>
          </div>
          <div className="text-sm text-gray-700">Ozempic Event Madrid</div>
          <div className="text-xs text-gray-400 mt-0.5">5 evidences in queue</div>
        </button>
      </div>
    </div>
  );

  /* ─── Status Dot ─── */
  const StatusDot = ({ color }: { color: string }) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-400",
      gray: "bg-gray-300",
      red: "bg-red-400",
      green: "bg-emerald-400",
    };
    return <span className={`w-2 h-2 rounded-full ${colors[color] || "bg-gray-300"}`} />;
  };

  /* ─── Dashboard Main ─── */
  const DashboardMain = () => (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50/50 p-6" style={{ animation: "fadeIn .3s ease" }}>
      <div className="max-w-[1100px]">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-1">Welcome back!</h1>
        <p className="text-gray-500 text-sm mb-6">Have an overview of current operation</p>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">New evidences</span>
              {Icon.trend_down}
            </div>
            <div className="text-3xl font-bold mb-1">{alertVisible ? 11 : 10}</div>
            <p className="text-xs text-gray-500 mb-3">Acquisition needs attention</p>
            <button onClick={handleReviewNow} className="px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Review now
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Active projects</span>
              {Icon.trend_up_12}
            </div>
            <div className="text-3xl font-bold mb-1">32</div>
            <p className="text-xs text-gray-500">High activity this month</p>
            <p className="text-xs text-gray-400 mt-1">Prepare for high workload</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Evidences received</span>
              {Icon.trend_down_20}
            </div>
            <div className="text-3xl font-bold mb-1">178<span className="text-gray-300 font-normal">/240</span></div>
            <p className="text-xs text-gray-500">Down 20% this period</p>
            <p className="text-xs text-gray-400 mt-1">Evidence acquisition needs a...</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Alerts</span>
              {Icon.trend_up_4}
            </div>
            <div className={`text-3xl font-bold mb-1 ${alertVisible ? "text-red-500" : ""}`}>
              {alertVisible ? 1 : 0}
            </div>
            <p className="text-xs text-gray-500">{alertVisible ? "1 evidence needs review" : "No evidences need atten..."}</p>
            <p className="text-xs text-gray-400 mt-1">{alertVisible ? "Alcohol detected in ticket" : "Meets growth projections"}</p>
            {alertVisible && (
              <div className="absolute top-0 right-0 w-1 h-full bg-red-500" style={{ animation: "fadeIn .5s ease" }} />
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 border-b border-gray-200">
            <button className="px-1 pb-2 text-sm font-medium border-b-2 border-gray-900">Evidences</button>
            <button className="px-1 pb-2 text-sm text-gray-400">Projects <span className="ml-1 bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded-full">3</span></button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Customize Columns
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50">+ Add columns</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Filter tasks..." className="px-3 py-1.5 text-sm border border-gray-200 rounded-md w-48 outline-none focus:border-blue-300" />
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1">⊕ Status</button>
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1">⊕ Priority</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              View
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">Add Task</button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[40px_120px_1fr_120px_100px_40px] px-4 py-2.5 border-b border-gray-100 text-xs text-gray-500 font-medium">
            <div />
            <div>Task</div>
            <div>Title ◇</div>
            <div>Status ◇</div>
            <div>Priority ◇</div>
            <div />
          </div>

          {/* Alert row (appears after review) */}
          {alertVisible && (
            <div
              className="grid grid-cols-[40px_120px_1fr_120px_100px_40px] px-4 py-3 border-b border-red-100 bg-red-50 items-center text-sm relative group cursor-pointer"
              onMouseEnter={() => setHoveredAlertRow(true)}
              onMouseLeave={() => setHoveredAlertRow(false)}
              style={{ animation: "slideUp .4s ease" }}
            >
              <div><input type="checkbox" className="rounded" /></div>
              <div className="font-mono text-xs text-gray-600">TASK-9201</div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded">Ticket</span>
                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded">Ozempic L...</span>
                <span className="text-red-700 font-medium">Wine & spirits detected</span>
                <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded flex items-center gap-0.5">
                  {Icon.alert} ALCOHOL
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-red-600 text-xs">Alert</span>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-xs font-medium">↑ Critical</div>
              <div className="text-gray-400">···</div>

              {/* Hover tooltip */}
              {hoveredAlertRow && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white rounded-lg shadow-xl px-3 py-2 flex items-center gap-2" style={{ animation: "fadeIn .15s ease" }}>
                  <button
                    onClick={() => setScreen("ticket")}
                    className="text-xs font-medium whitespace-nowrap hover:text-blue-300 transition-colors flex items-center gap-1.5"
                  >
                    {Icon.sparkle}
                    Solve with NovoVision Agent
                  </button>
                </div>
              )}
            </div>
          )}

          {tableRows.map((row) => (
            <div key={row.id} className="grid grid-cols-[40px_120px_1fr_120px_100px_40px] px-4 py-3 border-b border-gray-50 items-center text-sm hover:bg-gray-50 transition-colors">
              <div><input type="checkbox" className="rounded" /></div>
              <div className="font-mono text-xs text-gray-600">{row.id}</div>
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${row.type === "Photo" ? "bg-gray-100 text-gray-600" : "bg-blue-50 text-blue-700"}`}>{row.type}</span>
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded">{row.project}</span>
                <span>{row.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <StatusDot color={row.statusColor} />
                <span className="text-xs text-gray-600">{row.status}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span>{row.arrow}</span> {row.priority}
              </div>
              <div className="text-gray-400 cursor-pointer">···</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>0 of 100 row(s) selected.</span>
          <div className="flex items-center gap-3">
            <span>Rows per page</span>
            <select className="border border-gray-200 rounded px-1 py-0.5 text-xs">
              <option>10</option>
            </select>
            <span>Page 1 of 4</span>
            <div className="flex gap-1">
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">«</button>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">‹</button>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">›</button>
              <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── Loading Screen ─── */
  const LoadingScreen = () => (
    <div className="flex-1 h-screen flex items-center justify-center bg-gray-50/50" style={{ animation: "fadeIn .3s ease" }}>
      <div className="w-[480px]">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              {Icon.sparkle}
            </div>
            <div>
              <h2 className="font-semibold text-lg">Reviewing Evidences</h2>
              <p className="text-xs text-gray-400">Ozempic Launch London — William Smith</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {loadingSteps.map((step, i) => {
              const done = loadingStep > i;
              const active = loadingStep === i;
              return (
                <div key={i} className="flex items-center gap-3" style={{ animation: `slideUp .3s ease ${i * 0.1}s both` }}>
                  {done ? (
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600" style={{ animation: "checkPop .3s ease" }}>
                      {Icon.check}
                    </div>
                  ) : active ? (
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" style={{ animation: "spin .8s linear infinite" }} />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-200 rounded-full" />
                  )}
                  <span className={`text-sm ${done ? "text-gray-700" : active ? "text-blue-600 font-medium" : "text-gray-300"}`}>{step}</span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(loadingStep / loadingSteps.length) * 100}%`,
                background: loadingDone ? "#10b981" : "linear-gradient(90deg, #2563eb, #7c3aed)",
              }}
            />
          </div>

          {loadingDone && (
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium" style={{ animation: "fadeIn .3s ease" }}>
              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center" style={{ animation: "checkPop .4s ease" }}>
                {Icon.check}
              </div>
              5 evidences processed — 1 alert found
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ─── Evidence List ─── */
  const EvidenceList = () => (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50/50 p-6" style={{ animation: "fadeIn .3s ease" }}>
      <div className="max-w-[800px] mx-auto">
        {/* Back */}
        <button onClick={handleBackToDashboard} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors">
          {Icon.back} Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Evidence Review</h1>
            <p className="text-sm text-gray-500 mt-0.5">Ozempic Launch London — William Smith — 5 evidences</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">4 Clear</span>
            <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full flex items-center gap-1">
              {Icon.alert} 1 Alert
            </span>
          </div>
        </div>

        {/* Evidence cards */}
        <div className="space-y-3">
          {evidences.map((ev, i) => (
            <div
              key={ev.id}
              className={`bg-white rounded-xl border p-4 transition-all ${
                ev.status === "alert"
                  ? "border-red-200 shadow-sm shadow-red-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ animation: `slideUp .3s ease ${i * 0.08}s both` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Status icon */}
                  {ev.status === "ok" ? (
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                      {Icon.check}
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500" style={{ animation: "pulse 2s infinite" }}>
                      {Icon.alert}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${ev.type === "Photo" ? "bg-gray-100 text-gray-600" : "bg-blue-50 text-blue-700"}`}>{ev.type}</span>
                      <span className="text-sm font-medium">{ev.title}</span>
                      {ev.status === "alert" && (
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded flex items-center gap-0.5">
                          {Icon.alert} {ev.alertType?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      AI Confidence: {ev.confidence}%
                      <span className="ml-2 inline-block w-16 h-1 bg-gray-100 rounded-full overflow-hidden align-middle">
                        <span className={`block h-full rounded-full ${ev.confidence > 95 ? "bg-emerald-400" : ev.confidence > 90 ? "bg-blue-400" : "bg-yellow-400"}`} style={{ width: `${ev.confidence}%` }} />
                      </span>
                    </div>
                  </div>
                </div>

                {ev.status === "alert" ? (
                  <button
                    onClick={() => setScreen("ticket")}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {Icon.alert}
                    Revisar evidencia
                  </button>
                ) : (
                  <span className="px-3 py-1.5 text-xs text-emerald-600 bg-emerald-50 rounded-lg font-medium">Passed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── Ticket Detail ─── */
  const TicketDetail = () => (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50/50 p-6" style={{ animation: "fadeIn .3s ease" }}>
      <div className="max-w-[900px] mx-auto">
        {/* Back */}
        <button onClick={() => setScreen("evidences")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors">
          {Icon.back} Back to Evidence List
        </button>

        <div className="grid grid-cols-[1fr_340px] gap-6">
          {/* Ticket */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Alert banner */}
            <div className="bg-red-500 text-white px-5 py-3 flex items-center gap-2">
              {Icon.alert}
              <span className="font-medium text-sm">Compliance Alert — Alcohol detected in expense ticket</span>
            </div>

            {/* Receipt */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 font-mono text-sm max-w-[380px] mx-auto" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 27px, #f3f4f6 27px, #f3f4f6 28px)" }}>
                <div className="text-center mb-4 pb-3 border-b border-dashed border-gray-300">
                  <div className="font-bold text-base mb-0.5">RESTAURANTE EL CELLER</div>
                  <div className="text-xs text-gray-500">C/ Gran Vía 28, Madrid</div>
                  <div className="text-xs text-gray-500">NIF: B-12345678</div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  <div>Fecha: 14/03/2025 — 21:32</div>
                  <div>Mesa: 12 — Camarero: Luis</div>
                  <div>Factura: #0847-2025</div>
                </div>

                <div className="space-y-1.5 mb-3 pb-3 border-b border-dashed border-gray-300">
                  <div className="flex justify-between"><span>2x Entrante del día</span><span>24.00€</span></div>
                  <div className="flex justify-between"><span>3x Solomillo ibérico</span><span>87.00€</span></div>
                  <div className="flex justify-between"><span>2x Lubina al horno</span><span>52.00€</span></div>
                  <div className="flex justify-between"><span>1x Ensalada César</span><span>14.50€</span></div>

                  {/* Flagged item */}
                  <div className="flex justify-between items-center bg-red-50 -mx-2 px-2 py-1 rounded-lg border border-red-200 relative">
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2h8l-1 7a5 5 0 01-3 4.5M10 2l1 7a5 5 0 003 4.5M12 13.5V20m-3 0h6M7 2h10"/>
                      </svg>
                      <span className="text-red-700 font-bold">2x Rioja Reserva 2018</span>
                    </div>
                    <span className="text-red-700 font-bold">68.00€</span>
                  </div>

                  <div className="flex justify-between items-center bg-red-50 -mx-2 px-2 py-1 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2h8l-1 7a5 5 0 01-3 4.5M10 2l1 7a5 5 0 003 4.5M12 13.5V20m-3 0h6M7 2h10"/>
                      </svg>
                      <span className="text-red-700 font-bold">1x Copa Albariño</span>
                    </div>
                    <span className="text-red-700 font-bold">12.00€</span>
                  </div>

                  <div className="flex justify-between"><span>5x Café</span><span>12.50€</span></div>
                  <div className="flex justify-between"><span>2x Postre</span><span>18.00€</span></div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500"><span>Subtotal</span><span>288.00€</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>IVA (10%)</span><span>28.80€</span></div>
                  <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-300"><span>TOTAL</span><span>316.80€</span></div>
                </div>

                <div className="text-center mt-3 pt-3 border-t border-dashed border-gray-300 text-xs text-gray-400">
                  Gracias por su visita
                </div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Alert details */}
            <div className="bg-white rounded-xl border border-red-200 p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Alert Details
              </h3>
              <div className="space-y-2.5 text-sm">
                <div>
                  <span className="text-gray-400 text-xs">Rule violated</span>
                  <p className="font-medium text-red-700">Alcohol in expense receipts</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Items detected</span>
                  <p className="font-medium">2x Rioja Reserva 2018 — 68.00€</p>
                  <p className="font-medium">1x Copa Albariño — 12.00€</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Total alcohol amount</span>
                  <p className="font-medium text-red-700 text-lg">80.00€</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">AI Confidence</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "99%" }} />
                    </div>
                    <span className="text-xs font-medium">99%</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Reference</span>
                  <p className="text-xs">Farmaindustria Code — Art. 17.3</p>
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-sm mb-3">Context</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Employee</span>
                  <span className="font-medium">William Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Project</span>
                  <span className="font-medium">Ozempic Launch London</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Activity</span>
                  <span className="font-medium">Dinner with HCPs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">14 Mar 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Source</span>
                  <span className="font-medium">SAP Concur</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {!agentTriggered ? (
                <button
                  onClick={handleSolveAgent}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {Icon.sparkle}
                  Solve with NovoVision Agent
                </button>
              ) : (
                <div className="w-full py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl font-medium text-sm text-center flex items-center justify-center gap-2" style={{ animation: "fadeIn .3s ease" }}>
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" style={{ animation: "spin .8s linear infinite" }} />
                  NovoVision Agent processing...
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  Mark as Valid
                </button>
                <button className="py-2 border border-red-200 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors">
                  Mark Invalid
                </button>
              </div>
              <button className="w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                Request more evidence
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── Render ─── */
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <LeftPanel />
      {screen === "dashboard" && <DashboardMain />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "evidences" && <EvidenceList />}
      {screen === "ticket" && <TicketDetail />}
    </div>
  );
}
