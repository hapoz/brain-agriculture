interface ChartData {
  [key: string]: string | number;
}

interface FarmChartProps {
  data: ChartData[];
  type: "pie";
  colors: string[];
}

export default function FarmChart({ data, type, colors }: FarmChartProps) {
  if (type === "pie") {
    return <PieChart data={data} colors={colors} />;
  }

  return null;
}

function PieChart({ data, colors }: { data: ChartData[]; colors: string[] }) {
  const total = data.reduce((sum, item) => {
    const value = typeof item.count !== "undefined"
      ? item.count
      : item.hectares;
    return sum + (value as number);
  }, 0);

  let currentAngle = 0;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const getPercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div class="flex flex-col items-center">
      <svg width="200" height="200" class="mb-4">
        {data.map((item, index) => {
          const value = typeof item.count !== "undefined"
            ? item.count
            : item.hectares;
          const percentage = (value as number) / total;
          const angle = percentage * 2 * Math.PI;
          const endAngle = currentAngle + angle;

          const x1 = centerX + radius * Math.cos(currentAngle);
          const y1 = centerY + radius * Math.sin(currentAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);

          const largeArcFlag = angle > Math.PI ? 1 : 0;

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ");

          const slice = (
            <path
              key={index}
              d={pathData}
              fill={colors[index % colors.length]}
              stroke="white"
              strokeWidth="2"
            />
          );

          currentAngle = endAngle;
          return slice;
        })}
      </svg>

      <div class="space-y-2 w-full">
        {data.map((item, index) => {
          const value = typeof item.count !== "undefined"
            ? item.count
            : item.hectares;
          const label = typeof item.state !== "undefined"
            ? item.state
            : typeof item.crop !== "undefined"
            ? item.crop
            : typeof item.type !== "undefined"
            ? item.type
            : "";

          return (
            <div key={index} class="flex items-center justify-between text-sm">
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                </div>
                <span class="text-gray-700">{label}</span>
              </div>
              <div class="text-right">
                <div class="font-medium text-gray-900">
                  {formatNumber(value as number)}
                  {typeof item.count !== "undefined" ? "" : " ha"}
                </div>
                <div class="text-gray-500 text-xs">
                  {getPercentage(value as number)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
