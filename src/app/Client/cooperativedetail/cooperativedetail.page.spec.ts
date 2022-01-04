import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CooperativedetailPage } from './cooperativedetail.page';

describe('CooperativedetailPage', () => {
  let component: CooperativedetailPage;
  let fixture: ComponentFixture<CooperativedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CooperativedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
