import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFoodsComponent } from './select-foods.component';

describe('SelectFoodsComponent', () => {
  let component: SelectFoodsComponent;
  let fixture: ComponentFixture<SelectFoodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectFoodsComponent]
    });
    fixture = TestBed.createComponent(SelectFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
