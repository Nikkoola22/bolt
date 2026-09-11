import type { 
  ProfilAgent, 
  ResultatSimulation, 
  JalonTimeline, 
  EvaluationCondition, 
  GradeDefinition, 
  CadreEmploiDefinition,
  EvenementCarriere
} from "../types/career";
import { CADRES_EMPLOIS, VALEUR_POINT_INDICE_MENSUEL, MOTIFS_DISPONIBILITE } from "../data/gradesData";

// Utilitaires de date
export function parseDate(dStr: string): Date {
  const [y, m, d] = dStr.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDateFrench(dStr: string): string {
  if (!dStr) return "";
  const d = parseDate(dStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function addMonthsToDate(dStr: string, months: number): string {
  const d = parseDate(dStr);
  d.setMonth(d.getMonth() + months);
  return formatDateISO(d);
}

export function diffMonths(dStart: string, dEnd: string): number {
  const start = parseDate(dStart);
  const end = parseDate(dEnd);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

export function formatDurationInYearsAndMonths(totalMonths: number): string {
  if (totalMonths <= 0) return "0 mois";
  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);
  if (years === 0) return `${months} mois`;
  if (months === 0) return `${years} an${years > 1 ? "s" : ""}`;
  return `${years} an${years > 1 ? "s" : ""} et ${months} mois`;
}

export function calculateTraitementBrut(indiceMajore: number, quotite: number, typePosition?: string): number {
  if (typePosition === "conge_parental" || typePosition === "disponibilite") {
    return 0;
  }
  const pleinTraitement = indiceMajore * VALEUR_POINT_INDICE_MENSUEL;
  if (quotite >= 100) return pleinTraitement;
  if (quotite === 80) return pleinTraitement * (6 / 7); // Règle 6/7ème pour 80%
  if (quotite === 90) return pleinTraitement * (32 / 35); // Règle 32/35ème pour 90%
  return pleinTraitement * (quotite / 100);
}

// Recherche cadre et grade
export function findCadreAndGrade(cadreId: string, gradeId: string) {
  const cadre = CADRES_EMPLOIS.find(c => c.id === cadreId) || CADRES_EMPLOIS[0];
  const grade = cadre.grades.find(g => g.id === gradeId) || cadre.grades[0];
  return { cadre, grade };
}

export function findGradeById(gradeId: string): { cadre: CadreEmploiDefinition; grade: GradeDefinition } | null {
  for (const c of CADRES_EMPLOIS) {
    const g = c.grades.find(gr => gr.id === gradeId);
    if (g) return { cadre: c, grade: g };
  }
  return null;
}

// Vérifie si un grade est un grade d'avancement (inaccessible au recrutement contractuel)
export function isGradeAvancement(cadre: CadreEmploiDefinition, gradeId: string): boolean {
  const grade = cadre.grades.find(g => g.id === gradeId);
  if (grade?.isGradeAvancement !== undefined) {
    return grade.isGradeAvancement;
  }
  const idx = cadre.grades.findIndex(g => g.id === gradeId);
  return idx > 0;
}

// Calcul de l impact d un événement sur le décalage d ancienneté
export function computeDisponibiliteSeniorityPenaltyMonths(evenements: EvenementCarriere[]): number {
  let penaltyMonths = 0;
  for (const evt of evenements) {
    if (evt.type === "disponibilite") {
      if (evt.motifDisponibilite === "convenance_personnelle_sans_activite" || (!evt.justificatifsFournis && evt.motifDisponibilite === "convenance_personnelle_avec_activite")) {
        penaltyMonths += evt.dureeMois;
      }
    }
  }
  return penaltyMonths;
}

// Moteur de simulation principal
export function runSimulation(profil: ProfilAgent): ResultatSimulation {
  const { cadre, grade } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const nowStr = "2026-09-11"; // Date de référence
  const isContractuel = profil.statut === "contractuel_cdi" || profil.statut === "contractuel_cdd";
  const concoursEvt = isContractuel ? profil.evenementsSimules.find(e => e.type === "reussite_concours") : null;
  const dateNominationStagiaire = concoursEvt ? concoursEvt.dateDebut : null;
  const dateTitularisation = concoursEvt ? addMonthsToDate(concoursEvt.dateDebut, 12) : null;
  const jalons: JalonTimeline[] = [];

  // Echelon actuel
  const currentEchelonData = grade.echelons.find(e => e.numero === profil.echelonActuel) || grade.echelons[0];
  const currentTraitement = calculateTraitementBrut(currentEchelonData.indiceMajore, profil.quotiteActuelle);

  // 1. Jalon de situation actuelle
  const ancienneteEchelonMois = Math.max(0, diffMonths(profil.dateEffetEchelonActuel, nowStr) + (profil.ancienneteConserveeMois || 0));

  const jalonActuel: JalonTimeline = {
    id: "actuel",
    date: nowStr,
    annee: 2026,
    mois: 9,
    typeJalon: "situation_actuelle",
    titre: isContractuel
      ? `Situation déclarée (Contractuel) : ${grade.nom} - Rémunération assimilée ${currentEchelonData.numero}e échelon`
      : `Situation déclarée : ${grade.nom} - ${currentEchelonData.numero}e échelon`,
    sousTitre: isContractuel
      ? `Indice Majoré ${currentEchelonData.indiceMajore} (IB ${currentEchelonData.indiceBrut}) - Contrat ${profil.statut === "contractuel_cdi" ? "CDI" : "CDD"} - Quotité : ${profil.quotiteActuelle}%`
      : `Indice Majoré ${currentEchelonData.indiceMajore} (IB ${currentEchelonData.indiceBrut}) - Quotité : ${profil.quotiteActuelle}%`,
    gradeNom: grade.nom,
    echelonNumero: currentEchelonData.numero,
    indiceBrut: currentEchelonData.indiceBrut,
    indiceMajore: currentEchelonData.indiceMajore,
    traitementBrutMensuel: currentTraitement,
    statutValidation: "actuel",
    pourquoi: isContractuel
      ? `Vous êtes agent contractuel de droit public rémunéré sur la base de l'indice majoré ${currentEchelonData.indiceMajore} (équivalent ${currentEchelonData.numero}e échelon de ${grade.nom}) depuis le ${formatDateFrench(profil.dateEffetEchelonActuel)}. Votre durée sous cet indice est de ${formatDurationInYearsAndMonths(ancienneteEchelonMois)}. La rémunération des contractuels est réévaluée au moins tous les 3 ans (Décret n° 88-145, art. 1-2).`
      : `Vous occupez le ${currentEchelonData.numero}e échelon depuis le ${formatDateFrench(profil.dateEffetEchelonActuel)}. Votre ancienneté dans cet échelon est actuellement de ${formatDurationInYearsAndMonths(ancienneteEchelonMois)} (dont ${profil.ancienneteConserveeMois || 0} mois de reliquat conservé).`,
    conditionsRemplies: [
      {
        libelle: "Statut administratif",
        statut: isContractuel ? "en_cours" : profil.statut === "titulaire" ? "remplie" : "en_cours",
        valeurActuelle: isContractuel 
          ? (profil.statut === "contractuel_cdi" ? "Contractuel de droit public en CDI" : "Contractuel de droit public en CDD")
          : (profil.statut === "titulaire" ? "Fonctionnaire Titulaire" : "Fonctionnaire Stagiaire"),
        valeurRequise: "Fonctionnaire Titulaire",
        progressionPourcent: profil.statut === "titulaire" ? 100 : isContractuel ? 30 : 60,
        detailsExplicatifs: isContractuel
          ? "Agent contractuel de droit public (Décret n° 88-145). Vous ne détenez pas de grade statutaire ; votre rémunération est fixée par votre contrat par référence à la grille indiciaire du cadre d'emplois."
          : "Statut administratif principal de l agent.",
        piecesAFournir: isContractuel ? ["Contrat de travail initial", "Dernier avenant de revalorisation"] : ["Arrêté de titularisation"],
        actesAdministratifs: isContractuel ? ["Contrat / Avenant signé par le Maire"] : ["Arrêté individuel du Maire / Président"]
      },
      {
        libelle: isContractuel ? "Durée depuis la dernière fixation d'indice" : "Ancienneté acquise dans l échelon actuel",
        statut: "remplie",
        valeurActuelle: formatDurationInYearsAndMonths(ancienneteEchelonMois),
        valeurRequise: isContractuel ? "3 ans (36 mois)" : formatDurationInYearsAndMonths(currentEchelonData.dureeAnnees * 12),
        progressionPourcent: Math.min(100, Math.round((ancienneteEchelonMois / (isContractuel ? 36 : currentEchelonData.dureeAnnees * 12)) * 100)),
        detailsExplicatifs: isContractuel
          ? `Période écoulée depuis la prise d'effet de votre indice actuel. La réévaluation triennale (au moins tous les 3 ans / 36 mois) est prévue par l'art. 1-2 du décret 88-145.`
          : `Durée statutaire requise pour passer à l échelon suivant : ${currentEchelonData.dureeAnnees} an(s).`,
        piecesAFournir: isContractuel ? ["Dernier bulletin de paie", "Contrat ou avenant"] : ["Arrêté du dernier avancement d échelon"],
        actesAdministratifs: isContractuel ? ["Avenant contractuel"] : ["Arrêté portant avancement d échelon"]
      }
    ],
    conditionsManquantes: [],
    justificatifsRequis: isContractuel 
      ? ["Contrat de travail initial et dernier avenant", "Dernier bulletin de paie"]
      : ["Dernier bulletin de paie", "Dernier arrêté d avancement"],
    decisionsAdministrativesRequises: isContractuel 
      ? ["Contrat de travail de droit public en vigueur"]
      : ["Arrêté individuel en vigueur"],
    hypothesesEtAlertes: isContractuel ? [
      "Agent contractuel : pas d'avancement d'échelon ni de grade automatique garanti par la loi.",
      "L'évolution indiciaire fait l'objet d'une réévaluation triennale au vu des entretiens professionnels."
    ] : [
      "Simulation basée sur les données déclarées par l agent.",
      "Toute modification d état ou de quotité non déclarée peut modifier ces échéances."
    ],
    referenceReglementaire: isContractuel 
      ? "Décret n° 88-145 du 15 février 1988 (art. 1-2) relatif aux agents contractuels de la FPT"
      : cadre.decretReference
  };

  jalons.push(jalonActuel);

  // 2. Calcul du décalage éventuel causé par les événements déclarés
  const dispoPenaltyMonths = isContractuel ? 0 : computeDisponibiliteSeniorityPenaltyMonths(profil.evenementsSimules);

  // Injection des jalons d événements de vie
  for (const evt of profil.evenementsSimules) {
    // Statut contractuel : les examens professionnels d'avancement de grade et la disponibilité sont strictement réservés aux fonctionnaires titulaires
    if (isContractuel && (evt.type === "examen_professionnel" || evt.type === "disponibilite")) {
      continue;
    }

    let descType = "";
    let alertes: string[] = [];
    let pieces: string[] = [];
    let actes: string[] = [];

    if (evt.type === "temps_partiel") {
      descType = `Temps partiel à ${evt.quotite}%`;
      alertes.push("Article L612-4 du CGFP : Le temps partiel est assimilé à du temps plein pour l avancement d échelon et de grade.");
      alertes.push(`Traitement brut perçu : ${evt.quotite === 80 ? "85,7% (règle 6/7)" : evt.quotite === 90 ? "91,4%" : evt.quotite + "%"}.`);
      pieces.push("Demande écrite préalable formulée au moins 2 mois avant l échéance", "Avis du responsable de service");
      actes.push("Arrêté d autorisation de travail à temps partiel");
    } else if (evt.type === "conge_parental") {
      descType = "Congé parental";
      alertes.push("Traitement indiciaire suspendu (droits CAF / PreParE le cas échéant).");
      alertes.push("Droits à l avancement d échelon conservés à 100% dans la limite cumulée de 5 ans sur la carrière (CGFP art. L515-8).");
      pieces.push("Extrait d acte de naissance ou certificat de grossesse attestant de la date prévisionnelle", "Demande de congé parental 1 mois avant la date");
      actes.push("Arrêté individuel de mise en congé parental");
    } else if (evt.type === "disponibilite") {
      descType = "Mise en disponibilité";
      const motif = MOTIFS_DISPONIBILITE.find(m => m.code === evt.motifDisponibilite);
      if (motif) {
        alertes.push(motif.explication);
        pieces.push(...motif.justificatifs);
      }
      actes.push("Arrêté de mise en disponibilité pour convenance personnelle");
    } else if (evt.type === "examen_professionnel") {
      descType = "Réussite à l examen professionnel";
      alertes.push("L attestation de réussite est valable sans limitation de durée pour le cadre d emplois concerné.");
      alertes.push("Ouvre la possibilité d être inscrit sur le tableau d avancement dès que l échelon et les conditions d ancienneté sont atteints.");
      pieces.push("Attestation de réussite délivrée par le Centre de Gestion (CDG)");
      actes.push("Inscription de plein droit dans le vivier promouvable par examen");
    } else if (evt.type === "reussite_concours") {
      descType = "Lauréat de Concours & Nomination Stagiaire";
      alertes.push("Réussite au concours de la Fonction Publique Territoriale.");
      alertes.push("Nomination en qualité de fonctionnaire stagiaire sur emploi permanent.");
      alertes.push("Période probatoire de 12 mois avec formation d intégration obligatoire CNFPT avant titularisation.");
      pieces.push("Attestation de réussite au concours délivrée par le Centre de Gestion (CIG/CDG)", "Dossier de nomination stagiaire");
      actes.push("Arrêté individuel de nomination en qualité de fonctionnaire stagiaire");
    }

    const evtJalon: JalonTimeline = {
      id: evt.id,
      date: evt.dateDebut,
      annee: parseDate(evt.dateDebut).getFullYear(),
      mois: parseDate(evt.dateDebut).getMonth() + 1,
      typeJalon: "evenement_vie",
      titre: evt.type === "reussite_concours" ? `Lauréat du Concours : Nomination Stagiaire (${grade.nom})` : evt.titre,
      sousTitre: evt.type === "reussite_concours" ? "Début du stage probatoire de 12 mois (CGFP art. L327-1)" : descType,
      gradeNom: grade.nom,
      echelonNumero: currentEchelonData.numero,
      indiceBrut: currentEchelonData.indiceBrut,
      indiceMajore: currentEchelonData.indiceMajore,
      traitementBrutMensuel: evt.type === "temps_partiel" ? calculateTraitementBrut(currentEchelonData.indiceMajore, evt.quotite || 80) : evt.type === "conge_parental" || evt.type === "disponibilite" ? 0 : currentTraitement,
      statutValidation: "simule",
      pourquoi: evt.type === "reussite_concours"
        ? "Félicitations : Vous êtes déclaré lauréat du concours et inscrit sur la liste d aptitude. Le Maire de Gennevilliers prononce votre nomination en qualité de fonctionnaire stagiaire sur un emploi permanent. Vous commencez votre année probatoire de stage et suivez la formation d intégration obligatoire CNFPT."
        : evt.descriptionDetaillee,
      conditionsRemplies: evt.type === "reussite_concours" ? [
        {
          libelle: "Réussite aux épreuves du concours FPT",
          statut: "remplie",
          valeurActuelle: "Lauréat inscrit sur liste d aptitude",
          valeurRequise: "Attestation de réussite CDG/CIG",
          progressionPourcent: 100,
          detailsExplicatifs: "Ouvre le droit à être nommé fonctionnaire stagiaire par la collectivité.",
          piecesAFournir: ["Attestation de réussite au concours"],
          actesAdministratifs: ["Arrêté de nomination stagiaire"]
        }
      ] : [],
      conditionsManquantes: [],
      justificatifsRequis: pieces,
      decisionsAdministrativesRequises: actes,
      hypothesesEtAlertes: alertes,
      referenceReglementaire: evt.type === "reussite_concours" ? "Articles L327-1 et suivants du Code Général de la Fonction Publique" : "Code Général de la Fonction Publique (CGFP)",
      evenementAssocie: evt
    };

    jalons.push(evtJalon);

    // Si réussite au concours : injection automatique du jalon de titularisation 12 mois après
    if (evt.type === "reussite_concours") {
      const dateTitu = addMonthsToDate(evt.dateDebut, 12);
      const titularisationJalon: JalonTimeline = {
        id: `${evt.id}-titularisation`,
        date: dateTitu,
        annee: parseDate(dateTitu).getFullYear(),
        mois: parseDate(dateTitu).getMonth() + 1,
        typeJalon: "promouvabilite_interne",
        titre: `Titularisation : Fonctionnaire Titulaire (${grade.nom})`,
        sousTitre: "Fin de stage probatoire - Entrée pleine et entière dans le statut FPT",
        gradeNom: grade.nom,
        echelonNumero: currentEchelonData.numero,
        indiceBrut: currentEchelonData.indiceBrut,
        indiceMajore: currentEchelonData.indiceMajore,
        traitementBrutMensuel: currentTraitement,
        statutValidation: "simule",
        pourquoi: "À l issue des 12 mois de stage probatoire et après avis favorable de votre hiérarchie et validation de la formation d intégration CNFPT, l autorité territoriale prend votre arrêté de titularisation. Vous accédez au statut de fonctionnaire titulaire de la FPT, ce qui débloque les avancements d échelon garantis et l avancement de grade !",
        conditionsRemplies: [
          {
            libelle: "Accomplissement de 12 mois de stage probatoire",
            statut: "remplie",
            valeurActuelle: "12 mois accomplis",
            valeurRequise: "12 mois (1 an)",
            progressionPourcent: 100,
            detailsExplicatifs: "Durée normale du stage probatoire dans la FPT (art. L327-9 CGFP).",
            piecesAFournir: ["Rapport de fin de stage établi par l encadrement"],
            actesAdministratifs: []
          },
          {
            libelle: "Validation de la formation d intégration CNFPT",
            statut: "remplie",
            valeurActuelle: "Attestation délivrée",
            valeurRequise: "Formation d intégration suivie",
            progressionPourcent: 100,
            detailsExplicatifs: "Formation statutaire obligatoire préalable à la titularisation.",
            piecesAFournir: ["Attestation CNFPT"],
            actesAdministratifs: []
          }
        ],
        conditionsManquantes: [],
        justificatifsRequis: [
          "Attestation de suivi de la formation d intégration CNFPT",
          "Rapport de fin de stage établi par le supérieur hiérarchique"
        ],
        decisionsAdministrativesRequises: [
          "Arrêté individuel de titularisation signé par le Maire de Gennevilliers",
          "Transmission en Préfecture (contrôle de légalité)",
          "Notification à l agent et mise à jour de la carrière au CIG"
        ],
        hypothesesEtAlertes: [
          "Consacre l intégration définitive dans la Fonction Publique Territoriale.",
          "Les passages d échelon futurs deviennent de plein droit et automatiques à cadence unique PPCR.",
          "Débloque l éligibilité aux tableaux d avancement de grade et aux examens professionnels."
        ],
        referenceReglementaire: "Article L327-10 du Code Général de la Fonction Publique"
      };
      jalons.push(titularisationJalon);
    }

    // Si fin d événement
    if (evt.dateFin && evt.dateFin > evt.dateDebut) {
      const finJalon: JalonTimeline = {
        id: `${evt.id}-fin`,
        date: evt.dateFin,
        annee: parseDate(evt.dateFin).getFullYear(),
        mois: parseDate(evt.dateFin).getMonth() + 1,
        typeJalon: "fin_evenement",
        titre: `Fin de la période : ${evt.titre}`,
        sousTitre: "Reprise des conditions statutaires antérieures (temps plein 100%)",
        gradeNom: grade.nom,
        echelonNumero: currentEchelonData.numero,
        indiceBrut: currentEchelonData.indiceBrut,
        indiceMajore: currentEchelonData.indiceMajore,
        traitementBrutMensuel: currentTraitement,
        statutValidation: "simule",
        pourquoi: "Fin de l événement simulé et retour à la position d activité normale à temps plein.",
        conditionsRemplies: [],
        conditionsManquantes: [],
        justificatifsRequis: evt.type === "disponibilite" ? ["Demande formelle de réintégration 3 mois avant le terme", "Certificat médical d aptitude physique à la reprise"] : ["Notification de fin de période"],
        decisionsAdministrativesRequises: ["Arrêté de réintégration ou de reprise à temps complet"],
        hypothesesEtAlertes: ["Vérifier la disponibilité d un poste vacant dans la collectivité en cas de dispo > 6 mois."],
        referenceReglementaire: "CGFP art. L514-4"
      };
      jalons.push(finJalon);
    }
  }

  // 3. Projection des avancements d échelons futurs / Réévaluations triennales indicatives
  let runEchelonNum = profil.echelonActuel;
  let runDateEffet = profil.dateEffetEchelonActuel;
  let remainingConservedMonths = profil.ancienneteConserveeMois || 0;
  let appliedDispoDelay = false;

  let prochainEchelonJalon: JalonTimeline | null = null;

  while (runEchelonNum < grade.echelons.length) {
    const currentEchObj = grade.echelons.find(e => e.numero === runEchelonNum)!;
    const nextEchObj = grade.echelons.find(e => e.numero === runEchelonNum + 1);
    if (!nextEchObj) break;

    const isStepAfterTitularisation = !!(dateTitularisation && runDateEffet >= dateTitularisation);
    const isEffectiveContractuel = isContractuel && !isStepAfterTitularisation;

    let moisEffectifs = isEffectiveContractuel ? 36 : (currentEchObj.dureeAnnees * 12);

    // Déduction de l ancienneté conservée au premier saut
    if (runEchelonNum === profil.echelonActuel && remainingConservedMonths > 0) {
      moisEffectifs = Math.max(1, moisEffectifs - remainingConservedMonths);
      remainingConservedMonths = 0;
    }

    // Application du décalage éventuel de disponibilité sans activité
    if (!appliedDispoDelay && dispoPenaltyMonths > 0) {
      moisEffectifs += dispoPenaltyMonths;
      appliedDispoDelay = true;
    }

    const nextDateEffet = addMonthsToDate(runDateEffet, moisEffectifs);
    const gainIM = nextEchObj.indiceMajore - currentEchObj.indiceMajore;
    const gainFinancier = gainIM * VALEUR_POINT_INDICE_MENSUEL;
    const newTraitement = calculateTraitementBrut(nextEchObj.indiceMajore, 100);

    const isNextFirst = prochainEchelonJalon === null && nextDateEffet > nowStr;

    const echJalon: JalonTimeline = {
      id: `ech-${nextEchObj.numero}`,
      date: nextDateEffet,
      annee: parseDate(nextDateEffet).getFullYear(),
      mois: parseDate(nextDateEffet).getMonth() + 1,
      typeJalon: "avancement_echelon",
      titre: isEffectiveContractuel
        ? `Réévaluation triennale indicative (Indice ${nextEchObj.numero}e éch.)`
        : isStepAfterTitularisation
        ? `Avancement au ${nextEchObj.numero}e échelon (Titulaire PPCR)`
        : `Avancement au ${nextEchObj.numero}e échelon`,
      sousTitre: isEffectiveContractuel
        ? `IM ${nextEchObj.indiceMajore} (+ ${gainIM} pts) - ${Math.round(gainFinancier)} € brut/mois (Sous réserve d'avenant DRH)`
        : isStepAfterTitularisation
        ? `IM ${nextEchObj.indiceMajore} (+ ${gainIM} pts) - ${Math.round(gainFinancier)} € brut/mois (Avancement garanti post-titularisation)`
        : `IM ${nextEchObj.indiceMajore} (+ ${gainIM} pts) - ${Math.round(gainFinancier)} € brut/mois`,
      gradeNom: grade.nom,
      echelonNumero: nextEchObj.numero,
      indiceBrut: nextEchObj.indiceBrut,
      indiceMajore: nextEchObj.indiceMajore,
      traitementBrutMensuel: newTraitement,
      gainIndiciaire: gainIM,
      gainFinancierBrutMensuel: gainFinancier,
      statutValidation: isEffectiveContractuel ? "simule" : (isStepAfterTitularisation ? "simule" : "garanti"),
      pourquoi: isEffectiveContractuel
        ? `En qualité d'agent contractuel (Décret n° 88-145, art. 1-2), votre rémunération fait l'objet d'une réévaluation obligatoire au moins tous les 3 ans (36 mois). Cette date correspond à l'échéance triennale réglementaire de 3 ans depuis votre dernière revalorisation indiciaire. L'attribution effective de cet indice relève du pouvoir de décision de l'autorité territoriale après évaluation professionnelle.`
        : isStepAfterTitularisation
        ? `Passage d échelon à cadence unique PPCR débloqué suite à votre titularisation après concours (durée réglementaire : ${currentEchObj.dureeAnnees} an(s)).`
        : `Passage automatique d échelon à l ancienneté (durée réglementaire : ${currentEchObj.dureeAnnees} an(s)). ${
            dispoPenaltyMonths > 0 ? `Date décalée de ${dispoPenaltyMonths} mois en raison de la période de disponibilité sans activité.` : "Rythme normal régulier."
          }`,
      conditionsRemplies: [
        {
          libelle: isEffectiveContractuel ? "Périodicité triennale de 3 ans (Décret 88-145)" : "Ancienneté requise dans l échelon précédent",
          statut: "remplie",
          valeurActuelle: isEffectiveContractuel ? "3 ans (36 mois)" : `${currentEchObj.dureeAnnees} an(s)`,
          valeurRequise: isEffectiveContractuel ? "3 ans (36 mois)" : `${currentEchObj.dureeAnnees} an(s)`,
          progressionPourcent: 100,
          detailsExplicatifs: isEffectiveContractuel
            ? "Périodicité de réévaluation de 3 ans (36 mois) prévue pour les agents contractuels au vu de l'évaluation professionnelle (art. 1-2 décret 88-145)."
            : "Depuis les accords PPCR, l avancement d échelon s effectue à cadence unique de plein droit.",
          piecesAFournir: isEffectiveContractuel ? ["Compte-rendu d'entretien professionnel"] : ["Attestation de service effectif"],
          actesAdministratifs: isEffectiveContractuel ? ["Proposition de revalorisation indiciaire"] : ["Arrêté individuel d avancement d échelon"]
        }
      ],
      conditionsManquantes: isEffectiveContractuel ? [
        {
          libelle: "Avenant contractuel de réévaluation indiciaire",
          statut: "en_cours",
          valeurActuelle: "En attente d'évaluation",
          valeurRequise: "Avenant signé par le Maire",
          progressionPourcent: 50,
          detailsExplicatifs: "Contrairement aux fonctionnaires, l'avancement n'est pas automatique : il nécessite un avenant contractuel décidé par la collectivité.",
          piecesAFournir: ["Évaluation professionnelle favorable", "Fiche de poste mise à jour"],
          actesAdministratifs: ["Avenant au contrat de travail de droit public"]
        }
      ] : [],
      justificatifsRequis: isEffectiveContractuel ? [
        "Compte-rendu du dernier entretien professionnel annuel (EPA)",
        "Rapport de la hiérarchie justifiant la revalorisation (fonctions, sujétions, compétences)"
      ] : [
        "Aucune démarche nécessaire pour l agent : l avancement d échelon à cadence unique s effectue automatiquement par arrêté de la collectivité."
      ],
      decisionsAdministrativesRequises: isEffectiveContractuel ? [
        "Entretien annuel d'évaluation professionnelle",
        "Décision de l'autorité territoriale / Direction des Ressources Humaines",
        "Signature d'un avenant contractuel de réévaluation indiciaire",
        "Transmission pour visa au contrôle de légalité en Préfecture"
      ] : [
        "Arrêté individuel d avancement d échelon signé par l autorité territoriale",
        "Transmission pour visa au contrôle de légalité en Préfecture",
        "Mise à jour du dossier administratif et du logiciel de paie"
      ],
      hypothesesEtAlertes: isEffectiveContractuel ? [
        "Attention : Projection indicative. L'avancement d'échelon statutaire automatique ne s'applique pas aux agents contractuels.",
        "La réévaluation triennale est obligatoire dans son principe (décret 88-145 art. 1-2), mais l'augmentation indiciaire dépend de la décision de l'employeur."
      ] : [
        "Avancement de plein droit garanti par le statut sous réserve de maintien en position d activité.",
        "Une disponibilité sans activité ou un congé sans traitement décalerait cette échéance."
      ],
      referenceReglementaire: isEffectiveContractuel
        ? `Décret n° 88-145 du 15 février 1988 (art. 1-2) relatif aux agents contractuels de la FPT`
        : `Statut particulier du cadre d emplois (${cadre.nom}) - Cadence unique PPCR`
    };

    jalons.push(echJalon);

    if (isNextFirst) {
      prochainEchelonJalon = echJalon;
    }

    runEchelonNum = nextEchObj.numero;
    runDateEffet = nextDateEffet;
  }

  // 4. Calcul des perspectives de carrière (Avancement de grade & Promotion interne / Concours)
  let premierePromouvabiliteGrade: JalonTimeline | null = null;
  let premierePromouvabiliteInterne: JalonTimeline | null = null;

  // Statutaire : L avancement de grade (art. L522-23 CGFP) et les examens professionnels sont réservés aux fonctionnaires titulaires.
  // Pour un agent contractuel, aucun jalon d avancement de grade n est injecté SAUF s il a simulé une réussite au concours et sa titularisation.
  if (!isContractuel || dateTitularisation) {
    for (const perspective of grade.perspectives) {
      for (const condition of perspective.conditions) {
        let dateEchelonAtteint = profil.dateEffetEchelonActuel;
      if (condition.echelonMinimum > profil.echelonActuel) {
        // Trouver la date du jalon d échelon correspondant
        const matchingEchJalon = jalons.find(j => j.typeJalon === "avancement_echelon" && j.echelonNumero === condition.echelonMinimum);
        if (matchingEchJalon) {
          dateEchelonAtteint = matchingEchJalon.date;
        } else {
          dateEchelonAtteint = addMonthsToDate(nowStr, (condition.echelonMinimum - profil.echelonActuel) * 24);
        }
      }

      // Date avec ancienneté requise dans l échelon
      const dateConditionEchelon = addMonthsToDate(dateEchelonAtteint, Math.round(condition.ancienneteEchelonAnnees * 12));

      // Date avec ancienneté dans le grade
      const baseNominationGradeDate = (isContractuel && dateNominationStagiaire)
        ? dateNominationStagiaire
        : profil.dateNominationGradeActuel;

      let dateConditionGrade = baseNominationGradeDate;
      if (condition.ancienneteGradeAnnees && condition.ancienneteGradeAnnees > 0) {
        dateConditionGrade = addMonthsToDate(baseNominationGradeDate, Math.round(condition.ancienneteGradeAnnees * 12) + dispoPenaltyMonths);
      }

      // Date avec ancienneté dans le cadre / catégorie
      let dateConditionCadre = profil.dateEntreeFonctionPublique;
      if (condition.ancienneteCadreAnnees && condition.ancienneteCadreAnnees > 0) {
        dateConditionCadre = addMonthsToDate(profil.dateEntreeFonctionPublique, Math.round(condition.ancienneteCadreAnnees * 12) + dispoPenaltyMonths);
      }

      // Date avec services publics
      let dateConditionServicesPublics = profil.dateEntreeFonctionPublique;
      if (condition.ancienneteServicesPublicsAnnees && condition.ancienneteServicesPublicsAnnees > 0) {
        dateConditionServicesPublics = addMonthsToDate(profil.dateEntreeFonctionPublique, Math.round(condition.ancienneteServicesPublicsAnnees * 12) + dispoPenaltyMonths);
      }

      // Date d éligibilité théorique = MAX de toutes les dates
      const datesToCompare = [dateConditionEchelon, dateConditionGrade, dateConditionCadre, dateConditionServicesPublics];
      if (dateTitularisation) {
        datesToCompare.push(dateTitularisation);
      }
      datesToCompare.sort();
      const dateEligibiliteTheorique = datesToCompare[datesToCompare.length - 1];

      // Vérifier si un examen pro est requis et si un événement le simule
      const hasExamenProInSimul = profil.evenementsSimules.some(e => e.type === "examen_professionnel" && e.dateDebut <= dateEligibiliteTheorique);
      const isExamenMissing = condition.examenProfessionnelRequis && !hasExamenProInSimul;

      // Évaluation des conditions détaillées à la date du jour (ou à date d éligibilité)
      const conditionsRemplies: EvaluationCondition[] = [];
      const conditionsManquantes: EvaluationCondition[] = [];

      // Échelon minimum
      const echRempli = profil.echelonActuel >= condition.echelonMinimum;
      const evalEch: EvaluationCondition = {
        libelle: `Atteindre le ${condition.echelonMinimum}e échelon de ${grade.nom}`,
        statut: echRempli ? "remplie" : "en_cours",
        valeurActuelle: `${profil.echelonActuel}e échelon`,
        valeurRequise: `${condition.echelonMinimum}e échelon`,
        progressionPourcent: Math.min(100, Math.round((profil.echelonActuel / condition.echelonMinimum) * 100)),
        detailsExplicatifs: echRempli ? "Condition d échelon validée." : `Il vous reste encore ${condition.echelonMinimum - profil.echelonActuel} échelon(s) à franchir.`,
        piecesAFournir: ["Dernier arrêté d avancement d échelon"],
        actesAdministratifs: []
      };
      if (echRempli) conditionsRemplies.push(evalEch); else conditionsManquantes.push(evalEch);

      // Ancienneté dans le grade
      if (condition.ancienneteGradeAnnees && condition.ancienneteGradeAnnees > 0) {
        const moisRequis = condition.ancienneteGradeAnnees * 12;
        const moisActuels = diffMonths(profil.dateNominationGradeActuel, nowStr);
        const gradeRempli = moisActuels >= moisRequis;
        const evalGrade: EvaluationCondition = {
          libelle: `Ancienneté de ${condition.ancienneteGradeAnnees} ans dans le grade actuel`,
          statut: gradeRempli ? "remplie" : "en_cours",
          valeurActuelle: formatDurationInYearsAndMonths(moisActuels),
          valeurRequise: formatDurationInYearsAndMonths(moisRequis),
          progressionPourcent: Math.min(100, Math.round((moisActuels / moisRequis) * 100)),
          tempsRestantTexte: gradeRempli ? "Validée" : `Manque ${formatDurationInYearsAndMonths(moisRequis - moisActuels)}`,
          detailsExplicatifs: `Services effectifs accomplis dans le grade de ${grade.nom}.`,
          piecesAFournir: ["Arrêté initial de nomination dans le grade"],
          actesAdministratifs: []
        };
        if (gradeRempli) conditionsRemplies.push(evalGrade); else conditionsManquantes.push(evalGrade);
      }

      // Ancienneté dans le cadre / catégorie
      if (condition.ancienneteCadreAnnees && condition.ancienneteCadreAnnees > 0) {
        const moisRequis = condition.ancienneteCadreAnnees * 12;
        const moisActuels = diffMonths(profil.dateEntreeFonctionPublique, nowStr);
        const cadreRempli = moisActuels >= moisRequis;
        const evalCadre: EvaluationCondition = {
          libelle: `Ancienneté de ${condition.ancienneteCadreAnnees} ans dans le cadre d emplois / catégorie ${cadre.categorie}`,
          statut: cadreRempli ? "remplie" : "en_cours",
          valeurActuelle: formatDurationInYearsAndMonths(moisActuels),
          valeurRequise: formatDurationInYearsAndMonths(moisRequis),
          progressionPourcent: Math.min(100, Math.round((moisActuels / moisRequis) * 100)),
          tempsRestantTexte: cadreRempli ? "Validée" : `Manque ${formatDurationInYearsAndMonths(moisRequis - moisActuels)}`,
          detailsExplicatifs: "Services effectifs validés dans le cadre d emplois.",
          piecesAFournir: ["État récapitulatif des services publics"],
          actesAdministratifs: []
        };
        if (cadreRempli) conditionsRemplies.push(evalCadre); else conditionsManquantes.push(evalCadre);
      }

      // Examen professionnel
      if (condition.examenProfessionnelRequis) {
        const examRempli = hasExamenProInSimul;
        const evalExam: EvaluationCondition = {
          libelle: "Réussite aux épreuves de l Examen Professionnel",
          statut: examRempli ? "remplie" : "bloquante",
          valeurActuelle: examRempli ? "Attestation obtenue" : "Non présenté ou en attente",
          valeurRequise: "Attestation officielle de réussite du CDG",
          progressionPourcent: examRempli ? 100 : 0,
          tempsRestantTexte: examRempli ? "Validée" : "À présenter",
          detailsExplicatifs: "L examen professionnel est éliminatoire pour cette voie. Sans réussite, la candidature ne peut pas être inscrite au tableau d avancement par cette modalité.",
          piecesAFournir: ["Attestation de réussite du Centre de Gestion organisateur"],
          actesAdministratifs: ["Inscription sur la liste des lauréats"]
        };
        if (examRempli) conditionsRemplies.push(evalExam); else conditionsManquantes.push(evalExam);
      }

      // Ratio promus/promouvables
      conditionsManquantes.push({
        libelle: "Décision d inscription au tableau annuel selon les Lignes Directrices de Gestion (LDG)",
        statut: "en_cours",
        valeurActuelle: "À apprécier par l autorité",
        valeurRequise: "Sélection par l employeur territorial",
        progressionPourcent: 50,
        detailsExplicatifs: `Être promouvable ne confère aucun droit automatique à nomination. L employeur applique le ratio promus/promouvables voté (${perspective.ratioPromusPromouvablesExplication}).`,
        piecesAFournir: ["Comptes-rendus d entretien professionnel annuel (EPA) attestant de la valeur professionnelle"],
        actesAdministratifs: ["Arrêté portant tableau d avancement de grade"]
      });

      const typeJalon = perspective.typePerspective === "avancement_grade" ? "promouvabilite_grade" : "promouvabilite_interne";

      const isPostConcoursPromo = isContractuel && !!dateTitularisation;

      const promouvableJalon: JalonTimeline = {
        id: `persp-${perspective.gradeCibleId}-${condition.typeVoie}`,
        date: dateEligibiliteTheorique,
        annee: parseDate(dateEligibiliteTheorique).getFullYear(),
        mois: parseDate(dateEligibiliteTheorique).getMonth() + 1,
        typeJalon: typeJalon,
        titre: isPostConcoursPromo
          ? `Avancement post-titularisation : ${perspective.nomGradeCible} (${condition.descriptionVoie})`
          : `Promouvabilité : ${perspective.nomGradeCible} (${condition.descriptionVoie})`,
        sousTitre: isPostConcoursPromo
          ? `Perspective débloquée suite au concours (Voie ${condition.typeVoie === "au_choix" ? "au choix" : "examen pro"})`
          : perspective.typePerspective === "avancement_grade" ? "Avancement de Grade théorique" : "Promotion Interne (Changement de catégorie)",
        gradeNom: perspective.nomGradeCible,
        echelonNumero: 1,
        indiceBrut: 0,
        indiceMajore: 0,
        traitementBrutMensuel: 0,
        statutValidation: isExamenMissing ? "bloque" : "conditionnel",
        pourquoi: isPostConcoursPromo
          ? `Perspective d avancement de grade débloquée grâce à votre réussite au concours et votre titularisation simulée au ${formatDateFrench(dateTitularisation)}. Date théorique à laquelle vous remplirez l ensemble des conditions statutaires requises d échelon et d ancienneté pour accéder au grade supérieur.`
          : `Date théorique à laquelle vous remplirez l ensemble des conditions statutaires obligatoires (échelon et ancienneté). ${
              isExamenMissing ? "ATTENTION : Vous devez préalablement vous inscrire et réussir l examen professionnel pour concrétiser cette perspective." : ""
            }`,
        conditionsRemplies: conditionsRemplies,
        conditionsManquantes: conditionsManquantes,
        justificatifsRequis: condition.piecesRequises,
        decisionsAdministrativesRequises: condition.actesAdministratifs,
        hypothesesEtAlertes: [
          "Simulation informative : l inscription au tableau ou sur liste d aptitude relève de la décision finale de la collectivité après application des LDG.",
          perspective.ratioPromusPromouvablesExplication,
          perspective.explicationReclassement
        ],
        referenceReglementaire: `Règles statutaires d avancement - ${perspective.nomGradeCible}`
      };

      jalons.push(promouvableJalon);

      if (typeJalon === "promouvabilite_grade" && (!premierePromouvabiliteGrade || promouvableJalon.date < premierePromouvabiliteGrade.date)) {
        premierePromouvabiliteGrade = promouvableJalon;
      }
      if (typeJalon === "promouvabilite_interne" && (!premierePromouvabiliteInterne || promouvableJalon.date < premierePromouvabiliteInterne.date)) {
        premierePromouvabiliteInterne = promouvableJalon;
      }
    }
  }
}

  // Si agent contractuel : Ajout des vraies perspectives (Concours Interne & Recrutement direct C1)
  if (isContractuel) {
    const moisServicesPublics = Math.max(0, diffMonths(profil.dateEntreeFonctionPublique, nowStr));
    const anneesRequisesConcours = cadre.categorie === "C" ? 2 : 4;
    const moisRequisConcours = anneesRequisesConcours * 12;
    const dateEligibiliteConcours = addMonthsToDate(profil.dateEntreeFonctionPublique, moisRequisConcours);
    const dejaEligibleConcours = moisServicesPublics >= moisRequisConcours;

    const concoursJalon: JalonTimeline = {
      id: "concours-interne-titularisation",
      date: dateEligibiliteConcours,
      annee: parseDate(dateEligibiliteConcours).getFullYear(),
      mois: parseDate(dateEligibiliteConcours).getMonth() + 1,
      typeJalon: "promouvabilite_interne",
      titre: `Éligibilité au Concours Interne : ${cadre.nom} (Titularisation)`,
      sousTitre: `Condition de ${anneesRequisesConcours} ans de services publics effectifs (CGFP art. L325-4)`,
      gradeNom: grade.nom,
      echelonNumero: 1,
      indiceBrut: currentEchelonData.indiceBrut,
      indiceMajore: currentEchelonData.indiceMajore,
      traitementBrutMensuel: currentTraitement,
      statutValidation: "conditionnel",
      pourquoi: dejaEligibleConcours
        ? `Vous remplissez d'ores et déjà la condition de ${anneesRequisesConcours} ans de services publics effectifs (art. L325-4 du CGFP) depuis le ${formatDateFrench(dateEligibiliteConcours)}. Vous pouvez vous inscrire aux épreuves du Concours Interne organisé par le Centre de Gestion (CIG Petite Couronne). La réussite au concours permet d'être nommé fonctionnaire stagiaire puis titularisé, débloquant l'avancement d'échelon garanti et l'avancement de grade.`
        : `Vous atteindrez le ${formatDateFrench(dateEligibiliteConcours)} les ${anneesRequisesConcours} ans de services publics effectifs exigés pour vous présenter au Concours Interne. La réussite vous ouvrira la titularisation statutaire.`,
      conditionsRemplies: dejaEligibleConcours ? [
        {
          libelle: `Ancienneté de ${anneesRequisesConcours} ans de services publics effectifs`,
          statut: "remplie",
          valeurActuelle: formatDurationInYearsAndMonths(moisServicesPublics),
          valeurRequise: formatDurationInYearsAndMonths(moisRequisConcours),
          progressionPourcent: 100,
          detailsExplicatifs: "Tous vos contrats de droit public (CDD, CDI) dans la Fonction Publique sont intégralement comptabilisés.",
          piecesAFournir: ["Contrats de travail de droit public", "Certificats de travail / états de services publics"],
          actesAdministratifs: ["État récapitulatif certifié par la DRH de Gennevilliers"]
        }
      ] : [],
      conditionsManquantes: [
        ...(!dejaEligibleConcours ? [
          {
            libelle: `Ancienneté de ${anneesRequisesConcours} ans de services publics effectifs`,
            statut: "en_cours" as const,
            valeurActuelle: formatDurationInYearsAndMonths(moisServicesPublics),
            valeurRequise: formatDurationInYearsAndMonths(moisRequisConcours),
            progressionPourcent: Math.round((moisServicesPublics / moisRequisConcours) * 100),
            tempsRestantTexte: `Manque ${formatDurationInYearsAndMonths(moisRequisConcours - moisServicesPublics)}`,
            detailsExplicatifs: "Durée minimale requise au 1er janvier de l'année d'ouverture du concours.",
            piecesAFournir: ["Contrats de travail", "Bulletins de salaire"],
            actesAdministratifs: ["État récapitulatif certifié"]
          }
        ] : []),
        {
          libelle: "Admission aux épreuves du Concours Interne (CIG Petite Couronne)",
          statut: "en_cours",
          valeurActuelle: "Non lauréat",
          valeurRequise: "Lauréat admis",
          progressionPourcent: 30,
          detailsExplicatifs: "Épreuves écrites et orales organisées par le Centre Interdépartemental de Gestion.",
          piecesAFournir: ["Dossier d'inscription complet au CIG", "Justificatif d'identité et état de services"],
          actesAdministratifs: ["Arrêté d'admission et inscription sur liste d'aptitude"]
        },
        {
          libelle: "Nomination en qualité de fonctionnaire stagiaire (1 an) puis titularisation",
          statut: "en_cours",
          valeurActuelle: "Sous contrat",
          valeurRequise: "Fonctionnaire titulaire",
          progressionPourcent: 10,
          detailsExplicatifs: "Après admission au concours, le Maire procède à la nomination stagiaire ouvrant droit à la titularisation.",
          piecesAFournir: ["Attestation d'inscription sur liste d'aptitude délivrée par le CIG"],
          actesAdministratifs: ["Arrêté de nomination stagiaire", "Arrêté de titularisation"]
        }
      ],
      justificatifsRequis: [
        "États récapitulatifs des services publics effectifs certifiés par la DRH de Gennevilliers",
        "Dossier d'inscription complet au concours auprès du CIG Petite Couronne",
        "Copies des contrats de travail et bulletins de paie justifiant de la durée requise"
      ],
      decisionsAdministrativesRequises: [
        "Arrêté d'ouverture du concours par le Centre de Gestion",
        "Délibération du jury d'admission et inscription sur la liste d'aptitude",
        "Arrêté individuel de nomination en qualité de stagiaire",
        "Arrêté individuel de titularisation après 1 an de stage"
      ],
      hypothesesEtAlertes: [
        "Les années de contrat de droit public sont intégralement prises en compte.",
        "Les années d'activité dans le secteur privé ne comptent pas pour le concours interne (mais peuvent compter pour le 3e concours).",
        "La réussite au concours donne droit à une inscription sur liste d'aptitude valable 2 ans (renouvelable 2 fois sous conditions)."
      ],
      referenceReglementaire: `Code Général de la Fonction Publique (art. L325-4) & Décret organisant le cadre d emplois (${cadre.nom})`
    };

    jalons.push(concoursJalon);
    premierePromouvabiliteInterne = concoursJalon;

    // Si catégorie C : opportunité de titularisation directe sans concours sur grade C1
    if (cadre.categorie === "C") {
      const recrutementDirectJalon: JalonTimeline = {
        id: "recrutement-direct-c1",
        date: nowStr,
        annee: 2026,
        mois: 9,
        typeJalon: "promouvabilite_interne",
        titre: "Opportunité : Titularisation directe sans concours (Catégorie C1)",
        sousTitre: "Pouvoir de nomination de l'autorité territoriale (CGFP art. L326-1)",
        gradeNom: grade.nom,
        echelonNumero: 1,
        indiceBrut: currentEchelonData.indiceBrut,
        indiceMajore: currentEchelonData.indiceMajore,
        traitementBrutMensuel: currentTraitement,
        statutValidation: "conditionnel",
        pourquoi: "Sur les grades d'accès de catégorie C (C1, ex. Adjoint technique territorial ou Adjoint administratif territorial), la loi permet le recrutement sans concours. Le Maire de Gennevilliers peut directement vous nommer fonctionnaire stagiaire pour une durée d'1 an, ouvrant la voie à une titularisation sans épreuve de concours.",
        conditionsRemplies: [],
        conditionsManquantes: [
          {
            libelle: "Décision de nomination en qualité de fonctionnaire stagiaire",
            statut: "en_cours",
            valeurActuelle: "Sous contrat",
            valeurRequise: "Nomination stagiaire C1",
            progressionPourcent: 50,
            detailsExplicatifs: "Décision du Maire dans le cadre de la politique RH et des créations de postes budgétaires.",
            piecesAFournir: ["CV et bilan d'activité professionnelle"],
            actesAdministratifs: ["Arrêté individuel de nomination en qualité de fonctionnaire stagiaire"]
          }
        ],
        justificatifsRequis: [
          "Bilan d'activité professionnel favorable",
          "Demande de titularisation adressée à la Direction des Ressources Humaines"
        ],
        decisionsAdministrativesRequises: [
          "Arrêté de nomination en qualité de stagiaire C1",
          "Arrêté de titularisation après 1 an de stage"
        ],
        hypothesesEtAlertes: [
          "Le recrutement direct sans concours est uniquement possible sur le premier grade de catégorie C (C1).",
          "Il relève du pouvoir d'appréciation exclusif du Maire."
        ],
        referenceReglementaire: "Article L326-1 du Code Général de la Fonction Publique"
      };
      jalons.push(recrutementDirectJalon);
    }
  }

  // Trier les jalons par ordre chronologique
  jalons.sort((a, b) => a.date.localeCompare(b.date));

  // Synthèse pédagogique
  const pointsCles: string[] = [];
  const alertesVigilance: string[] = [];
  const justificatifsUrgents: string[] = [];
  const conseilsEntretienPro: string[] = [];

  if (isContractuel) {
    const moisServicesPublics = Math.max(0, diffMonths(profil.dateEntreeFonctionPublique, nowStr));
    const anneesRequisesConcours = cadre.categorie === "C" ? 2 : 4;
    const moisRequisConcours = anneesRequisesConcours * 12;
    const dateEligibiliteConcours = addMonthsToDate(profil.dateEntreeFonctionPublique, moisRequisConcours);
    const dejaEligibleConcours = moisServicesPublics >= moisRequisConcours;

    if (concoursEvt && dateTitularisation) {
      pointsCles.unshift(
        `🏆 Scénario actif : Réussite au Concours & Titularisation ! Nomination stagiaire simulée le ${formatDateFrench(concoursEvt.dateDebut)}, titularisation le ${formatDateFrench(dateTitularisation)}. Votre carrière bascule sous le statut de fonctionnaire titulaire avec avancements d échelon garantis PPCR et ouverture de l avancement de grade.`
      );
      if (premierePromouvabiliteGrade) {
        pointsCles.push(
          `Première promouvabilité théorique post-titularisation : vers ${formatDateFrench(premierePromouvabiliteGrade.date)} (${premierePromouvabiliteGrade.titre}).`
        );
      }
      alertesVigilance.unshift(
        `Stage probatoire (12 mois) : La nomination en qualité de fonctionnaire stagiaire nécessite l accomplissement d un an de stage et le suivi obligatoire de la formation d intégration CNFPT avant la signature de l arrêté de titularisation par le Maire.`
      );
    } else {
      pointsCles.push(`Statut Contractuel (${profil.statut === "contractuel_cdi" ? "CDI" : "CDD"}) : Vous êtes rémunéré par assimilation à la grille indiciaire (${currentEchelonData.numero}e échelon, IM ${currentEchelonData.indiceMajore}).`);
      if (prochainEchelonJalon) {
        pointsCles.push(`Prochaine réévaluation triennale indicative : vers le ${formatDateFrench(prochainEchelonJalon.date)} (+ ${prochainEchelonJalon.gainIndiciaire} pts, soit +${Math.round(prochainEchelonJalon.gainFinancierBrutMensuel || 0)} € brut/mois sous réserve d'avenant DRH).`);
      }
      if (dejaEligibleConcours) {
        pointsCles.push(`Concours Interne : Vous justifiez d'ores et déjà de ${formatDurationInYearsAndMonths(moisServicesPublics)} de services publics effectifs (condition de ${anneesRequisesConcours} ans remplie). Vous pouvez vous inscrire au concours de ${cadre.nom} !`);
      } else {
        pointsCles.push(`Concours Interne : Vous atteindrez les ${anneesRequisesConcours} ans de services publics effectifs requis le ${formatDateFrench(dateEligibiliteConcours)}.`);
      }
    }

    if (isGradeAvancement(cadre, grade.id)) {
      alertesVigilance.unshift(
        `Attention statutaire : Vous avez sélectionné le grade « ${grade.nom} », qui est un grade d avancement. Dans la FPT, un agent contractuel ne peut être recruté que sur le 1er grade d accès (« ${cadre.grades[0].nom} »). Les grades d avancement sont strictement réservés à la promotion interne ou à l avancement des fonctionnaires titulaires.`
      );
    }

    alertesVigilance.push("Régime des contractuels (Décret n° 88-145) : Vous ne bénéficiez pas d'avancement d'échelon automatique de plein droit. L'évolution indiciaire nécessite un avenant contractuel décidé par la collectivité après entretien professionnel.");
    alertesVigilance.push("Avancement de grade statutaire : Inaccessible pour un contractuel. Seuls les fonctionnaires titulaires peuvent être promus de grade ou passer des examens professionnels d'avancement (art. L522-23 CGFP).");
    alertesVigilance.push("Examens professionnels statutaires : Réservés aux seuls fonctionnaires titulaires du grade inférieur. Les contractuels ne peuvent pas s'y inscrire.");
    alertesVigilance.push("Titularisation : Vos perspectives d'accès au statut pérenne de fonctionnaire passent par le Concours Interne (services publics effectifs) ou le recrutement direct sans concours (catégorie C1).");

    justificatifsUrgents.push("Conservez tous vos contrats de travail de droit public, avenants et attestations de services publics.");
    justificatifsUrgents.push("Demandez à la DRH de Gennevilliers un état récapitulatif certifié de vos services publics effectifs pour votre futur dossier de concours.");

    conseilsEntretienPro.push("Demandez un point sur votre réévaluation indiciaire triennale lors de votre entretien professionnel annuel (Décret 88-145 art. 1-2).");
    conseilsEntretienPro.push("Échangez avec votre évaluateur et la DRH sur les sessions du Concours Interne organisées par le CIG Petite Couronne.");
    if (cadre.categorie === "C") {
      conseilsEntretienPro.push("Sollicitez un échange sur les opportunités de nomination stagiaire directe sans concours (art. L326-1 CGFP).");
    }
  } else {
    // Titulaires
    pointsCles.push(`Vous êtes actuellement au ${currentEchelonData.numero}e échelon (IM ${currentEchelonData.indiceMajore}).`);
    if (prochainEchelonJalon) {
      pointsCles.push(`Votre prochain échelon (${prochainEchelonJalon.echelonNumero}e échelon, IM ${prochainEchelonJalon.indiceMajore}) est prévu pour le ${formatDateFrench(prochainEchelonJalon.date)} (+ ${prochainEchelonJalon.gainIndiciaire} points, soit +${Math.round(prochainEchelonJalon.gainFinancierBrutMensuel || 0)} € brut/mois).`);
    }
    if (premierePromouvabiliteGrade) {
      pointsCles.push(`Première promouvabilité théorique au grade supérieur : vers ${formatDateFrench(premierePromouvabiliteGrade.date)} (${premierePromouvabiliteGrade.titre}).`);
    }

    if (dispoPenaltyMonths > 0) {
      alertesVigilance.push(`Votre période de disponibilité sans activité décale votre avancement d échelon de ${dispoPenaltyMonths} mois.`);
    }
    if (profil.evenementsSimules.some(e => e.type === "conge_parental")) {
      alertesVigilance.push("Congé parental : Vos droits à avancement d échelon et de grade sont légalement préservés pendant la durée déclarée (loi 2019, max 5 ans).");
    }
    if (profil.evenementsSimules.some(e => e.type === "temps_partiel")) {
      alertesVigilance.push("Temps partiel : Le décompte d ancienneté statutaire pour avancement d échelon et de grade continue à 100% comme un temps plein (CGFP art. L612-4).");
    }

    justificatifsUrgents.push("Conservez tous vos arrêtés d avancement d échelon et notifications de grade.");
    if (profil.evenementsSimules.some(e => e.type === "disponibilite" && e.motifDisponibilite === "convenance_personnelle_avec_activite")) {
      justificatifsUrgents.push("Transmettre impérativement à la DRH avant le 31 décembre vos bulletins de paie justifiant d au moins 600h travaillées pour maintenir vos droits à l avancement !");
    }

    conseilsEntretienPro.push("Mentionnez dans votre compte-rendu d entretien votre projet de présentation à l examen professionnel ou d inscription au tableau d avancement.");
    conseilsEntretienPro.push("Vérifiez que toutes vos formations obligatoires d intégration et de professionnalisation CNFPT sont à jour.");
    conseilsEntretienPro.push("Demandez un bilan d étape de carrière auprès du service formation / GPEEC de votre DRH.");
  }

  return {
    profil,
    jalonActuel,
    prochainEchelonJalon,
    premierePromouvabiliteGrade,
    premierePromouvabiliteInterne,
    jalons,
    synthesePedagogique: {
      pointsCles,
      alertesVigilance,
      justificatifsUrgents,
      conseilsEntretienPro
    }
  };
}
