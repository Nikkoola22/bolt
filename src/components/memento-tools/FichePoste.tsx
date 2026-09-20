import React, { useState, useMemo } from 'react';
import { 
  Building, MapPin, Search, FileText, Plus, Trash2, 
  Download, Info, Building2, CircleCheck
} from 'lucide-react';
import metiersDataRaw from '../../data/metiers.json';

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

const FichePoste: React.FC = () => {
  // Section 1: Collectivité
  const [collectivite, setCollectivite] = useState('');
  const [adresse, setAdresse] = useState('');

  // Section 2: Structure organisationnelle
  const [structures, setStructures] = useState<string[]>(['']);

  // Section 3: Identification du poste
  const [numPoste, setNumPoste] = useState('');
  const [quotite, setQuotite] = useState('100');
  const [libellePoste, setLibellePoste] = useState('');
  
  // Métier RMFP Search
  const [metierSearch, setMetierSearch] = useState('');
  const [selectedMetier, setSelectedMetier] = useState<Metier | null>(null);
  const [showMetierDropdown, setShowMetierDropdown] = useState(false);

  const [filiere, setFiliere] = useState('');
  const [categorie, setCategorie] = useState('C');
  const [cadreEmplois, setCadreEmplois] = useState('');
  const [grade, setGrade] = useState('');
  const [localisation, setLocalisation] = useState('');

  // Section 3 (Optionnel): Rémunération
  const [showRemuneration, setShowRemuneration] = useState(false);
  const [groupeRifseep, setGroupeRifseep] = useState('');
  const [montantRifseep, setMontantRifseep] = useState('');
  const [fourchetteRifseep, setFourchetteRifseep] = useState('');
  const [nbi, setNbi] = useState('');

  // Section 4: Résumé du poste
  const [resume, setResume] = useState('');

  // Section 5: Missions
  const [missions, setMissions] = useState<string[]>(['']);

  // Section 6: Conditions d'exercice
  const [typeEncadrement, setTypeEncadrement] = useState('');
  const [teletravail, setTeletravail] = useState<'oui' | 'non'>('non');
  const [sujetions, setSujetions] = useState('');
  const [contraintes, setContraintes] = useState('');
  const [deplacements, setDeplacements] = useState('');
  const [formations, setFormations] = useState('');
  const [habilitations, setHabilitations] = useState('');

  // Section 7: Profil recherché
  const [niveauFormation, setNiveauFormation] = useState('');
  const [experiences, setExperiences] = useState('');
  const [connaissances, setConnaissances] = useState('');
  const [savoirFaire, setSavoirFaire] = useState('');
  const [savoirEtre, setSavoirEtre] = useState('');

  // --- Handlers ---
  const handleAddStructure = () => setStructures([...structures, '']);
  const handleUpdateStructure = (index: number, value: string) => {
    const newStructures = [...structures];
    newStructures[index] = value;
    setStructures(newStructures);
  };
  const handleRemoveStructure = (index: number) => {
    if (structures.length > 1) {
      const newStructures = [...structures];
      newStructures.splice(index, 1);
      setStructures(newStructures);
    }
  };

  const handleAddMission = () => setMissions([...missions, '']);
  const handleUpdateMission = (index: number, value: string) => {
    const newMissions = [...missions];
    newMissions[index] = value;
    setMissions(newMissions);
  };
  const handleRemoveMission = (index: number) => {
    if (missions.length > 1) {
      const newMissions = [...missions];
      newMissions.splice(index, 1);
      setMissions(newMissions);
    }
  };

  const filteredMetiers = useMemo(() => {
    if (!metierSearch) return [];
    const term = metierSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return metiersData.filter(m => 
      m.intitule.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(term) ||
      m.code.toLowerCase().includes(term)
    ).slice(0, 10);
  }, [metierSearch]);

  const selectMetier = (m: Metier) => {
    setSelectedMetier(m);
    setMetierSearch(m.intitule);
    setShowMetierDropdown(false);
    
    // Auto-fill Profil recherché
    setConnaissances(m.connaissances);
    setSavoirFaire(m.savoir_faire);
    setSavoirEtre(m.savoir_etre);
  };

  const handleDownload = () => {
    if (!collectivite || !structures[0] || !numPoste || !quotite || !libellePoste || !selectedMetier || !localisation || !resume || !missions[0]) {
      alert("Veuillez remplir tous les champs obligatoires (marqués d'un *).");
      return;
    }
    alert("Le fichier Word (Fiche_de_poste.docx) serait généré et téléchargé ici !");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl text-indigo-600 dark:text-indigo-400">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Fiche de poste</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                Complétez les informations du poste pour produire une fiche de poste prête à l'emploi.
              </p>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-4 py-3 rounded-xl text-sm border border-indigo-100 dark:border-indigo-800/50 flex items-start gap-3">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Base légale : Art. L. 311-1 du Code général de la fonction publique (ex Art. 41 loi n°84-53 du 26 janvier 1984). 
              <br/>Champs * obligatoires · Les sections optionnelles s'activent avec le toggle.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Collectivité */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">1</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-400" /> COLLECTIVITÉ
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nom de la collectivité *</label>
              <input type="text" value={collectivite} onChange={e => setCollectivite(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Adresse</label>
              <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* Section 2: Structure organisationnelle */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">2</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" /> STRUCTURE ORGANISATIONNELLE
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {structures.map((struct, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Structure {i + 1} {i === 0 && '*'}
                  </label>
                  <input type="text" value={struct} onChange={e => handleUpdateStructure(i, e.target.value)} placeholder={i === 0 ? "Ex: Direction Générale des Services" : "Ex: Service RH"} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                {i > 0 && (
                  <button onClick={() => handleRemoveStructure(i)} className="mt-7 p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleAddStructure} className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              <Plus className="w-4 h-4" /> Ajouter un niveau de structure
            </button>
          </div>
        </div>

        {/* Section 3: Identification du poste */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">3</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> IDENTIFICATION DU POSTE
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Numéro de poste *</label>
              <input type="text" value={numPoste} onChange={e => setNumPoste(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Quotité horaire *</label>
              <div className="relative">
                <input type="number" value={quotite} onChange={e => setQuotite(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl pl-4 pr-10 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">%</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Libellé du poste *</label>
              <input type="text" value={libellePoste} onChange={e => setLibellePoste(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Libellé métier RMFP *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  value={metierSearch}
                  onChange={e => { setMetierSearch(e.target.value); setShowMetierDropdown(true); }}
                  onFocus={() => setShowMetierDropdown(true)}
                  placeholder="Rechercher un métier dans le référentiel..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {showMetierDropdown && filteredMetiers.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
                  {filteredMetiers.map(m => (
                    <div 
                      key={m.code} 
                      onClick={() => selectMetier(m)}
                      className="px-4 py-3 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border-b last:border-0 border-slate-100 dark:border-slate-700"
                    >
                      <div className="font-bold text-slate-800 dark:text-slate-200">{m.intitule}</div>
                      <div className="text-xs text-slate-500">{m.code} - {m.domaine}</div>
                    </div>
                  ))}
                </div>
              )}
              {selectedMetier && (
                <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CircleCheck className="w-3.5 h-3.5" /> Métier sélectionné. Les compétences seront pré-remplies.
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Filière *</label>
              <input type="text" value={filiere} onChange={e => setFiliere(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Catégorie *</label>
              <select value={categorie} onChange={e => setCategorie(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cadre d'emplois *</label>
              <input type="text" value={cadreEmplois} onChange={e => setCadreEmplois(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Grade(s) d'adossement</label>
              <input type="text" value={grade} onChange={e => setGrade(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Localisation du poste *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input type="text" value={localisation} onChange={e => setLocalisation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
            <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setShowRemuneration(!showRemuneration)}>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">Rémunération (Optionnel)</h3>
              <div className="flex items-center">
                <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${showRemuneration ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${showRemuneration ? 'translate-x-4' : ''}`}></div>
                </div>
              </div>
            </div>
            
            {showRemuneration && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-slideUp">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Groupe RIFSEEP</label>
                  <input type="text" value={groupeRifseep} onChange={e => setGroupeRifseep(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Montant RIFSEEP fixe</label>
                  <input type="text" value={montantRifseep} onChange={e => setMontantRifseep(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Fourchette RIFSEEP</label>
                  <input type="text" value={fourchetteRifseep} onChange={e => setFourchetteRifseep(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">NBI</label>
                  <input type="text" value={nbi} onChange={e => setNbi(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Résumé */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">4</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              RÉSUMÉ DU POSTE
            </h2>
          </div>
          <div className="p-6">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Résumé *</label>
            <textarea 
              value={resume} 
              onChange={e => setResume(e.target.value)} 
              rows={4}
              placeholder="Décrivez brièvement la raison d'être du poste..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
        </div>

        {/* Section 5: Missions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">5</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              MISSIONS
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {missions.map((mission, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    MISSION {i + 1} {i === 0 && '*'}
                  </label>
                  <textarea 
                    value={mission} 
                    onChange={e => handleUpdateMission(i, e.target.value)} 
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
                {i > 0 && (
                  <button onClick={() => handleRemoveMission(i)} className="mt-7 p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleAddMission} className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              <Plus className="w-4 h-4" /> Ajouter une mission
            </button>
          </div>
        </div>

        {/* Section 6: Conditions d'exercice */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">6</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              CONDITIONS D'EXERCICE
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Type d'encadrement</label>
              <input type="text" value={typeEncadrement} onChange={e => setTypeEncadrement(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Télétravail possible</label>
              <div className="flex gap-4">
                <button onClick={() => setTeletravail('oui')} className={`flex-1 py-2.5 rounded-xl border font-medium text-sm transition-colors ${teletravail === 'oui' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300' : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'}`}>Oui</button>
                <button onClick={() => setTeletravail('non')} className={`flex-1 py-2.5 rounded-xl border font-medium text-sm transition-colors ${teletravail === 'non' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300' : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'}`}>Non</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Sujétions horaires</label>
              <input type="text" value={sujetions} onChange={e => setSujetions(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Contraintes particulières</label>
              <input type="text" value={contraintes} onChange={e => setContraintes(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Déplacements</label>
              <input type="text" value={deplacements} onChange={e => setDeplacements(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Formations / certifications obligatoires</label>
              <input type="text" value={formations} onChange={e => setFormations(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Habilitations requises</label>
              <input type="text" value={habilitations} onChange={e => setHabilitations(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* Section 7: Profil recherché */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-mono text-xs font-bold">7</span>
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              PROFIL RECHERCHÉ
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Niveau de formation requis</label>
                <input type="text" value={niveauFormation} onChange={e => setNiveauFormation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Expériences exigées</label>
                <input type="text" value={experiences} onChange={e => setExperiences(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Connaissances souhaitées <span className="text-xs font-normal text-slate-400">(pré-rempli depuis le RMFP)</span></label>
              <textarea 
                value={connaissances} 
                onChange={e => setConnaissances(e.target.value)} 
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Savoir-faire / compétences techniques <span className="text-xs font-normal text-slate-400">(pré-rempli depuis le RMFP)</span></label>
              <textarea 
                value={savoirFaire} 
                onChange={e => setSavoirFaire(e.target.value)} 
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Savoir-être / qualités relationnelles <span className="text-xs font-normal text-slate-400">(pré-rempli depuis le RMFP)</span></label>
              <textarea 
                value={savoirEtre} 
                onChange={e => setSavoirEtre(e.target.value)} 
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-40">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white leading-none">Fiche de poste</div>
              <div className="text-xs text-slate-500 mt-1">Document officiel de description du poste</div>
            </div>
          </div>
          
          <button 
            onClick={handleDownload}
            className="w-full md:w-auto relative flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-5 h-5" />
            Générer la fiche de poste
          </button>
        </div>
      </div>
    </div>
  );
};

export default FichePoste;
