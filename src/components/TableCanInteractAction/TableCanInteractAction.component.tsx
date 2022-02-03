import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment } from "react";

interface TableCanInteractActionProps {
  onEdit: Function;
  onDelete: Function;
  canEdit?: boolean;
  canDelete?: boolean;
}

const TableCanInteractAction = ({
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: TableCanInteractActionProps) => {
  return (
    <ButtonGroup>
      {canEdit ? (
        <Tooltip title="Editer">
          <IconButton onClick={() => onEdit()} data-action="update">
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment></Fragment>
      )}
      {canDelete ? (
        <Tooltip title="Supprimer">
          <IconButton onClick={() => onDelete()} data-action="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment></Fragment>
      )}
    </ButtonGroup>
  );
};

export default TableCanInteractAction;
