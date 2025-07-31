import React from 'react'
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName = "", width = "w-12", height = "h-12", className = "" }) => (
  <div
    className={`${width} ${height} ${className} flex items-center justify-center rounded-full bg-gray-100 text-gray-900 font-medium`}
  >
    {getInitials(fullName)}
  </div>
);


export default CharAvatar;