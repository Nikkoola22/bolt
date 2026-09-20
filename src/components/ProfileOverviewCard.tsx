import React from "react";
import type { ProfilAgent, JalonTimeline } from "../types/career";
import { findCadreAndGrade, formatDurationInYearsAndMonths, formatDateFrench, diffMonths } from "../services/simulationEngine";
import { Briefcase, Award, Clock, DollarSign, ArrowRight, User, Sparkles, Building2, AlertTriangle, Calendar } from "lucide-react";

interface ProfileOverviewCardProps {
  profil: ProfilAgent;
  prochainEchelonJalon: JalonTimeline | null;
  onBackToMenu: () => void;
  onScrollToNextMilestone?: () => void;
}

export const ProfileOverviewCard: React.FC<ProfileOverviewCardProps> = ({
  profil,
  prochainEchelonJalon,
  onScrollToNextMilestone
}) => {
  const { cadre, grade } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const nowStr = "2026-09-11";

  const currentEchelon = grade.echelons.find(e => e.numero === profil.echelonActuel) || grade.echelons[0];
  
  const isContractuel = profil.statut.startsWith("contractuel");
  const moisAncienneteEchelon = Math.max(0, diffMonths(profil.dateEffetEchelonActuel, nowStr) + (profil.ancienneteConserveeMois || 0));
  const moisDureeEchelon = isContractuel ? 36 : (currentEchelon.dureeAnnees * 12);
  const progressionPourcent = moisDureeEchelon > 0 ? Math.min(100, Math.round((moisAncienneteEchelon / moisDureeEchelon) * 100)) : 100;
  
  const moisAncienneteGrade = Math.max(0, diffMonths(profil.dateNominationGradeActuel, nowStr));
  const dateEntreeCadre = profil.dateEntreeCadreEmploi || profil.dateNominationGradeActuel;
  const moisAncienneteCadre = Math.max(0, diffMonths(dateEntreeCadre, nowStr));
  const moisAnciennetePublic = Math.max(0, diffMonths(profil.dateEntreeFonctionPublique, nowStr));

  const statutLibelle = profil.statut === "titulaire" 
    ? "Fonctionnaire titulaire" 
    : profil.statut === "stagiaire" 
    ? "Fonctionnaire stagiaire" 
    : profil.statut === "contractuel_cdi" 
    ? "Contractuel en CDI (Droit public)" 
    : "Contractuel en CDD (Droit public)";

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case "A":
        return "bg-tangerine/20 text-ebony dark:text-tangerine border-tangerine/40";
      case "B":
        return "bg-muted-teal/20 text-ebony dark:text-lime-cream border-muted-teal/40";
      default:
        return "bg-lime-cream/30 text-ebony dark:text-lime-cream border-lime-cream/40";
    }
  };

  const getCategoryTagClass = (cat: string) => {
    switch (cat) {
      case "A":
        return "bg-tangerine/20 text-ebony dark:text-tangerine border border-tangerine/40";
      case "B":
        return "bg-muted-teal/20 text-ebony dark:text-lime-cream border border-muted-teal/40";
      default:
        return "bg-lime-cream/30 text-ebony dark:text-lime-cream border border-lime-cream/40";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5 transition-all">
      {/* Header card avec look exécutif et badge autorité */}
      <div className="bg-gradient-to-r from-ebony-darker via-ebony-dark to-ebony p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Lueur d'ambiance en arrière-plan */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-tangerine/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-tangerine to-apricot flex items-center justify-center text-ebony font-black text-xl shadow-inner ring-2 ring-white/20 shrink-0">
              {profil.prenom ? profil.prenom[0].toUpperCase() : "A"}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {profil.prenom}
                </h2>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(grade.categorie)}`}>
                  Catégorie {grade.categorie}
                </span>
                <span className="text-xs bg-apricot/20 text-apricot border border-apricot/30 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-apricot" />
                  {profil.collectivite || "Collectivité de Gennevilliers"}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-apricot" />
                  <span>{statutLibelle}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-lime-cream font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-apricot" />
                  Situation à jour au 11 sept. 2026
                </span>
              </p>
            </div>
          </div>


        </div>
      </div>

      {/* Alerte contractuel explicative */}
      {isContractuel && (
        <div className="p-4 sm:p-5 bg-amber-50/90 dark:bg-amber-950/40 border-b border-amber-200/90 dark:border-amber-800/60 flex items-start gap-3 text-slate-800 dark:text-slate-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
            <strong>Statut Contractuel de droit public (Décret n° 88-145) :</strong> Vous ne bénéficiez pas d'avancement d'échelon de plein droit ni d'avancement de grade automatique. Votre rémunération fait l'objet d'une <strong>réévaluation triennale indicative</strong> par avenant de la collectivité. Pour devenir fonctionnaire titulaire, préparez le <strong>Concours Interne</strong> (consultez le jalon dédié sur votre frise).
          </div>
        </div>
      )}

      {/* Grille des 4 blocs indicateurs statutaires (KPIs) */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 bg-slate-50/40 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800">
        
        {/* 1. Grade actuel & Cadre d'emplois (Thème Orange CFDT) */}
        <div className="bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/20 p-5 rounded-2xl border-2 border-orange-200/90 dark:border-orange-800/60 shadow-xs hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-bold flex items-center gap-1.5 text-orange-950 dark:text-orange-200 uppercase tracking-wider text-[11px]">
                <span className="p-1.5 rounded-lg bg-orange-600 text-white shadow-2xs">
                  <Briefcase className="w-3.5 h-3.5" />
                </span>
                Grade actuel
              </span>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${getCategoryTagClass(grade.categorie)}`}>
                Cat. {grade.categorie}
              </span>
            </div>
            <div className="font-black text-slate-950 dark:text-white text-base sm:text-lg leading-snug group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors mt-1">
              {grade.nom}
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <div className="inline-flex items-center gap-1.5 bg-orange-100/80 dark:bg-orange-950/70 border border-orange-200/90 dark:border-orange-800/60 text-orange-950 dark:text-orange-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                <span className="text-orange-700 dark:text-orange-400 font-medium">Cadre d emplois :</span>
                <span className="font-black">{cadre.nom}</span>
              </div>
              <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Filière {cadre.filiere}
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2.5 border-t border-orange-100 dark:border-orange-950/80 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>Nommé(e) le {formatDateFrench(profil.dateNominationGradeActuel)}</span>
          </div>
        </div>

        {/* 2. Échelon actuel & Position indiciaire (Thème Émeraude / Menthe) */}
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/20 p-5 rounded-2xl border-2 border-emerald-200/90 dark:border-emerald-800/60 shadow-xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-bold flex items-center gap-1.5 text-emerald-950 dark:text-emerald-200 uppercase tracking-wider text-[11px]">
                <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-2xs">
                  <Award className="w-3.5 h-3.5" />
                </span>
                Échelon actuel
              </span>
              <span className="bg-emerald-600 text-white font-black px-2.5 py-1 rounded-lg text-xs shadow-2xs">
                {profil.echelonActuel}e échelon
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-200 tracking-tight">
                IM {currentEchelon.indiceMajore}
              </span>
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-md">
                IB {currentEchelon.indiceBrut}
              </span>
            </div>
            <div className="text-xs text-emerald-950 dark:text-emerald-300 mt-1.5 flex items-center gap-1 font-medium">
              <span>Date d effet : <strong className="text-slate-900 dark:text-white font-bold">{formatDateFrench(profil.dateEffetEchelonActuel)}</strong></span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-emerald-100 dark:border-emerald-950/80">
            {profil.ancienneteConserveeMois > 0 ? (
              <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>+{profil.ancienneteConserveeMois} mois d ancienneté conservée</span>
              </div>
            ) : (
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {isContractuel ? "Périodicité réévaluation : 3 ans (triennale)" : `Durée normale : ${currentEchelon.dureeAnnees} an(s)`}
              </div>
            )}
          </div>
        </div>

        {/* 3. Traitement brut mensuel de base */}
        <div className="bg-white dark:bg-slate-800 p-4.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-sm hover:border-indigo-200 dark:hover:border-indigo-600 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                  <DollarSign className="w-3.5 h-3.5" />
                </span>
                Traitement indiciaire
              </span>
              <span className="text-[10px] font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-md">
                {profil.quotiteActuelle === 100 ? "Temps plein (100%)" : `${profil.quotiteActuelle}% quotité`}
              </span>
            </div>
            <div className="text-2xl font-black text-indigo-950 dark:text-indigo-200 tracking-tight">
              {Math.round(currentEchelon.indiceMajore * 4.92278 * (profil.quotiteActuelle === 80 ? (6/7) : profil.quotiteActuelle === 90 ? (32/35) : (profil.quotiteActuelle / 100)))} €
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">/ mois</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              Hors primes, RIFSEEP et SFT
            </div>
          </div>
          <div className="text-[11px] text-indigo-700 dark:text-indigo-300 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 font-medium">
            Valeur du point : 4,92278 € / mois
          </div>
        </div>

        {/* 4. Ancienneté globale */}
        <div className="bg-white dark:bg-slate-800 p-4.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-sm hover:border-amber-200 dark:hover:border-amber-600 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 border border-amber-100 dark:border-amber-800">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                Ancienneté cumulée
              </span>
              <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-md">
                Total FP
              </span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              {formatDurationInYearsAndMonths(moisAnciennetePublic)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 space-y-0.5">
              <div>Dans le cadre ({grade.categorie}) : <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDurationInYearsAndMonths(moisAncienneteCadre)}</span></div>
              <div>Dans le grade : <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDurationInYearsAndMonths(moisAncienneteGrade)}</span></div>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700">
            Dans l échelon : <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDurationInYearsAndMonths(moisAncienneteEchelon)}</span>
          </div>
        </div>

      </div>

      {/* Barre de progression vers le prochain échelon avec callout exécutif */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 dark:from-slate-900/90 dark:via-slate-800 dark:to-slate-900/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="truncate">
                {isContractuel 
                  ? `Progression vers l indice supérieur (${profil.echelonActuel + 1}e éch. assimilé) :`
                  : `Progression vers le ${profil.echelonActuel + 1}e échelon :`
                }
              </span>
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700 shrink-0 ml-2">
              {moisAncienneteEchelon} / {moisDureeEchelon} mois ({progressionPourcent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-200/80 dark:border-slate-700 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-tangerine via-apricot to-lime-cream rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${progressionPourcent}%` }}
            ></div>
          </div>
        </div>

        {prochainEchelonJalon && (
          <div className={`lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-5 flex items-center justify-between sm:justify-start gap-3.5 w-full lg:w-auto ${
            isContractuel 
              ? "bg-apricot/20 dark:bg-apricot/10 border-apricot/50 dark:border-apricot/40" 
              : "bg-lime-cream/20 dark:bg-lime-cream/10 border-lime-cream/50 dark:border-lime-cream/30"
          } border rounded-xl p-3 shadow-2xs`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg ${isContractuel ? "bg-apricot text-ebony" : "bg-lime-cream text-ebony"} shrink-0 shadow-xs font-bold`}>
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[10px] ${isContractuel ? "text-ebony dark:text-apricot" : "text-ebony dark:text-lime-cream"} uppercase font-black tracking-wider truncate`}>
                  {isContractuel ? "Réévaluation indicative (Avenant)" : "Prochain échelon garanti"}
                </div>
                <div className="mt-1 mb-1">
                  <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl shadow-xs border-2 ${
                    isContractuel
                      ? "text-ebony bg-apricot border-apricot-dark"
                      : "text-ebony bg-lime-cream border-muted-teal"
                  }`}>
                    <Calendar className="w-4 h-4 text-ebony" />
                    <span>{isContractuel ? `Réévaluation : ${formatDateFrench(prochainEchelonJalon.date)}` : `Prise d'échelon : ${formatDateFrench(prochainEchelonJalon.date)}`}</span>
                  </span>
                </div>
                <div className={`text-[11px] ${isContractuel ? "text-ebony dark:text-apricot font-bold" : "text-ebony dark:text-lime-cream font-bold"} truncate`}>
                  +{prochainEchelonJalon.gainIndiciaire} pts (~+{Math.round(prochainEchelonJalon.gainFinancierBrutMensuel || 0)} € brut/mois)
                </div>
              </div>
            </div>
            {onScrollToNextMilestone && (
              <button
                onClick={onScrollToNextMilestone}
                className={`text-xs ${
                  isContractuel 
                    ? "text-ebony hover:text-black dark:text-apricot bg-apricot/30 dark:bg-apricot/20 hover:bg-apricot/50 border-apricot/60" 
                    : "text-ebony hover:text-black dark:text-lime-cream bg-lime-cream/40 dark:bg-lime-cream/20 hover:bg-lime-cream/60 border-muted-teal/50"
                } border p-2 rounded-lg transition-all cursor-pointer shadow-2xs shrink-0`}
                title="Consulter ce jalon sur la frise"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

