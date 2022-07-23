import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovedScheduleDetailPage } from './approved-schedule-detail.page';

describe('ApprovedScheduleDetailPage', () => {
  let component: ApprovedScheduleDetailPage;
  let fixture: ComponentFixture<ApprovedScheduleDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedScheduleDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovedScheduleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
