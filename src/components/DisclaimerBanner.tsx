import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export const DisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50/70 border border-amber-200/90 p-5 rounded-2xl shadow-2xs text-slate-800 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-amber-100/90 text-amber-800 rounded-xl mt-0.5 shrink-0 border border-amber-200/80 shadow-2xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-amber-950 text-sm tracking-wider uppercase">
                Simulation informative & statutaire
              </span>
              <span className="text-xs bg-amber-200/70 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-300/60">
                Paramètres déclarés par l agent
              </span>
              <span className="text-xs bg-blue-50 text-blue-900 font-bold px-2.5 py-0.5 rounded-full border border-blue-200/70 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Contrôle final par la DRH
              </span>
            </div>
            <p className="text-sm text-amber-950/90 mt-2 leading-relaxed">
              Cet outil pédagogique calcule vos échéances théoriques selon les décrets statutaires en vigueur (Code Général de la Fonction Publique). 
              <strong> Cette simulation ne crée aucun droit :</strong> l inscription sur un tableau d avancement ou une liste d aptitude relève du pouvoir d appréciation de l autorité territoriale dans le cadre des Lignes Directrices de Gestion (LDG).
            </p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-bold text-amber-950 hover:text-amber-800 bg-white hover:bg-amber-100/80 border border-amber-300 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-2xs self-end sm:self-auto"
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
        <div className="mt-4 pt-4 border-t border-amber-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700 animate-fadeIn">
          <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
            <div className="font-extrabold text-slate-900 flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Avancement d Échelon
            </div>
            <p className="leading-relaxed text-slate-600">
              <strong>De plein droit à cadence unique :</strong> Depuis les réformes PPCR, l échelon s acquiert automatiquement dès que la durée réglementaire est accomplie (sauf suspension légale en cas de disponibilité sans activité).
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
            <div className="font-extrabold text-slate-900 flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Avancement de Grade
            </div>
            <p className="leading-relaxed text-slate-600">
              <strong>Au choix ou examen pro :</strong> Remplir les conditions d ancienneté vous rend <em>promouvable</em>, mais la promotion dépend du <em>ratio promus/promouvables</em> voté par votre collectivité et de l inscription au tableau annuel.
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
            <div className="font-extrabold text-slate-900 flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Promotion Interne (C &rarr; B &rarr; A)
            </div>
            <p className="leading-relaxed text-slate-600">
              <strong>Changement de cadre d emplois :</strong> Soumis à des quotas départementaux ou régionaux très encadrés (listes d aptitude du CDG). Les conditions d ancienneté de services publics sont indispensables.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

