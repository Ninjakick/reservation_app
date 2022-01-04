import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyagelistPage } from './voyagelist.page';

describe('VoyagelistPage', () => {
  let component: VoyagelistPage;
  let fixture: ComponentFixture<VoyagelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyagelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyagelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
