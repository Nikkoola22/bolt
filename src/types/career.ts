// Types pour le Simulateur « Parcours Agent » de la Fonction Publique

export type VersantFonctionPublique = "FPT" | "FPE" | "FPH";

export type StatutAgent = "titulaire" | "stagiaire" | "contractuel_cdi" | "contractuel_cdd";

export type CategorieFonctionPublique = "A" | "B" | "C";

export type Filiere = "Administrative" | "Technique" | "Médico-sociale" | "Animation" | "Culturelle" | "Sportive";

export interface Echelon {
  numero: number;
  dureeAnnees: number; // Durée dans l echelon (PPCR)
  indiceBrut: number;
  indiceMajore: number;
  description?: string;
}

export interface ConditionAvancementGrade {
  echelonMinimum: number;
  ancienneteEchelonAnnees: number; // Ancienneté dans l echelon
  ancienneteGradeAnnees?: number; // Ancienneté dans le grade
  ancienneteCadreAnnees?: number; // Ancienneté dans le cadre d emplois / corps
  ancienneteServicesPublicsAnnees?: number; // Services publics effectifs
  examenProfessionnelRequis?: boolean;
  typeVoie: "au_choix" | "examen_professionnel" | "concours_interne";
  descriptionVoie: string;
  piecesRequises: string[];
  actesAdministratifs: string[];
}

export interface PerspectiveGrade {
  gradeCibleId: string;
  nomGradeCible: string;
  categorieCible: CategorieFonctionPublique;
  typePerspective: "avancement_grade" | "promotion_interne";
  conditions: ConditionAvancementGrade[];
  modaliteReclassement: string;
  explicationReclassement: string;
  ratioPromusPromouvablesExplication: string;
}

export interface GradeDefinition {
  id: string;
  filiere: Filiere;
  categorie: CategorieFonctionPublique;
  nom: string;
  echelons: Echelon[];
  perspectives: PerspectiveGrade[];
  descriptionGrade: string;
  isGradeAvancement?: boolean; // Indique si le grade est accessible uniquement par avancement de carrière (réservé aux titulaires)
}

export interface CadreEmploiDefinition {
  id: string;
  nom: string;
  filiere: Filiere;
  categorie: CategorieFonctionPublique;
  grades: GradeDefinition[];
  decretReference: string;
}

// Types pour les Événements de Carrière
export type TypeEvenementCarriere = 
  | "temps_partiel"
  | "conge_parental"
  | "disponibilite"
  | "promotion_grade"
  | "promotion_interne"
  | "examen_professionnel"
  | "mobilite_detachement"
  | "reclassement"
  | "reussite_concours";

export interface MotifDisponibilite {
  code: "convenance_personnelle_sans_activite" | "convenance_personnelle_avec_activite" | "elever_enfant" | "suivre_conjoint";
  libelle: string;
  maintienAvancementMaxAnnees: number;
  justificatifs: string[];
}

export interface EvenementCarriere {
  id: string;
  type: TypeEvenementCarriere;
  dateDebut: string; // YYYY-MM-DD
  dateFin?: string; // YYYY-MM-DD
  dureeMois: number;
  titre: string;
  descriptionDetaillee: string;
  // Spécifique selon le type
  quotite?: number; // 50, 60, 70, 80, 90 pour temps partiel
  motifDisponibilite?: MotifDisponibilite["code"];
  activiteDeclareeHeuresAn?: number; // Si dispo avec activité >= 600h
  gradeCibleId?: string; // Pour promotion / avancement
  modePromotion?: "au_choix" | "examen_professionnel";
  administrationAccueil?: string; // Pour détachement
  impacteAvancementEchelon: boolean;
  impacteRemuneration: boolean;
  justificatifsFournis: boolean;
  notesAgent?: string;
}

// Profil de départ de l agent
export interface ProfilAgent {
  id: string;
  nom?: string;
  prenom: string;
  matricule?: string;
  collectivite: string;
  versant: VersantFonctionPublique;
  statut: StatutAgent;
  dateEntreeFonctionPublique: string; // YYYY-MM-DD
  dateNominationGradeActuel: string; // YYYY-MM-DD
  cadreEmploiId: string;
  gradeId: string;
  echelonActuel: number;
  dateEffetEchelonActuel: string; // YYYY-MM-DD
  ancienneteConserveeMois: number; // reliquat d ancienneté conservée
  quotiteActuelle: number; // 100, 80, etc.
  evenementsSimules: EvenementCarriere[];
}

// Statut d une condition statutaire à une date donnée
export interface EvaluationCondition {
  libelle: string;
  statut: "remplie" | "en_cours" | "bloquante" | "non_remplie";
  valeurActuelle: string;
  valeurRequise: string;
  progressionPourcent: number;
  tempsRestantTexte?: string;
  detailsExplicatifs: string;
  piecesAFournir: string[];
  actesAdministratifs: string[];
}

// Jalon sur la frise temporelle (Timeline Node)
export interface JalonTimeline {
  id: string;
  date: string; // YYYY-MM-DD
  annee: number;
  mois: number;
  typeJalon: 
    | "situation_actuelle"
    | "avancement_echelon"
    | "promouvabilite_grade"
    | "promouvabilite_interne"
    | "evenement_vie"
    | "promotion_effective"
    | "fin_evenement";
  titre: string;
  sousTitre: string;
  gradeNom: string;
  echelonNumero: number;
  indiceBrut: number;
  indiceMajore: number;
  traitementBrutMensuel: number;
  gainIndiciaire?: number;
  gainFinancierBrutMensuel?: number;
  statutValidation: "actuel" | "garanti" | "conditionnel" | "bloque" | "simule";
  // Explications pédagogiques
  pourquoi: string;
  conditionsRemplies: EvaluationCondition[];
  conditionsManquantes: EvaluationCondition[];
  justificatifsRequis: string[];
  decisionsAdministrativesRequises: string[];
  hypothesesEtAlertes: string[];
  referenceReglementaire: string;
  evenementAssocie?: EvenementCarriere;
}

// Résultat global d une simulation
export interface ResultatSimulation {
  profil: ProfilAgent;
  jalonActuel: JalonTimeline;
  prochainEchelonJalon: JalonTimeline | null;
  premierePromouvabiliteGrade: JalonTimeline | null;
  premierePromouvabiliteInterne: JalonTimeline | null;
  jalons: JalonTimeline[];
  synthesePedagogique: {
    pointsCles: string[];
    alertesVigilance: string[];
    justificatifsUrgents: string[];
    conseilsEntretienPro: string[];
  };
}
