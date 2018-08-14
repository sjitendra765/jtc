// @flow

import convertArrayToMap from '../../helpers/convertArrayToMap';

import type {NodeState, NodeAction} from './Node-type';

const initialState: NodeState = {
  list: new Map(),
  activeNode: 0,
};

export default function permissionReducer(
  state: NodeState = initialState,
  action: NodeAction,
) {
  switch (action.type) {
    case 'NODE_RECEIVED': {
      let list = convertArrayToMap(action.list, 'nodeID');
      return {
        list,
      };
    }
    case 'ACTIVE_NODE_CHANGED': {
      console.log('action.nodeID', action.nodeID);
      return {
        ...state,
        activeNode: action.nodeID,
      };
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
