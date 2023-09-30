import { useState } from 'react';
import { Stepper, Step, StepLabel, Paper } from '@mui/material';

function StepperComponent() {
  const [activeStep] = useState(0);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel style={{ padding: '0' }}>
        <Step style={{ flex: '1' }}>
          <StepLabel>Select Product</StepLabel>
        </Step>
        <Step style={{ flex: '1' }}>
          <StepLabel>Manage Product/Add Order</StepLabel>
        </Step>
        <Step style={{ flex: '1' }}>
          <StepLabel>Happy Eating</StepLabel>
        </Step>
      </Stepper>
    </Paper>
  );
}

export default StepperComponent;
