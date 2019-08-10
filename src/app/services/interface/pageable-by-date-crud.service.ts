import { CrudService } from "./crud.service";
import { Observable } from "rxjs";

export interface PageableByDateCrudService<T> extends CrudService<T> {
  getAllByDate(from: string, to: string): Observable<T[]>;
}
