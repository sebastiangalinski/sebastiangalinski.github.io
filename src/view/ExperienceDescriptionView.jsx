export function ExperienceDescriptionView({ experience }) {
  if (!experience) {
    return null;
  }

  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
  const displayedEndDate = experience.endDate > currentMonth ? "Current" : experience.endDate;

  return (
    <article className="experience-description-view" id={`experience-description-${experience.id}`}>
      <h3>{experience.title}</h3>
      <p className="experience-organization">{experience.organization}</p>
      <p className="experience-period">{experience.startDate} - {displayedEndDate}</p>
      <p>{experience.description}</p>
    </article>
  );
}
