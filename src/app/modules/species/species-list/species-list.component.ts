import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpeciesService, Species } from '../../../core/services/species.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { unwrapData } from '@core/http/unwrap-data';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SpeciesListComponent implements OnInit, OnDestroy {
  isLoading = false;
  species: Species[] = [];
  error: string | null = null;
  searchTerm: string = '';
  private sub1!: Subscription;

  constructor(private speciesService: SpeciesService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSpecies();
  }

  ngOnDestroy() {
    if(this.sub1!=null)
      this.sub1.unsubscribe();
    
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.loadSpecies(this.searchTerm);
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