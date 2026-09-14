import React from "react";
import type { ProfilAgent, JalonTimeline } from "../types/career";
import { formatDateFrench } from "../services/simulationEngine";
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Sparkles,
  ChevronRight,
  Calendar
} from "lucide-react";

interface PerspectivesChecklistProps {
  profil: ProfilAgent;
  jalons: JalonTimeline[];
  onSelectJalon: (jalon: JalonTimeline) => void;
  onOpenAddEvent: (type: string) => void;
}

export const PerspectivesChecklist: React.FC<PerspectivesChecklistProps> = ({
  profil,
  jalons,
  onSelectJalon,
  onOpenAddEvent,
}) => {
  

  // Filtrer les jalons de promouvabilité de grade et de promotion interne
  const perspectivesJalons = jalons.filter(
    (j) => j.typeJalon === "promouvabilite_grade" || j.typeJalon === "promouvabilite_interne"
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60 shadow-2xs">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Perspectives théoriquement possibles & Conditions à remplir
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Perspectives statutaires calculées pour <strong>{profil.prenom}</strong> (au choix vs examen professionnel vs promotion interne).
            </p>
          </div>
        </div>

        <span className="text-xs bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-bold px-3 py-1 rounded-full border border-purple-200/80 dark:border-purple-800 self-start sm:self-center shadow-2xs">
          {perspectivesJalons.length} perspective{perspectivesJalons.length > 1 ? "s" : ""} identifiée{perspectivesJalons.length > 1 ? "s" : ""}
        </span>
      </div>

      {profil.statut.startsWith("contractuel") && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3.5 shadow-2xs">
          <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div className="space-y-1">
            <div className="font-extrabold text-amber-950 dark:text-amber-200 text-sm">
              Spécificité statutaire pour les agents contractuels (CDD / CDI)
            </div>
            <p className="text-amber-900 dark:text-amber-300 leading-relaxed">
              L avancement de grade statutaire (au choix ou par examen professionnel) est strictement réservé aux <strong>fonctionnaires titulaires</strong> (art. L522-23 du Code Général de la Fonction Publique). 
              Vos perspectives d évolution vers un statut pérenne passent par le <strong>Concours Interne</strong> (ouvert dès 2 à 4 ans de services publics effectifs selon la catégorie) ou par le <strong>recrutement direct sans concours</strong> en catégorie C.
            </p>
          </div>
        </div>
      )}

      {perspectivesJalons.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-600 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          Vous êtes actuellement sur le grade sommital de votre cadre d emplois sans perspective d avancement direct par tableau. Explorez les passerelles de détachement ou de concours interne.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Légende visuelle des différentes natures de perspectives */}
          <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-50/90 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <span className="font-extrabold text-slate-700 dark:text-slate-300 mr-1 text-[11px] uppercase tracking-wider">Fonds par perspective :</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span> Au choix / Ancienneté
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Examen Professionnel
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Promotion Interne
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Concours Interne
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {perspectivesJalons.map((jalon) => {
              const nbRemplies = jalon.conditionsRemplies.length;
              const nbManquantes = jalon.conditionsManquantes.length;
              const totalConditions = nbRemplies + nbManquantes;
              const ratioPourcent = totalConditions > 0 ? Math.round((nbRemplies / totalConditions) * 100) : 0;
              const hasExamBlocker = jalon.statutValidation === "bloque";

              // Différenciation des fonds visuels selon la perspective
              const isConcours = jalon.titre.includes("Concours");
              const isTitularisationDirecte = jalon.titre.includes("Titularisation directe");
              const isExamenPro = jalon.titre.toLowerCase().includes("examen") || jalon.conditionsManquantes.some(c => c.libelle.toLowerCase().includes("examen"));
              const isReservedTitulaire = jalon.statutValidation === "bloque" && jalon.conditionsManquantes.some(c => c.valeurRequise.toLowerCase().includes("titulaire"));
              const isPromotionInterne = jalon.typeJalon === "promouvabilite_interne" && !isConcours && !isTitularisationDirecte;

              let cardTheme = {
                cardBg: "bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30 border-purple-200/90 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/10",
                badgeBg: "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800 font-extrabold",
                badgeLabel: "Avancement de Grade (Au choix)",
                boxBg: "bg-purple-50/50 dark:bg-purple-950/30 border-purple-200/60 dark:border-purple-800/60",
                bulletColor: "bg-purple-500",
                progressBar: "bg-purple-600",
                titleHover: "group-hover:text-purple-700 dark:group-hover:text-purple-400",
              };

              if (isConcours) {
                cardTheme = {
                  cardBg: "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-emerald-300/90 dark:border-emerald-800 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-emerald-500/15 ring-1 ring-emerald-500/20",
                  badgeBg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 font-extrabold",
                  badgeLabel: "Concours Interne & Titularisation",
                  boxBg: "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200/70 dark:border-emerald-800/60",
                  bulletColor: "bg-emerald-500",
                  progressBar: "bg-emerald-600",
                  titleHover: "group-hover:text-emerald-700 dark:group-hover:text-emerald-400",
                };
              } else if (isTitularisationDirecte) {
                cardTheme = {
                  cardBg: "bg-gradient-to-br from-sky-50/90 via-white to-blue-50/50 dark:from-sky-950/40 dark:via-slate-900 dark:to-blue-950/30 border-sky-300/90 dark:border-sky-800 hover:border-sky-500 dark:hover:border-sky-600 hover:shadow-sky-500/15 ring-1 ring-sky-500/20",
                  badgeBg: "bg-sky-100 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-800 font-extrabold",
                  badgeLabel: "Titularisation Directe (C1)",
                  boxBg: "bg-sky-50/60 dark:bg-sky-950/30 border-sky-200/70 dark:border-sky-800/60",
                  bulletColor: "bg-sky-500",
                  progressBar: "bg-sky-600",
                  titleHover: "group-hover:text-sky-700 dark:group-hover:text-sky-400",
                };
              } else if (isReservedTitulaire) {
                cardTheme = {
                  cardBg: "bg-gradient-to-br from-rose-50/90 via-white to-red-50/40 dark:from-rose-950/40 dark:via-slate-900 dark:to-red-950/30 border-rose-300/90 dark:border-rose-800 hover:border-rose-500 dark:hover:border-rose-600 hover:shadow-rose-500/15 ring-1 ring-rose-500/20",
                  badgeBg: "bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800 font-extrabold",
                  badgeLabel: "Réservé aux Fonctionnaires Titulaires",
                  boxBg: "bg-rose-50/60 dark:bg-rose-950/30 border-rose-200/70 dark:border-rose-800/60",
                  bulletColor: "bg-rose-500",
                  progressBar: "bg-rose-500",
                  titleHover: "group-hover:text-rose-700 dark:group-hover:text-rose-400",
                };
              } else if (isExamenPro) {
                cardTheme = {
                  cardBg: "bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/50 dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30 border-blue-300/90 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-blue-500/15 ring-1 ring-blue-500/20",
                  badgeBg: "bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-800 font-extrabold",
                  badgeLabel: "Avancement par Examen Professionnel",
                  boxBg: "bg-blue-50/60 dark:bg-blue-950/30 border-blue-200/70 dark:border-blue-800/60",
                  bulletColor: "bg-blue-500",
                  progressBar: "bg-blue-600",
                  titleHover: "group-hover:text-blue-700 dark:group-hover:text-blue-400",
                };
              } else if (isPromotionInterne) {
                cardTheme = {
                  cardBg: "bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30 border-amber-300/90 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-600 hover:shadow-amber-500/15 ring-1 ring-amber-500/20",
                  badgeBg: "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800 font-extrabold",
                  badgeLabel: "Promotion Interne (Changement de Catégorie)",
                  boxBg: "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200/70 dark:border-amber-800/60",
                  bulletColor: "bg-amber-500",
                  progressBar: "bg-amber-600",
                  titleHover: "group-hover:text-amber-700 dark:group-hover:text-amber-400",
                };
              }

              return (
                <div
                  key={jalon.id}
                  className={`${cardTheme.cardBg} rounded-2xl p-5 sm:p-6 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group`}
                >
                  <div>
                    {/* Badge en-tête */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${cardTheme.badgeBg}`}>
                        {cardTheme.badgeLabel}
                      </span>

                      {(() => {
                        const isExamenPro = jalon.id.includes("examen_professionnel") || jalon.titre.toLowerCase().includes("examen pro") || jalon.conditionsManquantes.some(c => c.libelle.toLowerCase().includes("examen"));
                        if (isExamenPro) {
                          return (
                            <span className="animate-blink-date text-xs sm:text-sm font-black text-ebony bg-apricot border-2 border-apricot-dark px-3.5 py-1 rounded-xl flex items-center gap-1.5 shadow-xs ring-2 ring-apricot/30">
                              <Calendar className="w-4 h-4 text-ebony shrink-0" />
                              <span>Examen pro : {formatDateFrench(jalon.date)}</span>
                            </span>
                          );
                        } else if (jalon.typeJalon === "promouvabilite_grade") {
                          return (
                            <span className="animate-blink-date text-xs sm:text-sm font-black text-ebony bg-tangerine border-2 border-tangerine-dark px-3.5 py-1 rounded-xl flex items-center gap-1.5 shadow-xs ring-2 ring-tangerine/30">
                              <Calendar className="w-4 h-4 text-ebony shrink-0" />
                              <span>Éligible au choix : {formatDateFrench(jalon.date)}</span>
                            </span>
                          );
                        } else {
                          return (
                            <span className="animate-blink-date text-xs sm:text-sm font-black text-ebony bg-lime-cream border-2 border-muted-teal px-3.5 py-1 rounded-xl flex items-center gap-1.5 shadow-xs ring-2 ring-muted-teal/30">
                              <Clock className="w-4 h-4 text-ebony shrink-0" />
                              <span>Éligible dès le {formatDateFrench(jalon.date)}</span>
                            </span>
                          );
                        }
                      })()}
                    </div>

                    {/* Titre */}
                    <h4 className={`text-base font-extrabold text-slate-900 dark:text-white ${cardTheme.titleHover} transition-colors leading-snug`}>
                      {jalon.titre}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {jalon.pourquoi}
                    </p>

                    {/* Jauge des conditions */}
                    <div className={`mt-3.5 ${cardTheme.boxBg} p-3.5 rounded-xl border`}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          Conditions statutaires :
                        </span>
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {nbRemplies} / {totalConditions} validée{nbRemplies > 1 ? "s" : ""} ({ratioPourcent}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/80 dark:bg-slate-900/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            ratioPourcent === 100
                              ? "bg-emerald-500"
                              : hasExamBlocker
                              ? "bg-rose-500"
                              : cardTheme.progressBar
                          }`}
                          style={{ width: `${ratioPourcent}%` }}
                        ></div>
                      </div>

                      {/* Synthèse des éléments manquants */}
                      <div className="mt-2.5 space-y-1.5">
                        {jalon.conditionsManquantes.slice(0, 2).map((m, idx) => (
                          <div key={idx} className="text-[11px] flex items-start gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                            {m.statut === "bloquante" ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            )}
                            <span>{m.libelle}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Justificatifs clés requis */}
                    <div className="mt-3.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">Pièces clés à préparer :</span>
                      <ul className="mt-1 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {jalon.justificatifsRequis.slice(0, 2).map((p, idx) => (
                          <li key={idx} className="truncate flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cardTheme.bulletColor} shrink-0`}></span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                {/* Actions au bas de la carte */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  {hasExamBlocker ? (
                    jalon.conditionsManquantes.some(c => c.valeurRequise.toLowerCase().includes("titulaire")) ? (
                      <span className="text-[11px] text-rose-700 dark:text-rose-300 font-bold bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2.5 py-1 rounded-lg">
                        Réservé aux titulaires
                      </span>
                    ) : (
                      <button
                        onClick={() => onOpenAddEvent("examen_professionnel")}
                        className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 flex items-center gap-1.5 cursor-pointer bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 px-2.5 py-1 rounded-lg transition-colors border border-purple-200/60 dark:border-purple-800"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Simuler l examen</span>
                      </button>
                    )
                  ) : jalon.titre.includes("Concours") ? (
                    <button
                      onClick={() => onOpenAddEvent("reussite_concours")}
                      className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 flex items-center gap-1.5 cursor-pointer bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Simuler réussite & stage</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      Soumis aux LDG
                    </span>
                  )}

                  <button
                    onClick={() => onSelectJalon(jalon)}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 flex items-center gap-1 cursor-pointer ml-auto"
                  >
                    <span>Détails complets</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};
