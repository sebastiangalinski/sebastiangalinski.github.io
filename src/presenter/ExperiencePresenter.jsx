import { useState } from "react";
import { experiences } from "../model/ExperienceData.js";
import { ExperienceView } from "../view/ExperienceView.jsx";

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

function prepareExperienceTimeline() {
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

  return { firstMonth, months, years, timelineExperiences, laneCount };
}

export function ExperiencePresenter() {
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const timeline = prepareExperienceTimeline();
  const selectExperience = (experienceId) => {
    setActiveExperienceId((currentId) =>
      currentId === experienceId ? null : experienceId
    );
  };

  return (
    <ExperienceView
      {...timeline}
      activeExperienceId={activeExperienceId}
      onSelectExperience={selectExperience}
      monthFormatter={monthFormatter}
      selectedExperience={experiences.find((experience) => experience.id === activeExperienceId)}
    />
  );
}
