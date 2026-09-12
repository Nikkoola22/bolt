import React, { useMemo } from "react";

export interface DateFieldWithYearProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  hint?: string;
  minYear?: number;
  maxYear?: number;
  highlightYear?: number;
  badgeLabel?: string;
}

export const DateFieldWithYear: React.FC<DateFieldWithYearProps> = ({
  label,
  value,
  onChange,
  required = false,
  hint,
  minYear = 1965,
  maxYear = 2026,
  highlightYear = 1998,
  badgeLabel,
}) => {
  const currentYear = value && value.includes("-") ? value.split("-")[0] : String(highlightYear);

  const handleYearChange = (newYear: string) => {
    const parts = (value || `${highlightYear}-01-01`).split("-");
    const m = parts[1] || "01";
    const d = parts[2] || "01";
    onChange(`${newYear}-${m}-${d}`);
  };

  const yearsList = useMemo(() => {
    const list: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      list.push(y);
    }
    return list;
  }, [minYear, maxYear]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block font-bold text-slate-800 text-sm">{label}</label>
        <div className="flex items-center gap-1.5">
          {badgeLabel && (
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
              {badgeLabel}
            </span>
          )}
          <span className="text-xs font-mono font-black text-emerald-900 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-md shadow-2xs">
            {currentYear}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Sélecteur direct d'année (ex: 1998 en 1 clic) */}
        <div className="w-24 sm:w-28 shrink-0">
          <select
            value={currentYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full bg-slate-100/90 hover:bg-slate-100 border border-slate-300 font-bold rounded-xl px-2.5 py-2.5 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer shadow-2xs"
            title={`Choisir l'année pour : ${label}`}
          >
            {yearsList.map((y) => (
              <option key={y} value={String(y)}>
                {y} {y === 1998 ? "★ 1998" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Datepicker HTML standard */}
        <div className="flex-1 min-w-0">
          <input
            type="date"
            min={`${minYear}-01-01`}
            max={`${maxYear}-12-31`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-50/90 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
            required={required}
          />
        </div>
      </div>

      {hint && <p className="text-xs text-slate-500 mt-1.5">{hint}</p>}
    </div>
  );
};
