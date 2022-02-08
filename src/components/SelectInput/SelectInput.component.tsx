import { MenuItem, TextField } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  Ref,
  useState,
} from "react";

const SelectInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const inputRef: Ref<any> = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTimeout(() => inputRef.current.focus());

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
    isValid() {
      return true;
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
      {props.colDef.cellRendererParams.options.map(
        (option: { value: any; label: string }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
      )}
    </TextField>
  );
});

export default SelectInput;
