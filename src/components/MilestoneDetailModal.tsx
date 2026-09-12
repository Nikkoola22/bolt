import React from "react";
import type { JalonTimeline } from "../types/career";
import { formatDateFrench } from "../services/simulationEngine";
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Building2, 
  HelpCircle, 
  Award, 
  DollarSign, 
  Scale, 
  Sparkles,
  BookOpen,
  ArrowRight
} from "lucide-react";

interface MilestoneDetailModalProps {
  jalon: JalonTimeline | null;
  onClose: () => void;
  onOpenAddEvent: (typePredefini?: string) => void;
  isContractuel?: boolean;
}

export const MilestoneDetailModal: React.FC<MilestoneDetailModalProps> = ({
  jalon,
  onClose,
  onOpenAddEvent,
  isContractuel = false,
}) => {
  if (!jalon) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header modal */}
        <div className="bg-gradient-to-r from-slate-950 via-stone-900 to-orange-950/80 p-4 sm:p-5 text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-orange-500/20 text-orange-300 border border-orange-400/30 px-2 py-0.5 rounded-full font-medium">
                Jalon au {formatDateFrench(jalon.date)}
              </span>
              {jalon.statutValidation === "garanti" && (
                <span className="text-xs bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> De plein droit (PPCR)
                </span>
              )}
              {jalon.statutValidation === "conditionnel" && (
                <span className="text-xs bg-purple-500/30 text-purple-200 border border-purple-400/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> Soumis aux critères LDG
                </span>
              )}
              {jalon.statutValidation === "bloque" && (
                <span className="text-xs bg-rose-500/30 text-rose-200 border border-rose-400/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3 h-3" /> Examen éliminatoire manquant
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 leading-snug">
              {jalon.titre}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {jalon.sousTitre}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps déroulant du modal */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-slate-800 dark:text-slate-100">
          
          {/* Section 1 : POURQUOI CETTE DATE ET CE RÉSULTAT ? */}
          <div className="bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200/90 dark:border-orange-800/80 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center gap-2 text-orange-950 dark:text-orange-200 font-bold text-sm mb-2">
              <HelpCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              Pourquoi cette date et cette situation ?
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {jalon.pourquoi}
            </p>

            {/* Impact financier et indiciaire si applicable */}
            {jalon.gainIndiciaire && jalon.gainIndiciaire > 0 ? (
              <div className="mt-3 pt-3 border-t border-orange-200/60 dark:border-orange-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-orange-950 dark:text-orange-200 font-semibold">
                  <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  Nouvel Indice Majoré : <span className="text-sm font-bold text-orange-700 dark:text-orange-300">IM {jalon.indiceMajore}</span> (+{jalon.gainIndiciaire} points)
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
                  <DollarSign className="w-3.5 h-3.5" />
                  Gain estimé : +{Math.round(jalon.gainFinancierBrutMensuel || 0)} € brut / mois
                </div>
              </div>
            ) : null}
          </div>

          {/* Section 2 : QUELLES CONDITIONS SONT ENCORE À REMPLIR ? */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Quelles conditions sont encore à remplir ?
            </h4>

            {jalon.conditionsRemplies.length === 0 && jalon.conditionsManquantes.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Cet événement s applique sans condition statutaire préalable (accord hiérarchique ou demande de l agent).
              </p>
            ) : (
              <div className="space-y-3">
                {/* Conditions remplies */}
                {jalon.conditionsRemplies.map((cond, idx) => (
                  <div key={`rempli-${idx}`} className="p-3 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">{cond.libelle}</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                        Condition validée
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span>Acquis : <strong className="text-slate-800 dark:text-slate-200">{cond.valeurActuelle}</strong></span>
                      <span>Requis : <strong className="text-slate-800 dark:text-slate-200">{cond.valeurRequise}</strong></span>
                    </div>
                    <div className="w-full bg-emerald-100 dark:bg-emerald-950/80 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5">{cond.detailsExplicatifs}</p>
                  </div>
                ))}

                {/* Conditions manquantes ou en cours */}
                {jalon.conditionsManquantes.map((cond, idx) => (
                  <div key={`manque-${idx}`} className="p-3 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {cond.statut === "bloquante" ? (
                          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{cond.libelle}</span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        cond.statut === "bloquante"
                          ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                          : "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300"
                      }`}>
                        {cond.statut === "bloquante" ? "Élément bloquant" : "En cours d acquisition"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span>Actuel : <strong className="text-slate-800 dark:text-slate-200">{cond.valeurActuelle}</strong></span>
                      <span>Requis : <strong className="text-slate-800 dark:text-slate-200">{cond.valeurRequise}</strong></span>
                    </div>
                    <div className="w-full bg-amber-100 dark:bg-amber-950/80 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${cond.statut === "bloquante" ? "bg-rose-500" : "bg-amber-500"}`} 
                        style={{ width: `${cond.progressionPourcent}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1.5">{cond.detailsExplicatifs}</p>
                    {cond.tempsRestantTexte && (
                      <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 mt-1">
                        &rarr; {cond.tempsRestantTexte}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3 : QUELS JUSTIFICATIFS OU DÉCISIONS SONT NÉCESSAIRES ? */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Quels justificatifs ou décisions administratives sont nécessaires ?
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Pièces fournies par l agent */}
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2 text-xs">
                  <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  À fournir par l agent :
                </div>
                {jalon.justificatifsRequis.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400 italic">Aucune démarche particulière pour l agent.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {jalon.justificatifsRequis.map((piece, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                        <span>{piece}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Décisions et actes DRH / Collectivité */}
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2 text-xs">
                  <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Décisions & actes DRH :
                </div>
                {jalon.decisionsAdministrativesRequises.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400 italic">Aucun acte spécifique requis.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {jalon.decisionsAdministrativesRequises.map((acte, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                        <span>{acte}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Section 4 : HYPOTHÈSES & LIGNES DIRECTRICES DE GESTION */}
          {jalon.hypothesesEtAlertes.length > 0 && (
            <div className="bg-slate-100/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl text-xs text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                Cadre réglementaire & Lignes Directrices de Gestion (LDG) :
              </div>
              <ul className="space-y-1">
                {jalon.hypothesesEtAlertes.map((hypo, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span>{hypo}</span>
                  </li>
                ))}
              </ul>
              {jalon.referenceReglementaire && (
                <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Réf. : {jalon.referenceReglementaire}
                </div>
              )}
            </div>
          )}

          {/* Section 5 : "ET SI..." - MODIFIER LES HYPOTHÈSES */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Tester des hypothèses qui modifient cette échéance :
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenAddEvent("temps_partiel");
                }}
                className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Et si je passais à 80% (Temps partiel) ?</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
              {isContractuel ? (
                <>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddEvent("reussite_concours");
                    }}
                    className="text-xs bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200/90 dark:border-emerald-800 font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>🏆 Et si je réussissais le concours interne ?</span>
                    <ArrowRight className="w-3 h-3 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddEvent("conge_parental");
                    }}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Et si je prenais un congé parental ?</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddEvent("disponibilite");
                    }}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Et si je prenais 1 an de dispo ?</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddEvent("examen_professionnel");
                    }}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Et si je réussissais l examen pro ?</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Footer modal */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Simulation indicative • Contrôle final impératif par la DRH
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-xs font-semibold bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Fermer la fiche
          </button>
        </div>

      </div>
    </div>
  );
};
