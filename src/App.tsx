import React from "react";
import Table, {
  CellType,
  ColumnDefinition,
} from "./components/Table/Table.component";
import WithActions from "./components/WithActions/WithActions.component";

const columnDefinitions: ColumnDefinition[] = [
  {
    headerName: "Toggle",
    type: CellType.Toggle,
  },
  {
    headerName: "Is active",
    type: CellType.Checkbox,
  },
  {
    headerName: "Number",
    type: CellType.Number,
  },
  {
    headerName: "Select",
    field: "select",
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
    make: "Toyota",
    model: "Celica",
    select: "test 1",
    price: 35000,
    date: "2022-01-05",
    actions: { canSave: false },
  },
  {
    make: "Ford",
    model: "Mondeo",
    select: "test 1",
    price: 32000,
    date: "2022-01-05",
    actions: { canDelete: true },
  },
  {
    make: "Porshe",
    model: "Boxter",
    select: "test 1",
    price: 72000,
    date: "2022-01-05",
    actions: { canEdit: false },
  },
];

const TableWithActions = WithActions(Table);

function App() {
  return (
    <div className="App">
      <TableWithActions
        data={data}
        columns={columnDefinitions}
        onEdit={(params: any) => console.log(params)}
      />
    </div>
  );
}

export default App;
