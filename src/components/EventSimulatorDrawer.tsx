import React, { useState, useEffect } from "react";
import type { EvenementCarriere, TypeEvenementCarriere, MotifDisponibilite } from "../types/career";
import { MOTIFS_DISPONIBILITE } from "../data/gradesData";
import { formatDateFrench, addMonthsToDate } from "../services/simulationEngine";
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers,
  AlertTriangle,
  Award
} from "lucide-react";

interface EventSimulatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evenements: EvenementCarriere[];
  onAddEvent: (evt: EvenementCarriere) => void;
  onRemoveEvent: (id: string) => void;
  initialEventType?: string;
  isContractuel?: boolean;
}

export const EventSimulatorDrawer: React.FC<EventSimulatorDrawerProps> = ({
  isOpen,
  onClose,
  evenements,
  onAddEvent,
  onRemoveEvent,
  initialEventType,
  isContractuel = false,
}) => {
  const [selectedType, setSelectedType] = useState<TypeEvenementCarriere | "">(
    (initialEventType as TypeEvenementCarriere) || ""
  );
  const [dateDebut, setDateDebut] = useState("2025-01-01");
  const [dureeMois, setDureeMois] = useState(12);
  const [quotite, setQuotite] = useState(80);
  const [motifDispo, setMotifDispo] = useState<MotifDisponibilite["code"]>(
    "convenance_personnelle_avec_activite"
  );
  const [justificatifsFournis, setJustificatifsFournis] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSelectedType((initialEventType as TypeEvenementCarriere) || "");
    }
  }, [isOpen, initialEventType]);

  if (!isOpen) return null;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    let titre = "";
    let desc = "";
    let impacteAvancement = false;
    let impacteRemu = false;

    const hasDuration = selectedType === "temps_partiel" || selectedType === "conge_parental" || selectedType === "disponibilite" || selectedType === "mobilite_detachement";
    const dureeEffective = selectedType === "reussite_concours" ? 12 : hasDuration ? dureeMois : 0;
    const dateFin = (hasDuration && dureeMois > 0) ? addMonthsToDate(dateDebut, dureeMois) : undefined;

    if (selectedType === "temps_partiel") {
      titre = `Temps partiel à ${quotite}% (${dureeMois} mois)`;
      desc = `Passage à une quotité de ${quotite}%. Rémunération calculée selon les règles statutaires (${
        quotite === 80 ? "85,7% - règle 6/7" : quotite === 90 ? "91,4% - règle 32/35" : quotite + "%"
      }). L ancienneté pour l avancement d échelon et de grade progresse à 100% (CGFP art. L612-4).`;
      impacteRemu = true;
      impacteAvancement = false;
    } else if (selectedType === "conge_parental") {
      titre = `Congé parental (${dureeMois} mois)`;
      desc = "Suspension de la rémunération. Conservation des droits à l avancement d échelon et de grade à 100% dans la limite de 5 ans sur l ensemble de la carrière (loi transformation 2019).";
      impacteRemu = true;
      impacteAvancement = false;
    } else if (selectedType === "disponibilite") {
      const motifObj = MOTIFS_DISPONIBILITE.find((m) => m.code === motifDispo);
      titre = `Disponibilité (${motifObj ? motifObj.libelle.substring(0, 35) + "..." : "Dispo"}) - ${dureeMois} mois`;
      if (motifDispo === "convenance_personnelle_avec_activite" && justificatifsFournis) {
        desc = "Disponibilité avec activité professionnelle (> 600h/an). Maintien des droits à l avancement d échelon sous réserve de transmission des bulletins de paie à la DRH avant le 31 décembre.";
        impacteAvancement = false;
      } else if (motifDispo === "elever_enfant") {
        desc = "Disponibilité de droit pour élever un enfant de moins de 12 ans. Maintien légal des droits à l avancement d échelon dans la limite de 5 ans.";
        impacteAvancement = false;
      } else {
        desc = "Disponibilité pour convenance personnelle sans activité. Interruption totale de la rémunération et suspension du décompte d ancienneté : la date du prochain échelon est décalée d autant.";
        impacteAvancement = true;
      }
      impacteRemu = true;
    } else if (selectedType === "examen_professionnel") {
      titre = "Réussite à l Examen Professionnel";
      desc = "Obtention de l attestation officielle du Centre de Gestion (CDG). Débloque la voie rapide pour l inscription au tableau d avancement de grade.";
      impacteAvancement = false;
      impacteRemu = false;
    } else if (selectedType === "reussite_concours") {
      if (isContractuel) {
        titre = "Réussite au Concours : Nomination Stagiaire & Titularisation";
        desc = "Admission aux épreuves du concours FPT. Nomination en tant que fonctionnaire stagiaire (stage probatoire d un an), puis arrêté de titularisation ouvrant la carrière de titulaire avec échelons garantis et avancement de grade.";
      } else {
        titre = "Réussite au Concours : Changement de Catégorie & Nomination Stagiaire";
        desc = "Admission au concours pour l accès à la catégorie supérieure. Détachement pour stage probatoire (12 mois) avec maintien de la rémunération indiciaire garanti (art. L513-7 CGFP), suivi de la titularisation dans le nouveau cadre d emplois.";
      }
      impacteAvancement = false;
      impacteRemu = false;
    } else if (selectedType === "promotion_interne") {
      titre = "Promotion Interne (Liste d aptitude CDG)";
      desc = "Inscription sur la liste d aptitude de promotion interne pour nomination dans le cadre d emplois supérieur sans concours. Nomination en stage probatoire avec maintien d indice puis titularisation (CGFP art. L523-1).";
      impacteAvancement = false;
      impacteRemu = false;
    } else if (selectedType === "mobilite_detachement") {
      titre = `Mobilité / Détachement (${dureeMois} mois)`;
      desc = "Accueil en détachement dans une autre collectivité territoriale ou administration publique. Droit au bénéfice de la double carrière (avancement garanti dans le corps d origine et d accueil selon la règle la plus favorable).";
      impacteAvancement = false;
      impacteRemu = false;
    }

    const newEvt: EvenementCarriere = {
      id: `evt-${Date.now()}`,
      type: selectedType,
      dateDebut,
      dateFin,
      dureeMois: dureeEffective,
      titre,
      descriptionDetaillee: desc,
      quotite: selectedType === "temps_partiel" ? quotite : undefined,
      motifDisponibilite: selectedType === "disponibilite" ? motifDispo : undefined,
      impacteAvancementEchelon: impacteAvancement,
      impacteRemuneration: impacteRemu,
      justificatifsFournis: justificatifsFournis,
    };

    onAddEvent(newEvt);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-full sm:max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
        
        {/* Header Drawer */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Simulateur d événements de carrière
              </h3>
              <p className="text-xs text-slate-400">
                Disponibilité, congé parental, temps partiel, examen pro...
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

        {/* Corps du Drawer */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">

          {/* Formulaire d ajout personnalisé */}
          <form onSubmit={handleCreateEvent} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              Ajouter un événement personnalisé :
            </div>

            {/* Type d événement */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Type d événement
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as TypeEvenementCarriere)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
              >
                <option value="">Choisir...</option>
                <option value="reussite_concours" className="font-bold text-emerald-800 dark:text-emerald-400">
                  {isContractuel 
                    ? "🏆 Réussite au Concours (Mise en stage & Titularisation FPT)" 
                    : "🏆 Réussite au Concours (Changement de catégorie C ➔ B ou B ➔ A)"}
                </option>
                {!isContractuel && (
                  <option value="promotion_interne" className="font-bold text-amber-800 dark:text-amber-400">
                    ⭐ Promotion Interne (Changement de catégorie sans concours - liste CDG)
                  </option>
                )}
                {!isContractuel && (
                  <option value="examen_professionnel">
                    📝 Réussite à l Examen Professionnel (Avancement accéléré de grade)
                  </option>
                )}
                <option value="temps_partiel">⏱️ Temps partiel (50%, 60%, 70%, 80%, 90%)</option>
                <option value="conge_parental">👶 Congé parental (droits d avancement préservés)</option>
                {!isContractuel && (
                  <option value="disponibilite">
                    🚪 Disponibilité (Convenance perso, élever enfant, suivre conjoint)
                  </option>
                )}
                {!isContractuel && (
                  <option value="mobilite_detachement">
                    🔄 Mobilité / Détachement (accueil dans une autre administration)
                  </option>
                )}
              </select>
              {isContractuel && (
                <div className="mt-2 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/90 dark:border-amber-800/60 rounded-xl p-2.5 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Règle statutaire :</strong> L examen pro d avancement de grade, la promotion interne, la disponibilité et le détachement sont réservés aux fonctionnaires titulaires. Pour évoluer vers le statut de titulaire, choisissez l option <strong>« Réussite au Concours »</strong> ci-dessus !
                  </p>
                </div>
              )}
            </div>

            {/* Invite par défaut si aucun événement sélectionné */}
            {!selectedType && (
              <div className="p-4 bg-orange-50/40 dark:bg-orange-950/40 border border-orange-200/70 dark:border-orange-800/60 rounded-xl text-center text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-bold text-orange-950 dark:text-orange-200">
                  Sélectionnez un événement ci-dessus
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Choisissez la nature de l événement (concours, promotion, temps partiel, disponibilité...) pour afficher ses modalités et simuler son impact statutaire sur votre carrière.
                </p>
              </div>
            )}

            {/* Paramètres selon le type */}
            {selectedType === "reussite_concours" && (
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-blue-50/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border border-emerald-200/90 dark:border-emerald-800 rounded-2xl p-4 text-xs text-emerald-950 dark:text-emerald-200 space-y-2.5 shadow-2xs">
                <div className="font-extrabold text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span>
                    {isContractuel
                      ? "Nomination Stagiaire (12 mois) & Titularisation de plein droit"
                      : "Admission au Concours : Accès à la Catégorie Supérieure"}
                  </span>
                </div>
                <p className="leading-relaxed text-emerald-900 dark:text-emerald-300">
                  {isContractuel ? (
                    <>La réussite au concours entraîne votre nomination en qualité de <strong>fonctionnaire stagiaire</strong> pour une durée probatoire d un an (art. L327-1 du CGFP).</>
                  ) : (
                    <>La réussite au concours vous permet de <strong>changer de catégorie hiérarchique</strong> (ex: Cat. C vers B, ou B vers A). Vous êtes nommé stagiaire en position de <strong>détachement pour stage</strong> (art. L513-7 CGFP), garantissant la conservation de votre rémunération et votre droit au retour en cas de besoin.</>
                  )}
                </p>
                <div className="bg-white/85 dark:bg-slate-900/90 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Impacts majeurs calculés sur votre carrière :
                  </div>
                  <div>• <strong>Pendant 12 mois :</strong> Position de stagiaire avec maintien de votre rémunération indiciaire et formation CNFPT.</div>
                  <div>• <strong>Après 12 mois :</strong> Arrêté de titularisation avec reclassement indiciaire favorable à indice égal ou immédiatement supérieur.</div>
                  <div>• <strong>Déblocage statutaire :</strong> Accès aux grilles indiciaires de la catégorie supérieure et nouvelles perspectives d avancement de grade !</div>
                </div>
              </div>
            )}

            {selectedType === "promotion_interne" && (
              <div className="bg-gradient-to-br from-amber-50 via-orange-50/60 to-amber-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-amber-950/30 border border-amber-300/80 dark:border-amber-800 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 space-y-2.5 shadow-2xs">
                <div className="font-extrabold text-amber-950 dark:text-amber-200 text-sm flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-600 text-white shadow-2xs">
                    <Award className="w-4 h-4" />
                  </span>
                  <span>Promotion Interne au Choix (sans concours)</span>
                </div>
                <p className="leading-relaxed text-amber-900 dark:text-amber-300">
                  La promotion interne permet à un fonctionnaire titulaire d accéder à la <strong>catégorie supérieure (ex: C vers B ou B vers A)</strong> sans passer de concours, au vu de sa valeur professionnelle et après inscription sur la liste d aptitude arrêtée par le Centre de Gestion (CDG).
                </p>
                <div className="bg-white/85 dark:bg-slate-900/90 p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/80 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>• <strong>Nomination :</strong> Nomination en tant que stagiaire probatoire ou directe selon le cadre d emplois.</div>
                  <div>• <strong>Garantie indiciaire :</strong> Reclassement à un indice égal ou immédiatement supérieur (aucun agent ne perd en rémunération).</div>
                </div>
              </div>
            )}

            {selectedType === "examen_professionnel" && (
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30 border border-blue-200/80 dark:border-blue-800 rounded-2xl p-4 text-xs text-blue-950 dark:text-blue-200 space-y-2 shadow-2xs">
                <div className="font-extrabold text-blue-950 dark:text-blue-200 text-sm flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
                    <Award className="w-4 h-4" />
                  </span>
                  <span>Réussite à l Examen Professionnel</span>
                </div>
                <p className="leading-relaxed text-blue-900 dark:text-blue-300">
                  L attestation de réussite obtenue auprès du Centre de Gestion (CDG) est <strong>valable sans limitation de durée</strong>. Elle ouvre la voie accélérée pour être proposé au tableau d avancement au grade supérieur.
                </p>
              </div>
            )}

            {selectedType === "mobilite_detachement" && (
              <div className="bg-gradient-to-br from-slate-50 via-stone-50 to-white dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-800 dark:text-slate-200 space-y-2 shadow-2xs">
                <div className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-slate-700 text-white shadow-2xs">
                    <Layers className="w-4 h-4" />
                  </span>
                  <span>Mobilité par Détachement</span>
                </div>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  Vous occupez un emploi permanent dans une autre collectivité territoriale ou administration d État. Vous bénéficiez du <strong>principe de la double carrière</strong> : votre avancement continue d être pris en compte dans votre cadre d emplois d origine et dans votre structure d accueil.
                </p>
              </div>
            )}

            {selectedType === "temps_partiel" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Quotité choisie
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[50, 60, 70, 80, 90].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuotite(q)}
                      className={`text-xs py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
                        quotite === q
                          ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {q}%
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-orange-950 dark:text-orange-300 mt-1.5 font-medium">
                  {quotite === 80 && "Règle de rémunération : 80% donne droit à 6/7ème du traitement brut (soit 85,71%)."}
                  {quotite === 90 && "Règle de rémunération : 90% donne droit à 32/35ème du traitement brut (soit 91,43%)."}
                  {quotite < 80 && `Rémunération strictement proportionnelle à la quotité (${quotite}%).`}
                </p>
              </div>
            )}

            {selectedType === "disponibilite" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Motif de disponibilité
                  </label>
                  <select
                    value={motifDispo}
                    onChange={(e) => setMotifDispo(e.target.value as MotifDisponibilite["code"])}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    {MOTIFS_DISPONIBILITE.map((m) => (
                      <option key={m.code} value={m.code}>
                        {m.libelle}
                      </option>
                    ))}
                  </select>
                </div>

                {motifDispo === "convenance_personnelle_avec_activite" && (
                  <div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/80 p-2.5 rounded-lg">
                    <input
                      type="checkbox"
                      id="chk-justifs"
                      checked={justificatifsFournis}
                      onChange={(e) => setJustificatifsFournis(e.target.checked)}
                      className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor="chk-justifs" className="text-xs text-orange-950 dark:text-orange-200 font-medium cursor-pointer">
                      Je certifie transmettre annuellement à ma DRH les bulletins de paie (&gt; 600h/an) pour maintenir mes droits à l avancement d échelon.
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Date début & Durée (uniquement si un événement est sélectionné) */}
            {selectedType && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {selectedType === "reussite_concours"
                      ? "Date de nomination stagiaire"
                      : selectedType === "promotion_interne"
                      ? "Date d inscription / nomination"
                      : selectedType === "examen_professionnel"
                      ? "Date de réussite à l examen"
                      : "Date de début"}
                  </label>
                  <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>

                {(selectedType === "temps_partiel" || selectedType === "conge_parental" || selectedType === "disponibilite" || selectedType === "mobilite_detachement") && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Durée (en mois)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={dureeMois}
                      onChange={(e) => setDureeMois(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      required
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedType}
              className={`w-full text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md ${
                !selectedType
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none border border-slate-300/60 dark:border-slate-700"
                  : "bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/20 ring-1 ring-orange-400/30 cursor-pointer"
              }`}
            >
              {selectedType ? "Ajouter et recalculer la frise" : "Veuillez choisir un événement"}
            </button>
          </form>

          {/* Liste des événements actuellement appliqués */}
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Événements actuellement appliqués ({evenements.length}) :</span>
            </div>

            {evenements.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                Aucun événement simulé. Votre frise reflète un parcours linéaire standard sans interruption.
              </p>
            ) : (
              <div className="space-y-2">
                {evenements.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-start justify-between gap-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{evt.titre}</span>
                        {evt.impacteAvancementEchelon ? (
                          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded">
                            Décale l avancement
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded">
                            Avancement préservé
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Début : {formatDateFrench(evt.dateDebut)} {evt.dureeMois > 0 ? `• Durée : ${evt.dureeMois} mois` : ""}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                        {evt.descriptionDetaillee}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveEvent(evt.id)}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer shrink-0"
                      title="Supprimer cet événement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Drawer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Recalcul dynamique en temps réel
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Lancer la simulation
          </button>
        </div>

      </div>
    </div>
  );
};
