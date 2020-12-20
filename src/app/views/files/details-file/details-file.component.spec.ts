import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFileComponent } from './details-file.component';

describe('DetailsFileComponent', () => {
  let component: DetailsFileComponent;
  let fixture: ComponentFixture<DetailsFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
