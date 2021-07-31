import { ACrudService } from "../abstract-service/a-crud-service";
import { NewUserAccountDTO, UserAccountDTO } from "../../../model/dto/user-account-dto";
import { CUDService } from "../interface/cud-service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../../rest.config";
import { Observable } from "rxjs";
import { PasswordResetDTO } from "../../../model/dto/password-reset-dto";
import { HasDepartmentIdService } from "../interface/has-department-id.service";

@Injectable()
export class ShiftUserAccountService
  extends ACrudService<UserAccountDTO>
  implements CUDService<UserAccountDTO>, HasDepartmentIdService<UserAccountDTO> {

  constructor(private config: RestConfig,
              http: HttpClient) {
    super(`${config.baseUrl}/uaa/users/shifts`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<UserAccountDTO[]> {
    return this.http.get<UserAccountDTO[]>(
      `${this.url}/departments/${departmentId}`
    );
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

  resetPassword(userAccountId: number,
                passwordResetDTO: PasswordResetDTO): Observable<any> {
    return this.http.put<string>(
      `${this.url}/${userAccountId}/password`,
      passwordResetDTO
    );
  }
}
