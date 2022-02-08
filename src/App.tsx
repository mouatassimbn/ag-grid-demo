import React from "react";
import Table, {
  CellType,
  ColumnDefinition,
} from "./components/Table/Table.component";
import WithActions from "./components/WithActions/WithActions.component";
// import WithValidationAdapter from "./components/WithValidationAdapter/WithValidationAdapter.component";

const values = [
  { value: "test1", label: "Test 1" },
  { value: "test2", label: "Test 2" },
  { value: "test3", label: "Test 3" },
];

const columnDefinitions: ColumnDefinition[] = [
  {
    headerName: "Active",
    field: "active",
    type: CellType.Toggle,
  },
  {
    headerName: "read",
    field: "read",
    type: CellType.Checkbox,
  },
  {
    headerName: "Select",
    field: "select",
    options: {
      options: values,
    },
    type: CellType.Select,
  },
  {
    headerName: "Make",
    field: "make",
    sortable: true,
    type: CellType.Text,
  },
  {
    headerName: "Model",
    field: "model",
    sortable: true,
    type: CellType.Text,
  },
  {
    headerName: "Price",
    field: "price",
    sortable: true,
    type: CellType.Number,
  },
  {
    headerName: "Date",
    field: "date",
    sortable: true,
    type: CellType.Date,
  },
];

const data = [
  {
    active: true,
    read: true,
    make: "Toyota",
    model: "Celica",
    select: "test1",
    price: 35000,
    date: "2022-01-05",
    actions: { canSave: false },
    lastValidation: false,
  },
  {
    active: false,
    read: true,
    make: "Ford",
    model: "Mondeo",
    select: "test2",
    price: 32000,
    date: "2022-01-05",
    actions: { canDelete: true },
    lastValidation: false,
  },
  {
    active: false,
    read: false,
    make: "Porshe",
    model: "Boxter",
    select: "test3",
    price: 72000,
    date: "2022-01-05",
    actions: { canEdit: false },
    lastValidation: false,
  },
];

const TableWithActions = WithActions(Table);

function App() {
  return (
    <div className="App">
      <TableWithActions data={data} columns={columnDefinitions} />
    </div>
  );
}

export default App;
