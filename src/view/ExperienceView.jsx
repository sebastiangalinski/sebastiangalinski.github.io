import { ExperienceDescriptionView } from "./ExperienceDescriptionView.jsx";

function typeClassName(type) {
  return `experience-type-${type.toLowerCase().replaceAll(" ", "-")}`;
}

function monthIndex(date) {
  const [year, month] = date.split("-").map(Number);
  return year * 12 + month - 1;
}

export function ExperienceView({
  firstMonth,
  months,
  years,
  timelineExperiences,
  laneCount,
  activeExperienceId,
  onSelectExperience,
  monthFormatter,
  selectedExperience
}) {
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
              className={`experience-item ${typeClassName(experience.type)}`}
              key={experience.id}
              type="button"
              aria-expanded={activeExperienceId === experience.id}
              aria-controls={`experience-description-${experience.id}`}
              onClick={() => onSelectExperience(experience.id)}
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
      <ExperienceDescriptionView experience={selectedExperience} />
    </section>
  );
}
