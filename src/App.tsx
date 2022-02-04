import React from "react";
import Table, {
  ColumnDefinition,
  FilterType,
} from "./components/Table/Table.component";
import WithActions from "./components/WithActions/WithActions.component";

const columnDefinitions: ColumnDefinition[] = [
  {
    headerName: "Make",
    field: "make",
    sortable: true,
    filter: true,
    cellEditor: "textInput",
  },
  {
    headerName: "Model",
    field: "model",
    sortable: true,
    filter: FilterType.Text,
  },
  {
    headerName: "Price",
    field: "price",
    sortable: true,
    filter: FilterType.Number,
  },
  {
    headerName: "Date",
    field: "date",
    sortable: true,
    filter: FilterType.Date,
  },
];

const data = [
  {
    make: "Toyota",
    model: "Celica",
    price: 35000,
    date: new Date(Date.now()),
    actions: { canSave: false },
  },
  {
    make: "Ford",
    model: "Mondeo",
    price: 32000,
    date: new Date(Date.now()),
    actions: { canDelete: true },
  },
  {
    make: "Porshe",
    model: "Boxter",
    price: 72000,
    date: new Date(Date.now()),
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
