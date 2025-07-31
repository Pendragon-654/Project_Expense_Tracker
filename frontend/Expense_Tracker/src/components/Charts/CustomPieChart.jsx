import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data = [],
  label = "",
  totalAmount = "",
  colors = [],
  showTextAnchor = false,
}) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <div className="w-full h-[380px]">
      {isValidData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              innerRadius={100}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length] || "#ccc"}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            {showTextAnchor && (
              <>
                <text
                  x="50%"
                  y="50%"
                  dy={-25}
                  textAnchor="middle"
                  fill="#666"
                  fontSize="14px"
                >
                  {label}
                </text>
                <text
                  x="50%"
                  y="50%"
                  dy={8}
                  textAnchor="middle"
                  fill="#333"
                  fontSize="24px"
                  fontWeight="600"
                >
                  {totalAmount}
                </text>
              </>
            )}
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No data available to display
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
