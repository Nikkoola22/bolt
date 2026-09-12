import React from "react";
import type { ProfilAgent } from "../types/career";
import { BookOpen, Printer, ShieldCheck, RotateCcw } from "lucide-react";

interface HeaderProps {
  currentProfile?: ProfilAgent;
  onSelectProfile?: (profil: ProfilAgent) => void;
  onOpenEditProfile?: () => void;
  onOpenGlossary?: () => void;
  onOpenPrintSummary?: () => void;
  onResetEvents?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onOpenGlossary,
  onOpenPrintSummary,
  onResetEvents,
}) => {
  const hasEvents = currentProfile && currentProfile.evenementsSimules && currentProfile.evenementsSimules.length > 0;

  return (
    <header className="bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800/90 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
        
        {/* Marque institutionnelle */}
        <div className="flex items-center gap-3">
          {/* Logo avec accent tricolore républicain subtil */}
          <div className="relative flex items-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white font-black text-xs shadow-sm ring-1 ring-white/20 tracking-wider">
              CFDT
            </div>
            {/* Discrète barre tricolore républicaine */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-0.75 w-6 rounded-full overflow-hidden shadow-xs">
              <span className="w-1/3 bg-blue-500"></span>
              <span className="w-1/3 bg-white"></span>
              <span className="w-1/3 bg-red-500"></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white tracking-tight">
                CFDT " MA CARRIERE"
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 sm:mt-0">
              <span className="text-[11px] bg-blue-500/15 text-blue-300 border border-blue-400/25 px-2 py-0.5 rounded-md font-semibold tracking-wide">
                Collectivité de Gennevilliers
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                FPT • CGFP
              </span>
            </div>
          </div>
        </div>

        {/* Actions et utilitaires */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Alerte discrète si des simulations sont actives */}
          {hasEvents && onResetEvents && (
            <button
              onClick={onResetEvents}
              className="hidden lg:flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Réinitialiser les événements de simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser simulation ({currentProfile.evenementsSimules.length})</span>
            </button>
          )}

          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Consulter le lexique statutaire (CGFP, PPCR, LDG...)"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline font-medium">Lexique Statutaire</span>
            </button>
          )}

          {onOpenPrintSummary && (
            <button
              onClick={onOpenPrintSummary}
              className="text-xs text-slate-200 hover:text-white px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-600 hover:to-indigo-600 border border-blue-400/30 shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer font-medium"
              title="Exporter la fiche récapitulative pour votre entretien professionnel"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Fiche Entretien</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

