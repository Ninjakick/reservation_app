import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailcooperativePage } from './detailcooperative.page';

describe('DetailcooperativePage', () => {
  let component: DetailcooperativePage;
  let fixture: ComponentFixture<DetailcooperativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcooperativePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailcooperativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
