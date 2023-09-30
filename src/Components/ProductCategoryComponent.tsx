import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ProductCategoryComponent: React.FC = () => {
  const categories = ['Salads', 'Snacks', 'Coffees', 'Burgers', 'Meats', 'Teas', 'Soups', 'Kebabs'];
  const [startIndex, setStartIndex] = useState(0);

  const showCategories = categories.slice(startIndex, startIndex + 4);

  const scrollMenu = (direction: 'left' | 'right') => {
    if (direction === 'left' && startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    } else if (direction === 'right' && startIndex < categories.length - 4) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton onClick={() => scrollMenu('left')} size="large" disabled={startIndex === 0}>
          <ArrowLeftIcon fontSize="large" />
        </IconButton>
        <ButtonGroup variant="text" style={{ minWidth: '120px' }}>
          {showCategories.map((category) => (
            <Button
              key={category}
              variant="text"
              size="large"
              style={{ width: '100%' }}
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
        <IconButton
          onClick={() => scrollMenu('right')}
          size="large"
          disabled={startIndex === categories.length - 4}
        >
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCategoryComponent;
