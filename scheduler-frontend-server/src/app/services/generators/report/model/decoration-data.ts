export class DecorationData {
  agreedPerson: string;
  agreedPosition: string;
  year: number;
  month: string;
  approvedPosition: string;
  approvedPerson: string;
  schedAndServiceName: string;
  documentCreators: DocumentCreator[];
}

export class DocumentCreator {
  position: string;
  name: string;
}
