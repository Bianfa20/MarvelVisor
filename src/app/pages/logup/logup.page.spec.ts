import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogupPage } from './logup.page';

describe('LogupPage', () => {
  let component: LogupPage;
  let fixture: ComponentFixture<LogupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
