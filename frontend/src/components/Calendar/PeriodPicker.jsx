/* eslint react/no-multi-comp:0, no-console:0 */

import React from 'react';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from 'components/CustomButtons/Button.jsx';
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

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

let currentPeriods={
  start: now,
  end: now,
  period: 'day',
  milisec: 0,
  milisecStart: 0,
  milisecEnd: 0
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledTime(time, type) {
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

class PeriodPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      hoverValue: [],
      start: now,
      end: now,
    }
  }

  onChange = (value) => {
    this.setState({ value });
    currentPeriods.start = value[0]
    currentPeriods.end = value[1]
    currentPeriods.period = 'custom'
    let customPeriodStart = value[0]._d.getTime() 
    let customPeriodEnd = value[1]._d.getTime()
    currentPeriods.milisec = customPeriodEnd - customPeriodStart
    currentPeriods.milisecStart = customPeriodStart
    currentPeriods.milisecEnd = customPeriodEnd

    this.props.getPeriod({
      start: value[0]._d, 
      end: value[1]._d,
      dayStart: currentPeriods.milisecStart,
      dayEnd: currentPeriods.milisecEnd
    })
    
  }

  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  }
  // function for navifation
  figurePeriod=()=>{
    if(this.props.move) { // moving periods by arrows
      //moving by arrow buttons
      if(currentPeriods.period === 'custom') { // custom period
        if(this.props.move==='left') {
          currentPeriods.start = currentPeriods.start.clone().add(-currentPeriods.milisec, 'milliseconds')
          currentPeriods.end = currentPeriods.end.clone().add(-currentPeriods.milisec, 'milliseconds')
        } else {
          currentPeriods.start = currentPeriods.start.clone().add(currentPeriods.milisec, 'milliseconds')
          currentPeriods.end = currentPeriods.end.clone().add(currentPeriods.milisec, 'milliseconds')
        }
        this.props.buttonsPeriod({
          start: currentPeriods.start._d, 
          end: currentPeriods.end._d,
          dayStart : currentPeriods.start._d,
          dayEnd: currentPeriods.end._d
        })
      } else { // standart periods
        if(this.props.move==='left') {
          currentPeriods.start = currentPeriods.start.clone().add(-1, currentPeriods.period)
          currentPeriods.end = currentPeriods.end.clone().add(-1, currentPeriods.period)
        } else {
          currentPeriods.start = currentPeriods.start.clone().add(+1, currentPeriods.period)
          currentPeriods.end = currentPeriods.end.clone().add(+1, currentPeriods.period)
        }

        if(currentPeriods.period === 'months') {
          this.props.buttonsPeriod({
            end: currentPeriods.start._d, 
            start: currentPeriods.end._d,
            dayStart: currentPeriods.start.clone().startOf('month')._d, 
            dayEnd:currentPeriods.start.clone().endOf('month')._d
          })
        }
        if(currentPeriods.period === 'weeks') {
          this.props.buttonsPeriod({
            end: currentPeriods.start._d, 
            start: currentPeriods.end._d,
            dayStart: currentPeriods.start.clone().startOf('week')._d, 
            dayEnd: currentPeriods.start.clone().endOf('week')._d,
          })
        }
        if(currentPeriods.period === 'day') {
          this.props.buttonsPeriod({
            end: currentPeriods.start._d, 
            start: currentPeriods.end._d,
            dayStart: currentPeriods.start.clone().startOf('day')._d, 
            dayEnd: currentPeriods.end.clone().endOf('day')._d,
          })
        }
        
      }
    } else { // chosing range by buttons DAY WEEK and MONTH
      if(this.props.day) {
        this.props.buttonsPeriod({
          start: now._d, 
          end: now._d, 
          dayStart: now.clone().startOf('day')._d, 
          dayEnd: now.clone().endOf('day')._d
        })
        currentPeriods.period = 'day'
      }
      if(this.props.week) {
        this.props.buttonsPeriod({
          end: now._d, 
          start: now.clone().add(-1, 'week')._d,
          dayStart: now.clone().startOf('week')._d, 
          dayEnd: now.clone().endOf('day')._d
        })
        currentPeriods.end = now.clone().add(-1, 'weeks')
        currentPeriods.period = 'weeks'
      }
      if(this.props.month) {
        this.props.buttonsPeriod({
          end: now._d, 
          start: now.clone().add(-1, 'months')._d,
          dayStart: now.clone().startOf('month')._d, 
          dayEnd: now.clone().endOf('day')._d
        })
        currentPeriods.end = now.clone().add(-1, 'months')
        currentPeriods.period = 'months'
      } 
    }  
  }


  buttonTitle = (move)=>{
      return (move==='left') ? <ChevronLeft/> : <ChevronRight/>
  }

  render() {
    
    const state = this.state;
    const {classes, period, move} = this.props;

    const title = move ? this.buttonTitle(move) : this.props.name

    // console.log(now)
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
                  {title}
                </Button>
                </span>);
          }
        }
      </Picker>);
  }
}

export default withStyles(styles)(PeriodPicker);