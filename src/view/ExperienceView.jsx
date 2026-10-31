import { useState } from "react";
import { experiences } from "../model/ExperienceData.js";
import { ExperienceDescriptionView } from "./ExperienceDescriptionView.jsx";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function monthIndex(date) {
  const [year, month] = date.split("-").map(Number);
  return year * 12 + month - 1;
}

function currentMonthDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getEffectiveEndDate(endDate) {
  const currentDate = currentMonthDate();
  return endDate > currentDate ? currentDate : endDate;
}

function assignLanes(items) {
  const laneEndDates = [];

  return [...items]
    .sort((first, second) => monthIndex(first.startDate) - monthIndex(second.startDate))
    .map((experience) => {
      const lane = laneEndDates.findIndex(
        (laneEndDate) => laneEndDate < monthIndex(experience.startDate)
      );
      const laneIndex = lane === -1 ? laneEndDates.length : lane;
      laneEndDates[laneIndex] = monthIndex(experience.effectiveEndDate);
      return { ...experience, lane: laneIndex };
    });
}

export function ExperienceView() {
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const timelineData = experiences.map((experience) => ({
    ...experience,
    effectiveEndDate: getEffectiveEndDate(experience.endDate)
  }));
  const firstMonth = Math.min(...timelineData.map((experience) => monthIndex(experience.startDate)));
  const lastMonth = Math.max(...timelineData.map((experience) => monthIndex(experience.effectiveEndDate)));
  const months = Array.from({ length: lastMonth - firstMonth + 1 }, (_, index) => firstMonth + index);
  const years = months.reduce((yearGroups, month, index) => {
    const year = Math.floor(month / 12);
    const existingYear = yearGroups.find((group) => group.year === year);

    if (existingYear) {
      existingYear.monthCount += 1;
    } else {
      yearGroups.push({ year, start: index + 1, monthCount: 1 });
    }

    return yearGroups;
  }, []);
  const timelineExperiences = assignLanes(timelineData);
  const laneCount = Math.max(...timelineExperiences.map((experience) => experience.lane)) + 1;

  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <div className="experience-timeline" style={{ "--timeline-months": months.length, "--timeline-lanes": laneCount }}>
        <div className="experience-years" aria-hidden="true">
          {years.map((yearGroup) => (
            <span
              key={yearGroup.year}
              style={{
                "--year-start": yearGroup.start,
                "--year-span": yearGroup.monthCount
              }}
            >
              {yearGroup.year}
            </span>
          ))}
        </div>
        <div className="experience-axis" aria-hidden="true">
          {months.map((month) => {
            const date = new Date(Math.floor(month / 12), month % 12);
            return (
              <span key={month}>
                {monthFormatter.format(date)}
              </span>
            );
          })}
        </div>
        <div className="experience-grid">
          {timelineExperiences.map((experience) => (
            <button
              className="experience-item"
              key={experience.id}
              type="button"
              aria-expanded={activeExperienceId === experience.id}
              aria-controls={`experience-description-${experience.id}`}
              onClick={() =>
                setActiveExperienceId((currentId) =>
                  currentId === experience.id ? null : experience.id
                )
              }
              style={{
                "--experience-start": monthIndex(experience.startDate) - firstMonth + 1,
                "--experience-span": monthIndex(experience.effectiveEndDate) - monthIndex(experience.startDate) + 1,
                "--experience-lane": experience.lane + 1
              }}
            >
              <h3>{experience.title}</h3>
              <span className="experience-organization">{experience.organization}</span>
            </button>
          ))}
        </div>
      </div>
      <ExperienceDescriptionView
        experience={experiences.find((experience) => experience.id === activeExperienceId)}
      />
    </section>
  );
}
