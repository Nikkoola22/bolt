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
  ShieldCheck
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

    // Si on passe contractuel et que le grade actuel est un grade d'avancement, on réinitialise au grade d'accès
    if (isNewContractuel && isGradeAvancement(currentCadre, formData.gradeId)) {
      targetGradeId = currentCadre.grades[0].id;
      targetEchelon = 1;
    }

    // Filtrer les événements incompatibles avec le statut contractuel (examen pro d'avancement, disponibilité)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      
      {/* Block ESPACE DE SAISIE PERSONNALISÉE tout en haut */}
      <div className="bg-gradient-to-r from-slate-950 via-stone-900 to-orange-950/80 text-white rounded-2xl p-4 sm:p-7 lg:p-8 shadow-xs border border-slate-800/90 relative overflow-hidden">
        {/* Lueur subtile en arrière-plan */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 border border-orange-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ESPACE DE SAISIE PERSONNALISÉE
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
            Renseignez votre situation pour simuler votre carrière
          </h1>

        </div>

        {/* Flash info : Munissez-vous de votre dernier arrêté et de votre bulletin de paie */}
        <div className="relative mt-6 pt-5 border-t border-slate-800/80">
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/25 via-amber-400/15 to-orange-500/20 border-2 border-amber-400/60 hover:border-amber-300 rounded-2xl p-4 sm:p-5 shadow-lg shadow-amber-500/10 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 group">
            
            {/* Lueur d'ambiance dorée en arrière-plan */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/30 transition-all"></div>

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
              
              {/* Badge Icone Éclair Néon Doré */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/40 ring-2 ring-amber-300/60 shrink-0">
                  <Zap className="w-6 h-6 fill-slate-950 stroke-slate-950" />
                </div>
                
                {/* Badge FLASH en mobile */}
                <div className="sm:hidden flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-black text-amber-950 uppercase tracking-widest text-xs px-3 py-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 border border-amber-200 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-950 animate-ping"></span>
                    ⚡ FLASH
                  </span>
                </div>
              </div>

              {/* Contenu textuel agrandi avec documents stylisés */}
              <div className="flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="hidden sm:inline-flex items-center gap-1.5 font-black text-amber-950 uppercase tracking-widest text-xs px-3 py-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 border border-amber-200 shadow-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-950 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-950"></span>
                    </span>
                    ⚡ FLASH
                  </span>
                  <span className="text-amber-300 font-extrabold text-xs tracking-wider uppercase">
                    Documents recommandés pour votre simulation
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-100 mt-2 leading-relaxed">
                  Munissez-vous de votre{" "}
                  <span className="inline-flex items-center gap-1.5 bg-amber-400/25 hover:bg-amber-400/35 text-amber-100 border border-amber-300/60 px-2.5 py-0.5 rounded-lg font-black shadow-2xs transition-colors">
                    <FileText className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    dernier arrêté
                  </span>{" "}
                  et de votre{" "}
                  <span className="inline-flex items-center gap-1.5 bg-amber-400/25 hover:bg-amber-400/35 text-amber-100 border border-amber-300/60 px-2.5 py-0.5 rounded-lg font-black shadow-2xs transition-colors">
                    <FileText className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    bulletin de paie
                  </span>{" "}
                  pour faciliter votre saisie.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de saisie principal */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-4 sm:p-7 lg:p-8 space-y-8 sm:space-y-10">
        
        {/* Section 1 : Identité & Statut administratif (Thème Orange CFDT) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                1
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Votre Identité & Statut Administratif
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Informations de base et cadre statutaire de référence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs sm:text-sm bg-orange-50 dark:bg-orange-950/60 text-orange-950 dark:text-orange-200 border border-orange-200/90 dark:border-orange-800/60 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Building2 className="w-4 h-4 text-orange-600" />
                Collectivité de Gennevilliers
              </span>
              <span className="text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold px-2.5 py-1 rounded-full border border-slate-200/70 dark:border-slate-700">
                FPT
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-start gap-5 text-sm">
            <div className="w-full sm:w-56 md:w-64 shrink-0">
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5 text-sm">Votre Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                placeholder="Ex: Atlas, Sophie, Karim..."
                className="w-full bg-slate-50/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:bg-white dark:focus:bg-slate-850 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-2xs"
                required
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                Prénom de l agent
              </p>
            </div>

            <div className="w-full sm:w-80 md:w-96">
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5 text-sm">Statut juridique</label>
              <select
                value={formData.statut}
                onChange={(e) => handleStatutChange(e.target.value as StatutAgent)}
                className="w-full bg-slate-50/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:bg-white dark:focus:bg-slate-850 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs cursor-pointer"
              >
                <option value="titulaire" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Fonctionnaire Titulaire</option>
                <option value="stagiaire" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Fonctionnaire Stagiaire (en cours de stage probatoire)</option>
                <option value="contractuel_cdi" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Contractuel de droit public en CDI</option>
                <option value="contractuel_cdd" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Contractuel de droit public en CDD</option>
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                Régit les conditions d avancement selon le CGFP.
              </p>
              {formData.statut.startsWith("contractuel") && (
                <div className="mt-2 text-xs text-amber-900 dark:text-amber-200 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg p-2.5 leading-relaxed">
                  <strong>Régime contractuel (Décret 88-145) :</strong> Rémunération par assimilation indiciaire sur le grade d accès initial.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 : Cadre d emplois, Grade, Échelon & Traitement calculé (Thème Indigo) */}
        <div>
          <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                2
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Votre Cadre d emplois, Grade & Position Indiciaire
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Position statutaire actuelle déterminant votre grille indiciaire et votre salaire de base
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-sm">
            {/* 1. Cadre d'emplois (Thème Orange CFDT) */}
            <div className="bg-gradient-to-b from-orange-50/90 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/20 border-2 border-orange-300 dark:border-orange-700/60 hover:border-orange-500 dark:hover:border-orange-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 focus-within:ring-4 focus-within:ring-orange-500/20 focus-within:border-orange-600 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <label className="block font-black text-orange-950 dark:text-orange-200 text-sm sm:text-base tracking-wide uppercase">
                      Cadre d emplois
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
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm sm:text-base rounded-xl px-3.5 py-3 border-2 border-orange-200 dark:border-orange-700/60 hover:border-orange-400 dark:hover:border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-500/20 shadow-2xs transition-all cursor-pointer"
                  >
                    {["Administrative", "Technique", "Médico-sociale", "Culturelle"].map((fil) => {
                      const cadresInFil = CADRES_EMPLOIS.filter((c) => c.filiere === fil);
                      if (cadresInFil.length === 0) return null;
                      return (
                        <optgroup key={fil} label={`Filière ${fil}`} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
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

              <div className="mt-3 pt-2.5 border-t border-orange-100/90 dark:border-orange-950/80 flex items-center justify-between text-xs text-orange-950 dark:text-orange-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span>{currentCadre.grades.length} grades statutaires</span>
                </span>
                <span className="bg-orange-100/80 dark:bg-orange-950/70 text-orange-900 dark:text-orange-300 px-2 py-0.5 rounded font-mono text-[11px]">
                  Filière {currentCadre.filiere}
                </span>
              </div>
            </div>

            {/* 2. Grade actuel (Thème Violet Royal / Améthyste) */}
            <div className="bg-gradient-to-b from-purple-50/90 via-white to-purple-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-purple-950/20 border-2 border-purple-300 dark:border-purple-700/60 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-600 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <label className="block font-black text-purple-950 dark:text-purple-200 text-sm sm:text-base tracking-wide uppercase">
                      Grade actuel
                    </label>
                  </div>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-700 shadow-2xs shrink-0">
                    {currentCadre.grades.findIndex((g) => g.id === currentGrade.id) === 0 ? "1er grade (Accès)" : `${currentCadre.grades.findIndex((g) => g.id === currentGrade.id) + 1}e grade (Avancement)`}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={formData.gradeId}
                    onChange={(e) => handleGradeChange(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm sm:text-base rounded-xl px-3.5 py-3 border-2 border-purple-200 dark:border-purple-700/60 hover:border-purple-400 dark:hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 shadow-2xs transition-all cursor-pointer"
                  >
                    {currentCadre.grades.map((g) => {
                      const isAvancement = isGradeAvancement(currentCadre, g.id);
                      const isContractuel = formData.statut.startsWith("contractuel");
                      const isDisabled = isContractuel && isAvancement;
                      return (
                        <option key={g.id} value={g.id} disabled={isDisabled} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          {g.nom} {isDisabled ? "— (Réservé aux fonctionnaires titulaires)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {formData.statut.startsWith("contractuel") && (
                  <p className="text-xs text-amber-900 dark:text-amber-200 mt-2 font-medium leading-normal bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-800/60">
                    ℹ️ Un agent contractuel ne peut être recruté que sur le 1er grade d accès. Les grades d avancement sont réservés aux titulaires.
                  </p>
                )}
              </div>

              {!formData.statut.startsWith("contractuel") && (
                <div className="mt-3 pt-2.5 border-t border-purple-100/90 dark:border-purple-950/80 flex items-center justify-between text-xs text-purple-900 dark:text-purple-200 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <span>{currentGrade.echelons.length} échelons</span>
                  </span>
                  <span className="bg-purple-100/80 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded font-mono text-[11px]">
                    Actif
                  </span>
                </div>
              )}
            </div>

            {/* 3. Échelon actuel (Thème Émeraude / Menthe) */}
            <div className="bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 focus-within:ring-4 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <label className="block font-black text-emerald-950 dark:text-emerald-200 text-sm sm:text-base tracking-wide uppercase">
                      Échelon actuel
                    </label>
                  </div>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs shrink-0">
                    IM {currentEchelon.indiceMajore}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={formData.echelonActuel}
                    onChange={(e) => setFormData({ ...formData, echelonActuel: Number(e.target.value) })}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm sm:text-base rounded-xl px-3.5 py-3 border-2 border-emerald-200 dark:border-emerald-700/60 hover:border-emerald-400 dark:hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all cursor-pointer"
                  >
                    {currentGrade.echelons.map((ech) => (
                      <option key={ech.numero} value={ech.numero} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                        {ech.numero}e échelon (IM {ech.indiceMajore} - IB {ech.indiceBrut})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-emerald-100/90 dark:border-emerald-950/80 flex items-center justify-between text-xs text-emerald-950 dark:text-emerald-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>
                    Durée : {formData.statut.startsWith("contractuel") ? "3 ans (triennale)" : `${currentEchelon.dureeAnnees} an(s)`}
                  </span>
                </span>
                <span className="bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono text-[11px]">
                  IB {currentEchelon.indiceBrut}
                </span>
              </div>
            </div>
          </div>

          {/* Calculateur en direct indiciaire et salarial (Card Exécutive) */}
          <div className="mt-5 bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/70 dark:from-indigo-950/40 dark:via-slate-900 dark:to-blue-950/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                IM
              </div>
              <div>
                <div className="text-sm text-indigo-950 dark:text-indigo-200 font-bold flex items-center gap-2 flex-wrap">
                  <span>Indice Majoré : <strong className="text-indigo-700 dark:text-indigo-300 text-base sm:text-lg font-black">{currentEchelon.indiceMajore}</strong> (IB {currentEchelon.indiceBrut})</span>
                  <span className="bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {formData.statut.startsWith("contractuel") 
                      ? "Périodicité réévaluation : 3 ans (Décret 88-145)" 
                      : `Durée d échelon : ${currentEchelon.dureeAnnees} an(s)`}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  Point d indice officiel : 4,92278 € / mois
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right sm:border-l sm:border-indigo-200/80 dark:sm:border-indigo-800/80 sm:pl-6 shrink-0">
              <div className="text-xs text-indigo-900 dark:text-indigo-300 uppercase font-black tracking-wider">
                Traitement indiciaire brut de base :
              </div>
              <div className="text-2xl sm:text-4xl font-black text-indigo-950 dark:text-indigo-100 tracking-tight mt-0.5">
                {Math.round(traitementCalcule)} €
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1.5">/ mois</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                (Hors primes, RIFSEEP et supplément familial de traitement)
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 : Dates d ancienneté (Thème Émeraude) */}
        <div>
          <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                3
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Vos Dates d Ancienneté
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Données déterminant précisément l ouverture de vos droits à avancement d échelon et de grade
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            {/* Ligne 1 : Échelon actuel & Reliquat d'ancienneté (2 cartes statutaires spacieuses) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Date effet échelon actuel (Thème Émeraude) */}
              <DateFieldWithYear
                label="Date effet échelon actuel"
                value={formData.dateEffetEchelonActuel}
                onChange={(val) => setFormData({ ...formData, dateEffetEchelonActuel: val })}
                minYear={1990}
                maxYear={2026}
                hint="Prise d effet de l échelon détenu"
                required
                cardMode
                themeColor="emerald"
                icon={<TrendingUp className="w-4 h-4" />}
                badgeLabel={`Éch. ${formData.echelonActuel}`}
              />

              {/* 2. Ancienneté conservée (Thème Ambre) */}
              <div className="border-2 border-amber-300 dark:border-amber-700/60 hover:border-amber-500 dark:hover:border-amber-400 bg-gradient-to-b from-amber-50/90 via-white to-amber-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-amber-950/20 rounded-xl p-3 sm:p-3.5 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center shadow-2xs shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <label className="block font-black text-amber-950 dark:text-amber-200 text-xs tracking-wide uppercase truncate" title="Ancienneté conservée (mois)">
                        Ancienneté conservée
                      </label>
                    </div>
                    <span className="text-[11px] font-mono font-black px-1.5 py-0.5 rounded shadow-2xs bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shrink-0">
                      {formData.ancienneteConserveeMois || 0} mois
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="number"
                      min="0"
                      max="36"
                      value={formData.ancienneteConserveeMois}
                      onChange={(e) => setFormData({ ...formData, ancienneteConserveeMois: Number(e.target.value) })}
                      className="w-20 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-white font-bold text-xs text-center focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
                    />
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300">mois</span>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight">
                  Si mentionné sur votre arrêté (ex: 6 ou 8).
                </div>
              </div>
            </div>

            {/* Ligne 2 : Parcours statutaire, Cadre d'emploi & Carrière (3 cartes statutaires spacieuses) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 3. Nomination grade actuel (Thème Violet) */}
              <DateFieldWithYear
                label="Nomination grade actuel"
                subLabel={currentGrade.nom}
                value={formData.dateNominationGradeActuel}
                onChange={(val) => {
                  const prevNom = formData.dateNominationGradeActuel;
                  const wasCadreSynced = !formData.dateEntreeCadreEmploi || formData.dateEntreeCadreEmploi === prevNom;
                  setFormData({ 
                    ...formData, 
                    dateNominationGradeActuel: val,
                    dateEntreeCadreEmploi: wasCadreSynced ? val : formData.dateEntreeCadreEmploi
                  });
                }}
                minYear={1965}
                maxYear={2026}
                hint={`Date de votre arrêté de nomination dans le grade actuel (${currentGrade.nom})`}
                required
                cardMode
                themeColor="purple"
                icon={<Award className="w-3.5 h-3.5" />}
                badgeLabel="Grade"
              />

              {/* 4. Ancienneté dans ton cadre d'emploi (Thème Orange CFDT) */}
              <DateFieldWithYear
                label="Ancienneté dans ton cadre d'emploi"
                subLabel={currentCadre.nom}
                value={formData.dateEntreeCadreEmploi || formData.dateNominationGradeActuel}
                onChange={(val) => setFormData({ ...formData, dateEntreeCadreEmploi: val })}
                minYear={1965}
                maxYear={2026}
                hint={`Entrée en catégorie ${currentCadre.categorie} (ex: 2024)`}
                required
                cardMode
                themeColor="orange"
                icon={<Briefcase className="w-3.5 h-3.5" />}
                badgeLabel={`Cat. ${currentCadre.categorie}`}
              />

              {/* 5. Entrée Fonction Publique (Thème Indigo) */}
              <DateFieldWithYear
                label="Entrée Fonction Publique"
                value={formData.dateEntreeFonctionPublique}
                onChange={(val) => setFormData({ ...formData, dateEntreeFonctionPublique: val })}
                minYear={1965}
                maxYear={2026}
                highlightYear={1998}
                hint="Tous services publics (ex: début en B ou C)"
                required
                cardMode
                themeColor="indigo"
                icon={<ShieldCheck className="w-3.5 h-3.5" />}
                badgeLabel="FP"
              />
            </div>
          </div>
        </div>

        {/* Bloc SIMULATION INFORMATIVE & STATUTAIRE */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <DisclaimerBanner />

          {/* Bouton de soumission principal */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-extrabold px-8 py-3.5 rounded-xl shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 ring-2 ring-orange-400/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Lancer la simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
