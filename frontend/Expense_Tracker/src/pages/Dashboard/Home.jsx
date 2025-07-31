import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeperator } from "../../utils/helper";

import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "./FinanceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import RecentIncomewithChart from "./RecentIncomewithChart";
import RecentIncome from "./RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

useEffect(() => {
  console.log("Dashboard Data:", dashboardData);
}, [dashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {dashboardData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandSeperator(dashboardData.totalBalance)}
                color="bg-primary"
              />

              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value={addThousandSeperator(dashboardData.totalIncome)}
                color="bg-orange-500"
              />

              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addThousandSeperator(dashboardData.totalExpense)}
                color="bg-red-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentTransactions
                transactions={dashboardData.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />

              <FinanceOverview
                totalBalance={dashboardData.totalBalance}
                totalIncome={dashboardData.totalIncome}
                totalExpense={dashboardData.totalExpense}
              />

              <ExpenseTransactions
                transactions={
                  dashboardData.Last30DaysExpenses?.transactions || []
                }
                onSeeMore={() => navigate("/expense")}
              />

              <Last30DaysExpenses
                data={dashboardData.Last30DaysExpenses?.transactions || []}
              />

              <RecentIncomewithChart
                data={
                  dashboardData.last60DaysIncome?.transactions?.slice(0, 4) || []
                }
                totalIncome={dashboardData.totalIncome}
              />

              <RecentIncome
                transactions={
                  dashboardData.last60DaysIncome?.transactions || []
                }
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </>
        ) : (
          <p className="text-center mt-10">Loading dashboard data...</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
