import React from "react";
import type { ProfilAgent } from "../types/career";
import { BookOpen, RotateCcw, Sun, Moon, ArrowLeft, FileEdit, GraduationCap } from "lucide-react";

interface HeaderProps {
  currentProfile?: ProfilAgent;
  onSelectProfile?: (profil: ProfilAgent) => void;
  onOpenEditProfile?: () => void;
  onOpenGlossary?: () => void;
  onOpenPrintSummary?: () => void;
  onOpenConcours?: () => void;
  onResetEvents?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  onBackToMenu?: () => void;
  showBackToMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onOpenEditProfile,
  onOpenGlossary,
  onOpenConcours,
  onResetEvents,
  isDark = false,
  onToggleTheme,
  onBackToMenu,
  showBackToMenu = false,
}) => {
  const hasEvents = currentProfile && currentProfile.evenementsSimules && currentProfile.evenementsSimules.length > 0;

  return (
    <header className="sticky top-2 sm:top-3 z-40 max-w-6xl w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] mx-auto transition-all duration-300">
      <div className="rounded-full backdrop-blur-2xl bg-white/85 dark:bg-black/85 border border-black/[0.08] dark:border-white/[0.12] shadow-md shadow-black/[0.03] dark:shadow-black/40 py-2 sm:py-2.5 px-3.5 sm:px-5 flex items-center justify-between gap-3">
        
        {/* Navigation retour (si actif) */}
        <div>
          {showBackToMenu && onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border border-red-400 active:scale-[0.98]"
              title="Retour au menu (les 3 cartes)"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
              <span>Retour au menu</span>
            </button>
          )}
        </div>

        {/* Actions et utilitaires sous forme de capsules arrondies */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">

          {hasEvents && onResetEvents && (
            <button
              onClick={onResetEvents}
              className="hidden md:flex items-center gap-1.5 text-xs text-ebony dark:text-apricot bg-apricot/30 dark:bg-apricot/15 hover:bg-apricot/40 border border-apricot/50 px-3 py-1.5 rounded-full transition-all cursor-pointer font-bold"
              title="Réinitialiser les événements de simulation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-tangerine" />
              <span>Reset ({currentProfile.evenementsSimules.length})</span>
            </button>
          )}

          {onOpenEditProfile && (
            <button
              onClick={onOpenEditProfile}
              className="text-xs text-orange-950 dark:text-orange-200 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full bg-orange-100/90 dark:bg-orange-950/60 hover:bg-orange-200 dark:hover:bg-orange-900/80 border border-orange-300/80 dark:border-orange-700/80 transition-all flex items-center gap-1.5 cursor-pointer font-bold shadow-2xs active:scale-[0.98]"
              title="Modifier les informations de profil"
            >
              <FileEdit className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span className="hidden sm:inline">Modifier profil</span>
            </button>
          )}

          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="text-xs text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-all flex items-center gap-1.5 cursor-pointer font-medium"
              title="Consulter le lexique statutaire"
            >
              <BookOpen className="w-3.5 h-3.5 text-tangerine" />
              <span className="hidden sm:inline">Lexique</span>
            </button>
          )}

          {onOpenConcours && (
            <button
              onClick={onOpenConcours}
              className="text-xs text-indigo-900 dark:text-indigo-200 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-300/80 dark:border-indigo-700/80 transition-all flex items-center gap-1.5 cursor-pointer font-bold shadow-2xs active:scale-[0.98]"
              title="Consulter les sessions de concours et examens professionnels CIG Petite Couronne"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Concours & Examens</span>
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
