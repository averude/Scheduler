import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { GenerationDto } from "../../model/dto/generation-dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class GenerationService {

  constructor(private config: RestConfig,
              private http: HttpClient){}

  generateSchedule(departmentId: number,
                   generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/generation/schedule/${departmentId}`,
      generationDto,
      {responseType: 'text'}
    );
  }

  generateWorkingNorm(departmentId: number,
                      generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/generation/working_norm/${departmentId}`,
      generationDto,
      {responseType: 'text'}
    );
  }
}
