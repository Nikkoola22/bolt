import React, { useMemo } from "react";

export type DateFieldTheme = "emerald" | "purple" | "blue" | "indigo" | "amber" | "slate";

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
  icon?: React.ReactNode;
  themeColor?: DateFieldTheme;
  cardMode?: boolean;
}

const THEME_STYLES: Record<DateFieldTheme, {
  cardBg: string;
  border: string;
  hoverBorder: string;
  iconBg: string;
  labelText: string;
  yearBadge: string;
  focusRing: string;
}> = {
  emerald: {
    cardBg: "bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/40",
    border: "border-emerald-300",
    hoverBorder: "hover:border-emerald-500",
    iconBg: "bg-emerald-600",
    labelText: "text-emerald-950",
    yearBadge: "bg-emerald-100 text-emerald-950 border-emerald-300",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
  },
  purple: {
    cardBg: "bg-gradient-to-b from-purple-50/90 via-white to-purple-50/40",
    border: "border-purple-300",
    hoverBorder: "hover:border-purple-500",
    iconBg: "bg-purple-600",
    labelText: "text-purple-950",
    yearBadge: "bg-purple-100 text-purple-950 border-purple-300",
    focusRing: "focus:ring-purple-500/20 focus:border-purple-500",
  },
  blue: {
    cardBg: "bg-gradient-to-b from-blue-50/90 via-white to-blue-50/40",
    border: "border-blue-300",
    hoverBorder: "hover:border-blue-500",
    iconBg: "bg-blue-600",
    labelText: "text-blue-950",
    yearBadge: "bg-blue-100 text-blue-950 border-blue-300",
    focusRing: "focus:ring-blue-500/20 focus:border-blue-500",
  },
  indigo: {
    cardBg: "bg-gradient-to-b from-indigo-50/90 via-white to-indigo-50/40",
    border: "border-indigo-300",
    hoverBorder: "hover:border-indigo-500",
    iconBg: "bg-indigo-600",
    labelText: "text-indigo-950",
    yearBadge: "bg-indigo-100 text-indigo-950 border-indigo-300",
    focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
  },
  amber: {
    cardBg: "bg-gradient-to-b from-amber-50/90 via-white to-amber-50/40",
    border: "border-amber-300",
    hoverBorder: "hover:border-amber-500",
    iconBg: "bg-amber-500",
    labelText: "text-amber-950",
    yearBadge: "bg-amber-100 text-amber-950 border-amber-300",
    focusRing: "focus:ring-amber-500/20 focus:border-amber-500",
  },
  slate: {
    cardBg: "bg-gradient-to-b from-slate-50/90 via-white to-slate-50/40",
    border: "border-slate-300",
    hoverBorder: "hover:border-slate-500",
    iconBg: "bg-slate-700",
    labelText: "text-slate-900",
    yearBadge: "bg-slate-100 text-slate-900 border-slate-300",
    focusRing: "focus:ring-slate-500/20 focus:border-slate-500",
  },
};

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
  icon,
  themeColor = "emerald",
  cardMode = false,
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

  const styles = THEME_STYLES[themeColor] || THEME_STYLES.emerald;

  if (cardMode) {
    return (
      <div className={`border-2 ${styles.border} ${styles.hoverBorder} ${styles.cardBg} rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 min-w-0">
              {icon && (
                <div className={`w-7 h-7 rounded-lg ${styles.iconBg} text-white flex items-center justify-center shadow-2xs shrink-0`}>
                  {icon}
                </div>
              )}
              <label className={`block font-black ${styles.labelText} text-xs sm:text-sm tracking-wide uppercase truncate`} title={label}>
                {label}
              </label>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {badgeLabel && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-700 border border-slate-200 shadow-2xs">
                  {badgeLabel}
                </span>
              )}
              <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-md shadow-2xs border ${styles.yearBadge}`}>
                {currentYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            {/* Sélecteur compact d'année */}
            <div className="w-[66px] shrink-0">
              <select
                value={currentYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className={`w-full bg-white hover:bg-slate-50 border border-slate-300 font-bold rounded-xl px-1 py-2 text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 ${styles.focusRing} transition-all cursor-pointer shadow-2xs text-center`}
                title={`Choisir l'année pour : ${label}`}
              >
                {yearsList.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Datepicker HTML standard visible en entier */}
            <div className="flex-1 min-w-0">
              <input
                type="date"
                min={`${minYear}-01-01`}
                max={`${maxYear}-12-31`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full min-w-0 bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 font-bold text-xs sm:text-sm focus:bg-white focus:ring-2 ${styles.focusRing} transition-all shadow-2xs`}
                required={required}
              />
            </div>
          </div>
        </div>

        {hint && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/70 text-[11px] text-slate-600 font-medium leading-tight">
            {hint}
          </div>
        )}
      </div>
    );
  }

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

      <div className="flex items-center gap-1.5">
        {/* Sélecteur compact d'année (ex: 1998) */}
        <div className="w-[66px] shrink-0">
          <select
            value={currentYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full bg-slate-100/90 hover:bg-slate-100 border border-slate-300 font-bold rounded-xl px-1 py-2 text-slate-900 text-xs sm:text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer shadow-2xs text-center"
            title={`Choisir l'année pour : ${label}`}
          >
            {yearsList.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Datepicker HTML standard visible en entier */}
        <div className="flex-1 min-w-0">
          <input
            type="date"
            min={`${minYear}-01-01`}
            max={`${maxYear}-12-31`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-w-0 bg-slate-50/90 border border-slate-300 rounded-xl px-2 py-2 text-slate-900 font-semibold text-xs sm:text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
            required={required}
          />
        </div>
      </div>

      {hint && <p className="text-xs text-slate-500 mt-1.5">{hint}</p>}
    </div>
  );
};
