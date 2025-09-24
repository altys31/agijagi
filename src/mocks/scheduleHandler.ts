import moment from "moment";
import { http, HttpResponse } from "msw";

const today = moment().format('YYYY-MM-DD');

const schedules = [{
  id: 1,
  startDateTime: moment().set('hour', 9).set('minute', 0).toISOString(),
  endDateTime: moment().set('hour', 11).set('minute', 0).toISOString(),
  title: "가람 소아과 방문",
  description: "가람 소아과에서 예방접종 9시 예약",
}];

export const scheduleHandler = [
  http.get(`https://api.password926.site/children/${1}/schedules?startDate=${today}&endDate=${today}`, () => {

    return HttpResponse.json(schedules);
  }),

];