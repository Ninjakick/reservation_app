import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoiturelistPage } from './voiturelist.page';

describe('VoiturelistPage', () => {
  let component: VoiturelistPage;
  let fixture: ComponentFixture<VoiturelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiturelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoiturelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
