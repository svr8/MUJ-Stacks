import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProblemComponent } from './content-problem.component';

describe('ContentProblemComponent', () => {
  let component: ContentProblemComponent;
  let fixture: ComponentFixture<ContentProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
