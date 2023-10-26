import React from "react";
import { observer } from "mobx-react-lite"; // MobX ile observer'ı içe aktarın
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CardActionArea from "@mui/material/CardActionArea";
import RestaurantMap from "./RestaurantMap";
import { Restaurant } from "../../types/interfaces";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = observer(({ restaurant }) => {
  return (
    <div className="card-container">
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">{restaurant.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {restaurant.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: {restaurant.phoneNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {restaurant.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Address: {restaurant.address}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Working Status: {restaurant.workingStatus}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Opening Time: {restaurant.openingTime}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Closing Time: {restaurant.closingTime}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Day of Week: {restaurant.dayOfWeek}
            </Typography>
            <Chip label="Active" color="primary" variant="outlined" />
          </CardContent>
        </CardActionArea>
      </Card>

      <RestaurantMap
        longitude={restaurant.longitude}
        latitude={restaurant.latitude}
      />
    </div>
  );
});

export default RestaurantCard;
