import { Switch } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ToggleInput = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef(null);

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

  return <Switch ref={inputRef} value={value} onChange={event => setValue(event.target.value)} />;
});

export default ToggleInput;
