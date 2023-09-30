import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import "../styles/ProductCategoryComponentStyles.css";

const ProductCategoryComponent: React.FC = () => {
  const categories = [
    "Salads",
    "Snacks",
    "Coffees",
    "Burgers",
    "Meats",
    "Teas",
    "Soups",
    "Kebabs",
  ];
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  const scrollMenu = (direction: "left" | "right") => {
    const container = categoryContainerRef.current;
    if (!container) return;

    const itemWidth = 120; // Adjust the width as needed
    const containerWidth = container.clientWidth;

    if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else if (direction === "right" && startIndex < categories.length - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 30 && startIndex > 0) {
      scrollMenu("left");
      setStartX(0);
    } else if (deltaX < -30 && startIndex < categories.length - 4) {
      scrollMenu("right");
      setStartX(0);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          maxWidth: "80vw", // İhtiyaca göre ayarlayın
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setStartX(0)}
        ref={categoryContainerRef}
      >
        {/* Sol ok */}
        {startIndex > 0 && (
          <div className="category-arrow" onClick={() => scrollMenu("left")}>
            {"<"}
          </div>
        )}

        {categories.map((category, index) => (
          <Button
            key={category}
            variant="text"
            size="large"
            className="category-button"
          >
            {category}
          </Button>
        ))}

        {/* Sağ ok */}
        {startIndex < categories.length - 4 && (
          <div className="category-arrow" onClick={() => scrollMenu("right")}>
            {">"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryComponent;
