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
  CircleCheck, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Star, 
  Check, 
  Briefcase, 
  ArrowRight,
  Calculator 
} from "lucide-react";

interface SimplifiedCareerGuideProps {
  profil: ProfilAgent;
  resultatSimulation: ResultatSimulation;
  onSwitchToComplete: () => void;
  onBackToMenu: () => void;
  onOpenAddEvent?: (type?: string) => void;
  onOpenLdg?: () => void;
}

export const SimplifiedCareerGuide: React.FC<SimplifiedCareerGuideProps> = ({
  profil,
  resultatSimulation,
  onSwitchToComplete,
  onOpenAddEvent: _onOpenAddEvent,
  onOpenLdg,
}) => {
  // Question active : "echelon" (Hausse automatique) ou "promotion" (Monter en grade sans examen) ou null (masqué par défaut)
  const [activeQuestion, setActiveQuestion] = useState<"echelon" | "promotion" | null>(null);

  // Fonction de sélection avec défilement fluide vers le bloc cible (ou bascule)
  const handleSelectQuestion = (question: "echelon" | "promotion") => {
    if (activeQuestion === question) {
      setActiveQuestion(null);
      return;
    }
    setActiveQuestion(question);
    setTimeout(() => {
      const targetId = question === "echelon" ? "block-progression-automatique" : "block-prochain-metier";
      const el = document.getElementById(targetId) || document.getElementById(question === "echelon" ? "block-progression-automatique" : "block-monter-grade");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Accordéons d'explications avancées (fermés par défaut pour éviter la surcharge de texte)
  const [showLegalEchelon, setShowLegalEchelon] = useState(false);
  const [showLegalPromo, setShowLegalPromo] = useState(false);
  const [showDecoder, setShowDecoder] = useState(false);

  const { cadre, grade } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const isContractuel = profil.statut.startsWith("contractuel");
  const todayStr = new Date().toISOString().split("T")[0];

  // Calcul du niveau dans le grade
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
  const gainNetEstimePremier = Math.round(gainBrutPremier * 0.81);

  // Calculs 2ème échelon
  const moisRestantsDeuxieme = deuxiemeEchelon ? Math.max(0, diffMonths(todayStr, deuxiemeEchelon.date)) : 0;
  const delaiDeuxiemeTexte = formatDurationInYearsAndMonths(moisRestantsDeuxieme);
  const gainIndiciaireDeuxieme = deuxiemeEchelon
    ? (deuxiemeEchelon.gainIndiciaire ?? (premierEchelon ? deuxiemeEchelon.indiceMajore - premierEchelon.indiceMajore : 0))
    : 0;
  const gainBrutDeuxieme = Math.round(
    deuxiemeEchelon?.gainFinancierBrutMensuel ??
    (premierEchelon && deuxiemeEchelon ? deuxiemeEchelon.traitementBrutMensuel - premierEchelon.traitementBrutMensuel : 0)
  );
  const gainNetEstimeDeuxieme = Math.round(gainBrutDeuxieme * 0.81);

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
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* 1. CARTE PROFIL DOUBLE-BEZEL (STYLE APPLE WALLET / ID) */}
      <div className="p-1.5 sm:p-2 rounded-[2.2rem] bg-black/[0.04] dark:bg-white/[0.05] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
        <div className="rounded-[1.8rem] bg-white dark:bg-[#111114] p-5 sm:p-7 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          {/* Lueur d'ambiance douce */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-tangerine/15 via-apricot/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Avatar & Identité */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-tangerine to-apricot flex items-center justify-center text-ebony font-extrabold text-2xl shadow-sm tracking-tight">
                  {profil.prenom.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-muted-teal text-ebony flex items-center justify-center text-[10px] font-black ring-2 ring-white dark:ring-[#111114]">
                  ✓
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
                    Bonjour {profil.prenom}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-tangerine/15 text-ebony dark:text-tangerine border border-tangerine/30">
                    {isContractuel ? "Contractuel" : "Titulaire"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{grade.nom}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>{cadre.nom}</span>
                </p>

                {/* Jauge de niveau dans le grade Apple Health/Activity */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 max-w-xs bg-slate-100 dark:bg-white/[0.08] rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-tangerine via-apricot to-lime-cream h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${percentGradeProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Échelon {profil.echelonActuel}/{totalEchelons} ({percentGradeProgress}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons d'actions gélules (Pills) */}
            <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 w-full sm:w-auto">


              <button
                onClick={onSwitchToComplete}
                className="group flex-1 sm:flex-initial text-xs font-semibold bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] text-white dark:text-black px-4 py-2.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>Mode Expert</span>
                <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>

          </div>

          {/* 3 Capsules de métriques façon Apple Watch / Fitness */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-black/[0.05] dark:border-white/[0.06] text-center sm:text-left">
            <div className="bg-slate-50/70 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Niveau actuel</span>
              <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 block truncate">
                Échelon {profil.echelonActuel}
              </span>
            </div>

            <div className="bg-slate-50/70 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Points de salaire</span>
              <span className="text-sm sm:text-base font-black text-muted-teal-dark dark:text-lime-cream mt-0.5 block truncate">
                {resultatSimulation.jalonActuel.indiceMajore} pts
              </span>
            </div>

            <div className="bg-slate-50/70 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/[0.04] dark:border-white/[0.04]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Base brute mensuelle</span>
              <span className="text-sm sm:text-base font-black text-ebony dark:text-apricot mt-0.5 block truncate">
                ~{Math.round(resultatSimulation.jalonActuel.traitementBrutMensuel)} €
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LES DEUX GRANDES CARTES DE QUESTIONS EN DOUBLE-BEZEL ASYMÉTRIQUE BENTO */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tangerine"></span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Vos deux questions essentielles
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Touchez une question pour afficher la réponse détaillée
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* CARTE QUESTION 1 : ÉCHELON (DOUBLE-BEZEL) */}
          <div 
            onClick={() => handleSelectQuestion("echelon")}
            className={`p-1.5 rounded-[2rem] transition-all duration-300 cursor-pointer group ${
              activeQuestion === "echelon"
                ? "bg-lime-cream/30 ring-2 ring-muted-teal shadow-md scale-[1.01]"
                : "bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
            }`}
          >
            <div className="rounded-[1.65rem] bg-white dark:bg-[#111114] p-6 flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-muted-teal/20 text-ebony dark:text-lime-cream flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-lime-cream text-ebony border border-muted-teal/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-teal animate-pulse"></span>
                    100% Automatique
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4 group-hover:text-muted-teal-dark dark:group-hover:text-lime-cream transition-colors leading-snug">
                  Quand est-ce que mon salaire augmente tout seul ?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Votre prochain palier garanti par le temps passé, sans démarche à effectuer.
                </p>
              </div>

              {/* Aperçu clé & Nested Button-in-Button */}
              <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs">
                {premierEchelon ? (
                  <span className="font-bold text-ebony dark:text-lime-cream flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-teal-dark dark:text-lime-cream" />
                    {formatDateFrench(premierEchelon.date)} ({delaiPremierTexte})
                  </span>
                ) : (
                  <span className="font-semibold text-slate-400">Sommet atteint</span>
                )}

                <div className="flex items-center gap-2">
                  <span className="font-black text-ebony bg-lime-cream border border-muted-teal/40 px-2.5 py-1 rounded-full text-xs shadow-2xs">
                    +{gainBrutPremier} € brut
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARTE QUESTION 2 : GRADE SANS EXAMEN (DOUBLE-BEZEL) */}
          <div 
            onClick={() => handleSelectQuestion("promotion")}
            className={`p-1.5 rounded-[2rem] transition-all duration-300 cursor-pointer group ${
              activeQuestion === "promotion"
                ? "bg-apricot/30 ring-2 ring-tangerine shadow-md scale-[1.01]"
                : "bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
            }`}
          >
            <div className="rounded-[1.65rem] bg-white dark:bg-[#111114] p-6 flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-tangerine/20 text-ebony dark:text-tangerine flex items-center justify-center font-bold">
                    <Star className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-apricot text-ebony border border-tangerine/40">
                    Sans examen
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4 group-hover:text-tangerine-dark dark:group-hover:text-apricot transition-colors leading-snug">
                  Comment monter de grade ou de catégorie sans repasser d'examen ?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  L'avancement au choix pour valoriser votre ancienneté et votre engagement.
                </p>
              </div>

              {/* Aperçu clé & Nested Button-in-Button */}
              <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs">
                {prochainePromouvabilite ? (
                  <span className="font-bold text-ebony dark:text-apricot flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-tangerine" />
                    Dès le {formatDateFrench(prochainePromouvabilite.date)}
                  </span>
                ) : (
                  <span className="font-semibold text-slate-400">Grade sommital</span>
                )}

                <div className="flex items-center gap-2">
                  <span className="font-bold text-ebony bg-apricot border border-tangerine/40 px-2.5 py-1 rounded-full text-xs shadow-2xs">
                    Conditions
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. DÉTAILS DE LA QUESTION ACTIVE EN DOUBLE-BEZEL (Affiché uniquement au clic) */}
      {activeQuestion !== null && (
        <div className="p-1.5 sm:p-2 rounded-[2.2rem] bg-black/[0.04] dark:bg-white/[0.05] ring-1 ring-black/[0.06] dark:ring-white/[0.08] animate-fadeIn">
          <div className="rounded-[1.8rem] bg-white dark:bg-[#111114] p-6 sm:p-8 space-y-6 relative">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveQuestion(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Masquer la réponse</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          
          {/* CAS 1 : PROGRESSION AUTOMATIQUE (ÉCHELON) */}
          {activeQuestion === "echelon" && (
            <div id="block-progression-automatique" className="space-y-6 scroll-mt-24">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/[0.05] dark:border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-teal-dark dark:text-lime-cream">
                    Progression automatique
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                    Vos deux prochaines augmentations garanties
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-ebony dark:text-lime-cream bg-lime-cream/30 border border-muted-teal/30 px-3.5 py-1.5 rounded-full self-start sm:self-center">
                  <Check className="w-3.5 h-3.5 text-muted-teal-dark dark:text-lime-cream" />
                  <span>Aucun dossier à monter</span>
                </div>
              </div>

              {premierEchelon ? (
                <div className="space-y-6">
                  
                  {/* LES 2 MARCHES EN BENTO GRID */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    
                    {/* MARCHE 1 */}
                    <div className="rounded-3xl p-6 bg-gradient-to-b from-lime-cream/20 to-transparent border border-muted-teal/40 space-y-5 relative">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-lime-cream text-ebony border border-muted-teal/40 shadow-xs">
                          1er Palier • Prochaine étape
                        </span>
                        <span className="text-xs font-bold text-ebony dark:text-lime-cream">
                          Dans {delaiPremierTexte}
                        </span>
                      </div>

                      <div>
                        <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                          Échelon {premierEchelon.echelonNumero}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Prise d'effet le <strong className="text-slate-800 dark:text-slate-200">{formatDateFrench(premierEchelon.date)}</strong>
                        </p>
                      </div>

                      {/* Barre d'activité Apple Health */}
                      <div className="space-y-1.5 bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-2xl border border-black/[0.03] dark:border-white/[0.04]">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                          <span>Temps accompli vers l'échelon {premierEchelon.echelonNumero}</span>
                          <span className="text-muted-teal-dark dark:text-lime-cream font-bold">{percentEchelonProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200/70 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-muted-teal h-full rounded-full transition-all duration-700"
                            style={{ width: `${percentEchelonProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Chiffres clés de paie façon Apple Wallet */}
                      <div className="grid grid-cols-2 gap-3 bg-white dark:bg-[#18181c] p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-muted-teal" />
                            Gain Mensuel
                          </span>
                          <div className="text-xl sm:text-2xl font-black text-ebony dark:text-lime-cream mt-0.5 tracking-tight">
                            +{gainBrutPremier} € <span className="text-[11px] font-medium text-slate-400">brut</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            environ <strong>~+{gainNetEstimePremier} € net</strong>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <Award className="w-3 h-3 text-ebony/60 dark:text-lime-cream/60" />
                            Points d'indice
                          </span>
                          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">
                            {premierEchelon.indiceMajore} pts
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            +{premierEchelon.indiceMajore - resultatSimulation.jalonActuel.indiceMajore} points IM
                          </div>
                        </div>
                      </div>

                      {/* Ce que vous devez faire */}
                      <div className="bg-lime-cream/30 p-3.5 rounded-2xl border border-muted-teal/40 flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-muted-teal text-ebony flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          ✓
                        </span>
                        <div className="text-xs text-slate-700 dark:text-slate-300">
                          <strong className="text-ebony dark:text-lime-cream">Ce que vous devez faire : </strong>
                          Rien ! L'avancement est garanti par votre statut et validé automatiquement par arrêté DRH.
                        </div>
                      </div>
                    </div>

                    {/* MARCHE 2 */}
                    {deuxiemeEchelon ? (
                      <div className="rounded-3xl p-6 bg-gradient-to-b from-muted-teal/15 to-transparent border border-muted-teal/30 space-y-5 relative">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-muted-teal text-ebony border border-muted-teal-dark/30 shadow-xs">
                            2e Palier • Perspective
                          </span>
                          <span className="text-xs font-bold text-ebony dark:text-lime-cream">
                            Dans {delaiDeuxiemeTexte}
                          </span>
                        </div>

                        <div>
                          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Échelon {deuxiemeEchelon.echelonNumero}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Prise d'effet le <strong className="text-slate-800 dark:text-slate-200">{formatDateFrench(deuxiemeEchelon.date)}</strong>
                          </p>
                        </div>

                        {/* Chiffres clés de paie façon Apple Wallet */}
                        <div className="grid grid-cols-2 gap-3 bg-white dark:bg-[#18181c] p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-muted-teal" />
                              Gain Mensuel
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-ebony dark:text-lime-cream mt-0.5 tracking-tight">
                              +{gainBrutDeuxieme} € <span className="text-[11px] font-medium text-slate-400">brut</span>
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              environ <strong>~+{gainNetEstimeDeuxieme} € net</strong>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <Award className="w-3 h-3 text-ebony/60 dark:text-lime-cream/60" />
                              Points d'indice
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">
                              {deuxiemeEchelon.indiceMajore} pts
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              +{gainIndiciaireDeuxieme} points IM
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted-teal/15 p-3.5 rounded-2xl border border-muted-teal/30 flex items-center gap-3">
                          <Clock className="w-5 h-5 text-ebony dark:text-lime-cream shrink-0" />
                          <div className="text-xs text-slate-700 dark:text-slate-300">
                            Franchi automatiquement après la durée statutaire requise dans l'échelon {premierEchelon.echelonNumero}.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-3xl p-6 border-2 border-dashed border-black/[0.08] dark:border-white/[0.08] flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-lg">
                          🏆
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Sommet du grade atteint</h4>
                        <p className="text-xs text-slate-500 max-w-xs">
                          L'échelon {premierEchelon.echelonNumero} est le dernier échelon. La suite passe par un changement de grade.
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Accordéon Apple Disclosure */}
                  <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowLegalEchelon(!showLegalEchelon)}
                      className="w-full p-3.5 bg-black/[0.02] hover:bg-black/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-left flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>📚 Pour les curieux : la règle officielle du Code Général (CGFP)</span>
                      </span>
                      {showLegalEchelon ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showLegalEchelon && (
                      <div className="p-4 text-xs text-slate-600 dark:text-slate-400 space-y-2 border-t border-black/[0.05] dark:border-white/[0.06] leading-relaxed">
                        <p>
                          <strong>CGFP (Code Général de la Fonction Publique) :</strong> L'avancement d'échelon est un droit continu à cadence unique PPCR. Il s'applique automatiquement à l'ancienneté.
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {isContractuel 
                            ? "Pour les agents contractuels : réévaluation triennale obligatoire (art. 1-2 décret 88-145)."
                            : "Validation administrative par arrêté individuel du Maire de Gennevilliers."}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <span className="text-4xl">🌟</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Dernier échelon atteint</h4>
                  <p className="text-xs text-slate-500">Consultez la question 2 pour découvrir l'avancement de grade.</p>
                </div>
              )}

            </div>
          )}

          {/* CAS 2 : MONTER DE GRADE SANS EXAMEN (AU CHOIX) */}
          {activeQuestion === "promotion" && (
            <div id="block-monter-grade" className="space-y-6 scroll-mt-24">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/[0.05] dark:border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-tangerine-dark dark:text-apricot">
                    Évolution de grade ou de catégorie
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                    Changer de grade ou de catégorie au mérite et à l'ancienneté
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-ebony dark:text-apricot bg-apricot/30 px-3.5 py-1.5 rounded-full self-start sm:self-center border border-tangerine/40">
                  <Star className="w-3.5 h-3.5 text-tangerine" />
                  <span>Sans examen obligatoire</span>
                </div>
              </div>

              {prochainePromouvabilite ? (
                <div className="space-y-6">
                  
                  {/* CARTE VISÉE & PROMOUVABILITÉ */}
                  <div 
                    id="block-prochain-metier"
                    className="rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-apricot/15 to-transparent border border-tangerine/40 space-y-6 scroll-mt-24"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-ebony dark:text-apricot">
                            Prochain niveau de métier visé :
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-tangerine text-ebony shadow-xs">
                            Promouvabilité
                          </span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                          {prochainePromouvabilite.titre}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {prochainePromouvabilite.sousTitre}
                        </p>
                      </div>

                      <div className="bg-white dark:bg-[#18181c] p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex items-center gap-3.5 self-start md:self-center shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-tangerine text-ebony flex items-center justify-center font-bold shadow-xs shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                            Date d'éligibilité (Promouvabilité)
                          </span>
                          <span className="text-sm sm:text-base font-black text-ebony dark:text-apricot">
                            {formatDateFrench(prochainePromouvabilite.date)}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            (dans {delaiPromoTexte})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Check-list des conditions façon quête */}
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                        📋 Votre check-list pour être sélectionné(e) :
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {prochainePromouvabilite.conditionsRemplies.map((c, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-lime-cream/30 p-3 rounded-2xl border border-muted-teal/40 text-xs">
                            <CircleCheck className="w-4 h-4 text-muted-teal-dark dark:text-lime-cream shrink-0" />
                            <span className="font-semibold text-ebony dark:text-lime-cream">{c.libelle} (Validé !)</span>
                          </div>
                        ))}

                        {prochainePromouvabilite.conditionsManquantes.map((c, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-apricot/30 p-3 rounded-2xl border border-tangerine/40 text-xs">
                            <Clock className="w-4 h-4 text-ebony dark:text-apricot shrink-0" />
                            <span className="font-semibold text-ebony dark:text-apricot">{c.libelle}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 Conseils simples pour agir */}
                    <div className="bg-white dark:bg-[#18181c] p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                      <h5 className="text-xs font-black uppercase tracking-wider text-ebony dark:text-tangerine flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Ce que vous devez faire pour maximiser vos chances :</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
                        <div className="bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-xl">
                          <span className="font-bold text-ebony dark:text-tangerine block mb-1">1. L'entretien annuel</span>
                          Échangez avec votre responsable lors de votre entretien professionnel pour formaliser votre souhait.
                        </div>
                        <div className="bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-xl">
                          <span className="font-bold text-ebony dark:text-tangerine block mb-1">2. Vos formations</span>
                          Suivez vos formations CNFPT pour attester de vos compétences.
                        </div>
                        <div className="bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-xl">
                          <span className="font-bold text-ebony dark:text-tangerine block mb-1">3. La liste de fin d'année</span>
                          La mairie arrête le tableau d'avancement chaque fin d'année pour prise d'effet au 1er janvier.
                        </div>
                      </div>
                    </div>

                    {/* Accélérateur Examen Pro */}
                    {jalonExamenPro && jalonExamenPro.id !== prochainePromouvabilite.id && (
                      <div className="bg-apricot/20 border border-tangerine/30 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-tangerine shrink-0" />
                          <div>
                            <strong className="text-ebony dark:text-apricot">Option « Accélérateur » : </strong>
                            Un examen professionnel existe dès le {formatDateFrench(jalonExamenPro.date)} pour devancer cette date.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordéon Apple Disclosure */}
                  <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowLegalPromo(!showLegalPromo)}
                      className="w-full p-3.5 bg-black/[0.02] hover:bg-black/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-left flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-tangerine" />
                        <span>📚 Pour les curieux : fonctionnement des Lignes Directrices de Gestion (LDG)</span>
                      </span>
                      {showLegalPromo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showLegalPromo && (
                      <div className="p-4 text-xs text-slate-600 dark:text-slate-400 space-y-3 border-t border-black/[0.05] dark:border-white/[0.06] leading-relaxed">
                        <p>
                          <strong>Lignes Directrices de Gestion (LDG) :</strong> L'avancement s'effectue au choix par inscription sur le tableau annuel selon les critères fixés par la collectivité de Gennevilliers.
                        </p>
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (onOpenLdg) {
                                onOpenLdg();
                              } else {
                                const basePrefix = window.location.pathname.endsWith("/")
                                  ? window.location.pathname
                                  : window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1);
                                window.location.href = `${basePrefix}ldg/index.html`;
                              }
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-tangerine to-apricot text-white font-bold text-xs shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <Calculator className="w-4 h-4 text-white" />
                            <span>Accéder à la simulation des points de la promotion</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white/90" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <span className="text-4xl">👑</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Sommet du cadre d'emplois atteint</h4>
                  <p className="text-xs text-slate-500">Pour évoluer vers la catégorie supérieure, explorez la promotion interne.</p>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
      )}

      {/* 4. LE DÉCODEUR STATUTAIRE INTERACTIF (EN FRANÇAIS FACILE) */}
      <div className="p-1.5 sm:p-2 rounded-[2.2rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06]">
        <div className="rounded-[1.8rem] bg-white dark:bg-[#111114] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-apricot/30 text-ebony dark:text-apricot flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Le Décodeur RH : Le statut en français facile
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comprendre les termes administratifs sans prise de tête.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDecoder(!showDecoder)}
              className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] px-3.5 py-1.5 rounded-full transition-all cursor-pointer shrink-0"
            >
              {showDecoder ? "Masquer" : "Afficher"}
            </button>
          </div>

          {showDecoder && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-fadeIn">
              {glossaireJargon.map((item, idx) => (
                <div key={idx} className="bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.05] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.terme}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-apricot/40 text-ebony dark:text-apricot">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
