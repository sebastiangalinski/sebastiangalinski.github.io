import { useRef, useState } from "react";
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
  availableYears,
  activeYear,
  yearDirection,
  yearTimelines,
  onSelectYear,
  timelineExperiences,
  laneCount,
  activeExperienceId,
  onSelectExperience,
  monthFormatter,
  selectedExperience
}) {
  const timelineRef = useRef(null);
  const [previewYear, setPreviewYear] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ active: false, startX: 0 });
  const handlePointerDown = (event) => {
    if (event.target.closest("button")) {
      return;
    }
    event.preventDefault();
    dragState.current = {
      active: true,
      startX: event.clientX
    };
    setIsDragging(true);
    setDragOffset(0);
    setPreviewYear(null);
    timelineRef.current.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event) => {
    if (!dragState.current.active) {
      return;
    }
    const distance = event.clientX - dragState.current.startX;
    setDragOffset(distance);
    const currentYearIndex = availableYears.indexOf(activeYear);
    const previewIndex = distance < 0
      ? currentYearIndex + 1
      : distance > 0
        ? currentYearIndex - 1
        : currentYearIndex;
    setPreviewYear(availableYears[previewIndex] ?? null);
  };
  const stopDragging = (event) => {
    if (!dragState.current.active) {
      return;
    }
    const distance = event.clientX - dragState.current.startX;
    const currentYearIndex = availableYears.indexOf(activeYear);
    const threshold = timelineRef.current.clientWidth * .25;
    const change = distance < -threshold ? 1 : distance > threshold ? -1 : 0;
    const nextYearIndex = Math.max(
      0,
      Math.min(availableYears.length - 1, currentYearIndex + change)
    );
    onSelectYear(availableYears[nextYearIndex]);
    dragState.current.active = false;
    setIsDragging(false);
    setDragOffset(0);
    setPreviewYear(null);
  };
  const cancelDragging = () => {
    dragState.current.active = false;
    setIsDragging(false);
    setDragOffset(0);
    setPreviewYear(null);
  };
  const preventNativeDrag = (event) => {
    event.preventDefault();
  };
  const currentYearIndex = availableYears.indexOf(activeYear);

  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <div className="experience-year-selector" aria-label="Experience years">
        {availableYears.map((year) => (
          <button
            className={`experience-year-button ${activeYear === year ? "active" : ""}`}
            key={year}
            type="button"
            aria-pressed={activeYear === year}
            onClick={() => onSelectYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <div
        className="experience-timeline"
        ref={timelineRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={cancelDragging}
        onDragStart={preventNativeDrag}
        style={{
          "--timeline-months": months.length,
          "--timeline-lanes": laneCount,
          "--timeline-years": availableYears.length
        }}
      >
        {previewYear !== null && (
          <span className="experience-year-preview" aria-live="polite">
            {previewYear}
          </span>
        )}
        <div
          className="experience-window-track"
          style={{
            transform: `translateX(calc(-${currentYearIndex * (100 / availableYears.length)}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : undefined
          }}
        >
          {availableYears.map((year) => {
            const yearTimeline = yearTimelines[year];
            return (
              <div className="experience-window" key={year ?? "empty"}>
                {yearTimeline && (
                  <>
                    <div className="experience-axis" aria-hidden="true">
                      {yearTimeline.months.map((month) => {
                        const date = new Date(Math.floor(month / 12), month % 12);
                        return <span key={month}>{monthFormatter.format(date)}</span>;
                      })}
                    </div>
                    <div className="experience-grid">
                      {yearTimeline.timelineExperiences.map((experience) => (
                        <button
                          className={`experience-item ${typeClassName(experience.type)}`}
                          key={experience.id}
                          type="button"
                          aria-expanded={activeExperienceId === experience.id}
                          aria-controls={`experience-description-${experience.id}`}
                          onClick={() => onSelectExperience(experience.id)}
                          style={{
                            "--experience-start": monthIndex(experience.startDate) - yearTimeline.firstMonth + 1,
                            "--experience-span": monthIndex(experience.effectiveEndDate) - monthIndex(experience.startDate) + 1,
                            "--experience-lane": experience.lane + 1
                          }}
                        >
                          <h3>{experience.title}</h3>
                          <span className="experience-organization">{experience.organization}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ExperienceDescriptionView experience={selectedExperience} />
    </section>
  );
}
