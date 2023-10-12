import React, { useState } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import Block from "react-color/lib/components/block/Block";
import { SliderPicker } from "react-color";
import {
  Card,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import ProductCard from "../Menu/ProductCard";

const RGBColorSelector: React.FC = observer(() => {
  const { userSettingsStore,productStore } = useStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState<
    "background" | "title" | "description" | null
  >();
  const [isBlockVisible, setBlockVisible] = useState(false);
  const [isSliderVisible, setSliderVisible] = useState(false);
  const [borderRadius, setBorderRadius] = useState(
    userSettingsStore.productCardBorderRadius
  );
  const [photoHeight, setPhotoHeight] = useState(
    userSettingsStore.productCardPhotoHeight
  );

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedColorType(null);
    setBlockVisible(false);
    setSliderVisible(false);
  };

  const openColorSelector = (
    colorType: "background" | "title" | "description"
  ) => {
    setSelectedColorType(colorType);
    setBlockVisible(true);
    setSliderVisible(true);
  };

  const handleColorChange = (color: any) => {
    if (selectedColorType) {
      userSettingsStore.setProductCardColor(selectedColorType, color.hex);
    }
  };

  const handleBorderRadiusChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setBorderRadius(newValue as number);
    userSettingsStore.setProductCardBorderRadius(newValue as number);
  };

  const handlePhotoHeightChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPhotoHeight(newValue as number);
    userSettingsStore.setProductCardPhotoHeight(newValue as number);
  };

  const closeColorSelector = () => {
    setBlockVisible(false);
    setSliderVisible(false);
  };

  return (
    <Card>
      <Button variant="contained" onClick={openDialog} color="secondary">
      Restaurant Settings
      </Button>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {selectedColorType && isBlockVisible && isSliderVisible && (
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
                  <Button
                    variant="contained"
                    onClick={closeColorSelector}
                    sx={{
                      marginTop: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  >
                    Apply
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
            <Grid container justifyContent="center" sx={{ gap: "15px", marginBottom:'25px'}} alignItems="center">
                    <Grid item>
                      <ProductCard product={productStore.products[0]} />
                    </Grid>
              </Grid>
              {!isBlockVisible &&
                !isSliderVisible &&
                ["background", "title", "description"].map((colorType) => (
                  <div
                    key={colorType}
                    onClick={() => openColorSelector(colorType as any)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="body1" component="span">
                      {colorType.toUpperCase()} COLOR:
                    </Typography>

                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "15px",
                        marginLeft: "auto",
                        backgroundColor:
                          colorType === "background"
                            ? userSettingsStore.productCardBackgroundColor
                            : colorType === "title"
                            ? userSettingsStore.productCardTitleColor
                            : userSettingsStore.productCardDescriptionColor,
                        cursor: "pointer",
                        border: "1px solid #000",
                      }}
                    />
                  </div>
                ))}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" component="span">
                  BORDER RADIUS
                </Typography>
                <Slider
                  value={borderRadius}
                  min={0}
                  max={100}
                  onChange={(_, newValue) =>
                    handleBorderRadiusChange(_, newValue as number)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => value.toString()}
                  style={{ marginLeft: "10px", width: "100px" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" component="span">
                  PHOTO HEIGHT
                </Typography>
                <Slider
                  value={photoHeight}
                  min={90}
                  max={200}
                  onChange={(_, newValue) =>
                    handlePhotoHeightChange(_, newValue as number)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => value.toString()}
                  style={{ marginLeft: "19px", width: "100px" }}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
});

export default RGBColorSelector;
