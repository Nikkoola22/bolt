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
import { PrintSummary } from "./components/PrintSummary";
import { ProfileEditModal } from "./components/ProfileEditModal";
import { AgentIntakeView } from "./components/AgentIntakeView";
import { ModeSelectionView } from "./components/ModeSelectionView";
import { SimplifiedCareerGuide } from "./components/SimplifiedCareerGuide";
import { useDarkMode } from "./hooks/useDarkMode";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  TrendingUp, 
  GitCompare, 
  Lightbulb, 
  Sparkles, 
  FileText, 
  ShieldCheck,
  Zap,
  FileEdit
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
  const [appMode, setAppMode] = useState<"saisie" | "choix_mode" | "simplifiee" | "complete">("saisie");

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
        onOpenPrintSummary={() => setIsPrintSummaryOpen(true)}
        onResetEvents={handleResetEvents}
      />

      {/* Contenu principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">

        {/* MODE 1 : SAISIE DU PROFIL (Écran d'accueil pur, sans barre d'onglets de frise) */}
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
            onBackToSaisie={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setAppMode("saisie");
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
            onEditProfile={() => {
              setAppMode("saisie");
            }}
            onOpenAddEvent={(type) => handleOpenAddEventWithType(type)}
          />
        )}

        {/* MODE 4 : VERSION COMPLÈTE (Processus normal : Frise, Perspectives, Comparateur, Conseils) */}
        {appMode === "complete" && (
          <>
            {/* Bloc 1 : Où en est l'agent dans sa carrière ? */}
            <ProfileOverviewCard
              profil={currentProfile}
              prochainEchelonJalon={resultatSimulation.prochainEchelonJalon}
              onEditProfile={() => setAppMode("saisie")}
              onScrollToNextMilestone={() => {
                if (resultatSimulation.prochainEchelonJalon) {
                  setSelectedJalon(resultatSimulation.prochainEchelonJalon);
                }
              }}
            />

            {/* Barre de navigation par onglets thématiques (Style Dashboard Moderne) */}
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 sm:p-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
              <div className="w-full overflow-x-auto no-scrollbar py-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap min-w-max">
                  {/* Raccourci vers la Saisie */}
                  <button
                    onClick={() => setAppMode("saisie")}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shrink-0"
                    title="Revenir à la saisie du profil"
                  >
                    <FileEdit className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Modifier saisie</span>
                  </button>

                  {/* Raccourci vers la Version Simplifiée */}
                  <button
                    onClick={() => setAppMode("simplifiee")}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/60 hover:bg-amber-200/90 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700 transition-all cursor-pointer shrink-0 shadow-2xs"
                    title="Accéder directement aux 2 questions clés"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-500" />
                    <span>Version Simplifiée</span>
                  </button>

                  <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                  <button
                    onClick={() => setActiveTab("frise")}
                    className={`flex items-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === "frise"
                        ? "bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/30 ring-2 ring-orange-400/30 scale-[1.02]"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700"
                    }`}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Ma carrière</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-black ${
                      activeTab === "frise"
                        ? "bg-white/25 text-white ring-1 ring-white/30"
                        : "bg-orange-100 dark:bg-orange-950/80 text-orange-950 dark:text-orange-200"
                    }`}>
                      {resultatSimulation.jalons.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("perspectives")}
                    className={`flex items-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === "perspectives"
                        ? "bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-500/30 scale-[1.02]"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Avancement / Promotion</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("comparateur")}
                    className={`flex items-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === "comparateur"
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-500/30 scale-[1.02]"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700"
                    }`}
                  >
                    <GitCompare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Comparateur (« What-If »)</span>
                    {currentProfile.evenementsSimules.length > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-black ${
                        activeTab === "comparateur"
                          ? "bg-white/25 text-white ring-1 ring-white/30"
                          : "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200"
                      }`}>
                        {currentProfile.evenementsSimules.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("conseils")}
                    className={`flex items-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === "conseils"
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-500/30 scale-[1.02]"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700"
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Conseils DRH & Justificatifs</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleOpenAddEventWithType()}
                className="w-full lg:w-auto flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 active:scale-[0.98] transition-all cursor-pointer shrink-0 border border-emerald-400/40"
              >
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300 animate-pulse shrink-0" />
                <span>Simuler un événement</span>
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
                className="w-full sm:w-auto text-xs font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 ring-1 ring-orange-400/30 transition-all cursor-pointer flex items-center justify-center gap-2"
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
        {appMode !== "saisie" && appMode !== "simplifiee" && (
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
