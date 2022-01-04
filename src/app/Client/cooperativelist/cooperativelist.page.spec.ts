import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CooperativelistPage } from './cooperativelist.page';

describe('CooperativelistPage', () => {
  let component: CooperativelistPage;
  let fixture: ComponentFixture<CooperativelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CooperativelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
