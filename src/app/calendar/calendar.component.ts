import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // Dummy data for calendar
  calendar: (number | null)[][] = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
    [null, null, null, null, null, null, null]
  ];
  selectedDate: Date = new Date();
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  selectedColor: string = '';
  dialogRef!: MatDialogRef<any>;
  @ViewChild('calendereventadd', { static: true }) calendereventadd!: TemplateRef<any>;
  calendarEventForm!: FormGroup;
  monthNames: string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showFullYearCalendar: boolean = false;
  yearRange: string = '';
  showPopup: boolean = false;
  isLoading: boolean = false;
  events: any[] = []; // Dummy events data, empty for now
  colorOptions: any[] = [
    { value: '#05005F', color: 'orangecolor' },
    { value: '#FF545D', color: 'accent' },
    { value: '#50BFA5', color: 'primary' },
    { value: 'yellow', color: 'warn' }
  ];
  SUNDAY_COLOR: string = '#FFD700'; // Define a specific color for Sundays
  enterprisenameid: any = 'dummyEnterpriseId'; // Dummy enterprise ID

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.calendarEventForm = this.fb.group({
      Title: [''],
      Description: [''],
      Colour: [''],
      Start_Date: [''],
      End_Date: ['']
    });

    this.generateCalendar(this.currentMonth, this.currentYear);
    this.updateYearRange();
  }

  openPopup() {
    this.dialogRef = this.dialog.open(this.calendereventadd, {
      width: '60%',
      height: 'auto'
    });
  }

  setColor(color: string): void {
    this.selectedColor = color;
    this.calendarEventForm.patchValue({ Colour: color });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  isDateInRange(day: number, month: number): boolean {
    return false; // Dummy implementation, always returns false
  }

  getEventColor(day: number | null, month: number): string | null {
    if (day === null) return null;

    const date = new Date(this.currentYear, month, day);

    if (date.getDay() === 0) {
      return this.SUNDAY_COLOR;
    }

    return null; // No events to color
  }

  getEventsForMonth(monthIndex: number, year: number): any[] {
    return []; // Return empty array as no events are present
  }

  selectDate(day: number | null) {
    if (day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    }
  }
  onSubmit(): void {
    if (this.calendarEventForm.valid) {
      // Handle form submission
      console.log(this.calendarEventForm.value);
    }
  }
  generateCalendar(month: number, year: number) {
    // Static calendar data provided above
    // In real application, this should dynamically generate based on month and year
  }

  generateCalendarForMonth(month: number): (number | null)[][] {
    return this.calendar; // Return static calendar data
  }

  generateCalendarForYear(year: number): (number | null)[][][] {
    return [this.generateCalendarForMonth(this.currentMonth)]; // Return static data for current month
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
    this.updateYearRange();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
    this.updateYearRange();
  }

  toggleFullYearCalendar() {
    this.showFullYearCalendar = !this.showFullYearCalendar;
    this.updateYearRange();
  }

  toggleMonthCalendar() {
    this.showFullYearCalendar = false;
    this.generateCalendar(this.currentMonth, this.currentYear);
    this.updateYearRange();
  }

  updateYearRange() {
    this.yearRange = `${this.currentYear}-${this.currentYear + 1}`;
  }

  prevYear() {
    this.currentYear--;
    this.generateCalendarForYear(this.currentYear);
    this.updateYearRange();
  }

  nextYear() {
    this.currentYear++;
    this.generateCalendarForYear(this.currentYear);
    this.updateYearRange();
  }

  isToday(day: number | null, month: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    this.dialogRef.close();
  }

  isSunday(day: number, month: number): boolean {
    if (day === null) return false;
    const date = new Date(this.currentYear, month, day);
    return date.getDay() === 0;
  }
}
