import React, { useState, useEffect } from "react";
import type { ProfilAgent, StatutAgent } from "../types/career";
import { CADRES_EMPLOIS } from "../data/gradesData";
import { calculateTraitementBrut, isGradeAvancement } from "../services/simulationEngine";
import { DateFieldWithYear } from "./DateFieldWithYear";
import { 
  User, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Building2,
  Zap
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

        {/* Flash info : Munissez-vous de votre dernier arrêté et votre bulletin de paie */}
        <div className="relative mt-5 pt-4 border-t border-slate-800/80">
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-orange-500/15 border border-amber-400/30 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-3 backdrop-blur-xs">
            <span className="p-2 rounded-lg bg-amber-400/20 text-amber-300 shrink-0 border border-amber-400/30 shadow-2xs">
              <Zap className="w-4 h-4" />
            </span>
            <div className="text-xs">
              <span className="inline-flex items-center font-extrabold text-amber-300 uppercase tracking-wider text-[10px] mr-2 px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/30 mb-1 sm:mb-0">
                ⚡ Flash
              </span>
              <span className="font-semibold text-slate-100">
                Munissez-vous de votre <strong className="text-white font-black underline decoration-amber-400/50 underline-offset-2">dernier arrêté</strong> et de votre <strong className="text-white font-black underline decoration-amber-400/50 underline-offset-2">bulletin de paie</strong> pour faciliter votre saisie.
              </span>
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
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-xs shrink-0">
                1
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Votre Identité & Statut Administratif
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Informations de base et cadre statutaire de référence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200/90 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Collectivité de Gennevilliers
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 font-extrabold px-2.5 py-1 rounded-full border border-slate-200/70">
                FPT
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Votre Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                placeholder="Ex: Sophie, Karim, Julie..."
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Seul le prénom est requis pour personnaliser votre simulation.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Statut juridique</label>
              <select
                value={formData.statut}
                onChange={(e) => handleStatutChange(e.target.value as StatutAgent)}
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs cursor-pointer"
              >
                <option value="titulaire">Fonctionnaire Titulaire</option>
                <option value="stagiaire">Fonctionnaire Stagiaire (en cours de stage probatoire)</option>
                <option value="contractuel_cdi">Contractuel de droit public en CDI</option>
                <option value="contractuel_cdd">Contractuel de droit public en CDD</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Régit les conditions d avancement selon le Code Général de la Fonction Publique.
              </p>
              {formData.statut.startsWith("contractuel") && (
                <div className="mt-2 text-[11px] text-amber-900 bg-amber-50/90 border border-amber-200 rounded-lg p-2.5 leading-relaxed">
                  <strong>Régime contractuel (Décret 88-145) :</strong> Rémunération par assimilation indiciaire sur le grade d accès initial. Les grades d avancement sont statutairement fermés au recrutement direct.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 : Cadre d emplois, Grade, Échelon & Traitement calculé (Thème Indigo) */}
        <div>
          <div className="pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-xs shrink-0">
                2
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  Votre Cadre d emplois, Grade & Position Indiciaire
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Position statutaire actuelle déterminant votre grille indiciaire et votre salaire de base
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Cadre d emplois</label>
              <select
                value={formData.cadreEmploiId}
                onChange={(e) => handleCadreChange(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs cursor-pointer"
              >
                {CADRES_EMPLOIS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom} (Catégorie {c.categorie})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Grade actuel</label>
              <select
                value={formData.gradeId}
                onChange={(e) => handleGradeChange(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs cursor-pointer"
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
              {formData.statut.startsWith("contractuel") && (
                <p className="text-[11px] text-amber-800 mt-1.5 font-medium leading-tight">
                  ℹ️ Un agent contractuel ne peut être recruté que sur le 1er grade d accès. Les grades d avancement sont réservés aux titulaires.
                </p>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Échelon actuel</label>
              <select
                value={formData.echelonActuel}
                onChange={(e) => setFormData({ ...formData, echelonActuel: Number(e.target.value) })}
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs cursor-pointer"
              >
                {currentGrade.echelons.map((ech) => (
                  <option key={ech.numero} value={ech.numero}>
                    {ech.numero}e échelon (IM {ech.indiceMajore} - IB {ech.indiceBrut})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Calculateur en direct indiciaire et salarial (Card Exécutive) */}
          <div className="mt-5 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 border border-indigo-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                IM
              </div>
              <div>
                <div className="text-xs text-indigo-950 font-bold flex items-center gap-2 flex-wrap">
                  <span>Indice Majoré : <strong className="text-indigo-700 text-sm font-extrabold">{currentEchelon.indiceMajore}</strong> (IB {currentEchelon.indiceBrut})</span>
                  <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                    {formData.statut.startsWith("contractuel") 
                      ? "Périodicité réévaluation : 3 ans (Décret 88-145)" 
                      : `Durée d échelon : ${currentEchelon.dureeAnnees} an(s)`}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Point d indice officiel : 4,92278 € / mois (59,0734 € / an)
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right sm:border-l sm:border-indigo-200/80 sm:pl-6 shrink-0">
              <div className="text-[10px] text-indigo-900 uppercase font-black tracking-wider">
                Traitement indiciaire brut de base :
              </div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight mt-0.5">
                {Math.round(traitementCalcule)} €
                <span className="text-xs font-medium text-slate-500 ml-1">/ mois</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                (Hors primes, RIFSEEP et supplément familial de traitement)
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 : Dates d ancienneté (Thème Émeraude) */}
        <div>
          <div className="pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs shadow-xs shrink-0">
                3
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Vos Dates d Ancienneté
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Données déterminant précisément l ouverture de vos droits à avancement d échelon et de grade
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-xs">
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
                <label className="block font-bold text-slate-800 text-xs">Ancienneté conservée (mois)</label>
              </div>
              <input
                type="number"
                min="0"
                max="36"
                value={formData.ancienneteConserveeMois}
                onChange={(e) => setFormData({ ...formData, ancienneteConserveeMois: Number(e.target.value) })}
                className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Reliquat de nomination / concours</span>
            </div>

            <DateFieldWithYear
              label="Date nomination grade actuel"
              value={formData.dateNominationGradeActuel}
              onChange={(val) => setFormData({ ...formData, dateNominationGradeActuel: val })}
              minYear={1965}
              maxYear={2026}
              hint="Nomination dans le grade actuel"
              required
            />

            <DateFieldWithYear
              label="Entrée dans la Fonction Publique"
              value={formData.dateEntreeFonctionPublique}
              onChange={(val) => setFormData({ ...formData, dateEntreeFonctionPublique: val })}
              minYear={1965}
              maxYear={2026}
              highlightYear={1998}
              hint="Année en 1 clic (ex: 1998) ou date exacte"
              required
            />
          </div>
        </div>

        {/* Bouton de soumission principal */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Simulation indicative fondée sur vos déclarations • Contrôle final par la DRH</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm font-extrabold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Lancer la simulation & afficher ma frise</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};
