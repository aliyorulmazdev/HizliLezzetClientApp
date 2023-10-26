import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import TableComponent from "../Components/Table/TableComponent";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import RestaurantSection from "../Components/Restaurants/RestaurantSection";

const restaurantSections = [
  {
    id: "0",
    restaurantId: "1",
    tableKeyword: "B",
    title: "Bahçe",
    thumbnail: "thumbnail1.jpg",
  },
  {
    id: "1",
    restaurantId: "1",
    tableKeyword: "T",
    title: "Teras",
    thumbnail: "thumbnail2.jpg",
  },
  {
    id: "2",
    restaurantId: "1",
    tableKeyword: "H",
    title: "Havuz",
    thumbnail: "thumbnail3.jpg",
  },
];

function TableApp() {
  return (
    <>
      {restaurantSections.map((section) => (
        <div key={section.id}>
          <Box marginTop="20px">
            <RestaurantSection restaurantSection={section} />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            marginTop="10px"
            flexWrap="wrap"
            gap="20px"
          >
            <TableComponent
              variation="Open"
              content={`${section.tableKeyword}1`} // content'i M + tableKeyword olarak ayarlıyoruz
            />
            <TableComponent
              variation="Reserved"
              content={`${section.tableKeyword}2`}
            />
            <TableComponent
              variation="Maintenance"
              content={`${section.tableKeyword}3`}
            />
            <TableComponent
              variation="Open"
              content={`${section.tableKeyword}4`}
            />
            <TableComponent
              variation="Reserved"
              content={`${section.tableKeyword}5`}
            />
            <TableComponent
              variation="Maintenance"
              content={`${section.tableKeyword}6`}
            />
          </Box>
        </div>
      ))}
       <Box display="flex" justifyContent="center" marginTop="20px">
        <Button as={Link} variant="contained" to={"/"}>
          Go Back to Home
        </Button>
      </Box>
    </>
  );
}

export default observer(TableApp);
