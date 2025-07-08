import React from 'react';
import { StarIcon } from '../constants';

const StarRating = ({ rating, maxStars = 5, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            // Applying direct hexadecimal colors
            className={`w-5 h-5 ${starValue <= rating ? 'text-[#fbbf24]' : 'text-[#cbd5e1]'}`}
            filled={starValue <= rating}
          />
        );
      })}
    </div>
  );
};

export default StarRating;