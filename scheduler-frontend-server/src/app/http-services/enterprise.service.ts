import { Injectable } from "@angular/core";
import { IByAuthService } from "./interface/i-by-auth.service";
import { Enterprise } from "../model/enterprise";
import { CUDService } from "./interface/cud-service";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";

@Injectable({providedIn: 'root'})
export class EnterpriseService implements IByAuthService<Enterprise>, CUDService<Enterprise> {
  private readonly url: string;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    this.url = `${this.config.baseUrl}/admin/enterprises`;
  }

  getAllByAuth(): Observable<Enterprise[]> {
    let user = this.authService.currentUserValue;
    if (user.roles.indexOf('GLOBAL_ADMIN') >= 0) {
      return this.getAll();
    }
  }

  getAll(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(this.url);
  }

  create(enterprise: Enterprise): Observable<any> {
    return this.http.post<number>(this.url, enterprise);
  }

  update(enterprise: Enterprise): Observable<any> {
    return this.http.put(this.url, enterprise, {responseType: 'text'});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }
}
