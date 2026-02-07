"use client";

import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ActivityEntry } from "@/hooks/useAdvancedStats";

interface StatsHeatMapProps {
  /** Activity data for the last 365 days */
  data: ActivityEntry[];
  /** Function to get activity level (0-4) from question count */
  getActivityLevel: (count: number) => number;
  /** Stats summary */
  stats?: {
    activeDays: number;
    totalQuestions: number;
    currentStreak: number;
    longestStreak: number;
  };
}

// Danish day abbreviations
const DAYS = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

// Danish month abbreviations
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

// Color scale for activity levels (GitHub style)
const COLORS = {
  light: [
    "bg-slate-100 dark:bg-slate-800", // 0 - no activity
    "bg-violet-200 dark:bg-violet-900", // 1 - light
    "bg-violet-400 dark:bg-violet-700", // 2 - medium
    "bg-violet-600 dark:bg-violet-500", // 3 - high
    "bg-violet-800 dark:bg-violet-400", // 4 - very high
  ],
};

interface TooltipData {
  date: string;
  count: number;
  x: number;
  y: number;
}

const HeatMapCell = memo(function HeatMapCell({
  entry,
  level,
  onHover,
  onLeave,
}: {
  entry: ActivityEntry;
  level: number;
  onHover: (data: TooltipData, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onHover(
      {
        date: entry.date,
        count: entry.questionsAnswered,
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
      e
    );
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] ${COLORS.light[level]} cursor-pointer transition-transform hover:scale-125 hover:ring-2 hover:ring-violet-400 dark:hover:ring-violet-500`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      role="gridcell"
      aria-label={`${entry.date}: ${entry.questionsAnswered} spørgsmål`}
    />
  );
});

HeatMapCell.displayName = "HeatMapCell";

export const StatsHeatMap = memo(function StatsHeatMap({
  data,
  getActivityLevel,
  stats,
}: StatsHeatMapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Organize data into weeks for the grid
  const weeks = useMemo(() => {
    const result: ActivityEntry[][] = [];
    let currentWeek: ActivityEntry[] = [];
    
    // Get the last 365 days, starting from the most recent
    const recentData = data.slice(-365);
    
    // Find the starting day of the week for the first entry
    const firstDate = new Date(recentData[0]?.date || new Date());
    const startDayOfWeek = firstDate.getDay(); // 0 = Sunday
    
    // Adjust for Monday start (European standard)
    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    // Add empty cells for days before the first entry
    for (let i = 0; i < adjustedStartDay; i++) {
      currentWeek.push({
        date: "",
        questionsAnswered: 0,
        favoritesSaved: 0,
        categoriesPlayed: [],
        totalTimeMs: 0,
      });
    }
    
    recentData.forEach((entry) => {
      currentWeek.push(entry);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Add remaining days
    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }
    
    return result;
  }, [data]);

  // Get month labels for the header
  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find((d) => d.date);
      if (firstValidDay) {
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ month: MONTHS[month], weekIndex });
          lastMonth = month;
        }
      }
    });
    
    return labels;
  }, [weeks]);

  const handleHover = (data: TooltipData) => {
    setTooltip(data);
  };

  const handleLeave = () => {
    setTooltip(null);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      {/* Header with stats */}
      {stats && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span aria-hidden="true">📅</span>
            Aktivitetskalender
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>
              <strong className="text-violet-600 dark:text-violet-400">{stats.activeDays}</strong> aktive dage
            </span>
            <span>
              <strong className="text-violet-600 dark:text-violet-400">{stats.totalQuestions}</strong> spørgsmål
            </span>
          </div>
        </div>
      )}

      {/* Month labels */}
      <div className="flex mb-1 ml-8 sm:ml-10 overflow-hidden">
        {monthLabels.map((label, index) => (
          <div
            key={`${label.month}-${index}`}
            className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500"
            style={{
              marginLeft: index === 0 ? 0 : `${(label.weekIndex - (monthLabels[index - 1]?.weekIndex || 0)) * 14 - 20}px`,
            }}
          >
            {label.month}
          </div>
        ))}
      </div>

      {/* Grid with day labels */}
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col justify-between py-0.5 mr-1 sm:mr-2">
          {DAYS.map((day, index) => (
            <span
              key={day}
              className={`text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 h-2.5 sm:h-3 flex items-center ${
                index % 2 === 0 ? "" : "invisible sm:visible"
              }`}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div 
          className="flex gap-[2px] overflow-x-auto pb-2"
          role="grid"
          aria-label="Aktivitetskalender - sidste 365 dage"
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]" role="row">
              {week.map((entry, dayIndex) => (
                entry.date ? (
                  <HeatMapCell
                    key={entry.date}
                    entry={entry}
                    level={getActivityLevel(entry.questionsAnswered)}
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
                ) : (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                    role="gridcell"
                    aria-hidden="true"
                  />
                )
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
        <span>Mindre</span>
        {COLORS.light.map((color, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] ${color}`}
            aria-label={`Niveau ${index}`}
          />
        ))}
        <span>Mere</span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y - 45,
              transform: "translateX(-50%)",
            }}
          >
            <p className="font-medium">{formatDate(tooltip.date)}</p>
            <p className="text-slate-300 dark:text-slate-200">
              {tooltip.count === 0
                ? "Ingen aktivitet"
                : `${tooltip.count} ${tooltip.count === 1 ? "spørgsmål" : "spørgsmål"}`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak badges */}
      {stats && (stats.currentStreak > 0 || stats.longestStreak > 0) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          {stats.currentStreak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full text-white text-xs font-medium shadow-sm"
            >
              <span aria-hidden="true">🔥</span>
              <span>{stats.currentStreak} dages streak</span>
            </motion.div>
          )}
          {stats.longestStreak > stats.currentStreak && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-xs font-medium shadow-sm"
            >
              <span aria-hidden="true">🏆</span>
              <span>Rekord: {stats.longestStreak} dage</span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
});

StatsHeatMap.displayName = "StatsHeatMap";

export default StatsHeatMap;
