import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { ErrorDialogComponent } from './error-dialog/errordialog.component';
import { ErrorDialogService } from './error-dialog/errordialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AllColorsComponent } from './components/colors/all-colors/all-colors.component';
import { CreateColorComponent } from './components/colors/create-color/create-color.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { EditColorComponent } from './components/colors/edit-color/edit-color.component';
import { AllCustomersComponent } from './components/customers/all-customers/all-customers.component';
import { GetCustomerByIdComponent } from './components/customers/get-customer-by-id/get-customer-by-id.component';
import { AllDiscountsComponent } from './components/discounts/all-discounts/all-discounts.component';
import { EditDiscountComponent } from './components/discounts/edit-discount/edit-discount.component';
import { AllTaxesComponent } from './components/taxes/all-taxes/all-taxes.component';
import { EditTaxComponent } from './components/taxes/edit-tax/edit-tax.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ErrorDialogComponent,
    SignInComponent,
    LogOutComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    AllColorsComponent,
    CreateColorComponent,
    SpinnerComponent,
    EditColorComponent,
    AllCustomersComponent,
    GetCustomerByIdComponent,
    AllDiscountsComponent,
    EditDiscountComponent,
    AllTaxesComponent,
    EditTaxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ErrorDialogService
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
