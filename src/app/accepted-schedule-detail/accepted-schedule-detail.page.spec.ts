import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptedScheduleDetailPage } from './accepted-schedule-detail.page';

describe('AcceptedScheduleDetailPage', () => {
  let component: AcceptedScheduleDetailPage;
  let fixture: ComponentFixture<AcceptedScheduleDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedScheduleDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptedScheduleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
