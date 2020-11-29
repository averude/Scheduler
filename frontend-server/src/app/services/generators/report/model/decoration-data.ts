export class DecorationData {
  agreedPerson: string;
  agreedPosition: string;
  year: number;
  month: string;
  approvedPosition: string;
  approvedPerson: string;
  schedAndServiceName: string;
  documentCreators: DocumentCreator[];
  agreed?: HeaderSectionData;
  approved?: HeaderSectionData;
}

export class DocumentCreator {
  position: string;
  name: string;
}

export interface HeaderSectionData {
  label: string;
  position: string;
  person: string;
  year: number
}
