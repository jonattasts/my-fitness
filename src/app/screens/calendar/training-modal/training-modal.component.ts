import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { IonModal } from '@ionic/angular';

@Component({
  selector: 'training-modal',
  templateUrl: './training-modal.component.html',
  styleUrls: ['./training-modal.component.scss'],
})
export class TrainingModal implements OnInit {
  @ViewChild('trainingModal') trainingModal: IonModal;

  @Output() public isModalClosed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  close() {
    this.trainingModal.dismiss(null, 'cancel');
  }

  confirm() {
    this.trainingModal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.isModalClosed.emit(false);
  }
}
