# Simulateur « Parcours Agent » — Collectivité de Gennevilliers (FPT)

Outil pédagogique et interactif de projection de carrière statutaire et salariale pour les agents de la Fonction Publique Territoriale (FPT) de la Collectivité de Gennevilliers.

## 🏛️ Fonctionnalités clés

- **Gestion multi-statuts** :
  - **Fonctionnaires titulaires** : Avancements d'échelons garantis de plein droit (cadences uniques PPCR), avancements de grade (au choix / examen professionnel), promotion interne (listes d'aptitude C -> B -> A).
  - **Agents contractuels (CDD / CDI)** : Rémunération triennale indicative (Décret n° 88-145), simulation de réussite aux concours internes, stage probatoire légal de 12 mois (articles L327-1 et L327-9 du CGFP), titularisation automatique et déblocage de l'évolution de carrière PPCR.
- **Cadres d'emplois modélisés** :
  - Filière Administrative : Adjoints administratifs, Rédacteurs territoriaux, Attachés territoriaux.
  - Filière Technique : Adjoints techniques, Agents de maîtrise, Techniciens, Ingénieurs.
  - Filière Médico-sociale : ATSEM (Agents Territoriaux Spécialisés des Écoles Maternelles).
- **Frise chronologique interactive (« Ma carrière »)** :
  - Jalons avec dates pulsées / clignotantes.
  - Codes couleurs et fonds distincts selon la nature des étapes.
  - Calcul en temps réel des gains indiciaires (+points) et financiers (+€ bruts mensuels, valeur du point 4,92278 €).
- **Perspectives statutaires & Conditions (« Avancement / Promotion »)** :
  - Checklist détaillée des conditions d'ancienneté, services effectifs, examens et seuils d'échelons.
  - Cartes thématisées par couleur (au choix, examen pro, promotion interne, concours).
- **Simulateur d'événements de vie (« What-If »)** :
  - Temps partiel (maintien des droits à 100% pour l'avancement statutaire selon l'article L612-4 du CGFP),
  - Congé parental (maintien des droits la 1ère année),
  - Disponibilité pour convenances personnelles,
  - Examen professionnel & Concours.
- **Conception 100% responsive** :
  - Optimisé pour smartphones (360px-480px), tablettes et écrans larges.

## 🛠️ Stack technique

- **Framework** : React 19 + TypeScript
- **Bundler** : Vite 8
- **Styling** : Tailwind CSS v4
- **Icons** : Lucide React
- **Animation** : Canvas Confetti

## 🚀 Démarrage local

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Build de production
npm run build
```
