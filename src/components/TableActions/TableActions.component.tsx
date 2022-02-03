import { ICellRendererParams } from "ag-grid-community";
import TableCanInteractAction from "../TableCanInteractAction/TableCanInteractAction.component";
import TableEditingAction from "../TableEditingAction/TableEditingAction.component";

interface TableActionsProps extends ICellRendererParams {
  onEdit: Function;
  onSave: Function;
  onCancel: Function;
  onDelete: Function;
}

interface Actions {
  isEditing: boolean;
  canSave: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const defaults = {
  canSave: false,
  canEdit: true,
  canDelete: false,
};

const TableActions = (props: TableActionsProps) => {
  const { data, onEdit, onSave, onCancel, onDelete } = props;
  const mergedWithDefaults: Actions = { ...defaults, ...data.actions };
  const { canSave, canEdit, canDelete } = mergedWithDefaults;

  const isCurrentRowEditing = props.api
    .getEditingCells()
    .some((cell: any) => cell.rowIndex === props.node.rowIndex);

  const saveHandler = (): void => onSave(props);
  const cancelHandler = (): void => onCancel(props);
  const deleteHandler = (): void => onDelete(props);
  const editHandler = (): void => onEdit(props);

  if (isCurrentRowEditing) {
    return (
      <TableEditingAction
        canSave={canSave}
        onSave={saveHandler}
        onCancel={cancelHandler}
      />
    );
  } else {
    return (
      <TableCanInteractAction
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={editHandler}
        onDelete={deleteHandler}
      />
    );
  }
};

export default TableActions;
