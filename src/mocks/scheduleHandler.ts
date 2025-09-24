import moment from "moment";
import { http, HttpResponse } from "msw";
import { ScheduleData, ScheduleResponse } from "../types/schedule";

let idCounter = 3;

const today = moment().format('YYYY-MM-DD');

const schedules = [{
  id: 1,
  startDateTime: moment().set('hour', 9).set('minute', 0).toISOString(),
  endDateTime: moment().set('hour', 11).set('minute', 0).toISOString(),
  title: "가람 소아과 방문",
  description: "가람 소아과에서 예방접종 9시 예약",
}, {
    id: 2,
    startDateTime: moment().set('hour', 14).set('minute', 0).toISOString(),
    endDateTime: moment().set('hour', 15).set('minute', 0).toISOString(),
    title: "치과 예약",
    description: "치과에서 정기 검진 예약",
  }];

export const scheduleHandler = [
  http.get('https://api.password926.site/children/:childId/schedules', (req) => {
    const url = new URL(req.request.url);
    const start = url.searchParams.get('startDate');
    const end = url.searchParams.get('endDate');

    const startDate = start || today;
    const endDate = end || today;

    const startMoment = moment(startDate).startOf('day');
    const endMoment = moment(endDate).endOf('day');

    const matched = schedules.filter((s) => {
      const sMoment = moment(s.startDateTime);
      return sMoment.isBetween(startMoment, endMoment, undefined, '[]');
    });

    return HttpResponse.json(matched);
  }),

  http.post(`https://api.password926.site/children/:childId/schedules`, async (req) => {
    const body = await (req.request).json() as ScheduleData;
    const newSchedule = {
      id: idCounter++,
      ...body,
    };
    schedules.push(newSchedule);
    return HttpResponse.json(newSchedule, { status: 200 });
  }),

  http.patch('https://api.password926.site/children/:childId/schedules/:id', async (req) => {
    const { childId, id } = req.params;
    const body = await (req.request).json() as ScheduleData;
    const newSchedule = {
      childId: Number(childId),
      id: Number(id),
      ...body,
    };
    console.log('newSchedule', newSchedule);
    schedules.splice(schedules.findIndex(s => s.id === Number(id)), 1, newSchedule);
    return HttpResponse.json(schedules, { status: 200 });
  }),

  http.delete('https://api.password926.site/children/:childId/schedules/:id', (req) => {
    const { id } = req.params;
    schedules.splice(schedules.findIndex(s => s.id === Number(id)), 1);

    return HttpResponse.json(schedules, { status: 200 });
  }),

];