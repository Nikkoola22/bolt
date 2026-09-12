import React, { useState } from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { formatDateFrench, diffMonths, formatDurationInYearsAndMonths, findCadreAndGrade } from "../services/simulationEngine";
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
  // Question active : "echelon" (Échelons supplémentaires) ou "promotion" (Avancement / Promotion au choix)
  const [activeQuestion, setActiveQuestion] = useState<"echelon" | "promotion">("echelon");

  const handleSelectQuestion = (question: "echelon" | "promotion") => {
    setActiveQuestion(question);
    setTimeout(() => {
      const targetId = question === "echelon" ? "block-premier-palier" : "block-avancement-choix";
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 70);
  };

  const { cadre, grade } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
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
      <div className="bg-gradient-to-r from-slate-950 via-stone-900 to-orange-950/80 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0 ring-2 ring-white/10">
            {profil.prenom.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-lg text-white">
                Version Simplifiée • {profil.prenom}
              </span>
              <span className="text-[11px] bg-orange-500/20 text-orange-200 border border-orange-400/30 px-2 py-0.5 rounded-full font-bold">
                {isContractuel ? "Agent Contractuel" : "Fonctionnaire Titulaire"}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="bg-purple-500/25 text-purple-200 border border-purple-400/40 px-2.5 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-purple-300" />
                <span>{grade.nom}</span>
              </span>
              <span className="bg-orange-500/20 text-orange-200 border border-orange-400/30 px-2.5 py-0.5 rounded-lg text-xs font-semibold shadow-2xs">
                Cadre : <strong className="text-white font-bold">{cadre.nom}</strong>
              </span>
              <span className="bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                <span>{profil.echelonActuel}e échelon (IM {resultatSimulation.jalonActuel.indiceMajore})</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={onEditProfile}
            className="text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FileEdit className="w-3.5 h-3.5 text-orange-400" />
            <span>Modifier ma saisie</span>
          </button>

          <button
            onClick={onSwitchToComplete}
            className="text-xs font-black bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/25"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Voir Version Complète</span>
          </button>
        </div>
      </div>

      {/* BLOC DES DEUX BOUTONS DE QUESTIONS ESSENTIELLES */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Que souhaitez-vous savoir en priorité ?
          </h2>
        </div>

        {/* Les 2 grands boutons de sélection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Bouton 1 : Échelons supplémentaires (Évolution sur 2 échelons) */}
          <button
            type="button"
            onClick={() => handleSelectQuestion("echelon")}
            className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
              activeQuestion === "echelon"
                ? "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-emerald-600 dark:border-emerald-500 shadow-md ring-4 ring-emerald-500/15 scale-[1.01]"
                : "bg-white dark:bg-slate-850 hover:bg-slate-50/70 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`p-2.5 rounded-xl border ${
                activeQuestion === "echelon"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60"
              }`}>
                <Clock className="w-6 h-6" />
              </span>
              {activeQuestion === "echelon" && (
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-2.5 py-0.5 rounded-full">
                  Actif
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                Quand vais-je avoir un échelon supplémentaire ?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {premierEchelon 
                  ? (deuxiemeEchelon 
                      ? `Évolution détaillée sur vos 2 prochains échelons (Échelon ${premierEchelon.echelonNumero} puis ${deuxiemeEchelon.echelonNumero}) avec gains cumulés.` 
                      : `Prochain palier indiciaire : Échelon ${premierEchelon.echelonNumero} (dernier échelon du grade).`)
                  : "Dernier échelon sommital du grade déjà atteint."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
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
            onClick={() => handleSelectQuestion("promotion")}
            className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
              activeQuestion === "promotion"
                ? "bg-gradient-to-br from-purple-50/90 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30 border-purple-600 dark:border-purple-500 shadow-md ring-4 ring-purple-500/15 scale-[1.01]"
                : "bg-white dark:bg-slate-850 hover:bg-slate-50/70 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`p-2.5 rounded-xl border ${
                activeQuestion === "promotion"
                  ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                  : "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/60"
              }`}>
                <TrendingUp className="w-6 h-6" />
              </span>
              {activeQuestion === "promotion" && (
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 dark:text-purple-200 bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-700 px-2.5 py-0.5 rounded-full">
                  Actif
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-purple-800 dark:group-hover:text-purple-300 transition-colors">
                  Quand vais-je avoir un avancement ? promotion ?
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {isContractuel
                  ? "Conditions d'accès au statut pérenne de titulaire (Concours Interne ou intégration directe C1)."
                  : "Avancement au choix (tableau d'avancement annuel au mérite et à l'ancienneté, sans examen professionnel)."}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-800 dark:text-purple-300">
              <span>
                {prochainePromouvabilite ? `Éligible au choix dès le : ${formatDateFrench(prochainePromouvabilite.date)}` : "Grade sommital"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        {/* CONTENU DE LA RÉPONSE SÉLECTIONNÉE */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          
          {/* RÉPONSE 1 : ÉVOLUTION DES DEUX PROCHAINS ÉCHELONS */}
          {activeQuestion === "echelon" && (
            <div className="space-y-6 animate-fadeIn">
              {premierEchelon ? (
                <div className="space-y-6">
                  
                  {/* LES DEUX CARTES DÉTAILLÉES CÔTE À CÔTE */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* CARTE 1 : 1ER PROCHAIN ÉCHELON */}
                    <div 
                      id="block-premier-palier"
                      className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-2 border-emerald-400/90 dark:border-emerald-700/80 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs scroll-mt-24"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-3 py-0.5 rounded-full">
                            1er Palier • {isContractuel ? "Réévaluation indicative" : "Avancement garanti"}
                          </span>
                          <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1.5">
                            Passage à l Échelon {premierEchelon.echelonNumero}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {premierEchelon.sousTitre}
                          </p>
                        </div>

                        <div className="self-start sm:self-center shrink-0">
                          <span className="animate-blink-date inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-emerald-950 dark:text-emerald-200 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 px-3.5 py-1.5 rounded-xl shadow-2xs">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                            </span>
                            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>{formatDateFrench(premierEchelon.date)}</span>
                          </span>
                        </div>
                      </div>

                      {/* 3 métriques chiffrées */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
                          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            Délai
                          </div>
                          <div className="text-base sm:text-lg font-black text-emerald-950 dark:text-emerald-200 mt-0.5">
                            {delaiPremierTexte}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            À ce jour
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
                          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Award className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            Indice
                          </div>
                          <div className="text-base sm:text-lg font-black text-indigo-950 dark:text-indigo-200 mt-0.5">
                            IM {premierEchelon.indiceMajore}
                          </div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            +{premierEchelon.gainIndiciaire} pts (IB {premierEchelon.indiceBrut})
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
                          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                            Gain Brut
                          </div>
                          <div className="text-base sm:text-lg font-black text-teal-950 dark:text-teal-200 mt-0.5">
                            ~+{Math.round(premierEchelon.gainFinancierBrutMensuel || 0)} €
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            ~{Math.round(premierEchelon.traitementBrutMensuel)} € brut
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 dark:bg-slate-850 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong>Règle statutaire :</strong> {isContractuel
                          ? "Réévaluation triennale obligatoire (art. 1-2 décret 88-145) fixée à 36 mois après la dernière revalorisation."
                          : "Avancement d échelon continu à cadence unique PPCR, validé automatiquement par arrêté DRH."}
                      </div>
                    </div>

                    {/* CARTE 2 : 2ÈME PROCHAIN ÉCHELON */}
                    {deuxiemeEchelon ? (
                      <div className="bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/40 dark:from-indigo-950/40 dark:via-slate-900 dark:to-blue-950/30 border-2 border-indigo-400/90 dark:border-indigo-700/80 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-700 px-3 py-0.5 rounded-full">
                              2e Palier • Évolution prévisionnelle
                            </span>
                            <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1.5">
                              Passage à l Échelon {deuxiemeEchelon.echelonNumero}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {deuxiemeEchelon.sousTitre}
                            </p>
                          </div>

                          <div className="self-start sm:self-center shrink-0">
                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-indigo-950 dark:text-indigo-200 bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 px-3.5 py-1.5 rounded-xl shadow-2xs">
                              <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                              <span>{formatDateFrench(deuxiemeEchelon.date)}</span>
                            </span>
                          </div>
                        </div>

                        {/* 3 métriques chiffrées cumulées */}
                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 shadow-2xs">
                            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              Échéance
                            </div>
                            <div className="text-base sm:text-lg font-black text-indigo-950 dark:text-indigo-200 mt-0.5">
                              {delaiDeuxiemeTexte}
                            </div>
                            <div className="text-[10px] text-indigo-700 dark:text-indigo-400 font-semibold">
                              +{delaiEntreEchelonsTexte} après 1er
                            </div>
                          </div>

                          <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 shadow-2xs">
                            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Award className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              Indice Cible
                            </div>
                            <div className="text-base sm:text-lg font-black text-indigo-950 dark:text-indigo-200 mt-0.5">
                              IM {deuxiemeEchelon.indiceMajore}
                            </div>
                            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                              +{gainIndiciaireDeuxiemeCumule} pts cumulés
                            </div>
                          </div>

                          <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 shadow-2xs">
                            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                              Gain Cumulé
                            </div>
                            <div className="text-base sm:text-lg font-black text-teal-950 dark:text-teal-200 mt-0.5">
                              ~+{Math.round(gainFinancierDeuxiemeCumule)} €
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              ~{Math.round(deuxiemeEchelon.traitementBrutMensuel)} € brut
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-850 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <strong>Rythme de progression :</strong> Ce 2e échelon sera franchi après {delaiEntreEchelonsTexte} passés dans l échelon {premierEchelon.echelonNumero}, garantissant un gain global cumulé de +{gainIndiciaireDeuxiemeCumule} points d Indice Majoré.
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                          ✓
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Échelon sommital atteint au 1er palier</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                          L échelon {premierEchelon.echelonNumero} constitue le sommet indiciaire de ce grade. Toute évolution ultérieure relèvera d un avancement de grade ou d une promotion interne.
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Synthèse statutaire */}
                  <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-950 dark:text-emerald-200">Garantie statutaire d avancement continu (CGFP) :</span>
                      <p className="mt-0.5 leading-relaxed">
                        Contrairement aux promotions de grade, le déroulement des échelons à cadence unique s opère de plein droit tout au long de votre carrière sous réserve de votre maintien en position d activité normale.
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div id="block-premier-palier" className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400 scroll-mt-24">
                  Vous avez atteint l échelon sommital de votre grade. Votre évolution indiciaire ultérieure passe par un avancement de grade.
                </div>
              )}
            </div>
          )}

          {/* RÉPONSE 2 : AVANCEMENT / PROMOTION AU CHOIX (SANS EXAMEN PROFESSIONNEL) */}
          {activeQuestion === "promotion" && (
            <div className="space-y-6 animate-fadeIn">
              {prochainePromouvabilite ? (
                <div 
                  id="block-avancement-choix"
                  className="bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30 border border-purple-300 dark:border-purple-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs scroll-mt-24"
                >
                  
                  {/* En-tête de la promouvabilité au choix */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wider text-purple-900 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-750 px-3 py-1 rounded-full">
                          {isContractuel 
                            ? "Voie d accès au statut de Titulaire"
                            : "Avancement au choix (sans examen professionnel)"}
                        </span>
                        {!isContractuel && (
                          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-750 px-2.5 py-0.5 rounded-full">
                            Inscription directe au Tableau LDG
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                        {prochainePromouvabilite.titre}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {prochainePromouvabilite.sousTitre}
                      </p>
                    </div>

                    <div className="self-start sm:self-center shrink-0 flex flex-col sm:items-end gap-1">
                      <span className="animate-blink-date inline-flex items-center gap-2 text-sm sm:text-base font-black text-purple-950 dark:text-purple-200 bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-700 px-4 py-2 rounded-2xl shadow-xs">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
                        </span>
                        <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Éligible au choix le {formatDateFrench(prochainePromouvabilite.date)}</span>
                      </span>
                      <span className="text-[11px] text-purple-800 dark:text-purple-300 font-bold bg-purple-100/80 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-300 dark:border-purple-800 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        <span>Dans {delaiPromoTexte}</span>
                      </span>
                    </div>
                  </div>

                  {/* NOTE D INFORMATION SUR L EXAMEN PRO S IL EXISTE */}
                  {jalonExamenPro && jalonExamenPro.id !== prochainePromouvabilite.id && (
                    <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200">
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="font-bold">Information complémentaire (accès anticipé) :</strong> Une modalité par <em>examen professionnel</em> existe également dès le <strong>{formatDateFrench(jalonExamenPro.date)}</strong> si vous souhaitez anticiper cette échéance. Cependant, la voie <strong>au choix</strong> détaillée ci-dessus ne requiert aucun examen et s appuie uniquement sur votre ancienneté et votre valeur professionnelle.
                      </div>
                    </div>
                  )}

                  {/* Jauge des conditions statutaires requises AU CHOIX */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-purple-200 dark:border-purple-800/80 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        État de vos conditions statutaires pour la voie au choix :
                      </span>
                      <span className="font-extrabold text-purple-950 dark:text-purple-200">
                        {prochainePromouvabilite.conditionsRemplies.length} / {prochainePromouvabilite.conditionsRemplies.length + prochainePromouvabilite.conditionsManquantes.length} conditions validées
                      </span>
                    </div>

                    <div className="space-y-2">
                      {prochainePromouvabilite.conditionsRemplies.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-200/80 dark:border-emerald-800/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-medium">{c.libelle} (Validé)</span>
                        </div>
                      ))}

                      {prochainePromouvabilite.conditionsManquantes.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/50 p-2.5 rounded-lg border border-amber-200/80 dark:border-amber-800/60">
                          {c.statut === "bloquante" ? (
                            <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          )}
                          <span className="font-medium">{c.libelle}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Règles juridiques LDG & Pouvoir discrétionnaire */}
                  <div className="bg-white/80 dark:bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-purple-200 dark:border-purple-800/80 text-xs space-y-2">
                    <div className="font-extrabold text-purple-950 dark:text-purple-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      Fonctionnement de l avancement au choix (CGFP & LDG) :
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      L avancement au choix s effectue par inscription sur le <strong>tableau annuel d avancement</strong> établi par le Maire de Gennevilliers au vu des critères des <strong>Lignes Directrices de Gestion (LDG)</strong> (valeur professionnelle lors de l entretien annuel, investissement, formations CNFPT). Remplir les conditions ouvre votre <em>promouvabilité</em> juridique.
                    </p>
                  </div>

                  {/* Pièces clés */}
                  {prochainePromouvabilite.justificatifsRequis.length > 0 && (
                    <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded-xl border border-purple-200/80 dark:border-purple-800/80">
                      <span className="font-bold text-slate-900 dark:text-white">Démarches & pièces à valoriser :</span>
                      <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
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
                <div id="block-avancement-choix" className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400 scroll-mt-24">
                  Aucune perspective d avancement direct identifiée pour ce grade. Vous êtes au sommet de votre cadre d emplois.
                </div>
              )}
            </div>
          )}
        </div>
      </div>


    </div>
  );
};
