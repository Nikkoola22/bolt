import React, { useState } from "react";
import { X, UserCog, User, Briefcase, ExternalLink, BriefcaseBusiness, FileText, Settings } from "lucide-react";

interface MementoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MementoDrawer: React.FC<MementoDrawerProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<"gestionnaire" | "agent">("gestionnaire");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-full sm:max-w-sm h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
        
        {/* Header Drawer */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg text-white shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1">
                Memento<span className="text-indigo-400">RH</span>
              </h3>
              <p className="text-xs text-slate-400">
                Boîte à outils RH
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps du Drawer */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 text-slate-800 dark:text-slate-100">
          {/* Role Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700/50">
            <button
              onClick={() => setRole("gestionnaire")}
              className={`flex-1 flex justify-center items-center gap-2 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                role === "gestionnaire"
                  ? "bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <UserCog className="w-4 h-4" />
              Gestionnaire RH
            </button>
            <button
              onClick={() => setRole("agent")}
              className={`flex-1 flex justify-center items-center gap-2 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                role === "agent"
                  ? "bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              Agent
            </button>
          </div>

          <div className="space-y-4">
            {/* Gestion des postes (Gestionnaire only) */}
            {role === "gestionnaire" && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4 text-indigo-500" />
                  Gestion des postes
                </h4>
                <div className="flex flex-col gap-1.5">
                  <DrawerLink href="https://mementorh.fr/fiche-de-poste">Kit création de poste</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/fiche-de-poste/creer-fiche">Fiche de poste</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/fiche-de-poste/creer-entretien">Fiche d'entretien professionnel</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/deliberation-tableau-effectifs">Tableau des effectifs</DrawerLink>
                </div>
              </div>
            )}

            {/* Rémunération et budget */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Rémunération et budget
              </h4>
              <div className="flex flex-col gap-1.5">
                <DrawerLink href="https://mementorh.fr/remuneration/grille-indiciaire">Grilles indiciaires</DrawerLink>
                {role === "gestionnaire" && (
                  <>
                    <DrawerLink href="https://mementorh.fr/remuneration/budget-personnel">Simulateur de masse salariale</DrawerLink>
                    <DrawerLink href="https://mementorh.fr/remuneration/simulateur-sft">Simulateur SFT</DrawerLink>
                  </>
                )}
                <DrawerLink href="https://mementorh.fr/remuneration/traitement-net">Simulateur de net à payer</DrawerLink>
                <DrawerLink href="https://mementorh.fr/remuneration/ihts">Calcul d'heures supplémentaires</DrawerLink>
                {role === "gestionnaire" && <DrawerLink href="https://mementorh.fr/remuneration/psc">Simulateur PSC</DrawerLink>}
                <DrawerLink href="https://mementorh.fr/carriere/rupture-conventionnelle">Indemnité de rupture conventionnelle</DrawerLink>
                <DrawerLink href="https://mementorh.fr/remuneration/frais-deplacement">Frais de déplacement</DrawerLink>
              </div>
            </div>

            {/* Carrière & temps de travail */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-500" />
                Carrière & temps de travail
              </h4>
              <div className="flex flex-col gap-1.5">
                <DrawerLink href="https://mementorh.fr/carriere/avancement-echelon">Avancement d'échelon</DrawerLink>
                {role === "gestionnaire" && (
                  <>
                    <DrawerLink href="https://mementorh.fr/carriere/reprise-anciennete">Reprise d'ancienneté</DrawerLink>
                    <DrawerLink href="https://mementorh.fr/carriere/seuils-syndicaux">Seuils & obligations syndicales</DrawerLink>
                  </>
                )}
                <DrawerLink href="https://mementorh.fr/temps-de-travail/calculateur">Calculateur RTT & temps de travail</DrawerLink>
                {role === "gestionnaire" && <DrawerLink href="https://mementorh.fr/temps-de-travail/calculateur-etp">Calculateur ETP</DrawerLink>}
                <DrawerLink href="https://mementorh.fr/remuneration/conges-maladie">Droits à congés maladie</DrawerLink>
              </div>
            </div>

            {/* Délibérations (Gestionnaire only) */}
            {role === "gestionnaire" && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Délibérations
                </h4>
                <div className="flex flex-col gap-1.5">
                  <DrawerLink href="https://mementorh.fr/fiche-de-poste/creer-deliberation">Création de poste</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/deliberation-suppression">Suppression de poste</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/deliberation-tableau-effectifs">Tableau des effectifs</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/temps-de-travail/deliberation-teletravail">Télétravail</DrawerLink>
                </div>
              </div>
            )}

            {/* Arrêtés RH (Gestionnaire only) */}
            {role === "gestionnaire" && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Arrêtés RH
                </h4>
                <div className="flex flex-col gap-1.5">
                  <DrawerLink href="https://mementorh.fr/arretes/nomination-stagiaire">Nomination stagiaire</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/arretes/titularisation">Titularisation</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/arretes/avancement-echelon">Avancement d'échelon</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/arretes/avancement-grade">Avancement de grade</DrawerLink>
                  <DrawerLink href="https://mementorh.fr/arretes/promotion-interne">Promotion interne</DrawerLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DrawerLink: React.FC<{href: string; children: React.ReactNode}> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className="flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
  >
    {children}
    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
  </a>
);
