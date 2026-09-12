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
  FileEdit,
  Milestone
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
  // Question active : "echelon" (Échelons supplémentaires) ou "promotion" (Avancement / Promotion au choix)
  const [activeQuestion, setActiveQuestion] = useState<"echelon" | "promotion">("echelon");

  const isContractuel = profil.statut.startsWith("contractuel");
  const todayStr = new Date().toISOString().split("T")[0];

  // 1. Calcul de l'évolution sur les 2 prochains échelons
  const echelonsFuturs = resultatSimulation.jalons.filter((j) => j.typeJalon === "avancement_echelon");
  const premierEchelon = echelonsFuturs[0] || null;
  const deuxiemeEchelon = echelonsFuturs[1] || null;

  // Calculs 1er échelon
  const moisRestantsPremier = premierEchelon ? Math.max(0, diffMonths(todayStr, premierEchelon.date)) : 0;
  const delaiPremierTexte = formatDurationInYearsAndMonths(moisRestantsPremier);

  // Calculs 2ème échelon
  const moisRestantsDeuxieme = deuxiemeEchelon ? Math.max(0, diffMonths(todayStr, deuxiemeEchelon.date)) : 0;
  const delaiDeuxiemeTexte = formatDurationInYearsAndMonths(moisRestantsDeuxieme);
  const moisEntreEchelons = (premierEchelon && deuxiemeEchelon) ? Math.max(0, diffMonths(premierEchelon.date, deuxiemeEchelon.date)) : 0;
  const delaiEntreEchelonsTexte = formatDurationInYearsAndMonths(moisEntreEchelons);

  // Gains cumulés 2ème échelon par rapport à la situation actuelle
  const gainIndiciaireDeuxiemeCumule = deuxiemeEchelon ? (deuxiemeEchelon.indiceMajore - resultatSimulation.jalonActuel.indiceMajore) : 0;
  const gainFinancierDeuxiemeCumule = deuxiemeEchelon ? (deuxiemeEchelon.traitementBrutMensuel - resultatSimulation.jalonActuel.traitementBrutMensuel) : 0;

  // 2. Recherche prioritaire de la promouvabilité au choix (sans examen professionnel obligatoire)
  const promouvabiliteAuChoixGrade = resultatSimulation.jalons.find(
    (j) => j.typeJalon === "promouvabilite_grade" &&
           (j.id.endsWith("-au_choix") || j.id.includes("au_choix") || j.titre.toLowerCase().includes("au choix") || j.sousTitre?.toLowerCase().includes("au choix"))
  );

  const promouvabiliteAuChoixInterne = resultatSimulation.jalons.find(
    (j) => j.typeJalon === "promouvabilite_interne" &&
           (j.id.endsWith("-au_choix") || j.id.includes("au_choix") || j.titre.toLowerCase().includes("au choix") || j.sousTitre?.toLowerCase().includes("au choix"))
  );

  const promouvabiliteSansExamen = resultatSimulation.jalons.find(
    (j) => (j.typeJalon === "promouvabilite_grade" || j.typeJalon === "promouvabilite_interne") &&
           !j.conditionsManquantes.some(c => c.libelle.toLowerCase().includes("examen")) &&
           !j.conditionsRemplies.some(c => c.libelle.toLowerCase().includes("examen"))
  );

  // Promouvabilité affichée (priorité absolue au choix)
  const prochainePromouvabilite = promouvabiliteAuChoixGrade || promouvabiliteAuChoixInterne || promouvabiliteSansExamen || resultatSimulation.premierePromouvabiliteGrade || resultatSimulation.premierePromouvabiliteInterne;

  // Jalon d'examen pro alternatif s'il existe (pour information)
  const jalonExamenPro = resultatSimulation.jalons.find(
    (j) => (j.typeJalon === "promouvabilite_grade" || j.typeJalon === "promouvabilite_interne") &&
           (j.id.includes("examen_professionnel") || j.titre.toLowerCase().includes("examen pro") || j.conditionsManquantes.some(c => c.libelle.toLowerCase().includes("examen")))
  );

  // Temps restant pour la promotion au choix
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
          
          {/* Bouton 1 : Échelons supplémentaires (Évolution sur 2 échelons) */}
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
                {premierEchelon 
                  ? (deuxiemeEchelon 
                      ? `Évolution détaillée sur vos 2 prochains échelons (Échelon ${premierEchelon.echelonNumero} puis ${deuxiemeEchelon.echelonNumero}) avec gains cumulés.` 
                      : `Prochain palier indiciaire : Échelon ${premierEchelon.echelonNumero} (dernier échelon du grade).`)
                  : "Dernier échelon sommital du grade déjà atteint."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>
                {premierEchelon 
                  ? `1er : ${formatDateFrench(premierEchelon.date)} ${deuxiemeEchelon ? `• 2e : ${formatDateFrench(deuxiemeEchelon.date)}` : ""}`
                  : "Dernier échelon atteint"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Bouton 2 : Avancement / Promotion (Voie Au Choix) */}
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
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-purple-800 transition-colors">
                  Quand vais-je avoir un avancement ? promotion ?
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isContractuel
                  ? "Conditions d'accès au statut pérenne de titulaire (Concours Interne ou intégration directe C1)."
                  : "Avancement au choix (tableau d'avancement annuel au mérite et à l'ancienneté, sans examen professionnel)."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-purple-800">
              <span>
                {prochainePromouvabilite ? `Éligible au choix dès le : ${formatDateFrench(prochainePromouvabilite.date)}` : "Grade sommital"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        {/* CONTENU DE LA RÉPONSE SÉLECTIONNÉE */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          
          {/* RÉPONSE 1 : ÉVOLUTION DES DEUX PROCHAINS ÉCHELONS */}
          {activeQuestion === "echelon" && (
            <div className="space-y-6 animate-fadeIn">
              {premierEchelon ? (
                <div className="space-y-6">
                  
                  {/* FRISSE ÉTAPE PAR ÉTAPE : SITUATION ACTUELLE -> 1ER ÉCHELON -> 2E ÉCHELON */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Milestone className="w-4 h-4" />
                        Trajectoire sur vos 2 prochains échelons
                      </span>
                      <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                        {isContractuel ? "Réévaluations triennales" : "Cadence PPCR garantie"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                      
                      {/* Palier 0 : Aujourd'hui */}
                      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Situation Actuelle</span>
                        <div className="text-base font-black text-white">Échelon {profil.echelonActuel}</div>
                        <div className="text-xs text-slate-300 font-semibold">IM {resultatSimulation.jalonActuel.indiceMajore} (IB {resultatSimulation.jalonActuel.indiceBrut})</div>
                        <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/60">
                          ~{Math.round(resultatSimulation.jalonActuel.traitementBrutMensuel)} € brut / mois
                        </div>
                      </div>

                      {/* Palier 1 : 1er Prochain Échelon */}
                      <div className="bg-emerald-950/70 border-2 border-emerald-500/80 rounded-xl p-3.5 space-y-1 relative shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-emerald-300">1er Prochain Échelon</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/80 px-2 py-0.2 rounded-full">Dans {delaiPremierTexte}</span>
                        </div>
                        <div className="text-base font-black text-emerald-200">Échelon {premierEchelon.echelonNumero}</div>
                        <div className="text-xs text-emerald-100 font-semibold flex items-center gap-1">
                          <span>IM {premierEchelon.indiceMajore}</span>
                          <span className="text-emerald-400 text-[11px] font-bold">(+{premierEchelon.gainIndiciaire} pts)</span>
                        </div>
                        <div className="text-[11px] text-emerald-300 pt-1 border-t border-emerald-800/60 font-bold">
                          +~{Math.round(premierEchelon.gainFinancierBrutMensuel || 0)} € brut / mois
                        </div>
                      </div>

                      {/* Palier 2 : 2ème Prochain Échelon */}
                      {deuxiemeEchelon ? (
                        <div className="bg-indigo-950/60 border border-indigo-500/60 rounded-xl p-3.5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-indigo-300">2e Prochain Échelon</span>
                            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-900/80 px-2 py-0.2 rounded-full">Dans {delaiDeuxiemeTexte}</span>
                          </div>
                          <div className="text-base font-black text-indigo-200">Échelon {deuxiemeEchelon.echelonNumero}</div>
                          <div className="text-xs text-indigo-100 font-semibold flex items-center gap-1">
                            <span>IM {deuxiemeEchelon.indiceMajore}</span>
                            <span className="text-indigo-400 text-[11px] font-bold">(+{gainIndiciaireDeuxiemeCumule} pts cumulés)</span>
                          </div>
                          <div className="text-[11px] text-indigo-300 pt-1 border-t border-indigo-800/60 font-bold">
                            +~{Math.round(gainFinancierDeuxiemeCumule)} € brut / mois cumulés
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3.5 flex flex-col justify-center items-center text-center">
                          <span className="text-xs font-bold text-slate-300">Échelon sommital atteint</span>
                          <span className="text-[11px] text-slate-400 mt-1">L échelon {premierEchelon.echelonNumero} est le sommet de votre grade.</span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* LES DEUX CARTES DÉTAILLÉES CÔTE À CÔTE */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* CARTE 1 : 1ER PROCHAIN ÉCHELON */}
                    <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 border-2 border-emerald-400/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-0.5 rounded-full">
                            1er Palier • {isContractuel ? "Réévaluation indicative" : "Avancement garanti"}
                          </span>
                          <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
                            Passage à l Échelon {premierEchelon.echelonNumero}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {premierEchelon.sousTitre}
                          </p>
                        </div>

                        <div className="self-start sm:self-center shrink-0">
                          <span className="animate-blink-date inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-emerald-950 bg-white border border-emerald-300 px-3.5 py-1.5 rounded-xl shadow-2xs">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                            </span>
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{formatDateFrench(premierEchelon.date)}</span>
                          </span>
                        </div>
                      </div>

                      {/* 3 métriques chiffrées */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            Délai
                          </div>
                          <div className="text-base sm:text-lg font-black text-emerald-950 mt-0.5">
                            {delaiPremierTexte}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            À ce jour
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                            <Award className="w-3 h-3 text-indigo-600" />
                            Indice
                          </div>
                          <div className="text-base sm:text-lg font-black text-indigo-950 mt-0.5">
                            IM {premierEchelon.indiceMajore}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold">
                            +{premierEchelon.gainIndiciaire} pts (IB {premierEchelon.indiceBrut})
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-teal-600" />
                            Gain Brut
                          </div>
                          <div className="text-base sm:text-lg font-black text-teal-950 mt-0.5">
                            ~+{Math.round(premierEchelon.gainFinancierBrutMensuel || 0)} €
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ~{Math.round(premierEchelon.traitementBrutMensuel)} € brut
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-200 text-xs text-slate-700 leading-relaxed">
                        <strong>Règle statutaire :</strong> {isContractuel
                          ? "Réévaluation triennale obligatoire (art. 1-2 décret 88-145) fixée à 36 mois après la dernière revalorisation."
                          : "Avancement d échelon continu à cadence unique PPCR, validé automatiquement par arrêté DRH."}
                      </div>
                    </div>

                    {/* CARTE 2 : 2ÈME PROCHAIN ÉCHELON */}
                    {deuxiemeEchelon ? (
                      <div className="bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/40 border-2 border-indigo-400/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-900 bg-indigo-100 border border-indigo-300 px-3 py-0.5 rounded-full">
                              2e Palier • Évolution prévisionnelle
                            </span>
                            <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
                              Passage à l Échelon {deuxiemeEchelon.echelonNumero}
                            </h4>
                            <p className="text-xs text-slate-600">
                              {deuxiemeEchelon.sousTitre}
                            </p>
                          </div>

                          <div className="self-start sm:self-center shrink-0">
                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-indigo-950 bg-white border border-indigo-300 px-3.5 py-1.5 rounded-xl shadow-2xs">
                              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                              <span>{formatDateFrench(deuxiemeEchelon.date)}</span>
                            </span>
                          </div>
                        </div>

                        {/* 3 métriques chiffrées cumulées */}
                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="bg-white p-3 rounded-xl border border-indigo-200/80 shadow-2xs">
                            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-indigo-600" />
                              Échéance
                            </div>
                            <div className="text-base sm:text-lg font-black text-indigo-950 mt-0.5">
                              {delaiDeuxiemeTexte}
                            </div>
                            <div className="text-[10px] text-indigo-700 font-semibold">
                              +{delaiEntreEchelonsTexte} après 1er
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-indigo-200/80 shadow-2xs">
                            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                              <Award className="w-3 h-3 text-indigo-600" />
                              Indice Cible
                            </div>
                            <div className="text-base sm:text-lg font-black text-indigo-950 mt-0.5">
                              IM {deuxiemeEchelon.indiceMajore}
                            </div>
                            <div className="text-[10px] text-indigo-600 font-bold">
                              +{gainIndiciaireDeuxiemeCumule} pts cumulés
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-indigo-200/80 shadow-2xs">
                            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-teal-600" />
                              Gain Cumulé
                            </div>
                            <div className="text-base sm:text-lg font-black text-teal-950 mt-0.5">
                              ~+{Math.round(gainFinancierDeuxiemeCumule)} €
                            </div>
                            <div className="text-[10px] text-slate-500">
                              ~{Math.round(deuxiemeEchelon.traitementBrutMensuel)} € brut
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 p-3.5 rounded-xl border border-indigo-200 text-xs text-slate-700 leading-relaxed">
                          <strong>Rythme de progression :</strong> Ce 2e échelon sera franchi après {delaiEntreEchelonsTexte} passés dans l échelon {premierEchelon.echelonNumero}, garantissant un gain global cumulé de +{gainIndiciaireDeuxiemeCumule} points d Indice Majoré.
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                          ✓
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">Échelon sommital atteint au 1er palier</h4>
                        <p className="text-xs text-slate-500 max-w-sm">
                          L échelon {premierEchelon.echelonNumero} constitue le sommet indiciaire de ce grade. Toute évolution ultérieure relèvera d un avancement de grade ou d une promotion interne.
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Synthèse statutaire */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-950">Garantie statutaire d avancement continu (CGFP) :</span>
                      <p className="mt-0.5 leading-relaxed">
                        Contrairement aux promotions de grade, le déroulement des échelons à cadence unique s opère de plein droit tout au long de votre carrière sous réserve de votre maintien en position d activité normale.
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-600">
                  Vous avez atteint l échelon sommital de votre grade. Votre évolution indiciaire ultérieure passe par un avancement de grade.
                </div>
              )}
            </div>
          )}

          {/* RÉPONSE 2 : AVANCEMENT / PROMOTION AU CHOIX (SANS EXAMEN PROFESSIONNEL) */}
          {activeQuestion === "promotion" && (
            <div className="space-y-6 animate-fadeIn">
              {prochainePromouvabilite ? (
                <div className="bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 border border-purple-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                  
                  {/* En-tête de la promouvabilité au choix */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full">
                          {isContractuel 
                            ? "Voie d accès au statut de Titulaire"
                            : "Avancement au choix (sans examen professionnel)"}
                        </span>
                        {!isContractuel && (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                            Inscription directe au Tableau LDG
                          </span>
                        )}
                      </div>

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
                        <span>Éligible au choix le {formatDateFrench(prochainePromouvabilite.date)}</span>
                      </span>
                      <span className="text-[11px] text-purple-800 font-bold bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-300 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-600" />
                        <span>Dans {delaiPromoTexte}</span>
                      </span>
                    </div>
                  </div>

                  {/* NOTE D INFORMATION SUR L EXAMEN PRO S IL EXISTE */}
                  {jalonExamenPro && jalonExamenPro.id !== prochainePromouvabilite.id && (
                    <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-950">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="font-bold">Information complémentaire (accès anticipé) :</strong> Une modalité par <em>examen professionnel</em> existe également dès le <strong>{formatDateFrench(jalonExamenPro.date)}</strong> si vous souhaitez anticiper cette échéance. Cependant, la voie <strong>au choix</strong> détaillée ci-dessus ne requiert aucun examen et s appuie uniquement sur votre ancienneté et votre valeur professionnelle.
                      </div>
                    </div>
                  )}

                  {/* Jauge des conditions statutaires requises AU CHOIX */}
                  <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        État de vos conditions statutaires pour la voie au choix :
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
                      Fonctionnement de l avancement au choix (CGFP & LDG) :
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      L avancement au choix s effectue par inscription sur le <strong>tableau annuel d avancement</strong> établi par le Maire de Gennevilliers au vu des critères des <strong>Lignes Directrices de Gestion (LDG)</strong> (valeur professionnelle lors de l entretien annuel, investissement, formations CNFPT). Remplir les conditions ouvre votre <em>promouvabilité</em> juridique.
                    </p>
                  </div>

                  {/* Pièces clés */}
                  {prochainePromouvabilite.justificatifsRequis.length > 0 && (
                    <div className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-purple-200/80">
                      <span className="font-bold text-slate-900">Démarches & pièces à valoriser :</span>
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
