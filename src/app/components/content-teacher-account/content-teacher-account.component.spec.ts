import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTeacherAccountComponent } from './content-teacher-account.component';

describe('ContentTeacherAccountComponent', () => {
  let component: ContentTeacherAccountComponent;
  let fixture: ComponentFixture<ContentTeacherAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTeacherAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTeacherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
