import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from './model/branch.model';
import { ManageBranchesStoreService } from './service/manage-branches-store.service';
import { ManageBranchesApiService } from './service/manage-branches-api.service';

@Component({
  selector: 'app-manage-branches',
  standalone: false,
  templateUrl: './manage-branches.component.html',
  styleUrl: './manage-branches.component.scss',
  providers: [ManageBranchesApiService, ManageBranchesStoreService]
})
export class ManageBranchesComponent implements OnInit {
  branches$!:Observable<Branch[]>;
  err$!: Observable<string>;
  isAddBranch: boolean = false;
  
  
  constructor(private readonly storeService: ManageBranchesStoreService) { }
  ngOnInit(): void {
    this.branches$ = this.storeService.branches$;
    this.storeService.getBranches();
  }

  addBranch(){
    this.isAddBranch = true;
  }
}
