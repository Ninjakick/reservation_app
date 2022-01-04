import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouveauclientPage } from './nouveauclient.page';

describe('NouveauclientPage', () => {
  let component: NouveauclientPage;
  let fixture: ComponentFixture<NouveauclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauclientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
