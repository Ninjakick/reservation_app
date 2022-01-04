import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouveauvoyagePage } from './nouveauvoyage.page';

describe('NouveauvoyagePage', () => {
  let component: NouveauvoyagePage;
  let fixture: ComponentFixture<NouveauvoyagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauvoyagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauvoyagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
