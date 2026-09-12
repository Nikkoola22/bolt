import React, { useState } from "react";
import type { JalonTimeline } from "../types/career";
import { formatDateFrench } from "../services/simulationEngine";
import { 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  HelpCircle,
  AlertTriangle,
  Award
} from "lucide-react";

interface TimelineInteractiveProps {
  jalons: JalonTimeline[];
  selectedJalonId: string | null;
  onSelectJalon: (jalon: JalonTimeline) => void;
  onOpenAddEvent?: () => void;
}

type FilterType = "all" | "echelon" | "grade" | "interne" | "evenement";

export const TimelineInteractive: React.FC<TimelineInteractiveProps> = ({
  jalons,
  selectedJalonId,
  onSelectJalon,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredJalons = jalons.filter((j) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "echelon") return j.typeJalon === "avancement_echelon" || j.typeJalon === "situation_actuelle";
    if (activeFilter === "grade") return j.typeJalon === "promouvabilite_grade";
    if (activeFilter === "interne") return j.typeJalon === "promouvabilite_interne";
    if (activeFilter === "evenement") return j.typeJalon === "evenement_vie" || j.typeJalon === "fin_evenement";
    return true;
  });

  const countEchelon = jalons.filter((j) => j.typeJalon === "avancement_echelon" || j.typeJalon === "situation_actuelle").length;
  const countGrade = jalons.filter((j) => j.typeJalon === "promouvabilite_grade").length;
  const countInterne = jalons.filter((j) => j.typeJalon === "promouvabilite_interne").length;
  const countEvents = jalons.filter((j) => j.typeJalon === "evenement_vie" || j.typeJalon === "fin_evenement").length;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 sm:p-7 space-y-6">
      {/* Barre d en-tête de la frise */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-200/60 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Ma carrière
                </h3>
                <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold border border-slate-200/60">
                  {filteredJalons.length} jalon{filteredJalons.length > 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Cliquez sur un jalon pour afficher l explication pédagogique détaillée, les conditions et justificatifs requis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres de catégorie de jalons */}
      <div className="flex items-center gap-1.5 py-1 overflow-x-auto no-scrollbar border-b border-slate-100 text-xs pb-3">
        <span className="text-slate-500 font-bold mr-1 flex items-center gap-1 shrink-0 text-[11px] uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5" /> Filtrer :
        </span>
        
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 shadow-2xs ${
            activeFilter === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          Tous ({jalons.length})
        </button>

        <button
          onClick={() => setActiveFilter("echelon")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
            activeFilter === "echelon"
              ? "bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-500/20"
              : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeFilter === "echelon" ? "bg-white" : "bg-emerald-500"}`}></span>
          <span>Échelons / Paliers ({countEchelon})</span>
        </button>

        {countGrade > 0 && (
          <button
            onClick={() => setActiveFilter("grade")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
              activeFilter === "grade"
                ? "bg-purple-600 text-white shadow-xs ring-1 ring-purple-500/20"
                : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === "grade" ? "bg-white" : "bg-purple-500"}`}></span>
            <span>Avancement de Grade ({countGrade})</span>
          </button>
        )}

        {countInterne > 0 && (
          <button
            onClick={() => setActiveFilter("interne")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
              activeFilter === "interne"
                ? "bg-amber-600 text-white shadow-xs ring-1 ring-amber-500/20"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === "interne" ? "bg-white" : "bg-amber-500"}`}></span>
            <span>
              {jalons.some(j => j.titre.includes("Concours")) ? "Concours / Titularisation" : "Promotion Interne"} ({countInterne})
            </span>
          </button>
        )}

        {countEvents > 0 && (
          <button
            onClick={() => setActiveFilter("evenement")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
              activeFilter === "evenement"
                ? "bg-blue-600 text-white shadow-xs ring-1 ring-blue-500/20"
                : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === "evenement" ? "bg-white" : "bg-blue-500"}`}></span>
            <span>Événements simulés ({countEvents})</span>
          </button>
        )}
      </div>

      {/* Trace chronologique verticale / responsive */}
      <div className="mt-6 relative pl-7 sm:pl-9 before:absolute before:left-3.5 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-orange-600 before:via-amber-400 before:to-slate-200">
        <div className="space-y-5">
          {filteredJalons.map((jalon) => {
            const isSelected = selectedJalonId === jalon.id;

            // Styles et fonds selon le type de jalon
            let dotNode = (
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400 ring-4 ring-slate-200"></div>
            );
            let badgeBg = "bg-slate-100 text-slate-700 border-slate-200";
            let typeLabel = "Jalon";
            let cardBg = "bg-gradient-to-br from-slate-50/80 via-white to-slate-100/50 border-slate-200/90 hover:border-slate-400 hover:shadow-md";
            let selectedBorder = "border-orange-600 ring-4 ring-orange-500/25 shadow-md";
            let titleHover = "group-hover:text-orange-700";

            if (jalon.typeJalon === "situation_actuelle") {
              dotNode = (
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 ring-4 ring-orange-200 border-2 border-white"></span>
                </div>
              );
              badgeBg = "bg-orange-100 text-orange-950 font-extrabold border-orange-300";
              typeLabel = "Aujourd hui (Situation déclarée)";
              cardBg = "bg-gradient-to-br from-orange-50/90 via-white to-amber-50/40 border-orange-300 hover:border-orange-500 hover:shadow-orange-500/10";
              selectedBorder = "border-orange-600 ring-4 ring-orange-500/25 shadow-md";
              titleHover = "group-hover:text-orange-800";
            } else if (jalon.typeJalon === "avancement_echelon") {
              const isContractuelEch = jalon.statutValidation === "simule";
              dotNode = (
                <div className={`w-4 h-4 rounded-full ${isContractuelEch ? "bg-amber-500 ring-amber-200" : "bg-emerald-500 ring-emerald-200"} ring-4 border-2 border-white shadow-2xs`}></div>
              );
              if (isContractuelEch) {
                badgeBg = "bg-amber-100 text-amber-900 font-extrabold border-amber-300";
                typeLabel = "Réévaluation indicative (Contractuel)";
                cardBg = "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 border-amber-200/90 hover:border-amber-400 hover:shadow-amber-500/10";
                selectedBorder = "border-amber-600 ring-4 ring-amber-500/25 shadow-md";
                titleHover = "group-hover:text-amber-800";
              } else {
                badgeBg = "bg-emerald-100 text-emerald-900 font-extrabold border-emerald-300";
                typeLabel = "Avancement d échelon (Cadence unique PPCR)";
                cardBg = "bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 border-emerald-200/90 hover:border-emerald-400 hover:shadow-emerald-500/10";
                selectedBorder = "border-emerald-600 ring-4 ring-emerald-500/25 shadow-md";
                titleHover = "group-hover:text-emerald-800";
              }
            } else if (jalon.typeJalon === "promouvabilite_grade") {
              const isReservedTitulaire = jalon.statutValidation === "bloque" && jalon.conditionsManquantes.some(c => c.valeurRequise.toLowerCase().includes("titulaire"));
              dotNode = (
                <div className={`w-4 h-4 rounded-full ${isReservedTitulaire ? "bg-rose-500 ring-rose-200" : "bg-purple-600 ring-purple-200"} ring-4 border-2 border-white shadow-2xs`}></div>
              );
              if (isReservedTitulaire) {
                badgeBg = "bg-rose-100 text-rose-900 font-extrabold border-rose-300";
                typeLabel = "Avancement de Grade (Réservé Titulaires)";
                cardBg = "bg-gradient-to-br from-rose-50/80 via-white to-red-50/40 border-rose-200/90 hover:border-rose-400 hover:shadow-rose-500/10";
                selectedBorder = "border-rose-600 ring-4 ring-rose-500/25 shadow-md";
                titleHover = "group-hover:text-rose-800";
              } else {
                badgeBg = "bg-purple-100 text-purple-900 font-extrabold border-purple-300";
                typeLabel = "Perspective d Avancement de Grade";
                cardBg = "bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 border-purple-200/90 hover:border-purple-400 hover:shadow-purple-500/10";
                selectedBorder = "border-purple-600 ring-4 ring-purple-500/25 shadow-md";
                titleHover = "group-hover:text-purple-800";
              }
            } else if (jalon.typeJalon === "promouvabilite_interne") {
              dotNode = (
                <div className="w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-200 border-2 border-white shadow-2xs"></div>
              );
              if (jalon.titre.includes("Concours")) {
                badgeBg = "bg-emerald-100 text-emerald-900 font-extrabold border-emerald-300";
                typeLabel = "Concours Interne & Titularisation";
                cardBg = "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 border-emerald-300/90 hover:border-emerald-500 hover:shadow-emerald-500/15 ring-1 ring-emerald-500/20";
                selectedBorder = "border-emerald-600 ring-4 ring-emerald-500/25 shadow-md";
                titleHover = "group-hover:text-emerald-800";
              } else if (jalon.titre.includes("Titularisation directe")) {
                badgeBg = "bg-sky-100 text-sky-900 font-extrabold border-sky-300";
                typeLabel = "Titularisation directe sans concours";
                cardBg = "bg-gradient-to-br from-sky-50/80 via-white to-blue-50/40 border-sky-200/90 hover:border-sky-400 hover:shadow-sky-500/10";
                selectedBorder = "border-sky-600 ring-4 ring-sky-500/25 shadow-md";
                titleHover = "group-hover:text-sky-800";
              } else {
                badgeBg = "bg-amber-100 text-amber-900 font-extrabold border-amber-300";
                typeLabel = "Perspective de Promotion Interne";
                cardBg = "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 border-amber-200/90 hover:border-amber-400 hover:shadow-amber-500/10";
                selectedBorder = "border-amber-600 ring-4 ring-amber-500/25 shadow-md";
                titleHover = "group-hover:text-amber-800";
              }
            } else if (jalon.typeJalon === "evenement_vie") {
              dotNode = (
                <div className="w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-200 border-2 border-white shadow-2xs"></div>
              );
              badgeBg = "bg-indigo-100 text-indigo-900 font-extrabold border-indigo-300";
              typeLabel = "Événement simulé";
              cardBg = "bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/40 border-indigo-200/90 hover:border-indigo-400 hover:shadow-indigo-500/10";
              selectedBorder = "border-indigo-600 ring-4 ring-indigo-500/25 shadow-md";
              titleHover = "group-hover:text-indigo-800";
            } else if (jalon.typeJalon === "fin_evenement") {
              dotNode = (
                <div className="w-3.5 h-3.5 rounded-full bg-slate-500 ring-4 ring-slate-200 border-2 border-white shadow-2xs"></div>
              );
              badgeBg = "bg-slate-100 text-slate-700 border-slate-300";
              typeLabel = "Reprise / Fin de période";
              cardBg = "bg-gradient-to-br from-slate-100/80 via-white to-slate-50 border-slate-200 hover:border-slate-400 hover:shadow-slate-500/10";
              selectedBorder = "border-slate-500 ring-4 ring-slate-400/25 shadow-md";
              titleHover = "group-hover:text-slate-800";
            }

            return (
              <div key={jalon.id} className="relative group">
                {/* Pastille sur la ligne avec positionnement parfait */}
                <div className="absolute -left-7 sm:-left-9 top-4 transition-transform group-hover:scale-125 z-10">
                  {dotNode}
                </div>

                {/* Carte de jalon interactive avec fond différencié selon la nature */}
                <div
                  onClick={() => onSelectJalon(jalon)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs ${cardBg} ${
                    isSelected ? selectedBorder : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                        {typeLabel}
                      </span>
                      <span className="animate-blink-date text-xs font-black text-orange-950 bg-orange-50 border border-orange-200/90 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs transition-all">
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                        </span>
                        <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span className="tracking-tight">{formatDateFrench(jalon.date)}</span>
                      </span>
                    </div>

                    {/* Statut de garantie ou conditions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {jalon.statutValidation === "garanti" && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> De plein droit
                        </span>
                      )}
                      {jalon.statutValidation === "conditionnel" && (
                        <span className="text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <AlertCircle className="w-3.5 h-3.5 text-purple-600" /> 
                          {jalon.titre.includes("Concours") ? "Sur concours" : jalon.titre.includes("Titularisation directe") ? "Décision Maire" : "Soumis aux LDG"}
                        </span>
                      )}
                      {jalon.statutValidation === "bloque" && (
                        <span className="text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> 
                          {jalon.conditionsManquantes.some(c => c.valeurRequise.toLowerCase().includes("titulaire")) ? "Réservé titulaires" : "Examen requis"}
                        </span>
                      )}
                      {jalon.statutValidation === "simule" && jalon.typeJalon === "avancement_echelon" && (
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-amber-600" /> Avenant requis
                        </span>
                      )}
                      {jalon.gainIndiciaire && jalon.gainIndiciaire > 0 ? (
                        <span className="text-[11px] font-black text-indigo-900 bg-indigo-50 border border-indigo-200/90 px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                          <Award className="w-3 h-3 text-indigo-600" />
                          +{jalon.gainIndiciaire} pts (~+{Math.round(jalon.gainFinancierBrutMensuel || 0)} €/mois)
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <h4 className={`text-base font-extrabold text-slate-900 ${titleHover} transition-colors`}>
                      {jalon.titre}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {jalon.sousTitre}
                    </p>
                  </div>

                  {/* Résumé de l explication */}
                  <p className="text-xs text-slate-700 mt-3 line-clamp-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                    {jalon.pourquoi}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between text-xs text-orange-600 font-bold">
                    <span className="flex items-center gap-1.5 hover:underline">
                      <HelpCircle className="w-4 h-4 text-orange-500" />
                      Consulter les conditions et justificatifs nécessaires
                    </span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-orange-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

