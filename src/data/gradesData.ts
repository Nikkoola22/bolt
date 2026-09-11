import type { CadreEmploiDefinition } from "../types/career";

// Valeurs réglementaires officielles (Décret n° 2023-519 du 28 juin 2023 portant majoration de la rémunération)
// Valeur annuelle du traitement correspondant à l indice majoré 100 = 5 907,34 €
// Valeur mensuelle d un point d indice = 5 907,34 / 1 200 = 4,922783 € / mois (59,0734 € / an)
export const VALEUR_POINT_INDICE_MENSUEL = 4.92278; 
export const VALEUR_POINT_INDICE_ANNUEL = VALEUR_POINT_INDICE_MENSUEL * 12; // 59,07336 €
export const INDICE_MINIMUM_TRAITEMENT_GARANTI = 366; // Minimum garanti SMIC Fonction Publique (au 01/01/2024)

export const CADRES_EMPLOIS: CadreEmploiDefinition[] = [
  {
    id: "redacteur_territorial",
    nom: "Rédacteur territorial",
    filiere: "Administrative",
    categorie: "B",
    decretReference: "Décrets n° 2012-924, n° 2010-329, n° 2022-1200 et n° 2022-1201 (revalorisation B)",
    grades: [
      {
        id: "redacteur_classe_normale",
        nom: "Rédacteur (Classe normale - B1)",
        filiere: "Administrative",
        categorie: "B",
        descriptionGrade: "Premier grade du cadre d emplois des rédacteurs (Catégorie B - NES B1). Fonctions de gestion administrative, budgétaire, juridique et d encadrement de proximité.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 389, indiceMajore: 373, description: "Stage probatoire avant titularisation" },
          { numero: 2, dureeAnnees: 1, indiceBrut: 395, indiceMajore: 374 },
          { numero: 3, dureeAnnees: 1, indiceBrut: 397, indiceMajore: 375 },
          { numero: 4, dureeAnnees: 1, indiceBrut: 401, indiceMajore: 376 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 415, indiceMajore: 377 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 431, indiceMajore: 386, description: "Accès examen pro Rédacteur Principal 2e cl." },
          { numero: 7, dureeAnnees: 2, indiceBrut: 452, indiceMajore: 401 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 478, indiceMajore: 420, description: "Accès au choix Rédacteur Principal 2e cl." },
          { numero: 9, dureeAnnees: 3, indiceBrut: 500, indiceMajore: 436 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 513, indiceMajore: 446 },
          { numero: 11, dureeAnnees: 3, indiceBrut: 538, indiceMajore: 462 },
          { numero: 12, dureeAnnees: 4, indiceBrut: 563, indiceMajore: 482 },
          { numero: 13, dureeAnnees: 0, indiceBrut: 597, indiceMajore: 508, description: "Sommet de la classe normale B1" }
        ],
        perspectives: [
          {
            gradeCibleId: "redacteur_principal_2cl",
            nomGradeCible: "Rédacteur principal de 2e classe (B2)",
            categorieCible: "B",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux fixé par délibération de la collectivité après avis du CST. Souvent compris entre 30% et 60% des agents promouvables.",
            modaliteReclassement: "Reclassement à l échelon comportant un indice égal ou immédiatement supérieur avec conservation d ancienneté si le gain indiciaire est inférieur à un avancement d échelon.",
            explicationReclassement: "Par exemple, un agent au 8e échelon (IM 420) est reclassé au 6e échelon de 2e classe (IM 421) avec conservation de son ancienneté acquise.",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Voie Examen Professionnel (accès dès l échelon 6)",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 3,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Attestation de réussite à l examen professionnel organisée par le Centre de Gestion (CDG)",
                  "Rapports d entretien professionnel annuel (EPA)",
                  "Attestation de suivi des formations d intégration et de professionnalisation obligatoire (CNFPT)"
                ],
                actesAdministratifs: [
                  "Consultation des Lignes Directrices de Gestion (LDG)",
                  "Arrêté portant tableau annuel d avancement signé par le Maire ou Président",
                  "Arrêté individuel de nomination et reclassement indiciaire",
                  "Transmission en Préfecture pour contrôle de légalité"
                ]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Voie Au Choix (Tableau d avancement annuel au mérite / ancienneté)",
                echelonMinimum: 8,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Justificatif de 5 ans de services effectifs accomplis dans un cadre de catégorie B",
                  "Comptes-rendus d entretien professionnel",
                  "Dossier professionnel valorisant les acquis de l expérience"
                ],
                actesAdministratifs: [
                  "Inscription au tableau annuel selon les critères LDG",
                  "Application du ratio promus/promouvables",
                  "Arrêté individuel de nomination au grade supérieur"
                ]
              }
            ]
          },
          {
            gradeCibleId: "attache_territorial",
            nomGradeCible: "Attaché territorial (Catégorie A)",
            categorieCible: "A",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Quotas départementaux stricts de promotion interne : 1 nomination pour 3 recrutements externes au niveau du Centre de Gestion (CDG).",
            modaliteReclassement: "Reclassement en catégorie A avec conservation du traitement indiciaire (clause de sauvegarde indiciaire) et perspective de déroulement vers les indices A.",
            explicationReclassement: "Passage du cadre de catégorie B vers la catégorie A (fonctions de direction, stratégie et encadrement supérieur).",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Promotion interne B -> A par Examen Professionnel",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 4,
                ancienneteServicesPublicsAnnees: 6,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Lauréat de l examen professionnel de promotion interne Attaché",
                  "Au moins 4 ans de services effectifs en catégorie B",
                  "Dossier RAEP complet et avis très circonstancié de l autorité territoriale"
                ],
                actesAdministratifs: [
                  "Inscription sur la liste d aptitude départementale arrêtée par le Président du CDG",
                  "Arrêté de nomination en qualité de stagiaire pour 6 mois ou titularisation directe"
                ]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne B -> A Au Choix (Liste d aptitude)",
                echelonMinimum: 8,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 10,
                ancienneteServicesPublicsAnnees: 10,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Justifier de 10 ans de services effectifs dans un cadre de catégorie B",
                  "Dossier professionnel valorisant les fonctions d encadrement ou d expertise"
                ],
                actesAdministratifs: [
                  "Dépôt du dossier auprès de la commission du CDG pour inscription sur liste d aptitude",
                  "Arrêté territorial de nomination au choix"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "redacteur_principal_2cl",
        nom: "Rédacteur principal de 2e classe (B2)",
        filiere: "Administrative",
        categorie: "B",
        descriptionGrade: "Deuxième grade du cadre d emplois des rédacteurs (NES B2). Responsabilités d encadrement de secteur ou d expertise renforcée.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 401, indiceMajore: 376 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 415, indiceMajore: 377 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 429, indiceMajore: 384 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 444, indiceMajore: 395 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 458, indiceMajore: 406 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 480, indiceMajore: 421, description: "Accès examen pro Rédacteur Principal 1re cl." },
          { numero: 7, dureeAnnees: 3, indiceBrut: 506, indiceMajore: 441, description: "Accès au choix Rédacteur Principal 1re cl." },
          { numero: 8, dureeAnnees: 3, indiceBrut: 528, indiceMajore: 457 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 542, indiceMajore: 466 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 567, indiceMajore: 485 },
          { numero: 11, dureeAnnees: 4, indiceBrut: 599, indiceMajore: 509 },
          { numero: 12, dureeAnnees: 0, indiceBrut: 638, indiceMajore: 539, description: "Sommet B2" }
        ],
        perspectives: [
          {
            gradeCibleId: "redacteur_principal_1cl",
            nomGradeCible: "Rédacteur principal de 1re classe (B3)",
            categorieCible: "B",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux fixé par l assemblée délibérante.",
            modaliteReclassement: "Reclassement à indice égal ou immédiatement supérieur.",
            explicationReclassement: "Accès au grade sommital de catégorie B.",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Examen professionnel 1re classe (dès l échelon 6)",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 1,
                ancienneteGradeAnnees: 3,
                examenProfessionnelRequis: true,
                piecesRequises: ["Certificat de réussite examen pro CDG", "Entretiens pro", "Attestation formation"],
                actesAdministratifs: ["Tableau annuel d avancement", "Arrêté individuel"]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (ancienneté et valeur pro)",
                echelonMinimum: 7,
                ancienneteEchelonAnnees: 1,
                ancienneteGradeAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: ["5 ans de services effectifs dans le grade de 2e classe", "Évaluations annuelles"],
                actesAdministratifs: ["Inscription tableau d avancement", "Arrêté individuel"]
              }
            ]
          }
        ]
      },
      {
        id: "redacteur_principal_1cl",
        nom: "Rédacteur principal de 1re classe (B3)",
        filiere: "Administrative",
        categorie: "B",
        descriptionGrade: "Grade sommital de la catégorie B administrative (NES B3). Encadrement supérieur de service et expertise complexe.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 446, indiceMajore: 397 },
          { numero: 2, dureeAnnees: 2, indiceBrut: 461, indiceMajore: 409 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 484, indiceMajore: 424 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 513, indiceMajore: 446 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 547, indiceMajore: 470 },
          { numero: 6, dureeAnnees: 3, indiceBrut: 573, indiceMajore: 489 },
          { numero: 7, dureeAnnees: 3, indiceBrut: 604, indiceMajore: 513 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 638, indiceMajore: 539 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 660, indiceMajore: 556 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 684, indiceMajore: 574 },
          { numero: 11, dureeAnnees: 0, indiceBrut: 707, indiceMajore: 592, description: "Sommet Catégorie B (IM 592)" }
        ],
        perspectives: [
          {
            gradeCibleId: "attache_territorial",
            nomGradeCible: "Attaché territorial (Catégorie A)",
            categorieCible: "A",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Promotion interne sur liste d aptitude CDG.",
            modaliteReclassement: "Reclassement avec reprise d indice en catégorie A.",
            explicationReclassement: "Passage vers l encadrement supérieur en catégorie A.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne B -> A au choix",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 10,
                piecesRequises: ["Dossier de candidature", "CV et état des services", "Rapports d entretien"],
                actesAdministratifs: ["Liste d aptitude CDG", "Arrêté territorial de nomination"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "adjoint_administratif",
    nom: "Adjoint administratif territorial",
    filiere: "Administrative",
    categorie: "C",
    decretReference: "Décret n° 2016-596 du 12 mai 2016 modifié (organisation des carrières de catégorie C)",
    grades: [
      {
        id: "adjoint_adm",
        nom: "Adjoint administratif (C1)",
        filiere: "Administrative",
        categorie: "C",
        descriptionGrade: "Grade d entrée sans concours en catégorie C (Échelle C1). Fonctions d accueil, de secrétariat et d exécution administrative.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 367, indiceMajore: 366, description: "Minimum de traitement garanti dans la fonction publique" },
          { numero: 2, dureeAnnees: 1, indiceBrut: 368, indiceMajore: 367 },
          { numero: 3, dureeAnnees: 1, indiceBrut: 370, indiceMajore: 368 },
          { numero: 4, dureeAnnees: 1, indiceBrut: 371, indiceMajore: 369 },
          { numero: 5, dureeAnnees: 1, indiceBrut: 374, indiceMajore: 370 },
          { numero: 6, dureeAnnees: 1, indiceBrut: 378, indiceMajore: 371 },
          { numero: 7, dureeAnnees: 3, indiceBrut: 381, indiceMajore: 372 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 387, indiceMajore: 373 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 401, indiceMajore: 376 },
          { numero: 10, dureeAnnees: 4, indiceBrut: 419, indiceMajore: 377 },
          { numero: 11, dureeAnnees: 0, indiceBrut: 432, indiceMajore: 387, description: "Sommet C1" }
        ],
        perspectives: [
          {
            gradeCibleId: "adjoint_adm_principal_2cl",
            nomGradeCible: "Adjoint administratif principal de 2e classe (C2)",
            categorieCible: "C",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux voté par la collectivité.",
            modaliteReclassement: "Reclassement à échelon d indice équivalent avec report d ancienneté.",
            explicationReclassement: "Accès à l échelle C2.",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Examen professionnel C1 -> C2",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteGradeAnnees: 3,
                examenProfessionnelRequis: true,
                piecesRequises: ["Attestation de réussite examen C2", "Évaluations annuelles"],
                actesAdministratifs: ["Tableau d avancement", "Arrêté individuel"]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (ancienneté C1)",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteGradeAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: ["Au moins 5 ans de services effectifs dans le grade C1", "Dossier pro"],
                actesAdministratifs: ["Inscription tableau d avancement", "Arrêté individuel"]
              }
            ]
          },
          {
            gradeCibleId: "redacteur_classe_normale",
            nomGradeCible: "Rédacteur territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Quotas promotion interne C vers B gérés par le CDG.",
            modaliteReclassement: "Reclassement en B1 avec garantie indiciaire.",
            explicationReclassement: "Changement de catégorie C vers B (responsabilités de coordination et d encadrement).",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Promotion interne C vers B par Examen Professionnel",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 7,
                examenProfessionnelRequis: true,
                piecesRequises: ["Examen pro Rédacteur", "7 ans de services publics dont 4 ans en C"],
                actesAdministratifs: ["Liste aptitude CDG", "Arrêté de nomination"]
              }
            ]
          }
        ]
      },
      {
        id: "adjoint_adm_principal_2cl",
        nom: "Adjoint administratif principal de 2e classe (C2)",
        filiere: "Administrative",
        categorie: "C",
        descriptionGrade: "Deuxième grade de catégorie C (Échelle C2). Accès par concours ou avancement de grade.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 368, indiceMajore: 367 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 371, indiceMajore: 369 },
          { numero: 3, dureeAnnees: 1, indiceBrut: 376, indiceMajore: 370 },
          { numero: 4, dureeAnnees: 1, indiceBrut: 387, indiceMajore: 373 },
          { numero: 5, dureeAnnees: 1, indiceBrut: 396, indiceMajore: 374 },
          { numero: 6, dureeAnnees: 1, indiceBrut: 404, indiceMajore: 376 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 416, indiceMajore: 377 },
          { numero: 8, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 446, indiceMajore: 397 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 461, indiceMajore: 409 },
          { numero: 11, dureeAnnees: 4, indiceBrut: 473, indiceMajore: 417 },
          { numero: 12, dureeAnnees: 0, indiceBrut: 486, indiceMajore: 425, description: "Sommet C2" }
        ],
        perspectives: [
          {
            gradeCibleId: "adjoint_adm_principal_1cl",
            nomGradeCible: "Adjoint administratif principal de 1re classe (C3)",
            categorieCible: "C",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux d avancement fixé par l assemblée.",
            modaliteReclassement: "Reclassement en échelle C3.",
            explicationReclassement: "Grade sommital de catégorie C.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix C2 -> C3",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 1,
                ancienneteGradeAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: ["Avoir atteint le 6e échelon et 5 ans de services effectifs en C2"],
                actesAdministratifs: ["Tableau d avancement", "Arrêté individuel"]
              }
            ]
          },
          {
            gradeCibleId: "redacteur_classe_normale",
            nomGradeCible: "Rédacteur territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Quota CDG.",
            modaliteReclassement: "Reclassement en B1.",
            explicationReclassement: "Accès à la catégorie B.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne C -> B au choix",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 10,
                examenProfessionnelRequis: false,
                piecesRequises: ["10 ans de services publics dont 5 ans en C"],
                actesAdministratifs: ["Liste d aptitude CDG", "Arrêté de nomination"]
              }
            ]
          }
        ]
      },
      {
        id: "adjoint_adm_principal_1cl",
        nom: "Adjoint administratif principal de 1re classe (C3)",
        filiere: "Administrative",
        categorie: "C",
        descriptionGrade: "Grade sommital de la catégorie C (Échelle C3).",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 388, indiceMajore: 373 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 397, indiceMajore: 375 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 412, indiceMajore: 376 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 448, indiceMajore: 398 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 460, indiceMajore: 408 },
          { numero: 7, dureeAnnees: 3, indiceBrut: 478, indiceMajore: 420 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 499, indiceMajore: 435 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 525, indiceMajore: 455 },
          { numero: 10, dureeAnnees: 0, indiceBrut: 558, indiceMajore: 478, description: "Sommet C3 (IM 478)" }
        ],
        perspectives: [
          {
            gradeCibleId: "redacteur_classe_normale",
            nomGradeCible: "Rédacteur territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Promotion interne CDG.",
            modaliteReclassement: "Reclassement indiciaire en B1 avec report d ancienneté.",
            explicationReclassement: "Passage statutaire en catégorie B.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne B au choix",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 8,
                piecesRequises: ["Dossier professionnel", "Entretien hiérarchique"],
                actesAdministratifs: ["Liste d aptitude CDG", "Arrêté individuel"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "attache_territorial",
    nom: "Attaché territorial",
    filiere: "Administrative",
    categorie: "A",
    decretReference: "Décret n° 87-1099 du 30 décembre 1987 portant statut particulier du cadre d emplois des attachés",
    grades: [
      {
        id: "attache_grade_normal",
        nom: "Attaché territorial",
        filiere: "Administrative",
        categorie: "A",
        descriptionGrade: "Grade d entrée en catégorie A administrative. Fonctions de conception, de direction et de pilotage stratégique.",
        echelons: [
          { numero: 1, dureeAnnees: 1.5, indiceBrut: 444, indiceMajore: 395, description: "Stage probatoire avant titularisation" },
          { numero: 2, dureeAnnees: 2, indiceBrut: 469, indiceMajore: 415 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 499, indiceMajore: 435 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 525, indiceMajore: 455 },
          { numero: 5, dureeAnnees: 2.5, indiceBrut: 567, indiceMajore: 485, description: "Accès examen pro Attaché Principal" },
          { numero: 6, dureeAnnees: 3, indiceBrut: 611, indiceMajore: 518 },
          { numero: 7, dureeAnnees: 3, indiceBrut: 653, indiceMajore: 550, description: "Accès au choix Attaché Principal" },
          { numero: 8, dureeAnnees: 3, indiceBrut: 693, indiceMajore: 580 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 732, indiceMajore: 610 },
          { numero: 10, dureeAnnees: 4, indiceBrut: 778, indiceMajore: 645 },
          { numero: 11, dureeAnnees: 0, indiceBrut: 821, indiceMajore: 678, description: "Sommet grade Attaché (IM 678)" }
        ],
        perspectives: [
          {
            gradeCibleId: "attache_principal",
            nomGradeCible: "Attaché principal",
            categorieCible: "A",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux fixé par la collectivité.",
            modaliteReclassement: "Reclassement à indice égal ou immédiatement supérieur avec conservation de l ancienneté acquise.",
            explicationReclassement: "Accès aux fonctions de direction de service, chargé de mission stratégique ou sous-direction.",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Examen professionnel Attaché Principal (dès l échelon 5)",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 3,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Réussite à l examen professionnel organisé par le CNFPT / CDG",
                  "Dossier RAEP et comptes-rendus d entretien",
                  "Formations obligatoires validées"
                ],
                actesAdministratifs: [
                  "Tableau d avancement annuel établi par l autorité",
                  "Arrêté de nomination au grade d Attaché Principal"
                ]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (valeur professionnelle et ancienneté)",
                echelonMinimum: 7,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 7,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Avoir atteint au moins le 7e échelon d attaché",
                  "Justifier d au moins 7 ans de services effectifs dans un cadre de catégorie A",
                  "Avis très circonstancié de la Direction Générale"
                ],
                actesAdministratifs: [
                  "Inscription au Tableau d avancement au choix",
                  "Arrêté individuel du Maire ou Président"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "attache_principal",
        nom: "Attaché principal",
        filiere: "Administrative",
        categorie: "A",
        descriptionGrade: "Deuxième grade du cadre d attachés. Direction de grands services et pilotage opérationnel.",
        echelons: [
          { numero: 1, dureeAnnees: 2, indiceBrut: 593, indiceMajore: 505 },
          { numero: 2, dureeAnnees: 2, indiceBrut: 639, indiceMajore: 540 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 693, indiceMajore: 580 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 732, indiceMajore: 610 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 791, indiceMajore: 655 },
          { numero: 6, dureeAnnees: 2.5, indiceBrut: 843, indiceMajore: 695 },
          { numero: 7, dureeAnnees: 2.5, indiceBrut: 896, indiceMajore: 735 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 946, indiceMajore: 773 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 995, indiceMajore: 811 },
          { numero: 10, dureeAnnees: 0, indiceBrut: 1015, indiceMajore: 826, description: "Sommet Attaché Principal (IM 826)" }
        ],
        perspectives: []
      }
    ]
  },
  {
    id: "technicien_territorial",
    nom: "Technicien territorial",
    filiere: "Technique",
    categorie: "B",
    decretReference: "Décrets n° 2010-1357, n° 2010-329, n° 2022-1200 et n° 2022-1201",
    grades: [
      {
        id: "technicien_classe_normale",
        nom: "Technicien (Classe normale - B1)",
        filiere: "Technique",
        categorie: "B",
        descriptionGrade: "Grade d entrée de la filière technique catégorie B (NES B1). Conduite de chantiers, urbanisme, réseaux et informatique.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 389, indiceMajore: 373 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 395, indiceMajore: 374 },
          { numero: 3, dureeAnnees: 1, indiceBrut: 397, indiceMajore: 375 },
          { numero: 4, dureeAnnees: 1, indiceBrut: 401, indiceMajore: 376 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 415, indiceMajore: 377 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 431, indiceMajore: 386 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 452, indiceMajore: 401 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 478, indiceMajore: 420 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 500, indiceMajore: 436 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 513, indiceMajore: 446 },
          { numero: 11, dureeAnnees: 3, indiceBrut: 538, indiceMajore: 462 },
          { numero: 12, dureeAnnees: 4, indiceBrut: 563, indiceMajore: 482 },
          { numero: 13, dureeAnnees: 0, indiceBrut: 597, indiceMajore: 508 }
        ],
        perspectives: []
      }
    ]
  },
  {
    id: "ingenieur_territorial",
    nom: "Ingénieur territorial",
    filiere: "Technique",
    categorie: "A",
    decretReference: "Décret n° 2016-201 du 26 février 2016 portant statut particulier du cadre d emplois des ingénieurs territoriaux",
    grades: [
      {
        id: "ingenieur_normal",
        nom: "Ingénieur territorial",
        filiere: "Technique",
        categorie: "A",
        descriptionGrade: "Grade d entrée de la filière technique catégorie A. Conduite de projets techniques, aménagement, informatique et ingénierie.",
        echelons: [
          { numero: 1, dureeAnnees: 1.5, indiceBrut: 444, indiceMajore: 395 },
          { numero: 2, dureeAnnees: 2, indiceBrut: 484, indiceMajore: 424 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 518, indiceMajore: 450 },
          { numero: 4, dureeAnnees: 2.5, indiceBrut: 565, indiceMajore: 483 },
          { numero: 5, dureeAnnees: 3, indiceBrut: 611, indiceMajore: 518 },
          { numero: 6, dureeAnnees: 4, indiceBrut: 646, indiceMajore: 545 },
          { numero: 7, dureeAnnees: 4, indiceBrut: 697, indiceMajore: 583 },
          { numero: 8, dureeAnnees: 4, indiceBrut: 739, indiceMajore: 615 },
          { numero: 9, dureeAnnees: 4, indiceBrut: 774, indiceMajore: 642 },
          { numero: 10, dureeAnnees: 0, indiceBrut: 821, indiceMajore: 678, description: "Sommet grade Ingénieur (IM 678)" }
        ],
        perspectives: []
      },
      {
        id: "ingenieur_principal",
        nom: "Ingénieur principal",
        filiere: "Technique",
        categorie: "A",
        descriptionGrade: "Deuxième grade des ingénieurs. Direction de services techniques et de projets complexes.",
        echelons: [
          { numero: 1, dureeAnnees: 2, indiceBrut: 619, indiceMajore: 524 },
          { numero: 2, dureeAnnees: 2.5, indiceBrut: 665, indiceMajore: 560 },
          { numero: 3, dureeAnnees: 3, indiceBrut: 721, indiceMajore: 602 },
          { numero: 4, dureeAnnees: 3, indiceBrut: 791, indiceMajore: 655 },
          { numero: 5, dureeAnnees: 3, indiceBrut: 837, indiceMajore: 690 },
          { numero: 6, dureeAnnees: 3, indiceBrut: 896, indiceMajore: 735 },
          { numero: 7, dureeAnnees: 3, indiceBrut: 946, indiceMajore: 773 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 995, indiceMajore: 811 },
          { numero: 9, dureeAnnees: 0, indiceBrut: 1015, indiceMajore: 826 }
        ],
        perspectives: []
      }
    ]
  },
  {
    id: "adjoint_technique",
    nom: "Adjoint technique territorial",
    filiere: "Technique",
    categorie: "C",
    decretReference: "Décret n° 2006-1691 du 22 décembre 2006 et Décret n° 2016-596 modifié (organisation des carrières de catégorie C)",
    grades: [
      {
        id: "adjoint_technique_c1",
        nom: "Adjoint technique territorial (C1)",
        filiere: "Technique",
        categorie: "C",
        descriptionGrade: "Grade d entrée sans concours en catégorie C (Échelle C1). Travaux d exécution technique, entretien des bâtiments, voirie, espaces verts, propreté et restauration collective.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 367, indiceMajore: 366, description: "Minimum de traitement garanti dans la fonction publique" },
          { numero: 2, dureeAnnees: 1, indiceBrut: 368, indiceMajore: 367 },
          { numero: 3, dureeAnnees: 1, indiceBrut: 370, indiceMajore: 368 },
          { numero: 4, dureeAnnees: 1, indiceBrut: 371, indiceMajore: 369 },
          { numero: 5, dureeAnnees: 1, indiceBrut: 374, indiceMajore: 370 },
          { numero: 6, dureeAnnees: 1, indiceBrut: 378, indiceMajore: 371 },
          { numero: 7, dureeAnnees: 3, indiceBrut: 381, indiceMajore: 372 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 387, indiceMajore: 373 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 401, indiceMajore: 376 },
          { numero: 10, dureeAnnees: 4, indiceBrut: 419, indiceMajore: 377 },
          { numero: 11, dureeAnnees: 0, indiceBrut: 432, indiceMajore: 387, description: "Sommet de l échelle C1" }
        ],
        perspectives: [
          {
            gradeCibleId: "adjoint_technique_principal_2cl",
            nomGradeCible: "Adjoint technique principal de 2e classe (C2)",
            categorieCible: "C",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux d avancement fixé par délibération de la collectivité après avis du CST.",
            modaliteReclassement: "Reclassement à échelon d indice équivalent ou immédiatement supérieur avec report de l ancienneté acquise.",
            explicationReclassement: "Accès à l échelle C2 avec déroulement de carrière jusqu à l échelon 12 (IM 425).",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Examen professionnel C1 -> C2 (accès accéléré)",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteGradeAnnees: 3,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Attestation de réussite à l examen professionnel C2 délivrée par le CDG",
                  "Comptes-rendus d entretien professionnel annuel (EPA)",
                  "Attestation CNFPT de suivi des formations statutaires obligatoires"
                ],
                actesAdministratifs: [
                  "Inscription au tableau annuel d avancement de grade",
                  "Arrêté individuel de nomination et reclassement signé par l autorité territoriale"
                ]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (Tableau annuel au mérite / ancienneté)",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteGradeAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Au moins 5 ans de services effectifs accomplis dans le grade d adjoint technique C1",
                  "Évaluations professionnelles annuelles"
                ],
                actesAdministratifs: [
                  "Inscription au tableau annuel d avancement selon critères LDG",
                  "Arrêté individuel de nomination"
                ]
              }
            ]
          },
          {
            gradeCibleId: "agent_maitrise_grade_initial",
            nomGradeCible: "Agent de maîtrise territorial (Catégorie C+)",
            categorieCible: "C",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Nomination au choix ou par examen professionnel sur liste d aptitude établie par le Centre de Gestion (CDG).",
            modaliteReclassement: "Reclassement dans la grille des agents de maîtrise avec prise en compte des fonctions d encadrement.",
            explicationReclassement: "Passage aux fonctions d encadrement d équipes et de chantiers techniques.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne vers Agent de Maîtrise",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 7,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Justificatif d au moins 7 ans de services effectifs dans la filière technique",
                  "Rapport circonstancié du responsable hiérarchique validant l aptitude au commandement",
                  "Attestations CNFPT"
                ],
                actesAdministratifs: [
                  "Inscription sur la liste d aptitude du CDG",
                  "Arrêté de nomination en qualité d agent de maîtrise stagiaire"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "adjoint_technique_principal_2cl",
        nom: "Adjoint technique principal de 2e classe (C2)",
        filiere: "Technique",
        categorie: "C",
        descriptionGrade: "Deuxième grade de catégorie C (Échelle C2). Missions d exécution qualifiée, conduite d engins, travaux spécialisés ou encadrement opérationnel de proximité.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 368, indiceMajore: 367 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 371, indiceMajore: 369 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 376, indiceMajore: 370 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 387, indiceMajore: 373 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 396, indiceMajore: 374 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 404, indiceMajore: 376 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 416, indiceMajore: 377 },
          { numero: 8, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 446, indiceMajore: 397 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 461, indiceMajore: 409 },
          { numero: 11, dureeAnnees: 3, indiceBrut: 473, indiceMajore: 417 },
          { numero: 12, dureeAnnees: 0, indiceBrut: 486, indiceMajore: 425, description: "Sommet échelle C2" }
        ],
        perspectives: [
          {
            gradeCibleId: "adjoint_technique_principal_1cl",
            nomGradeCible: "Adjoint technique principal de 1re classe (C3)",
            categorieCible: "C",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux d avancement fixé par la collectivité.",
            modaliteReclassement: "Reclassement à l échelon d indice équivalent dans l échelle C3.",
            explicationReclassement: "Accès au grade sommital de la filière ouvrière (Échelle C3 jusqu à l IM 478).",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (1 an d ancienneté au 6e échelon de C2 + 5 ans dans le grade C2)",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 1,
                ancienneteGradeAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Justificatif d 1 an au moins au 6e échelon",
                  "Justificatif de 5 ans de services effectifs accomplis en C2",
                  "Comptes-rendus d entretien professionnel annuel"
                ],
                actesAdministratifs: [
                  "Inscription au tableau annuel d avancement de grade C2 -> C3",
                  "Arrêté individuel de nomination"
                ]
              }
            ]
          },
          {
            gradeCibleId: "agent_maitrise_grade_initial",
            nomGradeCible: "Agent de maîtrise territorial (Catégorie C+)",
            categorieCible: "C",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Liste d aptitude du Centre de Gestion.",
            modaliteReclassement: "Reclassement en agent de maîtrise.",
            explicationReclassement: "Accès aux responsabilités d encadrement.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne vers Agent de Maîtrise",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 7,
                examenProfessionnelRequis: false,
                piecesRequises: ["7 ans de services publics techniques", "Rapport hiérarchique"],
                actesAdministratifs: ["Liste aptitude CDG", "Arrêté individuel"]
              }
            ]
          }
        ]
      },
      {
        id: "adjoint_technique_principal_1cl",
        nom: "Adjoint technique principal de 1re classe (C3)",
        filiere: "Technique",
        categorie: "C",
        descriptionGrade: "Grade sommital des adjoints techniques territoriaux (Échelle C3). Travaux hautement qualifiés, coordination d équipes opérationnelles et tutorat.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 388, indiceMajore: 373 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 397, indiceMajore: 375 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 412, indiceMajore: 376 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 448, indiceMajore: 398 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 460, indiceMajore: 408 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 478, indiceMajore: 420 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 499, indiceMajore: 435 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 525, indiceMajore: 455 },
          { numero: 10, dureeAnnees: 0, indiceBrut: 558, indiceMajore: 478, description: "Sommet C3 (IM 478)" }
        ],
        perspectives: [
          {
            gradeCibleId: "technicien_classe_normale",
            nomGradeCible: "Technicien territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Quotas départementaux stricts de promotion interne C vers B gérés par le CDG.",
            modaliteReclassement: "Reclassement en B1 avec maintien du traitement indiciaire (clause de sauvegarde).",
            explicationReclassement: "Changement de catégorie statutaire : passage de C à B.",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Promotion interne C vers B par Examen Pro Technicien",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 7,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Attestation de réussite à l examen professionnel de technicien délivrée par le CDG",
                  "Au moins 7 ans de services publics",
                  "Rapports d entretien professionnel"
                ],
                actesAdministratifs: [
                  "Inscription sur liste d aptitude CDG",
                  "Arrêté de nomination en technicien territorial stagiaire"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "agent_maitrise",
    nom: "Agent de maîtrise territorial",
    filiere: "Technique",
    categorie: "C",
    decretReference: "Décret n° 88-547 du 6 mai 1988 modifié et Décret n° 2016-1382",
    grades: [
      {
        id: "agent_maitrise_grade_initial",
        nom: "Agent de maîtrise",
        filiere: "Technique",
        categorie: "C",
        descriptionGrade: "Grade d encadrement de proximité de catégorie C. Responsabilité directe d équipes d adjoints techniques, organisation des chantiers, régies et sécurité des interventions.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 369, indiceMajore: 366, description: "Minimum garanti de traitement" },
          { numero: 2, dureeAnnees: 1, indiceBrut: 375, indiceMajore: 367 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 387, indiceMajore: 371 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 396, indiceMajore: 374, description: "Accès examen pro Agent de Maîtrise Principal" },
          { numero: 5, dureeAnnees: 2, indiceBrut: 404, indiceMajore: 375, description: "Accès au choix Agent de Maîtrise Principal" },
          { numero: 6, dureeAnnees: 2, indiceBrut: 416, indiceMajore: 376 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 8, dureeAnnees: 2, indiceBrut: 446, indiceMajore: 397 },
          { numero: 9, dureeAnnees: 2, indiceBrut: 461, indiceMajore: 409 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 475, indiceMajore: 418 },
          { numero: 11, dureeAnnees: 3, indiceBrut: 492, indiceMajore: 430 },
          { numero: 12, dureeAnnees: 3, indiceBrut: 515, indiceMajore: 447 },
          { numero: 13, dureeAnnees: 0, indiceBrut: 544, indiceMajore: 468, description: "Sommet grade Agent de maîtrise" }
        ],
        perspectives: [
          {
            gradeCibleId: "agent_maitrise_principal",
            nomGradeCible: "Agent de maîtrise principal",
            categorieCible: "C",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux fixé par délibération de la collectivité après avis du CST.",
            modaliteReclassement: "Reclassement à l échelon comportant un indice égal ou immédiatement supérieur.",
            explicationReclassement: "Avancement vers le grade supérieur d encadrement technique (indice sommital IM 492).",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Examen professionnel (accès dès l échelon 4 + 3 ans dans le cadre)",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 3,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Attestation de réussite à l examen professionnel d agent de maîtrise principal (CDG)",
                  "Comptes-rendus d entretien professionnel",
                  "Attestations CNFPT"
                ],
                actesAdministratifs: [
                  "Inscription au tableau annuel d avancement",
                  "Arrêté individuel de nomination au grade supérieur"
                ]
              },
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (5e échelon + au moins 6 ans de services effectifs dans le cadre)",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteCadreAnnees: 6,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Justificatif d avoir atteint le 5e échelon",
                  "Justificatif de 6 ans au moins de services effectifs comme agent de maîtrise",
                  "Évaluations professionnelles"
                ],
                actesAdministratifs: [
                  "Inscription tableau d avancement LDG",
                  "Arrêté individuel de nomination"
                ]
              }
            ]
          },
          {
            gradeCibleId: "technicien_classe_normale",
            nomGradeCible: "Technicien territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Promotion interne C vers B gérée par le Centre de Gestion.",
            modaliteReclassement: "Reclassement en B1 avec conservation du traitement indiciaire.",
            explicationReclassement: "Passage en catégorie B (fonctions de conduite de projets et d encadrement technique intermédiaire).",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne B au choix (au moins 8 ans de services effectifs)",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 8,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Au moins 8 ans de services effectifs en catégorie C",
                  "Dossier professionnel valorisant l expérience d encadrement",
                  "Rapport circonstancié de la direction générale"
                ],
                actesAdministratifs: [
                  "Inscription sur la liste d aptitude du CDG",
                  "Arrêté de nomination en technicien stagiaire"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "agent_maitrise_principal",
        nom: "Agent de maîtrise principal",
        filiere: "Technique",
        categorie: "C",
        descriptionGrade: "Grade sommital des agents de maîtrise. Encadrement de plusieurs secteurs techniques, coordination de chefs d équipe et gestion logistique d envergure.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 390, indiceMajore: 372 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 408, indiceMajore: 376 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 426, indiceMajore: 382 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 446, indiceMajore: 397 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 465, indiceMajore: 412 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 486, indiceMajore: 425 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 506, indiceMajore: 440 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 528, indiceMajore: 457 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 551, indiceMajore: 473 },
          { numero: 10, dureeAnnees: 0, indiceBrut: 576, indiceMajore: 492, description: "Sommet Agent de maîtrise principal (IM 492)" }
        ],
        perspectives: [
          {
            gradeCibleId: "technicien_classe_normale",
            nomGradeCible: "Technicien territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Quotas CDG pour l accès à la catégorie B.",
            modaliteReclassement: "Reclassement indiciaire en B avec garantie du traitement antérieur.",
            explicationReclassement: "Reclassement de catégorie C vers la catégorie B.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne Technicien B au choix",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 8,
                examenProfessionnelRequis: false,
                piecesRequises: ["8 ans de services publics", "Rapport hiérarchique"],
                actesAdministratifs: ["Liste aptitude CDG", "Arrêté individuel"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "atsem",
    nom: "ATSEM (Agent spécialisé des écoles maternelles)",
    filiere: "Médico-sociale",
    categorie: "C",
    decretReference: "Décret n° 92-850 du 28 août 1992 modifié par le Décret n° 2018-152 du 1er mars 2018 (revalorisation des ATSEM en échelles C2 et C3)",
    grades: [
      {
        id: "atsem_principal_2cl",
        nom: "ATSEM principal de 2e classe (C2)",
        filiere: "Médico-sociale",
        categorie: "C",
        descriptionGrade: "Grade de recrutement initial par concours (Échelle C2). Assistance éducative et pédagogique auprès des enseignants d école maternelle, soins d hygiène corporelle, sécurité et propreté des locaux.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 368, indiceMajore: 367, description: "Recrutement par concours direct en échelle C2" },
          { numero: 2, dureeAnnees: 1, indiceBrut: 371, indiceMajore: 369 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 376, indiceMajore: 370 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 387, indiceMajore: 373 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 396, indiceMajore: 374 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 404, indiceMajore: 376, description: "Seuil de promouvabilité au grade C3" },
          { numero: 7, dureeAnnees: 2, indiceBrut: 416, indiceMajore: 377 },
          { numero: 8, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 446, indiceMajore: 397 },
          { numero: 10, dureeAnnees: 3, indiceBrut: 461, indiceMajore: 409 },
          { numero: 11, dureeAnnees: 3, indiceBrut: 473, indiceMajore: 417 },
          { numero: 12, dureeAnnees: 0, indiceBrut: 486, indiceMajore: 425, description: "Sommet échelle C2" }
        ],
        perspectives: [
          {
            gradeCibleId: "atsem_principal_1cl",
            nomGradeCible: "ATSEM principal de 1re classe (C3)",
            categorieCible: "C",
            typePerspective: "avancement_grade",
            ratioPromusPromouvablesExplication: "Taux d avancement fixé par délibération de la collectivité après avis du CST.",
            modaliteReclassement: "Reclassement à l échelon d indice équivalent dans l échelle C3 avec conservation de l ancienneté acquise.",
            explicationReclassement: "Accès au grade sommital C3 (indice majoré jusqu à 478).",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Au choix (au moins 1 an d ancienneté au 6e échelon et 5 ans dans le grade de C2)",
                echelonMinimum: 6,
                ancienneteEchelonAnnees: 1,
                ancienneteGradeAnnees: 5,
                examenProfessionnelRequis: false,
                piecesRequises: [
                  "Justificatif d 1 an au moins d ancienneté au 6e échelon de C2",
                  "Justificatif de 5 ans de services effectifs dans le grade d ATSEM principal de 2e classe",
                  "Comptes-rendus d entretien professionnel annuel (EPA)",
                  "Attestation de suivi des formations statutaires CNFPT"
                ],
                actesAdministratifs: [
                  "Inscription au tableau annuel d avancement selon critères LDG",
                  "Arrêté individuel de nomination et de reclassement signé par le Maire"
                ]
              }
            ]
          },
          {
            gradeCibleId: "redacteur_classe_normale",
            nomGradeCible: "Animateur ou Rédacteur territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Promotion interne sur liste d aptitude établie par le Centre de Gestion (CDG).",
            modaliteReclassement: "Reclassement en catégorie B avec sauvegarde indiciaire.",
            explicationReclassement: "Évolution de carrière vers la catégorie B (animation socioculturelle, enfance ou gestion administrative).",
            conditions: [
              {
                typeVoie: "examen_professionnel",
                descriptionVoie: "Promotion interne B par Examen Professionnel",
                echelonMinimum: 4,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 7,
                examenProfessionnelRequis: true,
                piecesRequises: [
                  "Attestation de réussite à l examen professionnel CDG",
                  "Justificatif de 7 ans de services publics dont 4 ans en catégorie C",
                  "Dossier d entretien annuel et rapport du chef de service"
                ],
                actesAdministratifs: [
                  "Inscription sur liste d aptitude CDG",
                  "Arrêté de nomination stagiaire catégorie B"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "atsem_principal_1cl",
        nom: "ATSEM principal de 1re classe (C3)",
        filiere: "Médico-sociale",
        categorie: "C",
        descriptionGrade: "Grade sommital des ATSEM territoriales (Échelle C3). Missions d accompagnement qualifié des enfants en situation de handicap, tutorat des stagiaires et coordination d école.",
        echelons: [
          { numero: 1, dureeAnnees: 1, indiceBrut: 388, indiceMajore: 373 },
          { numero: 2, dureeAnnees: 1, indiceBrut: 397, indiceMajore: 375 },
          { numero: 3, dureeAnnees: 2, indiceBrut: 412, indiceMajore: 376 },
          { numero: 4, dureeAnnees: 2, indiceBrut: 430, indiceMajore: 385 },
          { numero: 5, dureeAnnees: 2, indiceBrut: 448, indiceMajore: 398 },
          { numero: 6, dureeAnnees: 2, indiceBrut: 460, indiceMajore: 408 },
          { numero: 7, dureeAnnees: 2, indiceBrut: 478, indiceMajore: 420 },
          { numero: 8, dureeAnnees: 3, indiceBrut: 499, indiceMajore: 435 },
          { numero: 9, dureeAnnees: 3, indiceBrut: 525, indiceMajore: 455 },
          { numero: 10, dureeAnnees: 0, indiceBrut: 558, indiceMajore: 478, description: "Sommet ATSEM (IM 478)" }
        ],
        perspectives: [
          {
            gradeCibleId: "redacteur_classe_normale",
            nomGradeCible: "Animateur ou Rédacteur territorial (Catégorie B)",
            categorieCible: "B",
            typePerspective: "promotion_interne",
            ratioPromusPromouvablesExplication: "Listes d aptitude du CDG.",
            modaliteReclassement: "Reclassement en B avec garantie du traitement.",
            explicationReclassement: "Passage en catégorie B.",
            conditions: [
              {
                typeVoie: "au_choix",
                descriptionVoie: "Promotion interne B au choix (au moins 8 ans de services effectifs)",
                echelonMinimum: 5,
                ancienneteEchelonAnnees: 0,
                ancienneteServicesPublicsAnnees: 8,
                examenProfessionnelRequis: false,
                piecesRequises: ["8 ans de services publics", "Dossier EPA", "Attestations CNFPT"],
                actesAdministratifs: ["Liste aptitude CDG", "Arrêté individuel"]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const MOTIFS_DISPONIBILITE = [
  {
    code: "convenance_personnelle_avec_activite",
    libelle: "Disponibilité pour convenance personnelle avec activité professionnelle (> 600h/an)",
    maintienAvancementMaxAnnees: 5,
    justificatifs: [
      "Contrat de travail ou bulletins de paie justifiant d au moins 600 heures de travail annuel",
      "Pour activité indépendante : déclaration URSSAF attestant d un revenu brut annuel suffisant",
      "Attestation sur l honneur transmise chaque année avant le 31 décembre à la DRH"
    ],
    explication: "Décret n° 2019-234 du 27 mars 2019 : L agent conserve ses droits à l avancement d échelon et de grade pendant une durée maximale de 5 ans sur l ensemble de sa carrière."
  },
  {
    code: "convenance_personnelle_sans_activite",
    libelle: "Disponibilité pour convenance personnelle sans activité professionnelle",
    maintienAvancementMaxAnnees: 0,
    justificatifs: [
      "Arrêté de mise en disponibilité signé par l autorité",
      "Demande de réintégration formulée 3 mois au moins avant le terme"
    ],
    explication: "Règle générale : suspension totale de la rémunération et interruption de l ancienneté pour l avancement d échelon et de grade. La date du prochain échelon est décalée d autant de mois que la durée de la disponibilité."
  },
  {
    code: "elever_enfant",
    libelle: "Disponibilité pour élever un enfant de moins de 12 ans",
    maintienAvancementMaxAnnees: 5,
    justificatifs: [
      "Copie intégrale du livret de famille ou extrait d acte de naissance",
      "Demande de renouvellement annuel"
    ],
    explication: "Accordée de droit. L agent conserve ses droits à l avancement d échelon et de grade pendant une durée maximale de 5 ans sur l ensemble de la carrière (CGFP art. L514-2)."
  },
  {
    code: "suivre_conjoint",
    libelle: "Disponibilité pour suivre son conjoint ou partenaire de PACS",
    maintienAvancementMaxAnnees: 0,
    justificatifs: [
      "Justificatif professionnel du conjoint (mutation, nouveau contrat)",
      "Attestation de vie commune (PACS, certificat de mariage, bail)"
    ],
    explication: "Accordée de droit sans limitation de durée. Suspension de l avancement sauf si l agent exerce une activité professionnelle d au moins 600h/an."
  }
];
