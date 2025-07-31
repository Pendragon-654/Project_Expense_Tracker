import React, { useEffect, useState } from 'react';
import CustomPieChart from '../../components/Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomewithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = Array.isArray(data)
      ? data
          .filter(item => item?.amount && item?.source)
          .map(item => ({
            name: item.source,
            amount: item.amount,
          }))
      : [];

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 days Income</h5>
      </div>

      {chartData.length > 0 ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      ) : (
        <p className="text-center mt-4 text-sm text-gray-500">No income data available</p>
      )}
    </div>
  );
};

export default RecentIncomewithChart;
