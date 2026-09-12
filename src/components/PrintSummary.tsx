import React from "react";
import type { ResultatSimulation } from "../types/career";
import { findCadreAndGrade, formatDateFrench } from "../services/simulationEngine";
import { X, Printer, CheckCircle2, FileText, User } from "lucide-react";

interface PrintSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  resultat: ResultatSimulation;
}

export const PrintSummary: React.FC<PrintSummaryProps> = ({
  isOpen,
  onClose,
  resultat,
}) => {
  if (!isOpen) return null;

  const { profil, jalonActuel, prochainEchelonJalon, premierePromouvabiliteGrade } = resultat;
  const { grade } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Barre d actions d impression */}
        <div className="bg-slate-900 dark:bg-slate-950 p-4 text-white flex items-center justify-between border-b border-transparent dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-bold">Fiche de Synthèse Carrière - Prête pour l Entretien Professionnel</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="text-xs bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              Imprimer / Enregistrer en PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Imprimable */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 print:bg-white print:text-slate-900">
          
          {/* En-tête officiel */}
          <div className="border-b-2 border-slate-900 dark:border-slate-700 print:border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 print:text-slate-500 font-bold">
                Fonction Publique • République Française
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white print:text-slate-900 mt-1">
                Fiche Préparatoire de Carrière & Événements
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600 mt-0.5">
                Support d échange pour l Entretien Professionnel Annuel (EPA) ou le Bilan de Carrière DRH
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400 print:text-slate-500">
              <div>Date d édition : 11 septembre 2026</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 print:text-slate-800">{profil.collectivite}</div>
              <div className="text-[11px] text-orange-700 dark:text-orange-400 print:text-orange-700 font-bold">Versant : {profil.versant}</div>
            </div>
          </div>

          {/* Bandeau d avertissement réglementaire */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 print:bg-amber-50 print:border-amber-300 p-3 rounded-lg text-xs text-amber-950 dark:text-amber-200 print:text-amber-950">
            <strong>Mention informative légale :</strong> Document indicatif établi à partir des données déclarées par l agent. Conformément au Code Général de la Fonction Publique, les avancements de grade et promotions internes font l objet d une appréciation par l autorité territoriale dans le respect des Lignes Directrices de Gestion (LDG). Seuls les arrêtés individuels font foi.
          </div>

          {/* Bloc 1 : Identité & Situation statutaire actuelle */}
          <div className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/40 print:bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-slate-700 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              1. Situation statutaire déclarée au 11/09/2026
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Agent :</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 print:text-slate-900">{profil.prenom}{profil.nom ? ` ${profil.nom}` : ""}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Cadre & Grade :</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 print:text-slate-900">{grade.nom}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500 block">(Catégorie {grade.categorie})</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Échelon & Indice :</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 print:text-slate-900">{profil.echelonActuel}e échelon</span>
                <span className="text-slate-700 dark:text-slate-300 print:text-slate-700 block">IM {jalonActuel.indiceMajore} (IB {jalonActuel.indiceBrut})</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Quotité de travail :</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 print:text-slate-900">{profil.quotiteActuelle}%</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500 block">Depuis le {formatDateFrench(profil.dateEffetEchelonActuel)}</span>
              </div>
            </div>
          </div>

          {/* Bloc 2 : Perspectives statutaires calculées */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-slate-700 mb-3">
              2. Perspectives d avancement calculées
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 print:bg-emerald-50/60 p-3 rounded-xl">
                <div className="font-bold text-emerald-950 dark:text-emerald-300 print:text-emerald-950 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Prochain Avancement d Échelon (De plein droit)
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-white print:text-slate-900">
                  {prochainEchelonJalon ? formatDateFrench(prochainEchelonJalon.date) : "Sommet de grade"}
                </div>
                <div className="text-emerald-800 dark:text-emerald-400 print:text-emerald-800 font-medium mt-1">
                  {prochainEchelonJalon ? `Passage au ${prochainEchelonJalon.echelonNumero}e échelon (IM ${prochainEchelonJalon.indiceMajore}) • +${prochainEchelonJalon.gainIndiciaire} pts` : ""}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 print:text-slate-600 mt-1">
                  Automatique à l ancienneté PPCR sans démarche de l agent.
                </div>
              </div>

              <div className="bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 print:bg-purple-50/60 p-3 rounded-xl">
                <div className="font-bold text-purple-950 dark:text-purple-300 print:text-purple-950 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Première Promouvabilité au Grade Supérieur
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-white print:text-slate-900">
                  {premierePromouvabiliteGrade ? formatDateFrench(premierePromouvabiliteGrade.date) : "N/A"}
                </div>
                <div className="text-purple-800 dark:text-purple-400 print:text-purple-800 font-medium mt-1">
                  {premierePromouvabiliteGrade ? premierePromouvabiliteGrade.titre : ""}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 print:text-slate-600 mt-1">
                  Soumis à l avis hiérarchique et au ratio d avancement de la collectivité.
                </div>
              </div>
            </div>
          </div>

          {/* Bloc 3 : Événements de carrière déclarés et impact */}
          {profil.evenementsSimules.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-slate-700 mb-2">
                3. Événements de vie déclarés et impacts statutaires
              </h3>
              <div className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-200">
                  <thead className="bg-slate-100 dark:bg-slate-800 print:bg-slate-100 font-semibold text-slate-700 dark:text-slate-200 print:text-slate-700">
                    <tr>
                      <th className="py-2 px-3 text-left">Événement</th>
                      <th className="py-2 px-3 text-left">Dates & Durée</th>
                      <th className="py-2 px-3 text-left">Impact Ancienneté</th>
                      <th className="py-2 px-3 text-left">Justificatifs obligatoires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-200 text-slate-800 dark:text-slate-200 print:text-slate-800 bg-white dark:bg-slate-900 print:bg-white">
                    {profil.evenementsSimules.map((evt) => (
                      <tr key={evt.id}>
                        <td className="py-2 px-3 font-bold">{evt.titre}</td>
                        <td className="py-2 px-3">{formatDateFrench(evt.dateDebut)} ({evt.dureeMois} mois)</td>
                        <td className="py-2 px-3">
                          {evt.impacteAvancementEchelon ? (
                            <span className="text-rose-700 dark:text-rose-400 print:text-rose-700 font-bold">Décalage de {evt.dureeMois} mois</span>
                          ) : (
                            <span className="text-emerald-700 dark:text-emerald-400 print:text-emerald-700 font-bold">Maintien à 100%</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-[11px] text-slate-600 dark:text-slate-400 print:text-slate-600">
                          {evt.justificatifsFournis ? "Déclarés conformes" : "À transmettre avant le 31/12"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bloc 4 : Conseils pour l entretien professionnel annuel */}
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 print:bg-slate-50 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 print:text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Points clés à aborder lors de votre entretien professionnel :
            </h4>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 print:text-slate-700 pl-4 list-disc">
              {resultat.synthesePedagogique.conseilsEntretienPro.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
              <li>Vérifier l inscription de vos souhaits de formation au plan de formation de la collectivité.</li>
            </ul>
          </div>

          {/* Bloc d émargement */}
          <div className="pt-6 border-t border-slate-300 dark:border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 text-xs">
            <div className="border border-slate-300 dark:border-slate-700 print:border-slate-300 rounded-xl p-4 h-28 flex flex-col justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-slate-700">Signature de l agent :</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 print:text-slate-400">Date et signature</span>
            </div>
            <div className="border border-slate-300 dark:border-slate-700 print:border-slate-300 rounded-xl p-4 h-28 flex flex-col justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-slate-700">Avis du supérieur hiérarchique direct :</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 print:text-slate-400">Date, visa et observations éventuelles</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Document généré par CFDT "MA CARRIÈRE"
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
