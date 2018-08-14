import React from 'react';
import {FormControl, InputLabel, Input} from 'material-ui';

const DskripsiBrg = (props) => {
  const {classes, text, handleChange} = props;
  return (
    <FormControl>
      {' '}
      {/*dskrpsiBrg*/}
      <InputLabel
        FormControlClasses={{focused: classes.inputLabelFocused}}
        htmlFor="focusedInput"
        className={classes.inputLabel}
      >
        {text.label}
      </InputLabel>
      <Input
        classes={{inkbar: classes.inputInkbarFocused}}
        id="deskripsiInput"
        onChange={handleChange}
        className={classes.textField}
        name={text.name}
        value={text.value}
        inputProps={{
          readOnly: props.readOnly,
          disabled: props.readOnly,
        }}
      />
    </FormControl>
  );
};

export default DskripsiBrg;
