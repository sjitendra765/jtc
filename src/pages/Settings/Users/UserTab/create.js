import React, {Component} from 'react';
import {TextField, MenuItem} from 'material-ui';
import {getEntityList, getEntity} from '../../../../actions/entity';
import Grid from 'material-ui/Grid';
import ReferenceDropDown from '../../../../components//refrencedropdown';
class CreateForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      phone: '',
      node_code: '',
      node_name: '',
      role_id: '',
      confirm: false,
      dataRoles: [],
      dataNodes: [],
      edit: false,
      userData: '',
      inited: false,
    };
  }
  componentWillReceiveProps = (props) => {
    this.props.edit &&
      !this.state.inited &&
      this.setState(
        {
          inited: true,
          username: props.formdata.username,
          email: props.formdata.email,
          phone: props.formdata.phone,
          node_code: props.formdata.node.node.node_id,
          role_id: props.formdata.usergroup.role.role_id,
          node_name: props.formdata.node.node.node_name,
        },
        () => {
          this.props.onUpdateForm(
            'node_code',
            props.formdata.node.node.node_id,
          );
          this.props.onUpdateForm(
            'role_id',
            props.formdata.usergroup.role.role_id,
          );
        },
      );
  };
  componentDidMount() {
    getEntityList('usergroups', {l: -1}).then((response) => {
      const {data} = response.data;
      this.setState({dataRoles: data});
    });
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  handleUpdate = (name) => (value) => {
    this.setState({[name]: value, node_name: ''});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {handleChange, handleUpdate} = this;
    const {classes} = this.props;
    const {
      node_name,
      role_id,
      node_code,
      dataNodes,
      dataRoles,
      username,
      email,
      password,
      phone,
    } = this.state;
    return (
      <Grid md={12} item>
        <TextField
          value={username}
          label="Username"
          required
          className={classes.textField}
          onChange={handleChange('username')}
        />
        <br />
        <TextField
          value={email}
          label="Email"
          type="email"
          required
          className={classes.textField}
          onChange={handleChange('email')}
        />{' '}
        <br />
        <TextField
          value={password}
          label="Password"
          type="password"
          required
          className={classes.textField}
          onChange={handleChange('password')}
        />{' '}
        <br />
        <TextField
          value={phone}
          label="Phone Number"
          type="phone"
          required
          className={classes.textField}
          onChange={handleChange('phone')}
        />{' '}
        <br />
        <ReferenceDropDown
          className={classes.textField}
          value={node_code && parseInt(node_code, 10)}
          selectedValue={
            node_name && {node_name: node_name, node_id: node_code}
          }
          remoteCall={getEntityList}
          entity={'nodes'}
          valueKey={'node_id'}
          labelKey={'node_name'}
          searchkey={'s'}
          placeholder={'Node'}
          onUpdate={handleUpdate('node_code')}
        />
        <TextField
          id="role_id"
          select
          label="Roles"
          required
          className={classes.textField}
          value={role_id}
          onChange={this.handleChange('role_id')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          {dataRoles
            ? dataRoles.map((option, index) => (
                <MenuItem key={index} value={option.role_id}>
                  {option.role_name}
                </MenuItem>
              ))
            : null}
        </TextField>
      </Grid>
    );
  }
}

export default CreateForm;
