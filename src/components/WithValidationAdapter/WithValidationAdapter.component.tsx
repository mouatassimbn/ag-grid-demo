import React, { useEffect, useState } from "react";
import { CellType, ColumnDefinition } from "../Table/Table.component";
import { WithActionsProps } from "../WithActions/WithActions.component";
import {
  validateCheckbox,
  validateDay,
  validateNumber,
  validateSelect,
  validateText,
  validateTime,
} from "./utils";

interface WithValidationAdapterProps extends WithActionsProps {
  columns: ValidationColumns[];
}

interface ValidationColumns extends ColumnDefinition {
  options?: {
    validation?: IValidation;
  };
}

interface IValidation {
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  exactLength: number;
  dateRules: any;
}

const WithValidationAdapter = (Component: any) => {
  const Wrapper = ({ data, columns }: WithValidationAdapterProps) => {
    const [validationCols, setValidationCols] = useState<ValidationColumns[]>();
    
    useEffect(() => {
      const cols = columns.map(({ type, options, ...others }: ValidationColumns) => {
        let validationFunc = null;

        if (options?.validation) {
          switch (type) {
            case CellType.Text:
              validationFunc = validateText;
              break;
            case CellType.Number:
              validationFunc = validateNumber;
              break;
            case CellType.Checkbox:
              validationFunc = validateCheckbox;
              break;
            case CellType.Date:
              validationFunc = validateNumber;
              break;
            case CellType.Day:
              validationFunc = validateDay;
              break;
            case CellType.Select:
              validationFunc = validateSelect;
              break;
            case CellType.Time:
              validationFunc = validateTime;
              break;
            case CellType.Toggle:
              break;
            default:
              validationFunc = null;
              break;
          }
        }

        return {
          type,
          ...others,
          options: {
            isValid: validationFunc,
            ...options,
          },
        };
      });

      setValidationCols(cols);
    }, [columns]);

    return <Component data={data} columns={validationCols} />;
  };

  return Wrapper;
};

export default WithValidationAdapter;
