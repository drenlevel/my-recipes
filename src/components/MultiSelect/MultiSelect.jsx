import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Checkbox, FormControl, TextField } from '@mui/material';
import { forwardRef } from 'react';

const MultiSelect = forwardRef(
  (
    {
      AutoCompleteProps,
      TextFieldProps,
      onChange,
      helperText,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl fullWidth>
        <Autocomplete
          margin="dense"
          size="medium"
          variant="standard"
          disableCloseOnSelect
          multiple
          ref={ref}
          onChange={onChange}
          ChipProps={{ color: 'primary' }}
          getOptionLabel={option => option.label}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={textProps => (
            <TextField
              {...TextFieldProps}
              {...textProps}
              variant="standard"
              helperText={helperText}
              error={error}
            />
          )}
          {...AutoCompleteProps}
          {...props}
        />
      </FormControl>
    );
  },
);
MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
