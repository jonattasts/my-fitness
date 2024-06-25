import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('userName') inputText: IonInput;

  setInputTextFocus() {
    this.inputText.setFocus();
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.setInputTextFocus();
  }
  
  public goConfirmationPage() {
    this.router.navigate(['confirmation']);
  }
}
