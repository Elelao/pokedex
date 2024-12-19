import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { unwrapData } from '@core/http/unwrap-data';
import { hydrateTrainer, TrainerJSON } from '@core/state/trainer';
import { environment } from '@environment';
import { map } from 'rxjs';

@Injectable()
export class TrainerService {
  private readonly http = inject(HttpClient);

  getMe() {
    return this.http.get<TrainerJSON>(`${environment.apiUrl}/me`).pipe(
      map(unwrapData),
      map((trainerJson) => hydrateTrainer(trainerJson)),
    );
  }

  reset() {
    return this.http.post(`${environment.apiUrl}/reset`, {});
  }
}
