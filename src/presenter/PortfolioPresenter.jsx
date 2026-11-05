import { useState } from "react";
import { AboutMePresenter } from "./AboutMePresenter.jsx";
import { ExperiencePresenter } from "./ExperiencePresenter.jsx";
import { ProjectPresenter } from "./ProjectPresenter.jsx";

export function PortfolioPresenter() {
  const [activeTab, setActiveTab] = useState("about");
  const [tabDirection, setTabDirection] = useState("next");
  const tabOrder = ["about", "projects", "experience"];
  const selectTab = (tabId) => {
    setTabDirection(
      tabOrder.indexOf(tabId) < tabOrder.indexOf(activeTab) ? "previous" : "next"
    );
    setActiveTab(tabId);
  };

  return (
    <>
      <nav aria-label="Main navigation">
        <div className="nav-inner">
          {[
            ["about", "About me"],
            ["projects", "Projects"],
            ["experience", "Experience"]
          ].map(([tabId, label]) => (
            <button
              className={`nav-link ${activeTab === tabId ? "active" : ""}`}
              type="button"
              aria-selected={activeTab === tabId}
              key={tabId}
              onClick={() => selectTab(tabId)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
      <main className={`tab-window slide-${tabDirection}`} key={activeTab}>
        {activeTab === "projects" && <ProjectPresenter />}
        {activeTab === "experience" && <ExperiencePresenter />}
        {activeTab === "about" && <AboutMePresenter />}
      </main>
    </>
  );
}
