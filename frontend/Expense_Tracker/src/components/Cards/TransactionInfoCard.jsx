import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-50 text-green-500"
      : "bg-red-50 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      {/* Icon Display */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full overflow-hidden">
        {icon ? (
          <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Text and Amount */}
      <div className="flex-1 flex items-center justify-between min-w-0">
        {/* Title and Date */}
        <div className="flex flex-col min-w-0">
          <p
            className="text-sm text-gray-700 font-medium truncate max-w-[200px] overflow-hidden whitespace-nowrap"
            title={title}
          >
            {title}
          </p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        {/* Amount & Delete Button */}
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ₹{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
