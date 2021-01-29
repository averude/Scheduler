import { ACrudService } from "../abstract-service/a-crud-service";
import { NewUserAccountDTO, UserAccountDTO } from "../../../model/dto/new-user-account-dto";
import { IByAuthService } from "../interface/i-by-auth.service";
import { CUDService } from "../interface/cud-service";
import { RestConfig } from "../../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DepartmentUserAccountService
  extends ACrudService<UserAccountDTO>
  implements IByAuthService<UserAccountDTO>, CUDService<UserAccountDTO> {

  constructor(private config: RestConfig,
              http: HttpClient) {
    super(`${config.baseUrl}/uaa/users/department_admins`, http);
  }

  create(userAccountDTO: NewUserAccountDTO): Observable<any> {
    return this.http.post<UserAccountDTO>(
      `${this.url}`,
      userAccountDTO
    );
  }

  update(userAccountDTO: UserAccountDTO): Observable<UserAccountDTO> {
    return this.http.put<UserAccountDTO>(
      `${this.url}`,
      userAccountDTO
    );
  }
}
