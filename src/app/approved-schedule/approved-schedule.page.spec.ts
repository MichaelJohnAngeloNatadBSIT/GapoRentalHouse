import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovedSchedulePage } from './approved-schedule.page';

describe('ApprovedSchedulePage', () => {
  let component: ApprovedSchedulePage;
  let fixture: ComponentFixture<ApprovedSchedulePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovedSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
