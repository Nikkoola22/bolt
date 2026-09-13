import React, { useEffect } from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { findCadreAndGrade } from "../services/simulationEngine";
import { Zap, Layers, ArrowRight, FileEdit, CheckCircle2, Sparkles, Smile } from "lucide-react";

interface ModeSelectionViewProps {
  profil: ProfilAgent;
  resultatSimulation: ResultatSimulation;
  onSelectSimplified: () => void;
  onSelectComplete: () => void;
  onBackToSaisie: () => void;
}

export const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({
  profil,
  resultatSimulation,
  onSelectSimplified,
  onSelectComplete,
  onBackToSaisie,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const { cadre } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const isContractuel = profil.statut.startsWith("contractuel");
  const statutLibelle = isContractuel 
    ? "Contractuel" 
    : profil.statut === "stagiaire" 
    ? "Stagiaire" 
    : "Titulaire";
  const cadreLibelle = cadre?.nom || resultatSimulation.jalonActuel.gradeNom;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-4 sm:py-8">
      
      {/* En-tête Apple Keynote épuré */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-semibold shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>
            Simulation prête pour <strong>{profil.prenom}</strong> • {cadreLibelle} ({statutLibelle})
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight leading-tight">
          Comment explorer votre carrière ?
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Deux expériences conçues sur-mesure pour répondre précisément à vos attentes.
        </p>
      </div>

      {/* Double-Bezel Bento Grid façon Apple Store / Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARTE 1 : VERSION SIMPLIFIÉE */}
        <div 
          onClick={onSelectSimplified}
          className="p-2 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl"
        >
          <div className="rounded-[2.1rem] bg-white dark:bg-[#111114] p-7 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <Smile className="w-6 h-6" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-600" />
                  Essentiel & Visuel
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors tracking-tight">
                Version Simplifiée
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Réponses directes et chiffrées à vos 2 questions du quotidien, sans jargon administratif :
              </p>

              <div className="mt-5 space-y-2.5 bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.04] text-xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    💰
                  </span>
                  <span>Quand et de combien mon salaire augmente tout seul ?</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    ⭐
                  </span>
                  <span>Comment monter de grade sans repasser d'examen ?</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400 pt-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Avec le Décodeur RH intégré en français simple</span>
                </div>
              </div>
            </div>

            {/* Nested CTA Capsule */}
            <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
              <button
                type="button"
                className="w-full py-3 px-5 rounded-full font-semibold text-xs sm:text-sm bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] text-white dark:text-black transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <span>Découvrir la Version Simplifiée</span>
                <span className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* CARTE 2 : VERSION COMPLÈTE */}
        <div 
          onClick={onSelectComplete}
          className="p-2 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl"
        >
          <div className="rounded-[2.1rem] bg-white dark:bg-[#111114] p-7 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-orange-500/10 text-orange-800 dark:text-orange-300 border border-orange-500/20">
                  Parcours Expert
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors tracking-tight">
                Version Complète
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Le parcours exhaustif pour les gestionnaires et agents souhaitant tout anticiper sur 15 ans :
              </p>

              <ul className="mt-5 space-y-2.5 bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.04] text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                  <span><strong>Frise chronologique prospective</strong> avec projection échelon par échelon</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                  <span><strong>Comparateur d'impacts (« What-If »)</strong> et simulation de congés / mobilités</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                  <span><strong>Checklist des perspectives</strong> (au choix vs examen pro vs concours)</span>
                </li>
              </ul>
            </div>

            {/* Nested CTA Capsule */}
            <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
              <button
                type="button"
                className="w-full py-3 px-5 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <span>Accéder à la Version Complète</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bouton secondaire Apple-style */}
      <div className="text-center pt-3">
        <button
          type="button"
          onClick={onBackToSaisie}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.12] px-4 py-2 rounded-full transition-all inline-flex items-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>Modifier les informations de profil</span>
        </button>
      </div>

    </div>
  );
};
