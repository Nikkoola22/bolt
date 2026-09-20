import React, { useEffect } from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { findCadreAndGrade } from "../services/simulationEngine";
import { Zap, Layers, ArrowRight, FileEdit, CircleCheck, Sparkles, Smile, Award } from "lucide-react";

interface ModeSelectionViewProps {
  profil: ProfilAgent;
  resultatSimulation: ResultatSimulation;
  onSelectSimplified: () => void;
  onSelectComplete: () => void;
  onBackToSaisie: () => void;
  onOpenLdg: () => void;
  onOpenMemento: () => void;
}

export const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({
  profil,
  resultatSimulation,
  onSelectSimplified,
  onSelectComplete,
  onBackToSaisie,
  onOpenLdg,
  onOpenMemento,
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
      
      {/* En-tête Apple Keynote épuré avec profil et action rapide */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <div className="inline-flex items-center gap-2 bg-lime-cream/30 text-ebony dark:text-lime-cream border border-muted-teal/40 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <CircleCheck className="w-3.5 h-3.5 text-muted-teal shrink-0" />
            <span>
              Simulation prête pour <strong>{profil.prenom}</strong> • {cadreLibelle} ({statutLibelle})
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToSaisie}
            className="inline-flex items-center gap-1.5 bg-orange-100 hover:bg-orange-200 dark:bg-orange-950/60 dark:hover:bg-orange-900/60 text-orange-950 dark:text-orange-200 border-2 border-orange-300 dark:border-orange-700/80 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-[0.98]"
            title="Modifier mes informations de profil"
          >
            <FileEdit className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>Modifier les informations de profil</span>
          </button>
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
                <span className="w-12 h-12 rounded-2xl bg-apricot/30 text-ebony dark:text-apricot flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <Smile className="w-6 h-6" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-apricot/40 text-ebony dark:text-apricot border border-tangerine/30 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-ebony dark:text-apricot" />
                  Essentiel & Visuel
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-tangerine-dark dark:group-hover:text-apricot transition-colors tracking-tight">
                Version Simplifiée
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Réponses directes et chiffrées à vos 2 questions du quotidien, sans jargon administratif :
              </p>

              <div className="mt-5 space-y-2.5 bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.04] text-xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-lime-cream text-ebony flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    💰
                  </span>
                  <span>Quand et de combien mon salaire augmente tout seul ?</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-apricot text-ebony flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    ⭐
                  </span>
                  <span>Comment monter de grade ou de catégorie sans repasser d'examen ?</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400 pt-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-apricot shrink-0" />
                  <span>Avec le Décodeur RH intégré en français simple</span>
                </div>
              </div>
            </div>

            {/* Nested CTA Capsule */}
            <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
              <button
                type="button"
                className="w-full py-3 px-5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-apricot via-tangerine to-apricot text-ebony hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-[0.98]"
              >
                <span>Découvrir la Version Simplifiée</span>
                <span className="w-6 h-6 rounded-full bg-ebony/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-ebony" />
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
                <span className="w-12 h-12 rounded-2xl bg-tangerine/20 text-ebony dark:text-tangerine flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-tangerine/20 text-ebony dark:text-tangerine border border-tangerine/30">
                  Parcours Expert
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-tangerine-dark dark:group-hover:text-tangerine transition-colors tracking-tight">
                Version Complète
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Le parcours exhaustif pour les gestionnaires et agents souhaitant tout anticiper sur 15 ans :
              </p>

              <ul className="mt-5 space-y-2.5 bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.04] text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tangerine shrink-0"></span>
                  <span><strong>Frise chronologique prospective</strong> avec projection échelon par échelon</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tangerine shrink-0"></span>
                  <span><strong>Comparateur d'impacts (« What-If »)</strong> et simulation de congés / mobilités</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tangerine shrink-0"></span>
                  <span><strong>Checklist des perspectives</strong> (au choix vs examen pro vs concours)</span>
                </li>
              </ul>
            </div>

            {/* Nested CTA Capsule */}
            <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
              <button
                type="button"
                className="w-full py-3 px-5 rounded-full font-black text-xs sm:text-sm bg-gradient-to-r from-tangerine via-apricot to-tangerine text-ebony hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-[0.98]"
              >
                <span>Accéder à la Version Complète</span>
                <span className="w-6 h-6 rounded-full bg-ebony/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-ebony" />
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* CARTE 3 & 4 : SIMULATEUR DE POINTS LDG & MEMENTO RH (En dessous des 2 premières cartes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={onOpenLdg}
          className="w-full p-2 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl"
        >
          <div className="rounded-[2.1rem] bg-white dark:bg-[#111114] p-7 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-amber-500/20 text-ebony dark:text-amber-400 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-ebony dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  Barème Officiel LDG
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-tangerine-dark dark:group-hover:text-apricot transition-colors tracking-tight">
                Simulateur de Points LDG
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Le barème officiel de promotion interne (CIG Petite Couronne & Ville de Gennevilliers) pour estimer vos points :
              </p>

              <div className="mt-5 space-y-2.5 bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.04] text-xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    🎯
                  </span>
                  <span>Calcul ciblé par catégorie (passage de C en B ou de B en A)</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    📊
                  </span>
                  <span>Ancienneté générale, valeur professionnelle et parcours d'encadrement</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400 pt-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Résultat interactif et synthèse détaillée en temps réel</span>
                </div>
              </div>
            </div>

            {/* Nested CTA Capsule */}
            <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
              <button
                type="button"
                className="w-full py-3 px-5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-apricot via-tangerine to-apricot text-ebony hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-[0.98]"
              >
                <span>Comprendre et simuler mes points</span>
                <span className="w-6 h-6 rounded-full bg-ebony/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-ebony" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* CARTE 4 : MEMENTO RH */}
        <div 
          onClick={onOpenMemento}
          className="w-full p-2 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl"
        >
          <div className="rounded-[2.1rem] bg-white dark:bg-[#111114] p-7 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-ebony dark:text-indigo-400 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-600 dark:text-indigo-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-indigo-500/20 text-ebony dark:text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  Boîte à outils
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-tangerine-dark dark:group-hover:text-apricot transition-colors tracking-tight">
                MementoRH
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Boîte à outils pratique avec simulateurs et modèles de documents RH :
              </p>

              <div className="mt-5 space-y-2.5 bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.04] text-xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    💶
                  </span>
                  <span>Simulateurs de paie et de net à payer</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                    📜
                  </span>
                  <span>Outils réglementaires (temps de travail, maladie)</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400 pt-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>Modules ciblés (Profil gestionnaire / agent)</span>
                </div>
              </div>
            </div>

            {/* Nested CTA Capsule */}
            <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
              <button
                type="button"
                className="w-full py-3 px-5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-apricot via-tangerine to-apricot text-ebony hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-[0.98]"
              >
                <span>Explorer les outils</span>
                <span className="w-6 h-6 rounded-full bg-ebony/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-ebony" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action : modifier le profil avec visibilité maximale */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50/60 to-orange-50 dark:from-orange-950/40 dark:via-slate-900 dark:to-orange-950/30 border-2 border-orange-200 dark:border-orange-800/80 shadow-md">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-tangerine to-apricot text-ebony flex items-center justify-center shrink-0 shadow-sm font-black ring-2 ring-orange-400/30">
              <FileEdit className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                Besoin d'ajuster votre situation ou de tester un autre scénario ?
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Profil actuel : <span className="font-bold text-slate-900 dark:text-slate-200">{profil.prenom}</span> • {cadreLibelle} ({statutLibelle})
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToSaisie}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-extrabold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] shrink-0 border-2 border-orange-400/40 dark:border-orange-500/40"
          >
            <FileEdit className="w-4 h-4 text-orange-400 dark:text-orange-600" />
            <span>Modifier les informations de profil</span>
          </button>
        </div>
      </div>

    </div>
  );
};
