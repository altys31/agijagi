import Calendar from 'react-calendar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';
import moment from 'moment';

const StyledCalendar = styled(Calendar)`
  .react-calendar {
    width: 100%;
    max-width: 320px;
    background-color: '#fff';
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    line-height: 1.125em;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar__month-view__days__day {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    aspect-ratio: 1;
  }

  .react-calendar__month-view__days__day abbr {
    position: absolute;
    border-radius: 100rem;
    font-size: 0.66rem;
    bottom: 54%;
    left: 5%;
  }

  .react-calendar__month-view__days__day abbr :enabled {
    background-color: white;
    padding: 1px;
    border-radius: 50%;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation__label__labelText {
    font-size: 16px;
  }

  .react-calendar__navigation button {
    color: ${theme.color.primary[700]};
    min-width: 34px;
    background: none;
    font-size: 18px;
    font-weight: 800;
    border: 0;
    margin-top: 8px;
  }

  .react-calendar__navigation button:disabled:first-of-type {
    visibility: hidden;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    background-color: ${theme.color.primary[500]};
    text-decoration: none;
  }
  .react-calendar__month-view__weekdays__weekday abbr[title] {
    text-decoration: none;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    color: #fff;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #929292;
    font-weight: 300;
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--neighboringMonth:disabled {
    background: #fff;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 0;
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px 0px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    vertical-align: top;
    text-align: left;
    font-weight: 600;
    height: 100%;
  }

  .react-calendar__tile:disabled {
    background-color: ${theme.color.greyScale[200]};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    font-weight: bold;
    border: 1px solid ${theme.color.primary[600]};
    background-color: ${theme.color.primary[100]};
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    font-weight: bold;
    color: white;
  }

  .react-calendar__tile--hasActive {
    border: 1px solid ${theme.color.primary[500]};
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }

  .react-calendar__tile--active {
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    color: ${theme.color.primary[900]};
  }
`;

export const FullCalendar = ({ ...rest }) => {
  return (
    <StyledCalendar
      {...rest}
      formatDay={(locale: string | undefined, date: Date) =>
        moment(date).format('D')
      }
      showNeighboringMonth={true}
    />
  );
};

export default FullCalendar;
