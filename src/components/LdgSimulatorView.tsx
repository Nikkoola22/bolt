import React, { useEffect } from "react";
import type { ProfilAgent } from "../types/career";
import { findCadreAndGrade } from "../services/simulationEngine";

interface LdgSimulatorViewProps {
  profil: ProfilAgent;
  onBackToModeSelection?: () => void;
  onSelectComplete?: () => void;
  onSelectSimplified?: () => void;
}

export const LdgSimulatorView: React.FC<LdgSimulatorViewProps> = ({
  profil,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const { cadre } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const currentCategory = cadre?.categorie || "C";
  const targetCategory = currentCategory === "C" ? "B" : currentCategory === "B" ? "A" : "A";

  const entryYear = profil.dateEntreeFonctionPublique ? parseInt(profil.dateEntreeFonctionPublique.split("-")[0], 10) : 2016;
  // Calcul de l'ancienneté arrêté au 1er janvier 2027 pour la session LDG-PI 2027
  const referenceYear = 2027;
  const seniorityYears = Math.min(45, Math.max(0, referenceYear - entryYear));

  const iframeSrc = `/ldg/index.html?target=${targetCategory}&years=${seniorityYears}&way=choix`;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Cadre de l'Iframe intégrée */}
      <div className="rounded-[2rem] overflow-hidden border-2 border-black/[0.08] dark:border-white/[0.12] shadow-2xl bg-white dark:bg-[#111114]">
        <iframe
          src={iframeSrc}
          title="Simulateur de points de promotion interne LDG-PI Ville de Gennevilliers"
          className="w-full h-[calc(100vh-100px)] min-h-[800px] border-0"
        />
      </div>
    </div>
  );
};
