import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

interface TableEditingActionProps {
  canSave?: boolean,
  onSave: Function;
  onCancel: Function;
}

const TableEditingAction = ({ onSave, onCancel, canSave = false }: TableEditingActionProps) => {
  return (
    <ButtonGroup>
      <Tooltip title="Enregistrer">
        <span>
        <IconButton onClick={() => onSave()} disabled={!canSave}>
          <DoneIcon />
        </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Annuler">
        <IconButton onClick={() => onCancel()}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export default TableEditingAction;
