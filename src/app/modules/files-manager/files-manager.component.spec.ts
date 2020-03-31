import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Helper } from '../../core/services/helper.service';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { FilesManagerComponent } from './files-manager.component';
import { FilesManagerService } from './services/files-manager.service';

describe('FilesManagerComponent', () => {
  let component: FilesManagerComponent;
  let fixture: ComponentFixture<FilesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilesManagerComponent, DragDropComponent],
      imports: [SharedModuleModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: Helper, useClass: Helper },
        { provide: FilesManagerService, useClass: FilesManagerService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
