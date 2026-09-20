import React, { useState, useEffect } from "react";
import { UserCog, User, BriefcaseBusiness, FileText, Settings, ExternalLink, ArrowRight, Wallet, Clock, Scale } from "lucide-react";
import { NetPaySimulator } from "./memento-tools/NetPaySimulator";
import { RttCalculator } from "./memento-tools/RttCalculator";
import { IhtsCalculator } from "./memento-tools/IhtsCalculator";
import { TravelExpensesCalculator } from "./memento-tools/TravelExpensesCalculator";
import { IsrcSimulator } from "./memento-tools/IsrcSimulator";
import { AvancementEchelon } from "./memento-tools/AvancementEchelon";
import { CongesMaladie } from "./memento-tools/CongesMaladie";
import { ArrNomination } from "./memento-tools/ArrNomination";
import { ArrTitularisation } from "./memento-tools/ArrTitularisation";
import { ArrEchelon } from "./memento-tools/ArrEchelon";
import { ArrTeletravail } from "./memento-tools/ArrTeletravail";
import { ArrCongeParental } from "./memento-tools/ArrCongeParental";
import { ArrDetachement } from "./memento-tools/ArrDetachement";
import { ArrIntegrationDetachement } from "./memento-tools/ArrIntegrationDetachement";
import { ArrMutationExterne } from "./memento-tools/ArrMutationExterne";
import { ArrMutationInterne } from "./memento-tools/ArrMutationInterne";
import { RepriseAnciennete } from "./memento-tools/RepriseAnciennete";
import { DelibPoste } from "./memento-tools/DelibPoste";
import { MasseSalariale } from "./memento-tools/MasseSalariale";
import { PscSimulator } from "./memento-tools/PscSimulator";
import { ReferentielMetiers } from "./memento-tools/ReferentielMetiers";
import FichePoste from "./memento-tools/FichePoste";

interface MementoHubViewProps {
  onBackToMenu: () => void;
}

export const MementoHubView: React.FC<MementoHubViewProps> = ({ onBackToMenu }) => {
  const [role, setRole] = useState<"gestionnaire" | "agent">("gestionnaire");
  const [activeTool, setActiveTool] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTool]);

  const categories = [
    {
      id: "remuneration",
      title: "Rémunération et budget",
      icon: <Wallet className="w-5 h-5 text-emerald-500" />,
      color: "emerald",
      colorClasses: {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        border: "border-emerald-200 dark:border-emerald-800/60",
        text: "text-emerald-700 dark:text-emerald-300"
      },
      tools: [
        { id: "masse-salariale", title: "Simulateur de masse salariale", desc: "Coût employeur réel, tous postes confondus", localTool: true, role: "gestionnaire", highlight: true },
        { id: "net-a-payer", title: "Simulateur de net à payer", desc: "Estimation du net à partir de l'indice majoré", localTool: true, role: "agent" },
        { id: "ihts", title: "Calcul d'heures supplémentaires", desc: "Calcul des IHTS par tranche et nature", localTool: true, role: "agent" },
        { id: "frais-dep", title: "Frais de déplacement", desc: "Indemnités kilométriques, nuitées et repas", localTool: true, role: "agent" },
        { id: "isrc", title: "Indemnité de rupture conventionnelle", desc: "Fourchette plancher et plafond", localTool: true, role: "agent" },
        { id: "psc", title: "Simulateur PSC", desc: "Calcul de la Protection Sociale Complémentaire", localTool: true, role: "gestionnaire" },
      ]
    },
    {
      id: "carriere",
      title: "Carrière & temps de travail",
      icon: <Clock className="w-5 h-5 text-indigo-500" />,
      color: "indigo",
      colorClasses: {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        border: "border-indigo-200 dark:border-indigo-800/60",
        text: "text-indigo-700 dark:text-indigo-300"
      },
      tools: [
        { id: "rtt", title: "Calculateur RTT & temps de travail", desc: "Calcul du droit à congés et jours RTT", localTool: true, role: "agent", highlight: true },
        { id: "maladie", title: "Droits à congés maladie", desc: "CMO, CLM et CLD sur période glissante", localTool: true, role: "agent" },
        { id: "etp", title: "Calculateur ETP", desc: "Conversion heures ↔ équivalent temps plein", link: "https://mementorh.fr/temps-de-travail/calculateur-etp", role: "gestionnaire" },
        { id: "reprise", title: "Reprise d'ancienneté", desc: "Calcul de reprise lors de la nomination", localTool: true, role: "gestionnaire" },
      ]
    },
    {
      id: "postes",
      title: "Gestion des postes",
      icon: <BriefcaseBusiness className="w-5 h-5 text-amber-500" />,
      color: "amber",
      colorClasses: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        border: "border-amber-200 dark:border-amber-800/60",
        text: "text-amber-700 dark:text-amber-300"
      },
      tools: [
        { id: "effectifs", title: "Tableau des effectifs", desc: "Délibération d'adoption avec annexe", link: "https://mementorh.fr/deliberation-tableau-effectifs", role: "gestionnaire" },
        { id: "fiche-poste", title: "Fiche de poste", desc: "Générateur de fiche de poste", localTool: true, role: "gestionnaire" },
        { id: "ref-metiers", title: "Référentiel métiers", desc: "Les 560 métiers de la FPT en détail", localTool: true, role: "gestionnaire", highlight: true },
      ]
    },
    {
      id: "deliberations",
      title: "Actes RH (Arrêtés & Délibérations)",
      icon: <Scale className="w-5 h-5 text-rose-500" />,
      color: "rose",
      colorClasses: {
        bg: "bg-rose-100 dark:bg-rose-900/30",
        border: "border-rose-200 dark:border-rose-800/60",
        text: "text-rose-700 dark:text-rose-300"
      },
      tools: [
        { id: "arr-nomination", title: "Nomination stagiaire", desc: "Arrêté de mise en stage", localTool: true, role: "gestionnaire" },
        { id: "arr-titularisation", title: "Titularisation", desc: "Arrêté de titularisation", localTool: true, role: "gestionnaire" },
        { id: "arr-echelon", title: "Avancement d'échelon", desc: "Arrêté d'avancement d'échelon", localTool: true, role: "gestionnaire" },
        { id: "arr-teletravail", title: "Télétravail", desc: "Arrêté portant autorisation de télétravail", localTool: true, role: "gestionnaire" },
        { id: "arr-conge-parental", title: "Congé Parental", desc: "Arrêté de placement en congé parental", localTool: true, role: "gestionnaire" },
        { id: "arr-detachement", title: "Détachement", desc: "Arrêté de détachement entrant/sortant", localTool: true, role: "gestionnaire" },
        { id: "arr-integration-detachement", title: "Intégration après détachement", desc: "Arrêté d'intégration dans le grade", localTool: true, role: "gestionnaire" },
        { id: "arr-mutation-externe", title: "Mutation Externe", desc: "Arrêté portant mutation externe", localTool: true, role: "gestionnaire" },
        { id: "arr-mutation-interne", title: "Mutation Interne", desc: "Changement d'affectation interne", localTool: true, role: "gestionnaire" },
        { id: "delib-poste", title: "Création / Suppression de poste", desc: "Délibérations", localTool: true, role: "gestionnaire" },
      ]
    }
  ];

  if (activeTool) {
    return (
      <div className="flex-1 bg-slate-50 dark:bg-slate-900 min-h-screen animate-fadeIn pb-20">
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 mb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <button
              onClick={() => setActiveTool(null)}
              className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
            >
              ← Retour au portail MementoRH
            </button>
          </div>
        </div>
        
        {activeTool === "net-a-payer" && <NetPaySimulator />}
        {activeTool === "rtt" && <RttCalculator />}
        {activeTool === "ihts" && <IhtsCalculator />}
        {activeTool === "frais-dep" && <TravelExpensesCalculator />}
        {activeTool === "isrc" && <IsrcSimulator />}
        {activeTool === "avancement" && <AvancementEchelon />}
        {activeTool === "maladie" && <CongesMaladie />}
        {activeTool === "arr-nomination" && <ArrNomination />}
        {activeTool === "arr-titularisation" && <ArrTitularisation />}
        {activeTool === "arr-echelon" && <ArrEchelon />}
        {activeTool === "arr-teletravail" && <ArrTeletravail />}
        {activeTool === "arr-conge-parental" && <ArrCongeParental />}
        {activeTool === "arr-detachement" && <ArrDetachement />}
        {activeTool === "arr-integration-detachement" && <ArrIntegrationDetachement />}
        {activeTool === "arr-mutation-externe" && <ArrMutationExterne />}
        {activeTool === "arr-mutation-interne" && <ArrMutationInterne />}
        {activeTool === "delib-poste" && <DelibPoste />}
        {activeTool === "masse-salariale" && <MasseSalariale />}
        {activeTool === "psc" && <PscSimulator />}
        {activeTool === "ref-metiers" && <ReferentielMetiers />}
        {activeTool === "fiche-poste" && <FichePoste />}
        
        { activeTool === "reprise" && <RepriseAnciennete /> }
        
        {/* Placeholder for other tools to be built */}
        {activeTool !== "ref-metiers" && activeTool !== "fiche-poste" && activeTool !== "psc" && activeTool !== "masse-salariale" && activeTool !== "net-a-payer" && activeTool !== "reprise" && activeTool !== "delib-poste" && activeTool !== "rtt" && activeTool !== "ihts" && activeTool !== "frais-dep" && activeTool !== "isrc" && activeTool !== "avancement" && activeTool !== "maladie" && activeTool !== "arr-nomination" && activeTool !== "arr-titularisation" && activeTool !== "arr-echelon" && activeTool !== "arr-teletravail" && activeTool !== "arr-conge-parental" && activeTool !== "arr-detachement" && activeTool !== "arr-integration-detachement" && activeTool !== "arr-mutation-externe" && activeTool !== "arr-mutation-interne" && (
          <div className="max-w-2xl mx-auto text-center p-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Outil en construction</h2>
            <p className="text-slate-500">Ce simulateur est en cours de développement natif.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900 min-h-screen animate-fadeIn pb-20">
      
      {/* En-tête de la page */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBackToMenu}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-4 transition-colors"
          >
            ← Retour au menu principal
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Memento<span className="text-indigo-600 dark:text-indigo-400">RH</span>
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                Boîte à outils complète pour la gestion des ressources humaines de la Fonction Publique Territoriale.
                Sélectionnez votre profil pour afficher les modules adaptés.
              </p>
            </div>

            {/* Sélecteur de profil (Toggle) */}
            <div className="flex bg-slate-100 dark:bg-slate-900/50 rounded-xl p-1.5 border border-slate-200 dark:border-slate-700/50 w-full md:w-auto shrink-0 shadow-inner">
              <button
                onClick={() => setRole("gestionnaire")}
                className={`flex-1 md:flex-none flex justify-center items-center gap-2 py-2.5 px-6 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  role === "gestionnaire"
                    ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <UserCog className="w-4 h-4" />
                Gestionnaire RH
              </button>
              <button
                onClick={() => setRole("agent")}
                className={`flex-1 md:flex-none flex justify-center items-center gap-2 py-2.5 px-6 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  role === "agent"
                    ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <User className="w-4 h-4" />
                Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {categories.map(category => {
          // Filtrer les outils selon le rôle
          const visibleTools = category.tools.filter(tool => tool.role === role);
          
          if (visibleTools.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4 animate-slideUp">
              <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className={`p-1.5 rounded-lg ${category.colorClasses.bg}`}>
                  {category.icon}
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleTools.map((tool, index) => {
                  const Element = tool.localTool ? 'button' : 'a';
                  
                  return (
                  <Element
                    key={index}
                    href={tool.link}
                    onClick={tool.localTool ? () => setActiveTool(tool.id) : undefined}
                    target={!tool.localTool ? "_blank" : undefined}
                    rel={!tool.localTool ? "noopener noreferrer" : undefined}
                    className={`group block w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      tool.highlight
                        ? `bg-white dark:bg-slate-800 ${category.colorClasses.border} shadow-md hover:shadow-lg hover:-translate-y-0.5`
                        : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className={`font-bold text-sm ${tool.highlight ? category.colorClasses.text : 'text-slate-900 dark:text-white'}`}>
                            {tool.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                      <div className="flex items-center text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Accéder au module
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </Element>
                )})}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
