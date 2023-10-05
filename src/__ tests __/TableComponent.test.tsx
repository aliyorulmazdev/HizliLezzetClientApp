import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from "../app/Components/Table/TableComponent";

test('TableComponent should render correctly', () => {
  // Define the props you want to pass to the component
  const props = {
    variation: 'Open' as 'Open', // Use one of the allowed values: 'Open', 'Reserved', or 'Maintenance'
    content: 'Table Content',
  };

  // Render the component with the specified props
  render(<TableComponent {...props} />);

  // Use assertions to check if the component rendered correctly
  // For example, you can check if specific text content is present in the rendered component
  expect(screen.getByText('Table Content')).toBeInTheDocument();
  expect(screen.getByText('$50')).toBeInTheDocument();
});
