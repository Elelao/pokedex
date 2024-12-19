import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyComponent } from '@core/components/dummy/dummy.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { AuthInterceptorProvider } from '@core/http/auth.interceptor';
import { AuthService } from '@core/services/auth.service';
import { TrainerService } from '@core/services/trainer.service';
import { TrainerState } from '@core/state/trainer';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgxsModule.forRoot([TrainerState], {
      developmentMode: isDevMode(),
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    LayoutComponent,
    DummyComponent,
  ],
  providers: [AuthInterceptorProvider, AuthService, TrainerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
