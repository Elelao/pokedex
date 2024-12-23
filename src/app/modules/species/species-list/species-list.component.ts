import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpeciesService, Species } from '../../../core/services/species.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { unwrapData } from '@core/http/unwrap-data';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class SpeciesListComponent implements OnInit, OnDestroy {
  isLoading = false;
  species: Species[] = [];
  error: string | null = null;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  private sub1!: Subscription;
  private searchSubscription!: Subscription;

  constructor(private speciesService: SpeciesService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSpecies();
    this.setupSearch();
  }

  ngOnDestroy() {
    if(this.sub1!=null)
      this.sub1.unsubscribe();
    if(this.searchSubscription!=null)
      this.searchSubscription.unsubscribe();
 
  }

  private setupSearch() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300) // Wait for 300ms pause so we don't make an API call for every keystroke
    ).subscribe(searchTerm => {
      this.loadSpecies(searchTerm);
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  private loadSpecies(term?:string) {
    this.isLoading = true;
    this.sub1=this.speciesService.getAllSpecies()
      .subscribe({
        next: (data) => {
          this.species = unwrapData(data);
          this.isLoading = false;
          this.cdr.detectChanges(); /*PH */
        },
        error: (error) => {
          console.error('Error fetching species:', error);
          this.error = 'Failed to load species. Please try again later.';
          this.isLoading = false;
        }
      });
  }
}