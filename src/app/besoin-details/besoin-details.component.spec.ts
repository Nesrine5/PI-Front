import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesoinDetailsComponent } from './besoin-details.component';

describe('BesoinDetailsComponent', () => {
  let component: BesoinDetailsComponent;
  let fixture: ComponentFixture<BesoinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BesoinDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BesoinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
