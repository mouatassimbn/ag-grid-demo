import { Switch } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  Ref,
} from "react";

const ToggleInput = forwardRef((props: any, ref) => {
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
    getValu() {
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
    <Switch
      ref={inputRef}
      checked={value}
      disabled={!isEditing}
      onChange={(event) => setValue(event.target.value)}
    />
  );
});

export default ToggleInput;
