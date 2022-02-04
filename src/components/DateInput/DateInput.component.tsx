import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TextField } from "@mui/material";

const DateInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef: Ref<any> = useRef(null);

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
  }));

  return (
    <TextField
      type="date"
      ref={inputRef}
      value={value}
      disabled={!isEditing}
      onChange={(event) => setValue(event.target.value)}
      variant="standard"
      size="small"
      fullWidth
    />
  );
});

export default DateInput;
