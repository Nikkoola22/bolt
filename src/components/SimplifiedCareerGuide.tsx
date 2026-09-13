import React, { useState } from "react";
import type { ProfilAgent, ResultatSimulation } from "../types/career";
import { 
  formatDateFrench, 
  diffMonths, 
  formatDurationInYearsAndMonths, 
  findCadreAndGrade 
} from "../services/simulationEngine";
import { 
  Clock, 
  Award, 
  CheckCircle2, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  FileEdit,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Star,
  Check,
  Briefcase
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
  // Question active : "echelon" (Hausse automatique) ou "promotion" (Monter en grade sans examen)
  const [activeQuestion, setActiveQuestion] = useState<"echelon" | "promotion">("echelon");

  // Fonction de sélection avec défilement fluide vers le bloc cible
  const handleSelectQuestion = (question: "echelon" | "promotion") => {
    setActiveQuestion(question);
    setTimeout(() => {
      const targetId = question === "echelon" ? "block-progression-automatique" : "block-prochain-metier";
      const el = document.getElementById(targetId) || document.getElementById(question === "echelon" ? "block-progression-automatique" : "block-monter-grade");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  // Accordéons d'explications avancées (fermés par défaut pour éviter la surcharge de texte)
  const [showLegalEchelon, setShowLegalEchelon] = useState(false);
  const [showLegalPromo, setShowLegalPromo] = useState(false);
  const [showDecoder, setShowDecoder] = useState(false);

  const { cadre, grade } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const isContractuel = profil.statut.startsWith("contractuel");
  const todayStr = new Date().toISOString().split("T")[0];

  // Calcul du niveau dans le grade (ex: Échelon 4 / 12)
  const totalEchelons = grade.echelons.length;
  const currentEchelonDef = grade.echelons.find(e => e.numero === profil.echelonActuel);
  const dureeEchelonMois = (currentEchelonDef?.dureeAnnees || 2) * 12;
  const moisPassesDansEchelon = Math.max(0, diffMonths(profil.dateEffetEchelonActuel, todayStr));
  const percentEchelonProgress = Math.min(100, Math.max(10, Math.round((moisPassesDansEchelon / dureeEchelonMois) * 100)));
  const percentGradeProgress = Math.round((profil.echelonActuel / totalEchelons) * 100);

  // 1. Calcul des 2 prochains échelons
  const echelonsFuturs = resultatSimulation.jalons.filter((j) => j.typeJalon === "avancement_echelon");
  const premierEchelon = echelonsFuturs[0] || null;
  const deuxiemeEchelon = echelonsFuturs[1] || null;

  // Calculs 1er échelon
  const moisRestantsPremier = premierEchelon ? Math.max(0, diffMonths(todayStr, premierEchelon.date)) : 0;
  const delaiPremierTexte = formatDurationInYearsAndMonths(moisRestantsPremier);
  const gainBrutPremier = Math.round(premierEchelon?.gainFinancierBrutMensuel || 0);
  const gainNetEstimePremier = Math.round(gainBrutPremier * 0.81); // Estimation nette indicative (~81%)

  // Calculs 2ème échelon
  const moisRestantsDeuxieme = deuxiemeEchelon ? Math.max(0, diffMonths(todayStr, deuxiemeEchelon.date)) : 0;
  const delaiDeuxiemeTexte = formatDurationInYearsAndMonths(moisRestantsDeuxieme);
  const gainIndiciaireDeuxiemeCumule = deuxiemeEchelon ? (deuxiemeEchelon.indiceMajore - resultatSimulation.jalonActuel.indiceMajore) : 0;
  const gainBrutDeuxiemeCumule = deuxiemeEchelon ? Math.round(deuxiemeEchelon.traitementBrutMensuel - resultatSimulation.jalonActuel.traitementBrutMensuel) : 0;
  const gainNetEstimeDeuxiemeCumule = Math.round(gainBrutDeuxiemeCumule * 0.81);

  // 2. Recherche prioritaire de la promouvabilité au choix (sans examen)
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

  const prochainePromouvabilite = promouvabiliteAuChoixGrade || promouvabiliteAuChoixInterne || promouvabiliteSansExamen || resultatSimulation.premierePromouvabiliteGrade || resultatSimulation.premierePromouvabiliteInterne;

  // Jalon examen pro alternatif s'il existe
  const jalonExamenPro = resultatSimulation.jalons.find(
    (j) => (j.typeJalon === "promouvabilite_grade" || j.typeJalon === "promouvabilite_interne") &&
           (j.id.includes("examen_professionnel") || j.titre.toLowerCase().includes("examen pro") || j.conditionsManquantes.some(c => c.libelle.toLowerCase().includes("examen")))
  );

  const moisRestantsPromo = prochainePromouvabilite ? Math.max(0, diffMonths(todayStr, prochainePromouvabilite.date)) : 0;
  const delaiPromoTexte = formatDurationInYearsAndMonths(moisRestantsPromo);

  // Décodeur des termes statutaires fréquents
  const glossaireJargon = [
    {
      terme: "Échelon",
      definition: "Une marche d'escalier que vous montez automatiquement avec le temps. Chaque marche augmente votre salaire de base.",
      badge: "Automatique"
    },
    {
      terme: "Indice Majoré (IM)",
      definition: "Le nombre de points qui multiplie la valeur du point d'indice (~4,92 €) pour calculer votre salaire brut mensuel.",
      badge: "Fiche de paie"
    },
    {
      terme: "Avancement au Choix",
      definition: "Changer de grade sans examen ni concours. La mairie vous sélectionne sur un tableau annuel selon votre ancienneté et la qualité de votre travail.",
      badge: "Sans examen"
    },
    {
      terme: "Tableau d'avancement & LDG",
      definition: "La liste officielle des collègues promus chaque année au 1er janvier selon les critères d'évaluation de la mairie de Gennevilliers.",
      badge: "Annuel"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* 1. CARTE PROFIL JOUEUR / NIVEAU DE CARRIÈRE */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-800 relative overflow-hidden">
        {/* Glow d'arrière plan */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* Avatar & Identité */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-2xl shadow-md ring-4 ring-white/10">
                {profil.prenom.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black ring-2 ring-slate-900 shadow">
                ✓
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Bonjour {profil.prenom} !
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30">
                  {isContractuel ? "Agent Contractuel" : "Fonctionnaire Titulaire"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-white">{grade.nom}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{cadre.nom}</span>
              </p>

              {/* Jauge de niveau dans le grade */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 max-w-xs bg-slate-800 rounded-full h-2.5 overflow-hidden ring-1 ring-slate-700/60">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentGradeProgress}%` }}
                  ></div>
                </div>
                <span className="text-[11px] font-bold text-slate-300">
                  Échelon {profil.echelonActuel}/{totalEchelons} ({percentGradeProgress}%)
                </span>
              </div>
            </div>
          </div>

          {/* Boutons d'action rapides */}
          <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 w-full sm:w-auto">
            <button
              onClick={onEditProfile}
              className="flex-1 sm:flex-initial text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FileEdit className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Modifier</span>
            </button>

            <button
              onClick={onSwitchToComplete}
              className="flex-1 sm:flex-initial text-xs font-black bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/25"
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Mode Expert (Complet)</span>
            </button>
          </div>

        </div>

        {/* 3 Bulles de situation actuelle en langage direct */}
        <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-800/80 text-center sm:text-left">
          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 font-medium block">Niveau actuel</span>
            <span className="text-xs sm:text-sm font-black text-white mt-0.5 block truncate">
              Échelon {profil.echelonActuel}
            </span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 font-medium block">Points de salaire</span>
            <span className="text-xs sm:text-sm font-black text-emerald-300 mt-0.5 block truncate">
              {resultatSimulation.jalonActuel.indiceMajore} pts (IM)
            </span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 font-medium block">Salaire de base brut</span>
            <span className="text-xs sm:text-sm font-black text-amber-300 mt-0.5 block truncate">
              ~{Math.round(resultatSimulation.jalonActuel.traitementBrutMensuel)} € / mois
            </span>
          </div>
        </div>
      </div>

      {/* 2. LE CHOIX DES 2 QUESTIONS (GRANDES CARTES VISUELLES SANS JARGON) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span>Vos deux questions clés en un coup d'œil</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Cliquez sur un bouton pour voir la réponse
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* CARTE QUESTION 1 : ÉCHELON (HAUSSE AUTOMATIQUE) */}
          <button
            type="button"
            onClick={() => handleSelectQuestion("echelon")}
            className={`p-5 sm:p-6 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
              activeQuestion === "echelon"
                ? "bg-white dark:bg-slate-900 border-emerald-500 dark:border-emerald-400 shadow-lg ring-4 ring-emerald-500/10 scale-[1.01]"
                : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xl border border-emerald-200 dark:border-emerald-800 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                100% Automatique
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Quand est-ce que mon salaire augmente tout seul ?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Votre prochain changement d'échelon garanti par le temps passé.
              </p>
            </div>

            {/* Aperçu clé immédiat */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              {premierEchelon ? (
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDateFrench(premierEchelon.date)} ({delaiPremierTexte})
                </span>
              ) : (
                <span className="font-bold text-slate-500">Dernier échelon atteint</span>
              )}
              <span className="font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                +{gainBrutPremier} € brut
              </span>
            </div>
          </button>

          {/* CARTE QUESTION 2 : GRADE SANS EXAMEN (AU CHOIX) */}
          <button
            type="button"
            onClick={() => handleSelectQuestion("promotion")}
            className={`p-5 sm:p-6 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
              activeQuestion === "promotion"
                ? "bg-white dark:bg-slate-900 border-purple-500 dark:border-purple-400 shadow-lg ring-4 ring-purple-500/10 scale-[1.01]"
                : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center font-black text-xl border border-purple-200 dark:border-purple-800 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
                Sans concours ni examen
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Comment monter de grade sans repasser d'examen ?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                La promotion « au choix » grâce à votre ancienneté et votre investissement.
              </p>
            </div>

            {/* Aperçu clé immédiat */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              {prochainePromouvabilite ? (
                <span className="font-extrabold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Dès le {formatDateFrench(prochainePromouvabilite.date)}
                </span>
              ) : (
                <span className="font-bold text-slate-500">Grade sommital</span>
              )}
              <span className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800">
                Voir les conditions
              </span>
            </div>
          </button>

        </div>
      </div>

      {/* 3. DÉTAIL DE LA QUESTION ACTIVE (PRÉSENTATION VISUELLE PÉDAGOGIQUE) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 dark:border-slate-800">
        
        {/* CAS 1 : HAUSSE DE SALAIRE AUTOMATIQUE (ÉCHELON) */}
        {activeQuestion === "echelon" && (
          <div id="block-progression-automatique" className="space-y-6 scroll-mt-24">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Progression automatique
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  Vos deux prochaines augmentations garanties
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-center">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Aucune démarche nécessaire</span>
              </div>
            </div>

            {premierEchelon ? (
              <div className="space-y-6">
                
                {/* LES 2 MARCHES D'ESCALIER CÔTE À CÔTE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  
                  {/* MARCHE 1 : 1ER PROCHAIN ÉCHELON */}
                  <div className="bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-950/30 dark:to-teal-950/20 border-2 border-emerald-500 dark:border-emerald-500 rounded-3xl p-6 space-y-5 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                        1er Palier • Prochaine étape
                      </span>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        Dans {delaiPremierTexte}
                      </span>
                    </div>

                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        Échelon {premierEchelon.echelonNumero}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Prend effet au <strong className="text-slate-800 dark:text-slate-200">{formatDateFrench(premierEchelon.date)}</strong>
                      </p>
                    </div>

                    {/* Barre de progression dans l'échelon actuel */}
                    <div className="space-y-1.5 bg-emerald-50/50 dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-800/40">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        <span>Temps accompli vers l'échelon {premierEchelon.echelonNumero}</span>
                        <span className="text-emerald-700 dark:text-emerald-300 font-black">{percentEchelonProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentEchelonProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Bloc Chiffres Clés Paie */}
                    <div className="grid grid-cols-2 gap-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          Gain sur votre paie
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                          +{gainBrutPremier} € <span className="text-xs font-bold text-slate-500">brut/mois</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          soit environ <strong>~+{gainNetEstimePremier} € net</strong>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          Nouveaux points
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                          {premierEchelon.indiceMajore} pts
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          +{premierEchelon.indiceMajore - resultatSimulation.jalonActuel.indiceMajore} pts d'indice
                        </div>
                      </div>
                    </div>

                    {/* Que devez-vous faire ? */}
                    <div className="bg-emerald-100/60 dark:bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        ✓
                      </span>
                      <div className="text-xs text-slate-800 dark:text-slate-200">
                        <strong className="font-bold text-emerald-950 dark:text-emerald-200">Ce que vous devez faire : </strong>
                        Rien du tout ! Le passage d'échelon se fait à date fixe, validé automatiquement par un arrêté de la mairie.
                      </div>
                    </div>
                  </div>

                  {/* MARCHE 2 : 2ÈME ÉCHELON */}
                  {deuxiemeEchelon ? (
                    <div className="bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 dark:from-indigo-950/30 dark:to-blue-950/20 border-2 border-indigo-300 dark:border-indigo-800 rounded-3xl p-6 space-y-5 relative">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                          2e Palier • Perspective
                        </span>
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                          Dans {delaiDeuxiemeTexte}
                        </span>
                      </div>

                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                          Échelon {deuxiemeEchelon.echelonNumero}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Prend effet au <strong className="text-slate-800 dark:text-slate-200">{formatDateFrench(deuxiemeEchelon.date)}</strong>
                        </p>
                      </div>

                      {/* Bloc Chiffres Clés Paie Cumulés */}
                      <div className="grid grid-cols-2 gap-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-2xs">
                        <div>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            Gain total cumulé
                          </span>
                          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                            +{gainBrutDeuxiemeCumule} € <span className="text-xs font-bold text-slate-500">brut/mois</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            soit environ <strong>~+{gainNetEstimeDeuxiemeCumule} € net</strong>
                          </div>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            Indice atteint
                          </span>
                          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                            {deuxiemeEchelon.indiceMajore} pts
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            +{gainIndiciaireDeuxiemeCumule} pts cumulés
                          </div>
                        </div>
                      </div>

                      {/* Info rythme */}
                      <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-3.5 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/60 flex items-center gap-3">
                        <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <div className="text-xs text-slate-700 dark:text-slate-300">
                          Ce palier est franchi automatiquement après le temps réglementaire passé dans l'échelon précédent.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-lg font-bold">
                        🏆
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Sommet du grade atteint !</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                        L'échelon {premierEchelon.echelonNumero} est le dernier de votre grille. Votre prochaine évolution de salaire passera par un changement de grade.
                      </p>
                    </div>
                  )}

                </div>

                {/* ACCORDÉON OPTIONNEL POUR LES TEXTES DE LOI */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowLegalEchelon(!showLegalEchelon)}
                    className="w-full p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-left flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>📚 Pour les curieux : que dit la règle officielle ? (Textes statutaires)</span>
                    </span>
                    {showLegalEchelon ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showLegalEchelon && (
                    <div className="p-4 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 space-y-2 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                      <p>
                        <strong>Code Général de la Fonction Publique (CGFP) :</strong> L'avancement d'échelon est un droit accordé de manière continue à cadence unique PPCR (Parcours Professionnels, Carrières et Rémunérations). Il ne dépend plus de la notation mais uniquement de l'ancienneté.
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {isContractuel 
                          ? "Pour les agents contractuels : réévaluation triennale obligatoire (décret 88-145 art. 1-2)."
                          : "Arrêté individuel pris par le Maire de Gennevilliers et notifié à chaque franchissement d'échelon."}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <span className="text-4xl">🌟</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Vous êtes au sommet indiciaire de votre grade</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Consultez la deuxième question pour découvrir comment changer de grade !
                </p>
              </div>
            )}

          </div>
        )}

        {/* CAS 2 : MONTER DE GRADE SANS EXAMEN (AU CHOIX) */}
        {activeQuestion === "promotion" && (
          <div id="block-monter-grade" className="space-y-6 scroll-mt-24">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Évolution de grade
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  Changer de grade au mérite et à l'ancienneté
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-3 py-1.5 rounded-xl self-start sm:self-center border border-purple-200 dark:border-purple-800">
                <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Sans examen professionnel obligatoire</span>
              </div>
            </div>

            {prochainePromouvabilite ? (
              <div className="space-y-6">
                
                {/* CARTE D'IMPACT MAJEUR (PROCHAIN NIVEAU DE MÉTIER VISÉ / PROMOUVABILITÉ) */}
                <div 
                  id="block-prochain-metier"
                  className="bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 dark:from-purple-950/30 dark:to-violet-950/20 border-2 border-purple-500 dark:border-purple-500 rounded-3xl p-6 sm:p-7 space-y-6 scroll-mt-24"
                >
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                          Prochain niveau de métier visé :
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
                          Promouvabilité
                        </span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                        {prochainePromouvabilite.titre}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {prochainePromouvabilite.sousTitre}
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border-2 border-purple-300 dark:border-purple-700 shadow-md flex items-center gap-3.5 self-start md:self-center shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                          Date d'éligibilité (Promouvabilité)
                        </span>
                        <span className="text-sm sm:text-base font-black text-purple-700 dark:text-purple-300">
                          {formatDateFrench(prochainePromouvabilite.date)}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          (dans {delaiPromoTexte})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CHECKLIST DES CONDITIONS EN MODE QUÊTE DU JEU */}
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                      📋 Votre check-list pour être sélectionné(e) :
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {prochainePromouvabilite.conditionsRemplies.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-semibold text-emerald-950 dark:text-emerald-200">{c.libelle} (Validé !)</span>
                        </div>
                      ))}

                      {prochainePromouvabilite.conditionsManquantes.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs">
                          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span className="font-semibold text-amber-950 dark:text-amber-200">{c.libelle}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3 CONSEILS SIMPLES POUR AGIR */}
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-purple-200 dark:border-purple-800/80 space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Ce que vous devez faire pour maximiser vos chances :</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">1. L'entretien annuel</span>
                        Parlez de votre souhait d'avancement à votre chef de service lors de votre entretien professionnel.
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">2. Vos formations</span>
                        Suivez vos formations CNFPT obligatoires et valorisez vos nouvelles compétences.
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">3. La liste de fin d'année</span>
                        Chaque fin d'année, la mairie examine les dossiers et publie le tableau d'avancement pour le 1er janvier.
                      </div>
                    </div>
                  </div>

                  {/* ACCÉLÉRATEUR EXAMEN PRO (OPTIONNEL) */}
                  {jalonExamenPro && jalonExamenPro.id !== prochainePromouvabilite.id && (
                    <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <div>
                          <strong className="text-slate-900 dark:text-white">Option « Accélérateur » : </strong>
                          Un examen professionnel existe dès le {formatDateFrench(jalonExamenPro.date)} si vous souhaitez tenter de monter encore plus vite.
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* ACCORDÉON OPTIONNEL POUR LES TEXTES DE LOI (AU CHOIX / LDG) */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowLegalPromo(!showLegalPromo)}
                    className="w-full p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-left flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>📚 Pour les curieux : comment fonctionne juridiquement la promotion au choix ?</span>
                    </span>
                    {showLegalPromo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showLegalPromo && (
                    <div className="p-4 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 space-y-2 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                      <p>
                        <strong>Lignes Directrices de Gestion (LDG) :</strong> L'avancement de grade au choix s'effectue par inscription sur un <em>tableau annuel d'avancement</em> établi par l'autorité territoriale au vu de la valeur professionnelle et des critères fixés dans les LDG de la collectivité de Gennevilliers.
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Remplir les conditions statutaires ouvre votre <em>promouvabilité</em>, la décision finale d'avancement restant une prérogative de la collectivité.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <span className="text-4xl">👑</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Vous êtes au grade sommital de votre cadre d'emplois</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pour aller plus loin, une promotion interne vers la catégorie supérieure peut être envisagée !
                </p>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 4. LE DÉCODEUR STATUTAIRE INTERACTIF (EN FRANÇAIS FACILE) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:from-amber-950/20 dark:to-orange-950/10 border-2 border-amber-300/80 dark:border-amber-800/60 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                Le Décodeur RH : Le statut en français facile
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Vous hésitez sur le sens d'un terme administratif ? Cliquez pour afficher les explications claires.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDecoder(!showDecoder)}
            className="text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700 transition-colors cursor-pointer shrink-0"
          >
            {showDecoder ? "Masquer" : "Afficher le décodeur"}
          </button>
        </div>

        {showDecoder && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-fadeIn">
            {glossaireJargon.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-2xs space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                    {item.terme}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
