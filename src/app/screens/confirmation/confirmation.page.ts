import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public goCalendarPage() {
    this.router.navigate(['tabs/calendar']);
  }
}
