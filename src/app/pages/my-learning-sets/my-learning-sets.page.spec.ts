import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyLearningSetsPage } from './my-learning-sets.page';

describe('MyLearningSetsPage', () => {
  let component: MyLearningSetsPage;
  let fixture: ComponentFixture<MyLearningSetsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyLearningSetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
