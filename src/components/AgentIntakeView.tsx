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
  FileText
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
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-7 lg:p-8 shadow-xs border border-slate-800/90 relative overflow-hidden">
        {/* Lueur subtile en arrière-plan */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ESPACE DE SAISIE PERSONNALISÉE
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
            Renseignez votre situation pour simuler votre carrière
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
            Remplissez ce formulaire pour générer votre frise chronologique prospective. L outil calculera vos passages d échelon garantis, votre promouvabilité de grade, et l impact réel de vos projets (temps partiel, disponibilité, congé parental, examen pro).
          </p>
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
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 sm:p-7 lg:p-8 space-y-8 sm:space-y-10">
        
        {/* Section 1 : Identité & Statut administratif (Thème Bleu) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                1
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Votre Identité & Statut Administratif
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Informations de base et cadre statutaire de référence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs sm:text-sm bg-blue-50 text-blue-900 border border-blue-200/90 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Building2 className="w-4 h-4 text-blue-600" />
                Collectivité de Gennevilliers
              </span>
              <span className="text-xs sm:text-sm bg-slate-100 text-slate-800 font-extrabold px-2.5 py-1 rounded-full border border-slate-200/70">
                FPT
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-start gap-5 text-sm">
            <div className="w-full sm:w-56 md:w-64 shrink-0">
              <label className="block font-bold text-slate-800 mb-1.5 text-sm">Votre Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                placeholder="Ex: Atlas, Sophie, Karim..."
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold text-sm sm:text-base focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
                required
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Prénom de l agent
              </p>
            </div>

            <div className="w-full sm:w-80 md:w-96">
              <label className="block font-bold text-slate-800 mb-1.5 text-sm">Statut juridique</label>
              <select
                value={formData.statut}
                onChange={(e) => handleStatutChange(e.target.value as StatutAgent)}
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold text-sm sm:text-base focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs cursor-pointer"
              >
                <option value="titulaire">Fonctionnaire Titulaire</option>
                <option value="stagiaire">Fonctionnaire Stagiaire (en cours de stage probatoire)</option>
                <option value="contractuel_cdi">Contractuel de droit public en CDI</option>
                <option value="contractuel_cdd">Contractuel de droit public en CDD</option>
              </select>
              <p className="text-xs text-slate-500 mt-1.5">
                Régit les conditions d avancement selon le CGFP.
              </p>
              {formData.statut.startsWith("contractuel") && (
                <div className="mt-2 text-xs text-amber-900 bg-amber-50/90 border border-amber-200 rounded-lg p-2.5 leading-relaxed">
                  <strong>Régime contractuel (Décret 88-145) :</strong> Rémunération par assimilation indiciaire sur le grade d accès initial.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 : Cadre d emplois, Grade, Échelon & Traitement calculé (Thème Indigo) */}
        <div>
          <div className="pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                2
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Votre Cadre d emplois, Grade & Position Indiciaire
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Position statutaire actuelle déterminant votre grille indiciaire et votre salaire de base
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-sm">
            {/* 1. Cadre d'emplois (Thème Bleu Roi / Indigo) */}
            <div className="bg-gradient-to-b from-blue-50/90 via-white to-blue-50/40 border-2 border-blue-300 hover:border-blue-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-600 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <label className="block font-black text-blue-950 text-sm sm:text-base tracking-wide uppercase">
                      Cadre d emplois
                    </label>
                  </div>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 shadow-2xs shrink-0">
                    Cat. {currentCadre.categorie}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={formData.cadreEmploiId}
                    onChange={(e) => handleCadreChange(e.target.value)}
                    className="w-full bg-white text-slate-900 font-extrabold text-sm sm:text-base rounded-xl px-3.5 py-3 border-2 border-blue-200 hover:border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all cursor-pointer"
                  >
                    {CADRES_EMPLOIS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nom} (Catégorie {c.categorie})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-blue-100/90 flex items-center justify-between text-xs text-blue-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>{currentCadre.grades.length} grades statutaires</span>
                </span>
                <span className="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded font-mono text-[11px]">
                  FPT
                </span>
              </div>
            </div>

            {/* 2. Grade actuel (Thème Violet Royal / Améthyste) */}
            <div className="bg-gradient-to-b from-purple-50/90 via-white to-purple-50/40 border-2 border-purple-300 hover:border-purple-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-600 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <label className="block font-black text-purple-950 text-sm sm:text-base tracking-wide uppercase">
                      Grade actuel
                    </label>
                  </div>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 shadow-2xs shrink-0">
                    {currentCadre.grades.findIndex((g) => g.id === currentGrade.id) === 0 ? "1er grade (Accès)" : `${currentCadre.grades.findIndex((g) => g.id === currentGrade.id) + 1}e grade (Avancement)`}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={formData.gradeId}
                    onChange={(e) => handleGradeChange(e.target.value)}
                    className="w-full bg-white text-slate-900 font-extrabold text-sm sm:text-base rounded-xl px-3.5 py-3 border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 shadow-2xs transition-all cursor-pointer"
                  >
                    {currentCadre.grades.map((g) => {
                      const isAvancement = isGradeAvancement(currentCadre, g.id);
                      const isContractuel = formData.statut.startsWith("contractuel");
                      const isDisabled = isContractuel && isAvancement;
                      return (
                        <option key={g.id} value={g.id} disabled={isDisabled}>
                          {g.nom} {isDisabled ? "— (Réservé aux fonctionnaires titulaires)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {formData.statut.startsWith("contractuel") && (
                  <p className="text-xs text-amber-900 mt-2 font-medium leading-normal bg-amber-50 p-2 rounded-lg border border-amber-200">
                    ℹ️ Un agent contractuel ne peut être recruté que sur le 1er grade d accès. Les grades d avancement sont réservés aux titulaires.
                  </p>
                )}
              </div>

              {!formData.statut.startsWith("contractuel") && (
                <div className="mt-3 pt-2.5 border-t border-purple-100/90 flex items-center justify-between text-xs text-purple-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <span>{currentGrade.echelons.length} échelons</span>
                  </span>
                  <span className="bg-purple-100/80 text-purple-800 px-2 py-0.5 rounded font-mono text-[11px]">
                    Actif
                  </span>
                </div>
              )}
            </div>

            {/* 3. Échelon actuel (Thème Émeraude / Menthe) */}
            <div className="bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/40 border-2 border-emerald-300 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 focus-within:ring-4 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <label className="block font-black text-emerald-950 text-sm sm:text-base tracking-wide uppercase">
                      Échelon actuel
                    </label>
                  </div>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-2xs shrink-0">
                    IM {currentEchelon.indiceMajore}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={formData.echelonActuel}
                    onChange={(e) => setFormData({ ...formData, echelonActuel: Number(e.target.value) })}
                    className="w-full bg-white text-slate-900 font-black text-sm sm:text-base rounded-xl px-3.5 py-3 border-2 border-emerald-200 hover:border-emerald-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all cursor-pointer"
                  >
                    {currentGrade.echelons.map((ech) => (
                      <option key={ech.numero} value={ech.numero}>
                        {ech.numero}e échelon (IM {ech.indiceMajore} - IB {ech.indiceBrut})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-emerald-100/90 flex items-center justify-between text-xs text-emerald-950 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>
                    Durée : {formData.statut.startsWith("contractuel") ? "3 ans (triennale)" : `${currentEchelon.dureeAnnees} an(s)`}
                  </span>
                </span>
                <span className="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded font-mono text-[11px]">
                  IB {currentEchelon.indiceBrut}
                </span>
              </div>
            </div>
          </div>

          {/* Calculateur en direct indiciaire et salarial (Card Exécutive) */}
          <div className="mt-5 bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/70 border-2 border-indigo-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                IM
              </div>
              <div>
                <div className="text-sm text-indigo-950 font-bold flex items-center gap-2 flex-wrap">
                  <span>Indice Majoré : <strong className="text-indigo-700 text-base sm:text-lg font-black">{currentEchelon.indiceMajore}</strong> (IB {currentEchelon.indiceBrut})</span>
                  <span className="bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {formData.statut.startsWith("contractuel") 
                      ? "Périodicité réévaluation : 3 ans (Décret 88-145)" 
                      : `Durée d échelon : ${currentEchelon.dureeAnnees} an(s)`}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  Point d indice officiel : 4,92278 € / mois
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right sm:border-l sm:border-indigo-200/80 sm:pl-6 shrink-0">
              <div className="text-xs text-indigo-900 uppercase font-black tracking-wider">
                Traitement indiciaire brut de base :
              </div>
              <div className="text-2xl sm:text-4xl font-black text-indigo-950 tracking-tight mt-0.5">
                {Math.round(traitementCalcule)} €
                <span className="text-sm font-semibold text-slate-500 ml-1.5">/ mois</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                (Hors primes, RIFSEEP et supplément familial de traitement)
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 : Dates d ancienneté (Thème Émeraude) */}
        <div>
          <div className="pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                3
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Vos Dates d Ancienneté
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Données déterminant précisément l ouverture de vos droits à avancement d échelon et de grade
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 text-sm">
            <DateFieldWithYear
              label="Date effet échelon actuel"
              value={formData.dateEffetEchelonActuel}
              onChange={(val) => setFormData({ ...formData, dateEffetEchelonActuel: val })}
              minYear={1990}
              maxYear={2026}
              hint="Prise d effet de l échelon détenu"
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-slate-800 text-sm">Ancienneté conservée (mois)</label>
              </div>
              <input
                type="number"
                min="0"
                max="36"
                value={formData.ancienneteConserveeMois}
                onChange={(e) => setFormData({ ...formData, ancienneteConserveeMois: Number(e.target.value) })}
                className="w-full bg-slate-50/90 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
              />
              <span className="text-xs text-slate-500 mt-1.5 block leading-normal">
                Si vous avez un reliquat mentionné sur votre arrêté : vous saisissez ce nombre de mois (ex: 6 ou 8).
              </span>
            </div>

            <DateFieldWithYear
              label="Nomination grade actuel"
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
              hint="Nomination dans le grade actuel"
              required
            />

            <DateFieldWithYear
              label={`Accès Cadre (Cat. ${currentCadre.categorie})`}
              value={formData.dateEntreeCadreEmploi || formData.dateNominationGradeActuel}
              onChange={(val) => setFormData({ ...formData, dateEntreeCadreEmploi: val })}
              minYear={1965}
              maxYear={2026}
              hint={`Entrée en catégorie ${currentCadre.categorie} (ex: 2024)`}
              required
            />

            <DateFieldWithYear
              label="Entrée dans la Fonction Publique"
              value={formData.dateEntreeFonctionPublique}
              onChange={(val) => setFormData({ ...formData, dateEntreeFonctionPublique: val })}
              minYear={1965}
              maxYear={2026}
              highlightYear={1998}
              hint="Tous services publics (ex: début en B ou C)"
              required
            />
          </div>
        </div>

        {/* Bloc SIMULATION INFORMATIVE & STATUTAIRE */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <DisclaimerBanner />

          {/* Bouton de soumission principal */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm font-extrabold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
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
