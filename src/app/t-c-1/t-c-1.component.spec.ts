import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TC1Component } from './t-c-1.component';

describe('TC1Component', () => {
  let component: TC1Component;
  let fixture: ComponentFixture<TC1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TC1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TC1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
