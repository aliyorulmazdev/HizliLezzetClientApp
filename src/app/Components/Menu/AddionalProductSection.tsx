import React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import { Dropdown } from "semantic-ui-react";
import { AdditionalSection } from "../../types/interfaces";

interface AddionalProductSectionProps {
  section: AdditionalSection;
  handleMaterialSelect: (sectionTitle: string, value: string) => void;
}

const AddionalProductSection: React.FC<AddionalProductSectionProps> = ({
  section,
  handleMaterialSelect,
}) => {
  return (
    <div className="select-box-wrapper">
      <DialogContentText className="custom-dialog-content">
        {section.title}
      </DialogContentText>
      <FormControl fullWidth>
        <Dropdown
          className="dropdown"
          selection
          options={section.items.map((material) => ({
            value: material.name,
            text: `${material.name} ($${material.price})`,
          }))}
          placeholder="Select from here"
          onChange={(_, { value }) =>
            handleMaterialSelect(section.title, value as string)
          }
        />
      </FormControl>
    </div>
  );
};

export default AddionalProductSection;
