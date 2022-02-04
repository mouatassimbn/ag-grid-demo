import { Switch } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const ToggleInput = forwardRef((props: any, ref) => {
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
    getValu() {
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
    <Switch
      ref={inputRef}
      value={value}
      disabled={!isEditing}
      onChange={(event) => setValue(event.target.value)}
    />
  );
});

export default ToggleInput;
