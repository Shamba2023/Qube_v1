import { LayoutDashboard, CheckSquare, Layers, FileText, Settings, Users, LogOut, Shield, ClipboardCheck, BarChart3, Workflow, Sparkles, Link as LinkIcon, Banknote, Box, UserCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const managementTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'group-submission', label: 'GR Status', icon: Layers },
    { id: 'management-info', label: 'Management Information', icon: BarChart3 },
    { id: 'reporting', label: 'Statutory Reporting', icon: FileText },
    { id: 'finance-playground', label: 'Finance Playground', icon: Sparkles },
    { id: 'team', label: 'Team & Oversight', icon: Users },
  ];

  const workflowTabs = [
    { id: 'workflow', label: 'Period End Workflows', icon: CheckSquare },
    { id: 'group-reporting-workflow', label: 'GR Workflows', icon: Workflow },
    { id: 'reporting-risks', label: 'Controls & Compliance', icon: ClipboardCheck },
    { id: 'kyc-ler', label: 'KYC & LER', icon: UserCheck },
    { id: 'risk', label: 'Risk Management', icon: Shield },
    { id: 'settlements', label: 'Settlements & Payments', icon: Banknote },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <Box className="text-corporate-accent" size={32} strokeWidth={2.5} fill="none" />
        <div className="flex flex-col">
          <span className="font-extrabold text-white text-xl tracking-tight leading-none">QUBE</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">Shell Finance V1.0</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 px-3">Management Steps</div>
        {managementTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all group",
                activeTab === tab.id 
                  ? "bg-corporate-accent text-slate-900 shadow-md shadow-yellow-500/10" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <Icon size={16} className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-slate-900" : "text-slate-400")} />
              {tab.label}
            </button>
          );
        })}

        <div className="pt-10 text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 px-3">Critical Workflows</div>
        {workflowTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all group",
                activeTab === tab.id 
                  ? "bg-corporate-accent text-slate-900 shadow-md shadow-yellow-500/10" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <Icon size={16} className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-slate-900" : "text-slate-400")} />
              {tab.label}
            </button>
          );
        })}

        <div className="pt-10 text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 px-3">Administration</div>
        <button
          onClick={() => setActiveTab('quick-links')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all group",
            activeTab === 'quick-links' 
              ? "bg-corporate-accent text-slate-900 shadow-md shadow-yellow-500/10" 
              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
          )}
        >
          <LinkIcon size={16} className={cn("transition-transform group-hover:scale-110", activeTab === 'quick-links' ? "text-slate-900" : "text-slate-400")} />
          Quick Links
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 group">
          <Settings size={16} className="text-slate-400 group-hover:rotate-45 transition-transform" />
          Settings
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-700/30">
          <div className="w-8 h-8 rounded bg-corporate-accent flex items-center justify-center text-[10px] font-black text-slate-900">
            FC
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-xs font-bold text-white truncate">Edwin Kunkels</div>
            <div className="text-[10px] text-slate-500 truncate">Group Controller</div>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
