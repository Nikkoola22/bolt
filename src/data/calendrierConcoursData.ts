// Données officielles des Concours et Examens Professionnels FPT
// Source : CIG Petite Couronne (Hauts-de-Seine 92, Seine-Saint-Denis 93, Val-de-Marne 94) & CDG Île-de-France

export interface SessionConcoursExamen {
  id: string;
  intitule: string;
  typeEpreuve: "examen_professionnel" | "concours_interne" | "concours_externe" | "troisieme_concours" | "recrutement_direct";
  voie: "avancement_grade" | "promotion_interne" | "recrutement";
  categorie: "A" | "B" | "C";
  filiere: "Administrative" | "Technique" | "Médico-sociale" | "Animation" | "Culturelle" | "Sportive" | "Police / Sécurité";
  cadreEmploi: string;
  gradeCible: string;
  organisateur: string;
  anneeSession: number;
  dateOuvertureInscriptions: string;
  dateClotureInscriptions: string;
  dateLimiteDepotDossier: string;
  dateDebutEpreuves: string;
  dateFinEpreuves?: string;
  statutSession: "ouverte" | "a_venir" | "cloturee";
  conditionsAccesSynthese: string;
  piecesPrincipales: string[];
  urlOfficielleCig: string;
  urlTelechargementPdf?: string;
  conseilPreparation?: string;
}

export const LIENS_OFFICIELS_CIG = {
  portailConcours: "https://www.cig929394.fr/liste-des-concours/",
  calendriersPage: "https://www.cig929394.fr/concours/calendriers-previsionnels",
  pdfExamens2026: "https://www.cig929394.fr/wp-content/uploads/2026/09/Calendrier_2026_examens_08_09_26.pdf",
  pdfConcours2026: "https://www.cig929394.fr/wp-content/uploads/2026/05/Calendrier_2026_concours_11_05_26.pdf",
  pdfExamens2027: "https://www.cig929394.fr/wp-content/uploads/2026/09/Calendrier_2027_examens_03_09_26.pdf",
  pdfConcours2027: "https://www.cig929394.fr/wp-content/uploads/2026/09/Calendrier_2027_concours_01_09_26.pdf",
  portailNational: "https://www.concours-territoriaux.fr/",
};

export const SESSIONS_CONCOURS_EXAMENS: SessionConcoursExamen[] = [
  // --- FILIÈRE ADMINISTRATIVE ---
  {
    id: "exam-redacteur-ppal-2cl-2026",
    intitule: "Rédacteur territorial principal de 2e classe (Examen Professionnel)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "B",
    filiere: "Administrative",
    cadreEmploi: "Rédacteur territorial",
    gradeCible: "Rédacteur principal de 2e classe",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2026,
    dateOuvertureInscriptions: "2026-03-03",
    dateClotureInscriptions: "2026-04-08",
    dateLimiteDepotDossier: "2026-04-16",
    dateDebutEpreuves: "2026-09-24",
    statutSession: "cloturee",
    conditionsAccesSynthese: "Au moins 1 an d'ancienneté au 4e échelon de Rédacteur et 3 ans de services effectifs dans le grade.",
    piecesPrincipales: ["Arrêté d'échelon", "État de services effectifs", "Dossier RAEP"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2026,
    conseilPreparation: "Épreuve écrite : note de synthèse ou rapport avec propositions à partir d'un dossier. Entretien oral avec le jury."
  },
  {
    id: "exam-redacteur-ppal-2cl-2027",
    intitule: "Rédacteur territorial principal de 2e classe (Examen Professionnel 2027)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "B",
    filiere: "Administrative",
    cadreEmploi: "Rédacteur territorial",
    gradeCible: "Rédacteur principal de 2e classe",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-03-09",
    dateClotureInscriptions: "2027-04-14",
    dateLimiteDepotDossier: "2027-04-22",
    dateDebutEpreuves: "2027-09-23",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Au moins 1 an d'ancienneté au 4e échelon de Rédacteur et 3 ans de services effectifs dans le grade au plus tard au 31 décembre de l'année de l'examen.",
    piecesPrincipales: ["Arrêté individuel d'échelon", "État des services effectifs validé DRH", "Dossier RAEP"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Session 2027 CIG Petite Couronne. Anticipez la constitution de votre dossier RAEP dès fin 2026."
  },
  {
    id: "exam-redacteur-promotion-interne-2027",
    intitule: "Rédacteur territorial (Promotion Interne C vers B par Examen Professionnel)",
    typeEpreuve: "examen_professionnel",
    voie: "promotion_interne",
    categorie: "B",
    filiere: "Administrative",
    cadreEmploi: "Rédacteur territorial",
    gradeCible: "Rédacteur territorial",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-03-09",
    dateClotureInscriptions: "2027-04-14",
    dateLimiteDepotDossier: "2027-04-22",
    dateDebutEpreuves: "2027-09-23",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Fonctionnaires de catégorie C comptant au moins 7 ans de services publics dont au moins 4 ans en catégorie C.",
    piecesPrincipales: ["État détaillé des services publics", "Dossier professionnel", "Avis hiérarchique"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Permet l'accès à la catégorie B par liste d'aptitude après réussite de l'examen et avis de la commission LDG."
  },
  {
    id: "concours-redacteur-2027",
    intitule: "Rédacteur territorial (Concours Interne & Externe 2027)",
    typeEpreuve: "concours_interne",
    voie: "recrutement",
    categorie: "B",
    filiere: "Administrative",
    cadreEmploi: "Rédacteur territorial",
    gradeCible: "Rédacteur territorial",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-02-09",
    dateClotureInscriptions: "2027-03-17",
    dateLimiteDepotDossier: "2027-03-25",
    dateDebutEpreuves: "2027-10-14",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Concours interne ouvert aux agents titulaires ou contractuels justifiant d'au moins 4 ans de services publics au 1er janvier de l'année du concours.",
    piecesPrincipales: ["État général des services publics", "Justificatifs d'état civil", "Dossier d'inscription"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfConcours2027,
    conseilPreparation: "Concours biennal. Épreuves écrites : note de synthèse avec propositions opérationnelles. Préparation CNFPT recommandée."
  },
  {
    id: "exam-attache-ppal-2027",
    intitule: "Attaché territorial principal (Examen Professionnel 2027)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "A",
    filiere: "Administrative",
    cadreEmploi: "Attaché territorial",
    gradeCible: "Attaché principal",
    organisateur: "CDG 77 / CIG Petite Couronne conventionné",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2026-11-03",
    dateClotureInscriptions: "2026-12-16",
    dateLimiteDepotDossier: "2026-12-23",
    dateDebutEpreuves: "2027-04-08",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Avoir atteint au moins le 5e échelon d'attaché et justifier d'au moins 3 ans de services effectifs dans un corps ou cadre d'emplois de catégorie A.",
    piecesPrincipales: ["Dernier arrêté d'avancement d'échelon", "Dossier RAEP complet", "Rapport d'évaluation professionnelle"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Inscriptions ouvertes du 03/11/2026 au 16/12/2026 ! Épreuve orale de reconnaissance des acquis de l'expérience professionnelle (RAEP)."
  },
  {
    id: "concours-attache-2026",
    intitule: "Attaché territorial (Concours Interne, Externe et 3e Concours)",
    typeEpreuve: "concours_interne",
    voie: "recrutement",
    categorie: "A",
    filiere: "Administrative",
    cadreEmploi: "Attaché territorial",
    gradeCible: "Attaché territorial",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2026,
    dateOuvertureInscriptions: "2026-03-24",
    dateClotureInscriptions: "2026-04-29",
    dateLimiteDepotDossier: "2026-05-07",
    dateDebutEpreuves: "2026-11-19",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Concours interne : 4 ans de services publics au 1er janvier. Externe : Diplôme de niveau 6 (Licence, Master, IEP).",
    piecesPrincipales: ["Justificatif de services publics", "Diplôme requis ou attestation RAEP", "Fiche individuelle"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfConcours2026,
    conseilPreparation: "Épreuve écrite le 19 novembre 2026. Note de cadrage / rapport avec propositions sur les politiques publiques territoriales."
  },
  {
    id: "exam-adjoint-adm-ppal-2cl-2027",
    intitule: "Adjoint administratif principal de 2e classe (Examen Professionnel C1 -> C2)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "C",
    filiere: "Administrative",
    cadreEmploi: "Adjoint administratif territorial",
    gradeCible: "Adjoint administratif principal de 2e classe",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-01-12",
    dateClotureInscriptions: "2027-02-17",
    dateLimiteDepotDossier: "2027-02-25",
    dateDebutEpreuves: "2027-05-20",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Avoir atteint le 4e échelon et compter au moins 3 ans de services effectifs dans le grade d'adjoint administratif.",
    piecesPrincipales: ["Arrêté d'échelon", "Certificat de services effectifs", "Dossier d'inscription"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Épreuve pratique / questionnaire à choix multiple et réponses courtes sur l'environnement territorial."
  },

  // --- FILIÈRE TECHNIQUE ---
  {
    id: "exam-tech-ppal-2cl-2026",
    intitule: "Technicien territorial principal de 2e classe (Examen Professionnel B1 -> B2)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "B",
    filiere: "Technique",
    cadreEmploi: "Technicien territorial",
    gradeCible: "Technicien principal de 2e classe",
    organisateur: "CIG Petite Couronne / CDG 77",
    anneeSession: 2026,
    dateOuvertureInscriptions: "2026-10-13",
    dateClotureInscriptions: "2026-11-18",
    dateLimiteDepotDossier: "2026-11-26",
    dateDebutEpreuves: "2027-04-15",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Au moins 1 an dans le 4e échelon et au moins 3 ans de services effectifs dans le grade de Technicien.",
    piecesPrincipales: ["Arrêté d'échelon", "Dossier RAEP technique", "État de services"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2026,
    conseilPreparation: "Inscriptions dès le 13/10/2026 ! Épreuve d'admissibilité technique puis oral devant jury spécialisé."
  },
  {
    id: "concours-technicien-2027",
    intitule: "Technicien territorial (Concours Interne & Externe 2027)",
    typeEpreuve: "concours_interne",
    voie: "recrutement",
    categorie: "B",
    filiere: "Technique",
    cadreEmploi: "Technicien territorial",
    gradeCible: "Technicien territorial",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-02-09",
    dateClotureInscriptions: "2027-03-17",
    dateLimiteDepotDossier: "2027-03-25",
    dateDebutEpreuves: "2027-09-16",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Concours interne : 4 ans de services publics au 1er janvier. Spécialités : réseaux, bâtiment, espaces verts, informatique, etc.",
    piecesPrincipales: ["Dossier complet", "État de services publics", "Justificatifs de spécialité"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfConcours2027,
    conseilPreparation: "Choisissez judicieusement votre spécialité technique lors de la préinscription (bâtiment, VRD, environnement, SIG)."
  },
  {
    id: "exam-adjoint-tech-ppal-2cl-2027",
    intitule: "Adjoint technique principal de 2e classe (Examen Professionnel C1 -> C2)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "C",
    filiere: "Technique",
    cadreEmploi: "Adjoint technique territorial",
    gradeCible: "Adjoint technique principal de 2e classe",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-01-12",
    dateClotureInscriptions: "2027-02-17",
    dateLimiteDepotDossier: "2027-02-25",
    dateDebutEpreuves: "2027-05-27",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Avoir atteint le 4e échelon et compter au moins 3 ans de services effectifs dans le grade d'Adjoint technique.",
    piecesPrincipales: ["Arrêté d'échelon", "Certificat de services effectifs", "Dossier d'inscription"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Épreuve pratique portant sur l'option technique choisie (bâtiment, restauration, voirie, mécanique, etc.)."
  },
  {
    id: "exam-agent-maitrise-2027",
    intitule: "Agent de maîtrise territorial (Examen Professionnel et Promotion Interne)",
    typeEpreuve: "examen_professionnel",
    voie: "promotion_interne",
    categorie: "C",
    filiere: "Technique",
    cadreEmploi: "Agent de maîtrise territorial",
    gradeCible: "Agent de maîtrise territorial",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-03-09",
    dateClotureInscriptions: "2027-04-14",
    dateLimiteDepotDossier: "2027-04-22",
    dateDebutEpreuves: "2027-10-07",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Adjoints techniques titulaires justifiant d'au moins 7 ans de services effectifs dans leur cadre d'emplois.",
    piecesPrincipales: ["État de services", "Arrêté individuel", "Dossier professionnel"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Accès au cadre d'emplois de maîtrise (encadrement d'équipe de terrain). Épreuve écrite d'organisation de chantier."
  },
  {
    id: "concours-ingenieur-2027",
    intitule: "Ingénieur territorial (Concours Interne & Externe 2027)",
    typeEpreuve: "concours_interne",
    voie: "recrutement",
    categorie: "A",
    filiere: "Technique",
    cadreEmploi: "Ingénieur territorial",
    gradeCible: "Ingénieur territorial",
    organisateur: "CIG Petite Couronne (92-93-94) / CIG Versailles",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-01-12",
    dateClotureInscriptions: "2027-02-17",
    dateLimiteDepotDossier: "2027-02-25",
    dateDebutEpreuves: "2027-06-17",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Concours interne : 4 ans de services publics au 1er janvier. Externe : Titre d'ingénieur ou Master 2 scientifique/technique.",
    piecesPrincipales: ["Diplôme ou état de services publics", "Dossier d'inscription", "Projet professionnel"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfConcours2027,
    conseilPreparation: "Épreuve écrite d'ingénierie territoriale et étude de cas technique."
  },

  // --- FILIÈRE MÉDICO-SOCIALE & PETITE ENFANCE ---
  {
    id: "concours-eje-2027",
    intitule: "Éducateur territorial de jeunes enfants - EJE (Concours)",
    typeEpreuve: "concours_interne",
    voie: "recrutement",
    categorie: "A",
    filiere: "Médico-sociale",
    cadreEmploi: "Éducateur de jeunes enfants",
    gradeCible: "Éducateur de jeunes enfants",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-01-12",
    dateClotureInscriptions: "2027-02-17",
    dateLimiteDepotDossier: "2027-02-25",
    dateDebutEpreuves: "2027-05-13",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Diplôme d'État d'éducateur de jeunes enfants (DEEJE) obligatoire pour l'externe, ou 4 ans de services effectifs pour l'interne.",
    piecesPrincipales: ["Diplôme DEEJE", "État des services", "Dossier d'inscription"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfConcours2027,
    conseilPreparation: "Projet pédagogique, développement du jeune enfant et accueil collectif petite enfance."
  },
  {
    id: "exam-auxiliaire-puericulture-ppal-2cl-2027",
    intitule: "Auxiliaire de puériculture principal de 2e classe (Examen Professionnel)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "B",
    filiere: "Médico-sociale",
    cadreEmploi: "Auxiliaire de puériculture territorial",
    gradeCible: "Auxiliaire de puériculture principal de 2e classe",
    organisateur: "CIG Petite Couronne / CIG Versailles",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-03-09",
    dateClotureInscriptions: "2027-04-14",
    dateLimiteDepotDossier: "2027-04-22",
    dateDebutEpreuves: "2027-10-14",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Au moins 1 an dans le 4e échelon et 3 ans de services effectifs dans le grade de classe normale.",
    piecesPrincipales: ["Arrêté d'échelon", "Attestation de services", "Dossier RAEP"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Entretien axé sur les pratiques en crèche municipale, hygiène, sécurité et accompagnement de l'enfant."
  },

  // --- FILIÈRE ANIMATION & CULTURELLE ---
  {
    id: "exam-animateur-ppal-2cl-2027",
    intitule: "Animateur territorial principal de 2e classe (Examen Professionnel B1 -> B2)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "B",
    filiere: "Animation",
    cadreEmploi: "Animateur territorial",
    gradeCible: "Animateur principal de 2e classe",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-03-09",
    dateClotureInscriptions: "2027-04-14",
    dateLimiteDepotDossier: "2027-04-22",
    dateDebutEpreuves: "2027-09-23",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Au moins 1 an au 4e échelon et au moins 3 ans de services effectifs dans le grade d'animateur.",
    piecesPrincipales: ["Arrêté d'échelon", "Projet d'animation", "Dossier RAEP"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Conception et pilotage de projets jeunesse, péri-scolaires ou séniors."
  },
  {
    id: "exam-adjoint-animation-ppal-2cl-2027",
    intitule: "Adjoint d'animation principal de 2e classe (Examen Professionnel C1 -> C2)",
    typeEpreuve: "examen_professionnel",
    voie: "avancement_grade",
    categorie: "C",
    filiere: "Animation",
    cadreEmploi: "Adjoint d'animation territorial",
    gradeCible: "Adjoint d'animation principal de 2e classe",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2027,
    dateOuvertureInscriptions: "2027-01-12",
    dateClotureInscriptions: "2027-02-17",
    dateLimiteDepotDossier: "2027-02-25",
    dateDebutEpreuves: "2027-05-20",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Au moins le 4e échelon et 3 ans de services effectifs dans le grade d'adjoint d'animation.",
    piecesPrincipales: ["Arrêté d'échelon", "Attestation de services", "Dossier d'inscription"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfExamens2027,
    conseilPreparation: "Réglementation des accueils collectifs de mineurs (ACM), sécurité des enfants et dynamique d'équipe."
  },

  // --- FILIÈRE POLICE MUNICIPALE ---
  {
    id: "concours-gardien-police-2026",
    intitule: "Gardien-brigadier de police municipale (Concours Interne & Externe)",
    typeEpreuve: "concours_interne",
    voie: "recrutement",
    categorie: "C",
    filiere: "Police / Sécurité",
    cadreEmploi: "Agent de police municipale",
    gradeCible: "Gardien-brigadier",
    organisateur: "CIG Petite Couronne (92-93-94)",
    anneeSession: 2026,
    dateOuvertureInscriptions: "2026-05-05",
    dateClotureInscriptions: "2026-06-10",
    dateLimiteDepotDossier: "2026-06-18",
    dateDebutEpreuves: "2026-11-05",
    statutSession: "a_venir",
    conditionsAccesSynthese: "Concours interne ouvert aux ASVP et agents de surveillance comptant au moins 2 ans de services publics.",
    piecesPrincipales: ["Certificat médical d'aptitude", "Casier judiciaire bulletin n°2 vierge", "État de services"],
    urlOfficielleCig: "https://www.cig929394.fr/liste-des-concours/",
    urlTelechargementPdf: LIENS_OFFICIELS_CIG.pdfConcours2026,
    conseilPreparation: "Épreuves physiques éliminatoires, rapport de police municipale et entretien de mise en situation."
  }
];

// Helper pour filtrer les sessions pertinentes selon un grade ou un profil
export function findSessionsForGrade(gradeNom: string, cadreNom?: string): SessionConcoursExamen[] {
  const norm = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const targetGrade = norm(gradeNom);
  const targetCadre = cadreNom ? norm(cadreNom) : "";

  return SESSIONS_CONCOURS_EXAMENS.filter((session) => {
    const sIntitule = norm(session.intitule);
    const sGrade = norm(session.gradeCible);
    const sCadre = norm(session.cadreEmploi);

    return (
      sIntitule.includes(targetGrade) ||
      sGrade.includes(targetGrade) ||
      targetGrade.includes(sGrade) ||
      (targetCadre && (sCadre.includes(targetCadre) || targetCadre.includes(sCadre)))
    );
  });
}
