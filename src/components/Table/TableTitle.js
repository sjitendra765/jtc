// @flow

import React from 'react';
import {
  TextField,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Icon,
  Button,
} from 'material-ui';
import {View, Text} from 'react-native';

type Props = {
  title: string,
  searchTextInput: string,
  onSearchTextChange: (textInput: string) => void,
  onSearchSubmit: (searchTextInput: string) => void,
};

export default class TableTitle extends React.Component<Props, void> {
  _timeoutID: ?number;
  componentWillUnmount() {
    if (this._timeoutID) {
      clearTimeout(this._timeoutID);
    }
  }
  render() {
    let {title, searchTextInput} = this.props;
    return (
      <Toolbar>
        <View style={{flex: 1}}>
          <Typography variant="title">{title}</Typography>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TextField
            id="search"
            label="Search field"
            type="search"
            value={searchTextInput}
            onChange={(event) => {
              this._onSearchTextChangeHandler(event.target.value);
            }}
          />
          <View style={{flexDirection: 'row', paddingTop: 20}}>
            <Button size="small">
              <Icon>insert_drive_file</Icon>
              <Text>Export</Text>
            </Button>
          </View>
        </View>
      </Toolbar>
    );
  }

  _onSearchTextChangeHandler = (searchTextInput) => {
    console.log('searchTextInput table title', searchTextInput);
    let {onSearchTextChange, onSearchSubmit} = this.props;
    onSearchTextChange(searchTextInput);

    if (this._timeoutID) {
      clearTimeout(this._timeoutID);
    }
    this._timeoutID = setTimeout(() => {
      onSearchSubmit(searchTextInput);
    }, 800);
  };
}
