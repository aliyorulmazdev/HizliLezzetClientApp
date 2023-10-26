import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import RestaurantCard from "../Components/Restaurants/RestaurantCard";

function RestaurantApp() {
  const sampleRestaurant = {
    id: "54f76ff5-8d91-4906-886c-0c59722dd6fa",
    restaurantOwnerId: "4f47fae7-c9f6-47fb-bf60-a7ec3704e3c0",
    title: "Restaurant 1",
    description: "Description 1",
    thumbnail: "Thumbnail1.jpg",
    latitude: 38.3411851,
    longitude: 27.3979725,
    phoneNumber: "555-555-55-51",
    email: "Restaurant1@example.com",
    address: "Address 1",
    workingStatus: "Working Status 1",
    isActive: false,
    dayOfWeek: "Day of Week 1",
    openingTime: "2023-09-30T09:54:47.9614971",
    closingTime: "2023-09-30T18:54:47.9615002",
    creationDate: "2023-09-30T04:54:47.9615004",
    lastModifiedDate: "2023-09-30T03:54:47.9615008",
    isActiveWeb: true,
    isActiveLocal: false,
    isActiveGetirYemek: true,
    isActiveYemekSepeti: false,
    isActiveMigrosYemek: true,
    isActiveTrendyolYemek: false,
  };
  const sampleRestaurant2 = {
    id: "54f76ff5-8d91-4906-886c-0c59722dd6fa",
    restaurantOwnerId: "4f47fae7-c9f6-47fb-bf60-a7ec3704e3c0",
    title: "Restaurant 2",
    description: "Description 1",
    thumbnail: "Thumbnail1.jpg",
    latitude: 37.5695262,
    longitude: 43.7336479,
    phoneNumber: "555-555-55-51",
    email: "Restaurant1@example.com",
    address: "Address 1",
    workingStatus: "Working Status 1",
    isActive: false,
    dayOfWeek: "Day of Week 1",
    openingTime: "2023-09-30T09:54:47.9614971",
    closingTime: "2023-09-30T18:54:47.9615002",
    creationDate: "2023-09-30T04:54:47.9615004",
    lastModifiedDate: "2023-09-30T03:54:47.9615008",
    isActiveWeb: true,
    isActiveLocal: false,
    isActiveGetirYemek: true,
    isActiveYemekSepeti: false,
    isActiveMigrosYemek: true,
    isActiveTrendyolYemek: false,
  };
  const sampleRestaurant3 = {
    id: "54f76ff5-8d91-4906-886c-0c59722dd6fa",
    restaurantOwnerId: "4f47fae7-c9f6-47fb-bf60-a7ec3704e3c0",
    title: "Restaurant 3",
    description: "Description 1",
    thumbnail: "Thumbnail1.jpg",
    latitude: 38.4184818,
    longitude: 27.128776,
    phoneNumber: "555-555-55-51",
    email: "Restaurant1@example.com",
    address: "Address 1",
    workingStatus: "Working Status 1",
    isActive: false,
    dayOfWeek: "Day of Week 1",
    openingTime: "2023-09-30T09:54:47.9614971",
    closingTime: "2023-09-30T18:54:47.9615002",
    creationDate: "2023-09-30T04:54:47.9615004",
    lastModifiedDate: "2023-09-30T03:54:47.9615008",
    isActiveWeb: true,
    isActiveLocal: false,
    isActiveGetirYemek: true,
    isActiveYemekSepeti: false,
    isActiveMigrosYemek: true,
    isActiveTrendyolYemek: false,
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="10px"
        flexWrap="wrap"
        gap="20px"
      >
        <RestaurantCard restaurant={sampleRestaurant} />
        <RestaurantCard restaurant={sampleRestaurant2} />
        <RestaurantCard restaurant={sampleRestaurant3} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button as={Link} variant="contained" to={"/"}>
          Go Back to Home
        </Button>
      </Box>
    </>
  );
}

export default observer(RestaurantApp);
