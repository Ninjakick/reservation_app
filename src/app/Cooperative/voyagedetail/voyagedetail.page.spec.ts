import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyagedetailPage } from './voyagedetail.page';

describe('VoyagedetailPage', () => {
  let component: VoyagedetailPage;
  let fixture: ComponentFixture<VoyagedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyagedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyagedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
