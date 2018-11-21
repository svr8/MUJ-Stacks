import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTeacherQuestionsComponent } from './content-teacher-questions.component';

describe('ContentTeacherQuestionsComponent', () => {
  let component: ContentTeacherQuestionsComponent;
  let fixture: ComponentFixture<ContentTeacherQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTeacherQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTeacherQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
