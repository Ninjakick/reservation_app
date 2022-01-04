import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouveltarifPage } from './nouveltarif.page';

describe('NouveltarifPage', () => {
  let component: NouveltarifPage;
  let fixture: ComponentFixture<NouveltarifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveltarifPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouveltarifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
