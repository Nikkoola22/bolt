import React, { useEffect } from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { findCadreAndGrade } from "../services/simulationEngine";
import { Zap, Layers, ArrowRight, FileEdit, CheckCircle2, Sparkles } from "lucide-react";

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
  // S'assurer que la page s'affiche directement tout en haut
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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-2 sm:py-6">
      
      {/* En-tête de validation de simulation affiché en haut */}
      <div className="text-center space-y-3.5">
        <div className="inline-flex items-center gap-2.5 bg-emerald-50 text-emerald-900 border-2 border-emerald-300 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Données enregistrées pour <strong>{profil.prenom}</strong> • {cadreLibelle} ({statutLibelle})
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Comment souhaitez-vous consulter votre carrière ?
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Choisissez le mode d exploration le plus adapté à votre besoin du moment. Vous pourrez basculer de l un à l autre à tout instant.
        </p>
      </div>

      {/* Les Deux Grands Boutons / Cartes de Choix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARTE 1 : VERSION SIMPLIFIÉE */}
        <div 
          onClick={onSelectSimplified}
          className="bg-white hover:bg-gradient-to-br hover:from-amber-50/40 hover:via-white hover:to-orange-50/30 border-2 border-slate-200/90 hover:border-amber-400 rounded-3xl p-6 sm:p-8 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Liseré subtil supérieur */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-80"></div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-300/60 flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-amber-600 fill-amber-500/30" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-300 px-3 py-1 rounded-full">
                Accès direct & Rapide
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-800 transition-colors">
              Version Simplifiée
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Obtenez une réponse directe, synthétique et chiffrée à vos deux questions essentielles sans surcharge d information :
            </p>

            <div className="mt-5 space-y-2.5 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70 text-xs">
              <div className="flex items-center gap-2.5 font-bold text-slate-800">
                <span className="w-6 h-6 rounded-lg bg-white border border-amber-300 text-amber-700 flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                  1
                </span>
                <span>Quand vais-je avoir un échelon supplémentaire ?</span>
              </div>
              <div className="flex items-center gap-2.5 font-bold text-slate-800">
                <span className="w-6 h-6 rounded-lg bg-white border border-amber-300 text-amber-700 flex items-center justify-center font-black shrink-0 text-xs shadow-2xs">
                  2
                </span>
                <span>Quand vais-je avoir un avancement ? promotion ?</span>
              </div>
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-slate-100">
            <button
              type="button"
              className="w-full py-3.5 px-5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-amber-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Choisir la Version Simplifiée</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* CARTE 2 : VERSION COMPLÈTE */}
        <div 
          onClick={onSelectComplete}
          className="bg-white hover:bg-gradient-to-br hover:from-orange-50/40 hover:via-white hover:to-amber-50/30 border-2 border-slate-200/90 hover:border-orange-500 rounded-3xl p-6 sm:p-8 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Liseré subtil supérieur */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 opacity-80"></div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="w-13 h-13 rounded-2xl bg-orange-500/10 text-orange-600 border border-orange-300/60 flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7 text-orange-600" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-950 bg-orange-100/80 border border-orange-300 px-3 py-1 rounded-full">
                Parcours exhaustif
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-orange-800 transition-colors">
              Version Complète
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Le processus complet avec la frise chronologique prospective sur 15 ans, vos perspectives et le comparateur :
            </p>

            <ul className="mt-5 space-y-2.5 bg-orange-50/40 p-4 rounded-2xl border border-orange-200/70 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span><strong>Frise chronologique interactive</strong> avec calculs indiciaires échelon par échelon</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span><strong>Checklist des perspectives</strong> (au choix vs examen pro vs promotion interne)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span><strong>Comparateur d impacts (« What-If »)</strong> et simulation d événements de vie</span>
              </li>
            </ul>
          </div>

          <div className="mt-7 pt-5 border-t border-slate-100">
            <button
              type="button"
              className="w-full py-3.5 px-5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Choisir la Version Complète</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

      {/* Bouton secondaire pour modifier les données */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToSaisie}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/90 px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer border border-slate-300/80 shadow-2xs"
        >
          <FileEdit className="w-3.5 h-3.5 text-slate-500" />
          <span>Modifier mes informations de profil</span>
        </button>
      </div>

    </div>
  );
};
