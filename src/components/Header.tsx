import React from "react";
import type { ProfilAgent } from "../types/career";
import { BookOpen, Printer, ShieldCheck, RotateCcw, Sun, Moon } from "lucide-react";

interface HeaderProps {
  currentProfile?: ProfilAgent;
  onSelectProfile?: (profil: ProfilAgent) => void;
  onOpenEditProfile?: () => void;
  onOpenGlossary?: () => void;
  onOpenPrintSummary?: () => void;
  onResetEvents?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onOpenGlossary,
  onOpenPrintSummary,
  onResetEvents,
  isDark = false,
  onToggleTheme,
}) => {
  const hasEvents = currentProfile && currentProfile.evenementsSimules && currentProfile.evenementsSimules.length > 0;

  return (
    <header className="sticky top-2 sm:top-3 z-40 max-w-6xl w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] mx-auto transition-all duration-300">
      <div className="rounded-full backdrop-blur-2xl bg-white/85 dark:bg-black/85 border border-black/[0.08] dark:border-white/[0.12] shadow-md shadow-black/[0.03] dark:shadow-black/40 py-2 sm:py-2.5 px-3.5 sm:px-5 flex items-center justify-between gap-3">
        
        {/* Marque institutionnelle Apple-style */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-[11px] shadow-sm tracking-wider">
              CFDT
            </div>
            {/* Délicat liseré tricolore discret */}
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex h-0.5 w-4 rounded-full overflow-hidden opacity-90">
              <span className="w-1/3 bg-blue-500"></span>
              <span className="w-1/3 bg-white"></span>
              <span className="w-1/3 bg-red-500"></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              Ma Carrière
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300">
              Gennevilliers
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              CGFP
            </span>
          </div>
        </div>

        {/* Actions et utilitaires sous forme de capsules arrondies */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {hasEvents && onResetEvents && (
            <button
              onClick={onResetEvents}
              className="hidden md:flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-700/60 px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium"
              title="Réinitialiser les événements de simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ({currentProfile.evenementsSimules.length})</span>
            </button>
          )}

          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="text-xs text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-all flex items-center gap-1.5 cursor-pointer font-medium"
              title="Consulter le lexique statutaire"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-500" />
              <span className="hidden sm:inline">Lexique</span>
            </button>
          )}

          {onOpenPrintSummary && (
            <button
              onClick={onOpenPrintSummary}
              className="text-xs text-white px-3.5 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer font-semibold"
              title="Exporter la fiche d'entretien professionnel"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fiche Entretien</span>
            </button>
          )}

          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] transition-all flex items-center justify-center cursor-pointer text-slate-700 dark:text-slate-200"
              title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
