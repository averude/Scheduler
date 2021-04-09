import { StatisticsTableDataCollector } from "./statistics-table-data-collector";
import { Position } from "../../../model/position";
import { Shift } from "../../../model/shift";
import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";

const DTOS: EmployeeWorkStatDTO[] = [
  {
    employee: {
      id: 1,
      firstName: 'First Name',
      secondName: 'Second Name',
      patronymic: 'Patronymic',
      position: null
    },
    shiftId:    1,
    positionStats: [
      {
        positionId: 1,
        summations: [
          {
            summationColumnId: 1,
            value: 10,
            type: 'hours_sum',
          }
        ]
      }
    ]
  },
  {
    employee: {
      id: 1,
      firstName: 'First Name',
      secondName: 'Second Name',
      patronymic: 'Patronymic',
      position: null
    },
    shiftId:    1,
    positionStats: [
      {
        positionId: 2,
        summations: [
          {
            summationColumnId: 1,
            value: 10,
            type: 'hours_sum',
          }
        ],
      }
    ]
  },
  {
    employee: {
      id: 3,
      firstName: 'First Name',
      secondName: 'Second Name',
      patronymic: 'Patronymic',
      position: null
    },
    shiftId:    1,
    positionStats: [
      {
        positionId: 1,
        summations: [
          {
            summationColumnId: 1,
            value: 10,
            type: 'hours_sum',
          }
        ]
      }
    ]
  }
];

const POSITIONS: Position[] = [
  {
    id: 1,
    name: 'Position 1',
    shortName: "POS 1"
  },
  {
    id: 2,
    name: 'Position 2',
    shortName: "POS 2"
  },
  {
    id: 3,
    name: 'Position 3',
    shortName: "POS 3"
  }
];

const SHIFTS: Shift[] = [
  {
    id: 1,
    name: "Shift 1",
    shiftPatternId: 1,
  },
  {
    id: 2,
    name: "Shift 2",
    shiftPatternId: 1,
  }
];


describe('Statistics table data collector', () => {

  let collector = new StatisticsTableDataCollector();
  const tableData = collector.getTableData(DTOS, SHIFTS, POSITIONS);
  console.log(tableData);

});
