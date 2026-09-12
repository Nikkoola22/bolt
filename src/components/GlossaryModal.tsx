import React, { useState } from "react";
import { X, BookOpen, Search, ShieldCheck } from "lucide-react";

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOSSARY_TERMS = [
  {
    terme: "Lignes Directrices de Gestion (LDG)",
    definition: "Document cadre adopté par chaque employeur public après avis du Comité Social Territorial (CST). Il définit la stratégie pluriannuelle de gestion des ressources humaines et fixe les critères d avancement de grade et de promotion interne (valeur professionnelle, parcours, responsabilités, formations suivies)."
  },
  {
    terme: "Ratio Promus / Promouvables",
    definition: "Taux fixé par délibération de la collectivité (après avis du CST) qui détermine le pourcentage d agents promouvables qui pourront être effectivement promus au grade supérieur dans l année. Par exemple, si le ratio est de 50% et que 10 agents remplissent les conditions, au maximum 5 arrêtés de promotion pourront être signés."
  },
  {
    terme: "Indice Brut (IB) vs Indice Majoré (IM)",
    definition: "L Indice Brut (ex: IB 461) correspond au positionnement hiérarchique et statutaire dans la grille de la fonction publique. L Indice Majoré (ex: IM 421) est le multiplicateur officiel utilisé pour calculer le traitement indiciaire brut de base mensuel : IM × 4,92278 € / mois (soit IM × 59,0734 € par an)."
  },
  {
    terme: "Avancement d Échelon (Cadence Unique)",
    definition: "Progression automatique au sein du même grade. Depuis les accords PPCR (Parcours Professionnels, Carrières et Rémunérations), l avancement d échelon s effectue à une durée unique réglementaire de plein droit sans choix d accélération ou de ralentissement hiérarchique."
  },
  {
    terme: "Avancement de Grade",
    definition: "Passage à un grade supérieur au sein du même cadre d emplois (ex: de Rédacteur à Rédacteur Principal 2e classe). Il peut avoir lieu au choix (sur tableau d avancement) ou par la voie d un examen professionnel, sous réserve de remplir les conditions d échelon et d ancienneté et d être retenu par l autorité."
  },
  {
    terme: "Promotion Interne",
    definition: "Changement de catégorie hiérarchique sans concours externe (ex: d Adjoint C à Rédacteur B, ou de Rédacteur B à Attaché A). Elle s effectue sur liste d aptitude arrêtée par le Président du Centre de Gestion (CDG) ou le Maire/Président pour les collectivités non affiliées, dans la limite de quotas réglementaires stricts."
  },
  {
    terme: "Temps Partiel & Droits à Carrière (Art. L612-4 CGFP)",
    definition: "Règle fondamentale méconnue : pour la détermination des droits à l avancement d échelon et de grade, les périodes accomplies à temps partiel sont assimilées à du temps plein à 100% ! Seule la rémunération mensuelle et les droits à pension de retraite sont proratisés."
  },
  {
    terme: "Maintien des droits en Disponibilité (Décret 2019-234)",
    definition: "Depuis la réforme de 2019, l agent en disponibilité pour convenance personnelle conserve ses droits à l avancement d échelon et de grade dans la limite de 5 ans sur l ensemble de sa carrière s il justifie d une activité professionnelle effective (minimum 600h par an salarié ou chiffre d affaires indépendant). Justificatifs obligatoires avant le 31 décembre à la DRH."
  },
  {
    terme: "Reclassement Indiciaire à indice égal ou immédiatement supérieur",
    definition: "Lors d une promotion de grade ou d une intégration, l agent est reclassé à l échelon comportant un Indice Majoré égal ou, à défaut, immédiatement supérieur à celui qu il détenait dans son grade d origine, évitant ainsi toute baisse indiciaire."
  }
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.terme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 p-5 text-white flex items-center justify-between border-b border-transparent dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Lexique & Repères Statutaires
              </h3>
              <p className="text-xs text-slate-400">
                Décryptage des termes clés de la Fonction Publique (CGFP)
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

        {/* Barre de recherche */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Rechercher un terme (ex: LDG, quota, dispo, temps partiel, PPCR)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Liste des définitions */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-slate-800 dark:text-slate-200">
          {filtered.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-6">
              Aucun terme trouvé pour « {searchTerm} ».
            </p>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 p-4 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-colors"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {item.terme}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Conforme au Code Général de la Fonction Publique
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Fermer le lexique
          </button>
        </div>

      </div>
    </div>
  );
};
