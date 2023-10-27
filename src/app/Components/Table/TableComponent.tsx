import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TypographyVariant } from '@mui/material';
import { observer } from 'mobx-react-lite';

export interface TableComponentProps {
  variation: 'Reserved' | 'Open' | 'Maintenance';
  content: string;
  onClick: () => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ variation, content, onClick }) => {
  let backgroundColor = '';
  let bottomText = '';
  let bottomBackgroundColor = '';
  let textVariant: TypographyVariant = 'subtitle1';

  switch (variation) {
    case 'Reserved':
      backgroundColor = '#FFE6B6';
      bottomText = 'Reserved';
      bottomBackgroundColor = '#FF8A00';
      break;
    case 'Open':
      backgroundColor = '#C0FFA3';
      bottomText = '$50';
      bottomBackgroundColor = '#365EFE';
      break;
    case 'Maintenance':
      backgroundColor = '#FFB6B6';
      bottomText = 'Maintenance';
      bottomBackgroundColor = 'black';
      break;
    default:
      backgroundColor = 'white';
      bottomText = 'Unknown';
      bottomBackgroundColor = 'lightgray';
  }

  const cardStyle = {
    backgroundColor,
    borderRadius: '15px',
    width: '100px',
    height: '100px',
  };

  const bottomTextStyle = {
    backgroundColor: bottomBackgroundColor,
    color: 'white',
    textAlign: 'center' as 'center',
    fontWeight: 'bold',
  };

  return (
    <Card className="table-card" sx={cardStyle} onClick={onClick}>
      <CardContent>
        <Typography variant="h4" component="div" sx={{ textAlign: 'center', color: '#474747' }}>
          {content}
        </Typography>
      </CardContent>
      <div className="bottom-content" style={bottomTextStyle as React.CSSProperties}>
        <Typography variant={textVariant} color="text.secondary" sx={{ textAlign: 'center', color: 'white' }}>
          {variation === 'Open' ? '$50' : bottomText}
        </Typography>
      </div>
    </Card>
  );
}

export default observer(TableComponent);
