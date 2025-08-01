import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  console.log("ExpenseTransactions props:", transactions);

  return (
    <div className="card min-h-[200px]">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 4).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('Do MMM YYYY')}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No recent expense transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
