import { CloseTask } from '../types';
import { cn } from '../lib/utils';
import { CheckCircle2, Circle, Clock, AlertTriangle, MoreHorizontal, User } from 'lucide-react';

interface TaskListProps {
  tasks: CloseTask[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const getStatusIcon = (status: CloseTask['status']) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="text-emerald-500" size={14} />;
      case 'IN_PROGRESS': return <Clock className="text-corporate-accent" size={14} />;
      case 'BLOCKED': return <AlertTriangle className="text-corporate-red" size={14} />;
      default: return <Circle className="text-slate-300" size={14} />;
    }
  };

  const getStatusColor = (status: CloseTask['status']) => {
    switch (status) {
      case 'COMPLETED': return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case 'IN_PROGRESS': return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case 'BLOCKED': return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Close Steps</h3>
        <div className="flex gap-2">
          <button className="text-[10px] font-black text-slate-400 border border-slate-200 px-2 py-1 rounded bg-white hover:text-slate-900 transition-colors">Export CSV</button>
          <button className="text-[10px] font-black text-slate-400 border border-slate-200 px-2 py-1 rounded bg-white hover:text-slate-900 transition-colors">Mass Update</button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left table-fixed min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[30%]">Metric / Task</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-[15%]">Status</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[15%]">Category</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[15%]">Assignee</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[15%]">Action</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[10%] text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tasks.map((task) => (
              <tr key={task.id} className="group hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-slate-900">
                      {task.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity truncate italic">
                      {task.description}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black border uppercase tracking-tighter", getStatusColor(task.status))}>
                    {getStatusIcon(task.status)}
                    {task.status.replace('_', ' ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{task.category}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                      <User size={12} className="text-slate-400" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 truncate">{task.owner}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className={cn(
                    "text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest transition-all active:scale-95",
                    task.status === 'COMPLETED' ? "bg-slate-100 text-slate-500 border-slate-200" :
                    task.status === 'IN_PROGRESS' ? "bg-corporate-navy text-white border-corporate-navy" :
                    task.status === 'BLOCKED' ? "bg-rose-600 text-white border-rose-600" :
                    "bg-white text-slate-600 border-slate-200"
                  )}>
                    {task.status === 'COMPLETED' ? 'Re-open' : 
                     task.status === 'IN_PROGRESS' ? 'Submit' : 
                     task.status === 'BLOCKED' ? 'Escalate' : 'Start'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 px-2 text-[10px] font-black text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 hover:bg-white rounded transition-all">
                    AUDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
