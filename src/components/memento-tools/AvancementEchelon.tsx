import React, { useState } from "react";
import { TrendingUp, Info, Calendar as CalendarIcon } from "lucide-react";

export const AvancementEchelon: React.FC = () => {
  const [dateEffet, setDateEffet] = useState<string>("");
  const [dureeAnnees, setDureeAnnees] = useState<number>(2);
  const [dureeMois, setDureeMois] = useState<number>(0);

  const calculateAvancement = () => {
    if (!dateEffet) return null;

    const date = new Date(dateEffet);
    if (isNaN(date.getTime())) return null;

    // Ajouter les années et les mois
    const nextDate = new Date(date);
    nextDate.setFullYear(nextDate.getFullYear() + dureeAnnees);
    nextDate.setMonth(nextDate.getMonth() + dureeMois);

    return nextDate;
  };

  const nextDate = calculateAvancement();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Avancement d'échelon</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Calculez la date de votre prochain échelon</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Date d'effet de l'échelon actuel
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={dateEffet}
                onChange={(e) => setDateEffet(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl pl-12 pr-4 py-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Durée prévue dans l'échelon actuel (PPCR)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/50">
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={dureeAnnees}
                    onChange={(e) => setDureeAnnees(Number(e.target.value))}
                    className="w-full bg-transparent border-none py-2 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-0"
                  />
                  <span className="text-slate-500 font-semibold ml-2">Années</span>
                </div>
              </div>
              <div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/50">
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={dureeMois}
                    onChange={(e) => setDureeMois(Number(e.target.value))}
                    className="w-full bg-transparent border-none py-2 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-0"
                  />
                  <span className="text-slate-500 font-semibold ml-2">Mois</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultat */}
        <div className={`mt-8 transition-all duration-500 ${nextDate ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {nextDate && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-6 text-center">
              
              <div className="text-sm font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-widest mb-2">
                Date de passage au prochain échelon
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {nextDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-start gap-2.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
          <p>
            Depuis la réforme PPCR, les durées d'échelon sont uniques (le minimum/maximum n'existe plus). 
            Le temps partiel, les congés maladie, maternité et parentaux sont assimilés à du temps plein pour l'avancement d'échelon.
          </p>
        </div>
      </div>
    </div>
  );
};
