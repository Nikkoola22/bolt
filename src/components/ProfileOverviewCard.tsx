import React from "react";
import type { ProfilAgent, JalonTimeline } from "../types/career";
import { findCadreAndGrade, formatDurationInYearsAndMonths, formatDateFrench, diffMonths } from "../services/simulationEngine";
import { Briefcase, Award, Clock, DollarSign, Edit3, ArrowRight, User, Sparkles, Building2, AlertTriangle } from "lucide-react";

interface ProfileOverviewCardProps {
  profil: ProfilAgent;
  prochainEchelonJalon: JalonTimeline | null;
  onEditProfile: () => void;
  onScrollToNextMilestone?: () => void;
}

export const ProfileOverviewCard: React.FC<ProfileOverviewCardProps> = ({
  profil,
  prochainEchelonJalon,
  onEditProfile,
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
        return "bg-purple-500/20 text-purple-200 border-purple-400/30";
      case "B":
        return "bg-indigo-500/20 text-indigo-200 border-indigo-400/30";
      default:
        return "bg-blue-500/20 text-blue-200 border-blue-400/30";
    }
  };

  const getCategoryTagClass = (cat: string) => {
    switch (cat) {
      case "A":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "B":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      default:
        return "bg-blue-100 text-blue-800 border border-blue-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden ring-1 ring-slate-900/5 transition-all">
      {/* Header card avec look exécutif et badge autorité */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Lueur d'ambiance en arrière-plan */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-inner ring-2 ring-white/20 shrink-0">
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
                <span className="text-xs bg-blue-500/20 text-blue-200 border border-blue-400/30 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-300" />
                  {profil.collectivite || "Collectivité de Gennevilliers"}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>{statutLibelle}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span>Matricule : {profil.matricule || "N/A"}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-300 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Situation à jour au 11 sept. 2026
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={onEditProfile}
              className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xs shadow-xs hover:shadow-sm"
              title="Modifier ma situation statutaire"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-300" />
              <span>Modifier ma situation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerte statutaire informative pour les contractuels */}
      {isContractuel && (
        <div className="mx-4 sm:mx-6 mt-4 p-3.5 bg-amber-50/95 border border-amber-300/90 rounded-xl flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong>Statut Contractuel de droit public (Décret n° 88-145) :</strong> Vous ne bénéficiez pas d'avancement d'échelon de plein droit ni d'avancement de grade automatique. Votre rémunération fait l'objet d'une <strong>réévaluation triennale indicative</strong> par avenant de la collectivité. Pour devenir fonctionnaire titulaire, préparez le <strong>Concours Interne</strong> (consultez le jalon dédié sur votre frise).
          </div>
        </div>
      )}

      {/* Grille des 4 blocs indicateurs statutaires (KPIs) */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 bg-slate-50/40 border-b border-slate-200/80">
        
        {/* 1. Grade & Cadre */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700">
                <span className="p-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                  <Briefcase className="w-3.5 h-3.5" />
                </span>
                Grade actuel
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getCategoryTagClass(grade.categorie)}`}>
                Cat. {grade.categorie}
              </span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
              {grade.nom}
            </div>
            <div className="text-xs text-slate-600 mt-1.5">
              Cadre : <span className="font-semibold text-slate-800">{cadre.nom}</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Nommé(e) le {formatDateFrench(profil.dateNominationGradeActuel)}</span>
          </div>
        </div>

        {/* 2. Échelon & Indice */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700">
                <span className="p-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Award className="w-3.5 h-3.5" />
                </span>
                Position indiciaire
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px] border border-emerald-200/70">
                {profil.echelonActuel}e échelon
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                IM {currentEchelon.indiceMajore}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                IB {currentEchelon.indiceBrut}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1.5 flex items-center gap-1">
              <span>Effet : <strong className="text-slate-800">{formatDateFrench(profil.dateEffetEchelonActuel)}</strong></span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            {profil.ancienneteConserveeMois > 0 ? (
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>+{profil.ancienneteConserveeMois} mois d ancienneté conservée</span>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500">
                {isContractuel ? "Périodicité réévaluation : 3 ans (triennale)" : `Durée normale : ${currentEchelon.dureeAnnees} an(s)`}
              </div>
            )}
          </div>
        </div>

        {/* 3. Traitement brut mensuel de base */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-indigo-200 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700">
                <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <DollarSign className="w-3.5 h-3.5" />
                </span>
                Traitement indiciaire
              </span>
              <span className="text-[10px] font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                {profil.quotiteActuelle === 100 ? "Temps plein (100%)" : `${profil.quotiteActuelle}% quotité`}
              </span>
            </div>
            <div className="text-2xl font-black text-indigo-950 tracking-tight">
              {Math.round(currentEchelon.indiceMajore * 4.92278 * (profil.quotiteActuelle === 80 ? (6/7) : profil.quotiteActuelle === 90 ? (32/35) : (profil.quotiteActuelle / 100)))} €
              <span className="text-xs font-semibold text-slate-500 ml-1">/ mois</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">
              Hors primes, RIFSEEP et SFT
            </div>
          </div>
          <div className="text-[11px] text-indigo-700 mt-3 pt-2.5 border-t border-slate-100 font-medium">
            Valeur du point : 4,92278 € / mois
          </div>
        </div>

        {/* 4. Ancienneté globale */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-amber-200 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700">
                <span className="p-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                Ancienneté cumulée
              </span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                Total FP
              </span>
            </div>
            <div className="text-base font-extrabold text-slate-900">
              {formatDurationInYearsAndMonths(moisAnciennetePublic)}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Dans le grade : <span className="font-semibold text-slate-800">{formatDurationInYearsAndMonths(moisAncienneteGrade)}</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 mt-3 pt-2.5 border-t border-slate-100">
            Dans l échelon : <span className="font-semibold text-slate-800">{formatDurationInYearsAndMonths(moisAncienneteEchelon)}</span>
          </div>
        </div>

      </div>

      {/* Barre de progression vers le prochain échelon avec callout exécutif */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-2">
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
            <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/80 shrink-0 ml-2">
              {moisAncienneteEchelon} / {moisDureeEchelon} mois ({progressionPourcent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/80 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${progressionPourcent}%` }}
            ></div>
          </div>
        </div>

        {prochainEchelonJalon && (
          <div className={`lg:border-l lg:border-slate-200 lg:pl-5 flex items-center justify-between sm:justify-start gap-3.5 w-full lg:w-auto ${
            isContractuel ? "bg-amber-50/80 border-amber-300/80" : "bg-emerald-50/70 border-emerald-200/70"
          } border rounded-xl p-3 shadow-2xs`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg ${isContractuel ? "bg-amber-600" : "bg-emerald-600"} text-white shrink-0`}>
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[10px] ${isContractuel ? "text-amber-900" : "text-emerald-900"} uppercase font-black tracking-wider truncate`}>
                  {isContractuel ? "Réévaluation indicative (Avenant)" : "Prochain échelon garanti"}
                </div>
                <div className={`text-xs font-black ${isContractuel ? "text-amber-950" : "text-emerald-950"}`}>
                  {formatDateFrench(prochainEchelonJalon.date)}
                </div>
                <div className={`text-[11px] ${isContractuel ? "text-amber-800" : "text-emerald-800"} font-bold truncate`}>
                  +{prochainEchelonJalon.gainIndiciaire} pts (~+{Math.round(prochainEchelonJalon.gainFinancierBrutMensuel || 0)} € brut/mois)
                </div>
              </div>
            </div>
            {onScrollToNextMilestone && (
              <button
                onClick={onScrollToNextMilestone}
                className={`text-xs ${
                  isContractuel 
                    ? "text-amber-800 hover:text-amber-950 bg-white hover:bg-amber-100 border-amber-300/80" 
                    : "text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-100 border-emerald-300/80"
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

