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
  const { restaurantSectionStore, restaurantTableStore } = useStore();

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
            {restaurantTableStore.getTablesBySectionId(section.id).map((table) => (
              <TableComponent
                key={table.id}
                variation={table.variation}
                content={`${table.title}`}
                onClick={handleTableClick}
              />
            ))}
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
