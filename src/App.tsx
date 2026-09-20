import { useState, useMemo } from "react";
import type { ProfilAgent, JalonTimeline, EvenementCarriere } from "./types/career";
import { PROFILS_PREDEFINIS } from "./data/presetProfiles";
import { runSimulation } from "./services/simulationEngine";
import { Header } from "./components/Header";
import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { ProfileOverviewCard } from "./components/ProfileOverviewCard";
import { TimelineInteractive } from "./components/TimelineInteractive";
import { MilestoneDetailModal } from "./components/MilestoneDetailModal";
import { EventSimulatorDrawer } from "./components/EventSimulatorDrawer";
import { PerspectivesChecklist } from "./components/PerspectivesChecklist";
import { ScenarioComparator } from "./components/ScenarioComparator";
import { GlossaryModal } from "./components/GlossaryModal";
import { MementoHubView } from "./components/MementoHubView";
import { PrintSummary } from "./components/PrintSummary";
import { ProfileEditModal } from "./components/ProfileEditModal";
import { AgentIntakeView } from "./components/AgentIntakeView";
import { ModeSelectionView } from "./components/ModeSelectionView";
import { SimplifiedCareerGuide } from "./components/SimplifiedCareerGuide";
import { LdgSimulatorView } from "./components/LdgSimulatorView";
import { useDarkMode } from "./hooks/useDarkMode";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  TrendingUp, 
  Lightbulb, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Zap,
} from "lucide-react";

export function App() {
  // Mode sombre persistant
  const { isDark, toggleTheme } = useDarkMode();

  // Profil sélectionné
  const [currentProfile, setCurrentProfile] = useState<ProfilAgent>(PROFILS_PREDEFINIS[0]);

  // Mode de navigation :
  // - "saisie" : Formulaire d'accueil initial (sans onglets de frise)
  // - "choix_mode" : Page intermédiaire avec les 2 boutons (Version simplifiée vs Version complète)
  // - "simplifiee" : Les 2 questions directes (échelon ? avancement/promotion ?)
  // - "complete" : Le processus normal complet avec frise chronologique, comparateur, etc.
  // - "ldg" : Simulateur de points de promotion interne (LDG-PI)
  // - "memento" : Hub du mémento statutaire
  const [appMode, setAppMode] = useState<"saisie" | "choix_mode" | "simplifiee" | "complete" | "ldg" | "memento">("saisie");

  // Onglet actif dans le mode complet
  const [activeTab, setActiveTab] = useState<"frise" | "perspectives" | "comparateur" | "conseils">("frise");

  // Modals et tiroirs
  const [selectedJalon, setSelectedJalon] = useState<JalonTimeline | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const [initialEventType, setInitialEventType] = useState<string | undefined>(undefined);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isPrintSummaryOpen, setIsPrintSummaryOpen] = useState(false);

  // Moteur de calcul statutaire
  const resultatSimulation = useMemo(() => {
    return runSimulation(currentProfile);
  }, [currentProfile]);

  // Gestion des événements simulés
  const handleAddEvent = (evt: EvenementCarriere) => {
    // Si agent contractuel, refuser les événements strictement réservés aux titulaires
    if (currentProfile.statut.startsWith("contractuel") && (evt.type === "examen_professionnel" || evt.type === "disponibilite")) {
      return;
    }

    setCurrentProfile((prev) => ({
      ...prev,
      evenementsSimules: [...prev.evenementsSimules, evt],
    }));

    if (evt.type === "examen_professionnel" || evt.type === "reussite_concours") {
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleRemoveEvent = (id: string) => {
    setCurrentProfile((prev) => ({
      ...prev,
      evenementsSimules: prev.evenementsSimules.filter((e) => e.id !== id),
    }));
  };

  const handleResetEvents = () => {
    setCurrentProfile((prev) => ({
      ...prev,
      evenementsSimules: [],
    }));
  };

  const handleBackToSaisie = () => {
    handleResetEvents();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setAppMode("saisie");
  };

  const handleBackToMenu = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setAppMode("choix_mode");
  };

  const handleOpenAddEventWithType = (type?: string) => {
    setInitialEventType(type);
    setIsEventDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased">
      {/* Barre de navigation principale */}
      <Header
        currentProfile={currentProfile}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onSelectProfile={(p) => {
          const isContractuel = p.statut.startsWith("contractuel");
          const cleanedProfile = isContractuel
            ? {
                ...p,
                evenementsSimules: p.evenementsSimules.filter(
                  (e) => e.type !== "examen_professionnel" && e.type !== "disponibilite"
                ),
              }
            : p;
          setCurrentProfile(cleanedProfile);
          setSelectedJalon(null);
          setActiveTab("frise");
        }}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenMemento={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          setAppMode("memento");
        }}
        onOpenPrintSummary={() => setIsPrintSummaryOpen(true)}
        onResetEvents={handleResetEvents}
        onBackToMenu={handleBackToMenu}
        showBackToMenu={appMode !== "saisie" && appMode !== "choix_mode"}
      />

      {/* Contenu principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">

        {/* MODE 1 : SAISIE DU PROFIL (Écran d'accueil pur, sans onglets de frise) */}
        {appMode === "saisie" && (
          <AgentIntakeView
            currentProfile={currentProfile}
            onSaveProfileAndSimulate={(p) => {
              setCurrentProfile(p);
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("choix_mode");
              try {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
              } catch (e) {}
            }}
            onSelectPreset={(p) => {
              setCurrentProfile(p);
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("choix_mode");
            }}
          />
        )}

        {/* MODE 2 : PAGE DE CHOIX (Affichée après clic sur 'Lancer la simulation') */}
        {appMode === "choix_mode" && (
          <ModeSelectionView
            profil={currentProfile}
            resultatSimulation={resultatSimulation}
            onSelectSimplified={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("simplifiee");
            }}
            onSelectComplete={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("complete");
              setActiveTab("frise");
            }}
            onBackToSaisie={handleBackToSaisie}
            onOpenLdg={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("ldg");
            }}
            onOpenMemento={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("memento");
            }}
          />
        )}

        {/* MODE 5 : SIMULATEUR DE POINTS LDG PROMOTION INTERNE */}
        {appMode === "ldg" && (
          <LdgSimulatorView
            profil={currentProfile}
            onBackToModeSelection={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("choix_mode");
            }}
            onSelectComplete={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("complete");
              setActiveTab("frise");
            }}
            onSelectSimplified={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("simplifiee");
            }}
          />
        )}

        {/* MODE 6 : MEMENTO RH HUB */}
        {appMode === "memento" && (
          <MementoHubView
            onBackToMenu={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("choix_mode");
            }}
          />
        )}

        {/* MODE 3 : VERSION SIMPLIFIÉE (2 boutons de questions directes & réponses claires) */}
        {appMode === "simplifiee" && (
          <SimplifiedCareerGuide
            profil={currentProfile}
            resultatSimulation={resultatSimulation}
            onSwitchToComplete={() => {
              setAppMode("complete");
              setActiveTab("frise");
            }}
            onBackToMenu={handleBackToMenu}
            onOpenAddEvent={(type) => handleOpenAddEventWithType(type)}
            onOpenLdg={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("ldg");
            }}
          />
        )}

        {/* MODE 4 : VERSION COMPLÈTE (Processus normal : Frise, Perspectives, Comparateur, Conseils) */}
        {appMode === "complete" && (
          <>
            {/* Bloc 1 : Où en est l'agent dans sa carrière ? */}
            <ProfileOverviewCard
              profil={currentProfile}
              prochainEchelonJalon={resultatSimulation.prochainEchelonJalon}
              onBackToMenu={handleBackToMenu}
              onScrollToNextMilestone={() => {
                if (resultatSimulation.prochainEchelonJalon) {
                  setSelectedJalon(resultatSimulation.prochainEchelonJalon);
                }
              }}
            />

            {/* Barre de navigation par onglets thématiques (Optimisée Mobile iPhone & Desktop - 100% visible sans slider) */}
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-3">
              
              {/* Groupe 1 : Raccourci Version Simplifiée */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setAppMode("simplifiee")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black text-ebony dark:text-apricot bg-apricot/30 dark:bg-apricot/20 hover:bg-apricot/40 dark:hover:bg-apricot/30 border border-apricot/60 dark:border-apricot/40 transition-all cursor-pointer shadow-2xs"
                  title="Accéder directement aux 2 questions clés"
                >
                  <Zap className="w-3.5 h-3.5 text-ebony dark:text-apricot fill-apricot shrink-0" />
                  <span className="truncate">Version Simplifiée</span>
                </button>
              </div>

              {/* Séparateur visible uniquement sur grand écran */}
              <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 shrink-0"></div>

              {/* Groupe 2 : Les 2 Onglets thématiques majeurs */}
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                <button
                  onClick={() => setActiveTab("frise")}
                  className={`flex items-center justify-center sm:justify-start gap-1.5 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer text-center sm:text-left ${
                    activeTab === "frise"
                      ? "bg-gradient-to-r from-tangerine via-apricot to-tangerine text-ebony shadow-md shadow-tangerine/30 ring-2 ring-tangerine/40 font-black"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="truncate">Ma carrière</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black shrink-0 ${
                    activeTab === "frise"
                      ? "bg-ebony/15 text-ebony ring-1 ring-ebony/20"
                      : "bg-tangerine/20 dark:bg-tangerine/30 text-ebony dark:text-tangerine"
                  }`}>
                    {resultatSimulation.jalons.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("perspectives")}
                  className={`flex items-center justify-center sm:justify-start gap-1.5 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer text-center sm:text-left ${
                    activeTab === "perspectives"
                      ? "bg-gradient-to-r from-muted-teal via-lime-cream to-muted-teal text-ebony shadow-md shadow-muted-teal/30 ring-2 ring-muted-teal/40 font-black"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span className="truncate">Avancement / Promotion</span>
                </button>
              </div>

              {/* Groupe 3 : Bouton Simuler un événement */}
              <button
                onClick={() => handleOpenAddEventWithType()}
                className="group relative w-full lg:w-auto flex items-center justify-center gap-2.5 py-2.5 sm:py-2.5 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 hover:from-orange-500 hover:via-amber-400 hover:to-orange-500 text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0 border border-amber-300/40"
              >
                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />
                </span>
                <span className="tracking-tight text-white drop-shadow-xs">Simuler un événement</span>
                {currentProfile.evenementsSimules.length > 0 ? (
                  <span className="inline-flex items-center text-[10px] font-black bg-white text-orange-600 px-2 py-0.5 rounded-full shadow-xs">
                    {currentProfile.evenementsSimules.length} actif{currentProfile.evenementsSimules.length > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center text-[10px] font-black bg-white/25 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    + Ajouter
                  </span>
                )}
              </button>
            </div>

            {/* Onglet actif du parcours complet */}
            {activeTab === "frise" && (
              <div className="space-y-6">
                <TimelineInteractive
                  jalons={resultatSimulation.jalons}
                  selectedJalonId={selectedJalon ? selectedJalon.id : null}
                  onSelectJalon={(j) => setSelectedJalon(j)}
                  onOpenAddEvent={() => handleOpenAddEventWithType()}
                />
              </div>
            )}

        {activeTab === "perspectives" && (
          <div className="space-y-6">
            <PerspectivesChecklist
              profil={currentProfile}
              jalons={resultatSimulation.jalons}
              onSelectJalon={(j) => setSelectedJalon(j)}
              onOpenAddEvent={(t) => handleOpenAddEventWithType(t)}
            />
          </div>
        )}

        {activeTab === "comparateur" && (
          <div className="space-y-6">
            <ScenarioComparator
              currentProfile={currentProfile}
              currentResult={resultatSimulation}
            />
          </div>
        )}

        {activeTab === "conseils" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
                  <Lightbulb className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Synthèse Pédagogique & Préparation aux Démarches DRH
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Comprendre les clés statutaires pour valoriser vos droits et préparer votre Entretien Professionnel Annuel (EPA).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300">
              {/* Colonne 1 : Conseils pour l entretien annuel */}
              <div className="bg-slate-50/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
                    <FileText className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Conseils pour l Entretien Professionnel Annuel (EPA)
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {resultatSimulation.synthesePedagogique.conseilsEntretienPro.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">Consultez les Lignes Directrices de Gestion (LDG) de votre collectivité pour connaître les critères de valorisation des dossiers.</span>
                  </li>
                </ul>
              </div>

              {/* Colonne 2 : Justificatifs à surveiller */}
              <div className="bg-slate-50/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Justificatifs et Démarches Indispensables
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {resultatSimulation.synthesePedagogique.justificatifsUrgents.map((j, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                      <span className="leading-relaxed">{j}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">Formations d intégration et de professionnalisation : conservez vos attestations CNFPT nécessaires pour valider l inscription au tableau d avancement.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bouton d impression */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Vous préparez votre prochain entretien d évaluation ?
              </span>
              <button
                onClick={() => setIsPrintSummaryOpen(true)}
                className="w-full sm:w-auto text-xs font-black bg-gradient-to-r from-tangerine via-apricot to-tangerine text-ebony px-5 py-2.5 rounded-xl shadow-md shadow-tangerine/25 ring-1 ring-tangerine/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Générer la Fiche Récapitulative d Entretien Pro</span>
              </button>
            </div>
          </div>
        )}
          </>
        )}

        {/* Bloc SIMULATION INFORMATIVE & STATUTAIRE en bas de page pour les modes de consultation */}
        {appMode !== "saisie" && appMode !== "simplifiee" && appMode !== "ldg" && (
          <div className="pt-2">
            <DisclaimerBanner />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-5 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">CFDT « MA CARRIÈRE »</span>
            <span className="text-slate-400">•</span>
            <span>Collectivité de Gennevilliers (FPT)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Conforme au Code Général de la Fonction Publique (CGFP)</span>
          </div>
        </div>
      </footer>

      {/* Modal Fiche Détaillée du Jalon */}
      <MilestoneDetailModal
        jalon={selectedJalon}
        onClose={() => setSelectedJalon(null)}
        onOpenAddEvent={(type) => handleOpenAddEventWithType(type)}
        isContractuel={currentProfile.statut.startsWith("contractuel")}
      />

      {/* Tiroir d ajout / gestion d événements de vie */}
      <EventSimulatorDrawer
        isOpen={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
        evenements={currentProfile.evenementsSimules}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
        initialEventType={initialEventType}
        isContractuel={currentProfile.statut.startsWith("contractuel")}
      />

      {/* Modal d édition du profil */}
      <ProfileEditModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profil={currentProfile}
        onSave={(newProf) => setCurrentProfile(newProf)}
      />

      {/* Modal du lexique statutaire */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Modal de la fiche d entretien pro imprimable */}
      <PrintSummary
        isOpen={isPrintSummaryOpen}
        onClose={() => setIsPrintSummaryOpen(false)}
        resultat={resultatSimulation}
      />
    </div>
  );
}

export default App;
