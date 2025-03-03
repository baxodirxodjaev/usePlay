import { useState } from "react";
import Star from "./Star";


const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};


interface RatingProps {
    maxRating?: number | undefined;
    color?: string | undefined;
    size?: number | undefined;
    className?: string | undefined;
    messages?: never[] | undefined;
    defaultRating?: number | undefined;
    onSetRating: (rate : number) => void;
}

 const Star_Rate =({
  maxRating = 5,
  color = "#fcc419",
  size = 5,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
} : RatingProps)=> {

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating : number) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            // size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

export default Star_Rate;


