import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TrainerResetModalComponent } from '@core/components/trainer-reset-modal/trainer-reset-modal.component';
import { AuthService } from '@core/services/auth.service';
import { TrainerService } from '@core/services/trainer.service';
import { TrainerReset, TrainerState } from '@core/state/trainer';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

describe('TrainerResetModalComponent', () => {
  let store: Store;
  const fakeMatDialogRef: MatDialogRef<TrainerResetModalComponent> = {
    close: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TrainerResetModalComponent,
        NgxsModule.forRoot([TrainerState]),
      ],
      providers: [
        TrainerService,
        AuthService,
        { provide: MatDialogRef, useValue: fakeMatDialogRef },
      ],
    });

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      trainer: {
        trainer: {
          id: 1,
          name: 'toto',
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
    });
  });

  it('should mount', () => {
    const fixture = TestBed.createComponent(TrainerResetModalComponent);
    const layoutComponent = fixture.componentInstance;
    expect(layoutComponent).toBeTruthy();
  });

  it('dispatch TrainerReset action upon reset confirmed', () => {
    const fixture = TestBed.createComponent(TrainerResetModalComponent);
    const storeDispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue(of(null));

    fixture.componentInstance.confirmReset().subscribe(() => {
      // make sure the observable is run
    });

    const action = new TrainerReset();
    expect(storeDispatchSpy).toHaveBeenCalledWith(action);
    expect(fakeMatDialogRef.close).toHaveBeenCalled();
  });
});
