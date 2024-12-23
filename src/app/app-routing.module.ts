import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { DummyComponent } from '@core/components/dummy/dummy.component';
import { SpeciesDetailsComponent } from '@core/components/species-details/species-details.component';
import { LoginPageComponent } from '@modules/login/components/login-page/login-page.component';
import { LoginModule } from '@modules/login/login.module';
import { SpeciesListComponent } from '@modules/species/species-list/species-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SpeciesListComponent, 
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'species/:id',
    component: SpeciesDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
