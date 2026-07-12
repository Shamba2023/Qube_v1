/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import SummaryCharts from './components/SummaryCharts';
import TaskList from './components/TaskList';
import SubmissionStatus from './components/SubmissionStatus';
import DashboardTables from './components/DashboardTables';
import FiltersBar from './components/FiltersBar';
import { cn } from './lib/utils';
import { CloseType } from './types';
import { MOCK_METRICS, MOCK_TASKS, MOCK_SUBMISSIONS, MOCK_STATUTORY_REPORTS } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, Download, FileSpreadsheet, Shield, ChevronDown, Calendar, 
  Sparkles, Bot, Send, Terminal, Cpu, Layers, Link as LinkIcon, 
  ExternalLink, MessageSquare, CheckSquare, Share2, BarChart3, Banknote, Coins, ReceiptText, CreditCard, ArrowRight 
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const FINANCIAL_DATA = [
  { period: 'Past 2', cffo: 3800, cfff: -1000, cffi: -3200, revenue: 12000, opex: 8500, netProfit: 2500 },
  { period: 'Past 1', cffo: 4200, cfff: -1200, cffi: -2800, revenue: 13500, opex: 9200, netProfit: 3100 },
  { period: 'Current', cffo: 4850, cfff: -1500, cffi: -2400, revenue: 15200, opex: 9800, netProfit: 4200 },
  { period: 'Forecast 1', cffo: 5100, cfff: -1100, cffi: -2600, revenue: 16800, opex: 10500, netProfit: 4800 },
  { period: 'Forecast 2', cffo: 5400, cfff: -950, cffi: -2300, revenue: 18500, opex: 11200, netProfit: 5500 },
];

const formatMillions = (val: number) => `$${(val / 1000).toFixed(1)}M`;

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [closeType, setCloseType] = useState<CloseType>('MONTHLY');
  const [currentPeriod, setCurrentPeriod] = useState('Oct 2023');
  const [selectedControl, setSelectedControl] = useState('D1.16.a.1');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight uppercase">Performance KPI Monitor</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Variance Analysis | Current Month vs Benchmark</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <FileSpreadsheet size={12} className="text-emerald-600" />
                  Excel Data
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <Download size={12} className="text-blue-600" />
                  Export PDF
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x border border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all shadow-md active:scale-95">
                  <Sparkles size={12} className="text-white animate-pulse" />
                  Ask Qube
                </button>
              </div>
            </div>

            <FiltersBar />
            
            <DashboardTables 
              submissions={MOCK_SUBMISSIONS} 
              statutoryReports={MOCK_STATUTORY_REPORTS} 
              onNavigate={(tab) => setActiveTab(tab)}
            />

            <div className="pt-8 border-t border-slate-100">
              <div className="mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Financial Performance Summary</h3>
                <div className="h-1 w-20 bg-corporate-accent rounded-full mb-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Revenue</h3>
                  <div className="h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={FINANCIAL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="period" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                        />
                        <YAxis hide domain={[0, 20000]} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24}>
                          <LabelList dataKey="revenue" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#6366f1' }} offset={10} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed italic border-t border-slate-50 pt-3 mt-auto">
                    Revenue shows steady growth over the last quarter, driven by strong performance in emerging markets. Strategic focus on high-value services is yielding positive conversion rates.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Operating Expenses</h3>
                  <div className="h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={FINANCIAL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="period" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                        />
                        <YAxis hide domain={[0, 15000]} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="opex" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={24}>
                          <LabelList dataKey="opex" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#f59e0b' }} offset={10} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed italic border-t border-slate-50 pt-3 mt-auto">
                    OpEx controlled within budget limits despite inflationary pressures. Efficiency gains in supply chain and optimized workforce management helped maintain margins.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Cash Flow From Operations (CFFO)</h3>
                  <div className="h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={FINANCIAL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="period" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                        />
                        <YAxis hide domain={[0, 8000]} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="cffo" 
                          stroke="#10b981" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 6 }}
                        >
                          <LabelList dataKey="cffo" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#10b981' }} offset={10} />
                        </Line>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed italic border-t border-slate-50 pt-3 mt-auto">
                    Cash flow remains robust, significantly outpacing net income. Efficient working capital management and strong collections cycles contributed to a healthy cash position for upcoming investments.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Workflow Statistics (Last 3m vs Prior 3m)</h3>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Workflow Entity</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Current Count</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Current Value</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Prior Count</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Prior Value</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Variance (Value)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { name: 'Revenue (Invoicing)', currentCount: 1240, currentValue: 45200000, priorCount: 1180, priorValue: 42500000, color: 'text-indigo-600' },
                        { name: 'Operating Expenses', currentCount: 3850, currentValue: 28500000, priorCount: 3620, priorValue: 26800000, color: 'text-amber-600' },
                        { name: 'CFFO (Cash Cycle)', currentCount: 820, currentValue: 14800000, priorCount: 780, priorValue: 13500000, color: 'text-emerald-600' },
                      ].map((item) => {
                        const variance = ((item.currentValue - item.priorValue) / item.priorValue) * 100;
                        return (
                          <tr key={item.name} className="hover:bg-slate-50/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={cn("w-2 h-2 rounded-full", item.color === 'text-indigo-600' ? 'bg-indigo-500' : item.color === 'text-amber-600' ? 'bg-amber-500' : 'bg-emerald-500')}></div>
                                <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center text-xs font-medium text-slate-600">{item.currentCount.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-xs font-black text-slate-900">${(item.currentValue / 1000000).toFixed(1)}M</td>
                            <td className="px-6 py-4 text-center text-xs font-medium text-slate-400">{item.priorCount.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-xs font-bold text-slate-400">${(item.priorValue / 1000000).toFixed(1)}M</td>
                            <td className="px-6 py-4 text-right">
                              <span className={cn(
                                "text-[10px] font-black px-2 py-0.5 rounded border",
                                variance >= 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                              )}>
                                {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'workflow':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="flex justify-between items-start mb-6">
               <div>
                <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Period End Workflows</h2>
                <p className="text-sm text-slate-500 mt-1">Managing all critical steps for the {closeType.toLowerCase()} accounting cycle.</p>
               </div>
               <div className="hidden sm:flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                 <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Overall Status</p>
                   <p className="text-lg font-black text-corporate-navy leading-none">72%</p>
                 </div>
                 <div className="relative w-12 h-12">
                   <svg className="w-12 h-12 transform -rotate-90">
                     <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                     <circle 
                        cx="24" cy="24" r="20" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        fill="transparent" 
                        strokeDasharray={125.6} 
                        strokeDashoffset={125.6 * (1 - 0.72)} 
                        className="text-corporate-navy transition-all duration-1000 ease-out" 
                        strokeLinecap="round"
                    />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-corporate-navy">72%</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
            <FiltersBar />
            <TaskList tasks={MOCK_TASKS} />
          </motion.div>
        );
      case 'group-submission':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Group Reporting Status</h2>
              <p className="text-sm text-slate-500 mt-1">Real-time visibility into entity book closures and group eliminations.</p>
            </div>

            <FiltersBar />
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
              <div className="xl:col-span-1">
                <div className="bg-slate-900 text-white p-5 rounded-xl shadow-xl relative overflow-hidden border border-slate-800 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-slate-500">Consolidation Progress</h3>
                    <div className="flex items-end gap-3 mb-2">
                      <span className="text-3xl font-extrabold tracking-tighter">64%</span>
                      <span className="text-[9px] font-black text-emerald-500 mb-1 tracking-widest uppercase">Validated</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6 border border-slate-700">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '64%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      />
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-corporate-accent text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-[0.98]">
                    Initiate Final Sign-Off
                  </button>
                </div>
              </div>
              <div className="xl:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
                  {MOCK_METRICS.slice(0, 4).map((metric) => (
                    <MetricCard key={metric.label} metric={metric} closeType={closeType} />
                  ))}
                </div>
              </div>
            </div>

            <SubmissionStatus submissions={MOCK_SUBMISSIONS} />

            <SummaryCharts closeType={closeType} />
          </motion.div>
        );
      case 'group-reporting-workflow':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">GR Workflows</h2>
                <p className="text-sm text-slate-500 mt-1">Sequential steps and progress monitoring for group-level reporting cycle.</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Overall Status</p>
                  <p className="text-lg font-black text-corporate-navy leading-none">45%</p>
                </div>
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                    <circle 
                      cx="24" cy="24" r="20" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="transparent" 
                      strokeDasharray={125.6} 
                      strokeDashoffset={125.6 * (1 - 0.45)} 
                      className="text-corporate-navy transition-all duration-1000 ease-out" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black text-corporate-navy">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FiltersBar />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
              <div className="xl:col-span-2">
                <div className="mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Workflow 1: Group Submission</h3>
                  <div className="h-1 w-20 bg-corporate-accent rounded-full mb-6"></div>
                </div>
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { label: 'Import ERP Data', status: 'completed' },
                    { label: 'Review Draft Financials', status: 'active' },
                    { label: 'Pass Post-Close-Adj', status: 'pending' },
                    { label: 'Final Review', status: 'pending' },
                    { label: 'Submit', status: 'pending' }
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <button className={cn(
                        "px-4 py-2 rounded-lg text-[11px] font-bold transition-all border shadow-sm",
                        step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-2 ring-corporate-navy/20" :
                        "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      )}>
                        {step.label}
                      </button>
                      {i < arr.length - 1 && (
                        <div className={cn(
                          "h-px w-6",
                          step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                        )} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
                  <div className="bg-amber-100 p-2 rounded-xl h-fit">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-800">Critical Consolidation Warning</h4>
                    <p className="text-xs text-amber-700/80 mt-1 leading-relaxed">
                      3 entities are currently offline or failed their initial validation tests. 
                      Group elimination for Shell Energy Asia will be blocked until the intercompany matching task is marked as complete.
                    </p>
                    <button className="mt-4 text-xs font-bold text-amber-900 underline">Investigate Mismatches</button>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="mb-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Workflow 2: Commentary</h3>
                    <div className="h-1 w-20 bg-corporate-accent rounded-full mb-6"></div>
                  </div>
                  <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                    {[
                      { label: 'Select Material lines', status: 'completed' },
                      { label: 'Generate AI Commentaries', status: 'active' },
                      { label: 'Review and Validate', status: 'pending' },
                      { label: 'Send for Approval', status: 'pending' },
                      { label: 'Submit', status: 'pending' }
                    ].map((step, i, arr) => (
                      <div key={step.label} className="flex items-center gap-2 shrink-0">
                        <button className={cn(
                          "px-4 py-2 rounded-lg text-[11px] font-bold transition-all border shadow-sm",
                          step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-2 ring-corporate-navy/20" :
                          "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                        )}>
                          {step.label}
                        </button>
                        {i < arr.length - 1 && (
                          <div className={cn(
                            "h-px w-6",
                            step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                          )} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <div className="mb-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Workflow 4: Sectorise</h3>
                    <div className="h-1 w-20 bg-corporate-accent rounded-full mb-6"></div>
                  </div>
                  <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                    {[
                      { label: 'Identify Non-Reportable', status: 'completed' },
                      { label: 'Apportion Revenue', status: 'active' },
                      { label: 'Apportion Costs', status: 'pending' },
                      { label: 'Apportion Cashflows', status: 'pending' },
                      { label: 'Review & Submit', status: 'pending' }
                    ].map((step, i, arr) => (
                      <div key={step.label} className="flex items-center gap-2 shrink-0">
                        <button className={cn(
                          "px-4 py-2 rounded-lg text-[11px] font-bold transition-all border shadow-sm",
                          step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-2 ring-corporate-navy/20" :
                          "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                        )}>
                          {step.label}
                        </button>
                        {i < arr.length - 1 && (
                          <div className={cn(
                            "h-px w-6",
                            step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                          )} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      <span className="font-bold text-corporate-navy">Scope:</span> Apportion revenue, costs and cashflows of non-reportable sectors to reportable sectors to ensure full compliance with segmental reporting standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 border-b border-slate-50 pb-3">Close Deadlines</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Trial Balance Run', date: 'Apr 06', status: 'WD+04', urgent: true },
                      { label: 'Elimination Entries', date: 'Apr 07', status: 'WD+05', urgent: false },
                      { label: 'Tax Validation', date: 'Apr 08', status: 'WD+06', urgent: false },
                    ].map((d, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-slate-700">{d.label}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{d.date}</span>
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${d.urgent ? 'bg-red-50 text-corporate-red border-red-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                          {d.status}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2">
                       <p className="text-[10px] text-slate-400 italic">Financial books remain locked until regional audit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'kyc-ler':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Compliance & Rationalization</h2>
              <p className="text-sm text-slate-500 mt-1">Strategic oversight for Know Your Company and Legal Entity Rationalization programs.</p>
            </div>
            
            <FiltersBar />

            <div className="mt-8 space-y-12">
              {/* Section 1: Know Your Company (KYC) */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 bg-amber-400 h-8 rounded-full" />
                  <div>
                    <h3 className="text-xl font-black text-corporate-navy uppercase tracking-tighter">Know Your Company (KYC)</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase">Customer & Counterparty Integrity</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Verification Status by Entity</h4>
                    <div className="space-y-4">
                      {[
                        { entity: 'Shell Energy Asia Pacific', status: 'Verified', deadline: '2026-12-31', progress: 100, risk: 'Low' },
                        { entity: 'Shell Treasury Centre B.V.', status: 'Reviewing', deadline: '2026-06-15', progress: 60, risk: 'Medium' },
                        { entity: 'Digital Global Solutions Ltd', status: 'Expiring', deadline: '2026-05-20', progress: 85, risk: 'High' },
                        { entity: 'S-Energy Trading Hamburg', status: 'Pending', deadline: '2026-08-10', progress: 15, risk: 'Low' }
                      ].map((item) => (
                        <div key={item.entity} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-2 h-2 rounded-full animate-pulse",
                                item.risk === 'Low' ? "bg-emerald-500" : item.risk === 'Medium' ? "bg-amber-500" : "bg-rose-500"
                              )} />
                              <div>
                                <p className="text-[11px] font-black text-slate-900">{item.entity}</p>
                                <p className="text-[10px] text-slate-500 font-medium">Validation: {item.deadline}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter",
                              item.status === 'Verified' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              item.status === 'Reviewing' ? "bg-blue-50 text-blue-600 border-blue-100" :
                              item.status === 'Expiring' ? "bg-rose-50 text-rose-600 border-rose-100" :
                              "bg-amber-50 text-amber-600 border-amber-100"
                            )}>
                              {item.status}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000",
                                item.progress === 100 ? "bg-emerald-500" : "bg-corporate-navy"
                              )}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                      <h4 className="text-xs font-black text-amber-900 uppercase mb-4">KYC Alert Center</h4>
                      <div className="space-y-3">
                        <div className="bg-white/80 p-3 rounded-lg text-[11px] text-amber-800 border border-amber-200 font-bold">
                          ⚠️ 4 Entities require immediate documentation updates before May 20th.
                        </div>
                        <div className="bg-white/80 p-3 rounded-lg text-[11px] text-amber-800 border border-amber-200 font-bold">
                          📋 SAR regulatory update manual draft ready for review.
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-4 bg-corporate-navy text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg shadow-blue-900/10 active:scale-95">
                      Initiate New Review
                    </button>
                  </div>
                </div>
              </section>

              {/* Section 2: Legal Entity Rationalization */}
              <section className="pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 bg-blue-500 h-8 rounded-full" />
                  <div>
                    <h3 className="text-xl font-black text-corporate-navy uppercase tracking-tighter">Legal Entity Rationalization</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase">Corporate Structure Optimization</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest text-center">Entity Reduction Goal</h4>
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 * 0.22} className="text-blue-500" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-slate-900 leading-none">78%</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase">Target</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                        Achieved reduction of <span className="font-bold text-blue-600">42 dormant entities</span> in FY25. On track to reach goal of 180 total entities by Q4.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Rationalization Workflow Status</h4>
                    <div className="space-y-4">
                      {[
                        { step: 'Dormant Entity Analysis', status: 'Completed', owner: 'M. CHEN', date: 'Mar 12' },
                        { step: 'Legal Structure Re-mapping', status: 'In Progress', owner: 'S. KNIGHT', date: 'Apr 25' },
                        { step: 'Intercompany Balance Clearance', status: 'Pending', owner: 'T. WOODS', date: 'Jun 15' },
                        { step: 'Final Liquidator Filing', status: 'Locked', owner: 'E. KUNKELS', date: '-' }
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                              step.status === 'Completed' ? "bg-emerald-100 text-emerald-700" :
                              step.status === 'In Progress' ? "bg-blue-100 text-blue-700 animate-pulse" :
                              "bg-slate-100 text-slate-400"
                            )}>
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-slate-800">{step.step}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[9px] text-corporate-navy font-black uppercase opacity-60">{step.owner}</span>
                                <span className="text-[14px] text-slate-300 leading-none">•</span>
                                <span className="text-[9px] text-slate-400 font-bold uppercase">{step.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-tighter transition-all group-hover:scale-105",
                              step.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              step.status === 'In Progress' ? "bg-blue-50 text-blue-600 border-blue-100" :
                              "bg-slate-50 text-slate-400 border-slate-200"
                            )}>
                              {step.status}
                            </span>
                            <button className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:bg-corporate-navy hover:text-white transition-all opacity-0 group-hover:opacity-100">
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        );
      case 'management-info':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Management Information</h2>
              <p className="text-sm text-slate-500 mt-1">Financial performance insights and operational KPIs.</p>
            </div>
            
            <FiltersBar />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Revenue</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FINANCIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                      />
                      <YAxis hide domain={[0, 20000]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24}>
                        <LabelList dataKey="revenue" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#6366f1' }} offset={10} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Financial Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Revenue shows consistent quarterly growth, driven by expansion into APAC markets and robust demand for digital solutions. Current period performance exceeded budget by 12%, with a strong pipeline supporting aggressive forecast targets for coming periods.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Operating Expenses</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FINANCIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                      />
                      <YAxis hide domain={[0, 15000]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="opex" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={24}>
                        <LabelList dataKey="opex" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#f59e0b' }} offset={10} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Financial Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Operating expenses are scaling in line with revenue growth, reflecting controlled investments in R&D and talent acquisition. Strategic cost-optimization initiatives implemented in the previous period have stabilized the overhead ratio, ensuring sustainable margin expansion.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Net Profit</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FINANCIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                      />
                      <YAxis hide domain={[0, 7000]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="netProfit" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={24}>
                        <LabelList dataKey="netProfit" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#8b5cf6' }} offset={10} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Financial Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Net profitability is trending upwards, benefiting from operating leverage and improved product mix. The current period recorded a healthy margin expansion. Forecasted improvements reflect anticipated efficiencies in global supply chain operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Cash Flow From Operations (CFFO)</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={FINANCIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                      />
                      <YAxis hide domain={[0, 8000]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cffo" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                        animationDuration={1500}
                      >
                        <LabelList dataKey="cffo" position="top" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#10b981' }} offset={10} />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Financial Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Cash from operations remains strong and positive, primarily due to high collection efficiency and optimized inventory turnover. The upward trajectory confirms the model's cash-generative nature, providing ample liquidity for reinvestment.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Cash Flow From Financing (CFFF)</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={FINANCIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                      />
                      <YAxis hide domain={[-3000, 0]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cfff" 
                        stroke="#f43f5e" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                        animationDuration={1500}
                      >
                        <LabelList dataKey="cfff" position="bottom" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#f43f5e' }} offset={10} />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Financial Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Financing cash flows reflect scheduled debt repayments and strategic dividend distributions. Future forecasts anticipate a shift towards lower interest expense as high-cost liabilities are replaced with more efficient capital structures.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Cash Flow From Investing (CFFI)</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={FINANCIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                      />
                      <YAxis hide domain={[-6000, 0]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cffi" 
                        stroke="#0ea5e9" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                        animationDuration={1500}
                      >
                        <LabelList dataKey="cffi" position="bottom" formatter={formatMillions} style={{ fontSize: '8px', fontWeight: 'bold', fill: '#0ea5e9' }} offset={10} />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Financial Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Investing activities highlight capital expenditure for digital infrastructure and core asset upgrades. As projects move towards completion, the intensity of investing outflows is expected to decrease, improving the overall free cash flow profile.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'reporting-risks':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Controls & Compliance</h2>
              <p className="text-sm text-slate-500 mt-1">Internal controls over financial reporting (ICFR) and disclosure risk management.</p>
            </div>
            <FiltersBar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Control Effectiveness Heatmap</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">Sox controls</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'D1.16.a.1 - Management Review', score: 88, status: 'Satisfactory' },
                        { label: 'D1.16.a.2 - Post Close Adjustment', score: 92, status: 'Satisfactory' },
                        { label: 'D2.3.a.1 - Supplementary Lines', score: 95, status: 'Satisfactory' },
                        { label: 'Dx.x.x.x - CCTD', score: 82, status: 'Requires Review' }
                      ].map(control => (
                        <div key={control.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div>
                            <p className="text-[11px] font-bold text-slate-800">{control.label}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{control.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-black text-corporate-navy">{control.score}%</p>
                            <div className="w-24 h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  control.score > 90 ? "bg-emerald-500" : control.score > 80 ? "bg-amber-500" : "bg-rose-500"
                                )} 
                                style={{ width: `${control.score}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-6">Financial Reporting Errors and Learning From Incidents</h3>
                <div className="space-y-6">
                  {[
                    { label: 'FRE (Financial Reporting Errors)', open: 2, closed: 8, total: 10 },
                    { label: 'LFI (Learning From Incidents)', open: 1, closed: 4, total: 5 }
                  ].map((kpi) => (
                    <div key={kpi.label}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-black text-slate-900 tracking-wider bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">{kpi.label}</span>
                        <span className="text-[10px] font-bold text-slate-500">Total: {kpi.total}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex flex-col items-center">
                          <span className="text-[10px] font-bold text-rose-500 uppercase mb-1">Open</span>
                          <span className="text-lg font-black text-rose-700">{kpi.open}</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex flex-col items-center">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Closed</span>
                          <span className="text-lg font-black text-emerald-700">{kpi.closed}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-bold text-corporate-navy tracking-tight mb-6">Controls Workflow</h3>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Choose Control Number</label>
                  <select 
                    value={selectedControl} 
                    onChange={(e) => setSelectedControl(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-corporate-navy/20 active:scale-[0.98] transition-all min-w-[240px]"
                  >
                    <option value="D1.16.a.1">D1.16.a.1 - Management Review</option>
                    <option value="D1.16.a.2">D1.16.a.2 - Post Close Adjustment</option>
                    <option value="D2.3.a.1">D2.3.a.1 - Supplementary Lines</option>
                    <option value="Dx.x.x.x">Dx.x.x.x - CCTD</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { label: 'Open Workings', status: 'completed' },
                  { label: 'Reconcile', status: 'completed' },
                  { label: 'Add Evidence', status: 'active' },
                  { label: 'Summary', status: 'pending' },
                  { label: 'Check', status: 'pending' },
                  { label: 'Submit', status: 'pending' },
                  { label: 'Supervisory Review', status: 'pending' }
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex items-center gap-2 shrink-0">
                    <div className={cn(
                      "px-4 py-3 rounded-xl text-[11px] font-black transition-all border shadow-sm flex flex-col items-center min-w-[120px]",
                      step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-4 ring-corporate-navy/10" :
                      "bg-white text-slate-400 border-slate-200"
                    )}>
                      <span className="opacity-50 text-[9px] mb-1">Step 0{i + 1}</span>
                      {step.label}
                    </div>
                    {i < arr.length - 1 && (
                      <div className={cn(
                        "h-px w-8 flex-shrink-0",
                        step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'reporting':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Statutory Reporting Engine</h2>
              <p className="text-sm text-slate-500 mt-1">Management of local legal entity financial statements and audit workflows.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="relative group">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-corporate-accent/20 transition-all cursor-pointer min-w-[180px]">
                  <option>Choose country</option>
                  <option>United Kingdom</option>
                  <option>Netherlands</option>
                  <option>United States</option>
                  <option>Singapore</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative group">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-corporate-accent/20 transition-all cursor-pointer min-w-[220px]">
                  <option>Choose legal entity</option>
                  <option>Shell Treasury B.V.</option>
                  <option>Shell Energy Asia</option>
                  <option>Digital Solutions Ltd</option>
                  <option>Global Marketing Corp</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Statutory Submission Pipeline</h3>
                <div className="space-y-4">
                  {[
                    { entity: 'Shell Energy Asia', status: 'In Review', deadline: 'May 15, 2026', progress: 75 },
                    { entity: 'Shell Treasury B.V.', status: 'Drafting', deadline: 'June 30, 2026', progress: 40 },
                    { entity: 'Digital Solutions Ltd', status: 'Audit Ready', deadline: 'May 10, 2026', progress: 95 }
                  ].map((item) => (
                    <div key={item.entity} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[11px] font-black text-slate-900">{item.entity}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Deadline: {item.deadline}</p>
                        </div>
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter",
                          item.status === 'Audit Ready' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          item.status === 'In Review' ? "bg-blue-50 text-blue-600 border-blue-100" :
                          "bg-amber-50 text-amber-600 border-amber-100"
                        )}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-corporate-navy rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Auditor Queries</h3>
                <div className="space-y-3">
                  {[
                    { id: 'Q-4492', topic: 'Fixed Asset Impairment', severity: 'Medium' },
                    { id: 'Q-4501', topic: 'Related Party Disclosures', severity: 'High' },
                    { id: 'Q-4512', topic: 'Deferred Tax Asset Recognition', severity: 'Low' }
                  ].map(query => (
                    <div key={query.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        query.severity === 'High' ? "bg-rose-500" : query.severity === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                      )} />
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-800">{query.topic}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{query.id} • {query.severity} Intensity</p>
                      </div>
                      <button className="text-[10px] font-black text-corporate-navy opacity-0 group-hover:opacity-100 transition-opacity">Respond →</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-12 pb-12 border-t border-slate-200 pt-12">
              <div>
                <h3 className="text-xl font-bold text-corporate-navy tracking-tight mb-6">Workflow 1: Preparation</h3>
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { label: 'Start', status: 'completed' },
                    { label: 'Import Numbers', status: 'completed' },
                    { label: 'Import Standard Disclosures', status: 'completed' },
                    { label: 'Add Tables', status: 'active' },
                    { label: 'Check', status: 'pending' },
                    { label: 'Manual Override', status: 'pending' },
                    { label: 'Self Review', status: 'pending' },
                    { label: 'Submit', status: 'pending' },
                    { label: 'Supervisor Review', status: 'pending' },
                    { label: 'Tax Review', status: 'pending' },
                    { label: 'Audit Submission', status: 'pending' }
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <div className={cn(
                        "px-4 py-3 rounded-xl text-[10px] font-black transition-all border shadow-sm flex flex-col items-center min-w-[110px]",
                        step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-4 ring-corporate-navy/10" :
                        "bg-white text-slate-400 border-slate-200"
                      )}>
                        <span className="opacity-50 text-[8px] mb-1">Step {String(i + 1).padStart(2, '0')}</span>
                        {step.label}
                      </div>
                      {i < arr.length - 1 && (
                        <div className={cn(
                          "h-px w-6 flex-shrink-0",
                          step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-corporate-navy tracking-tight mb-6">Workflow 2: Audit Details</h3>
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { label: 'Start', status: 'completed' },
                    { label: 'Complete Deliverables', status: 'active' },
                    { label: 'Review', status: 'pending' },
                    { label: 'Submit', status: 'pending' }
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <div className={cn(
                        "px-4 py-3 rounded-xl text-[10px] font-black transition-all border shadow-sm flex flex-col items-center min-w-[120px]",
                        step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-4 ring-corporate-navy/10" :
                        "bg-white text-slate-400 border-slate-200"
                      )}>
                        <span className="opacity-50 text-[8px] mb-1">Step {String(i + 1).padStart(2, '0')}</span>
                        {step.label}
                      </div>
                      {i < arr.length - 1 && (
                        <div className={cn(
                          "h-px w-8 flex-shrink-0",
                          step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'risk':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Risk Management & Compliance</h2>
              <p className="text-sm text-slate-500 mt-1">Monitoring project risks, internal controls, and compliance benchmarks.</p>
            </div>
            <FiltersBar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Open Risk Items</h4>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-[10px] text-rose-600 font-bold mt-1 tracking-wider uppercase">4 High Severity</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Control Effectiveness</h4>
                <p className="text-2xl font-bold text-slate-900">94%</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1 tracking-wider uppercase">+2% vs Last Audit</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Audit Readiness</h4>
                <p className="text-2xl font-bold text-slate-900">High</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1 tracking-wider uppercase">Validated</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Exposure Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Fx Risk</h4>
                  <p className="text-lg font-bold text-slate-900">Moderate Exposure</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-black uppercase w-fit">USD/EUR Hedge active</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Forward contracts covering 65% of forecasted Q3 requirements are in place. Intercompany settlement pipeline optimized to reduce base currency friction.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Interest Rate Risk</h4>
                  <p className="text-lg font-bold text-slate-900">Low Sensitivity</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded font-black uppercase w-fit">Fixed rate debt: 82%</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Weighted Average Cost of Debt (WACD) stable at 3.4%. Stress testing shows minimal EBITDA impact from +50bps shift in yield curves.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Credit Risk</h4>
                  <p className="text-lg font-bold text-slate-900">High Monitoring</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-black uppercase w-fit">DSO: 42 Days</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Monitoring counterparty limits for major trading partners. Provision for doubtful debts maintained at 1.5% of total receivables.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Economic Risk</h4>
                  <p className="text-lg font-bold text-slate-900">Stable</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black uppercase w-fit">Diversified Markets</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Global footprint provides natural hedge. Supply chain resilience verified through Tier-2 vendor audits and logistics diversification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-corporate-navy" />
                Upcoming Economic Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { date: 'Nov 08', event: 'FOMC Interest Rate Decision', type: 'Policy', status: 'High Volatility' },
                  { date: 'Nov 14', event: 'US Consumer Price Index (CPI)', type: 'Inflation', status: 'Core Data' },
                  { date: 'Nov 20', event: 'Eurozone GDP Flash Estimate', type: 'Growth', status: 'Quarterly' },
                  { date: 'Dec 02', event: 'OPEC+ Ministerial Meeting', type: 'Commodity', status: 'Supply Outlook' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-corporate-navy/30 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-corporate-navy bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.date}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{item.type}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 mb-1 group-hover:text-corporate-navy transition-colors">{item.event}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.status === 'High Volatility' ? "bg-rose-500" : "bg-amber-400"
                      )}></span>
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'settlements':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Settlements & Payments</h2>
              <p className="text-sm text-slate-500 mt-1">Management and validation of intercompany and external settlement cycles.</p>
            </div>
            
            <FiltersBar />

            <div className="space-y-12 mt-8">
              {/* Workflow 1 */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                    <Banknote size={14} className="text-corporate-accent" />
                    Workflow 1: Equity Related Transactions (Dividend, etc.)
                  </h3>
                  <div className="h-1 w-20 bg-corporate-accent rounded-full mb-6"></div>
                </div>
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { label: 'Declaration Check', status: 'completed' },
                    { label: 'Tax Withholding Calc', status: 'active' },
                    { label: 'Board Approval Sign-off', status: 'pending' },
                    { label: 'Bank Notification', status: 'pending' },
                    { label: 'Final Settlement', status: 'pending' }
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <button className={cn(
                        "px-4 py-2 rounded-lg text-[11px] font-bold transition-all border shadow-sm",
                        step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        step.status === 'active' ? "bg-corporate-navy text-white border-corporate-navy shadow-md ring-2 ring-corporate-navy/20" :
                        "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      )}>
                        {step.label}
                      </button>
                      {i < arr.length - 1 && (
                        <div className={cn("h-px w-6", step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200")} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow 2 */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                    <ReceiptText size={14} className="text-blue-500" />
                    Workflow 2: Non-Cash Settlements (excluding Equity related)
                  </h3>
                  <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
                </div>
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { label: 'Asset Match', status: 'completed' },
                    { label: 'Valuation Audit', status: 'active' },
                    { label: 'Netting Calculation', status: 'pending' },
                    { label: 'Ledger Posting', status: 'pending' }
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <button className={cn(
                        "px-4 py-2 rounded-lg text-[11px] font-bold transition-all border shadow-sm",
                        step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        step.status === 'active' ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/20" :
                        "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      )}>
                        {step.label}
                      </button>
                      {i < arr.length - 1 && (
                        <div className={cn("h-px w-6", step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200")} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow 3 */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                    <Coins size={14} className="text-emerald-500" />
                    Workflow 3: Cash Settlements (excluding Equity related)
                  </h3>
                  <div className="h-1 w-20 bg-emerald-500 rounded-full mb-6"></div>
                </div>
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { label: 'Invoice Batching', status: 'completed' },
                    { label: 'Treasury Funding', status: 'completed' },
                    { label: 'Payment Exec', status: 'active' },
                    { label: 'Confirmation Feed', status: 'pending' }
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <button className={cn(
                        "px-4 py-2 rounded-lg text-[11px] font-bold transition-all border shadow-sm",
                        step.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        step.status === 'active' ? "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-600/20" :
                        "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      )}>
                        {step.label}
                      </button>
                      {i < arr.length - 1 && (
                        <div className={cn("h-px w-6", step.status === 'completed' ? "bg-emerald-200" : "bg-slate-200")} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-100">
              <div className="mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Settlement Workflow Statistics (Last 3m vs Prior 3m)</h3>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Workflow Type</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Current Count</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Current Value</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Prior Count</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Prior Value</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Variance (Value)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Equity Related Transactions', currentCount: 45, currentValue: 125000000, priorCount: 42, priorValue: 118000000, color: 'bg-corporate-accent' },
                      { name: 'Non-Cash Settlements', currentCount: 156, currentValue: 84200000, priorCount: 148, priorValue: 79500000, color: 'bg-blue-500' },
                      { name: 'Cash Settlements', currentCount: 3240, currentValue: 452800000, priorCount: 3100, priorValue: 428000000, color: 'bg-emerald-500' },
                    ].map((item) => {
                      const variance = ((item.currentValue - item.priorValue) / item.priorValue) * 100;
                      return (
                        <tr key={item.name} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                              <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-xs font-medium text-slate-600">{item.currentCount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right text-xs font-black text-slate-900">${(item.currentValue / 1000000).toFixed(1)}M</td>
                          <td className="px-6 py-4 text-center text-xs font-medium text-slate-400">{item.priorCount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right text-xs font-bold text-slate-400">${(item.priorValue / 1000000).toFixed(1)}M</td>
                          <td className="px-6 py-4 text-right">
                            <span className={cn(
                              "text-[10px] font-black px-2 py-0.5 rounded border",
                              variance >= 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                            )}>
                              {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'finance-playground':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-corporate-navy tracking-tight flex items-center gap-2">
                <Sparkles className="text-corporate-accent" />
                Finance Playground
              </h2>
              <p className="text-sm text-slate-500 mt-1">LLM-driven workflow builder and deployment sandbox.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[650px]">
              {/* Chat Interface - Made Smaller */}
              <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-slate-900 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-corporate-accent p-1.5 rounded-lg">
                      <Bot size={16} className="text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-[9px] font-black text-white uppercase tracking-widest">FinAI Architect</h3>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                  <div className="flex gap-2 max-w-full">
                    <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-tl-none shadow-sm text-[11px] text-slate-700 leading-relaxed">
                      Hello. Ready to build?
                    </div>
                  </div>

                  <div className="flex gap-2 max-w-full ml-auto flex-row-reverse">
                    <div className="bg-corporate-navy text-white p-3 rounded-xl rounded-tr-none shadow-md text-[11px] leading-relaxed">
                      Generate ELIM Workflow.
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Prompt..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-corporate-accent/20 transition-all font-medium"
                    />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-corporate-navy text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors">
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Workflow Design Canvas - NEW SECTION */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-corporate-navy uppercase tracking-widest flex items-center gap-2">
                      <Terminal size={14} className="text-corporate-accent" />
                      Workflow Designer: Intercompany Elim
                    </h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Editor Mode • Draft v0.9</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-1.5">
                      <Cpu size={12} />
                      Test
                    </button>
                    <button className="px-3 py-1.5 bg-corporate-navy text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-md shadow-corporate-navy/10 transition-all flex items-center gap-1.5">
                      <Send size={12} />
                      Deploy
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] overflow-y-auto">
                  <div className="max-w-md mx-auto space-y-8 relative">
                    <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2 z-0"></div>
                    
                    {[
                      { id: 1, title: 'ERP Sync', desc: 'Fetch transactional data from regional nodes', icon: Download },
                      { id: 2, title: 'TP Matcher', desc: 'Validation against Transfer Pricing benchmarks', icon: Shield },
                      { id: 3, title: 'Elimination Matrix', desc: 'Auto-generate mirror entries across entities', icon: Layers },
                      { id: 4, title: 'Audit Logger', desc: 'Immutable record creation for PWC/Deloitte', icon: FileSpreadsheet }
                    ].map((step, idx) => (
                      <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative z-10 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-corporate-accent transition-all group cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg group-hover:bg-corporate-accent/10 group-hover:border-corporate-accent/20 transition-colors">
                            <step.icon size={18} className="text-corporate-navy" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black text-corporate-accent bg-slate-900 px-1.5 py-0.5 rounded leading-none">{step.id}</span>
                              <h4 className="text-xs font-black text-corporate-navy uppercase tracking-tight">{step.title}</h4>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium">{step.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    <div className="relative z-10 border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-center group hover:border-corporate-accent/40 bg-slate-50/50 cursor-pointer">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-corporate-accent">+ Add Logic Block</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Panel - Reduced size column */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Terminal size={14} className="text-corporate-navy" />
                    Deployment Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-[10px] font-bold text-emerald-700">Production v4.2</span>
                      <span className="text-[9px] font-black text-emerald-600 uppercase">Live</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-700">Sandbox #102</span>
                      <span className="text-[9px] font-black text-blue-600 uppercase">Staged</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Cpu size={14} className="text-corporate-accent" />
                    Compute Resources
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[9px] font-bold text-slate-300 uppercase">LLM Token Usage</span>
                        <span className="text-[9px] font-bold text-corporate-accent">42%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-corporate-accent w-[42%] shadow-[0_0_8px_rgba(255,204,0,0.4)]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[9px] font-bold text-slate-300 uppercase">Sandbox Memory</span>
                        <span className="text-[9px] font-bold text-emerald-400">12%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[12%]" />
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                    Reset Sandbox Env
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'quick-links':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Quick Links</h2>
              <p className="text-sm text-slate-500 mt-1">Access external portals and related group resources.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'S/4 GR', desc: 'S/4HANA Group Reporting Portal', url: '#', icon: Layers },
                { name: 'SAC Report', desc: 'SAP Analytics Cloud Dashboards', url: '#', icon: BarChart3 },
                { name: 'MOA', desc: 'Manual of Authorities & Approvals', url: '#', icon: Shield },
                { name: 'GR Portal', desc: 'Global Reporting Knowledge Base', url: '#', icon: Sparkles },
                { name: 'Sharepoint', desc: 'Finance Shared Documents', url: '#', icon: Share2 },
              ].map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-corporate-accent transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-corporate-accent/10 transition-colors">
                      <link.icon size={24} className="text-corporate-navy" />
                    </div>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-corporate-accent" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{link.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{link.desc}</p>
                </a>
              ))}
            </div>
          </motion.div>
        );
      case 'team':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-corporate-navy tracking-tight">Team & Oversight</h2>
              <p className="text-sm text-slate-500 mt-1">Resource allocation, performance tracking, and oversight of regional finance teams.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Total Headcount</h4>
                <p className="text-2xl font-bold text-slate-900">142</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1 tracking-wider uppercase">Global Finance Ops</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Open Requisitions</h4>
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-[10px] text-amber-600 font-bold mt-1 tracking-wider uppercase">Focus: Tax & Reporting</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Training Completion</h4>
                <p className="text-2xl font-bold text-slate-900">92%</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1 tracking-wider uppercase">Compliance Certified</p>
              </div>
            </div>


            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-900">Global Team Workflow Status</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Member Name</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Completed</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Not Due</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">In Progress</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Overdue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: "Rajiv Agarwal", completed: 24, notDue: 12, inProgress: 4, overdue: 0 },
                      { name: "Apurva Prem", completed: 18, notDue: 15, inProgress: 8, overdue: 2 },
                      { name: "Veena Sadasivam", completed: 31, notDue: 5, inProgress: 2, overdue: 0 },
                      { name: "Dhananjay Boduri", completed: 12, notDue: 22, inProgress: 10, overdue: 5 },
                      { name: "Karthikeyan Ganapathy", completed: 27, notDue: 8, inProgress: 3, overdue: 0 },
                      { name: "Anandraj Thangaraj", completed: 20, notDue: 18, inProgress: 6, overdue: 1 },
                      { name: "Samira Jamal", completed: 35, notDue: 2, inProgress: 1, overdue: 0 },
                      { name: "Anusha B G", completed: 15, notDue: 20, inProgress: 12, overdue: 3 },
                      { name: "Rakesh Athota", completed: 22, notDue: 14, inProgress: 5, overdue: 0 }
                    ].map((member) => (
                      <tr key={member.name} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-corporate-navy border border-slate-200">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-[11px] font-bold text-slate-900">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{member.completed}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-md">{member.notDue}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{member.inProgress}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-[11px] font-black px-2 py-1 rounded-md",
                            member.overdue > 0 ? "text-rose-600 bg-rose-50" : "text-slate-300 bg-transparent"
                          )}>{member.overdue}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
             <h2 className="text-2xl font-bold text-corporate-navy opacity-50">Content Restricted</h2>
             <p className="text-slate-400 mt-2">Please contact your administrator for access.</p>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Executive Controller Dashboard';
      case 'workflow': return 'Period End Workflows';
      case 'group-submission': return 'GR Status';
      case 'group-reporting-workflow': return 'GR Workflows';
      case 'kyc-ler': return 'KYC & LER Compliance';
      case 'management-info': return 'Management Information';
      case 'reporting-risks': return 'Controls & Compliance';
      case 'reporting': return 'Statutory Reporting Engine';
      case 'settlements': return 'Settlements & Payments';
      case 'team': return 'Team & Oversight';
      case 'finance-playground': return 'Finance Playground Builder';
      case 'quick-links': return 'Quick Access Links';
      case 'risk': return 'Risk & Compliance Management';
      default: return 'FinanceClose Suite';
    }
  };

  return (
    <div className="flex min-h-screen bg-corporate-bg font-sans selection:bg-corporate-accent selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header 
          closeType={closeType} 
          setCloseType={setCloseType} 
          title={getPageTitle()}
          activeTab={activeTab}
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
          
          <footer className="mt-20 pt-8 border-t border-slate-200 flex items-center justify-between text-[11px] font-medium text-slate-400 uppercase tracking-widest pb-8">
            <span>© 2026 Shell Global Finance Systems - Confidential Audit Tool</span>
            <div className="flex gap-6">
              <span className="hover:text-corporate-navy cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-corporate-navy cursor-pointer transition-colors">Compliance Hub</span>
              <span className="hover:text-corporate-navy cursor-pointer transition-colors">System Health: Normal</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
