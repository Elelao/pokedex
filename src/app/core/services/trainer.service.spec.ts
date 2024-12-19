import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TrainerService } from '@core/services/trainer.service';
import { environment } from '@environment';
import { of } from 'rxjs';

describe('TrainerService', () => {
  let trainerService: TrainerService;
  let httpMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrainerService],
    });

    trainerService = TestBed.inject(TrainerService);
    httpMock = TestBed.inject(HttpClient);
  });

  it('hydrate received trainer', () => {
    expect.assertions(2);

    const now = new Date();
    const trainerJson = {
      id: 1,
      name: 'toto',
      created_at: now.toJSON(),
      updated_at: now.toJSON(),
    };

    const httpGetSpy = jest.spyOn(httpMock, 'get').mockReturnValue(of(trainerJson));

    trainerService.getMe().subscribe((trainer) => {
      expect(trainer).toBe({
        id: trainerJson.id,
        name: trainerJson.name,
        created_at: now,
        updated_at: now,
      });
    });

    expect(httpGetSpy).toHaveBeenCalled();
  });

  it('can call reset endpoit', () => {
    const httpPostSpy = jest.spyOn(httpMock, 'post').mockReturnValue(of());

    trainerService.reset().subscribe(() => {
      // make sure the call is triggerd
    });

    expect(httpPostSpy).toHaveBeenCalledWith(`${environment.apiUrl}/reset`, {});
  });
});
