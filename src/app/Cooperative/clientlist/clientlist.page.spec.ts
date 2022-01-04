import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientlistPage } from './clientlist.page';

describe('ClientlistPage', () => {
  let component: ClientlistPage;
  let fixture: ComponentFixture<ClientlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
