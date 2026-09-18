import React, { useState } from "react";
import type { ProfilAgent, StatutAgent } from "../types/career";
import { CADRES_EMPLOIS } from "../data/gradesData";
import { isGradeAvancement } from "../services/simulationEngine";
import { DateFieldWithYear } from "./DateFieldWithYear";
import { X, Save, SlidersHorizontal, Briefcase, Award, TrendingUp } from "lucide-react";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profil: ProfilAgent;
  onSave: (nouveauProfil: ProfilAgent) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profil,
  onSave,
}) => {
  const [form, setForm] = useState<ProfilAgent>({ ...profil });

  if (!isOpen) return null;

  const currentCadre = CADRES_EMPLOIS.find((c) => c.id === form.cadreEmploiId) || CADRES_EMPLOIS[0];
  const currentGrade = currentCadre.grades.find((g) => g.id === form.gradeId) || currentCadre.grades[0];
  const currentEchelon = currentGrade.echelons.find((e) => e.numero === form.echelonActuel) || currentGrade.echelons[0];

  const handleStatutChange = (newStatut: StatutAgent) => {
    const isNewContractuel = newStatut.startsWith("contractuel");
    let targetGradeId = form.gradeId;
    let targetEchelon = form.echelonActuel;

    if (isNewContractuel && isGradeAvancement(currentCadre, form.gradeId)) {
      targetGradeId = currentCadre.grades[0].id;
      targetEchelon = 1;
    }

    const cleanedEvents = isNewContractuel
      ? form.evenementsSimules.filter(e => e.type !== "examen_professionnel" && e.type !== "disponibilite")
      : form.evenementsSimules;

    setForm({
      ...form,
      statut: newStatut,
      gradeId: targetGradeId,
      echelonActuel: targetEchelon,
      evenementsSimules: cleanedEvents,
    });
  };

  const handleCadreChange = (cadreId: string) => {
    const selectedCadre = CADRES_EMPLOIS.find((c) => c.id === cadreId) || CADRES_EMPLOIS[0];
    const defaultGrade = selectedCadre.grades[0];
    setForm({
      ...form,
      cadreEmploiId: selectedCadre.id,
      gradeId: defaultGrade.id,
      echelonActuel: Math.min(form.echelonActuel, defaultGrade.echelons.length),
    });
  };

  const handleGradeChange = (gradeId: string) => {
    const selectedGrade = currentCadre.grades.find((g) => g.id === gradeId) || currentCadre.grades[0];
    setForm({
      ...form,
      gradeId: selectedGrade.id,
      echelonActuel: Math.min(form.echelonActuel, selectedGrade.echelons.length),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      collectivite: "Collectivité de Gennevilliers",
      versant: "FPT",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg text-white">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Paramétrer ma situation statutaire
              </h3>
              <p className="text-xs text-slate-400">
                Ajustez votre cadre d emplois, grade, échelon et dates d effet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-800 dark:text-slate-100">
          
          {/* Identité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Votre Prénom</label>
              <input
                type="text"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500 font-medium text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200/90 dark:border-orange-800/60 rounded-lg p-2.5 text-xs text-orange-950 dark:text-orange-200">
              <span className="font-bold block">Collectivité de Gennevilliers</span>
              <span className="text-orange-700 dark:text-orange-400 text-[11px]">Fonction Publique Territoriale (FPT)</span>
            </div>
          </div>

          {/* Cadre & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            {/* Cadre d'emplois */}
            <div className="bg-gradient-to-b from-orange-50/90 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/30 border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 focus-within:border-orange-600 focus-within:ring-2 focus-within:ring-orange-500/20 rounded-xl p-3.5 shadow-2xs transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-orange-950 dark:text-orange-200 text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  Cadre d emplois
                </label>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-950 dark:text-orange-200 border border-orange-300 dark:border-orange-800">
                  Cat. {currentCadre.categorie}
                </span>
              </div>
              <select
                value={form.cadreEmploiId}
                onChange={(e) => handleCadreChange(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-orange-300/80 dark:border-orange-700 rounded-lg px-3 py-2 font-extrabold text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-2xs cursor-pointer"
              >
                {["Administrative", "Technique", "Animation", "Médico-sociale", "Culturelle"].map((fil) => {
                  const cadresInFil = CADRES_EMPLOIS.filter((c) => c.filiere === fil);
                  if (cadresInFil.length === 0) return null;
                  return (
                    <optgroup key={fil} label={`Filière ${fil}`}>
                      {cadresInFil.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nom} (Cat. {c.categorie})
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>

            {/* Grade actuel */}
            <div className="bg-gradient-to-b from-purple-50/90 via-white to-purple-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-purple-950/30 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-500/20 rounded-xl p-3.5 shadow-2xs transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-purple-950 dark:text-purple-200 text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Grade actuel
                </label>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-800">
                  {currentCadre.grades.findIndex((g) => g.id === currentGrade.id) === 0 ? "1er grade (Accès)" : `${currentCadre.grades.findIndex((g) => g.id === currentGrade.id) + 1}e grade (Avancement)`}
                </span>
              </div>
              <select
                value={form.gradeId}
                onChange={(e) => handleGradeChange(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-purple-300/80 dark:border-purple-700 rounded-lg px-3 py-2 font-extrabold text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-2xs cursor-pointer"
              >
                {currentCadre.grades.map((g) => {
                  const isAvancement = isGradeAvancement(currentCadre, g.id);
                  const isContractuel = form.statut.startsWith("contractuel");
                  const isDisabled = isContractuel && isAvancement;
                  return (
                    <option key={g.id} value={g.id} disabled={isDisabled}>
                      {g.nom} {isDisabled ? "— (Réservé aux titulaires)" : ""}
                    </option>
                  );
                })}
              </select>
              {form.statut.startsWith("contractuel") && (
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1.5 font-medium leading-tight bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded border border-amber-200 dark:border-amber-800/60">
                  Les grades d avancement sont statutairement fermés aux contractuels.
                </p>
              )}
            </div>
          </div>

          {/* Échelon & Quotité */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Échelon actuel */}
            <div className="bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-xl p-3 shadow-2xs transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-emerald-950 dark:text-emerald-200 text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Échelon actuel
                </label>
                <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  IM {currentEchelon.indiceMajore}
                </span>
              </div>
              <select
                value={form.echelonActuel}
                onChange={(e) => setForm({ ...form, echelonActuel: Number(e.target.value) })}
                className="w-full bg-white dark:bg-slate-900 border border-emerald-300/80 dark:border-emerald-700 rounded-lg px-3 py-2 font-black text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs cursor-pointer"
              >
                {currentGrade.echelons.map((ech) => (
                  <option key={ech.numero} value={ech.numero}>
                    {ech.numero}e échelon (IM {ech.indiceMajore} - IB {ech.indiceBrut})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Ancienneté conservée (mois)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="36"
                  value={form.ancienneteConserveeMois}
                  onChange={(e) => setForm({ ...form, ancienneteConserveeMois: Number(e.target.value) })}
                  className="w-20 sm:w-24 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 font-bold text-sm text-center focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">mois</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                Si vous avez un reliquat mentionné sur votre arrêté : vous saisissez ce nombre de mois (ex: 6 ou 8).
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Quotité de travail</label>
              <select
                value={form.quotiteActuelle}
                onChange={(e) => setForm({ ...form, quotiteActuelle: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 font-semibold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500"
              >
                <option value={100}>100% (Temps complet)</option>
                <option value={90}>90% (Payé 91,4%)</option>
                <option value={80}>80% (Payé 85,7%)</option>
                <option value={70}>70%</option>
                <option value={60}>60%</option>
                <option value={50}>50%</option>
              </select>
            </div>
          </div>

          {/* Dates clés */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <DateFieldWithYear
              label="Date d effet échelon"
              value={form.dateEffetEchelonActuel}
              onChange={(val) => setForm({ ...form, dateEffetEchelonActuel: val })}
              minYear={1990}
              maxYear={2026}
              required
            />

            <DateFieldWithYear
              label="Nomination grade"
              subLabel={currentGrade.nom}
              value={form.dateNominationGradeActuel}
              onChange={(val) => {
                const prevNom = form.dateNominationGradeActuel;
                const wasCadreSynced = !form.dateEntreeCadreEmploi || form.dateEntreeCadreEmploi === prevNom;
                setForm({ 
                  ...form, 
                  dateNominationGradeActuel: val,
                  dateEntreeCadreEmploi: wasCadreSynced ? val : form.dateEntreeCadreEmploi
                });
              }}
              minYear={1965}
              maxYear={2026}
              required
            />

            <DateFieldWithYear
              label="Ancienneté dans ton cadre d'emploi"
              subLabel={currentCadre.nom}
              value={form.dateEntreeCadreEmploi || form.dateNominationGradeActuel}
              onChange={(val) => setForm({ ...form, dateEntreeCadreEmploi: val })}
              minYear={1965}
              maxYear={2026}
              hint={`Nomination en Cat. ${currentCadre.categorie}`}
              required
            />

            <DateFieldWithYear
              label="Entrée Fonction Publique"
              value={form.dateEntreeFonctionPublique}
              onChange={(val) => setForm({ ...form, dateEntreeFonctionPublique: val })}
              minYear={1965}
              maxYear={2026}
              highlightYear={1998}
              hint="Tous services publics (C, B, A)"
              required
            />
          </div>

          {/* Statut agent */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Statut juridique</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { val: "titulaire", label: "Titulaire" },
                { val: "stagiaire", label: "Stagiaire" },
                { val: "contractuel_cdi", label: "Contractuel CDI" },
                { val: "contractuel_cdd", label: "Contractuel CDD" },
              ].map((st) => (
                <button
                  key={st.val}
                  type="button"
                  onClick={() => handleStatutChange(st.val as StatutAgent)}
                  className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors cursor-pointer text-xs ${
                    form.statut === st.val
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium cursor-pointer text-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 ring-1 ring-orange-400/30 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Appliquer et actualiser
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
