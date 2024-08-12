import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AddStaffComponent} from "../add-staff/add-staff.component";
import {EditStaffComponent} from "../edit-staff/edit-staff.component";
import {StaffService} from "../../../services/staff.service";
import {Staff} from "../../../models/Staff.model";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'ssi-sx-staff-list',
  standalone: true,
  imports: [ AddStaffComponent, EditStaffComponent ,CommonModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent implements OnInit{



  currentPage: number = 1;
  itemsPerPage: number = 10;
  staffMembers : Staff[]=[];


  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    // this.loadStaffMembers();
    this.staffService.staffMembers$.subscribe(data => {
      this.staffMembers = data;
    });
    console.log(this.staffMembers)
  }



  editStaff(staffMember :Staff){
    this.staffService.setStaffMemberToEdit(staffMember);
  }
  deleteStaffMember(id: number): void {
    this.staffService.deleteStaffMember(id);
  }
  get totalItems(): number {
    return this.staffMembers.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.staffMembers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

}