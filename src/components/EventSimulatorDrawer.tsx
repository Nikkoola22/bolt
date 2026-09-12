import React, { useState } from "react";
import type { EvenementCarriere, TypeEvenementCarriere, MotifDisponibilite } from "../types/career";
import { MOTIFS_DISPONIBILITE } from "../data/gradesData";
import { formatDateFrench, addMonthsToDate } from "../services/simulationEngine";
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers,
  AlertTriangle
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
  const defaultType = (isContractuel && (initialEventType === "examen_professionnel" || initialEventType === "disponibilite"))
    ? "temps_partiel"
    : (initialEventType as TypeEvenementCarriere) || "temps_partiel";

  const [selectedType, setSelectedType] = useState<TypeEvenementCarriere>(defaultType);
  const [dateDebut, setDateDebut] = useState("2025-01-01");
  const [dureeMois, setDureeMois] = useState(12);
  const [quotite, setQuotite] = useState(80);
  const [motifDispo, setMotifDispo] = useState<MotifDisponibilite["code"]>(
    "convenance_personnelle_avec_activite"
  );
  const [justificatifsFournis, setJustificatifsFournis] = useState(true);

  if (!isOpen) return null;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();

    let titre = "";
    let desc = "";
    let impacteAvancement = false;
    let impacteRemu = false;

    const dateFin = dureeMois > 0 ? addMonthsToDate(dateDebut, dureeMois) : undefined;

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
      titre = "Réussite au Concours : Nomination Stagiaire & Titularisation";
      desc = "Admission aux épreuves du concours FPT. Nomination en tant que fonctionnaire stagiaire (stage probatoire d un an), puis arrêté de titularisation ouvrant la carrière de titulaire avec échelons garantis et avancement de grade.";
      impacteAvancement = false;
      impacteRemu = false;
    }

    const newEvt: EvenementCarriere = {
      id: `evt-${Date.now()}`,
      type: selectedType,
      dateDebut,
      dateFin,
      dureeMois,
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

  const injectPresetScenario = (type: string) => {
    if (type === "dispo_sans_activite") {
      onAddEvent({
        id: `evt-preset-${Date.now()}`,
        type: "disponibilite",
        dateDebut: "2025-06-01",
        dateFin: "2026-06-01",
        dureeMois: 12,
        motifDisponibilite: "convenance_personnelle_sans_activite",
        titre: "1 an de disponibilité sans activité pro",
        descriptionDetaillee: "Suspension totale du traitement et gel de l avancement d échelon. Décalage de 12 mois de la date du prochain échelon.",
        impacteAvancementEchelon: true,
        impacteRemuneration: true,
        justificatifsFournis: false,
      });
    } else if (type === "dispo_avec_activite") {
      onAddEvent({
        id: `evt-preset-${Date.now()}`,
        type: "disponibilite",
        dateDebut: "2025-06-01",
        dateFin: "2026-06-01",
        dureeMois: 12,
        motifDisponibilite: "convenance_personnelle_avec_activite",
        titre: "1 an de disponibilité avec activité salariée (>600h)",
        descriptionDetaillee: "Exercice d une activité salariée dans le privé avec fiches de paie transmises. Maintien légal des droits à avancement d échelon (décret 2019-234).",
        impacteAvancementEchelon: false,
        impacteRemuneration: true,
        justificatifsFournis: true,
      });
    } else if (type === "temps_partiel_80") {
      onAddEvent({
        id: `evt-preset-${Date.now()}`,
        type: "temps_partiel",
        dateDebut: "2025-01-01",
        dateFin: "2027-01-01",
        dureeMois: 24,
        quotite: 80,
        titre: "Temps partiel à 80% pendant 2 ans",
        descriptionDetaillee: "Quotité 80% payée 85,7% du traitement de base. L ancienneté d avancement continue à 100% sans aucun retard !",
        impacteAvancementEchelon: false,
        impacteRemuneration: true,
        justificatifsFournis: true,
      });
    } else if (type === "exam_pro") {
      onAddEvent({
        id: `evt-preset-${Date.now()}`,
        type: "examen_professionnel",
        dateDebut: "2026-06-15",
        dureeMois: 0,
        titre: "Réussite Examen Professionnel (Session 2026)",
        descriptionDetaillee: "Attestation obtenue auprès du CDG. Déverrouille la voie d avancement accélérée dès l échelon 6.",
        impacteAvancementEchelon: false,
        impacteRemuneration: false,
        justificatifsFournis: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-full sm:max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200">
        
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
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Hypothèses rapides */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Hypothèses rapides en 1 clic :
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => injectPresetScenario("temps_partiel_80")}
                className="text-left text-xs bg-slate-50 hover:bg-orange-50 hover:border-orange-300 border border-slate-200 p-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Temps partiel 80% (2 ans)</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Payé 85,7% • Avancement préservé</div>
              </button>

              <button
                type="button"
                onClick={() => injectPresetScenario("exam_pro")}
                className="text-left text-xs bg-slate-50 hover:bg-purple-50 hover:border-purple-300 border border-slate-200 p-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Examen pro en 2026</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Accélère l accès au grade sup.</div>
              </button>

              <button
                type="button"
                onClick={() => injectPresetScenario("dispo_sans_activite")}
                className="text-left text-xs bg-slate-50 hover:bg-rose-50 hover:border-rose-300 border border-slate-200 p-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Dispo 1 an SANS activité</div>
                <div className="text-[11px] text-rose-700 mt-0.5">Décale l échelon de 12 mois</div>
              </button>

              <button
                type="button"
                onClick={() => injectPresetScenario("dispo_avec_activite")}
                className="text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 p-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Dispo 1 an AVEC job &gt;600h</div>
                <div className="text-[11px] text-emerald-800 mt-0.5">Maintien de l avancement (loi 2019)</div>
              </button>
            </div>
          </div>

          {/* Formulaire d ajout personnalisé */}
          <form onSubmit={handleCreateEvent} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-orange-600" />
              Ajouter un événement personnalisé :
            </div>

            {/* Type d événement */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Type d événement
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as TypeEvenementCarriere)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                {isContractuel && (
                  <option value="reussite_concours" className="font-bold text-emerald-700">
                    🏆 Réussite au Concours (Mise en stage & Titularisation)
                  </option>
                )}
                <option value="temps_partiel">Temps partiel (50%, 60%, 70%, 80%, 90%)</option>
                <option value="conge_parental">Congé parental</option>
                <option value="disponibilite" disabled={isContractuel}>
                  Mise en disponibilité {isContractuel ? "— (Réservé aux fonctionnaires titulaires)" : ""}
                </option>
                <option value="examen_professionnel" disabled={isContractuel}>
                  Réussite à l Examen Professionnel {isContractuel ? "— (Réservé aux fonctionnaires titulaires)" : ""}
                </option>
              </select>
              {isContractuel && (
                <div className="mt-2 bg-amber-50 border border-amber-200/90 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Règle statutaire :</strong> L examen pro d avancement et la disponibilité sont réservés aux titulaires. Pour évoluer vers le statut de fonctionnaire titulaire, choisissez l option <strong>« Réussite au Concours »</strong> ci-dessus !
                  </p>
                </div>
              )}
            </div>

            {/* Paramètres selon le type */}
            {selectedType === "reussite_concours" && (
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-blue-50/50 border border-emerald-200/90 rounded-2xl p-4 text-xs text-emerald-950 space-y-2.5 shadow-2xs">
                <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span>Nomination Stagiaire (12 mois) & Titularisation de plein droit</span>
                </div>
                <p className="leading-relaxed text-emerald-900">
                  La réussite au concours entraîne votre nomination en qualité de <strong>fonctionnaire stagiaire</strong> pour une durée probatoire d un an (art. L327-1 du CGFP).
                </p>
                <div className="bg-white/85 p-3 rounded-xl border border-emerald-200/80 space-y-1.5 text-[11px] text-slate-700">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Impacts majeurs calculés sur votre carrière :
                  </div>
                  <div>• <strong>Pendant 12 mois :</strong> Position de stagiaire avec maintien de votre rémunération indiciaire et formation d intégration CNFPT.</div>
                  <div>• <strong>Après 12 mois :</strong> Arrêté de titularisation de plein droit pris par le Maire de Gennevilliers.</div>
                  <div>• <strong>Déblocage total :</strong> Les échelons futurs s accélèrent à la cadence unique PPCR (garantis de plein droit) et les perspectives d avancement de grade s ouvrent !</div>
                </div>
              </div>
            )}
            {selectedType === "temps_partiel" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {q}%
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-orange-950 mt-1.5 font-medium">
                  {quotite === 80 && "Règle de rémunération : 80% donne droit à 6/7ème du traitement brut (soit 85,71%)."}
                  {quotite === 90 && "Règle de rémunération : 90% donne droit à 32/35ème du traitement brut (soit 91,43%)."}
                  {quotite < 80 && `Rémunération strictement proportionnelle à la quotité (${quotite}%).`}
                </p>
              </div>
            )}

            {selectedType === "disponibilite" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Motif de disponibilité
                  </label>
                  <select
                    value={motifDispo}
                    onChange={(e) => setMotifDispo(e.target.value as MotifDisponibilite["code"])}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    {MOTIFS_DISPONIBILITE.map((m) => (
                      <option key={m.code} value={m.code}>
                        {m.libelle}
                      </option>
                    ))}
                  </select>
                </div>

                {motifDispo === "convenance_personnelle_avec_activite" && (
                  <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 p-2.5 rounded-lg">
                    <input
                      type="checkbox"
                      id="chk-justifs"
                      checked={justificatifsFournis}
                      onChange={(e) => setJustificatifsFournis(e.target.checked)}
                      className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor="chk-justifs" className="text-xs text-orange-950 font-medium cursor-pointer">
                      Je certifie transmettre annuellement à ma DRH les bulletins de paie (&gt; 600h/an) pour maintenir mes droits à l avancement d échelon.
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Date début & Durée */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              {selectedType !== "examen_professionnel" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Durée (en mois)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={dureeMois}
                    onChange={(e) => setDureeMois(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-orange-500/20 ring-1 ring-orange-400/30 transition-all cursor-pointer"
            >
              Ajouter et recalculer la frise
            </button>
          </form>

          {/* Liste des événements actuellement appliqués */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Événements actuellement appliqués ({evenements.length}) :</span>
            </div>

            {evenements.length === 0 ? (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                Aucun événement simulé. Votre frise reflète un parcours linéaire standard sans interruption.
              </p>
            ) : (
              <div className="space-y-2">
                {evenements.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white border border-slate-200 rounded-xl p-3 flex items-start justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{evt.titre}</span>
                        {evt.impacteAvancementEchelon ? (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                            Décale l avancement
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            Avancement préservé
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Début : {formatDateFrench(evt.dateDebut)} {evt.dureeMois > 0 ? `• Durée : ${evt.dureeMois} mois` : ""}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {evt.descriptionDetaillee}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveEvent(evt.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
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
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Recalcul dynamique en temps réel
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Fermer le simulateur
          </button>
        </div>

      </div>
    </div>
  );
};
