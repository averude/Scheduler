import {Schedule} from '../model/schedule';

export const SCHEDULE: Schedule[] = [
  {
    id: 1,
    employeeId: 1,
    date: new Date(2018, 8, 1),
    hours: 0,
    holiday: false
  },
  {
    id: 2,
    employeeId: 1,
    date: new Date(2018, 8, 2),
    hours: 0,
    holiday: false
  },
  {
    id: 3,
    employeeId: 1,
    date: new Date(2018, 8, 3),
    hours: 8.5,
    holiday: false
  },
  {
    id: 4,
    employeeId: 1,
    date: new Date(2018, 9, 4),
    hours: 99.99,
    holiday: true
  },
  {
    id: 5,
    employeeId: 1,
    date: new Date(2018, 8, 5),
    hours: 8.5,
    holiday: false
  },
  {
    id: 8,
    employeeId: 1,
    date: new Date(2018, 8, 15),
    hours: 99.99,
    holiday: false
  },
  {
    id: 100,
    employeeId: 2,
    date: new Date(2018, 8, 10),
    hours: 1,
    holiday: false
  },
  {
    id: 1,
    employeeId: 3,
    date: new Date(2018, 8, 1),
    hours: 0,
    holiday: false
  },
  {
    id: 2,
    employeeId: 3,
    date: new Date(2018, 8, 2),
    hours: 0,
    holiday: false
  },
  {
    id: 3,
    employeeId: 3,
    date: new Date(2018, 8, 3),
    hours: 8,
    holiday: false
  },
  {
    id: 4,
    employeeId: 3,
    date: new Date(2018, 8, 4),
    hours: 8,
    holiday: true
  },
  {
    id: 5,
    employeeId: 3,
    date: new Date(2018, 8, 5),
    hours: 8,
    holiday: false
  },
  {
    id: 8,
    employeeId: 3,
    date: new Date(2018, 8, 15),
    hours: 8,
    holiday: false
  },
];
