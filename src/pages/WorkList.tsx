import React, { useState } from "react";
import {
  CalendarCheck,
  FlaskConical,
  UserPlus,
  ClipboardList,
  FileSignature,
  AlertTriangle,
  MessageSquareWarning,
  ScanSearch,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  RefreshCw,
  Circle,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../types";

/* ─────────────────────────── mock data ─────────────────────────── */

const TASK_SUMMARY = [
  {
    icon: CalendarCheck,
    label: "Patient Appointments",
    count: 8,
    color: "blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: FlaskConical,
    label: "Lab Results to Review",
    count: 12,
    color: "violet",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: UserPlus,
    label: "New Patients",
    count: 4,
    color: "emerald",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: ClipboardList,
    label: "Test Orders Pending",
    count: 6,
    color: "amber",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: FileSignature,
    label: "Prescriptions to Sign",
    count: 3,
    color: "rose",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-400",
  },
];

const ALERT_SUMMARY = [
  {
    icon: AlertTriangle,
    label: "Critical Lab Results",
    count: 2,
    color: "rose",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300",
  },
  {
    icon: MessageSquareWarning,
    label: "Urgent Patient Message",
    count: 1,
    color: "amber",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
    badge:
      "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  },
  {
    icon: ScanSearch,
    label: "Abnormal Scan Result",
    count: 1,
    color: "orange",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    badge:
      "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  },
];

type Priority = "Critical" | "High" | "Normal" | "Low";
type Status = "Pending" | "In Progress" | "Done";
type Category =
  | "Lab"
  | "Appointment"
  | "Order"
  | "Prescription"
  | "Message"
  | "Imaging";

interface WorkItem {
  id: string;
  patient: string;
  mrn: string;
  category: Category;
  description: string;
  priority: Priority;
  status: Status;
  due: string;
  age: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: "W001",
    patient: "Robert Miller",
    mrn: "MRN-1145-Y",
    category: "Lab",
    description: "Critical ANC result — 0.4 ×10³/µL, action required",
    priority: "Critical",
    status: "Pending",
    due: "11:00 AM",
    age: "10m ago",
  },
  {
    id: "W002",
    patient: "Sarah Johnson",
    mrn: "MRN-8829-X",
    category: "Imaging",
    description: "Chest CT report available for radiologist review",
    priority: "High",
    status: "Pending",
    due: "12:00 PM",
    age: "2h ago",
  },
  {
    id: "W003",
    patient: "Elena Rodriguez",
    mrn: "MRN-3390-Z",
    category: "Prescription",
    description: "Sign CAPOX Cycle 4 prescription order",
    priority: "High",
    status: "Pending",
    due: "2:00 PM",
    age: "30m ago",
  },
  {
    id: "W004",
    patient: "James Park",
    mrn: "MRN-2271-A",
    category: "Appointment",
    description: "New patient consultation — Stage III NSCLC",
    priority: "Normal",
    status: "In Progress",
    due: "9:30 AM",
    age: "Now",
  },
  {
    id: "W005",
    patient: "Maria Santos",
    mrn: "MRN-4412-B",
    category: "Order",
    description: "PET-CT scan order pending authorization",
    priority: "Normal",
    status: "Pending",
    due: "3:00 PM",
    age: "1h ago",
  },
  {
    id: "W006",
    patient: "Thomas Wright",
    mrn: "MRN-5503-C",
    category: "Lab",
    description: "CBC + CMP post-cycle 3 results to review",
    priority: "Normal",
    status: "Pending",
    due: "4:00 PM",
    age: "45m ago",
  },
  {
    id: "W007",
    patient: "Angela Kim",
    mrn: "MRN-6614-D",
    category: "Message",
    description: "Urgent patient message — severe nausea, grade 3 concern",
    priority: "Critical",
    status: "Pending",
    due: "ASAP",
    age: "5m ago",
  },
  {
    id: "W008",
    patient: "David Chen",
    mrn: "MRN-7725-E",
    category: "Appointment",
    description: "Follow-up: Response assessment after Pembrolizumab cycle 6",
    priority: "Normal",
    status: "In Progress",
    due: "10:30 AM",
    age: "2h ago",
  },
  {
    id: "W009",
    patient: "Susan Lee",
    mrn: "MRN-8836-F",
    category: "Order",
    description: "Bone marrow biopsy order — pending scheduling confirmation",
    priority: "High",
    status: "Pending",
    due: "5:00 PM",
    age: "3h ago",
  },
  {
    id: "W010",
    patient: "Carlos Rivera",
    mrn: "MRN-9947-G",
    category: "Prescription",
    description: "Renew Lenalidomide maintenance — insurance pre-auth needed",
    priority: "Low",
    status: "Pending",
    due: "EOD",
    age: "4h ago",
  },
  {
    id: "W011",
    patient: "Robert Miller",
    mrn: "MRN-1145-Y",
    category: "Appointment",
    description: "Telehealth visit — toxicity check, weekly call",
    priority: "Normal",
    status: "Done",
    due: "8:00 AM",
    age: "3h ago",
  },
  {
    id: "W012",
    patient: "Sarah Johnson",
    mrn: "MRN-8829-X",
    category: "Lab",
    description: "HER2 IHC re-test result — awaiting pathology confirmation",
    priority: "High",
    status: "Done",
    due: "8:30 AM",
    age: "3h ago",
  },
];

/* ─────────────────────────── helpers ───────────────────────────── */

const PRIORITY_STYLES: Record<Priority, string> = {
  Critical:
    "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700",
  High: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700",
  Normal:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
  Low: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
};

const STATUS_STYLES: Record<Status, string> = {
  Pending: "text-amber-600 dark:text-amber-400",
  "In Progress": "text-blue-600 dark:text-blue-400",
  Done: "text-emerald-600 dark:text-emerald-400",
};

const STATUS_ICON: Record<Status, React.ReactNode> = {
  Pending: <Circle className="w-3.5 h-3.5" />,
  "In Progress": <Clock className="w-3.5 h-3.5" />,
  Done: <CheckCircle2 className="w-3.5 h-3.5" />,
};

const CATEGORY_COLORS: Record<Category, string> = {
  Lab: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  Appointment:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  Order: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  Prescription:
    "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
  Message:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  Imaging:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
};

const ALL_CATEGORIES: Category[] = [
  "Lab",
  "Appointment",
  "Order",
  "Prescription",
  "Message",
  "Imaging",
];
const ALL_PRIORITIES: Priority[] = ["Critical", "High", "Normal", "Low"];
const ALL_STATUSES: Status[] = ["Pending", "In Progress", "Done"];

/* ─────────────────────────── component ─────────────────────────── */

export const WorkList: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [lastRefreshed] = useState(new Date());

  const filtered = WORK_ITEMS.filter((item) => {
    if (filterCategory !== "All" && item.category !== filterCategory)
      return false;
    if (filterPriority !== "All" && item.priority !== filterPriority)
      return false;
    if (filterStatus !== "All" && item.status !== filterStatus) return false;
    return true;
  });

  const pendingCount = WORK_ITEMS.filter((i) => i.status !== "Done").length;
  const criticalCount = WORK_ITEMS.filter(
    (i) => i.priority === "Critical" && i.status !== "Done",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-clinical-blue" />
            Work List
          </h1>
          <p className="text-slate-500 dark:text-slate-300 mt-0.5">
            Today's clinical tasks for Dr. Chen ·{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              {criticalCount} critical
            </span>{" "}
            ·{" "}
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {pendingCount} pending
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <RefreshCw className="w-3.5 h-3.5" />
          Last updated{" "}
          {lastRefreshed.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Tasks card */}
        <div className="clinical-card p-5 md:col-span-2 lg:col-span-2">
          <h2 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4" />
            Today's Tasks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TASK_SUMMARY.map((t) => (
              <div
                key={t.label}
                className={cn(
                  "rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:shadow-sm transition-shadow",
                  t.bg,
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    t.bg,
                  )}
                >
                  <t.icon className={cn("w-4 h-4", t.text)} />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-xl font-extrabold leading-none",
                      t.text,
                    )}
                  >
                    {t.count}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    {t.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts card */}
        <div className="clinical-card p-5">
          <h2 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Alerts
          </h2>
          <div className="space-y-3">
            {ALERT_SUMMARY.map((a) => (
              <div
                key={a.label}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <a.icon className={cn("w-4 h-4", a.text)} />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {a.label}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold min-w-[20px] text-center px-1.5 py-0.5 rounded-md",
                    a.badge,
                  )}
                >
                  {a.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="clinical-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            Filter by:
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {(["All", ...ALL_CATEGORIES] as (Category | "All")[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  filterCategory === c
                    ? "bg-clinical-blue text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Priority filter */}
          <div className="flex flex-wrap gap-1.5">
            {(["All", ...ALL_PRIORITIES] as (Priority | "All")[]).map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  filterPriority === p
                    ? "bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Status filter */}
          <div className="flex flex-wrap gap-1.5">
            {(["All", ...ALL_STATUSES] as (Status | "All")[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  filterStatus === s
                    ? "bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-medium">
            {filtered.length} of {WORK_ITEMS.length} items
          </div>
        </div>
      </div>

      {/* ── Work items table ── */}
      <div className="clinical-card overflow-hidden">
        {/* Table header */}
        <div className="border-b border-clinical-border dark:border-dark-border bg-slate-50 dark:bg-slate-800/50 px-5 py-3 grid grid-cols-12 gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-3 hidden md:block">Description</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-1 hidden sm:block">Status</div>
          <div className="col-span-1">Due</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-slate-100 dark:divide-dark-border">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500">
              <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">
                No work items match your filters.
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={cn(
                  "px-5 py-3.5 grid grid-cols-12 gap-3 items-center hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group",
                  item.status === "Done" && "opacity-50",
                )}
              >
                {/* ID */}
                <div className="col-span-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {item.id}
                </div>

                {/* Patient */}
                <div className="col-span-3">
                  <p
                    className={cn(
                      "text-sm font-semibold text-slate-900 dark:text-white group-hover:text-clinical-blue transition-colors",
                      item.status === "Done" && "line-through",
                    )}
                  >
                    {item.patient}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {item.mrn}
                  </p>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-lg",
                      CATEGORY_COLORS[item.category],
                    )}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                <div className="col-span-3 hidden md:block">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {item.age}
                  </p>
                </div>

                {/* Priority */}
                <div className="col-span-1">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap",
                      PRIORITY_STYLES[item.priority],
                    )}
                  >
                    {item.priority}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-1 hidden sm:flex items-center gap-1.5">
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      STATUS_STYLES[item.status],
                    )}
                  >
                    {STATUS_ICON[item.status]}
                    <span className="text-[10px] font-bold">{item.status}</span>
                  </span>
                </div>

                {/* Due */}
                <div className="col-span-1 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    {item.due}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
