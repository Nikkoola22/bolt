import React, { useState } from "react";
import { ShieldCheck, Users, HeartPulse, Activity, Info, FileText } from "lucide-react";

export const PscSimulator: React.FC = () => {
  const [effectifs, setEffectifs] = useState<number>(20);

  const [hasPrevoyance, setHasPrevoyance] = useState<boolean>(true);
  const [partPrevoyance, setPartPrevoyance] = useState<number>(7);

  const [hasSante, setHasSante] = useState<boolean>(true);
  const [cotisationRefSante, setCotisationRefSante] = useState<number>(30);

  // Calculs
  const partEmployeurSante = cotisationRefSante * 0.5;

  const coutPrevoyanceMois = hasPrevoyance ? (partPrevoyance * effectifs) : 0;
  const coutPrevoyanceAn = coutPrevoyanceMois * 12;

  const coutSanteMois = hasSante ? (partEmployeurSante * effectifs) : 0;
  const coutSanteAn = coutSanteMois * 12;

  const totalPscMois = coutPrevoyanceMois + coutSanteMois;
  const totalPscAn = coutPrevoyanceAn + coutSanteAn;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Simulateur PSC (Protection sociale)</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Estimation du coût de la participation employeur à la protection sociale complémentaire.</p>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl space-y-2">
          <p><strong>Prévoyance :</strong> 7 €/mois minimum (obligatoire depuis le 1er janv. 2025).</p>
          <p><strong>Santé :</strong> 50 % de la cotisation de référence (obligatoire depuis le 1er janv. 2026).</p>
          <p className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-400"><strong>Base légale :</strong> Ordonnance n°2021-175 du 17 février 2021</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* COLONNE GAUCHE: INPUTS */}
        <div className="space-y-6">
          
          {/* 1. EFFECTIFS */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm">1</span>
              EFFECTIFS
            </h4>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Nombre d'agents (tous régimes)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-4 w-4 text-slate-400" />
                </div>
                <input type="number" min="0" value={effectifs} onChange={e => setEffectifs(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl pl-10 px-4 py-2 text-sm font-bold text-slate-900 dark:text-white" />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                La participation employeur prévoyance est due pour chaque agent quel que soit la quotité. Pour la santé, adapter si vous avez beaucoup d'agents à temps partiel.
              </p>
            </div>
          </div>

          {/* 2. PRÉVOYANCE */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">2</span>
                PRÉVOYANCE
              </h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={hasPrevoyance} onChange={e => setHasPrevoyance(e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            
            {hasPrevoyance && (
              <div className="animate-fadeIn mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-500 mb-1">Participation mensuelle par agent</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Activity className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="number" step="0.5" min="7" value={partPrevoyance} onChange={e => setPartPrevoyance(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl pl-10 pr-8 py-2 text-sm font-bold text-slate-900 dark:text-white" />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 font-bold">€</span>
                </div>
                <p className="mt-2 text-[10px] text-slate-400 font-bold">Minimum légal : 7 €/mois</p>
              </div>
            )}
          </div>

          {/* 3. SANTÉ */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm">3</span>
                SANTÉ
              </h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={hasSante} onChange={e => setHasSante(e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            
            {hasSante && (
              <div className="animate-fadeIn mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Cotisation de référence mensuelle</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HeartPulse className="h-4 w-4 text-slate-400" />
                    </div>
                    <input type="number" step="0.5" value={cotisationRefSante} onChange={e => setCotisationRefSante(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl pl-10 pr-8 py-2 text-sm font-bold text-slate-900 dark:text-white" />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 font-bold">€</span>
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400">
                    Définie par votre contrat collectif / labellisation CDG. Valeur indicative : 25 à 40 €/mois.
                  </p>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg flex justify-between items-center border border-indigo-100 dark:border-indigo-800/50">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">Part employeur (50 %)</span>
                  <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{partEmployeurSante.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} <span className="text-[10px] font-normal">/agent/mois</span></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLONNE DROITE: RÉSULTATS */}
        <div className="space-y-6">
          <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" /> COÛT EMPLOYEUR ESTIMÉ
            </h3>
            
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="font-bold text-sm">Prévoyance</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-slate-400">Par mois</div>
                    <div className="text-xl font-bold">{coutPrevoyanceMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Par an</div>
                    <div className="text-xl font-bold">{coutPrevoyanceAn.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                  </div>
                </div>
              </div>

              <div className="pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2 text-rose-400 mb-2">
                  <HeartPulse className="w-4 h-4" />
                  <span className="font-bold text-sm">Santé</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-slate-400">Par mois</div>
                    <div className="text-xl font-bold">{coutSanteMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Par an</div>
                    <div className="text-xl font-bold">{coutSanteAn.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-center bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                  <div className="text-indigo-300 font-bold text-sm mb-1 uppercase tracking-wider">Total PSC</div>
                  <div className="flex justify-around items-end mt-2">
                    <div>
                      <div className="text-[10px] text-indigo-400 uppercase">Mensuel</div>
                      <div className="text-2xl font-black text-indigo-100">{totalPscMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                    </div>
                    <div className="w-px h-8 bg-indigo-500/30 mx-4"></div>
                    <div>
                      <div className="text-[10px] text-indigo-400 uppercase">Annuel</div>
                      <div className="text-2xl font-black text-indigo-100">{totalPscAn.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLEAU RÉCAPITULATIF */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">DÉTAIL PAR AGENT / MOIS</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">
                <tr>
                  <th className="px-4 py-2">Volet</th>
                  <th className="px-4 py-2">Part empl.</th>
                  <th className="px-4 py-2">× agents</th>
                  <th className="px-4 py-2 text-right">Total/mois</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {hasPrevoyance && (
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Prévoyance</td>
                    <td className="px-4 py-3 text-slate-500">{partPrevoyance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                    <td className="px-4 py-3 text-slate-500">× {effectifs}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">{coutPrevoyanceMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                  </tr>
                )}
                {hasSante && (
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Santé</td>
                    <td className="px-4 py-3 text-slate-500">{partEmployeurSante.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                    <td className="px-4 py-3 text-slate-500">× {effectifs}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">{coutSanteMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                  </tr>
                )}
                {!hasPrevoyance && !hasSante && (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-center text-slate-400 italic text-xs">Aucune couverture sélectionnée</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-900/50 font-bold text-slate-900 dark:text-white">
                <tr>
                  <td colSpan={3} className="px-4 py-3">Total mensuel</td>
                  <td className="px-4 py-3 text-right text-indigo-600 dark:text-indigo-400">{totalPscMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 border border-blue-100 dark:border-blue-900/50">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              <strong>À noter :</strong> La participation employeur PSC n'est pas soumise à cotisations retraite (CNRACL pour les titulaires, IRCANTEC pour les contractuels). Elle est uniquement soumise à CSG/CRDS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
