import { Alignment, Borders, Fill } from "exceljs";

export const topMediumBorders: Partial<Borders> = {
  top: {style: "medium"}
};

export const topMediumLeftRightDottedBorders: Partial<Borders> = {
  top: {style: "medium"},
  left: {style: "dotted"},
  right: {style: "dotted"}
};

export const topMediumLeftRightThinBorders: Partial<Borders> = {
  top: {style: 'medium'},
  left: {style: "thin"},
  right: {style: "thin"}
};

export const topLeftRightMediumBorders: Partial<Borders> = {
  top: {style: "medium"},
  left: {style: "medium"},
  right: {style: "medium"}
};

export const leftRightBottomMediumBorders: Partial<Borders> = {
  left: {style: "medium"},
  right: {style: "medium"},
  bottom: {style: "medium"}
};

export const leftRightMediumBorders: Partial<Borders> = {
  left: {style: "medium"},
  right: {style: "medium"}
};

export const leftRightMediumTopBottomThinBorders: Partial<Borders> = {
  top: {style:'thin'},
  left: {style: "medium"},
  right: {style: "medium"},
  bottom: {style:'thin'}
};

export const leftRightBottomMediumTopThinBorders: Partial<Borders> = {
  top: {style:'thin'},
  left: {style: "medium"},
  right: {style: "medium"},
  bottom: {style:'medium'}
};

export const bottomThinBorders: Partial<Borders> = {
  bottom: {style: 'thin'}
};

export const bottomMediumBorders: Partial<Borders> = {
  bottom: {style: 'medium'}
};

export const bottomMediumLeftRightDottedBorders: Partial<Borders> = {
  bottom: {style: 'medium'},
  left: {style: "dotted"},
  right: {style: "dotted"}
};

export const thinBorders: Partial<Borders> = {
  top: {style:'thin'},
  left: {style:'thin'},
  bottom: {style:'thin'},
  right: {style:'thin'}
};

export const dottedBorders: Partial<Borders> = {
  top: {style:'dotted'},
  left: {style:'dotted'},
  bottom: {style:'dotted'},
  right: {style:'dotted'}
};

export const leftRightTopDottedBottomThinBorders: Partial<Borders> = {
  top: {style:'dotted'},
  left: {style:'dotted'},
  bottom: {style:'thin'},
  right: {style:'dotted'}
};

export const leftRightThinTopBottomDottedBorders: Partial<Borders> = {
  top: {style:'dotted'},
  left: {style:'thin'},
  bottom: {style:'dotted'},
  right: {style:'thin'}
};

export const leftRightBottomThinTopDottedBorders: Partial<Borders> = {
  top: {style:'dotted'},
  left: {style:'thin'},
  bottom: {style:'thin'},
  right: {style:'thin'}
};

export const leftRightMediumTopBottomDottedBorders: Partial<Borders> = {
  top: {style:'dotted'},
  left: {style:'medium'},
  bottom: {style:'dotted'},
  right: {style:'medium'}
};

export const leftRightMediumTopDottedBottomThinBorders: Partial<Borders> = {
  top: {style:'dotted'},
  left: {style:'medium'},
  bottom: {style:'thin'},
  right: {style:'medium'}
};

export const leftRightThinBottomMediumBorders: Partial<Borders> = {
  left: {style:'thin'},
  bottom: {style:'medium'},
  right: {style:'thin'}
};

export const mediumBorders: Partial<Borders> = {
  top: {style:'medium'},
  left: {style:'medium'},
  bottom: {style:'medium'},
  right: {style:'medium'}
};

export const leftAlign: Partial<Alignment> = {
  horizontal: "left"
};

export const rightAlign: Partial<Alignment> = {
  horizontal: "right"
};

export const centerAlign: Partial<Alignment> = {
  horizontal: 'center'
};

export const centerMiddleAlign: Partial<Alignment> = {
  horizontal: "center",
  vertical: "middle"
};

export const centerAlignVertRotation: Partial<Alignment> = {
  horizontal: "center",
  vertical: "middle",
  textRotation: 90
};

export const weekendFill: Fill = {
  type: "pattern",
  pattern: 'solid',
  fgColor: {argb:'CCFFFF'}
};

export const holidayFill: Fill = {
  type: "pattern",
  pattern: 'solid',
  fgColor: {argb:'FF99CC'}
};

export const arialCyrSize8 = {
  name: 'Arial Cyr',
  size: 8
};

export const arialCyrSize10 = {
  name: 'Arial Cyr',
  size: 10
};

export const greyArialCyrSize10 = {
  name: 'Arial Cyr',
  size: 10,
  color: { argb: 'a1a1a1' }
};

export const arialCyrBoldSize10 = {
  name: 'Arial Cyr',
  size: 10,
  bold: true
};

export const arialCyrSize12 = {
  name: 'Arial Cyr',
  size: 12
};

export const arialCyrSize14 = {
  name: 'Arial Cyr',
  size: 14
};

export const arialCyrBoldSize16 = {
  name: 'Arial Cyr',
  size: 16,
  bold: true
};

export const scheduleDataFont = {
  name: 'Tahoma',
  size: 10
};

export const disabledScheduleDataFont = {
  name: 'Tahoma',
  size: 10,
  color: { argb: 'a1a1a1' }
};
