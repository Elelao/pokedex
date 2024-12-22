import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverDialogComponent } from './discover-dialog.component';

describe('DiscoverDialogComponent', () => {
  let component: DiscoverDialogComponent;
  let fixture: ComponentFixture<DiscoverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
