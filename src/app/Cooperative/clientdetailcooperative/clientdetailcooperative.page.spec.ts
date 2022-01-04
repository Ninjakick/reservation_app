import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientdetailcooperativePage } from './clientdetailcooperative.page';

describe('ClientdetailcooperativePage', () => {
  let component: ClientdetailcooperativePage;
  let fixture: ComponentFixture<ClientdetailcooperativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdetailcooperativePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientdetailcooperativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
