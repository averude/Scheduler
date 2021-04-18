import { ACrudService } from "../abstract-service/a-crud-service";
import { NewUserAccountDTO, UserAccountDTO } from "../../../model/dto/user-account-dto";
import { CUDService } from "../interface/cud-service";
import { RestConfig } from "../../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PasswordResetDTO } from "../../../model/dto/password-reset-dto";
import { HasEnterpriseIdService } from "../interface/has-enterprise-id.service";

@Injectable()
export class DepartmentUserAccountService
  extends ACrudService<UserAccountDTO>
  implements CUDService<UserAccountDTO>, HasEnterpriseIdService<UserAccountDTO> {

  constructor(private config: RestConfig,
              http: HttpClient) {
    super(`${config.baseUrl}/uaa/users/department_admins`, http);
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<UserAccountDTO[]> {
    return this.http.get<UserAccountDTO[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }

  create(userAccountDTO: NewUserAccountDTO): Observable<UserAccountDTO> {
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
