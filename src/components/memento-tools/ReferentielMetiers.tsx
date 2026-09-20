import React, { useState, useMemo } from "react";
import { Search, Download, BookOpen, X, CircleCheck } from "lucide-react";
import metiersDataRaw from "../../data/metiers.json";

interface Metier {
  code: string;
  domaine: string;
  famille: string;
  intitule: string;
  connaissances: string;
  savoir_faire: string;
  savoir_etre: string;
}

const metiersData = metiersDataRaw as Metier[];

// Extraction des domaines uniques pour le filtre
const domaines = Array.from(new Set(metiersData.map(m => m.domaine))).sort((a, b) => a.localeCompare(b));

export const ReferentielMetiers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [selectedMetier, setSelectedMetier] = useState<Metier | null>(null);

  const filteredMetiers = useMemo(() => {
    const normalizeStr = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const term = normalizeStr(searchTerm);
    return metiersData.filter(m => {
      const matchSearch = !term || 
        normalizeStr(m.intitule).includes(term) || 
        normalizeStr(m.domaine).includes(term) || 
        normalizeStr(m.code).includes(term);
      const matchDomaine = !selectedDomaine || m.domaine === selectedDomaine;
      return matchSearch && matchDomaine;
    });
  }, [searchTerm, selectedDomaine]);

  // Limite d'affichage pour performance (comme sur l'original)
  const displayedMetiers = filteredMetiers.slice(0, 200);

  const handleDownloadCsv = () => {
    const escapeCsv = (str: string) => `"${(str || '').replace(/\n/g, ' ').replace(/"/g, '""')}"`;
    const headers = ["Code", "Domaine", "Famille", "Intitulé", "Connaissances", "Savoir-faire", "Savoir-être"];
    const rows = filteredMetiers.map(m => [
      escapeCsv(m.code),
      escapeCsv(m.domaine),
      escapeCsv(m.famille),
      escapeCsv(m.intitule),
      escapeCsv(m.connaissances),
      escapeCsv(m.savoir_faire),
      escapeCsv(m.savoir_etre)
    ].join(";"));
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(";"), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "referentiel-metiers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatList = (text: string) => {
    if (!text) return null;
    return (
      <ul className="list-disc list-inside space-y-1 mt-2">
        {text.split('\n').filter(line => line.trim()).map((line, i) => (
          <li key={i} className="text-slate-700 dark:text-slate-300 text-sm">{line.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Référentiel des métiers</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {metiersData.length} fiches métiers issues du Répertoire des Métiers de la Fonction Publique Territoriale (RMFP).
            </p>
          </div>
        </div>

        {/* FILTRES */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Rechercher un métier, domaine, code..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl pl-10 px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={selectedDomaine}
            onChange={e => setSelectedDomaine(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les domaines</option>
            {domaines.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Référentiel des métiers</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {metiersData.length} fiches métiers issues du Répertoire des Métiers de la Fonction Publique Territoriale (RMFP).
              </p>
            </div>
          </div>
          <button 
            onClick={handleDownloadCsv}
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
          >
            <Download className="w-4 h-4" /> Télécharger CSV
          </button>
        </div>
      </div>

      {/* VUE DÉTAIL (remplace le tableau) */}
      {selectedMetier && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden animate-fadeIn">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start bg-slate-50 dark:bg-slate-900/50">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">{selectedMetier.code}</div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white leading-tight">{selectedMetier.intitule}</h3>
              <div className="text-sm text-slate-500 mt-1">{selectedMetier.domaine} — {selectedMetier.famille}</div>
            </div>
            <button 
              onClick={() => setSelectedMetier(null)} 
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" /> Retour à la liste
            </button>
          </div>

          <div className="p-6 space-y-6">
            {selectedMetier.connaissances && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" /> Connaissances
                </h4>
                <div className="pl-6 border-l-2 border-blue-100 dark:border-blue-900/50">
                  {formatList(selectedMetier.connaissances)}
                </div>
              </div>
            )}

            {selectedMetier.savoir_faire && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" /> Savoir-faire
                </h4>
                <div className="pl-6 border-l-2 border-emerald-100 dark:border-emerald-900/50">
                  {formatList(selectedMetier.savoir_faire)}
                </div>
              </div>
            )}

            {selectedMetier.savoir_etre && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" /> Savoir-être
                </h4>
                <div className="pl-6 border-l-2 border-purple-100 dark:border-purple-900/50">
                  {formatList(selectedMetier.savoir_etre)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RECHERCHE ET TABLEAU (cachés si un métier est sélectionné) */}
      {!selectedMetier && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Rechercher un métier
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Intitulé, code ou domaine..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full sm:w-64">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Filtrer par domaine
              </label>
              <select
                className="block w-full pl-3 pr-10 py-2.5 text-base border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                value={selectedDomaine}
                onChange={(e) => setSelectedDomaine(e.target.value)}
              >
                <option value="">Tous les domaines</option>
                {domaines.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 text-xs font-medium text-slate-500">
              <span className="font-bold text-blue-600 dark:text-blue-400">{filteredMetiers.length}</span> résultat(s)
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 w-24">Code</th>
                    <th className="px-4 py-3 w-48">Domaine</th>
                    <th className="px-4 py-3 w-48">Famille</th>
                    <th className="px-4 py-3">Intitulé du métier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {displayedMetiers.map(m => (
                    <tr 
                      key={m.code} 
                      onClick={() => { setSelectedMetier(m); window.scrollTo(0, 0); }}
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs font-mono text-slate-400">{m.code}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{m.domaine}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{m.famille}</td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{m.intitule}</td>
                    </tr>
                  ))}
                  {filteredMetiers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-slate-400 italic">Aucun métier trouvé.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {filteredMetiers.length > 200 && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 text-xs text-center font-medium">
                Affichage limité à 200 résultats. Affinez votre recherche ou téléchargez le CSV pour voir l'intégralité.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReferentielMetiers;
