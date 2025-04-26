import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayVideoDialogComponent } from './play-video-dialog.component';

describe('PlayVideoDialogComponent', () => {
  let component: PlayVideoDialogComponent;
  let fixture: ComponentFixture<PlayVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayVideoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
