import React, {Component} from 'react';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem, Button} from 'material-ui';
import {getEntity} from '../../../../actions/entity';
import Typography from 'material-ui/Typography/Typography';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      special_tariff_name: '',
      effective_date_from: moment().format('YYYY-MM-DDTHH:mm'),
      effective_date_to: moment().format('YYYY-MM-DDTHH:mm'),
      formula: '',
      settingsData: [],
      inited: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.props.edit &&
      !this.state.inited &&
      this.setState(
        {
          inited: true,
          ...nextProps.formdata,
          effective_date_from: moment(
            nextProps.formdata.effective_date_from,
          ).format('YYYY-MM-DD'),
          effective_date_to: moment(
            nextProps.formdata.effective_date_to,
          ).format('YYYY-MM-DD'),
        },
        () => {},
      );
  };
  componentDidMount() {
    getEntity('provinces', null).then((response) => {
      const {data} = response.data;
      this.setState({
        provinceData: data,
      });
    });
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  getSettingCondition = () => {
    const conditionData = [
      'From Country',
      'From Province',
      'From City',
      'From District',
      'From Subdistrict',
      'From Zip Codes',
      'From Tariff Code',
      'From Service',
      'From Weight',
      'To Country',
      'To Province',
      'To City',
      'To District',
      'To Subdistrict',
      'To Zip Codes',
      'To Tariff Code',
      'To Service',
      'To Weight',
    ];
    return {data: conditionData, selected: 0};
  };
  createNewSetting = () => {
    let settingsData = this.state.settingsData;
    settingsData = settingsData.concat([this.getSettingCondition()]);
    this.setState({settingsData});
  };
  handleChangeCondition = (id, event) => {
    let settingsData = this.state.settingsData;
    settingsData[id].selected = event.target.value;
    this.setState({settingsData});
  };
  render() {
    const {classes} = this.props;
    const {handleChange, handleChangeCondition, createNewSetting} = this;
    const {
      special_tariff_name,
      effective_date_from,
      effective_date_to,
      settingsData,
      formula,
    } = this.state;
    const appliedTariffData = [{label: '%BASE_TARIFF = 7000', id: 0}];
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            value={special_tariff_name}
            label="Description"
            required
            className={classes.textField}
            onChange={handleChange('special_tariff_name')}
          />
          <br />
          <div>
            <Typography
              type="title"
              style={{marginTop: '3%', marginBottom: '3%'}}
            >
              Setting
            </Typography>
          </div>
          {settingsData &&
            settingsData.map((condition, index) => (
              <div key={index}>
                <TextField
                  select
                  required
                  value={condition.selected}
                  className={classes.textField}
                  id="condition{index}"
                  label="Condition"
                  onChange={(event) => this.handleChangeCondition(index, event)}
                >
                  {condition.data.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
              </div>
            ))}
          <Button onClick={createNewSetting}>+&nbsp;&nbsp;ADD SETTING</Button>
          <br />
          <div>
            <Typography
              type="title"
              style={{marginTop: '3%', marginBottom: '3%'}}
            >
              Applied Tariff
            </Typography>
          </div>
          <TextField
            select
            required
            value={formula}
            className={classes.textField}
            id="formula"
            label="Applied Tariff"
            onChange={this.handleChange('formula')}
          >
            {appliedTariffData.map((option, index) => (
              <MenuItem key={index} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Grid container>
            <Grid item xs={6} sm={6}>
              <TextField
                id="datetime-local"
                label="Date from"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={effective_date_from}
                onChange={this.handleChange('effective_date_from')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="datetime-local"
                label="Date to"
                type="date"
                InputLabelProps={{shrink: true}}
                value={effective_date_to}
                onChange={this.handleChange('effective_date_to')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
