import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentQuestionComponent } from './content-question.component';

describe('ContentQuestionComponent', () => {
  let component: ContentQuestionComponent;
  let fixture: ComponentFixture<ContentQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
