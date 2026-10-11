import React, { useState, useMemo, useEffect } from "react";
import { 
  X, 
  Search, 
  GraduationCap, 
  Calendar, 
  ExternalLink, 
  Download, 
  Filter, 
  Sparkles, 
  Clock, 
  Building2, 
  FileText,
  AlertCircle,
  Info,
  RotateCcw,
} from "lucide-react";
import { 
  SESSIONS_CONCOURS_EXAMENS, 
  LIENS_OFFICIELS_CIG, 
  GRADES_AVANCEMENT_AU_CHOIX,
  type SessionConcoursExamen 
} from "../data/calendrierConcoursData";
import { formatDateFrench } from "../services/simulationEngine";

interface ConcoursExamensSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSimulerExamen?: (session: SessionConcoursExamen) => void;
}

export const ConcoursExamensSearchModal: React.FC<ConcoursExamensSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = "",
  onSimulerExamen,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedFiliere, setSelectedFiliere] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Réinitialiser systématiquement tous les filtres par défaut à chaque ouverture du modal
  useEffect(() => {
    if (isOpen) {
      setSearchQuery(initialQuery || "");
      setSelectedCat("all");
      setSelectedFiliere("all");
      setSelectedType("all");
      setSelectedYear("all");
    }
  }, [isOpen, initialQuery]);

  // Détection si la recherche porte sur un grade dont l'avancement se fait exclusivement au choix
  const activeAuChoix = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const cleaned = searchQuery.replace(/\s*\([ABC][0-9]\)/gi, "").trim();
    return (
      GRADES_AVANCEMENT_AU_CHOIX.find(
        (info) => info.gradePattern.test(searchQuery) || info.gradePattern.test(cleaned)
      ) || null
    );
  }, [searchQuery]);

  const filteredSessions = useMemo(() => {
    const rawQ = searchQuery.trim();
    const cleanedQ = rawQ.replace(/\s*\([ABC][0-9]\)/gi, "").trim();
    const norm = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const qNorm = norm(cleanedQ);

    const stopWords = new Set(["pour", "dans", "avec", "sans", "sous", "vers", "classe", "principal", "principale", "1re", "2e", "3e", "1ere", "2eme", "3eme", "de", "la", "le", "du", "des"]);
    const tokens = qNorm.split(/\s+/).filter(t => t.length >= 3 && !stopWords.has(t));

    return SESSIONS_CONCOURS_EXAMENS.filter((s) => {
      // 1. Filtre texte intelligent et souple
      if (rawQ) {
        // Est-ce une session recommandée pour ce grade au choix ?
        const isAlternativeForAuChoix = activeAuChoix && activeAuChoix.sessionsAlternativesConseillees.includes(s.id);

        const sTitle = norm(s.intitule);
        const sCadre = norm(s.cadreEmploi);
        const sGrade = norm(s.gradeCible);
        const sCond = norm(s.conditionsAccesSynthese);
        const sKeywords = (s.motsCles || []).map(norm);
        const sEligibles = (s.cadresOrigineEligibles || []).map(norm);

        // Correspondance de la phrase complète nettoyée
        const matchPhrase =
          sTitle.includes(qNorm) ||
          sCadre.includes(qNorm) ||
          sGrade.includes(qNorm) ||
          sCond.includes(qNorm) ||
          sKeywords.some(k => k.includes(qNorm));

        // Correspondance par mots-clés distincts (ex: "adjoint" ET "administratif")
        const combined = `${sTitle} ${sCadre} ${sGrade} ${sCond} ${sKeywords.join(" ")} ${sEligibles.join(" ")}`;
        const matchTokens = tokens.length > 0 && tokens.every(token => combined.includes(token));

        // Correspondance des cadres éligibles en promotion interne
        const matchEligible = sEligibles.some(c => c.includes(qNorm) || (tokens.length > 0 && tokens.every(t => c.includes(t))));

        if (!matchPhrase && !matchTokens && !isAlternativeForAuChoix && !matchEligible) {
          return false;
        }
      }

      // 2. Filtre catégorie
      if (selectedCat !== "all" && s.categorie !== selectedCat) {
        return false;
      }

      // 3. Filtre filière
      if (selectedFiliere !== "all" && s.filiere !== selectedFiliere) {
        return false;
      }

      // 4. Filtre type
      if (selectedType !== "all") {
        if (selectedType === "examen" && s.typeEpreuve !== "examen_professionnel") return false;
        if (selectedType === "concours_interne" && s.typeEpreuve !== "concours_interne") return false;
        if (selectedType === "promotion_interne" && s.voie !== "promotion_interne") return false;
      }

      // 5. Filtre année
      if (selectedYear !== "all" && s.anneeSession.toString() !== selectedYear) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCat, selectedFiliere, selectedType, selectedYear, activeAuChoix]);

  const handleResetAllFilters = () => {
    setSearchQuery("");
    setSelectedCat("all");
    setSelectedFiliere("all");
    setSelectedType("all");
    setSelectedYear("all");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* En-tête avec gradient valorisant */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-4 sm:p-6 text-white flex items-start justify-between gap-4 border-b border-indigo-900/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                CIG Petite Couronne & IDF
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                Sessions 2026 - 2027
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              Recherche des Concours & Examens Professionnels
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Calendriers officiels CIG Petite Couronne (92, 93, 94), dates des épreuves et périodes d'inscription.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 space-y-3.5">
          {/* Champ de recherche texte */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par grade (ex: Rédacteur, Attaché, Technicien, Adjoint...)"
              className="w-full pl-10 pr-24 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded cursor-pointer flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Effacer
              </button>
            )}
          </div>

          {/* Filtres par capsules */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-bold mr-1 flex items-center gap-1 text-[11px] uppercase tracking-wider">
              <Filter className="w-3 h-3" /> Filtres :
            </span>

            {/* Catégories */}
            <div className="flex items-center bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
              {["all", "A", "B", "C"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedCat === cat
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat === "all" ? "Toutes Cat." : `Cat. ${cat}`}
                </button>
              ))}
            </div>

            {/* Filières */}
            <select
              value={selectedFiliere}
              onChange={(e) => setSelectedFiliere(e.target.value)}
              className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">Toutes filières</option>
              <option value="Administrative">Administrative</option>
              <option value="Technique">Technique</option>
              <option value="Médico-sociale">Médico-sociale</option>
              <option value="Animation">Animation</option>
              <option value="Police / Sécurité">Police / Sécurité</option>
            </select>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous types</option>
              <option value="examen">Examens professionnels</option>
              <option value="concours_interne">Concours internes</option>
              <option value="promotion_interne">Promotion interne</option>
            </select>

            {/* Année */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">Toutes années</option>
              <option value="2026">Sessions 2026</option>
              <option value="2027">Sessions 2027</option>
            </select>

            {/* Bouton de réinitialisation rapide si au moins un filtre est actif */}
            {(searchQuery || selectedCat !== "all" || selectedFiliere !== "all" || selectedType !== "all" || selectedYear !== "all") && (
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 px-2 py-1 rounded-md transition-colors cursor-pointer"
                title="Réinitialiser l'ensemble des filtres"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Liens rapides vers les documents officiels */}
        <div className="bg-indigo-50/70 dark:bg-indigo-950/20 px-4 sm:px-6 py-2.5 border-b border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between gap-3 text-xs overflow-x-auto">
          <span className="font-bold text-indigo-950 dark:text-indigo-200 shrink-0 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            PDFs Officiels CIG :
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={LIENS_OFFICIELS_CIG.pdfExamens2026}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3 h-3" /> Examens 2026
            </a>
            <a
              href={LIENS_OFFICIELS_CIG.pdfConcours2026}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3 h-3" /> Concours 2026
            </a>
            <a
              href={LIENS_OFFICIELS_CIG.pdfExamens2027}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3 h-3" /> Examens 2027
            </a>
            <a
              href={LIENS_OFFICIELS_CIG.pdfConcours2027}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3 h-3" /> Concours 2027
            </a>
          </div>
        </div>

        {/* Liste des résultats */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Bloc d'information statutaire si la recherche porte sur un grade d'avancement au choix sans examen */}
          {activeAuChoix && (
            <div className="bg-amber-50/95 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-700/60 p-4 rounded-2xl flex items-start gap-3.5 text-xs text-amber-950 dark:text-amber-200 shadow-2xs">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-xs sm:text-sm text-amber-900 dark:text-amber-100">
                    Avancement statutaire « Au Choix » : {activeAuChoix.gradeAffiche}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                    Sans examen pro
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                  {activeAuChoix.explicationStatutaire}
                </p>
                <div className="bg-amber-100/60 dark:bg-amber-900/30 p-2 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 space-y-0.5">
                  <span className="font-bold">Conditions statutaires :</span> {activeAuChoix.conditionsResume}
                </div>
                <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300 pt-0.5">
                  👉 Ci-dessous sont listées les sessions officielles 2026-2027 pour progresser depuis votre cadre d'emplois (Promotion interne vers la catégorie B, concours internes et examens de la filière).
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {filteredSessions.length} session{filteredSessions.length > 1 ? "s" : ""} trouvée{filteredSessions.length > 1 ? "s" : ""}
            </span>
            <span className="text-[11px]">Source officielle : CIG Petite Couronne (Pantin)</span>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3.5">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Aucune session ne correspond à cette combinaison de filtres.
                </p>
                <p className="max-w-md mx-auto text-slate-600 dark:text-slate-400">
                  {searchQuery 
                    ? `Le filtre texte "${searchQuery}" restreint la sélection. Essayez d'élargir ou d'effacer le texte pour voir toutes les opportunités.`
                    : "Modifiez ou réinitialisez les critères de sélection pour consulter le calendrier complet."}
                </p>
              </div>

              {/* Boutons d'action rapide pour débloquer la vue */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Effacer le texte de recherche</span>
                  </button>
                )}

                {selectedCat !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedCat("all")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <span>Afficher toutes les catégories</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser tous les filtres</span>
                </button>
              </div>

              <div className="pt-2">
                <a
                  href={LIENS_OFFICIELS_CIG.portailConcours}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  <span>Accéder au moteur officiel cig929394.fr</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-xs hover:shadow-md space-y-3.5"
                >
                  {/* Ligne 1 : Badges et Catégorie */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        Catégorie {session.categorie}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {session.filiere}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300">
                        {session.typeEpreuve === "examen_professionnel"
                          ? session.voie === "promotion_interne" ? "Examen Promotion Interne" : "Examen Professionnel"
                          : session.typeEpreuve === "concours_interne"
                          ? "Concours Interne"
                          : "Concours Externe"}
                      </span>
                    </div>

                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300/80 dark:border-amber-700">
                      Session {session.anneeSession}
                    </span>
                  </div>

                  {/* Ligne 2 : Titre */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                      {session.intitule}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Organisateur : <strong>{session.organisateur}</strong></span>
                    </p>
                  </div>

                  {/* Ligne 3 : Calendrier prévisionnel clé */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-500" /> Préinscriptions
                      </span>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                        Du {formatDateFrench(session.dateOuvertureInscriptions)} au {formatDateFrench(session.dateClotureInscriptions)}
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-amber-500" /> Dépôt dossier
                      </span>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                        Jusqu'au {formatDateFrench(session.dateLimiteDepotDossier)}
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-500" /> Date des épreuves
                      </span>
                      <p className="font-black text-emerald-700 dark:text-emerald-400 text-xs">
                        {formatDateFrench(session.dateDebutEpreuves)}
                      </p>
                    </div>
                  </div>

                  {/* Conditions statutaires synthétiques */}
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p>
                      <strong>Conditions requises : </strong> {session.conditionsAccesSynthese}
                    </p>
                    {session.conseilPreparation && (
                      <p className="text-[11px] text-indigo-900 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 p-2 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60">
                        💡 <strong>Conseil préparation : </strong> {session.conseilPreparation}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap">
                    <div className="flex items-center gap-2">
                      <a
                        href={session.urlOfficielleCig}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                      >
                        <span>S'inscrire sur l'espace candidat CIG</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {onSimulerExamen && (
                      <button
                        type="button"
                        onClick={() => {
                          onSimulerExamen(session);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs hover:brightness-105 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>Simuler ma réussite dans ma carrière</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pied de page modal */}
        <div className="bg-slate-100 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <a
            href={LIENS_OFFICIELS_CIG.portailNational}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
          >
            <span>Portail national : concours-territoriaux.fr</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
