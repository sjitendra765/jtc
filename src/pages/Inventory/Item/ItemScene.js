// @flow

import React from 'react';
import {View} from 'react-native';
import {Typography, Tabs, Tab, Paper} from 'material-ui';

import ConnoteList from './Connote/ConnoteList';
import BagList from './Bag/BagList';

type ActiveTab = 'connote' | 'bag';

type Props = {
  tab?: ActiveTab,
};

type State = {
  activeTab: ActiveTab,
};

export default class ItemScene extends React.Component<Props, State> {
  state = {
    activeTab: this.props.tab || 'connote',
  };

  render() {
    let {activeTab} = this.state;
    return (
      <View style={{flex: 1, paddingHorizontal: 60}}>
        <View style={{marginVertical: 40}}>
          <Typography variant="title">Item</Typography>
        </View>
        <Paper>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this._onTabPress}
            >
              <Tab label="Connote" value="connote" />
              <Tab label="Bag" value="bag" />
            </Tabs>
            <View>{this._renderContent(activeTab)}</View>
          </View>
        </Paper>
      </View>
    );
  }
  _onTabPress = (event: Event, activeTab: ActiveTab) =>
    this.setState({activeTab});

  _renderContent = (activeTab: ActiveTab) => {
    switch (activeTab) {
      case 'connote': {
        return <ConnoteList />;
      }
      case 'bag': {
        return <BagList />;
      }

      default:
        return <ConnoteList />;
    }
  };
}
