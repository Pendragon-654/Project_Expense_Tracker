import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data || []);
    setChartData(result);
    return () => {};
  }, [data]);


  console.log("Prepared chart data:", chartData);


  return (
    <div className="card col-span-1 min-h-[200px]">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg font-semibold">Last 30 Days Expenses</h5>
      </div>

      {chartData && chartData.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          No expense data available for the last 30 days.
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;
