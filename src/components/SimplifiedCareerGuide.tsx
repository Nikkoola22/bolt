import React, { useState } from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { formatDateFrench, diffMonths, formatDurationInYearsAndMonths } from "../services/simulationEngine";
import { 
  Clock, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  FileEdit
} from "lucide-react";

interface SimplifiedCareerGuideProps {
  profil: ProfilAgent;
  resultatSimulation: ResultatSimulation;
  onSwitchToComplete: () => void;
  onEditProfile: () => void;
  onOpenAddEvent?: (type?: string) => void;
}

export const SimplifiedCareerGuide: React.FC<SimplifiedCareerGuideProps> = ({
  profil,
  resultatSimulation,
  onSwitchToComplete,
  onEditProfile,
  onOpenAddEvent: _onOpenAddEvent,
}) => {
  // Question active : "echelon" (Échelon supplémentaire) ou "promotion" (Avancement / Promotion)
  const [activeQuestion, setActiveQuestion] = useState<"echelon" | "promotion">("echelon");

  const isContractuel = profil.statut.startsWith("contractuel");
  const prochainEchelon = resultatSimulation.prochainEchelonJalon;
  const prochainePromouvabilite = resultatSimulation.premierePromouvabiliteGrade || resultatSimulation.premierePromouvabiliteInterne;

  // Calcul du temps restant pour l échelon
  const todayStr = new Date().toISOString().split("T")[0];
  const moisRestantsEchelon = prochainEchelon ? Math.max(0, diffMonths(todayStr, prochainEchelon.date)) : 0;
  const delaiEchelonTexte = formatDurationInYearsAndMonths(moisRestantsEchelon);

  // Calcul du temps restant pour la promotion
  const moisRestantsPromo = prochainePromouvabilite ? Math.max(0, diffMonths(todayStr, prochainePromouvabilite.date)) : 0;
  const delaiPromoTexte = formatDurationInYearsAndMonths(moisRestantsPromo);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Bandeau d en-tête avec rappel du profil de l agent */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0 ring-2 ring-white/10">
            {profil.prenom.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-lg text-white">
                Version Simplifiée • {profil.prenom}
              </span>
              <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-bold">
                {isContractuel ? "Agent Contractuel" : "Fonctionnaire Titulaire"}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {resultatSimulation.jalonActuel.gradeNom} • Échelon {profil.echelonActuel} (IM {resultatSimulation.jalonActuel.indiceMajore})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={onEditProfile}
            className="text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FileEdit className="w-3.5 h-3.5 text-blue-400" />
            <span>Modifier ma saisie</span>
          </button>

          <button
            onClick={onSwitchToComplete}
            className="text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/25"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Voir Version Complète</span>
          </button>
        </div>
      </div>

      {/* BLOC DES DEUX BOUTONS DE QUESTIONS ESSENTIELLES */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 sm:p-7 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Que souhaitez-vous savoir en priorité ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cliquez sur l une des deux questions pour obtenir une réponse directe, chiffrée et conforme aux statuts.
          </p>
        </div>

        {/* Les 2 grands boutons de sélection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Bouton 1 : Échelon supplémentaire */}
          <button
            type="button"
            onClick={() => setActiveQuestion("echelon")}
            className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
              activeQuestion === "echelon"
                ? "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 border-emerald-600 shadow-md ring-4 ring-emerald-500/15 scale-[1.01]"
                : "bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-emerald-300"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`p-2.5 rounded-xl border ${
                activeQuestion === "echelon"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100"
              }`}>
                <Clock className="w-6 h-6" />
              </span>
              {activeQuestion === "echelon" && (
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  Actif
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                Quand vais-je avoir un échelon supplémentaire ?
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isContractuel 
                  ? "Réévaluation triennale indicative, date de prochain palier et revalorisation de salaire."
                  : "Date d avancement garanti de plein droit (PPCR), nouvel indice majoré et gain brut mensuel."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>
                {prochainEchelon ? `Échéance : ${formatDateFrench(prochainEchelon.date)}` : "Dernier échelon atteint"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Bouton 2 : Avancement / Promotion */}
          <button
            type="button"
            onClick={() => setActiveQuestion("promotion")}
            className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
              activeQuestion === "promotion"
                ? "bg-gradient-to-br from-purple-50/90 via-white to-violet-50/40 border-purple-600 shadow-md ring-4 ring-purple-500/15 scale-[1.01]"
                : "bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-purple-300"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`p-2.5 rounded-xl border ${
                activeQuestion === "promotion"
                  ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                  : "bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-100"
              }`}>
                <TrendingUp className="w-6 h-6" />
              </span>
              {activeQuestion === "promotion" && (
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 bg-purple-100 border border-purple-300 px-2.5 py-0.5 rounded-full">
                  Actif
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-purple-800 transition-colors">
                Quand vais-je avoir un avancement ? promotion ?
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isContractuel
                  ? "Conditions d accès au statut pérenne de titulaire (Concours Interne ou intégration directe C1)."
                  : "Date d éligibilité au grade supérieur, conditions statutaires requises et examen professionnel."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-purple-800">
              <span>
                {prochainePromouvabilite ? `Éligible dès le : ${formatDateFrench(prochainePromouvabilite.date)}` : "Grade sommital"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        {/* CONTENU DE LA RÉPONSE SÉLECTIONNÉE */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          
          {/* RÉPONSE 1 : ÉCHELON SUPPLÉMENTAIRE */}
          {activeQuestion === "echelon" && (
            <div className="space-y-6 animate-fadeIn">
              {prochainEchelon ? (
                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 border border-emerald-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                        {isContractuel ? "Réévaluation indicative (Contractuel)" : "Avancement garanti (De plein droit)"}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                        {prochainEchelon.titre}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {prochainEchelon.sousTitre}
                      </p>
                    </div>

                    <div className="self-start sm:self-center shrink-0">
                      <span className="animate-blink-date inline-flex items-center gap-2 text-sm sm:text-base font-black text-emerald-950 bg-white border border-emerald-300 px-4 py-2 rounded-2xl shadow-xs">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                        </span>
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>{formatDateFrench(prochainEchelon.date)}</span>
                      </span>
                    </div>
                  </div>

                  {/* 3 Cartes d impacts chiffrés */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        Délai restant
                      </div>
                      <div className="text-xl font-black text-emerald-950 mt-1">
                        {delaiEchelonTexte}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        À compter d aujourd hui
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-indigo-600" />
                        Nouvel Indice Majoré
                      </div>
                      <div className="text-xl font-black text-indigo-950 mt-1 flex items-baseline gap-1.5">
                        <span>IM {prochainEchelon.indiceMajore}</span>
                        {prochainEchelon.gainIndiciaire && (
                          <span className="text-xs font-bold text-emerald-600">
                            (+{prochainEchelon.gainIndiciaire} pts)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Indice Brut : {prochainEchelon.indiceBrut}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                        Gain Brut Mensuel
                      </div>
                      <div className="text-xl font-black text-teal-950 mt-1">
                        ~+{Math.round(prochainEchelon.gainFinancierBrutMensuel || 0)} € <span className="text-xs font-bold text-slate-500">/ mois</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Traitement brut : ~{Math.round(prochainEchelon.traitementBrutMensuel)} € / mois
                      </div>
                    </div>
                  </div>

                  {/* Explication statutaire & démarches */}
                  <div className="bg-white/80 p-4 sm:p-5 rounded-xl border border-emerald-200 text-xs space-y-2">
                    <div className="font-extrabold text-emerald-950 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {isContractuel ? "Règle de réévaluation contractuelle :" : "Garantie statutaire de plein droit :"}
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {isContractuel ? (
                        <>
                          En tant qu <strong>agent contractuel</strong> (Décret n° 88-145), vous ne bénéficiez pas d avancements automatiques par arrêté. Votre rémunération fait l objet d une <strong>réévaluation indicative au moins tous les 3 ans</strong> par avenant de la Collectivité de Gennevilliers.
                        </>
                      ) : (
                        <>
                          En tant que <strong>fonctionnaire titulaire</strong>, le passage à l échelon supérieur s effectue à <strong>cadence unique PPCR</strong>. Cet avancement est <strong>garanti de plein droit</strong> : aucune démarche de votre part n est nécessaire, l arrêté est édité automatiquement par la DRH de Gennevilliers à la date d effet.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-600">
                  Vous avez atteint l échelon sommital de votre grade. Votre évolution indiciaire ultérieure passe par un avancement de grade.
                </div>
              )}
            </div>
          )}

          {/* RÉPONSE 2 : AVANCEMENT / PROMOTION */}
          {activeQuestion === "promotion" && (
            <div className="space-y-6 animate-fadeIn">
              {prochainePromouvabilite ? (
                <div className="bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 border border-purple-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full">
                        {prochainePromouvabilite.titre.includes("Concours") 
                          ? "Concours Interne & Titularisation" 
                          : "Perspective d Avancement de Grade"}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                        {prochainePromouvabilite.titre}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {prochainePromouvabilite.sousTitre}
                      </p>
                    </div>

                    <div className="self-start sm:self-center shrink-0 flex flex-col sm:items-end gap-1">
                      <span className="animate-blink-date inline-flex items-center gap-2 text-sm sm:text-base font-black text-purple-950 bg-white border border-purple-300 px-4 py-2 rounded-2xl shadow-xs">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
                        </span>
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>Éligible le {formatDateFrench(prochainePromouvabilite.date)}</span>
                      </span>
                      <span className="text-[11px] text-purple-800 font-bold bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-300 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-600" />
                        <span>Dans {delaiPromoTexte}</span>
                      </span>
                    </div>
                  </div>

                  {/* Jauge des conditions statutaires requises */}
                  <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        État de vos conditions statutaires :
                      </span>
                      <span className="font-extrabold text-purple-950">
                        {prochainePromouvabilite.conditionsRemplies.length} / {prochainePromouvabilite.conditionsRemplies.length + prochainePromouvabilite.conditionsManquantes.length} conditions validées
                      </span>
                    </div>

                    <div className="space-y-2">
                      {prochainePromouvabilite.conditionsRemplies.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium">{c.libelle} (Validé)</span>
                        </div>
                      ))}

                      {prochainePromouvabilite.conditionsManquantes.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80">
                          {c.statut === "bloquante" ? (
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                          <span className="font-medium">{c.libelle}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Règles juridiques LDG & Pouvoir discrétionnaire */}
                  <div className="bg-white/80 p-4 sm:p-5 rounded-xl border border-purple-200 text-xs space-y-2">
                    <div className="font-extrabold text-purple-950 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-600" />
                      Règle statutaire fondamentale (CGFP) :
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Contrairement à l avancement d échelon, l <strong>avancement de grade n est pas automatique</strong>. 
                      Remplir les conditions statutaires ouvre votre <em>promouvabilité</em>, mais la promotion effective dépend de votre inscription au <strong>tableau annuel d avancement</strong> par l autorité territoriale dans le cadre des <strong>Lignes Directrices de Gestion (LDG)</strong> de Gennevilliers.
                    </p>
                  </div>

                  {/* Pièces clés */}
                  {prochainePromouvabilite.justificatifsRequis.length > 0 && (
                    <div className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-purple-200/80">
                      <span className="font-bold text-slate-900">Éléments à anticiper :</span>
                      <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600">
                        {prochainePromouvabilite.justificatifsRequis.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-600">
                  Aucune perspective d avancement direct identifiée pour ce grade. Vous êtes au sommet de votre cadre d emplois.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BANNIÈRE DE REDIRECTION VERS LA VERSION COMPLÈTE */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Approfondir votre simulation
          </div>
          <h3 className="text-base sm:text-lg font-black text-white mt-1">
            Envie de visualiser l intégralité de votre frise sur 15 ans ?
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            La Version Complète vous offre la frise prospective détaillée, la checklist de toutes les conditions, le comparateur d impacts et la simulation d événements de vie (temps partiel, congé parental, disponibilité, concours).
          </p>
        </div>

        <button
          onClick={onSwitchToComplete}
          className="w-full sm:w-auto px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-md shadow-emerald-900/30 active:scale-[0.98] transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2 border border-emerald-300/30"
        >
          <span>Accéder à la Version Complète</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
