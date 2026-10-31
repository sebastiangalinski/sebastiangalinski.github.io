import { useState } from "react";
import { AboutMePresenter } from "./AboutMePresenter.jsx";
import { ExperiencePresenter } from "./ExperiencePresenter.jsx";
import { ProjectPresenter } from "./ProjectPresenter.jsx";

export function PortfolioPresenter() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <>
      <nav aria-label="Main navigation">
        <div className="nav-inner">
          {[
            ["projects", "Projects"],
            ["experience", "Experience"],
            ["about", "About Me"]
          ].map(([tabId, label]) => (
            <button
              className={`nav-link ${activeTab === tabId ? "active" : ""}`}
              type="button"
              aria-selected={activeTab === tabId}
              key={tabId}
              onClick={() => setActiveTab(tabId)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
      <main>
        {activeTab === "projects" && <ProjectPresenter />}
        {activeTab === "experience" && <ExperiencePresenter />}
        {activeTab === "about" && <AboutMePresenter />}
      </main>
    </>
  );
}
