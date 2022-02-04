import { Checkbox } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CheckboxInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const refInput = useRef(null);

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
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
});

export default CheckboxInput;
