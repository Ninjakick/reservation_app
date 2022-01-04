import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailclientPage } from './detailclient.page';

describe('DetailclientPage', () => {
  let component: DetailclientPage;
  let fixture: ComponentFixture<DetailclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailclientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
