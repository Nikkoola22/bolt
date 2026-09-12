import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export const DisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 p-5 rounded-2xl shadow-2xs text-slate-800 dark:text-slate-200 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-amber-100/90 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded-xl mt-0.5 shrink-0 border border-amber-200/80 dark:border-amber-700/60 shadow-2xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-amber-950 dark:text-amber-200 text-sm tracking-wider uppercase">
                Simulation informative & statutaire
              </span>
              <span className="text-xs bg-amber-200/70 dark:bg-amber-900/70 text-amber-900 dark:text-amber-200 font-bold px-2.5 py-0.5 rounded-full border border-amber-300/60 dark:border-amber-700/60">
                Paramètres déclarés par l agent
              </span>
              <span className="text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 font-bold px-2.5 py-0.5 rounded-full border border-blue-200/70 dark:border-blue-800/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Contrôle final par la DRH
              </span>
            </div>
            <p className="text-sm text-amber-950/90 dark:text-amber-100/90 mt-2 leading-relaxed">
              Cet outil pédagogique calcule vos échéances théoriques selon les décrets statutaires en vigueur (Code Général de la Fonction Publique). 
              <strong> Cette simulation ne crée aucun droit :</strong> l inscription sur un tableau d avancement ou une liste d aptitude relève du pouvoir d appréciation de l autorité territoriale dans le cadre des Lignes Directrices de Gestion (LDG).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="text-sm font-bold text-amber-950 dark:text-amber-200 hover:text-amber-800 dark:hover:text-amber-100 bg-white dark:bg-slate-800 hover:bg-amber-100/80 dark:hover:bg-slate-700 border border-amber-300 dark:border-amber-700 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-2xs self-end sm:self-auto"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <span>Moins de détails</span> <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Comprendre les règles statutaires</span> <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-amber-800/60 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
          <div className="bg-white/90 dark:bg-slate-850 p-4 rounded-xl border border-amber-200/80 dark:border-amber-800/60 shadow-2xs space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Avancement d Échelon
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>De plein droit à cadence unique :</strong> Depuis les réformes PPCR, l échelon s acquiert automatiquement dès que la durée réglementaire est accomplie (sauf suspension légale en cas de disponibilité sans activité).
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-850 p-4 rounded-xl border border-amber-200/80 dark:border-amber-800/60 shadow-2xs space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Avancement de Grade
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>Au choix ou examen pro :</strong> Remplir les conditions d ancienneté vous rend <em>promouvable</em>, mais la promotion dépend du <em>ratio promus/promouvables</em> voté par votre collectivité et de l inscription au tableau annuel.
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-850 p-4 rounded-xl border border-amber-200/80 dark:border-amber-800/60 shadow-2xs space-y-1">
            <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Promotion Interne (C &rarr; B &rarr; A)
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>Changement de cadre d emplois :</strong> Soumis à des quotas départementaux ou régionaux très encadrés (listes d aptitude du CDG). Les conditions d ancienneté de services publics sont indispensables.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

