import moment from 'moment';
import _ from 'lodash';

const styleNameCompose = (props) => {
  // select the class for the border base style
  const { quarter, heightlightedUser } = props;
  let style = 'cell';
  const minutes = moment(quarter.time).minutes();
  if (minutes === 0) {
    style += ' cellBorderHour';
  } else if (minutes === 30) {
    style += ' cellBorderHalfHour';
  }
  // if have a user to hightLight and is present at this cell
  if (heightlightedUser) style += (_.find(quarter.participants, heightlightedUser)) ? ' cellHighlighted' : ' cellNotHeiglighted';
 // if (quarter.eventCalendar.length > 0) style += ' CellHasCalendarEvent';
  return style;
};

const backgroundColorForHeatMap = (props) => {
  const { backgroundColors, quarter } = props;
  if (quarter.eventCalendar.length > 0 && quarter.participants.length > 0) {
    console.log('entrei');
    const bkgColor = backgroundColors[quarter.participants.length - 1];
    return `repeating-linear-gradient(45deg, ${bkgColor}, #DADADA, ${bkgColor} 5px, ${bkgColor} 5px)`;
  }
  if (quarter.eventCalendar.length > 0) {
    const bkgColor = backgroundColors[quarter.participants.length - 1];
    return `repeating-linear-gradient(45deg, ${bkgColor}, #DADADA, ${bkgColor} 5px, ${bkgColor} 5px)`;
  }
  if (quarter.participants.length > 0) return backgroundColors[quarter.participants.length - 1];
  return 'transparent';
};

const formatCellBackgroundColor = (props) => {
  const { curUser, quarter, heatMapMode } = props;
  // background for disabled cells
  if (quarter.disable) return '#DADADA';
  if (heatMapMode) return backgroundColorForHeatMap(props);
  if (_.find(quarter.participants, curUser._id)) return '#000000';
  if (quarter.participants.length > 0) return '#AECDE0';
  return 'transparent';
};

export { styleNameCompose, formatCellBackgroundColor };
