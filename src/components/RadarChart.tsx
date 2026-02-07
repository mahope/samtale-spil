"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import type { CategoryCompletion } from "@/hooks/useAdvancedStats";

interface RadarChartProps {
  /** Category completion data */
  data: CategoryCompletion[];
  /** Chart size in pixels */
  size?: number;
  /** Show percentage labels */
  showLabels?: boolean;
  /** Animate on mount */
  animate?: boolean;
}

/**
 * Radar/Spider chart component for visualizing category completion.
 * Displays completion percentage for each category in a radial layout.
 */
export const RadarChart = memo(function RadarChart({
  data,
  size = 280,
  showLabels = true,
  animate = true,
}: RadarChartProps) {
  const center = size / 2;
  const maxRadius = size / 2 - 50; // Leave room for labels
  const levels = 5; // Number of concentric circles

  // Calculate positions for each category
  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length;
    
    return data.map((category, index) => {
      const angle = angleStep * index - Math.PI / 2; // Start from top
      const radius = (category.completionPercent / 100) * maxRadius;
      
      return {
        ...category,
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        labelX: center + (maxRadius + 25) * Math.cos(angle),
        labelY: center + (maxRadius + 25) * Math.sin(angle),
        angle,
      };
    });
  }, [data, center, maxRadius]);

  // Generate path for the filled area
  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    
    return points.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${path} ${command} ${point.x},${point.y}`;
    }, "") + " Z";
  }, [points]);

  // Generate grid lines (spokes)
  const gridLines = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length;
    
    return data.map((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      return {
        x1: center,
        y1: center,
        x2: center + maxRadius * Math.cos(angle),
        y2: center + maxRadius * Math.sin(angle),
      };
    });
  }, [data, center, maxRadius]);

  // Generate concentric level circles
  const levelCircles = useMemo(() => {
    return Array.from({ length: levels }, (_, i) => ({
      radius: (maxRadius / levels) * (i + 1),
      percentage: ((i + 1) / levels) * 100,
    }));
  }, [maxRadius, levels]);

  if (data.length < 3) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-500 text-sm">
        Ikke nok kategorier til radar-diagram
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
        <span aria-hidden="true">🎯</span>
        Kategori-fremgang
      </h3>

      <div className="flex justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label="Radar-diagram over kategori-fremgang"
        >
          {/* Background circles */}
          {levelCircles.map((level, index) => (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={level.radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-200 dark:text-slate-700"
              strokeDasharray="4 4"
            />
          ))}

          {/* Grid lines (spokes) */}
          {gridLines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-200 dark:text-slate-700"
            />
          ))}

          {/* Percentage labels on axes */}
          {levelCircles.map((level, index) => (
            <text
              key={index}
              x={center + 5}
              y={center - level.radius + 12}
              className="text-[9px] fill-slate-400 dark:fill-slate-500"
            >
              {level.percentage}%
            </text>
          ))}

          {/* Filled area */}
          <motion.path
            d={areaPath}
            fill="url(#radarGradient)"
            fillOpacity="0.3"
            stroke="url(#radarStroke)"
            strokeWidth="2"
            initial={animate ? { pathLength: 0, opacity: 0 } : {}}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Data points */}
          {points.map((point, index) => (
            <motion.circle
              key={point.categoryId}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="white"
              stroke="url(#radarStroke)"
              strokeWidth="2"
              initial={animate ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="drop-shadow-sm"
            />
          ))}

          {/* Category labels */}
          {showLabels && points.map((point) => {
            // Determine text anchor based on position
            const isRight = point.labelX > center + 10;
            const isLeft = point.labelX < center - 10;
            const textAnchor = isRight ? "start" : isLeft ? "end" : "middle";
            
            // Adjust y position for top/bottom labels
            const isTop = point.labelY < center - maxRadius / 2;
            const isBottom = point.labelY > center + maxRadius / 2;
            const dy = isTop ? "-0.5em" : isBottom ? "1em" : "0.3em";

            return (
              <g key={`label-${point.categoryId}`}>
                <text
                  x={point.labelX}
                  y={point.labelY}
                  textAnchor={textAnchor}
                  dy={dy}
                  className="text-xs fill-slate-600 dark:fill-slate-300 font-medium"
                >
                  <tspan>{point.emoji}</tspan>
                </text>
                <text
                  x={point.labelX}
                  y={point.labelY + 14}
                  textAnchor={textAnchor}
                  className="text-[10px] fill-slate-400 dark:fill-slate-500"
                >
                  {point.completionPercent}%
                </text>
              </g>
            );
          })}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Legend with category names */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {data.map((category) => (
          <motion.div
            key={category.categoryId}
            initial={animate ? { opacity: 0, y: 10 } : {}}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50"
          >
            <span className="text-base" aria-hidden="true">
              {category.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                {category.categoryName}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <motion.div
                    initial={animate ? { width: 0 } : {}}
                    animate={{ width: `${category.completionPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">
                  {category.answeredQuestions}/{category.totalQuestions}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <span className="font-medium text-violet-600 dark:text-violet-400">
            {data.filter((c) => c.completionPercent === 100).length}
          </span>
          <span>fuldførte kategorier</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-violet-600 dark:text-violet-400">
            {Math.round(data.reduce((sum, c) => sum + c.completionPercent, 0) / data.length)}%
          </span>
          <span>gennemsnitlig fremgang</span>
        </div>
      </div>
    </div>
  );
});

RadarChart.displayName = "RadarChart";

export default RadarChart;
