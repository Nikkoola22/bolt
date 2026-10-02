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
    try {
      localStorage.setItem("cfdt_current_profile", JSON.stringify(profil));
    } catch (e) {
      // ignore
    }
  }, [profil]);

  const { cadre } = findCadreAndGrade(profil.cadreEmploiId, profil.gradeId);
  const currentCategory = cadre?.categorie || "C";
  const targetCategory = currentCategory === "C" ? "B" : currentCategory === "B" ? "A" : "A";

  // Calcul automatique de l'ancienneté dans la catégorie arrêtée au 1er janvier 2027 (Session LDG-PI 2027)
  // Date issue de l'Étape 3 : Date d'entrée dans le cadre d'emplois / catégorie actuelle
  const categoryDate = profil.dateEntreeCadreEmploi || profil.dateNominationGradeActuel || profil.dateEntreeFonctionPublique;
  
  let seniorityYears = 0;
  let seniorityMonths = 0;
  if (categoryDate) {
    const parts = categoryDate.split("-").map(Number);
    if (parts.length >= 3 && !isNaN(parts[0])) {
      const [sYear, sMonth, sDay] = parts;
      let y = 2027 - sYear;
      let m = 0 - (sMonth - 1);
      let d = 1 - sDay;
      if (d < 0) m -= 1;
      if (m < 0) {
        y -= 1;
        m += 12;
      }
      seniorityYears = Math.max(0, Math.min(45, y));
      seniorityMonths = Math.max(0, Math.min(11, m));
    }
  }

  const basePrefix = typeof window !== "undefined"
    ? (window.location.pathname.endsWith("/")
        ? window.location.pathname
        : window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1))
    : "./";
  const iframeSrc = `${basePrefix}ldg/index.html?target=${targetCategory}&years=${seniorityYears}&months=${seniorityMonths}&startDate=${encodeURIComponent(categoryDate || "")}&way=choix`;

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
