import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TextField } from "@mui/material";

const TextInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const refInput: Ref<any> = useRef(null);

  useEffect(() => {
    setTimeout(() => refInput.current.focus());
  }, []);

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
        // our editor will reject any value greater than 1000
        return value > 1000;
      },
    };
  });

  return (
    <TextField
      type="text"
      ref={refInput}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      disabled={!isEditing}
      variant="standard"
      size="small"
      fullWidth
    />
  );
});

export default TextInput;
