import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropComponent } from './drag-drop.component';
import { SharedModuleModule } from '../../../../shared/shared-module/shared-module.module';

describe('DragDropComponent', () => {
  let component: DragDropComponent;
  let fixture: ComponentFixture<DragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragDropComponent],
      imports: [SharedModuleModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
