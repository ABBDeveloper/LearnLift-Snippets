import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIFunctionService {

  constructor(private http: HttpClient) { }

  callFirebaseFunction() {
   // Privater Code
  }

  createCards(topic: string, language: string, numberOfCards: number): Observable<any> {
    // Privater Code
  }