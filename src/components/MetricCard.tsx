import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { FinancialMetric, CloseType } from '../types';
import { cn, formatCurrency, formatPercent } from '../lib/utils';
import { motion } from 'motion/react';

interface MetricCardProps {
  key?: string;
  metric: FinancialMetric;
  closeType: CloseType;
}

export default function MetricCard({ metric, closeType }: MetricCardProps) {
  const getComparison = (val: number, prev: number) => {
    const diff = val - prev;
    const percent = prev !== 0 ? (diff / prev) * 100 : 0;
    return { diff, percent };
  };

  const periodComp = getComparison(metric.current, metric.previous);
  const yearComp = getComparison(metric.current, metric.previousYear);

  const format = (val: number) => 
    metric.format === 'currency' ? formatCurrency(val) : formatPercent(val);

  const prevPeriodLabel = closeType === 'MONTHLY' ? 'Prev. Month' : 'Prev. Quarter';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow transition-shadow relative group"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.label}</span>
        <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-corporate-accent/10 transition-colors">
          <Info size={12} className="text-slate-300 group-hover:text-slate-900" />
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <span className="text-2xl font-black text-slate-900 tracking-tighter">
          {format(metric.current)}
        </span>
      </div>

      <div className="space-y-2 border-t border-slate-50 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{prevPeriodLabel}</span>
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-black",
            periodComp.percent > 0 ? "text-emerald-600" : periodComp.percent < 0 ? "text-corporate-red" : "text-slate-500"
          )}>
            {periodComp.percent > 0 ? <TrendingUp size={12} /> : periodComp.percent < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
            <span>{Math.abs(periodComp.percent).toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between opacity-60">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Budget Bench</span>
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-black",
            yearComp.percent > 0 ? "text-emerald-600" : yearComp.percent < 0 ? "text-corporate-red" : "text-slate-500"
          )}>
            <span>{format(metric.previousYear)}</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 h-full w-1 bg-corporate-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}
