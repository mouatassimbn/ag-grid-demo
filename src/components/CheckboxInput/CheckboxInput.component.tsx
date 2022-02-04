import { Checkbox } from "@mui/material";
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const CheckboxInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const refInput: Ref<any> = useRef(null);

  useEffect(() => {
    setTimeout(() => refInput.current.focus());

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
