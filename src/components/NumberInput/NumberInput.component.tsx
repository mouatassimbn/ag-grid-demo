import { TextField } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const NumberInput = forwardRef((props: any, ref) => {
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
      ref={inputRef}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      variant="standard"
      size="small"
      fullWidth
      type="number"
      disabled={!isEditing}
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    />
  );
});

export default NumberInput;
