import users from './UserTab/create';
import roles from './RoleTab/create';
import permission from './Permission/list';
import genericList from '../genericList';

const form = {
  users: {
    columnData: [
      {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Username',
      },
      {id: 'email', numeric: false, disablePadding: true, label: 'Email'},
      {
        id: 'node',
        key: 'node_code',
        numeric: false,
        disablePadding: true,
        label: 'Node',
      },
      {
        id: 'usergroup',
        key: 'role',
        key2: 'role_name',
        numeric: false,
        disablePadding: true,
        label: 'Roles',
      },
    ],
    idfield: 'user_id',
    listForm: genericList,
    createForm: users,
  },
  usergroups: {
    columnData: [
      {id: 'role_id', numeric: false, disablePadding: false, label: 'ID'},
      {id: 'role_name', numeric: false, disablePadding: true, label: 'Roles'},
    ],
    idfield: 'role_id',
    listForm: genericList,
    createForm: roles,
  },
  permission: {
    columnData: [
      {id: 'role_id', numeric: false, disablePadding: false, label: 'ID'},
      {id: 'role_name', numeric: false, disablePadding: true, label: 'Roles'},
    ],
    idfield: 'role_id',
    listForm: permission,
  },
};
export default form;
