import { Checkbox } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const CheckboxInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const refInput = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(
      props.api
        .getEditingCells()
        .some((cell: any) => cell.rowIndex === props.node.rowIndex)
    );
  });

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },
      isCancelBeforeStart() {
        return false;
      },
      isCancelAfterEnd() {
        return value;
      },
    };
  });

  return (
    <Checkbox
      ref={refInput}
      checked={value}
      disabled={!isEditing}
      onChange={(event) => setValue(event.target.value)}
    />
  );
});

export default CheckboxInput;
