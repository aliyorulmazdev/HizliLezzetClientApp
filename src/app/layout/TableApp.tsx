import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import TableComponent from '../Components/Table/TableComponent';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import RestaurantSection from '../Components/Restaurants/RestaurantSection';
import { useStore } from '../stores/store';


interface TableAppProps {
  tableClicked: boolean;
  handleTableClick: () => void;
}
function TableApp({ tableClicked, handleTableClick }: TableAppProps) {
  const { restaurantSectionStore } = useStore();
  return (
    <>
      {restaurantSectionStore.restaurantSections.map((section) => (
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
              content={`${section.tableKeyword}1`}
              onClick={handleTableClick}
            />
            <TableComponent
              variation="Reserved"
              content={`${section.tableKeyword}2`}
              onClick={handleTableClick}
            />
            <TableComponent
              variation="Maintenance"
              content={`${section.tableKeyword}3`}
              onClick={handleTableClick}
            />
            <TableComponent
              variation="Open"
              content={`${section.tableKeyword}4`}
              onClick={handleTableClick}
            />
            <TableComponent
              variation="Reserved"
              content={`${section.tableKeyword}5`}
              onClick={handleTableClick}
            />
            <TableComponent
              variation="Maintenance"
              content={`${section.tableKeyword}6`}
              onClick={handleTableClick}
            />
          </Box>
        </div>
      ))}
      {tableClicked && (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button as={Link} variant="contained" to={'/'}>
            Go Back to Home
          </Button>
        </Box>
      )}
    </>
  );
}

export default observer(TableApp);
