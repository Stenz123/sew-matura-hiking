import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikeListComponent } from './hike-list.component';

describe('HikeListComponent', () => {
  let component: HikeListComponent;
  let fixture: ComponentFixture<HikeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
