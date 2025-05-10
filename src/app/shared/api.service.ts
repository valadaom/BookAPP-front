import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.api}/${endpoint}`);
  }

  getById<T>(endpoint: string, id: number) {
    return this.http.get<T>(`${this.api}/${endpoint}/${id}`);
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.api}/${endpoint}`, body);
  }

  put<T>(endpoint: string, id: number, body: any) {
    return this.http.put<T>(`${this.api}/${endpoint}/${id}`, body);
  }

  delete<T>(endpoint: string, id: number) {
    return this.http.delete<T>(`${this.api}/${endpoint}/${id}`);
  }
}
