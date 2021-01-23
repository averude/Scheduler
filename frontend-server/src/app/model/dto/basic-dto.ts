import { IdEntity } from "../interface/id-entity";

export class BasicDTO<E extends IdEntity, C> implements IdEntity {
  parent:     E;
  collection: C[];

  get id(): number {
    return this.parent.id;
  }

  set id(id: number) {
    this.parent.id = id;
  }
}
