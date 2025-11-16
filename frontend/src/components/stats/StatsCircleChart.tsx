import { ICONS } from "@/constants/icons";
import type { StatsProps } from "@/types/interfaces";
import { memo } from "react";
import { Pie, PieChart } from "recharts";

interface StatsCircleChartProps {
  stats: StatsProps | null;
  isAnimationActive?: boolean;
}

const StatsCircleChart = ({
  stats,
  isAnimationActive = true,
}: StatsCircleChartProps) => {
  if (!stats) return <div className="text-lg">Нет данных для отображения</div>;

  const data = [
    {
      name: "Одобрено",
      value: Math.floor(stats.decisions.approved),
      fill: "#1faf67",
    },
    {
      name: "Отклонено",
      value: Math.floor(stats.decisions.rejected),
      fill: "#ce442c",
    },
    {
      name: "На доработку",
      value: Math.floor(stats.decisions.requestChanges),
      fill: "#ceb62c",
    },
  ];

  const filteredData = data.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return <div className="text-lg">Нет данных для отображения</div>;
  }

  return (
    <div className="sm:w-1/2 flex flex-col items-center gap-2 w-full h-64 min-w-0 max-sm:mb-16">
      <div className="flex gap-3 items-center">
        <img src={ICONS.descision} className="w-6" alt="descision" />
        <div className="sm:text-lg font-medium mb-0.5">
          Распределение решений
        </div>
      </div>

      <PieChart
        width={300}
        height={300}
        style={{
          width: "100%",
          maxWidth: "80%",
          maxHeight: "80%",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={filteredData}
          innerRadius="80%"
          outerRadius="100%"
          cornerRadius="50%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          isAnimationActive={isAnimationActive}
        />
      </PieChart>

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {filteredData.map((value) => (
          <div key={value.name} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded bg-[${value.fill}]`} />
            <span className="text-sm">
              {value.name}: {value.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(StatsCircleChart);
