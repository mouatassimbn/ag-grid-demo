import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { PaginationNumberFormatterParams } from "ag-grid-community";

import TableActions from "../TableActions/TableActions.component";

interface TableProps {
  options?: any;
  data: any[];
  columnsDefinition: ColumnDefinition[];
}

const defaultOptions = {
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
    editable: true,
  },
  pagination: true,
  paginationPageSize: 4,
  frameworkComponents: {
    TableActions: TableActions,
  },
  editType: "fullRow",
  suppressClickEdit: true,
};

const Table = (props: TableProps) => {
  const { options, data, columnsDefinition } = props;
  const grifRef = useRef(null);
  const [tableOptions, setTableOptions] = useState(defaultOptions);
  const [columnDefs, setColumnDefs] = useState<any[]>(columnsDefinition);

  useEffect(() => {
    setTableOptions({ ...tableOptions, ...options });
  }, [props]);

  useEffect(() => {
    const actions = {
      colId: "actions",
      cellRenderer: "TableActions",
      editable: false,
      cellRendererParams: {
        onEdit: editHandler,
        onSave: saveHandler,
        onDelete: deleteHandler,
        onCancel: cancelHandler,
      },
    };

    setColumnDefs([...columnDefs, actions]);
  }, []);

  const editHandler = (params: any) => {
    console.log("edit");
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex,
      colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
    });
  };

  const saveHandler = (params: any) => {
    params.api.stopEditing(false);
  };

  const deleteHandler = (params: any) => {
    console.log("deleted");
  };

  const cancelHandler = (params: any) => {
    params.api.stopEditing(true);
  };

  const onRowEditingToggled = (params: any) => {
    params.api.refreshCells();
  };

  return (
    <div id="myGrid" className="ag-theme-material" style={{ height: 400 }}>
      <AgGridReact
        ref={grifRef}
        rowData={data}
        gridOptions={tableOptions}
        onRowEditingStarted={onRowEditingToggled}
        onRowEditingStopped={onRowEditingToggled}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default Table;

export interface ColumnDefinition {
  headerName: string;
  field: string;
  sortable?: true;
  checkboxSelection?: boolean;
  filter?: boolean | FilterType;
}

export interface Options {
  pagination: boolean;
  paginationPageSize?: number;
  paginationAutoPageSize?: boolean;
  paginationNumberFormatter?: (
    params: PaginationNumberFormatterParams
  ) => string;
}

export enum FilterType {
  Text = "agTextColumnFilter",
  Number = "agNumberColumnFilter",
  Date = "agDateColumnFilter",
}

//TODO: Need to implement a custom number component. should limit filter number feild to accept only number key strokes
// TODO: Minimum requirements :
// - Can sort table
// - Can filter table
// - There's pagination in table
// - Table always has a title
// - Table has a toolbox
// - Table have a column for actions
// - Each column needs specific actions
// - Each column need validaiton
