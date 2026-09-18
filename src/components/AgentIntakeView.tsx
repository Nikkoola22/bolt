import React, { useState, useEffect } from "react";
import type { ProfilAgent, StatutAgent } from "../types/career";
import { CADRES_EMPLOIS } from "../data/gradesData";
import { calculateTraitementBrut, isGradeAvancement } from "../services/simulationEngine";
import { DateFieldWithYear } from "./DateFieldWithYear";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { 
  User, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Building2,
  Zap,
  Award,
  TrendingUp, 
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface AgentIntakeViewProps {
  currentProfile: ProfilAgent;
  onSaveProfileAndSimulate: (profil: ProfilAgent) => void;
  onSelectPreset: (profil: ProfilAgent) => void;
}

export const AgentIntakeView: React.FC<AgentIntakeViewProps> = ({
  currentProfile,
  onSaveProfileAndSimulate,
  onSelectPreset: _onSelectPreset,
}) => {
  const [formData, setFormData] = useState<ProfilAgent>({ ...currentProfile });

  // Étape progressive déverrouillée (1, 2 ou 3)
  const [unlockedStep, setUnlockedStep] = useState<number>(1);
  const [prenomError, setPrenomError] = useState(false);

  useEffect(() => {
    setFormData({ ...currentProfile });
  }, [currentProfile]);

  const currentCadre = CADRES_EMPLOIS.find((c) => c.id === formData.cadreEmploiId) || CADRES_EMPLOIS[0];
  const currentGrade = currentCadre.grades.find((g) => g.id === formData.gradeId) || currentCadre.grades[0];
  const currentEchelon = currentGrade.echelons.find((e) => e.numero === formData.echelonActuel) || currentGrade.echelons[0];

  const traitementCalcule = calculateTraitementBrut(currentEchelon.indiceMajore, formData.quotiteActuelle);

  const handleStatutChange = (newStatut: StatutAgent) => {
    const isNewContractuel = newStatut.startsWith("contractuel");
    let targetGradeId = formData.gradeId;
    let targetEchelon = formData.echelonActuel;

    if (isNewContractuel && isGradeAvancement(currentCadre, formData.gradeId)) {
      targetGradeId = currentCadre.grades[0].id;
      targetEchelon = 1;
    }

    const cleanedEvents = isNewContractuel
      ? formData.evenementsSimules.filter(e => e.type !== "examen_professionnel" && e.type !== "disponibilite")
      : formData.evenementsSimules;

    setFormData({
      ...formData,
      statut: newStatut,
      gradeId: targetGradeId,
      echelonActuel: targetEchelon,
      evenementsSimules: cleanedEvents,
    });
  };

  const handleCadreChange = (cadreId: string) => {
    const selectedCadre = CADRES_EMPLOIS.find((c) => c.id === cadreId) || CADRES_EMPLOIS[0];
    const defaultGrade = selectedCadre.grades[0];
    setFormData({
      ...formData,
      cadreEmploiId: selectedCadre.id,
      gradeId: defaultGrade.id,
      echelonActuel: 1,
    });
  };

  const handleGradeChange = (gradeId: string) => {
    const selectedGrade = currentCadre.grades.find((g) => g.id === gradeId) || currentCadre.grades[0];
    setFormData({
      ...formData,
      gradeId: selectedGrade.id,
      echelonActuel: 1,
    });
  };

  // Validation étape 1 -> déverrouille étape 2
  const handleValidateStep1 = () => {
    if (!formData.prenom || formData.prenom.trim().length === 0) {
      setPrenomError(true);
      const el = document.getElementById("input-prenom");
      el?.focus();
      return;
    }
    setPrenomError(false);
    setUnlockedStep((prev) => Math.max(prev, 2));
    setTimeout(() => {
      const el = document.getElementById("section-2");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  // Validation étape 2 -> déverrouille étape 3
  const handleValidateStep2 = () => {
    setUnlockedStep(3);
    setTimeout(() => {
      const el = document.getElementById("section-3");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (unlockedStep < 2) {
      handleValidateStep1();
      return;
    }
    if (unlockedStep < 3) {
      handleValidateStep2();
      return;
    }

    const updatedProfile: ProfilAgent = {
      ...formData,
      quotiteActuelle: formData.quotiteActuelle || 100,
      collectivite: "Collectivité de Gennevilliers",
      versant: "FPT",
    };

    onSaveProfileAndSimulate(updatedProfile);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Block ESPACE DE SAISIE PERSONNALISÉE en Double-Bezel Apple-grade */}
      <div className="p-1.5 sm:p-2 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] shadow-sm">
        <div className="rounded-[2.1rem] bg-white dark:bg-[#111114] p-6 sm:p-8 lg:p-9 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          {/* Lueur d'ambiance Apple douce */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-tangerine/15 text-ebony dark:text-tangerine border border-tangerine/30 px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-tangerine" />
              Espace de Saisie Personnalisée
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
              Renseignez votre situation pour simuler votre carrière
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Vos informations permettent de projeter vos prochains paliers de salaire, vos opportunités d'avancement et vos conditions d'éligibilité.
            </p>
          </div>

          {/* Flash info : Documents recommandés en capsule Apple élégante avec reflets */}
          <div className="relative mt-6 pt-5 border-t border-black/[0.05] dark:border-white/[0.06]">
            <div className="rounded-2xl p-4 sm:p-5 bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
              
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-apricot/30 text-ebony dark:text-apricot flex items-center justify-center font-bold shrink-0">
                  <Zap className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full bg-apricot/30 text-ebony dark:text-apricot border border-tangerine/30">
                      Conseil pratique
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Documents recommandés pour votre simulation
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed flex items-center flex-wrap gap-2">
                    <span>Munissez-vous de votre</span>
                    <span className="relative group/arrete inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-ebony bg-apricot border-2 border-apricot-dark shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-default">
                      <span className="w-5 h-5 rounded-full bg-ebony text-apricot flex items-center justify-center shrink-0 shadow-2xs">
                        <FileText className="w-3 h-3" />
                      </span>
                      <span>dernier arrêté d'avancement d'échelon et/ou d'avancement de grade</span>
                    </span>
                    <span>et de votre</span>
                    <span className="relative group/paie inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-ebony bg-lime-cream border-2 border-muted-teal shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-default">
                      <span className="w-5 h-5 rounded-full bg-muted-teal text-ebony flex items-center justify-center shrink-0 shadow-2xs">
                        <FileText className="w-3 h-3" />
                      </span>
                      <span>bulletin de paie</span>
                    </span>
                    <span>pour faciliter votre saisie.</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Formulaire de saisie principal en Double-Bezel avec révélation progressive */}
      <form onSubmit={handleSubmit} className="p-1.5 sm:p-2 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.06] shadow-sm">
        <div className="rounded-[2.1rem] bg-white dark:bg-[#111114] p-5 sm:p-8 lg:p-9 space-y-8 sm:space-y-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          
          {/* Indicateur de progression des étapes (Stepper Apple-style) */}
          <div className="flex items-center justify-between gap-2 pb-6 border-b border-black/[0.05] dark:border-white/[0.06] overflow-x-auto no-scrollbar">
            {/* Étape 1 */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("section-1");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                unlockedStep >= 1
                  ? "bg-tangerine/20 text-ebony dark:text-tangerine border border-tangerine/40 shadow-2xs"
                  : "bg-black/[0.03] dark:bg-white/[0.05] text-slate-400"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                unlockedStep > 1 ? "bg-muted-teal text-ebony" : "bg-tangerine text-ebony"
              }`}>
                {unlockedStep > 1 ? "✓" : "1"}
              </span>
              <span>1. Identité & Statut</span>
            </button>

            <span className="w-6 h-0.5 bg-black/[0.08] dark:bg-white/[0.1] shrink-0"></span>

            {/* Étape 2 */}
            <button
              type="button"
              disabled={unlockedStep < 2}
              onClick={() => {
                if (unlockedStep >= 2) {
                  const el = document.getElementById("section-2");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                unlockedStep >= 2
                  ? "bg-apricot/30 text-ebony dark:text-apricot border border-apricot/50 cursor-pointer shadow-2xs"
                  : "bg-black/[0.02] dark:bg-white/[0.03] text-slate-400 opacity-50 cursor-not-allowed"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                unlockedStep > 2 ? "bg-muted-teal text-ebony" : unlockedStep === 2 ? "bg-apricot text-ebony" : "bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}>
                {unlockedStep > 2 ? "✓" : "2"}
              </span>
              <span>2. Cadre & Grade</span>
            </button>

            <span className="w-6 h-0.5 bg-black/[0.08] dark:bg-white/[0.1] shrink-0"></span>

            {/* Étape 3 */}
            <button
              type="button"
              disabled={unlockedStep < 3}
              onClick={() => {
                if (unlockedStep >= 3) {
                  const el = document.getElementById("section-3");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                unlockedStep >= 3
                  ? "bg-lime-cream/40 text-ebony dark:text-lime-cream border border-lime-cream/60 cursor-pointer shadow-2xs"
                  : "bg-black/[0.02] dark:bg-white/[0.03] text-slate-400 opacity-50 cursor-not-allowed"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                unlockedStep === 3 ? "bg-lime-cream text-ebony" : "bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}>
                3
              </span>
              <span>3. Dates d'ancienneté</span>
            </button>
          </div>

          {/* Section 1 : Identité & Statut administratif (Toujours visible au départ) */}
          <div id="section-1" className="space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-black/[0.05] dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-tangerine text-ebony font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                  1
                </span>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
                    <User className="w-5 h-5 text-tangerine-dark dark:text-tangerine" />
                    Votre Identité & Statut Administratif
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Informations de base et cadre statutaire de référence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20 font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-orange-600" />
                  Collectivité de Gennevilliers
                </span>
                <span className="text-xs bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-bold px-2.5 py-1 rounded-full">
                  FPT
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 text-sm">
              <div className="w-full sm:w-60 md:w-64 shrink-0">
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5 text-xs sm:text-sm">
                  Votre Prénom <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => {
                    setFormData({ ...formData, prenom: e.target.value });
                    if (prenomError && e.target.value.trim().length > 0) {
                      setPrenomError(false);
                    }
                  }}
                  placeholder="Ex: Atlas, Sophie, Karim..."
                  className={`w-full bg-slate-50/70 dark:bg-[#18181c] border rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold text-sm focus:bg-white dark:focus:bg-[#18181c] transition-all shadow-2xs ${
                    prenomError 
                      ? "border-rose-500 ring-2 ring-rose-500/20" 
                      : "border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  }`}
                  required
                />
                {prenomError ? (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    Veuillez renseigner votre prénom pour continuer.
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    Prénom de l'agent
                  </p>
                )}
              </div>

              <div className="w-full flex-1">
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5 text-xs sm:text-sm">
                  Statut juridique
                </label>
                <select
                  value={formData.statut}
                  onChange={(e) => handleStatutChange(e.target.value as StatutAgent)}
                  className="w-full bg-amber-50/60 hover:bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold text-sm focus:bg-white dark:focus:bg-[#18181c] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs cursor-pointer"
                >
                  <option value="titulaire" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Fonctionnaire Titulaire</option>
                  <option value="stagiaire" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Fonctionnaire Stagiaire (en cours de stage)</option>
                  <option value="contractuel_cdi" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Contractuel de droit public en CDI</option>
                  <option value="contractuel_cdd" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Contractuel de droit public en CDD</option>
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  Régit les conditions d'avancement selon le CGFP.
                </p>
                {formData.statut.startsWith("contractuel") && (
                  <div className="mt-2 text-xs text-amber-900 dark:text-amber-200 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg p-2.5 leading-relaxed">
                    <strong>Régime contractuel (Décret 88-145) :</strong> Rémunération par assimilation indiciaire sur le grade d'accès.
                  </div>
                )}
              </div>
            </div>

            {/* Bouton pour valider le bloc 1 et afficher le bloc 2 */}
            <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
              {unlockedStep > 1 ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Étape 1 validée ({formData.prenom} • {formData.statut})
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  Renseignez votre prénom pour déverrouiller la suite
                </span>
              )}

              <button
                type="button"
                onClick={handleValidateStep1}
                className="group px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] text-white dark:text-black shadow-sm flex items-center gap-2.5 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{unlockedStep > 1 ? "Accéder à l'Étape 2 : Cadre & Grade" : "Valider et passer à l'Étape 2"}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Section 2 : Cadre d emplois, Grade, Échelon & Traitement (Révélée après bloc 1) */}
          {unlockedStep >= 2 && (
            <div id="section-2" className="space-y-6 scroll-mt-24 animate-fadeIn pt-6 border-t border-black/[0.05] dark:border-white/[0.06]">
              <div className="pb-4 border-b border-black/[0.05] dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-apricot text-ebony font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
                      <Briefcase className="w-5 h-5 text-apricot-dark dark:text-apricot" />
                      Votre Cadre d'emplois, Grade & Position Indiciaire
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Position statutaire actuelle déterminant votre grille indiciaire et votre salaire de base
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 text-sm">
                {/* 1. Cadre d'emplois (Thème Orange CFDT) */}
                <div className="bg-gradient-to-b from-orange-50/90 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/20 border-2 border-orange-300 dark:border-orange-700/60 hover:border-orange-500 dark:hover:border-orange-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <label className="block font-black text-orange-950 dark:text-orange-200 text-xs sm:text-sm tracking-wide uppercase truncate">
                          Cadre d'emplois
                        </label>
                      </div>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-950 dark:text-orange-200 border border-orange-300 dark:border-orange-700 shadow-2xs shrink-0">
                        Cat. {currentCadre.categorie}
                      </span>
                    </div>

                    <div className="relative">
                      <select
                        value={formData.cadreEmploiId}
                        onChange={(e) => handleCadreChange(e.target.value)}
                        className="w-full bg-orange-50/70 hover:bg-orange-50/40 dark:bg-orange-950/30 text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3 border-2 border-orange-200 dark:border-orange-700/60 hover:border-orange-400 dark:hover:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:border-orange-600 focus:ring-2 focus:ring-orange-500/20 shadow-2xs transition-all cursor-pointer truncate"
                      >
                        {["Administrative", "Technique", "Animation", "Médico-sociale", "Culturelle"].map((fil) => {
                          const cadresInFil = CADRES_EMPLOIS.filter((c) => c.filiere === fil);
                          if (cadresInFil.length === 0) return null;
                          return (
                            <optgroup key={fil} label={`Filière ${fil}`} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                              {cadresInFil.map((c) => (
                                <option key={c.id} value={c.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                                  {c.nom} (Cat. {c.categorie})
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-orange-100/90 dark:border-orange-950/80 flex items-center justify-between gap-2 flex-wrap text-xs text-orange-950 dark:text-orange-200 font-bold">
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                      <span>{currentCadre.grades.length} grades statutaires</span>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Filière {currentCadre.filiere}
                    </span>
                  </div>
                </div>

                {/* 2. Grade actuel (Thème Violet/Indigo) */}
                <div className="bg-gradient-to-b from-purple-50/90 via-white to-purple-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-purple-950/30 border-2 border-purple-200 dark:border-purple-700/60 hover:border-purple-400 dark:hover:border-purple-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <label className="block font-black text-purple-950 dark:text-purple-200 text-xs sm:text-sm tracking-wide uppercase truncate">
                          Grade Détenu
                        </label>
                      </div>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-300 dark:border-purple-700 shadow-2xs shrink-0">
                        {currentGrade.echelons.length} échelons
                      </span>
                    </div>

                    <div className="relative">
                      <select
                        value={formData.gradeId}
                        onChange={(e) => handleGradeChange(e.target.value)}
                        className="w-full bg-purple-50/70 hover:bg-purple-50/40 dark:bg-purple-950/30 text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3 border-2 border-purple-200 dark:border-purple-700/60 hover:border-purple-400 dark:hover:border-purple-500 focus:bg-white dark:focus:bg-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 shadow-2xs transition-all cursor-pointer truncate"
                      >
                        {currentCadre.grades.map((g) => (
                          <option key={g.id} value={g.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                            {g.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-purple-100/90 dark:border-purple-950/80 flex items-center justify-between gap-2 flex-wrap text-xs text-purple-950 dark:text-purple-200 font-bold">
                    <span className="truncate">
                      Sommet : Éch. {currentGrade.echelons[currentGrade.echelons.length - 1]?.numero} (IM {currentGrade.echelons[currentGrade.echelons.length - 1]?.indiceMajore})
                    </span>
                    <span className="shrink-0 text-purple-700 dark:text-purple-400">
                      {currentGrade.perspectives.length} voies d'avancement
                    </span>
                  </div>
                </div>

                {/* 3. Échelon actuel & Quotité (Thème Émeraude) - S'étend sur 2 colonnes sur tablette/fenêtre réduite */}
                <div className="md:col-span-2 xl:col-span-1 bg-gradient-to-b from-emerald-50/90 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/20 border-2 border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <label className="block font-black text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm tracking-wide uppercase truncate">
                          Échelon Détenu
                        </label>
                      </div>
                      <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs shrink-0">
                        IM {currentEchelon.indiceMajore}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <select
                          value={formData.echelonActuel}
                          onChange={(e) => setFormData({ ...formData, echelonActuel: Number(e.target.value) })}
                          className="w-full bg-emerald-50/70 hover:bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3 border-2 border-emerald-200 dark:border-emerald-700/60 hover:border-emerald-400 dark:hover:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all cursor-pointer truncate"
                        >
                          {currentGrade.echelons.map((ech) => (
                            <option key={ech.numero} value={ech.numero} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                              Échelon {ech.numero} (IB {ech.indiceBrut} - IM {ech.indiceMajore})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <select
                          value={formData.quotiteActuelle}
                          onChange={(e) => setFormData({ ...formData, quotiteActuelle: Number(e.target.value) })}
                          className="w-full bg-emerald-50/70 hover:bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3 border-2 border-emerald-200 dark:border-emerald-700/60 hover:border-emerald-400 dark:hover:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all cursor-pointer truncate"
                        >
                          <option value={100} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Temps plein (100%)</option>
                          <option value={90} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Temps partiel (90%)</option>
                          <option value={80} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Temps partiel (80%)</option>
                          <option value={70} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Temps partiel (70%)</option>
                          <option value={50} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Mi-temps (50%)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-emerald-100/90 dark:border-emerald-950/80 flex items-center justify-between gap-2 flex-wrap text-xs text-emerald-950 dark:text-emerald-200 font-bold">
                    <span>Durée statutaire : {currentEchelon.dureeAnnees} an{currentEchelon.dureeAnnees > 1 ? "s" : ""}</span>
                    <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 shrink-0">
                      IB {currentEchelon.indiceBrut}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rémunération de base calculée */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
                      Traitement de base indiciaire calculé
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Calculé sur la base de l'Indice Majoré (IM {currentEchelon.indiceMajore}) et de la valeur du point (~4,92 €).
                  </p>
                </div>

                <div className="text-left sm:text-right sm:border-l sm:border-indigo-500/20 sm:pl-6 shrink-0">
                  <div className="text-2xl sm:text-3xl font-black text-indigo-700 dark:text-indigo-300 tracking-tight">
                    ~{Math.round(traitementCalcule)} € <span className="text-xs font-bold text-slate-500">brut / mois</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    (Hors primes, RIFSEEP et suppléments)
                  </div>
                </div>
              </div>

              {/* Bouton pour valider le bloc 2 et afficher le bloc 3 */}
              <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
                {unlockedStep > 2 ? (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Étape 2 validée ({currentGrade.nom} • Échelon {formData.echelonActuel})
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    Vérifiez votre grade et échelon pour déverrouiller la dernière étape
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleValidateStep2}
                  className="group px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] text-white dark:text-black shadow-sm flex items-center gap-2.5 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>{unlockedStep > 2 ? "Accéder à l'Étape 3 : Dates d'ancienneté" : "Valider et passer à l'Étape 3"}</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Section 3 : Dates d ancienneté (Révélée après bloc 2) */}
          {unlockedStep >= 3 && (
            <div id="section-3" className="space-y-6 scroll-mt-24 animate-fadeIn pt-6 border-t border-black/[0.05] dark:border-white/[0.06]">
              <div className="pb-4 border-b border-black/[0.05] dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-lime-cream text-ebony font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
                      <Calendar className="w-5 h-5 text-muted-teal dark:text-lime-cream" />
                      Vos Dates d'Ancienneté
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Données déterminant précisément l'ouverture de vos droits à avancement d'échelon et de grade
                    </p>
                  </div>
                </div>
              </div>

              {/* Les 4 blocs dates répartis 2 par ligne */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {/* 1. Date effet échelon actuel (Thème Émeraude) + Reliquat */}
                <DateFieldWithYear
                  label={`À quelle date es-tu passé(e) à l'échelon ${formData.echelonActuel} ?`}
                  value={formData.dateEffetEchelonActuel}
                  onChange={(val) => setFormData({ ...formData, dateEffetEchelonActuel: val })}
                  minYear={1990}
                  maxYear={2026}
                  hint="Date indiquée sur ton dernier arrêté d'avancement d'échelon"
                  required
                  cardMode
                  themeColor="emerald"
                  icon={<TrendingUp className="w-4 h-4" />}
                  badgeLabel={`Éch. ${formData.echelonActuel}`}
                >
                  {/* Ancienneté conservée (Thème Ambre intégré) */}
                  <div className="bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <label className="font-bold text-amber-900 dark:text-amber-300 text-xs">
                          As-tu un reliquat d'ancienneté ?
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <input
                        type="number"
                        min={0}
                        max={48}
                        value={formData.ancienneteConserveeMois || 0}
                        onChange={(e) => setFormData({ ...formData, ancienneteConserveeMois: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm rounded-md px-2 py-1 border border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                      <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">mois</span>
                    </div>
                    
                    <p className="text-[10px] text-amber-700/80 dark:text-amber-500/80 leading-tight">
                      C'est le nombre de mois conservés indiqué sur ton dernier arrêté. Laisse 0 si tu n'en as pas.
                    </p>
                  </div>
                </DateFieldWithYear>

                {/* 2. Nomination dans le grade (Thème Violet) */}
                <DateFieldWithYear
                  label={`Depuis quand es-tu dans le grade de ${currentGrade.nom.split(' (')[0]} ?`}
                  value={formData.dateNominationGradeActuel}
                  onChange={(val) => setFormData({ ...formData, dateNominationGradeActuel: val })}
                  minYear={1975}
                  maxYear={2026}
                  hint="La date à laquelle tu as été nommé(e) dans ton grade actuel"
                  required
                  cardMode
                  themeColor="purple"
                  icon={<Award className="w-3.5 h-3.5" />}
                  badgeLabel="Grade"
                />

                {/* 3. Ancienneté dans le cadre d'emplois (Thème Orange CFDT) */}
                <DateFieldWithYear
                  label={`Depuis quand es-tu dans le cadre d'emplois : ${currentCadre.nom} ?`}
                  value={formData.dateEntreeCadreEmploi || formData.dateNominationGradeActuel}
                  onChange={(val) => setFormData({ ...formData, dateEntreeCadreEmploi: val })}
                  minYear={1965}
                  maxYear={2026}
                  hint={`Ta première nomination dans la catégorie ${currentCadre.categorie}`}
                  required
                  cardMode
                  themeColor="orange"
                  icon={<Briefcase className="w-3.5 h-3.5" />}
                  badgeLabel={`Cat. ${currentCadre.categorie}`}
                />

                {/* 4. Entrée Fonction Publique (Thème Indigo) */}
                <DateFieldWithYear
                  label="Quand es-tu entré(e) dans la Fonction Publique ?"
                  value={formData.dateEntreeFonctionPublique}
                  onChange={(val) => setFormData({ ...formData, dateEntreeFonctionPublique: val })}
                  minYear={1965}
                  maxYear={2026}
                  highlightYear={1998}
                  hint="La date de tes tous premiers pas dans la fonction publique, tous statuts confondus"
                  required
                  cardMode
                  themeColor="indigo"
                  icon={<ShieldCheck className="w-3.5 h-3.5" />}
                  badgeLabel="FP"
                />
              </div>

              {/* Bouton de soumission Lancer la simulation placé avant le bloc Disclaimer */}
              <div className="pt-6 border-t border-black/[0.05] dark:border-white/[0.06] space-y-6">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="group w-full sm:w-auto bg-gradient-to-r from-tangerine via-apricot to-tangerine hover:brightness-105 text-ebony text-sm font-extrabold px-8 py-3.5 rounded-full shadow-md shadow-tangerine/30 hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Lancer la simulation</span>
                    <span className="w-6 h-6 rounded-full bg-ebony/15 text-ebony flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>

                <DisclaimerBanner />
              </div>
            </div>
          )}

        </div>
      </form>
    </div>
  );
};
