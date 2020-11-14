import * as FileSaver from "file-saver";
import { CellData } from "../../../lib/ngx-schedule-table/model/data/cell-data";
import { ReportRowData } from "./model/report-row-data";
import { SummationColumn } from "../../../model/summation-column";
import { EXTRA_WEEKEND, HOLIDAY, SpecialCalendarDate } from "../../../model/special-calendar-date";
import { ScheduleTablePaginationStrategy } from "../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import * as moment from 'moment';
import { DecorationData } from "./model/decoration-data";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportGenerator } from "./report-generator";

describe("Test report generator", () => {
  const blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  it('should ', function () {
    const generator = new ReportGenerator();
    const daysInMonth = new ScheduleTablePaginationStrategy(null)
      .calcDaysInMonth(moment('2020-02-02'), getMockSpecCalDates());
    generator.generate(null, null, getMockSchedulerRowData(daysInMonth), daysInMonth,
      getMockSummationColumns(), getMockDecorationData(), null)
      .then(buffer => {
        let blob = new Blob([buffer], {type: blobType});
        FileSaver.saveAs(blob, 'test.xlsx');
      })
      .catch(reason => console.error(reason));
    });

  it('sheet', () => {
    const generator = new ReportGenerator();
    const daysInMonth = new ScheduleTablePaginationStrategy(null)
      .calcDaysInMonth(moment('2020-02-02'), getMockSpecCalDates());
    generator.generate(null, null, getMockTimeSheetRowData(daysInMonth), daysInMonth,
      getMockSummationColumns(), getMockDecorationData(), null)
      .then(buffer => {
        let blob = new Blob([buffer], {type: blobType});
        FileSaver.saveAs(blob, 'test.xlsx');
      })
      .catch(reason => console.error(reason));
  });
});

function getMockSchedulerRowData(daysInMonth: CalendarDay[]): ReportRowData[] {
  let result = [];

  for (let idx = 0; idx < 50; idx++) {
    let data = new ReportRowData();
    data.name = 'Secondname F.F.';
    data.position = 'Position';
    data.cellData = [];
    for (let i = 0; i < daysInMonth.length; i++) {
      const cell = <CellData> {value: 8.25};
      data.cellData.push(cell);
    }
    data.summationResults = [
      {
        summationColumnId: 20,
        value: 22,
        type: ''
      },
      {
        summationColumnId: 20,
        value: 22,
        type: ''
      }];
    result.push(data);
  }

  return result;
}

function getMockTimeSheetRowData(daysInMonth: CalendarDay[]): ReportRowData[] {
  let result = [];

  for (let idx = 0; idx < 50; idx++) {
    let data = new ReportRowData();
    data.name = 'Secondname F.F.';
    data.position = 'Position';
    data.cellData = [];
    for (let i = 0; i < daysInMonth.length; i++) {
      const cell = <CellData> {value: ['D', 11]};
      data.cellData.push(cell);
    }
    data.summationResults = [
      {
        summationColumnId: 20,
        value: 22,
        type: ''
      },
      {
        summationColumnId: 20,
        value: 22,
        type: ''
      }];
    result.push(data);
  }

  return result;
}

function getMockSummationColumns(): SummationColumn[] {
  return [
    {
      id: 20,
      specialCalendarDateTypes: [''],
      columnType: '',
      onlyHolidays: false,
      name: 'Факт. явок'
    },
    {
      id: 21,
      specialCalendarDateTypes: [''],
      columnType: '',
      onlyHolidays: false,
      name: 'Норма явок'
    }
  ];
}

function getMockSpecCalDates(): SpecialCalendarDate[] {
  return [
    {
      id: 1,
      dateType: HOLIDAY,
      date: '2020-01-01',
      name: 'New Year',
    },
    {
      id: 2,
      dateType: EXTRA_WEEKEND,
      date: '2020-01-02',
      name: 'EXWEEK',
    }];
}

function getMockDecorationData(): DecorationData {
  return {
    agreedPerson: 'М.В. Туркот',
    agreedPosition: 'Голова ПАРРИЗ',
    approvedPerson: 'Є.В. Грубін',
    approvedPosition: 'Начальник служби АОПР',
    month: 'січень',
    year: 2020,
    schedAndServiceName: 'роботи персоналу обєктів служби АОПР',
    documentCreators: [
      {
        position: 'Провідний інженер з АС УПР',
        name: 'О.В. Нестругін'
      },
      {
        position: 'Провідний інженер з АС УПР',
        name: 'В.А. Григорьянц'
      }
    ]
  }
}
