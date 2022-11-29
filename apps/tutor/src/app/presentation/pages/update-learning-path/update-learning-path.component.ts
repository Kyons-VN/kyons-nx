import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Student } from '@infrastructure/models/student';
import { StudentService } from '@infrastructure/student.service';

export interface LearningPathTable {
  id: string;
  difficulty_id: number;
  learning_point: string;
  topic: string;
  program: string;
}

@Component({
  templateUrl: './update-learning-path.component.html',
  styleUrls: ['./update-learning-path.component.scss']
})
export class UpdateLearningPathComponent implements OnInit {
  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location) { }

  lPDList: LearningPathTable[] = [];
  displayedColumns: string[] = ['select', 'id', 'topic', 'learning_point', 'difficulty_id', 'program'];
  dataSource = new MatTableDataSource<LearningPathTable>([]);
  selection = new SelectionModel<LearningPathTable>(true, []);
  studentId!: string;
  testId!: string;
  studentName = '';
  lPFilter = '';
  programFilter = '';
  combineFilter: { [name: string]: string } = {};

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentId') ?? '';
    this.testId = this.route.snapshot.paramMap.get('testId') ?? '';
    this.studentService.getLPDs(this.studentId).subscribe({
      next: (data) => {
        this.dataSource.data = data.map((row) => {
          row.search_index = `${row.learning_point} ${row.program}`.toLocaleLowerCase();
          return row;
        });
      },
      complete: () => {
        // TODO: Stop loading
      },
    });
    this.studentService.getStudentInfo(this.studentId).subscribe({
      next: (student: Student) => {
        this.studentName = student.getFullName();
      }
    });
    this.dataSource.filterPredicate = ((record, _) => {
      if (this.lPFilter == '' && this.programFilter == '') return true;
      let matchLP = true;
      if (this.lPFilter != '') {
        const lPFilterKeys = this.lPFilter.toLocaleLowerCase().split(' ');
        matchLP = lPFilterKeys.map((key) => record.learning_point.toLocaleLowerCase().includes(key)).reduce((acc, next) => acc || next);
      }
      let matchProgram = true;
      if (this.programFilter != '') {
        const programFilterKeys = this.programFilter.toLocaleLowerCase().split(' ');
        matchProgram = programFilterKeys.map((key) => record.program.toLocaleLowerCase().includes(key)).reduce((acc, next) => acc || next);
      }
      return matchLP && matchProgram;
    });
  }

  create() {
    const lPDList = this.selection.selected.map((item) => Number(item.id));
    this.studentService.updateLearningPath(lPDList, this.testId).subscribe({
      next: (success) => {
        alert('Đã tạo bài học mới thành công.');
        this.location.back();
      }
    });
  }

  applyFilter(event: Event, filterType: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.combineFilter[filterType] = filterValue;
    this.dataSource.filter = JSON.stringify(this.combineFilter);
  }

  clearFilter(filterType: string) {
    delete this.combineFilter[filterType];
    this.dataSource.filter = JSON.stringify(this.combineFilter);
  }
}
