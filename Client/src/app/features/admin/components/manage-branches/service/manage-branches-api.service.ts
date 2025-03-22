import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Branch } from '../model/branch.model';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ManageBranchesApiService {
  private apiUrl: string = `${environment.apiUrl}/Branches`

  constructor(private readonly http: HttpClient) { }

  getBranches() {
    return this.http.get<Branch[]>(`${this.apiUrl}/GetBranches`).pipe(catchError(this.handleError));
  }

  deleteBranch(branchId: string) {
    return this.http.get<boolean>(`${this.apiUrl}/DeleteBranch/${branchId}`).pipe(catchError(this.handleError));
  }

  updateBranch(branch: Branch) {
    return this.http.post<boolean>(`${this.apiUrl}/UpdateBranch`, branch).pipe(catchError(this.handleError));
  }

  addBranch(branch: Branch) {
    return this.http.post<boolean>(`${this.apiUrl}/AddBranch`, branch).pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
