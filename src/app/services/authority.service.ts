import { Authority } from "../model/authority";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<Authority[]> {
    return this.http.get<Authority[]>(
      `${this.config.baseUrl}/uaa/authorities`
    );
  }
}
