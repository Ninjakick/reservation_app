import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouveaucooperativePage } from './nouveaucooperative.page';

describe('NouveaucooperativePage', () => {
  let component: NouveaucooperativePage;
  let fixture: ComponentFixture<NouveaucooperativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveaucooperativePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouveaucooperativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
