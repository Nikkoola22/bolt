import React, { useMemo } from "react";

export type DateFieldTheme = "emerald" | "purple" | "blue" | "indigo" | "amber" | "orange" | "slate";

export interface DateFieldWithYearProps {
  label: string;
  subLabel?: string;
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
  children?: React.ReactNode;
}

const THEME_STYLES: Record<DateFieldTheme, {
  cardBg: string;
  border: string;
  hoverBorder: string;
  iconBg: string;
  labelText: string;
  subLabelText: string;
  yearBadge: string;
  focusRing: string;
}> = {
  orange: {
    cardBg: "bg-gradient-to-b from-orange-50/90 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/20",
    border: "border-orange-300 dark:border-orange-700/60",
    hoverBorder: "hover:border-orange-500 dark:hover:border-orange-400",
    iconBg: "bg-orange-600",
    labelText: "text-orange-950 dark:text-orange-200",
    subLabelText: "text-orange-700 dark:text-orange-300",
    yearBadge: "bg-orange-100 text-orange-950 border-orange-300 dark:bg-orange-950/80 dark:text-orange-200 dark:border-orange-700",
    focusRing: "focus:ring-orange-500/20 focus:border-orange-500",
  },
  emerald: {
    cardBg: "bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20",
    border: "border-emerald-300 dark:border-emerald-700/60",
    hoverBorder: "hover:border-emerald-500 dark:hover:border-emerald-400",
    iconBg: "bg-emerald-600",
    labelText: "text-emerald-950 dark:text-emerald-200",
    subLabelText: "text-emerald-700 dark:text-emerald-300",
    yearBadge: "bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
  },
  purple: {
    cardBg: "bg-gradient-to-b from-purple-50/90 via-white to-purple-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-purple-950/20",
    border: "border-purple-300 dark:border-purple-700/60",
    hoverBorder: "hover:border-purple-500 dark:hover:border-purple-400",
    iconBg: "bg-purple-600",
    labelText: "text-purple-950 dark:text-purple-200",
    subLabelText: "text-purple-700 dark:text-purple-300",
    yearBadge: "bg-purple-100 text-purple-950 border-purple-300 dark:bg-purple-950/80 dark:text-purple-200 dark:border-purple-700",
    focusRing: "focus:ring-purple-500/20 focus:border-purple-500",
  },
  blue: {
    cardBg: "bg-gradient-to-b from-blue-50/90 via-white to-blue-50/40 dark:from-blue-950/40 dark:via-slate-900 dark:to-blue-950/20",
    border: "border-blue-300 dark:border-blue-700/60",
    hoverBorder: "hover:border-blue-500 dark:hover:border-blue-400",
    iconBg: "bg-blue-600",
    labelText: "text-blue-950 dark:text-blue-200",
    subLabelText: "text-blue-700 dark:text-blue-300",
    yearBadge: "bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-700",
    focusRing: "focus:ring-blue-500/20 focus:border-blue-500",
  },
  indigo: {
    cardBg: "bg-gradient-to-b from-indigo-50/90 via-white to-indigo-50/40 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/20",
    border: "border-indigo-300 dark:border-indigo-700/60",
    hoverBorder: "hover:border-indigo-500 dark:hover:border-indigo-400",
    iconBg: "bg-indigo-600",
    labelText: "text-indigo-950 dark:text-indigo-200",
    subLabelText: "text-indigo-700 dark:text-indigo-300",
    yearBadge: "bg-indigo-100 text-indigo-950 border-indigo-300 dark:bg-indigo-950/80 dark:text-indigo-200 dark:border-indigo-700",
    focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
  },
  amber: {
    cardBg: "bg-gradient-to-b from-amber-50/90 via-white to-amber-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-amber-950/20",
    border: "border-amber-300 dark:border-amber-700/60",
    hoverBorder: "hover:border-amber-500 dark:hover:border-amber-400",
    iconBg: "bg-amber-500",
    labelText: "text-amber-950 dark:text-amber-200",
    subLabelText: "text-amber-700 dark:text-amber-300",
    yearBadge: "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700",
    focusRing: "focus:ring-amber-500/20 focus:border-amber-500",
  },
  slate: {
    cardBg: "bg-gradient-to-b from-slate-50/90 via-white to-slate-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/60",
    border: "border-slate-300 dark:border-slate-700",
    hoverBorder: "hover:border-slate-500 dark:hover:border-slate-400",
    iconBg: "bg-slate-700 dark:bg-slate-600",
    labelText: "text-slate-900 dark:text-slate-100",
    subLabelText: "text-slate-600 dark:text-slate-300",
    yearBadge: "bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700",
    focusRing: "focus:ring-slate-500/20 focus:border-slate-500",
  },
};

export const DateFieldWithYear: React.FC<DateFieldWithYearProps> = ({
  label,
  subLabel,
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
  children,
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
      <div className={`border-2 ${styles.border} ${styles.hoverBorder} ${styles.cardBg} rounded-xl p-3 sm:p-3.5 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between group`}>
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-start gap-2 min-w-0 flex-1">
              {icon && (
                <div className={`w-6 h-6 rounded-md ${styles.iconBg} text-white flex items-center justify-center shadow-2xs shrink-0 mt-0.5`}>
                  {icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <label className={`block font-black ${styles.labelText} text-xs uppercase leading-snug`} title={subLabel ? `${label} (${subLabel})` : label}>
                  {label}
                </label>
                {subLabel && (
                  <p className={`text-[11px] font-bold ${styles.subLabelText} truncate leading-tight mt-0.5`} title={subLabel}>
                    {subLabel}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 mt-0.5">
              {badgeLabel && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  {badgeLabel}
                </span>
              )}
              <span className={`text-[11px] font-mono font-black px-1.5 py-0.5 rounded shadow-2xs border ${styles.yearBadge}`}>
                {currentYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5">
            {/* Sélecteur compact d'année */}
            <div className="w-[58px] shrink-0">
              <select
                value={currentYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className={`w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 font-bold rounded-lg px-1 py-1.5 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-slate-800 focus:ring-2 ${styles.focusRing} transition-all cursor-pointer shadow-2xs text-center`}
                title={`Choisir l'année pour : ${label}`}
              >
                {yearsList.map((y) => (
                  <option key={y} value={String(y)} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Datepicker HTML standard compact et lisible */}
            <div className="w-[136px] sm:w-[142px] shrink-0">
              <input
                type="date"
                min={`${minYear}-01-01`}
                max={`${maxYear}-12-31`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs focus:bg-white dark:focus:bg-slate-800 focus:ring-2 ${styles.focusRing} transition-all shadow-2xs`}
                required={required}
              />
            </div>
          </div>
        </div>

        {hint && (
          <div className="mt-2 pt-1.5 border-t border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight">
            {hint}
          </div>
        )}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="min-w-0 flex-1">
          <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs leading-snug" title={subLabel ? `${label} (${subLabel})` : label}>
            {label}
          </label>
          {subLabel && (
            <span className={`block text-[11px] font-semibold ${styles.subLabelText} truncate`} title={subLabel}>
              {subLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {badgeLabel && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded font-medium">
              {badgeLabel}
            </span>
          )}
          <span className="text-[11px] font-mono font-black text-emerald-900 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 px-1.5 py-0.5 rounded shadow-2xs">
            {currentYear}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Sélecteur compact d'année (ex: 1998) */}
        <div className="w-[58px] shrink-0">
          <select
            value={currentYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 font-bold rounded-lg px-1 py-1.5 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer shadow-2xs text-center"
            title={`Choisir l'année pour : ${label}`}
          >
            {yearsList.map((y) => (
              <option key={y} value={String(y)} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Datepicker HTML standard compact */}
        <div className="w-[136px] sm:w-[142px] shrink-0">
          <input
            type="date"
            min={`${minYear}-01-01`}
            max={`${maxYear}-12-31`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-50/90 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 font-semibold text-xs focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
            required={required}
          />
        </div>
      </div>

      {hint && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{hint}</p>}
    </div>
  );
};
