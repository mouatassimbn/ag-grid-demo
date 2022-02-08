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
  const [isEditing, setIsEditing] = useState(false);
  const [isValid] = useState(false);
  const refInput: Ref<any> = useRef(null);

  useEffect(() => {
    setTimeout(() => refInput.current.focus());

    setIsEditing(
      props.api
        .getEditingCells()
        .some((cell: any) => cell.rowIndex === props.node.rowIndex)
    );
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },
      afterGuiAttached() {
        setValue(props.value);
        refInput.current.focus();
        refInput.current.select();
      },
      isValid() {
        return 
      }
    };
  });

  const handleInputChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      type="text"
      ref={refInput}
      value={value}
      onChange={handleInputChange}
      disabled={!isEditing}
      variant="standard"
      size="small"
      fullWidth
    />
  );
});

export default TextInput;
