// @flow

export type Node = {
  nodeID: number,
  agentName: ?string,
  allowConnote: string,
  allowSpecialCargo: ?boolean,
  cityID: string,
  districtID: string,
  employeeID: ?string,
  isLabel: string,
  nodeAddress: string,
  nodeCode: string,
  nodeLat: ?number,
  nodeLon: ?number,
  nodeName: string,
  nodeTypeID: number,
  parentNodeID: number,
  phone: string,
  provinceID: string,
  remark: ?string,
  status: string,
  subdistrictID: string,
  tariffCode: string,
  timeZoneID: string,
  zipCode: string,
  zoneCode: string,
};

export type NodeState = {
  list: Map<number, Node>,
  activeNode: number,
};

export type NodeAction =
  | {
      type: 'NODE_RECEIVED',
      list: Array<Node>,
    }
  | {
      type: 'ACTIVE_NODE_CHANGED',
      nodeID: number,
    };
