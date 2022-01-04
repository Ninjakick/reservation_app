import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyagedetailadminPage } from './voyagedetailadmin.page';

describe('VoyagedetailadminPage', () => {
  let component: VoyagedetailadminPage;
  let fixture: ComponentFixture<VoyagedetailadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyagedetailadminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyagedetailadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
