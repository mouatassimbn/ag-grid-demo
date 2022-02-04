import React, { Component } from "react";
import { CellType, ColumnDefinition } from "../Table/Table.component";

export interface ActionsColumnDefinition extends ColumnDefinition {
  colId: string;
  type: CellType;
  editable: boolean;
  cellRendererParams: {
    onEdit: Function;
    onSave: Function;
    onDelete: Function;
    onCancel: Function;
  };
}

export interface WithActionsProps {
  data: any[];
  columns: any[];
  onEdit?: Function;
  onSave?: Function;
  onDelete?: Function;
  onCancel?: Function;
}

export interface WithActionsState {
  columns: ActionsColumnDefinition[];
}

const WithActions = (Table: any) => {
  return class extends Component<WithActionsProps, WithActionsState> {
    constructor(props: WithActionsProps) {
      super(props);
      this.state = {
        columns: [
          ...props.columns,
          {
            colId: "actions",
            editable: false,
            type: CellType.Actions,
            cellRendererParams: {
              onEdit: this._editHandler,
              onSave: this._saveHandler,
              onCancel: this._cancelHandler,
              onDelete: this._deleteHandler,
            },
          },
        ],
      };
    }

    private _editHandler = (params: any) => {
      params.api.startEditingCell({
        rowIndex: params.node.rowIndex,
        colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
      });

      if (this.props.onEdit) {
        this.props.onEdit(params);
      }
    };
    private _saveHandler = (params: any) => {
      params.api.stopEditing(false);

      if (this.props.onSave) {
        this.props.onSave(params);
      }
    };
    private _deleteHandler = (params: any) => {
      //TODO: Not implemnted
      if (this.props.onDelete) {
        this.props.onDelete(params);
      }
    };
    private _cancelHandler = (params: any) => {
      params.api.stopEditing(true);

      if (this.props.onCancel) {
        this.props.onCancel(params);
      }
    };

    render() {
      const { data } = this.props;
      const { columns } = this.state;

      return <Table data={data} columnsDefinition={columns} />;
    }
  };
};

export default WithActions;
