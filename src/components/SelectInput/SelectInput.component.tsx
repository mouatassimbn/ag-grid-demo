import { MenuItem, TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const values = [
  { value: "test 1", label: "test1" },
  { value: "test 2", label: "test2" },
  { value: "test 3", label: "test3" },
];

const SelectInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(
      props.api
        .getEditingCells()
        .some((cell: any) => cell.rowIndex === props.node.rowIndex)
    );
  });

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
    isCancelBeforeStart() {
      return false;
    },

    isCancelAfterEnd() {
      return value;
    },
  }));

  return (
    <TextField
      type="select"
      ref={inputRef}
      select
      value={value}
      disabled={!isEditing}
      onChange={(event) => setValue(event.target.value)}
      variant="standard"
      size="small"
      fullWidth
    >
      {values.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
});

export default SelectInput;
