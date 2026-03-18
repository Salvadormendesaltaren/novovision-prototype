"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Types ─── */
type Screen = "dashboard" | "loading" | "evidences" | "ticket" | "agent";
type MobileTab = "home" | "inbox" | "search" | "settings";

/* ─── CountUp ─── */
const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const prev = useRef(to);
  useEffect(() => {
    const from = prev.current !== to ? prev.current : 0;
    prev.current = to;
    const start = Date.now();
    const dur = 800;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to]);
  return <>{val}{suffix}</>;
};

/* ─── SVG Icons ─── */
const I = {
  home: (a?: boolean) => a
    ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.47 3.841a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.061l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.689z"/><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625A1.875 1.875 0 013.75 19.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z"/></svg>
    : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>,
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
  scissors: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L7.05 21.192m0-14.384l7.071 7.071m2.828-7.071a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243zm0 14.142a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243z"/></svg>,
  mail: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  robot: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  novo: (s = 32) => <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><path d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="white"/><mask id="nm" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32"><path d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="#001965"/></mask><g mask="url(#nm)"><path d="M15.8192 8.93896C19.1997 8.93896 21.9217 6.3485 21.9217 3.17778C21.9217 -0.0136687 19.1997 -2.5834 15.8192 -2.5834C12.4387 -2.5834 9.7168 0.00705485 9.7168 3.17778C9.7168 6.36922 12.4607 8.93896 15.8192 8.93896ZM15.9948 -1.23637C18.2339 -1.23637 20.0339 0.483699 20.0339 2.57679C20.0339 4.69061 18.2339 6.38995 15.9948 6.38995C13.7558 6.38995 11.9339 4.69061 11.9339 2.57679C11.9339 0.462976 13.7558 -1.23637 15.9948 -1.23637Z" fill="#001965"/><path d="M10.7693 14.4722C11.4059 15.3426 12.679 13.892 12.5693 13.6433C12.4595 13.3739 10.1327 13.6225 10.7693 14.4722Z" fill="#001965"/><path d="M46.4842 19.1143C45.672 15.4669 42.3135 15.3633 40.5355 15.4876C38.6916 15.612 35.2233 16.1301 31.6452 16.1301C26.816 16.1301 21.394 14.8452 17.2233 13.0215C16.4989 12.7106 16.8721 12.5656 17.1794 12.3998C18.7379 11.5916 20.0989 10.8662 20.933 9.58137C21.5696 8.60736 21.3282 8.2965 20.6257 8.83532C18.7379 10.3067 16.0599 11.1356 13.0526 10.1202C10.0452 9.10473 8.88183 6.3692 8.61842 5.68532C8.355 5.00144 7.98183 4.93927 7.98183 5.95473C7.98183 8.50374 9.1672 10.0373 9.58427 10.4725C9.97939 10.9077 10.177 11.3429 9.95744 11.5916C9.36476 12.2547 8.72817 12.9801 8.70622 13.2702C8.68427 13.581 8.70622 13.7468 8.57452 14.0991C8.44281 14.4514 7.95988 14.9695 7.21354 15.8399C6.79647 16.3373 7.05988 16.8761 7.4111 17.2491C7.82817 17.6843 8.11354 18.2024 8.64037 18.4304C9.1672 18.6583 9.65012 18.4926 10.2648 18.5962C10.8574 18.6998 11.6038 19.0314 12.1965 20.0261C13.0526 21.4768 13.9745 23.7356 15.6428 25.6008C16.3891 26.4297 16.3891 27.9425 16.3891 28.4399C16.433 32.8126 13.9965 36.9574 12.4379 39.5893C12.0648 40.211 12.1526 40.7291 12.6355 40.7291C13.2062 40.7291 15.3135 40.7291 15.6648 40.7291C16.0599 40.7291 16.3013 40.3353 16.3233 39.9208C16.5867 36.3356 18.7379 29.7662 20.3623 28.6472C23.0843 30.2429 25.7842 33.683 24.4672 39.6929C24.4013 40.0245 24.0721 40.7498 24.8843 40.7498C24.8843 40.7498 27.1891 40.7498 27.4964 40.7498C27.8257 40.7498 28.3745 40.6254 28.3306 40.0452C28.1989 37.7034 26.1135 32.7504 25.5647 29.8284C25.2135 27.984 26.7721 24.6889 32.655 27.2172C34.9159 25.3106 37.8794 26.4712 36.6062 30.1393C35.355 33.7866 34.2794 35.4031 29.9989 39.6929C29.516 40.1902 29.4721 40.7291 30.2623 40.7291C30.6574 40.7291 32.6111 40.7291 33.0062 40.7291C33.5989 40.7291 33.8403 40.5633 34.0159 40.1281C34.1916 39.6722 36.1452 33.8281 39.9867 31.0925C40.294 30.8853 40.5355 29.9527 41.1281 27.8182C42.994 30.1185 43.2354 34.3047 40.0525 39.7136C39.7233 40.2731 39.9208 40.7083 40.3159 40.7083C40.5355 40.7083 42.2696 40.7083 42.7964 40.7083C43.2574 40.7083 43.3891 40.4804 43.5647 39.8172C43.7842 39.009 43.872 38.6152 44.1574 37.8485C44.333 37.3718 44.4208 37.2889 46.3964 37.3097C47.033 37.3097 46.9891 36.9988 46.9891 36.5014C47.0111 29.2689 47.055 21.7047 46.4842 19.1143ZM39.4818 16.7103C40.1184 17.8294 40.1623 18.4718 39.9867 19.0314C39.8111 19.5909 38.9769 19.9018 38.8013 19.8396C38.7794 18.6376 38.4281 17.7258 37.8355 16.9176C38.3623 16.8347 38.9111 16.7725 39.4818 16.7103ZM34.3672 17.2906C34.7403 18.6169 34.6964 20.337 34.1696 20.8343C33.3355 21.6218 29.5818 21.4768 28.5062 21.311C28.2208 21.2695 27.9135 21.2281 27.7599 20.5028C27.5842 19.6531 27.5623 18.0988 27.4964 17.0626C29.7794 17.3528 32.0842 17.4149 34.3672 17.2906ZM20.9989 19.7981C21.3062 18.8449 21.6135 17.2284 21.7891 15.9021C22.5135 16.1093 23.2599 16.2958 23.9843 16.4616C23.4794 19.4666 22.4916 20.3162 21.9647 20.5028C21.5696 20.6685 20.6916 20.7514 20.9989 19.7981ZM14.2818 21.3731C13.6452 20.5856 12.8111 18.6583 12.0867 18.1195C10.7038 17.0833 9.49647 17.8916 8.96964 17.2906C8.39891 16.6274 8.15744 16.586 8.68427 15.9643C8.68427 15.9643 9.29891 15.1975 9.54037 14.8659C9.80378 14.5343 9.73793 13.9126 9.84769 13.6432C9.95744 13.3738 10.594 12.5863 11.2087 12.0682C11.8891 11.5087 12.4599 11.7574 14.6111 12.9801C17.2233 14.4722 18.0355 14.1613 17.1355 15.4876C16.5867 16.3373 14.7428 18.5962 14.2818 21.3731ZM43.1257 20.4613C42.972 22.6995 42.4452 25.8702 41.633 26.2225C40.8208 26.5541 39.5476 24.5024 32.8964 24.3988C28.1769 24.3159 24.555 24.9169 23.8745 28.9787C23.8306 29.2689 23.655 29.2274 23.5013 29.0824C22.2062 27.756 21.0208 27.1551 19.1111 26.1189C17.2013 25.062 15.9282 23.632 15.6867 22.2228C15.4452 20.8136 15.994 18.9278 18.694 15.4669C19.0672 14.9903 19.133 15.0317 20.6477 15.5705C20.5379 17.8708 19.9233 19.1764 19.6818 20.3577C19.4184 21.5597 20.8452 21.8291 22.0965 21.5389C23.3477 21.2488 24.533 20.0261 25.0599 16.6896C25.5428 16.7932 25.9379 16.8554 26.4428 16.9176C26.5086 20.3784 26.7282 21.1659 26.8818 21.4768C27.1672 22.1192 27.8477 22.3264 28.3964 22.3679C31.272 22.5751 34.0599 22.4922 35.0477 21.5804C36.0355 20.6685 35.7062 18.4097 35.4208 17.2077C35.8818 17.1662 36.255 17.1248 36.694 17.0626C37.6379 18.0988 37.7696 19.2179 37.7696 19.9432C37.7696 20.7307 38.6915 21.1452 40.0086 20.2955C41.3037 19.4458 41.172 17.9537 40.4696 16.6067C43.433 16.3787 43.2793 18.2024 43.1257 20.4613ZM45.3208 31.4656C45.2769 31.7972 44.9476 32.0666 44.8598 31.3827C44.7501 30.5123 44.2672 28.5228 44.1135 27.6939C43.9598 26.9064 44.4208 24.5231 44.5745 22.5337C44.5964 22.3679 44.794 22.3679 44.9257 22.4922C45.8257 23.3833 45.5184 30.1185 45.3208 31.4656Z" fill="#001965"/></g></svg>,
};

/* ─── Data ─── */
const tableRows = [
  { id: "8782", type: "Photo", project: "Ozempic E...", title: "People standing around a table", status: "In Progress", sColor: "sea", priority: "Medium", arrow: "→" },
  { id: "7878", type: "Photo", project: "Ozempic E...", title: "People standing around a table", status: "Backlog", sColor: "nn", priority: "Medium", arrow: "→" },
  { id: "7839", type: "Ticket", project: "Ozempic E...", title: "Dinner ticket", status: "Todo", sColor: "nn", priority: "High", arrow: "↑" },
  { id: "5562", type: "Photo", project: "Ozempic L...", title: "Speaker during conference", status: "Backlog", sColor: "nn", priority: "Medium", arrow: "→" },
  { id: "8686", type: "Ticket", project: "Ozempic L...", title: "Breakfast ticket", status: "Cancelled", sColor: "danger", priority: "Medium", arrow: "→" },
  { id: "1280", type: "Ticket", project: "Ozempic E...", title: "Hotel bill", status: "Done", sColor: "ocean", priority: "High", arrow: "↑" },
  { id: "7262", type: "Photo", project: "Ozempic E...", title: "People having lunch", status: "Done", sColor: "ocean", priority: "High", arrow: "↑" },
  { id: "1138", type: "Photo", project: "Ozempic E...", title: "Coffee break during an event", status: "In Progress", sColor: "sea", priority: "Medium", arrow: "→" },
  { id: "7184", type: "Photo", project: "Ozempic L...", title: "Round table in an event", status: "Todo", sColor: "nn", priority: "Low", arrow: "↓" },
  { id: "5160", type: "Photo", project: "Ozempic E...", title: "Coffee break in an event", status: "In Progress", sColor: "sea", priority: "High", arrow: "↑" },
];

const evidences = [
  { id: 1, type: "Photo", title: "Group photo at restaurant entrance", status: "ok", confidence: 94 },
  { id: 2, type: "Ticket", title: "Dinner receipt — Restaurant El Celler", status: "ok", confidence: 97 },
  { id: 3, type: "Ticket", title: "Dinner receipt — Wine & spirits detected", status: "alert", confidence: 99, alertType: "Alcohol detected" },
  { id: 4, type: "Photo", title: "Speaker presentation setup", status: "ok", confidence: 91 },
  { id: 5, type: "Photo", title: "Attendees at round table discussion", status: "ok", confidence: 88 },
];

const loadingSteps = ["Connecting to SAP Concur...", "Fetching expense tickets...", "Analyzing images with Azure Vision...", "Running Document Intelligence...", "Applying compliance rules..."];
const agentSteps = ["Analyzing compliance violation...", "Reviewing expense line items...", "Checking policy database...", "Generating resolution actions..."];
const statusDotCls: Record<string, string> = { sea: "bg-sea-600", nn: "bg-nn-400", danger: "bg-danger-600", ocean: "bg-ocean-600" };

/* ─── Shared micro-interaction classes ─── */
const cx = {
  btn: "transition-all duration-150 active:scale-[0.97]",
  btnIcon: "transition-all duration-150 hover:scale-110 active:scale-95",
  card: "transition-all duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md",
  cardTap: "transition-all duration-150 active:scale-[0.98]",
  input: "transition-all duration-200 focus:ring-2 focus:ring-sea-200/50 focus:shadow-[0_0_0_3px_rgba(0,90,210,0.06)]",
  backBtn: "transition-all duration-150 hover:-translate-x-0.5 active:scale-95",
};

/* ─── Main ─── */
export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [mobileTab, setMobileTab] = useState<MobileTab>("home");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [hoveredAlert, setHoveredAlert] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [agentReady, setAgentReady] = useState(false);
  const [action1Done, setAction1Done] = useState(false);
  const [action2Done, setAction2Done] = useState(false);
  const [action1Loading, setAction1Loading] = useState(false);
  const [action2Loading, setAction2Loading] = useState(false);
  const [agentResolved, setAgentResolved] = useState(false);
  const [selectedTone, setSelectedTone] = useState<"formal" | "friendly">("formal");
  const [reviewedItems, setReviewedItems] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const inboxItems = [
    { key: "william", name: "William Smith", project: "Ozempic Launch London", time: "09:34 AM" },
    { key: "rosa", name: "Rosa Claramunt", project: "Ozempic Event Madrid", time: "09:34 AM" },
  ];
  const unreviewed = inboxItems.filter((it) => !reviewedItems.has(it.key));
  const displayedItems = showAll ? inboxItems : unreviewed;
  const badgeCount = unreviewed.length;

  const toneMessages = {
    formal: {
      subject: "Expense policy reminder",
      body: `"Dear William, this is a reminder that alcoholic beverages are not eligible for reimbursement in events involving Healthcare Professionals, as per Farmaindustria Code — Art. 17.3. Please ensure future expense reports comply with this policy."`,
    },
    friendly: {
      subject: "Quick note about your recent expense",
      body: `"Hi William! Just a heads-up — we noticed some alcoholic beverages on your latest expense report. Unfortunately, those can't be reimbursed for HCP events per Farmaindustria Code — Art. 17.3. No worries, just keep it in mind for next time!"`,
    },
  };

  useEffect(() => {
    if (screen !== "loading") return;
    setLoadingStep(0); setLoadingDone(false);
    const t: NodeJS.Timeout[] = [];
    loadingSteps.forEach((_, i) => t.push(setTimeout(() => setLoadingStep(i + 1), (i + 1) * 800)));
    t.push(setTimeout(() => setLoadingDone(true), loadingSteps.length * 800 + 600));
    t.push(setTimeout(() => setScreen("evidences"), loadingSteps.length * 800 + 1800));
    return () => t.forEach(clearTimeout);
  }, [screen]);

  useEffect(() => {
    if (screen !== "agent") return;
    setAgentStep(0); setAgentReady(false);
    const t: NodeJS.Timeout[] = [];
    agentSteps.forEach((_, i) => t.push(setTimeout(() => setAgentStep(i + 1), (i + 1) * 700)));
    t.push(setTimeout(() => setAgentReady(true), agentSteps.length * 700 + 500));
    return () => t.forEach(clearTimeout);
  }, [screen]);

  const startReview = useCallback((panelKey: string = "william") => { setScreen("loading"); setSelectedPanel(panelKey); setMobileTab("home"); }, []);
  const backToDash = useCallback(() => { setScreen("dashboard"); setAlertVisible(true); if (selectedPanel) setReviewedItems((prev) => new Set(prev).add(selectedPanel)); }, [selectedPanel]);
  const inSubFlow = screen !== "dashboard";

  /* ═══ DESKTOP SIDEBAR ═══ */
  const Sidebar = () => (
    <div className="hidden lg:flex w-[52px] h-screen bg-navy flex-col items-center py-4 gap-0.5 flex-shrink-0">
      <div className={`mb-6 ${cx.btnIcon} hover:rotate-3 cursor-pointer`} onClick={() => { setScreen("dashboard"); setMobileTab("home"); }}>{I.novo(28)}</div>
      {SbIcon({ icon: I.home(true), active: true })}{SbIcon({ icon: I.search })}{SbIcon({ icon: I.inbox, badge: badgeCount })}{SbIcon({ icon: I.doc })}
      <div className="flex-1" />{SbIcon({ icon: I.settings })}{SbIcon({ icon: I.sparkle })}
    </div>
  );
  const SbIcon = ({ icon, active, badge }: { icon: React.ReactNode; active?: boolean; badge?: number }) => (
    <button className={`w-9 h-9 flex items-center justify-center rounded-lg relative ${cx.btnIcon} ${active ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}>
      {icon}{badge ? <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-danger-700 text-white text-[8px] font-bold rounded-full flex items-center justify-center" style={{ animation: "bounceIn .4s ease" }}>{badge}</span> : null}
    </button>
  );

  /* ═══ MOBILE BOTTOM NAV ═══ */
  const BottomNav = () => (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-nn-100 ${inSubFlow ? "hidden" : ""}`} style={{ animation: "slideUp .25s ease" }}>
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] h-14">
        {([
          { key: "home" as MobileTab, icon: I.home(mobileTab === "home"), label: "Home" },
          { key: "inbox" as MobileTab, icon: I.inbox, label: "Inbox", badge: badgeCount },
          { key: "search" as MobileTab, icon: I.search, label: "Search" },
          { key: "settings" as MobileTab, icon: I.settings, label: "Settings" },
        ]).map((tab) => (
          <button key={tab.key} onClick={() => { setMobileTab(tab.key); if (tab.key === "home") setScreen("dashboard"); }}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all duration-200 relative active:scale-90 ${mobileTab === tab.key ? "text-sea-900" : "text-nn-400"}`}>
            <div className={`transition-transform duration-300 ${mobileTab === tab.key ? "scale-110 -translate-y-0.5" : ""}`}>{tab.icon}</div>
            <span className={`text-[10px] font-medium transition-all duration-200 ${mobileTab === tab.key ? "opacity-100" : "opacity-70"}`}>{tab.label}</span>
            {tab.badge ? <span className="absolute top-0.5 right-3 w-4 h-4 bg-danger-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style={{ animation: "bounceIn .4s ease" }}>{tab.badge}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );

  /* ═══ DESKTOP LEFT PANEL ═══ */
  const LeftPanel = () => (
    <div className="hidden lg:flex w-[264px] h-screen border-r border-nn-100 bg-white flex-col flex-shrink-0" style={{ animation: "slideRight .2s ease" }}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[13px] text-nn-900">New Evidences</h2>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-nn-500">{showAll ? "All" : "Unreviewed"}</span>
            <div className={`w-8 h-[18px] rounded-full relative cursor-pointer transition-all duration-300 hover:shadow-[0_0_0_3px_rgba(0,90,210,0.15)] ${showAll ? "bg-nn-400" : "bg-sea-900"}`} onClick={() => setShowAll((p) => !p)}>
              <div className={`w-3 h-3 bg-white rounded-full absolute top-[3px] transition-all duration-300 shadow-sm ${showAll ? "left-[3px]" : "right-[3px]"}`} />
            </div>
          </div>
        </div>
        <input type="text" placeholder="Type to search" className={`w-full px-2.5 py-1.5 text-[12px] border border-nn-200 rounded-lg bg-nn-50 outline-none focus:border-sea-500 text-nn-700 placeholder:text-nn-400 ${cx.input}`} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {displayedItems.map((item) => {
          const isReviewed = reviewedItems.has(item.key);
          return PanelItem({
            key: item.key,
            name: item.name,
            project: item.project,
            time: item.time,
            selected: selectedPanel === item.key,
            reviewed: isReviewed,
            onClick: isReviewed ? undefined : () => startReview(item.key),
          });
        })}
        {displayedItems.length === 0 && (
          <div className="px-4 py-8 text-center text-[12px] text-nn-400">No unreviewed evidences</div>
        )}
      </div>
    </div>
  );
  const PanelItem = ({ name, project, time, selected, reviewed, onClick }: { key?: string; name: string; project: string; time: string; selected?: boolean; reviewed?: boolean; onClick?: () => void }) => (
    <button onClick={onClick} disabled={reviewed} className={`w-full text-left px-4 py-3 border-b border-nn-100 transition-all duration-200 group ${reviewed ? "opacity-50 cursor-default" : ""} ${selected ? "bg-sea-50 border-l-[3px] border-l-sea-900" : "hover:bg-nn-50 active:bg-nn-100 border-l-[3px] border-l-transparent hover:border-l-nn-200"}`}>
      <div className="flex items-center justify-between mb-0.5"><span className={`text-[13px] font-medium transition-colors duration-200 ${reviewed ? "line-through text-nn-500" : "text-nn-900"} ${!selected && !reviewed ? "group-hover:text-sea-900" : ""}`}>{name}</span>{reviewed ? <span className="text-[10px] text-ocean-700 bg-ocean-50 px-1.5 py-0.5 rounded-full font-medium">Reviewed</span> : <span className="text-[11px] text-nn-400">{time}</span>}</div>
      <div className="text-[12px] text-nn-700">{project}</div><div className="text-[11px] text-nn-400 mt-0.5">5 evidences in queue</div>
    </button>
  );

  /* ═══ MOBILE HEADER ═══ */
  const MobileHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-nn-100 px-4 flex items-center gap-3 h-12" style={{ animation: "slideDown .2s ease" }}>
      <button onClick={onBack} className={`w-9 h-9 flex items-center justify-center -ml-1 text-nn-700 active:bg-nn-100 rounded-xl ${cx.backBtn}`}>{I.back}</button>
      <span className="text-[14px] font-semibold text-navy truncate">{title}</span>
    </div>
  );

  /* ═══ MOBILE INBOX ═══ */
  const MobileInbox = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50 pb-20" style={{ animation: "fadeIn .2s ease" }}>
      <div className="bg-white px-4 pt-5 pb-3 border-b border-nn-100">
        <h1 className="text-[20px] font-bold text-navy mb-1" style={{ animation: "slideUp .3s ease" }}>New Evidences</h1>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[12px] text-nn-500">{showAll ? "All" : "Unreviewed"}</span>
          <div className={`w-8 h-[18px] rounded-full relative transition-all duration-300 active:scale-95 ${showAll ? "bg-nn-400" : "bg-sea-900"}`} onClick={() => setShowAll((p) => !p)}>
            <div className={`w-3 h-3 bg-white rounded-full absolute top-[3px] transition-all duration-300 shadow-sm ${showAll ? "left-[3px]" : "right-[3px]"}`} />
          </div>
        </div>
        <input type="text" placeholder="Search evidences..." className={`w-full px-3 py-2.5 text-[14px] border border-nn-200 rounded-xl bg-nn-50 outline-none focus:border-sea-500 text-nn-700 placeholder:text-nn-400 ${cx.input}`} />
      </div>
      <div className="p-4 space-y-2">
        {displayedItems.map((item, i) => {
          const isReviewed = reviewedItems.has(item.key);
          return (
            <button key={item.key} onClick={isReviewed ? undefined : () => startReview(item.key)} disabled={isReviewed} className={`w-full text-left bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)] ${cx.cardTap} ${cx.card} ${isReviewed ? "opacity-50" : ""}`} style={{ animation: `slideUp .3s ease ${i * 0.08}s both` }}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[14px] font-semibold ${isReviewed ? "line-through text-nn-500" : "text-nn-900"}`}>{item.name}</span>
                {isReviewed ? <span className="text-[10px] text-ocean-700 bg-ocean-50 px-1.5 py-0.5 rounded-full font-medium">Reviewed</span> : <span className="text-[12px] text-nn-400">{item.time}</span>}
              </div>
              <div className="text-[13px] text-nn-700">{item.project}</div>
              <div className="flex items-center justify-between mt-2"><span className="text-[12px] text-nn-400">5 evidences in queue</span><span className="text-nn-400 transition-transform duration-200 group-hover:translate-x-0.5">{I.chevron}</span></div>
            </button>
          );
        })}
        {displayedItems.length === 0 && (
          <div className="py-8 text-center text-[13px] text-nn-400">No unreviewed evidences</div>
        )}
      </div>
    </div>
  );

  /* ═══ DASHBOARD ═══ */
  const Dashboard = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50 px-4 pt-5 pb-20 lg:p-6 lg:pb-6" style={{ animation: "fadeIn .2s ease" }}>
      <div className="lg:max-w-[1080px]">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between lg:hidden mb-4" style={{ animation: "slideDown .3s ease" }}>
          <div className={`${cx.btnIcon} hover:rotate-3 cursor-pointer`} onClick={() => { setScreen("dashboard"); setMobileTab("home"); }}>{I.novo(32)}</div>
          <h1 className="text-[18px] font-bold text-navy">NovoVision</h1>
          <div className={`w-8 h-8 rounded-full bg-sea-100 flex items-center justify-center text-sea-900 text-[11px] font-bold ${cx.btnIcon}`}>WS</div>
        </div>
        <h1 className="hidden lg:block text-[22px] font-bold text-navy mb-0.5" style={{ animation: "slideUp .35s ease" }}>Welcome back!</h1>
        <p className="hidden lg:block text-nn-500 text-[13px] mb-6" style={{ animation: "slideUp .35s ease .05s both" }}>Have an overview of current operation</p>
        <div className="lg:hidden mb-4"><p className="text-[14px] text-nn-500" style={{ animation: "fadeIn .4s ease" }}>Welcome back, <span className="font-semibold text-navy">William</span></p></div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3 mb-5 lg:mb-6">
          <div className={`bg-white rounded-xl p-3.5 lg:p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)] ${cx.card}`} style={{ animation: "slideUp .3s ease 0s both" }}>
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">New evidences</span><span className="text-danger-700 text-[10px] lg:text-[11px] font-medium">↘ -20%</span></div>
            <div className="text-[24px] lg:text-[28px] font-bold text-navy leading-tight mb-0.5"><CountUp to={alertVisible ? 11 : 10} /></div>
            <p className="text-[10px] lg:text-[11px] text-nn-500 mb-2 lg:mb-3">Acquisition needs attention</p>
            <button onClick={() => startReview()} className={`px-3 lg:px-3.5 py-1.5 bg-sea-900 text-white text-[11px] font-medium rounded-full hover:bg-sea-800 flex items-center gap-1.5 hover:shadow-[0_2px_8px_rgba(0,90,210,0.25)] ${cx.btn}`}><span className="w-1 h-1 bg-white/60 rounded-full" /> Review now</button>
          </div>
          <div className={`bg-white rounded-xl p-3.5 lg:p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)] ${cx.card}`} style={{ animation: "slideUp .3s ease .06s both" }}>
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">Active projects</span><span className="text-ocean-700 text-[10px] lg:text-[11px] font-medium">↗ +12.5%</span></div>
            <div className="text-[24px] lg:text-[28px] font-bold text-navy leading-tight mb-0.5"><CountUp to={32} /></div>
            <p className="text-[10px] lg:text-[11px] text-nn-500">High activity this month</p>
          </div>
          <div className={`bg-white rounded-xl p-3.5 lg:p-4 shadow-[0_1px_3px_rgba(0,25,101,0.04)] ${cx.card}`} style={{ animation: "slideUp .3s ease .12s both" }}>
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">Evidences received</span><span className="text-danger-700 text-[10px] lg:text-[11px] font-medium">↘ -20%</span></div>
            <div className="text-[24px] lg:text-[28px] font-bold text-navy leading-tight mb-0.5"><CountUp to={178} /><span className="text-nn-300 font-normal">/240</span></div>
            <p className="text-[10px] lg:text-[11px] text-nn-500">Down 20% this period</p>
          </div>
          <div className={`bg-white rounded-xl p-3.5 lg:p-4 relative overflow-hidden ${cx.card} ${alertVisible ? "shadow-[0_1px_6px_rgba(219,58,31,0.1)]" : "shadow-[0_1px_3px_rgba(0,25,101,0.04)]"}`} style={{ animation: alertVisible ? "subtlePulse 2.5s ease infinite, slideUp .3s ease .18s both" : "slideUp .3s ease .18s both" }}>
            <div className="flex items-center justify-between mb-1"><span className="text-[11px] lg:text-[12px] text-nn-500 font-medium">Alerts</span><span className="text-ocean-700 text-[10px] lg:text-[11px] font-medium">↗ +4.5%</span></div>
            <div className={`text-[24px] lg:text-[28px] font-bold leading-tight mb-0.5 transition-colors duration-500 ${alertVisible ? "text-danger-700" : "text-navy"}`}><CountUp to={alertVisible ? 1 : 0} /></div>
            <p className="text-[10px] lg:text-[11px] text-nn-500">{alertVisible ? "1 evidence needs review" : "No alerts"}</p>
            {alertVisible && <div className="absolute top-0 left-0 w-full h-[2px] bg-danger-700" style={{ animation: "shimmer 2s linear infinite", background: "linear-gradient(90deg, #DB3A1F, #E97170, #DB3A1F)", backgroundSize: "200% 100%" }} />}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex gap-4 lg:gap-5">
            <button className={`pb-2 text-[13px] font-semibold text-navy border-b-2 border-navy ${cx.btn}`}>Evidences</button>
            <button className={`pb-2 text-[13px] text-nn-400 hover:text-nn-600 border-b-2 border-transparent hover:border-nn-200 ${cx.btn}`}>Projects <span className="ml-1 text-[10px] bg-nn-100 text-nn-500 px-1.5 py-0.5 rounded-full">3</span></button>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <button className={`px-2.5 py-1 text-[11px] border border-nn-200 rounded-lg text-nn-600 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>Customize Columns</button>
            <button className={`px-2.5 py-1 text-[11px] border border-nn-200 rounded-lg text-nn-600 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>+ Add columns</button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mb-3"><input type="text" placeholder="Filter tasks..." className={`w-full px-3 py-2.5 text-[14px] border border-nn-200 rounded-xl bg-white outline-none focus:border-sea-500 text-nn-700 placeholder:text-nn-400 ${cx.input}`} /></div>
        {/* Desktop filters */}
        <div className="hidden lg:flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Filter tasks..." className={`px-2.5 py-1.5 text-[12px] border border-nn-200 rounded-lg w-44 outline-none focus:border-sea-500 text-nn-700 placeholder:text-nn-400 ${cx.input}`} />
            <button className={`px-2.5 py-1.5 text-[11px] border border-nn-200 rounded-lg text-nn-500 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>⊕ Status</button>
            <button className={`px-2.5 py-1.5 text-[11px] border border-nn-200 rounded-lg text-nn-500 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>⊕ Priority</button>
          </div>
          <div className="flex items-center gap-1.5">
            <button className={`px-2.5 py-1.5 text-[11px] border border-nn-200 rounded-lg text-nn-500 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>View</button>
            <button className={`px-3 py-1.5 text-[11px] bg-sea-900 text-white rounded-lg hover:bg-sea-800 font-medium hover:shadow-[0_2px_8px_rgba(0,90,210,0.25)] ${cx.btn}`}>Add Task</button>
          </div>
        </div>

        {/* MOBILE: card list */}
        <div className="lg:hidden space-y-2">
          {alertVisible && (
            <button onClick={() => setScreen("ticket")} className={`w-full text-left bg-danger-50 rounded-xl p-3.5 ring-1 ring-danger-200 ${cx.cardTap}`} style={{ animation: "slideUp .35s ease, subtlePulse 2.5s ease .5s infinite" }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-danger-600" style={{ animation: "pulse 1.5s ease infinite" }} /><span className="font-mono text-[11px] text-danger-800">9201</span></div>
                <span className="px-1.5 py-0.5 bg-danger-700 text-white text-[9px] font-bold rounded flex items-center gap-0.5" style={{ animation: "bounceIn .4s ease .2s both" }}>{I.alert} ALCOHOL</span>
              </div>
              <p className="text-[13px] font-medium text-danger-800 mb-1">Wine & spirits detected</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-danger-100 text-danger-800 text-[10px] font-medium rounded">Ticket</span><span className="text-[11px] text-danger-700 font-medium">↑ Critical</span></div>
                <span className="text-[11px] text-sea-900 font-medium flex items-center gap-1"><span style={{ animation: "float 2s ease infinite" }}>{I.sparkle}</span> Solve with Agent</span>
              </div>
            </button>
          )}
          {tableRows.slice(0, 6).map((r, i) => (
            <div key={r.id} className={`bg-white rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,25,101,0.04)] ${cx.cardTap} ${cx.card}`} style={{ animation: `slideUp .3s ease ${(alertVisible ? 0.06 : 0) + i * 0.04}s both` }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${statusDotCls[r.sColor]}`} /><span className="font-mono text-[11px] text-nn-500">{r.id}</span></div>
                <span className="text-[10px] text-nn-500">{r.arrow} {r.priority}</span>
              </div>
              <p className="text-[13px] font-medium text-nn-800 mb-1.5">{r.title}</p>
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded transition-colors duration-200 ${r.type === "Photo" ? "bg-nn-100 text-nn-600" : "bg-sea-50 text-sea-900"}`}>{r.type}</span>
                <span className="px-1.5 py-0.5 bg-nn-100 text-nn-500 text-[10px] font-medium rounded">{r.project}</span>
                <span className="text-[11px] text-nn-500 ml-auto">{r.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: table */}
        <div className="hidden lg:block bg-white rounded-xl shadow-[0_1px_3px_rgba(0,25,101,0.04)] overflow-hidden" style={{ animation: "slideUp .3s ease .1s both" }}>
          <div className="grid grid-cols-[36px_110px_1fr_110px_90px_32px] px-4 py-2 border-b border-nn-100 text-[11px] text-nn-500 font-medium uppercase tracking-wider"><div /><div>ID</div><div>Title</div><div>Status</div><div>Priority</div><div /></div>
          {alertVisible && (
            <div className="grid grid-cols-[36px_110px_1fr_110px_90px_32px] px-4 py-2.5 border-b border-danger-200 bg-danger-50 items-center text-[13px] relative group cursor-pointer transition-all duration-200 hover:bg-danger-100/70" onMouseEnter={() => setHoveredAlert(true)} onMouseLeave={() => setHoveredAlert(false)} style={{ animation: "slideUp .35s ease" }}>
              <div><input type="checkbox" className="rounded border-nn-300 accent-sea-900 transition-transform duration-150 hover:scale-110" /></div>
              <div className="font-mono text-[11px] text-danger-800">9201</div>
              <div className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-danger-100 text-danger-800 text-[10px] font-medium rounded">Ticket</span><span className="px-1.5 py-0.5 bg-danger-100 text-danger-800 text-[10px] font-medium rounded">Ozempic L...</span><span className="text-danger-800 font-medium text-[12px]">Wine & spirits detected</span><span className="ml-0.5 px-1.5 py-0.5 bg-danger-700 text-white text-[9px] font-bold rounded flex items-center gap-0.5" style={{ animation: "bounceIn .4s ease .2s both" }}>{I.alert} ALCOHOL</span></div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-danger-600" style={{ animation: "pulse 1.5s ease infinite" }} /><span className="text-danger-700 text-[11px] font-medium">Alert</span></div>
              <div className="text-danger-700 text-[11px] font-medium">↑ Critical</div>
              <div className="text-nn-400 text-[12px]">···</div>
              {hoveredAlert && <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-navy text-white rounded-lg shadow-xl px-3 py-2" style={{ animation: "scaleIn .15s ease" }}><button onClick={() => setScreen("ticket")} className={`text-[11px] font-medium whitespace-nowrap hover:text-sea-300 flex items-center gap-1.5 ${cx.btn}`}><span style={{ animation: "float 2s ease infinite" }}>{I.sparkle}</span> Solve with NovoVision Agent</button></div>}
            </div>
          )}
          {tableRows.map((r, i) => (
            <div key={r.id} className="grid grid-cols-[36px_110px_1fr_110px_90px_32px] px-4 py-2.5 border-b border-nn-50 items-center text-[13px] hover:bg-nn-50/60 transition-all duration-200 group" style={{ animation: `fadeIn .2s ease ${i * 0.02}s both` }}>
              <div><input type="checkbox" className="rounded border-nn-300 accent-sea-900 transition-transform duration-150 hover:scale-110" /></div>
              <div className="font-mono text-[11px] text-nn-500">{r.id}</div>
              <div className="flex items-center gap-1.5"><span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${r.type === "Photo" ? "bg-nn-100 text-nn-600" : "bg-sea-50 text-sea-900"}`}>{r.type}</span><span className="px-1.5 py-0.5 bg-nn-100 text-nn-500 text-[10px] font-medium rounded">{r.project}</span><span className="text-nn-800 text-[12px]">{r.title}</span></div>
              <div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${statusDotCls[r.sColor]} transition-transform duration-200 group-hover:scale-125`} /><span className="text-[11px] text-nn-600">{r.status}</span></div>
              <div className="text-[11px] text-nn-600">{r.arrow} {r.priority}</div>
              <div className={`text-nn-400 text-[12px] cursor-pointer hover:text-nn-600 ${cx.btnIcon}`}>···</div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex items-center justify-between mt-3 text-[11px] text-nn-500">
          <span>0 of 100 row(s) selected.</span>
          <div className="flex items-center gap-3"><span>Rows per page</span><select className={`border border-nn-200 rounded-md px-1.5 py-0.5 text-[11px] bg-white ${cx.input}`}><option>10</option></select><span>Page 1 of 4</span>
            <div className="flex gap-0.5">{["«","‹","›","»"].map((c) => <button key={c} className={`w-6 h-6 border border-nn-200 rounded-md flex items-center justify-center hover:bg-nn-50 hover:border-nn-300 text-nn-500 ${cx.btn}`}>{c}</button>)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══ LOADING ═══ */
  const LoadingScreen = () => (
    <div className="flex-1 h-full flex items-center justify-center bg-nn-50 px-5" style={{ animation: "fadeIn .2s ease" }}>
      <div className="w-full max-w-[440px]" style={{ animation: "scaleIn .3s ease" }}>
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,25,101,0.08)] p-5 lg:p-7">
          <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-sea-50 rounded-xl flex items-center justify-center text-sea-900" style={{ animation: "float 3s ease infinite" }}>{I.sparkle}</div><div><h2 className="font-semibold text-[15px] text-navy">Reviewing Evidences</h2><p className="text-[11px] text-nn-500">Ozempic Launch London — W. Smith</p></div></div>
          <div className="space-y-2.5 mb-5">
            {loadingSteps.map((step, i) => { const done = loadingStep > i, active = loadingStep === i; return (
              <div key={i} className="flex items-center gap-2.5" style={{ animation: `slideUp .25s ease ${i * 0.08}s both` }}>
                {done ? <div className="w-5 h-5 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .25s ease" }}>{I.check}</div>
                  : active ? <div className="w-5 h-5 border-[1.5px] border-sea-900 border-t-transparent rounded-full" style={{ animation: "spin .7s linear infinite" }} />
                  : <div className="w-5 h-5 border-[1.5px] border-nn-200 rounded-full" />}
                <span className={`text-[12px] transition-all duration-300 ${done ? "text-nn-700" : active ? "text-sea-900 font-medium" : "text-nn-300"}`}>{step}</span>
              </div>); })}
          </div>
          <div className="h-1 bg-nn-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${(loadingStep / loadingSteps.length) * 100}%`, background: loadingDone ? "#419792" : "#005AD2" }} /></div>
          {loadingDone && <div className="mt-3 flex items-center gap-2 text-[12px] text-ocean-800 font-medium" style={{ animation: "slideUp .25s ease" }}><div className="w-4 h-4 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .3s ease" }}>{I.check}</div>5 evidences processed — 1 alert found</div>}
        </div>
      </div>
    </div>
  );

  /* ═══ EVIDENCE LIST ═══ */
  const EvidenceList = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50" style={{ animation: "fadeIn .2s ease" }}>
      {MobileHeader({ title: "Evidence Review", onBack: backToDash })}
      <div className="px-4 pt-4 lg:pt-6 lg:px-6 pb-6 lg:max-w-[760px] lg:mx-auto">
        <button onClick={backToDash} className={`hidden lg:flex items-center gap-1.5 text-[12px] text-nn-500 hover:text-navy mb-4 ${cx.backBtn}`}>{I.back} Back to Dashboard</button>
        <div className="flex items-center justify-between mb-4 lg:mb-5">
          <div><h1 className="hidden lg:block text-[18px] font-bold text-navy" style={{ animation: "slideUp .3s ease" }}>Evidence Review</h1><p className="text-[12px] text-nn-500 mt-0.5">Ozempic Launch London — W. Smith — 5 evidences</p></div>
          <div className="flex items-center gap-1.5 lg:gap-2"><span className="px-2 py-0.5 lg:py-1 bg-ocean-50 text-ocean-800 text-[11px] font-medium rounded-full" style={{ animation: "scaleIn .3s ease .1s both" }}>4 Clear</span><span className="px-2 py-0.5 lg:py-1 bg-danger-50 text-danger-700 text-[11px] font-medium rounded-full flex items-center gap-1" style={{ animation: "scaleIn .3s ease .15s both" }}>{I.alert} 1 Alert</span></div>
        </div>
        <div className="space-y-2">
          {evidences.map((ev, i) => (
            <div key={ev.id} className={`bg-white rounded-xl p-3 lg:p-3.5 ${cx.card} ${ev.status === "alert" ? "shadow-[0_2px_12px_rgba(219,58,31,0.08)] ring-1 ring-danger-200" : "shadow-[0_1px_3px_rgba(0,25,101,0.04)]"}`} style={{ animation: `slideUp .3s ease ${i * 0.06}s both` }}>
              <div className="flex items-start gap-2.5">
                {ev.status === "ok" ? <div className="w-7 h-7 bg-ocean-50 rounded-lg flex items-center justify-center text-ocean-700 flex-shrink-0 mt-0.5" style={{ animation: `checkPop .3s ease ${i * 0.06 + 0.2}s both` }}>{I.check}</div>
                  : <div className="w-7 h-7 bg-danger-50 rounded-lg flex items-center justify-center text-danger-700 flex-shrink-0 mt-0.5" style={{ animation: "subtlePulse 2s ease infinite" }}>{I.alert}</div>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${ev.type === "Photo" ? "bg-nn-100 text-nn-600" : "bg-sea-50 text-sea-900"}`}>{ev.type}</span>
                    {ev.status === "alert" && <span className="px-1.5 py-0.5 bg-danger-700 text-white text-[9px] font-bold rounded flex items-center gap-0.5" style={{ animation: "bounceIn .4s ease .3s both" }}>{I.alert} ALCOHOL</span>}
                  </div>
                  <p className="text-[12px] font-medium text-nn-900 mb-1 leading-snug">{ev.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-nn-400 flex items-center gap-2">AI: {ev.confidence}%<span className="inline-block w-10 h-[3px] bg-nn-100 rounded-full overflow-hidden align-middle"><span className={`block h-full rounded-full transition-all duration-700 ease-out ${ev.confidence > 95 ? "bg-ocean-600" : ev.confidence > 90 ? "bg-sea-600" : "bg-nn-400"}`} style={{ width: `${ev.confidence}%`, animation: `slideRight .6s ease ${i * 0.06 + 0.3}s both` }} /></span></div>
                    {ev.status === "alert" ? <button onClick={() => setScreen("ticket")} className={`px-3 py-1.5 lg:px-3.5 lg:py-2 bg-danger-700 text-white text-[11px] lg:text-[12px] font-medium rounded-lg hover:bg-danger-800 hover:shadow-[0_2px_8px_rgba(219,58,31,0.25)] flex items-center gap-1 ${cx.btn}`}>{I.alert} Review</button>
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
      {MobileHeader({ title: "Compliance Alert", onBack: () => setScreen("evidences") })}
      <div className="px-4 pt-4 lg:pt-6 lg:px-6 pb-8 lg:max-w-[880px] lg:mx-auto">
        <button onClick={() => setScreen("evidences")} className={`hidden lg:flex items-center gap-1.5 text-[12px] text-nn-500 hover:text-navy mb-4 ${cx.backBtn}`}>{I.back} Back to Evidence List</button>
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4 lg:gap-5">
          {/* Ticket */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,25,101,0.06)] overflow-hidden" style={{ animation: "scaleIn .3s ease" }}>
            <div className="bg-danger-700 text-white px-4 lg:px-5 py-2.5 flex items-center gap-2">{I.alert}<span className="font-medium text-[12px]">Alcohol detected in expense ticket</span></div>
            <div className="p-4 lg:p-6">
              <div className="bg-nn-50 rounded-xl border border-nn-100 p-4 lg:p-5 lg:max-w-[360px] lg:mx-auto font-mono text-[11px] lg:text-[12px]">
                <div className="text-center mb-3 pb-3 border-b border-dashed border-nn-300"><div className="font-bold text-[13px] lg:text-[14px] text-navy mb-0.5">RESTAURANTE EL CELLER</div><div className="text-[10px] text-nn-500">C/ Gran Vía 28, Madrid</div><div className="text-[10px] text-nn-500">NIF: B-12345678</div></div>
                <div className="text-[10px] text-nn-500 mb-3 space-y-0.5"><div>Fecha: 14/03/2025 — 21:32</div><div>Mesa: 12 — Camarero: Luis</div></div>
                <div className="space-y-1 mb-3 pb-3 border-b border-dashed border-nn-300 text-nn-800">
                  {[["2x Entrante del día","24.00€"],["3x Solomillo ibérico","87.00€"],["2x Lubina al horno","52.00€"],["1x Ensalada César","14.50€"]].map(([item,price], i) => (
                    <div key={i} className="flex justify-between" style={{ animation: `slideRight .2s ease ${i * 0.03}s both` }}><span>{item}</span><span>{price}</span></div>
                  ))}
                  <div className="flex justify-between items-center bg-danger-50 -mx-2 px-2 py-1.5 rounded-lg ring-1 ring-danger-200 transition-all duration-200 hover:ring-danger-300" style={{ animation: "slideRight .2s ease .15s both" }}><div className="flex items-center gap-1.5"><span className="text-danger-700" style={{ animation: "wiggle .5s ease .4s both" }}>{I.wine(14)}</span><span className="text-danger-800 font-bold text-[11px]">2x Rioja Reserva</span></div><span className="text-danger-800 font-bold">68.00€</span></div>
                  <div className="flex justify-between items-center bg-danger-50 -mx-2 px-2 py-1.5 rounded-lg ring-1 ring-danger-200 transition-all duration-200 hover:ring-danger-300" style={{ animation: "slideRight .2s ease .2s both" }}><div className="flex items-center gap-1.5"><span className="text-danger-700" style={{ animation: "wiggle .5s ease .5s both" }}>{I.wine(14)}</span><span className="text-danger-800 font-bold text-[11px]">1x Copa Albariño</span></div><span className="text-danger-800 font-bold">12.00€</span></div>
                  {[["5x Café","12.50€"],["2x Postre","18.00€"]].map(([item,price], i) => (
                    <div key={i} className="flex justify-between" style={{ animation: `slideRight .2s ease ${0.25 + i * 0.03}s both` }}><span>{item}</span><span>{price}</span></div>
                  ))}
                </div>
                <div className="space-y-0.5 text-nn-600"><div className="flex justify-between text-[10px]"><span>Subtotal</span><span>288.00€</span></div><div className="flex justify-between text-[10px]"><span>IVA (10%)</span><span>28.80€</span></div><div className="flex justify-between font-bold text-[13px] lg:text-[14px] text-navy pt-1.5 border-t border-nn-300" style={{ animation: "fadeIn .3s ease .35s both" }}><span>TOTAL</span><span>316.80€</span></div></div>
              </div>
            </div>
          </div>
          {/* Details + Actions */}
          <div className="space-y-3">
            <div className={`bg-white rounded-xl shadow-[0_1px_3px_rgba(0,25,101,0.04)] p-4 ${cx.card}`} style={{ animation: "slideUp .3s ease .1s both" }}>
              <h3 className="font-semibold text-[12px] text-navy mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-danger-700" style={{ animation: "pulse 1.5s ease infinite" }} />Alert Details</h3>
              <div className="space-y-2.5 text-[12px]">
                <div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Rule violated</span><p className="font-medium text-danger-700">Alcohol in expense receipts</p></div>
                <div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Items detected</span><p className="font-medium text-nn-800">2x Rioja Reserva 2018 — 68.00€</p><p className="font-medium text-nn-800">1x Copa Albariño — 12.00€</p></div>
                <div className="flex items-center justify-between"><div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Total alcohol</span><p className="font-bold text-danger-700 text-[18px]"><CountUp to={80} suffix=".00€" /></p></div><div className="text-right"><span className="text-nn-400 text-[10px] uppercase tracking-wider">AI Confidence</span><p className="font-semibold text-nn-700 text-[14px]"><CountUp to={99} suffix="%" /></p></div></div>
                <div className="h-1.5 bg-nn-100 rounded-full overflow-hidden"><div className="h-full bg-danger-600 rounded-full transition-all duration-1000 ease-out" style={{ width: "99%", animation: "slideRight .8s ease .2s both" }} /></div>
                <div><span className="text-nn-400 text-[10px] uppercase tracking-wider">Reference</span><p className="text-nn-700 text-[11px]">Farmaindustria Code — Art. 17.3</p></div>
              </div>
            </div>
            <div className={`bg-white rounded-xl shadow-[0_1px_3px_rgba(0,25,101,0.04)] p-4 ${cx.card}`} style={{ animation: "slideUp .3s ease .2s both" }}>
              <h3 className="font-semibold text-[12px] text-navy mb-3">Context</h3>
              <div className="space-y-2 text-[12px]">
                {([["Employee","William Smith"],["Project","Ozempic Launch London"],["Activity","Dinner with HCPs"],["Date","14 Mar 2025"],["Source","SAP Concur"]] as const).map(([k,v], i) => <div key={k} className="flex justify-between" style={{ animation: `fadeIn .2s ease ${0.25 + i * 0.04}s both` }}><span className="text-nn-500">{k}</span><span className="font-medium text-nn-800">{v}</span></div>)}
              </div>
            </div>
            <div className="space-y-2" style={{ animation: "slideUp .3s ease .3s both" }}>
              <button onClick={() => setScreen("agent")} className={`w-full py-3 lg:py-2.5 bg-navy text-white rounded-xl font-medium text-[13px] lg:text-[12px] hover:bg-navy/90 shadow-[0_2px_8px_rgba(0,25,101,0.2)] hover:shadow-[0_4px_16px_rgba(0,25,101,0.3)] flex items-center justify-center gap-2 ${cx.btn}`}><span className="text-sea-300" style={{ animation: "float 2s ease infinite" }}>{I.sparkle}</span> Solve with NovoVision Agent</button>
              <div className="grid grid-cols-2 gap-2">
                <button className={`py-2.5 lg:py-2 border border-nn-200 rounded-xl text-[12px] text-nn-600 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>Mark as Valid</button>
                <button className={`py-2.5 lg:py-2 border border-danger-200 rounded-xl text-[12px] text-danger-700 hover:bg-danger-50 hover:border-danger-300 ${cx.btn}`}>Mark Invalid</button>
              </div>
              <button className={`w-full py-2.5 lg:py-2 border border-nn-200 rounded-xl text-[12px] text-nn-500 hover:bg-nn-50 hover:border-nn-300 ${cx.btn}`}>Request more evidence</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══ AGENT RESOLUTION ═══ */
  const handleAction1 = () => {
    setAction1Loading(true);
    setTimeout(() => { setAction1Loading(false); setAction1Done(true); }, 1500);
  };
  const handleAction2 = () => {
    setAction2Loading(true);
    setTimeout(() => { setAction2Loading(false); setAction2Done(true); }, 1800);
  };
  const handleResolve = () => {
    setAgentResolved(true);
    if (selectedPanel) setReviewedItems((prev) => new Set(prev).add(selectedPanel));
    setTimeout(() => { setScreen("dashboard"); setAlertVisible(true); }, 1200);
  };

  const AgentScreen = () => (
    <div className="flex-1 h-full overflow-y-auto bg-nn-50" style={{ animation: "fadeIn .2s ease" }}>
      {MobileHeader({ title: "NovoVision Agent", onBack: () => setScreen("ticket") })}
      <div className="px-4 pt-4 lg:pt-6 lg:px-6 pb-8 lg:max-w-[640px] lg:mx-auto">
        <button onClick={() => setScreen("ticket")} className={`hidden lg:flex items-center gap-1.5 text-[12px] text-nn-500 hover:text-navy mb-4 ${cx.backBtn}`}>{I.back} Back to Alert</button>

        {/* Agent header */}
        <div className={`bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,25,101,0.06)] p-4 lg:p-5 mb-4 ${cx.card}`} style={{ animation: "scaleIn .3s ease" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-sea-300" style={{ animation: "float 3s ease infinite" }}>{I.sparkle}</div>
            <div>
              <h1 className="font-bold text-[15px] lg:text-[16px] text-navy">NovoVision Agent</h1>
              <p className="text-[11px] text-nn-500">Autonomous compliance resolution</p>
            </div>
            {agentReady && !agentResolved && <span className="ml-auto px-2 py-0.5 bg-ocean-50 text-ocean-800 text-[10px] font-medium rounded-full" style={{ animation: "bounceIn .4s ease" }}>Ready</span>}
            {agentResolved && <span className="ml-auto px-2 py-0.5 bg-ocean-100 text-ocean-800 text-[10px] font-medium rounded-full flex items-center gap-1" style={{ animation: "bounceIn .4s ease" }}>{I.check} Resolved</span>}
          </div>

          {/* Thinking steps */}
          <div className="space-y-2 mb-1">
            {agentSteps.map((step, i) => { const done = agentStep > i, active = agentStep === i; return (
              <div key={i} className="flex items-center gap-2.5" style={{ animation: `slideUp .25s ease ${i * 0.06}s both` }}>
                {done ? <div className="w-5 h-5 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .25s ease" }}>{I.check}</div>
                  : active ? <div className="w-5 h-5 border-[1.5px] border-sea-900 border-t-transparent rounded-full" style={{ animation: "spin .7s linear infinite" }} />
                  : <div className="w-5 h-5 border-[1.5px] border-nn-200 rounded-full" />}
                <span className={`text-[12px] transition-all duration-300 ${done ? "text-nn-600" : active ? "text-sea-900 font-medium" : "text-nn-300"}`}>{step}</span>
              </div>); })}
          </div>
          {agentReady && <div className="mt-3 pt-3 border-t border-nn-100 text-[11px] text-nn-500" style={{ animation: "slideUp .25s ease" }}>Analysis complete — <span className="font-medium text-navy">2 actions proposed</span></div>}
        </div>

        {/* Action cards */}
        {agentReady && (
          <div className="space-y-3">
            {/* ACTION 1: Remove alcohol from expense */}
            <div className={`bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,25,101,0.06)] overflow-hidden transition-all duration-300 ${cx.card} ${action1Done ? "ring-1 ring-ocean-300" : ""}`} style={{ animation: "scaleIn .3s ease" }}>
              <div className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-300 ${action1Done ? "bg-ocean-50" : "bg-nn-50 border-b border-nn-100"}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${action1Done ? "bg-ocean-100 text-ocean-700" : "bg-danger-50 text-danger-700"}`}>{action1Done ? <span style={{ animation: "checkPop .3s ease" }}>{I.check}</span> : I.scissors}</div>
                <span className="text-[12px] font-semibold text-navy flex-1">Action 1</span>
                {action1Done && <span className="text-[10px] text-ocean-700 font-medium" style={{ animation: "fadeIn .3s ease" }}>Completed</span>}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[13px] text-nn-900 mb-1">Remove alcoholic beverages from expense</h3>
                <p className="text-[11px] text-nn-500 mb-3">Deduct flagged alcohol items from the expense report in SAP Concur and adjust the reimbursable total.</p>
                <div className={`rounded-xl border p-3 mb-3 font-mono text-[11px] transition-all duration-500 ${action1Done ? "bg-ocean-50/50 border-ocean-200" : "bg-nn-50 border-nn-100"}`}>
                  <div className={`flex justify-between mb-1 transition-all duration-500 ${action1Done ? "line-through text-nn-400" : "text-danger-700"}`}>
                    <span>2x Rioja Reserva 2018</span><span>-68.00€</span>
                  </div>
                  <div className={`flex justify-between mb-2 transition-all duration-500 ${action1Done ? "line-through text-nn-400" : "text-danger-700"}`}>
                    <span>1x Copa Albariño</span><span>-12.00€</span>
                  </div>
                  <div className="border-t border-dashed border-nn-300 pt-2 flex justify-between font-bold">
                    <span className="text-nn-700">New total</span>
                    <div className="text-right">
                      {action1Done
                        ? <span className="text-ocean-800" style={{ animation: "bounceIn .4s ease" }}>236.80€</span>
                        : <><span className="text-nn-400 line-through text-[10px] mr-1.5">316.80€</span><span className="text-navy">236.80€</span></>}
                    </div>
                  </div>
                </div>
                {!action1Done && !action1Loading && <button onClick={handleAction1} className={`w-full py-2.5 bg-navy text-white rounded-xl font-medium text-[12px] hover:bg-navy/90 hover:shadow-[0_2px_8px_rgba(0,25,101,0.25)] flex items-center justify-center gap-2 ${cx.btn}`}>{I.scissors} Approve & Execute</button>}
                {action1Loading && <div className="w-full py-2.5 bg-sea-50 border border-sea-200 text-sea-900 rounded-xl font-medium text-[12px] flex items-center justify-center gap-2" style={{ animation: "scaleIn .2s ease" }}><div className="w-3.5 h-3.5 border-[1.5px] border-sea-900 border-t-transparent rounded-full" style={{ animation: "spin .7s linear infinite" }} />Updating SAP Concur...</div>}
                {action1Done && <div className="flex items-center gap-2 text-[11px] text-ocean-700 font-medium" style={{ animation: "slideUp .25s ease" }}><div className="w-4 h-4 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .3s ease" }}>{I.check}</div>Expense updated in SAP Concur — 80.00€ deducted</div>}
              </div>
            </div>

            {/* ACTION 2: Send policy reminder */}
            <div className={`bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,25,101,0.06)] overflow-hidden transition-all duration-300 ${cx.card} ${action2Done ? "ring-1 ring-ocean-300" : ""}`} style={{ animation: "scaleIn .3s ease .1s both" }}>
              <div className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-300 ${action2Done ? "bg-ocean-50" : "bg-nn-50 border-b border-nn-100"}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${action2Done ? "bg-ocean-100 text-ocean-700" : "bg-sea-50 text-sea-900"}`}>{action2Done ? <span style={{ animation: "checkPop .3s ease" }}>{I.check}</span> : I.mail}</div>
                <span className="text-[12px] font-semibold text-navy flex-1">Action 2</span>
                {action2Done && <span className="text-[10px] text-ocean-700 font-medium" style={{ animation: "fadeIn .3s ease" }}>Completed</span>}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[13px] text-nn-900 mb-1">Send policy reminder to employee</h3>
                <p className="text-[11px] text-nn-500 mb-3">Notify the responsible employee about the company&apos;s alcohol policy for healthcare professional events.</p>
                {/* Tone selector */}
                {!action2Done && (
                  <div className="flex items-center gap-2 mb-3" style={{ animation: "fadeIn .3s ease" }}>
                    <span className="text-[11px] text-nn-500">Tone:</span>
                    <div className="flex bg-nn-100 rounded-full p-0.5">
                      <button onClick={() => setSelectedTone("formal")} className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-200 ${selectedTone === "formal" ? "bg-white text-navy shadow-sm" : "text-nn-500 hover:text-nn-700"}`}>Formal</button>
                      <button onClick={() => setSelectedTone("friendly")} className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-200 ${selectedTone === "friendly" ? "bg-white text-navy shadow-sm" : "text-nn-500 hover:text-nn-700"}`}>Friendly</button>
                    </div>
                  </div>
                )}
                <div key={selectedTone} className={`rounded-xl border p-3 mb-3 text-[11px] transition-all duration-500 ${action2Done ? "bg-ocean-50/50 border-ocean-200" : "bg-nn-50 border-nn-100"}`} style={{ animation: "fadeIn .25s ease" }}>
                  <div className="space-y-1.5">
                    <div className="flex justify-between"><span className="text-nn-500">To</span><span className="font-medium text-nn-800">William Smith</span></div>
                    <div className="flex justify-between"><span className="text-nn-500">Subject</span><span className="font-medium text-nn-800">{toneMessages[selectedTone].subject}</span></div>
                    <div className="pt-1.5 mt-1.5 border-t border-dashed border-nn-300">
                      <span className="text-nn-500">Content preview</span>
                      <p className="text-nn-700 mt-1 leading-relaxed">{toneMessages[selectedTone].body.split("Farmaindustria Code — Art. 17.3").length > 1
                        ? <>{toneMessages[selectedTone].body.split("Farmaindustria Code — Art. 17.3")[0]}<span className="font-medium text-navy">Farmaindustria Code — Art. 17.3</span>{toneMessages[selectedTone].body.split("Farmaindustria Code — Art. 17.3")[1]}</>
                        : toneMessages[selectedTone].body}</p>
                    </div>
                  </div>
                </div>
                {!action2Done && !action2Loading && <button onClick={handleAction2} className={`w-full py-2.5 bg-navy text-white rounded-xl font-medium text-[12px] hover:bg-navy/90 hover:shadow-[0_2px_8px_rgba(0,25,101,0.25)] flex items-center justify-center gap-2 ${cx.btn}`}>{I.mail} Approve & Send</button>}
                {action2Loading && <div className="w-full py-2.5 bg-sea-50 border border-sea-200 text-sea-900 rounded-xl font-medium text-[12px] flex items-center justify-center gap-2" style={{ animation: "scaleIn .2s ease" }}><div className="w-3.5 h-3.5 border-[1.5px] border-sea-900 border-t-transparent rounded-full" style={{ animation: "spin .7s linear infinite" }} />Sending notification...</div>}
                {action2Done && <div className="flex items-center gap-2 text-[11px] text-ocean-700 font-medium" style={{ animation: "slideUp .25s ease" }}><div className="w-4 h-4 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700" style={{ animation: "checkPop .3s ease" }}>{I.check}</div>Policy reminder sent to William Smith</div>}
              </div>
            </div>

            {/* Resolve button */}
            {action1Done && action2Done && !agentResolved && (
              <button onClick={handleResolve} className={`w-full py-3 bg-ocean-800 text-white rounded-xl font-medium text-[13px] hover:bg-ocean-900 hover:shadow-[0_4px_16px_rgba(17,112,119,0.3)] shadow-[0_2px_8px_rgba(17,112,119,0.25)] flex items-center justify-center gap-2 ${cx.btn}`} style={{ animation: "slideUp .3s ease" }}>{I.check} Mark Alert as Resolved</button>
            )}
            {agentResolved && (
              <div className="bg-ocean-50 border border-ocean-200 rounded-2xl p-4 text-center" style={{ animation: "scaleIn .3s ease" }}>
                <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-700 mx-auto mb-2" style={{ animation: "checkPop .4s ease" }}><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                <p className="font-semibold text-[14px] text-ocean-900 mb-0.5">Alert Resolved</p>
                <p className="text-[11px] text-ocean-700">Returning to dashboard...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  /* ═══ RENDER ═══ */
  const renderContent = () => {
    if (screen === "loading") return LoadingScreen();
    if (screen === "evidences") return EvidenceList();
    if (screen === "ticket") return TicketDetail();
    if (screen === "agent") return AgentScreen();
    if (mobileTab === "inbox" && !inSubFlow) return MobileInbox();
    return Dashboard();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {Sidebar()}
      {screen === "dashboard" && LeftPanel()}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">{renderContent()}</div>
      {BottomNav()}
    </div>
  );
}
