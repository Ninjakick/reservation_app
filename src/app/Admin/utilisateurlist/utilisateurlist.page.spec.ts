import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilisateurlistPage } from './utilisateurlist.page';

describe('UtilisateurlistPage', () => {
  let component: UtilisateurlistPage;
  let fixture: ComponentFixture<UtilisateurlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateurlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilisateurlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
