import { EntitySubmission, StatutoryReport } from '../types';
import { cn } from '../lib/utils';
import { Globe2, FileText, Lightbulb, TrendingDown, BarChart3, Fingerprint } from 'lucide-react';

interface DashboardTablesProps {
  submissions: EntitySubmission[];
  statutoryReports: StatutoryReport[];
  onNavigate: (tab: string) => void;
}

export default function DashboardTables({ submissions, statutoryReports, onNavigate }: DashboardTablesProps) {
  // Aggregate Submissions
  const submissionCounts = submissions.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1;
    acc.total += 1;
    return acc;
  }, { APPROVED: 0, SUBMITTED: 0, REJECTED: 0, NOT_STARTED: 0, total: 0 } as any);

  // Aggregate Statutory Reports
  const statutoryCounts = statutoryReports.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    acc.total += 1;
    return acc;
  }, { FILED: 0, REVIEWED: 0, DRAFTING: 0, PENDING: 0, total: 0 } as any);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
      {/* Group Submission simplified */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-corporate-navy rounded-lg shadow-sm">
              <Globe2 size={14} className="text-white" />
            </div>
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Group Submission</h3>
          </div>
          <button 
            onClick={() => onNavigate('group-submission')}
            className="text-[9px] font-black text-corporate-navy hover:text-corporate-red transition-colors uppercase tracking-widest"
          >
            Details →
          </button>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Apv', count: submissionCounts.APPROVED, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Sub', count: submissionCounts.SUBMITTED, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Rej', count: submissionCounts.REJECTED, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Pnd', count: submissionCounts.NOT_STARTED, color: 'text-slate-400', bg: 'bg-slate-50' },
            ].map((item) => (
              <div key={item.label} className={cn("rounded-lg p-2 text-center border border-transparent transition-colors", item.bg)}>
                <p className={cn("text-lg font-black", item.color)}>{item.count}</p>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{item.label}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-auto">
            <div className="flex items-start gap-2">
              <Lightbulb size={12} className="text-corporate-red shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-700 leading-tight font-bold">
                {submissionCounts.REJECTED > 0 
                  ? "Nigeria Intercompany mismatch blocking day-3 consolidation."
                  : "Velocity up 14%. Major entities on track."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Management Information simplified */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 rounded-lg shadow-sm">
              <BarChart3 size={14} className="text-white" />
            </div>
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Management Info</h3>
          </div>
          <button 
            onClick={() => onNavigate('management-info')}
            className="text-[9px] font-black text-corporate-navy hover:text-corporate-red transition-colors uppercase tracking-widest"
          >
            Insights →
          </button>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'KPIs', count: 12, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Alerts', count: 2, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Trends', count: 5, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Review', count: 3, color: 'text-slate-400', bg: 'bg-slate-50' },
            ].map((item) => (
              <div key={item.label} className={cn("rounded-lg p-2 text-center border border-transparent transition-colors", item.bg)}>
                <p className={cn("text-lg font-black", item.color)}>{item.count}</p>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{item.label}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-auto">
            <div className="flex items-start gap-2">
              <Fingerprint size={12} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-700 leading-tight font-bold">
                EBITDA Margin down 2.4% in Europe due to energy pricing variance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Reporting simplified */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-corporate-red rounded-lg shadow-sm">
              <FileText size={14} className="text-white" />
            </div>
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Statutory Reporting</h3>
          </div>
          <button 
            onClick={() => onNavigate('reporting-risks')}
            className="text-[9px] font-black text-corporate-navy hover:text-corporate-red transition-colors uppercase tracking-widest"
          >
            Filing →
          </button>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'File', count: statutoryCounts.FILED, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Rev', count: statutoryCounts.REVIEWED, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Drft', count: statutoryCounts.DRAFTING, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Pnd', count: statutoryCounts.PENDING, color: 'text-slate-400', bg: 'bg-slate-50' },
            ].map((item) => (
              <div key={item.label} className={cn("rounded-lg p-2 text-center border border-transparent transition-colors", item.bg)}>
                <p className={cn("text-lg font-black", item.color)}>{item.count}</p>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-auto">
            <div className="flex items-start gap-2">
              <TrendingDown size={12} className="text-corporate-navy shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-700 leading-tight font-bold">
                Resource bottleneck in Nigeria. T-15 deadline for 4 reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
