import React, { useState, useMemo } from "react";
import { Calculator, AlertTriangle, Plus, Trash2, Users, Settings2, FileSpreadsheet, FileBox } from "lucide-react";

interface Agent {
  id: string;
  libelle: string;
  grade: string;
  im: number;
  statut: "titulaire" | "contractuel";
  quotite: number; // 0-100
  mois: number; // 1-12
  primes: number; // Mensuel temps plein
  enfants: number;
}

export const MasseSalariale: React.FC = () => {
  // Settings
  const [exercice, setExercice] = useState(new Date().getFullYear());
  const [nomCollectivite, setNomCollectivite] = useState("");
  const [versementMobilite, setVersementMobilite] = useState<number>(0);
  const [cotisationCdg, setCotisationCdg] = useState<number>(0.8);
  const [atMpContractuels, setAtMpContractuels] = useState<number>(0);
  const [assuranceStatutaire, setAssuranceStatutaire] = useState<number>(0);
  const [assuranceChomage, setAssuranceChomage] = useState<boolean>(true);
  const [hausseCnracl, setHausseCnracl] = useState<boolean>(false);
  const [fnalSuppl, setFnalSuppl] = useState<number>(0);

  // Agents
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    statut: "titulaire",
    quotite: 100,
    mois: 12,
    enfants: 0,
    primes: 0,
    im: 366
  });

  const VALEUR_POINT = 4.92278;

  // Calcul Taux
  const taux = useMemo(() => {
    const cnraclBase = 47.53; // Retraite 37.65 + Maladie 9.88
    const cnracl = hausseCnracl ? cnraclBase + 3 : cnraclBase;
    const rafp = 5.00; // Sur primes (max 20% TI)
    const allocTit = 6.65 + fnalSuppl; // Alloc.fam + CSA + FNAL + CNFPT
    const allocCont = 6.65 + fnalSuppl;
    const ircantec = 27.93; // Ircantec + maladie RG + vieillesse
    const chomage = assuranceChomage ? 4.05 : 0; // Taux employeur chômage standard
    
    return {
      titulaire: {
        surTI: cnracl + allocTit + assuranceStatutaire + versementMobilite + cotisationCdg,
        surPrimes: rafp,
        totalAffiche: cnracl + allocTit + assuranceStatutaire + versementMobilite + cotisationCdg
      },
      contractuel: {
        surBrut: ircantec + allocCont + atMpContractuels + chomage + versementMobilite + cotisationCdg,
        totalAffiche: ircantec + allocCont + atMpContractuels + chomage + versementMobilite + cotisationCdg
      }
    };
  }, [versementMobilite, cotisationCdg, atMpContractuels, assuranceStatutaire, assuranceChomage, hausseCnracl, fnalSuppl]);

  // Calcul du SFT
  const calculateSFT = (im: number, enfants: number, quotite: number) => {
    if (enfants === 0) return 0;
    const imForSft = Math.min(Math.max(im, 449), 717);
    const brutForSft = imForSft * VALEUR_POINT;
    
    let sft = 0;
    if (enfants === 1) sft = 2.29;
    else if (enfants === 2) sft = 10.67 + (brutForSft * 0.03);
    else if (enfants === 3) sft = 15.24 + (brutForSft * 0.08);
    else if (enfants >= 4) {
      const enfantsSup = enfants - 3;
      sft = (15.24 + (4.57 * enfantsSup)) + (brutForSft * (0.08 + (0.06 * enfantsSup)));
    }
    
    return sft * (quotite / 100);
  };

  // Calcul d'une ligne agent
  const calculateAgentRow = (agent: Agent) => {
    const imReel = Math.max(agent.im, 366);
    const tiPlein = imReel * VALEUR_POINT;
    
    let tauxProratisation = agent.quotite / 100;
    if (agent.quotite === 80) tauxProratisation = 6 / 7;
    else if (agent.quotite === 90) tauxProratisation = 32 / 35;
    
    const tiMois = tiPlein * tauxProratisation;
    const primesMois = agent.primes * (agent.quotite / 100);
    const sftMois = calculateSFT(imReel, agent.enfants, agent.quotite);
    
    const brutMois = tiMois + primesMois + sftMois;
    const brutAnuel = brutMois * agent.mois;
    const tiAnnuel = tiMois * agent.mois;
    const primesAnnuel = primesMois * agent.mois;
    
    let coutEmployeurAn = brutAnuel;
    
    if (agent.statut === "titulaire") {
      // Sur TI
      const chargesSurTi = tiAnnuel * (taux.titulaire.surTI / 100);
      
      // RAFP (Plafond 20% du TI)
      const plafondRafp = tiAnnuel * 0.20;
      const baseRafp = Math.min(primesAnnuel, plafondRafp);
      const chargesRafp = baseRafp * (taux.titulaire.surPrimes / 100);
      
      // SFT n'a pas de charges patronales (déjà géré par la CAF/compensation)
      // Pour être plus juste avec la règle M57, VM et CDG s'appliquent sur Brut total soumis à cotisation.
      const chargesComp = (brutAnuel - tiAnnuel) * ((versementMobilite + cotisationCdg) / 100);
      
      coutEmployeurAn += chargesSurTi + chargesRafp + chargesComp;
    } else {
      // Contractuel : toutes les charges sur le brut total
      const chargesPatronales = brutAnuel * (taux.contractuel.surBrut / 100);
      coutEmployeurAn += chargesPatronales;
    }
    
    return {
      brutAnuel,
      coutEmployeurAn
    };
  };

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    setAgents([...agents, { ...newAgent, id: Date.now().toString() } as Agent]);
    setIsModalOpen(false);
  };

  const removeAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  const clearAll = () => setAgents([]);

  // Exports CSV
  const handleExport = (format: "simple" | "m57") => {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    
    if (format === "simple") {
      csvContent += "ID;LIBELLÉ;GRADE;IM;STATUT;QUOTITÉ;MOIS;BRUT ANNUEL;COÛT EMPLOYEUR\n";
      agents.forEach(a => {
        const { brutAnuel, coutEmployeurAn } = calculateAgentRow(a);
        csvContent += `${a.id};"${a.libelle}";"${a.grade}";${a.im};${a.statut};${a.quotite}%;${a.mois};${brutAnuel.toFixed(2)};${coutEmployeurAn.toFixed(2)}\n`;
      });
    } else {
      csvContent += "CHAPITRE;ARTICLE;LIBELLÉ;STATUT;BRUT;CHARGES;TOTAL COÛT\n";
      agents.forEach(a => {
        const { brutAnuel, coutEmployeurAn } = calculateAgentRow(a);
        const charges = coutEmployeurAn - brutAnuel;
        const artBrut = a.statut === "titulaire" ? "64111" : "64131";
        const artCharges = a.statut === "titulaire" ? "6451" : "6453";
        
        csvContent += `012;${artBrut};Rémunération ${a.libelle};${a.statut};${brutAnuel.toFixed(2)};0.00;${brutAnuel.toFixed(2)}\n`;
        csvContent += `012;${artCharges};Charges patronales ${a.libelle};${a.statut};0.00;${charges.toFixed(2)};${charges.toFixed(2)}\n`;
      });
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `budget_personnel_${format}_${exercice}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalBrut = agents.reduce((acc, a) => acc + calculateAgentRow(a).brutAnuel, 0);
  const totalCout = agents.reduce((acc, a) => acc + calculateAgentRow(a).coutEmployeurAn, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Simulateur de masse salariale</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Calculez le coût employeur réel d'un ou plusieurs postes, en tenant compte de l'ensemble des charges patronales.</p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-xl">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              <strong>Document estimatif.</strong> Ce budget de personnel est établi à titre indicatif sur la base des taux de cotisations saisis. Il ne saurait se substituer à une liquidation de paie officielle. Les montants peuvent différer des valeurs réelles en raison des arrondis ou évolutions réglementaires. Le SFT est calculé à partir de l'IM, vérifier les droits de chaque agent.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PARAMÉTRAGES */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> À COMPLÉTER PAR LA COLLECTIVITÉ
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Exercice</label>
                  <input type="number" value={exercice} onChange={e => setExercice(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">FNAL suppl. (%)</label>
                  <input type="number" step="0.01" value={fnalSuppl} onChange={e => setFnalSuppl(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Nom de la collectivité</label>
                <input type="text" value={nomCollectivite} onChange={e => setNomCollectivite(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Versement mobilité (%)</label>
                  <input type="number" step="0.01" max="2.95" value={versementMobilite} onChange={e => setVersementMobilite(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Cotisation CDG (%)</label>
                  <input type="number" step="0.01" value={cotisationCdg} onChange={e => setCotisationCdg(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">AT/MP contractuels (%)</label>
                  <input type="number" step="0.01" value={atMpContractuels} onChange={e => setAtMpContractuels(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Ass. statutaire (%)</label>
                  <input type="number" step="0.01" value={assuranceStatutaire} onChange={e => setAssuranceStatutaire(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer mt-4">
                <input type="checkbox" checked={assuranceChomage} onChange={e => setAssuranceChomage(e.target.checked)} className="mt-1" />
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Assurance chômage contractuels</div>
                  <div className="text-xs text-slate-500">Décocher si la collectivité n'est pas affiliée au régime.</div>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer mt-4">
                <input type="checkbox" checked={hausseCnracl} onChange={e => setHausseCnracl(e.target.checked)} className="mt-1" />
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Simulation hausse CNRACL +3 %</div>
                  <div className="text-xs text-slate-500">Ajoute 3 points au taux retraite CNRACL (pour BP).</div>
                </div>
              </label>

            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-4 text-sm">TAUX EFFECTIFS RÉSULTANTS</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-indigo-200 dark:border-indigo-800/50">
                <div>
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">Titulaires</div>
                  <div className="text-[10px] text-indigo-700 dark:text-indigo-400">Sur traitement seul (hors RAFP 5%)</div>
                </div>
                <div className="font-black text-indigo-600 dark:text-indigo-400 text-lg">{taux.titulaire.totalAffiche.toFixed(2)} %</div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-indigo-200 dark:border-indigo-800/50">
                <div>
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">Contractuels</div>
                  <div className="text-[10px] text-indigo-700 dark:text-indigo-400">Sur brut total global</div>
                </div>
                <div className="font-black text-indigo-600 dark:text-indigo-400 text-lg">{taux.contractuel.totalAffiche.toFixed(2)} %</div>
              </div>
            </div>
          </div>
        </div>

        {/* AGENTS & TABLEAU */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5" /> Effectifs simulés ({agents.length})
              </h3>
              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  <Plus className="w-4 h-4" /> Ajouter un agent
                </button>
                <button onClick={clearAll} className="flex items-center gap-1.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg text-sm font-bold transition-colors">
                  Effacer tout
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3">Libellé</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Quot.</th>
                    <th className="px-4 py-3 text-right">Brut / An</th>
                    <th className="px-4 py-3 text-right">Coût Emp. / An</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                  {agents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-slate-400 italic">Aucun agent. Cliquez sur « Ajouter un agent » pour commencer.</td>
                    </tr>
                  )}
                  {agents.map(a => {
                    const rowData = calculateAgentRow(a);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{a.libelle}</div>
                          <div className="text-xs text-slate-500">{a.grade ? `${a.grade} • ` : ''}IM {a.im} • {a.mois} mois</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${a.statut === 'titulaire' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}`}>
                            {a.statut === 'titulaire' ? 'Titulaire' : 'Contractuel'}
                          </span>
                        </td>
                        <td className="px-4 py-3">{a.quotite}%</td>
                        <td className="px-4 py-3 text-right font-mono text-slate-500 dark:text-slate-400">{rowData.brutAnuel.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 dark:text-white">{rowData.coutEmployeurAn.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => removeAgent(a.id)} className="text-slate-400 hover:text-red-500 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {agents.length > 0 && (
                  <tfoot className="bg-slate-100 dark:bg-slate-900/80 font-bold text-slate-900 dark:text-white">
                    <tr>
                      <td colSpan={3} className="px-4 py-4 text-right">TOTAL ESTIMÉ :</td>
                      <td className="px-4 py-4 text-right font-mono text-slate-500">{totalBrut.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                      <td className="px-4 py-4 text-right font-mono text-emerald-600 dark:text-emerald-400 text-lg">{totalCout.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex flex-wrap gap-3">
              <button disabled={agents.length === 0} onClick={() => handleExport("simple")} className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm disabled:opacity-50">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export CSV Simple
              </button>
              <button disabled={agents.length === 0} onClick={() => handleExport("m57")} className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm disabled:opacity-50">
                <FileBox className="w-4 h-4 text-indigo-600" /> Export M57 Développé
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL AJOUT AGENT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-slideUp border border-slate-200 dark:border-slate-700">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ajouter un agent</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold">✕</button>
            </div>
            <form onSubmit={handleAddAgent} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Libellé / Nom du poste</label>
                  <input required type="text" value={newAgent.libelle || ""} onChange={e => setNewAgent({...newAgent, libelle: e.target.value})} placeholder="Ex: Directeur Général" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Grade (facultatif)</label>
                  <input type="text" value={newAgent.grade || ""} onChange={e => setNewAgent({...newAgent, grade: e.target.value})} placeholder="Ex: Attaché" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Statut</label>
                  <select value={newAgent.statut} onChange={e => setNewAgent({...newAgent, statut: e.target.value as any})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white">
                    <option value="titulaire">Titulaire</option>
                    <option value="contractuel">Contractuel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Indice Majoré (IM)</label>
                  <input required type="number" min="366" value={newAgent.im || ""} onChange={e => setNewAgent({...newAgent, im: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Quotité de travail (%)</label>
                  <input required type="number" min="0" max="100" value={newAgent.quotite || ""} onChange={e => setNewAgent({...newAgent, quotite: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Mois budgétés / 12</label>
                  <input required type="number" min="1" max="12" value={newAgent.mois || ""} onChange={e => setNewAgent({...newAgent, mois: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Primes / mois (Brut TP)</label>
                  <input type="number" min="0" value={newAgent.primes || 0} onChange={e => setNewAgent({...newAgent, primes: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Enfants (pour SFT)</label>
                  <input type="number" min="0" value={newAgent.enfants || 0} onChange={e => setNewAgent({...newAgent, enfants: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
              </div>
              
              <div className="pt-6 flex gap-3 justify-end border-t border-slate-200 dark:border-slate-700 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-sm transition-colors">Ajouter au budget</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
