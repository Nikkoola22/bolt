import React from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { runSimulation, formatDateFrench } from "../services/simulationEngine";
import { GitCompare } from "lucide-react";

interface ScenarioComparatorProps {
  currentProfile: ProfilAgent;
  currentResult: ResultatSimulation;
  }

export const ScenarioComparator: React.FC<ScenarioComparatorProps> = ({
  currentProfile,
  currentResult,
}) => {
  // Calcul du scénario de référence sans aucun événement
  const referenceProfile: ProfilAgent = {
    ...currentProfile,
    quotiteActuelle: 100,
    evenementsSimules: [],
  };

  const referenceResult = runSimulation(referenceProfile);

  const isContractuel = currentProfile.statut.startsWith("contractuel");
  const hasSimulatedEvents = currentProfile.evenementsSimules.length > 0;

  // Comparaison prochain échelon
  const refNextEch = referenceResult.prochainEchelonJalon;
  const simNextEch = currentResult.prochainEchelonJalon;

  const isShifted = refNextEch && simNextEch && refNextEch.date !== simNextEch.date;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 shadow-2xs">
            <GitCompare className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Comparateur d impacts de scénarios (« What-If »)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparez le parcours standard linéaire (100% sans interruption) avec vos événements simulés.
            </p>
          </div>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-center shadow-2xs ${
          hasSimulatedEvents
            ? "bg-indigo-50 text-indigo-900 border-indigo-200"
            : "bg-slate-100 text-slate-700 border-slate-200"
        }`}>
          {hasSimulatedEvents
            ? `${currentProfile.evenementsSimules.length} événement(s) simulé(s)`
            : "Parcours de référence standard"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Colonne 1 : Scénario Référence */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              Parcours de Référence
            </span>
            <span className="text-[11px] bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded-md font-bold border border-slate-300/60">
              Temps plein continu (100%)
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-800">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">
                {isContractuel ? "Prochaine réévaluation triennale :" : "Prochain échelon garanti :"}
              </div>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                {refNextEch ? formatDateFrench(refNextEch.date) : "Sommet de grade"}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                {refNextEch ? `${refNextEch.echelonNumero}e échelon (IM ${refNextEch.indiceMajore})` : ""}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">
                {isContractuel ? "Éligibilité Concours Interne (Titularisation) :" : "Première promouvabilité de grade :"}
              </div>
              <div className="font-extrabold text-slate-900 mt-0.5">
                {isContractuel
                  ? referenceResult.premierePromouvabiliteInterne
                    ? formatDateFrench(referenceResult.premierePromouvabiliteInterne.date)
                    : "Condition d ancienneté acquise"
                  : referenceResult.premierePromouvabiliteGrade
                  ? formatDateFrench(referenceResult.premierePromouvabiliteGrade.date)
                  : "Non applicable"}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed italic pt-1">
              {isContractuel
                ? "Périodicité triennale de réévaluation de la rémunération (Décret 88-145 art. 1-2)."
                : "Avancement de plein droit à cadence unique PPCR sans interruption d activité."}
            </p>
          </div>
        </div>

        {/* Colonne 2 : Scénario Simulé */}
        <div className={`border rounded-2xl p-5 space-y-3.5 shadow-2xs transition-all ${
          hasSimulatedEvents
            ? "bg-indigo-50/50 border-indigo-200/90 ring-2 ring-indigo-500/10"
            : "bg-slate-50/80 border-slate-200/90"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              Scénario Actuellement Simulé
            </span>
            <span className="text-[11px] bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-md font-bold border border-indigo-200/70">
              Vos choix déclarés
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-800">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">
                {isContractuel ? "Prochaine réévaluation recalculée :" : "Prochain échelon recalculé :"}
              </div>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5 flex items-center gap-2">
                <span>{simNextEch ? formatDateFrench(simNextEch.date) : "Sommet de grade"}</span>
                {isShifted && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 font-extrabold px-2 py-0.5 rounded-md">
                    Décalé
                  </span>
                )}
              </div>
              <div className="text-[11px] text-indigo-700 font-bold mt-0.5">
                {simNextEch ? `${simNextEch.echelonNumero}e échelon (IM ${simNextEch.indiceMajore})` : ""}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">
                {isContractuel ? "Éligibilité Concours Interne (Titularisation) :" : "Première promouvabilité de grade :"}
              </div>
              <div className="font-extrabold text-slate-900 mt-0.5">
                {isContractuel
                  ? currentResult.premierePromouvabiliteInterne
                    ? formatDateFrench(currentResult.premierePromouvabiliteInterne.date)
                    : "Condition d ancienneté acquise"
                  : currentResult.premierePromouvabiliteGrade
                  ? formatDateFrench(currentResult.premierePromouvabiliteGrade.date)
                  : "Non applicable"}
              </div>
            </div>

            <div className="text-[11px] text-slate-700">
              {hasSimulatedEvents ? (
                <div className="space-y-1.5 bg-indigo-100/50 p-3 rounded-xl border border-indigo-200/60">
                  {currentResult.synthesePedagogique.alertesVigilance.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-indigo-950 font-medium">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{alt}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic leading-relaxed pt-1">
                  {isContractuel
                    ? "Ajoutez un événement dans le simulateur (temps partiel, congé parental) pour visualiser immédiatement les impacts."
                    : "Ajoutez un événement dans le simulateur (temps partiel, disponibilité, examen pro) pour visualiser immédiatement les écarts."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
