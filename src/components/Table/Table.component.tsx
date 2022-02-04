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
import CheckboxInput from "../CheckboxInput/CheckboxInput.component";
import { ActionsColumnDefinition } from "../WithActions/WithActions.component";

import "./Table.styles.css";
import DateInput from "../DateInput/DateInput.component";
import ToggleInput from "../ToggleInput/ToggleInput.component";
import SelectInput from "../SelectInput/SelectInput.component";
import NumberInput from "../NumberInput/NumberInput.component";

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
  const [colDefs, setColDefs] = useState<any[]>();

  const tableOptions: Options = useMemo(
    () => ({
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        editable: true,
      },
      frameworkComponents: {
        actions: TableActions,
        textInput: TextInput,
        checkboxInput: CheckboxInput,
        dateInput: DateInput,
        toggleInput: ToggleInput,
        selectInput: SelectInput,
        numberInput: NumberInput,
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

  const onGridReady = () => {
    // Step 1 convert
    setColDefs(conversionAdapter(columnsDefinition));
  };

  return (
    <div id="myGrid" className="ag-theme-material" style={{ height: 500 }}>
      <AgGridReact
        ref={grifRef}
        gridOptions={tableOptions}
        onGridReady={onGridReady}
        onRowEditingStarted={onRowEditingToggled}
        onRowEditingStopped={onRowEditingToggled}
        columnDefs={colDefs}
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
  type?: CellType;
}
export interface Options extends GridOptions {
  pagination: boolean;
  paginationPageSize?: number;
  paginationAutoPageSize?: boolean;
  paginationNumberFormatter?: (
    params: PaginationNumberFormatterParams
  ) => string;
}

export enum CellType {
  Text = "textInput",
  Date = "dateInput",
  Day = "dayInput",
  Time = "timeInput",
  Number = "numberInput",
  Toggle = "toggleInput",
  Color = "colorInput",
  Checkbox = "checkboxInput",
  Select = "selectInput",
  Actions = "actions",
}

// Converts columns params
//TODO:Might need to create an adapter component to take care of conversion
const conversionAdapter = (columns: ColumnDefinition[]) => {
  return columns.map(({ type, ...others }: ColumnDefinition) => ({
    cellRenderer: type,
    cellEditor: type,
    ...others,
  }));
};

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
// --- Date [X]
// --- Text [X]
// --- Number [X]
// --- Toggle [X]
// --- Color for later
// --- Checkbox [X]
// --- Select [X]
// ----
// Fix read only and editing for each input
