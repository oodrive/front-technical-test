import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFileComponent } from './post-file.component';

describe('PostFileComponent', () => {
  let component: PostFileComponent;
  let fixture: ComponentFixture<PostFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
