import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAiComponent } from './view-ai.component';

describe('ViewAiComponent', () => {
  let component: ViewAiComponent;
  let fixture: ComponentFixture<ViewAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
