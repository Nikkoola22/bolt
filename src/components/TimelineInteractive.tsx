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
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-6">
      {/* Barre d en-tête de la frise */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/50 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Ma carrière
                </h3>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full font-bold border border-slate-200/60 dark:border-slate-700">
                  {filteredJalons.length} jalon{filteredJalons.length > 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Cliquez sur un jalon pour afficher l explication pédagogique détaillée, les conditions et justificatifs requis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres de catégorie de jalons (flex-wrap pour être 100% visible sans slider sur iPhone) */}
      <div className="flex items-center gap-1.5 py-1 flex-wrap border-b border-slate-100 dark:border-slate-800 text-xs pb-3">
        <span className="text-slate-500 dark:text-slate-400 font-bold mr-1 flex items-center gap-1 shrink-0 text-[11px] uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5" /> Filtrer :
        </span>
        
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 shadow-2xs ${
            activeFilter === "all"
              ? "bg-slate-900 dark:bg-orange-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          }`}
        >
          Tous ({jalons.length})
        </button>

        <button
          onClick={() => setActiveFilter("echelon")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
            activeFilter === "echelon"
              ? "bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-500/20"
              : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-800/60"
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
                : "bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200/60 dark:border-purple-800/60"
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
                : "bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/60 dark:border-amber-800/60"
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
                : "bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-800/60"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeFilter === "evenement" ? "bg-white" : "bg-blue-500"}`}></span>
            <span>Événements simulés ({countEvents})</span>
          </button>
        )}
      </div>

      {/* Trace chronologique verticale / responsive */}
      <div className="mt-6 relative pl-7 sm:pl-9 before:absolute before:left-3.5 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-orange-600 before:via-amber-400 before:to-slate-200 dark:before:to-slate-800">
        <div className="space-y-5">
          {filteredJalons.map((jalon) => {
            const isSelected = selectedJalonId === jalon.id;

            // Styles et fonds selon le type de jalon
            let dotNode = (
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400 dark:bg-slate-500 ring-4 ring-slate-200 dark:ring-slate-800"></div>
            );
            let badgeBg = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
            let typeLabel = "Jalon";
            let cardBg = "bg-gradient-to-br from-slate-50/80 via-white to-slate-100/50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-slate-200/90 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-md";
            let selectedBorder = "border-orange-600 ring-4 ring-orange-500/25 shadow-md";
            let titleHover = "group-hover:text-orange-700 dark:group-hover:text-orange-400";

            if (jalon.typeJalon === "situation_actuelle") {
              dotNode = (
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 ring-4 ring-orange-200 dark:ring-orange-950/80 border-2 border-white dark:border-slate-900"></span>
                </div>
              );
              badgeBg = "bg-orange-100 dark:bg-orange-950/80 text-orange-950 dark:text-orange-200 font-extrabold border-orange-300 dark:border-orange-800";
              typeLabel = "Aujourd hui (Situation déclarée)";
              cardBg = "bg-gradient-to-br from-orange-50/90 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/30 border-orange-300 dark:border-orange-800 hover:border-orange-500 dark:hover:border-orange-600 hover:shadow-orange-500/10";
              selectedBorder = "border-orange-600 ring-4 ring-orange-500/25 shadow-md";
              titleHover = "group-hover:text-orange-800 dark:group-hover:text-orange-300";
            } else if (jalon.typeJalon === "avancement_echelon") {
              const isContractuelEch = jalon.statutValidation === "simule";
              dotNode = (
                <div className={`w-4 h-4 rounded-full ${isContractuelEch ? "bg-amber-500 ring-amber-200 dark:ring-amber-950/80" : "bg-emerald-500 ring-emerald-200 dark:ring-emerald-950/80"} ring-4 border-2 border-white dark:border-slate-900 shadow-2xs`}></div>
              );
              if (isContractuelEch) {
                badgeBg = "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-extrabold border-amber-300 dark:border-amber-800";
                typeLabel = "Réévaluation indicative (Contractuel)";
                cardBg = "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30 border-amber-200/90 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/10";
                selectedBorder = "border-amber-600 ring-4 ring-amber-500/25 shadow-md";
                titleHover = "group-hover:text-amber-800 dark:group-hover:text-amber-300";
              } else {
                badgeBg = "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-extrabold border-emerald-300 dark:border-emerald-800";
                typeLabel = "Avancement d échelon (Cadence unique PPCR)";
                cardBg = "bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-emerald-200/90 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/10";
                selectedBorder = "border-emerald-600 ring-4 ring-emerald-500/25 shadow-md";
                titleHover = "group-hover:text-emerald-800 dark:group-hover:text-emerald-300";
              }
            } else if (jalon.typeJalon === "promouvabilite_grade") {
              const isReservedTitulaire = jalon.statutValidation === "bloque" && jalon.conditionsManquantes.some(c => c.valeurRequise.toLowerCase().includes("titulaire"));
              dotNode = (
                <div className={`w-4 h-4 rounded-full ${isReservedTitulaire ? "bg-rose-500 ring-rose-200 dark:ring-rose-950/80" : "bg-purple-600 ring-purple-200 dark:ring-purple-950/80"} ring-4 border-2 border-white dark:border-slate-900 shadow-2xs`}></div>
              );
              if (isReservedTitulaire) {
                badgeBg = "bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 font-extrabold border-rose-300 dark:border-rose-800";
                typeLabel = "Avancement de Grade (Réservé Titulaires)";
                cardBg = "bg-gradient-to-br from-rose-50/80 via-white to-red-50/40 dark:from-rose-950/40 dark:via-slate-900 dark:to-red-950/30 border-rose-200/90 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-rose-500/10";
                selectedBorder = "border-rose-600 ring-4 ring-rose-500/25 shadow-md";
                titleHover = "group-hover:text-rose-800 dark:group-hover:text-rose-300";
              } else {
                badgeBg = "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 font-extrabold border-purple-300 dark:border-purple-800";
                typeLabel = "Perspective d Avancement de Grade";
                cardBg = "bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30 border-purple-200/90 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/10";
                selectedBorder = "border-purple-600 ring-4 ring-purple-500/25 shadow-md";
                titleHover = "group-hover:text-purple-800 dark:group-hover:text-purple-300";
              }
            } else if (jalon.typeJalon === "promouvabilite_interne") {
              dotNode = (
                <div className="w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-200 dark:ring-emerald-950/80 border-2 border-white dark:border-slate-900 shadow-2xs"></div>
              );
              if (jalon.titre.includes("Concours")) {
                badgeBg = "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-extrabold border-emerald-300 dark:border-emerald-800";
                typeLabel = "Concours Interne & Titularisation";
                cardBg = "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-emerald-300/90 dark:border-emerald-800 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-emerald-500/15 ring-1 ring-emerald-500/20";
                selectedBorder = "border-emerald-600 ring-4 ring-emerald-500/25 shadow-md";
                titleHover = "group-hover:text-emerald-800 dark:group-hover:text-emerald-300";
              } else if (jalon.titre.includes("Titularisation directe")) {
                badgeBg = "bg-sky-100 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 font-extrabold border-sky-300 dark:border-sky-800";
                typeLabel = "Titularisation directe sans concours";
                cardBg = "bg-gradient-to-br from-sky-50/80 via-white to-blue-50/40 dark:from-sky-950/40 dark:via-slate-900 dark:to-blue-950/30 border-sky-200/90 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-sky-500/10";
                selectedBorder = "border-sky-600 ring-4 ring-sky-500/25 shadow-md";
                titleHover = "group-hover:text-sky-800 dark:group-hover:text-sky-300";
              } else {
                badgeBg = "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-extrabold border-amber-300 dark:border-amber-800";
                typeLabel = "Perspective de Promotion Interne";
                cardBg = "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30 border-amber-200/90 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/10";
                selectedBorder = "border-amber-600 ring-4 ring-amber-500/25 shadow-md";
                titleHover = "group-hover:text-amber-800 dark:group-hover:text-amber-300";
              }
            } else if (jalon.typeJalon === "evenement_vie") {
              dotNode = (
                <div className="w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-200 dark:ring-indigo-950/80 border-2 border-white dark:border-slate-900 shadow-2xs"></div>
              );
              badgeBg = "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 font-extrabold border-indigo-300 dark:border-indigo-800";
              typeLabel = "Événement simulé";
              cardBg = "bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/40 dark:from-indigo-950/40 dark:via-slate-900 dark:to-blue-950/30 border-indigo-200/90 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/10";
              selectedBorder = "border-indigo-600 ring-4 ring-indigo-500/25 shadow-md";
              titleHover = "group-hover:text-indigo-800 dark:group-hover:text-indigo-300";
            } else if (jalon.typeJalon === "fin_evenement") {
              dotNode = (
                <div className="w-3.5 h-3.5 rounded-full bg-slate-500 ring-4 ring-slate-200 dark:ring-slate-800 border-2 border-white dark:border-slate-900 shadow-2xs"></div>
              );
              badgeBg = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700";
              typeLabel = "Reprise / Fin de période";
              cardBg = "bg-gradient-to-br from-slate-100/80 via-white to-slate-50 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-slate-500/10";
              selectedBorder = "border-slate-500 ring-4 ring-slate-400/25 shadow-md";
              titleHover = "group-hover:text-slate-800 dark:group-hover:text-slate-200";
            }

            // Style de la pastille date selon le type de jalon (agrandi et visibilisé)
            const isExamenPro = jalon.id.includes("examen_professionnel") || jalon.titre.toLowerCase().includes("examen pro") || jalon.conditionsManquantes.some(c => c.libelle.toLowerCase().includes("examen"));

            let dateBadgeContent: React.ReactNode;
            if (jalon.typeJalon === "avancement_echelon") {
              dateBadgeContent = (
                <span className="animate-blink-date text-xs sm:text-sm font-black text-emerald-950 dark:text-emerald-100 bg-emerald-100/90 dark:bg-emerald-950 border-2 border-emerald-400 dark:border-emerald-600 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs ring-2 ring-emerald-500/20 transition-all">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                  </span>
                  <Calendar className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span className="tracking-tight">Prise d'échelon : {formatDateFrench(jalon.date)}</span>
                </span>
              );
            } else if (isExamenPro) {
              dateBadgeContent = (
                <span className="animate-blink-date text-xs sm:text-sm font-black text-amber-950 dark:text-amber-100 bg-amber-100/90 dark:bg-amber-950 border-2 border-amber-400 dark:border-amber-600 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs ring-2 ring-amber-500/20 transition-all">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
                  </span>
                  <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                  <span className="tracking-tight">Examen pro : {formatDateFrench(jalon.date)}</span>
                </span>
              );
            } else if (jalon.typeJalon === "promouvabilite_grade") {
              dateBadgeContent = (
                <span className="animate-blink-date text-xs sm:text-sm font-black text-purple-950 dark:text-purple-100 bg-purple-100/90 dark:bg-purple-950 border-2 border-purple-400 dark:border-purple-600 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs ring-2 ring-purple-500/20 transition-all">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
                  </span>
                  <Calendar className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0" />
                  <span className="tracking-tight">Éligible au choix : {formatDateFrench(jalon.date)}</span>
                </span>
              );
            } else if (jalon.typeJalon === "promouvabilite_interne") {
              dateBadgeContent = (
                <span className="animate-blink-date text-xs sm:text-sm font-black text-fuchsia-950 dark:text-fuchsia-100 bg-fuchsia-100/90 dark:bg-fuchsia-950 border-2 border-fuchsia-400 dark:border-fuchsia-600 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs ring-2 ring-fuchsia-500/20 transition-all">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-600"></span>
                  </span>
                  <Calendar className="w-4 h-4 text-fuchsia-700 dark:text-fuchsia-400 shrink-0" />
                  <span className="tracking-tight">Éligible choix interne : {formatDateFrench(jalon.date)}</span>
                </span>
              );
            } else if (jalon.typeJalon === "situation_actuelle") {
              dateBadgeContent = (
                <span className="text-xs sm:text-sm font-black text-orange-950 dark:text-orange-100 bg-orange-100/90 dark:bg-orange-950 border-2 border-orange-400 dark:border-orange-600 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs transition-all">
                  <Clock className="w-4 h-4 text-orange-700 dark:text-orange-400 shrink-0" />
                  <span className="tracking-tight">Situation au {formatDateFrench(jalon.date)}</span>
                </span>
              );
            } else {
              dateBadgeContent = (
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs transition-all">
                  <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
                  <span className="tracking-tight">{formatDateFrench(jalon.date)}</span>
                </span>
              );
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
                      {dateBadgeContent}
                    </div>

                    {/* Statut de garantie ou conditions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {jalon.statutValidation === "garanti" && (
                        <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/90 dark:border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> De plein droit
                        </span>
                      )}
                      {jalon.statutValidation === "conditionnel" && (
                        <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 border border-purple-200/90 dark:border-purple-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <AlertCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> 
                          {jalon.titre.includes("Concours") ? "Sur concours" : jalon.titre.includes("Titularisation directe") ? "Décision Maire" : "Soumis aux LDG"}
                        </span>
                      )}
                      {jalon.statutValidation === "bloque" && (
                        <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/80 border border-rose-200/90 dark:border-rose-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> 
                          {jalon.conditionsManquantes.some(c => c.valeurRequise.toLowerCase().includes("titulaire")) ? "Réservé titulaires" : "Examen requis"}
                        </span>
                      )}
                      {jalon.statutValidation === "simule" && jalon.typeJalon === "avancement_echelon" && (
                        <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-200/90 dark:border-amber-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Avenant requis
                        </span>
                      )}
                      {jalon.gainIndiciaire && jalon.gainIndiciaire > 0 ? (
                        <span className="text-[11px] font-black text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/90 dark:border-indigo-800 px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                          <Award className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          +{jalon.gainIndiciaire} pts (~+{Math.round(jalon.gainFinancierBrutMensuel || 0)} €/mois)
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <h4 className={`text-base font-extrabold text-slate-900 dark:text-white ${titleHover} transition-colors`}>
                      {jalon.titre}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {jalon.sousTitre}
                    </p>
                  </div>

                  {/* Résumé de l explication */}
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 line-clamp-2 bg-slate-50/80 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                    {jalon.pourquoi}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between text-xs text-orange-600 dark:text-orange-400 font-bold">
                    <span className="flex items-center gap-1.5 hover:underline">
                      <HelpCircle className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      Consulter les conditions et justificatifs nécessaires
                    </span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-orange-500 dark:text-orange-400" />
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

