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

function prepareExperienceTimeline(selectedYear) {
  const timelineData = experiences.map((experience) => ({
    ...experience,
    effectiveEndDate: getEffectiveEndDate(experience.endDate)
  }));
  const availableYears = [...new Set(
    timelineData.flatMap((experience) => {
      const startYear = Number(experience.startDate.slice(0, 4));
      const endYear = Number(experience.effectiveEndDate.slice(0, 4));
      return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
    })
  )].sort((first, second) => second - first);
  const firstMonth = selectedYear * 12;
  const months = Array.from({ length: 12 }, (_, index) => firstMonth + index);
  const yearStart = `${selectedYear}-01`;
  const yearEnd = `${selectedYear}-12`;
  const yearExperiences = timelineData
    .filter((experience) => experience.startDate <= yearEnd && experience.effectiveEndDate >= yearStart)
    .map((experience) => ({
      ...experience,
      startDate: experience.startDate < yearStart ? yearStart : experience.startDate,
      effectiveEndDate: experience.effectiveEndDate > yearEnd ? yearEnd : experience.effectiveEndDate
    }));
  const timelineExperiences = assignLanes(yearExperiences);
  const laneCount = Math.max(...timelineExperiences.map((experience) => experience.lane)) + 1;

  return { firstMonth, months, availableYears, timelineExperiences, laneCount };
}

export function ExperiencePresenter() {
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const availableYears = prepareExperienceTimeline(
    Math.max(...experiences.map((experience) => Number(experience.endDate.slice(0, 4))))
  ).availableYears;
  const [activeYear, setActiveYear] = useState(availableYears[0]);
  const [yearDirection, setYearDirection] = useState("next");
  const yearTimelines = Object.fromEntries(
    availableYears.map((year) => [year, prepareExperienceTimeline(year)])
  );
  const timeline = yearTimelines[activeYear];
  const selectExperience = (experienceId) => {
    setActiveExperienceId((currentId) =>
      currentId === experienceId ? null : experienceId
    );
  };
  const selectYear = (year) => {
    setYearDirection(year < activeYear ? "previous" : "next");
    setActiveYear(year);
  };

  return (
    <ExperienceView
      {...timeline}
      activeYear={activeYear}
      yearDirection={yearDirection}
      yearTimelines={yearTimelines}
      onSelectYear={selectYear}
      activeExperienceId={activeExperienceId}
      onSelectExperience={selectExperience}
      monthFormatter={monthFormatter}
      selectedExperience={experiences.find((experience) => experience.id === activeExperienceId)}
    />
  );
}
