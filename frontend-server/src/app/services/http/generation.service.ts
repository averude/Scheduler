import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { GenerationDto } from "../../model/dto/generation-dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class GenerationService {

  constructor(private config: RestConfig,
              private http: HttpClient){}

  generateSchedule(enterpriseId: number,
                   departmentId: number,
                   generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/generation/schedule`,
      generationDto,
      {responseType: 'text'}
    );
  }

  generateWorkingNorm(enterpriseId: number,
                      departmentId: number,
                      generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/generation/working_norm`,
      generationDto,
      {responseType: 'text'}
    );
  }
}
