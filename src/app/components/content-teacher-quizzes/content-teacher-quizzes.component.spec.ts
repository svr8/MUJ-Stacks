import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTeacherQuizzesComponent } from './content-teacher-quizzes.component';

describe('ContentTeacherQuizzesComponent', () => {
  let component: ContentTeacherQuizzesComponent;
  let fixture: ComponentFixture<ContentTeacherQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTeacherQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTeacherQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
