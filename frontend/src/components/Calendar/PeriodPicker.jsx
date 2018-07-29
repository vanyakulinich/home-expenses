/* eslint react/no-multi-comp:0, no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from 'components/CustomButtons/Button.jsx';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const styles = {
  buttonsPeriods: {
      width: '80px'
  }
}

moment.locale('en-gb');
const now = moment();
now.utcOffset(0);


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
  <TimePickerPanel
    defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
  />
);

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.isBefore(date);  // can not select days before today
}

function disabledTime(time, type) {
  // console.log('disabledTime', time, type);
  if (type === 'start') {
    return {
      disabledHours() {
        const hours = newArray(0, 60);
        hours.splice(20, 4);
        return hours;
      },
      disabledMinutes(h) {
        if (h === 20) {
          return newArray(0, 31);
        } else if (h === 23) {
          return newArray(30, 60);
        }
        return [];
      },
      disabledSeconds() {
        return [55, 56];
      },
    };
  }
  return {
    disabledHours() {
      const hours = newArray(0, 60);
      hours.splice(2, 6);
      return hours;
    },
    disabledMinutes(h) {
      if (h === 20) {
        return newArray(0, 31);
      } else if (h === 23) {
        return newArray(30, 60);
      }
      return [];
    },
    disabledSeconds() {
      return [55, 56];
    },
  };
}

const formatStr = 'YYYY-MM-DD HH:mm:ss';
function format(v) {
  return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
  return v && v[0] && v[1];
}

function onStandaloneChange(value) {
  // console.log('onChange');
  // console.log(value[0] && format(value[0]), value[1] && format(value[1]));
}

function onStandaloneSelect(value) {
  // console.log('onSelect');
  // console.log(format(value[0]), format(value[1]));
}

class PeriodPicker extends React.Component {
  state = {
    value: [],
    hoverValue: [],
  }

  onChange = (value) => {
    // console.log('onChange', value);
    this.setState({ value });
    this.props.getPeriod({
        start: value[0]._d,
        end: value[1]._d
  })
  }

  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  }

  figurePeriod=()=>{
    if(this.props.day) this.props.buttonsPeriod({start: now._d, end: now._d})
    if(this.props.week) this.props.buttonsPeriod({start: now._d, end: now.clone().add(-1, 'weeks')._d})
    if(this.props.month) this.props.buttonsPeriod({start: now._d, end: now.clone().add(-1, 'months')._d})       
  }

  render() {
    const state = this.state;
    const {classes, period} = this.props;
    console.log(now)
    const calendar = (
      <RangeCalendar
        hoverValue={state.hoverValue}
        onHoverChange={this.onHoverChange}
        showWeekNumber={false}
        dateInputPlaceholder={['start', 'end']}
        defaultValue={[now, now.clone().add(1, 'months')]}
        locale={enUS}
        disabledTime={disabledTime}
        showDateInput={false}
        showOk={false}
        showToday={false}
        showClear={false}
        selectTime={false}

      />
    );
    return (
      <Picker
        value={state.value}
        onChange={this.onChange}
        animation="slide-up"
        calendar={calendar}
        disabled={period ? false : true}

      >
        {
          ({ value }) => {
            return (<span>

                <Button className={classes.buttonsPeriods} 
                        color='primary'
                        onClick={this.figurePeriod}>
                  {this.props.name}
                </Button>
                </span>);
          }
        }
      </Picker>);
  }
}

export default withStyles(styles)(PeriodPicker);