import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useStore } from "../stores/store"; // Store'a erişim için eklenen satır
import RestaurantCard from "../Components/Restaurants/RestaurantCard";

function RestaurantApp() {
  const { restaurantStore } = useStore(); // Store'dan restaurantStore'a erişim

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="10px"
        flexWrap="wrap"
        gap="20px"
      >
        {restaurantStore.restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
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
