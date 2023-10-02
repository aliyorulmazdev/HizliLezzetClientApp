import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import TableComponent from "../Components/Table/TableComponent";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

function TableApp() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="10px"
        flexWrap="wrap"
        gap="20px"
      >
        <TableComponent variation="Open" content="M1" />
        <TableComponent variation="Reserved" content="M2" />
        <TableComponent variation="Maintenance" content="M3" />
        <TableComponent variation="Open" content="M4" />
        <TableComponent variation="Reserved" content="M5" />
        <TableComponent variation="Maintenance" content="M6" />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button as={Link} variant="contained" to={'/'}>
          Go Back to Home
        </Button>
      </Box>
    </>
  );
}

export default observer(TableApp);
