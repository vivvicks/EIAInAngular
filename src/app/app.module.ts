import { ErrorHandlerService } from './shared/services/error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { MenuItemComponent } from './Menu/menu-item/menu-item.component';
import { AuthGuard } from './guards/auth-guard.service';

import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule} from '@angular/material';
import { HeaderComponent } from './login/header/header.component';
import { LoginformComponent } from './login/loginform/loginform.component';
import { FooterComponent } from './login/footer/footer.component';
import { HomeComponent } from './Home/home/home.component';
import { RepositoryService } from './shared/services/repository.service';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { JwtInterceptor } from './_helper/jwt.interceptor';

  @NgModule({
    exports: [
      CdkTableModule,
      CdkTreeModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
    ],
    declarations: []
  })
  export class MaterialModule {}


const appRoutes: Routes = [
  {
    path: '',
    component: LoginformComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent,
    HeaderComponent,
    LoginformComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    JwtHelper,
    AuthGuard,
    EnvironmentUrlService,
    RepositoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
