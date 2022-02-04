import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {
  PaginationNumberFormatterParams,
  GridOptions,
  ColDef,
  RowEditingStartedEvent,
} from "ag-grid-community";

import TableActions from "../TableActions/TableActions.component";
import TextInput from "../TextInput/TextInput.component";
import { ActionsColumnDefinition } from "../WithActions/WithActions.component";

import "./Table.styles.css";

interface TableProps {
  options?: Options;
  data: any[];
  columnsDefinition: ColumnDefinition[];
  actions?: {
    definition: ActionsColumnDefinition;
    onEditHandler: Function;
    onSaveHandler: Function;
    onDeleteHandler: Function;
    onCancelHandler: Function;
  };
}

const Table = (props: TableProps) => {
  const { options, data, columnsDefinition } = props;
  const grifRef = useRef(null);
  const [rowData] = useState(data);

  const tableOptions: Options = useMemo(
    () => ({
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        floatingFilter: true,
        editable: true,
      },
      frameworkComponents: {
        tableActions: TableActions,
        textInput: TextInput,
      },
      pagination: true,
      paginationPageSize: 4,
      editType: "fullRow",
      suppressClickEdit: true,
      ...options,
    }),
    [options]
  );

  const onRowEditingToggled = useCallback((params: RowEditingStartedEvent) => {
    params.api.refreshCells();
  }, []);

  return (
    <div id="myGrid" className="ag-theme-material" style={{ height: 500 }}>
      <AgGridReact
        ref={grifRef}
        gridOptions={tableOptions}
        onRowEditingStarted={onRowEditingToggled}
        onRowEditingStopped={onRowEditingToggled}
        columnDefs={columnsDefinition}
        rowData={rowData}
      />
    </div>
  );
};

export default Table;

export interface ColumnDefinition extends ColDef {
  headerName?: string;
  field?: string;
  sortable?: true;
  checkboxSelection?: boolean;
  filter?: boolean | FilterType;
}

export interface Options extends GridOptions {
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

export enum CellType {
  Text = "TextInput",
  Date = "DateInput",
  Day = "DayInput",
  Time = "TimeInput",
  Number = "NumberInput",
  Toggle = "ToggleInput",
  Color = "ColorInput",
  Checkbox = "CheckboxInput",
  Select = "SelectInput",
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
// -- Needed Cells
// --- Date
// --- Text
// --- Number
// --- Toggle
// --- Color
// --- Checkbox
// --- Select
// ----
