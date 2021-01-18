import { StatisticsTableDataCollector } from "./statistics-table-data-collector";
import { SummationDto } from "../../../model/dto/summation-dto";
import { Position } from "../../../model/position";
import { Shift } from "../../../model/shift";


const DTOS: SummationDto[] = [
  {
    id: 1,
    parent: {
      id: 1,
      firstName: 'First Name',
      secondName: 'Second Name',
      patronymic: 'Patronymic',
      position: null
    },
    collection: [
      {
        summationColumnId: 1,
        value: 10,
        type: 'hours_sum',
      }
    ],
    from: null,
    to: null,
    positionId: 1,
    shiftId:    1,
  },
  {
    id: 1,
    parent: {
      id: 1,
      firstName: 'First Name',
      secondName: 'Second Name',
      patronymic: 'Patronymic',
      position: null
    },
    collection: [
      {
        summationColumnId: 1,
        value: 10,
        type: 'hours_sum',
      }
    ],
    from: null,
    to: null,
    positionId: 2,
    shiftId:    1,
  },
  {
    id: 3,
    parent: {
      id: 3,
      firstName: 'First Name',
      secondName: 'Second Name',
      patronymic: 'Patronymic',
      position: null
    },
    collection: [
      {
        summationColumnId: 1,
        value: 10,
        type: 'hours_sum',
      }
    ],
    from: null,
    to: null,
    positionId: 1,
    shiftId:    1,
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
