import React from "react";
import { observer } from "mobx-react-lite"; // MobX ile observer'ı içe aktarın
import Chip from "@mui/material/Chip";
import { RestaurantSection } from "../../types/interfaces";
import { Divider } from "@mui/material";

interface RestaurantSectionProps {
  restaurantSection: RestaurantSection;
}

const RestaurantSection: React.FC<RestaurantSectionProps> = observer(
  ({ restaurantSection }) => {
    return (
      <div className="restaurant-section">
        <Divider>
          <Chip label={restaurantSection.title} />
        </Divider>
      </div>
    );
  }
);

export default RestaurantSection;
