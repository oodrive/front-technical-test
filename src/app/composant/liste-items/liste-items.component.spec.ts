import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeItemsComponent } from './liste-items.component';

describe('ListeItemsComponent', () => {
  let component: ListeItemsComponent;
  let fixture: ComponentFixture<ListeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
