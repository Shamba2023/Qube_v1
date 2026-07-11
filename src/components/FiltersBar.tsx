import { ChevronDown } from 'lucide-react';

export default function FiltersBar() {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="relative group">
        <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-corporate-accent/20 transition-all cursor-pointer">
          <option>Choose sector</option>
          <option>Energy</option>
          <option>Renewables</option>
          <option>Marketing</option>
          <option>Digital Ventures</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      <div className="relative group">
        <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-corporate-accent/20 transition-all cursor-pointer">
          <option>Choose country</option>
          <option>United Kingdom</option>
          <option>Netherlands</option>
          <option>United States</option>
          <option>Singapore</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      <div className="relative group">
        <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-corporate-accent/20 transition-all cursor-pointer">
          <option>Choose legal entity</option>
          <option>Shell Treasury B.V.</option>
          <option>Shell Energy Asia</option>
          <option>Digital Solutions Ltd</option>
          <option>Global Marketing Corp</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
