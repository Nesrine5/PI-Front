import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEvaluationComponent } from './file-evaluation.component';

describe('FileEvaluationComponent', () => {
  let component: FileEvaluationComponent;
  let fixture: ComponentFixture<FileEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
