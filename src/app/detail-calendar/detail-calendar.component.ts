import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Schedule } from '../schedule/schedule.model';

@Component({
  selector: 'app-detail-calendar',
  templateUrl: './detail-calendar.component.html',
  styleUrls: ['./detail-calendar.component.scss'],
})
export class DetailCalendarComponent implements OnInit {
  @Input() schedule:Schedule;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
