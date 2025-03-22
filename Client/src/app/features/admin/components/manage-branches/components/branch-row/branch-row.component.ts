import { Component, Input, Output, EventEmitter, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageBranchesStoreService } from '../../service/manage-branches-store.service';
import { Branch } from '../../model/branch.model';

@Component({
  selector: 'app-branch-row',
  standalone: false,
  templateUrl: './branch-row.component.html',
  styleUrls: ['./branch-row.component.scss']
})
export class BranchRowComponent implements OnInit {
  @Input() branch!: Branch;
  @Input() addBranch: boolean = false;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  branchForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private readonly store: ManageBranchesStoreService) { }

  ngOnInit() {
    this.branchForm = this.fb.group({
      name: [this.branch?.Name, Validators.required],
      address: [this.branch?.Address, Validators.required],
      latitude: [this.branch?.Latitude, Validators.required],
      longitude: [this.branch?.Longitude, Validators.required]
    });
  }

  toggleEdit(editing: boolean) {
    this.isEditMode = editing;
    if (this.addBranch) {
      this.cancel.emit(true);
    }

  }

  saveBranch() {
    if (this.branchForm.valid) {
      const branch: Branch = {
        BranchID: this.addBranch ? '' : this.branch.BranchID,
        Name: this.branchForm.controls['name'].value,
        Address: this.branchForm.controls['address'].value,
        Latitude: this.branchForm.controls['latitude'].value,
        Longitude: this.branchForm.controls['longitude'].value
      };
      if (this.addBranch) {
        this.store.addBranch(branch);
        this.cancel.emit(true);
      }
      else this.store.updateBranch(branch);
    }
  }

  deleteBranch() {
    if (confirm(`Are you sure you want to delete ${this.branch.Name}?`)) {
      this.store.deleteBranch(this.branch.BranchID + '');
    }
  }
}