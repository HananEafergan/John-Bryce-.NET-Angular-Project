import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, take, tap } from 'rxjs';
import { Branch } from '../model/branch.model';
import { ManageBranchesApiService } from './manage-branches-api.service';

@Injectable()
export class ManageBranchesStoreService {
  private branchesSubject: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get branches$() {
    return this.branchesSubject.asObservable();
  }

  get errors$() {
    return this.errorSubject.asObservable();
  }

  setBranches(value: Branch[]) {
    this.branchesSubject.next(value);
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  constructor(private readonly apiService: ManageBranchesApiService) { }

  getBranches() {
    this.apiService.getBranches().pipe(take(1), tap(res =>
      this.setBranches(res)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  addBranch(branch: Branch) {
    this.apiService.addBranch(branch).pipe(take(1), tap(() =>
      this.getBranches()), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  updateBranch(branch: Branch) {
    this.apiService.updateBranch(branch).pipe(take(1), tap(() =>
      this.getBranches()), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  deleteBranch(branchId: string) {
    this.apiService.deleteBranch(branchId).pipe(take(1), tap(() =>
      this.getBranches()), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }
}
