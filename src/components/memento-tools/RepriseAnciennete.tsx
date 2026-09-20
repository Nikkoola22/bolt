import React, { useState, useMemo } from "react";
import { Calculator, AlertTriangle, Plus, Trash2, BookOpen, AlertCircle, ExternalLink, CircleCheck } from "lucide-react";
import { CADRES_EMPLOIS } from "../../data/gradesData";

interface Experience {
  id: string;
  origine: string;
  annees: number;
  mois: number;
}

const ORIGINES = [
  { label: "Fonctionnaire FP (100 %)", taux: 1 },
  { label: "Contractuel FP (100 %)", taux: 1 },
  { label: "Secteur privé (50 %)", taux: 0.5 }
];

const REFS_DEROGATOIRES = [
  { filiere: "Sapeurs-pompiers B/C", cadre: "Sapeur-pompier professionnel", decret: "Décrets n°2012-520 (sapeurs/caporaux), n°2012-521 (sous-officiers), n°2012-522 (officiers) du 20/04/2012", part: "Décrets autonomes par grade : chaque grade (sapeur, sous-officier, officier) relève d'un statut particulier distinct. Le calcul de reprise diffère selon le décret applicable.", lien: "https://www.legifrance.gouv.fr/loda/id/LEGISCTA000025730882" },
  { filiere: "Sociale A", cadre: "Éducateur territorial de jeunes enfants", decret: "Décret n°2017-902 du 09/05/2017", part: "Règles dérogatoires (filière médico-sociale) : conditions de reprise et de classement spécifiques à la filière sociale, distinctes du régime général. Se référer précisément au décret statutaire.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000034637417" },
  { filiere: "Sociale B", cadre: "Assistant territorial socio-éducatif", decret: "Décret n°2017-901 du 09/05/2017", part: "Règles dérogatoires (filière médico-sociale) : plafond de reprise différent selon que les services ont été accomplis avant ou après le 1ᵉʳ février 2019, et ne peut être accordée qu'une seule fois dans la carrière.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000034637329" },
  { filiere: "Sécurité C", cadre: "Agent de police municipale", decret: "Décret n°2006-1391 du 17/11/2006", part: "Règles dérogatoires (filière sécurité) : services publics et privés non cumulables entre eux pour le classement, conditions de recrutement et d'aptitude propres à la filière.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000646940" }
];

const REFS_GENERALES = [
  { filiere: "Administrative C", cadre: "Adjoint administratif territorial", decret: "Décret n°2006-1690 du 22/12/2006", part: "Services publics repris en totalité, services privés à 50 % si fonctions comparables.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000462935" },
  { filiere: "Technique C", cadre: "Adjoint technique territorial", decret: "Décret n°2006-1691 du 22/12/2006", part: "Services publics repris en totalité, services privés à 50 % si fonctions comparables.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000646815" },
  { filiere: "Administrative B", cadre: "Rédacteur territorial", decret: "Décret n°2012-924 du 30/07/2012", part: "Services publics repris en totalité, services privés à 50 % si fonctions comparables.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000026236871" },
  { filiere: "Technique B", cadre: "Technicien territorial", decret: "Décret n°2010-1357 du 09/11/2010", part: "Services publics repris en totalité, services privés à 50 % si fonctions comparables.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000023036671" },
  { filiere: "Administrative A", cadre: "Attaché territorial", decret: "Décret n°87-1099 du 30/12/1987", part: "Services publics repris en totalité, services privés à 50 % si fonctions comparables.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000884676" },
  { filiere: "Technique A", cadre: "Ingénieur territorial", decret: "Décret n°2016-201 du 26/02/2016", part: "Services publics repris en totalité, services privés à 50 % si fonctions comparables.", lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032111484" }
];

export const RepriseAnciennete: React.FC = () => {
  const [cadreId, setCadreId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", origine: "Fonctionnaire FP (100 %)", annees: 0, mois: 0 }
  ]);

  const addExperience = () => {
    setExperiences([...experiences, { id: Math.random().toString(), origine: "Secteur privé (50 %)", annees: 0, mois: 0 }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  // Calcul séparé pour trouver la situation la plus favorable (non-cumul public/privé)
  let totalMoisPublic = 0;
  let totalMoisPrive = 0;

  experiences.forEach(e => {
    const origineConfig = ORIGINES.find(o => o.label === e.origine);
    const taux = origineConfig ? origineConfig.taux : 0;
    const moisTotal = (Number(e.annees) || 0) * 12 + (Number(e.mois) || 0);
    
    if (e.origine.includes("Privé") || e.origine.includes("privé")) {
      totalMoisPrive += moisTotal * taux;
    } else {
      totalMoisPublic += moisTotal * taux;
    }
  });

  const isPublicFavorable = totalMoisPublic >= totalMoisPrive;
  const totalMois = isPublicFavorable ? totalMoisPublic : totalMoisPrive;

  const totalAnneesRetenues = Math.floor(totalMois / 12);
  const totalMoisRetenus = Math.round(totalMois % 12);

  // Calcul de l'échelon cible
  const { echelonResult, reliquatMois } = useMemo(() => {
    if (!cadreId || !gradeId) return { echelonResult: null, reliquatMois: 0 };
    
    const cadre = CADRES_EMPLOIS.find(c => c.id === cadreId);
    const gradeDef = cadre?.grades.find(g => g.id === gradeId);
    if (!gradeDef || !gradeDef.echelons || gradeDef.echelons.length === 0) return { echelonResult: null, reliquatMois: 0 };

    let remainingMonths = totalMois;
    let currentEchelonIndex = 0;
    
    while (currentEchelonIndex < gradeDef.echelons.length - 1) {
      const e = gradeDef.echelons[currentEchelonIndex];
      const dureeMois = (e.dureeAnnees || 0) * 12;
      
      if (dureeMois > 0 && remainingMonths >= dureeMois) {
        remainingMonths -= dureeMois;
        currentEchelonIndex++;
      } else {
        break;
      }
    }
    
    return { 
      echelonResult: gradeDef.echelons[currentEchelonIndex], 
      reliquatMois: Math.round(remainingMonths)
    };
  }, [cadreId, gradeId, totalMois]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reprise d'ancienneté : classement à la nomination</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Déterminez l'échelon de classement lors d'un recrutement en cumulant plusieurs périodes d'expérience (public, privé, contractuel).</p>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <strong>Base légale :</strong> Décrets n°87-1107 et n°87-1108 du 30 décembre 1987 (dispositions communes), et statut particulier propre à chaque cadre d'emplois
        </p>
      </div>

      {/* Info Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2 uppercase tracking-wide">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          Comment fonctionne la reprise d'ancienneté ?
        </h3>
        
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Lors du recrutement d'un agent, l'autorité territoriale peut reprendre tout ou partie des services accomplis avant sa nomination pour déterminer son échelon de classement. Cette reprise n'est pas un droit automatique : c'est une faculté de l'autorité territoriale, encadrée par le statut particulier du cadre d'emplois concerné.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Services publics</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Repris en totalité dans la plupart des cas (fonction publique territoriale, d'État ou hospitalière, y compris en tant que contractuel de droit public).</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Services privés</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Repris partiellement (généralement 50 %, parfois davantage selon le cadre d'emplois), et seulement si les fonctions exercées sont d'une nature comparable à celles du grade de nomination.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Professions libérales</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Traitées selon des règles spécifiques, proches de celles du secteur privé, avec appréciation de la pertinence de l'expérience au regard du poste.</p>
          </div>
        </div>

        <p className="text-xs italic text-slate-500 dark:text-slate-400 text-center">
          Les taux et conditions exacts (nature des fonctions, plafonds de reprise, pièces justificatives) varient selon le décret statutaire de chaque cadre d'emplois, voir le tableau de référence ci-dessous.
        </p>
      </div>

      {/* Simulateur */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-center">
          Simulateur (Estimation Indicative)
        </h3>
        
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Estimation indicative basée sur les règles générales.</strong> Les règles exactes varient selon votre cadre d'emplois (décret statutaire propre à chaque grade). Ne pas utiliser pour établir un arrêté de reprise d'ancienneté sans vérification auprès de votre CDG.
          </div>
        </div>

        <div className="space-y-8">
          {/* 1. Grade Visé */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm">1</span>
              GRADE VISÉ
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Cadre d'emplois</label>
                <select value={cadreId} onChange={(e) => { setCadreId(e.target.value); setGradeId(""); }} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white">
                  <option value="">— sélectionner —</option>
                  {CADRES_EMPLOIS.map(c => (
                    <option key={c.id} value={c.id}>{c.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Grade</label>
                <select value={gradeId} onChange={(e) => setGradeId(e.target.value)} disabled={!cadreId} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white disabled:opacity-50">
                  <option value="">{cadreId ? "— sélectionner un grade —" : "— choisir un cadre —"}</option>
                  {cadreId && CADRES_EMPLOIS.find(c => c.id === cadreId)?.grades.map(g => (
                    <option key={g.id} value={g.id}>{g.nom}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Expériences Antérieures */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm">2</span>
                EXPÉRIENCES ANTÉRIEURES
              </h4>
              <button onClick={addExperience} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="hidden md:grid grid-cols-12 gap-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-4">Origine</div>
                <div className="col-span-2 text-center">Années</div>
                <div className="col-span-2 text-center">Mois</div>
                <div className="col-span-2 text-center">Taux</div>
                <div className="col-span-2 text-center">Ancienneté retenue</div>
              </div>

              {experiences.map((exp) => {
                const taux = ORIGINES.find(o => o.label === exp.origine)?.taux || 0;
                const moisBase = (exp.annees || 0) * 12 + (exp.mois || 0);
                const moisRetenus = moisBase * taux;
                const anneesRet = Math.floor(moisRetenus / 12);
                const moisRet = Math.round(moisRetenus % 12);

                return (
                  <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white dark:bg-slate-800 p-3 md:p-1 md:bg-transparent rounded-xl md:rounded-none border md:border-0 border-slate-200 dark:border-slate-700 relative">
                    <div className="col-span-1 md:col-span-4">
                      <label className="md:hidden block text-[10px] font-bold text-slate-400 uppercase mb-1">Origine</label>
                      <select value={exp.origine} onChange={(e) => updateExperience(exp.id, 'origine', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                        {ORIGINES.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="md:hidden block text-[10px] font-bold text-slate-400 uppercase mb-1">Années</label>
                      <input type="number" min="0" value={exp.annees || ""} onChange={(e) => updateExperience(exp.id, 'annees', Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-center text-slate-700 dark:text-slate-200" placeholder="0" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="md:hidden block text-[10px] font-bold text-slate-400 uppercase mb-1">Mois</label>
                      <input type="number" min="0" max="11" value={exp.mois || ""} onChange={(e) => updateExperience(exp.id, 'mois', Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-center text-slate-700 dark:text-slate-200" placeholder="0" />
                    </div>
                    <div className="col-span-1 md:col-span-2 text-center text-sm font-semibold text-slate-500">
                      <span className="md:hidden text-[10px] uppercase block mb-1">Taux</span>
                      {taux * 100}%
                    </div>
                    <div className="col-span-1 md:col-span-1 text-center font-bold text-indigo-600 dark:text-indigo-400">
                      <span className="md:hidden text-[10px] uppercase block mb-1 text-slate-400">Retenue</span>
                      {anneesRet > 0 ? `${anneesRet}a ` : ''}{moisRet > 0 ? `${moisRet}m` : (anneesRet === 0 ? '0' : '')}
                    </div>
                    <div className="absolute top-2 right-2 md:static md:col-span-1 flex justify-end">
                      <button onClick={() => removeExperience(exp.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-end gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-500 uppercase mb-1">Option la plus favorable retenue</div>
                  <div className="text-[10px] font-bold text-emerald-500 uppercase">
                    {totalMois > 0 ? (isPublicFavorable ? "Services Publics (Non cumulable avec le privé)" : "Secteur Privé (Non cumulable avec le public)") : "Aucune expérience"}
                  </div>
                </div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-6 py-2 rounded-xl">
                  {totalAnneesRetenues > 0 && `${totalAnneesRetenues} an${totalAnneesRetenues > 1 ? 's' : ''} `}
                  {totalMoisRetenus > 0 && `${totalMoisRetenus} mois`}
                  {totalAnneesRetenues === 0 && totalMoisRetenus === 0 && "0 mois"}
                </div>
              </div>
              <p className="text-right text-[10px] text-slate-400 italic">En vertu du principe de non-cumul, le simulateur sélectionne automatiquement l'option (Public ou Privé) offrant la plus grande ancienneté retenue.</p>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-6 rounded-2xl text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Classement proposé</h4>
            {!gradeId ? (
              <div className="text-lg font-bold">Sélectionner un grade pour afficher le classement.</div>
            ) : echelonResult ? (
              <div>
                <div className="text-3xl font-black text-indigo-400 mb-2">
                  Échelon {echelonResult.numero}
                </div>
                <div className="text-sm text-slate-300">
                  Indice Brut : <span className="font-bold text-white">{echelonResult.indiceBrut}</span> • Indice Majoré : <span className="font-bold text-white">{echelonResult.indiceMajore}</span>
                </div>
                <div className="mt-3 text-xs text-slate-400 italic bg-slate-700/50 inline-block px-3 py-1.5 rounded-full">
                  Reliquat d'ancienneté conservé dans l'échelon : <strong>{Math.floor(reliquatMois / 12)}a {reliquatMois % 12}m</strong>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Reference Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-center">
          Référence par cadre d'emplois
        </h3>

        <div className="mb-6">
          <h4 className="font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" /> CADRES À RÈGLES DÉROGATOIRES, À VÉRIFIER EN PRIORITÉ
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="p-3">Filière</th>
                  <th className="p-3">Cadre d'emplois</th>
                  <th className="p-3">Décret statutaire</th>
                  <th className="p-3">Particularités de reprise</th>
                  <th className="p-3">Légifrance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {REFS_DEROGATOIRES.map((ref, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{ref.filiere}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{ref.cadre}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400 italic text-xs">{ref.decret}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-xs">{ref.part}</td>
                    <td className="p-3">
                      <a href={ref.lien} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Voir le texte <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-4">
            <CircleCheck className="w-4 h-4" /> CADRES SUIVANT LA RÈGLE GÉNÉRALE (100 % PUBLIC / 50 % PRIVÉ)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="p-3">Filière</th>
                  <th className="p-3">Cadre d'emplois</th>
                  <th className="p-3">Décret statutaire</th>
                  <th className="p-3">Particularités de reprise</th>
                  <th className="p-3">Légifrance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {REFS_GENERALES.map((ref, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{ref.filiere}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{ref.cadre}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400 italic text-xs">{ref.decret}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-xs">{ref.part}</td>
                    <td className="p-3">
                      <a href={ref.lien} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Voir le texte <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <p>Liste non exhaustive. D'autres cadres d'emplois (filière culturelle, médico-technique, médecins territoriaux, infirmiers…) ont leurs propres décrets statutaires.</p>
          <div className="flex items-start gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
            <p><strong>Pour un calcul opposable et la rédaction de l'arrêté, rapprochez-vous de votre Centre de Gestion.</strong> Le CDG est l'interlocuteur compétent pour valider la reprise d'ancienneté au regard du décret statutaire de votre cadre d'emplois.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
