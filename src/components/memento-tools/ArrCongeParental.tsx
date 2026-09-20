import React, { useState } from "react";
import { FileSignature, Copy, CircleCheck, User, Building, Calendar, Info, FileText } from "lucide-react";
import { fptCadres } from "../../utils/fptData";

export const ArrCongeParental: React.FC = () => {
  // 1. AUTORITÉ TERRITORIALE & SIGNATURE
  const [titreAutorite, setTitreAutorite] = useState("Le Maire");
  const [collectivite, setCollectivite] = useState("Commune de Gennevilliers");
  const [departement, setDepartement] = useState("Hauts-de-Seine");
  const [villeSignature, setVilleSignature] = useState("Gennevilliers");
  const [dateArrete, setDateArrete] = useState("");
  const [chargeExecution, setChargeExecution] = useState("La directrice générale des services");

  // 2. AGENT
  const [civilite, setCivilite] = useState("Monsieur");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cadreEmplois, setCadreEmplois] = useState("");
  const [grade, setGrade] = useState("");
  
  const handleCadreChange = (cadreNom: string) => {
    setCadreEmplois(cadreNom);
    const cadre = fptCadres.find(c => c.nom === cadreNom);
    if (cadre) {
      setGrade(cadre.grades[0] || "");
    } else {
      setGrade("");
    }
    setShowResult(false);
  };

  // 4. CONGÉ PARENTAL & ENFANT
  const [prenomEnfant, setPrenomEnfant] = useState("");
  const [nomEnfant, setNomEnfant] = useState("");
  const [natureEnfant, setNatureEnfant] = useState("Naissance");
  const [dateNaissanceEnfant, setDateNaissanceEnfant] = useState("");
  
  const [dateDebut, setDateDebut] = useState("");
  const [finPremierePeriode, setFinPremierePeriode] = useState("");
  const [dateLimiteRenouvellement, setDateLimiteRenouvellement] = useState("");
  const [villeTA, setVilleTA] = useState("Nanterre");
  
  const [copied, setCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleCopy = () => {
    const el = document.getElementById("arrete-content");
    if (el) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      selection?.removeAllRanges();
      selection?.addRange(range);
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      selection?.removeAllRanges();
    }
  };

  const handleGenerate = () => {
    setShowResult(true);
  };

  const handleInputChange = (setter: any, value: any) => {
    setter(value);
    setShowResult(false);
  };

  const handleDateNaissanceChange = (value: string) => {
    setDateNaissanceEnfant(value);
    if (value) {
      const date = new Date(value);
      date.setFullYear(date.getFullYear() + 3);
      setDateLimiteRenouvellement(date.toISOString().split('T')[0]);
    } else {
      setDateLimiteRenouvellement("");
    }
    setShowResult(false);
  };

  const handleDateDebutChange = (value: string) => {
    setDateDebut(value);
    if (value) {
      const date = new Date(value);
      date.setMonth(date.getMonth() + 6);
      setFinPremierePeriode(date.toISOString().split('T')[0]);
    } else {
      setFinPremierePeriode("");
    }
    setShowResult(false);
  };

  const renderField = (value: string, placeholder: string) => {
    if (!value || value.trim() === "") {
      return <span className="text-orange-500 font-bold bg-orange-50 px-1 rounded">[{placeholder}]</span>;
    }
    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(value).toLocaleDateString('fr-FR');
    }
    return <span className="font-semibold">{value}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600 dark:text-rose-400">
            <FileSignature className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Arrêté de Congé Parental</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Placement en congé parental</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 1. AUTORITÉ TERRITORIALE */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400" /> Autorité territoriale & Signature
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Titre de l'autorité</label>
                <input type="text" value={titreAutorite} onChange={(e) => handleInputChange(setTitreAutorite, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nom de la collectivité</label>
                <input type="text" value={collectivite} onChange={(e) => handleInputChange(setCollectivite, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Département (CDG)</label>
                <input type="text" value={departement} onChange={(e) => handleInputChange(setDepartement, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Ville de signature</label>
                <input type="text" value={villeSignature} onChange={(e) => handleInputChange(setVilleSignature, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Date de l'arrêté</label>
                <input type="date" value={dateArrete} onChange={(e) => handleInputChange(setDateArrete, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Chargé(e) de l'exécution</label>
                <input type="text" value={chargeExecution} onChange={(e) => handleInputChange(setChargeExecution, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>

          {/* 2. AGENT */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> Informations de l'agent
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Civilité</label>
                <select value={civilite} onChange={(e) => handleInputChange(setCivilite, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white">
                  <option value="Monsieur">Monsieur</option>
                  <option value="Madame">Madame</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nom</label>
                <input type="text" value={nom} onChange={(e) => handleInputChange(setNom, e.target.value)} placeholder="Nom" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Prénom</label>
                <input type="text" value={prenom} onChange={(e) => handleInputChange(setPrenom, e.target.value)} placeholder="Prénom" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Cadre d'emplois</label>
                <select value={cadreEmplois} onChange={(e) => handleCadreChange(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white">
                  <option value="">Sélectionnez un cadre d'emplois...</option>
                  {fptCadres.map(c => <option key={c.id} value={c.nom}>{c.nom}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Grade</label>
                <select value={grade} onChange={(e) => handleInputChange(setGrade, e.target.value)} disabled={!cadreEmplois} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white">
                  <option value="">Sélectionnez un grade...</option>
                  {cadreEmplois && fptCadres.find(c => c.nom === cadreEmplois)?.grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* 4. ENFANT */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> Enfant
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Prénom de l'enfant</label>
                <input type="text" value={prenomEnfant} onChange={(e) => handleInputChange(setPrenomEnfant, e.target.value)} placeholder="Prénom" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nom de l'enfant</label>
                <input type="text" value={nomEnfant} onChange={(e) => handleInputChange(setNomEnfant, e.target.value)} placeholder="Nom" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nature</label>
                <select value={natureEnfant} onChange={(e) => handleInputChange(setNatureEnfant, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white">
                  <option value="Naissance">Naissance</option>
                  <option value="Adoption">Adoption</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Date de naissance / adoption</label>
                <input type="date" value={dateNaissanceEnfant} onChange={(e) => handleDateNaissanceChange(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>

          {/* 5. CONGÉ */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Congé
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Début du congé</label>
                <input type="date" value={dateDebut} onChange={(e) => handleDateDebutChange(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Fin de la première période</label>
                <input type="date" value={finPremierePeriode} onChange={(e) => handleInputChange(setFinPremierePeriode, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
                <p className="text-[10px] text-slate-500 mt-1 italic">Durée d'une période : 2 à 6 mois</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Date limite de renouvellement</label>
                <input type="date" value={dateLimiteRenouvellement} onChange={(e) => handleInputChange(setDateLimiteRenouvellement, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
                <p className="text-[10px] text-slate-500 mt-1 italic">En principe : 3e anniversaire de l'enfant</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Ville du Tribunal Administratif</label>
                <input type="text" value={villeTA} onChange={(e) => handleInputChange(setVilleTA, e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-start gap-2.5 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-xs text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
            <p>
              Les champs non renseignés apparaîtront en <strong>orange</strong> dans le document généré. Vous pourrez ainsi repérer facilement ce qu'il reste à compléter manuellement.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button onClick={handleGenerate} className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/30 flex items-center gap-2">
              Générer l'arrêté (.docx via Copier/Coller)
            </button>
          </div>
        </div>

        <div className={`mt-8 transition-all duration-500 ${showResult ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Aperçu de l'arrêté
              </h3>
              <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors border border-slate-200 dark:border-slate-600 shadow-sm">
                {copied ? <CircleCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copié !" : "Copier pour Word"}
              </button>
            </div>
            
            <div className="p-10 font-serif text-[13px] leading-relaxed text-slate-900 dark:text-slate-200 max-h-[600px] overflow-y-auto" id="arrete-content">
              
              <div className="flex justify-between items-start mb-12">
                <div className="w-1/2 text-center border-b border-slate-400 pb-2">
                  <p className="uppercase font-bold text-sm">{renderField(collectivite, "NOM DE LA COLLECTIVITÉ")}</p>
                  <p className="text-xs">{renderField(departement, "DÉPARTEMENT")}</p>
                </div>
                <div className="w-1/2 text-right">
                  <p>Arrêté n° {renderField("", "NUMÉRO")}</p>
                </div>
              </div>

              <h4 className="text-center font-bold text-lg mb-8 uppercase">
                ARRÊTÉ PORTANT MISE EN CONGÉ PARENTAL<br/>
                DE {civilite.toUpperCase()} {renderField(nom.toUpperCase(), "NOM")} {renderField(prenom, "PRÉNOM")}
              </h4>

              <div className="space-y-4 text-justify">
                <p><strong>{renderField(titreAutorite, "AUTORITÉ TERRITORIALE")}</strong> de {renderField(collectivite, "COLLECTIVITÉ")},</p>
                
                <p><strong>Vu</strong> le code général de la fonction publique,</p>
                <p><strong>Vu</strong> le décret n°86-68 du 13 janvier 1986 modifié relatif aux positions de détachement, hors cadres, de disponibilité, de congé parental des fonctionnaires territoriaux et à l'intégration,</p>
                <p><strong>Vu</strong> la demande écrite en date du ............................ par laquelle {civilite} {renderField(nom.toUpperCase(), "NOM")} {renderField(prenom, "PRÉNOM")}, {renderField(grade, "GRADE")}, sollicite un congé parental pour {natureEnfant === "Naissance" ? "la naissance" : "l'adoption"} de son enfant {renderField(prenomEnfant, "PRÉNOM ENFANT")} {renderField(nomEnfant.toUpperCase(), "NOM ENFANT")}, né(e) le {renderField(dateNaissanceEnfant, "DATE NAISSANCE / ADOPTION")},</p>
                
                <div className="text-center font-bold mt-8 mb-6">ARRÊTE</div>

                <p><strong>ARTICLE 1 :</strong><br/>
                À compter du {renderField(dateDebut, "DATE DE DÉBUT")}, {civilite} {renderField(nom.toUpperCase(), "NOM")} {renderField(prenom, "PRÉNOM")} est placé(e) en position de congé parental pour une première période allant jusqu'au {renderField(finPremierePeriode, "FIN DE LA 1ÈRE PÉRIODE")} inclus.</p>
                
                <p><strong>ARTICLE 2 :</strong><br/>
                Ce congé pourra être renouvelé par périodes de 2 à 6 mois, dans la limite de la date de renouvellement fixée au {renderField(dateLimiteRenouvellement, "DATE LIMITE")}.</p>

                <p><strong>ARTICLE 3 :</strong><br/>
                Pendant cette période, l'intéressé(e) cesse de bénéficier de sa rémunération et de ses droits à l'avancement, sous réserve des dispositions légales en vigueur.</p>

                <p><strong>ARTICLE 4 :</strong><br/>
                {renderField(chargeExecution, "CHARGÉ D'EXÉCUTION")} et le Comptable Public sont chargés, chacun en ce qui le concerne, de l'exécution du présent arrêté qui sera notifié à l'intéressé(e).</p>

                <p className="text-xs italic mt-6 border-t border-slate-300 pt-4">
                  Le Maire / Le Président informe que le présent arrêté peut faire l'objet d'un recours pour excès de pouvoir devant le Tribunal Administratif de {renderField(villeTA, "VILLE DU T.A.")} dans un délai de deux mois à compter de sa notification.
                </p>

                <div className="mt-8 flex justify-end">
                  <div className="text-right">
                    <p>Fait à {renderField(villeSignature, "VILLE")}, le {renderField(dateArrete, "DATE DE L'ARRÊTÉ")}</p>
                    <p className="mt-4 font-bold">{renderField(titreAutorite, "AUTORITÉ TERRITORIALE")}</p>
                    <p className="italic text-xs mt-8">(Signature et cachet)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
