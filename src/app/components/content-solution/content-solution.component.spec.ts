import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSolutionComponent } from './content-solution.component';

describe('ContentSolutionComponent', () => {
  let component: ContentSolutionComponent;
  let fixture: ComponentFixture<ContentSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
