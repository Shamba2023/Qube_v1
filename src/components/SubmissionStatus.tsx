import { EntitySubmission } from '../types';
import { cn } from '../lib/utils';
import { CheckCircle, Clock, XCircle, Slash, Globe, MapPin } from 'lucide-react';

interface SubmissionStatusProps {
  submissions: EntitySubmission[];
}

export default function SubmissionStatus({ submissions }: SubmissionStatusProps) {
  const getStatusConfig = (status: EntitySubmission['status']) => {
    switch (status) {
      case 'APPROVED': return { icon: <CheckCircle size={12} />, color: "text-emerald-600", bg: "bg-emerald-50", label: "Signed Off" };
      case 'SUBMITTED': return { icon: <Clock size={12} />, color: "text-blue-600", bg: "bg-blue-50", label: "Pending" };
      case 'REJECTED': return { icon: <XCircle size={12} />, color: "text-corporate-red", bg: "bg-red-50", label: "Correction" };
      default: return { icon: <Slash size={12} />, color: "text-slate-300", bg: "bg-slate-50", label: "Awaiting" };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {submissions.map((sub) => {
        const config = getStatusConfig(sub.status);
        return (
          <div key={sub.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-800 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded bg-slate-50 border border-slate-100">
                <Globe className="text-slate-400 group-hover:text-corporate-accent transition-colors" size={16} />
              </div>
              <div className={cn("px-2 py-0.5 rounded text-[9px] font-black flex items-center gap-1 uppercase tracking-tighter", config.bg, config.color)}>
                {config.icon}
                {config.label}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-800 truncate">{sub.name}</h4>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold tracking-tighter mt-0.5">
                <MapPin size={10} />
                <span>{sub.region} Entity</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-50 space-y-1.5">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                <span>Update</span>
                <span className="text-slate-600 truncate">{sub.submittedAt || '—'}</span>
              </div>
              {sub.approver && (
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <span>Audit By</span>
                  <span className="text-slate-800 truncate">{sub.approver}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
