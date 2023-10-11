import React, { useState } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import Block from "react-color/lib/components/block/Block";
import { SliderPicker } from "react-color";
import { Card, Button, Dialog, DialogContent } from "@mui/material"; // MUI'den Dialog eklemeyi unutmayın!

const RGBColorSelector: React.FC = observer(() => {
  const { userSettingsStore } = useStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState<"background" | "title" | "description" | null>(null);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openColorSelector = (colorType: "background" | "title" | "description") => {
    setSelectedColorType(colorType);
  };

  const handleColorChange = (color: any) => {
    if (selectedColorType) {
      userSettingsStore.setProductCardColor(selectedColorType, color.hex);
    }
  };

  return (
    <Card>
      <Button variant="contained" onClick={openDialog} color='secondary'>
        Open Color Selector
      </Button>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogContent>
          <Button variant="outlined" onClick={() => openColorSelector("background")}>
            Change Background Color
          </Button>
          <Button variant="outlined" onClick={() => openColorSelector("title")}>
            Change Title Color
          </Button>
          <Button variant="outlined" onClick={() => openColorSelector("description")}>
            Change Description Color
          </Button>
          {selectedColorType && (
            <>
              <Block
                width="100%"
                color={
                  selectedColorType === "background"
                    ? userSettingsStore.productCardBackgroundColor
                    : selectedColorType === "title"
                    ? userSettingsStore.productCardTitleColor
                    : userSettingsStore.productCardDescriptionColor
                }
                onChange={(color: any) => {
                  handleColorChange(color);
                }}
              />
              <SliderPicker
                color={
                  selectedColorType === "background"
                    ? userSettingsStore.productCardBackgroundColor
                    : selectedColorType === "title"
                    ? userSettingsStore.productCardTitleColor
                    : userSettingsStore.productCardDescriptionColor
                }
                onChange={(color: any) => {
                  handleColorChange(color);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
});

export default RGBColorSelector;
