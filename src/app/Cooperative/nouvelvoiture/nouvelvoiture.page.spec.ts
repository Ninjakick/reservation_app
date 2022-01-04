import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouvelvoiturePage } from './nouvelvoiture.page';

describe('NouvelvoiturePage', () => {
  let component: NouvelvoiturePage;
  let fixture: ComponentFixture<NouvelvoiturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelvoiturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelvoiturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
