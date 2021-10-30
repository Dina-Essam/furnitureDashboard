import { NgModule } from '@angular/core';
import { NgbPaginationModule , NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { AllStylesComponent } from './components/styles/all-styles/all-styles.component';
import { CreateStyleComponent } from './components/styles/create-style/create-style.component';
import { EditStyleComponent } from './components/styles/edit-style/edit-style.component';
import { AllMaterialsComponent } from './components/materials/all-materials/all-materials.component';
import { EditMaterialComponent } from './components/materials/edit-material/edit-material.component';
import { CreateMaterialComponent } from './components/materials/create-material/create-material.component';
import { CreateFinishComponent } from './components/finishes/create-finish/create-finish.component';
import { EditFinishComponent } from './components/finishes/edit-finish/edit-finish.component';
import { AllFinishesComponent } from './components/finishes/all-finishes/all-finishes.component';
import { AllCitiesComponent } from './components/cities/all-cities/all-cities.component';
import { EditCityComponent } from './components/cities/edit-city/edit-city.component';
import { CreateCityComponent } from './components/cities/create-city/create-city.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AllAboutsComponent } from './components/abouts/all-abouts/all-abouts.component';
import { AllActiveAboutsComponent } from './components/abouts/all-active-abouts/all-active-abouts.component';
import { AllCategoriesComponent } from './components/categories/all-categories/all-categories.component';
import { AllCategoryDetailsComponent } from './components/categories/all-category-details/all-category-details.component';
import { CreateCategoryDetailsComponent } from './components/categories/create-category-details/create-category-details.component';
import { EditCategoryDetailsComponent } from './components/categories/edit-category-details/edit-category-details.component';
import { EditAboutComponent } from './components/abouts/edit-about/edit-about.component';
import { CreateAboutComponent } from './components/abouts/create-about/create-about.component';
import { EditPolicyComponent } from './components/policies/edit-policy/edit-policy.component';
import { CreatePolicyComponent } from './components/policies/create-policy/create-policy.component';
import { AllPoliciesComponent } from './components/policies/all-policies/all-policies.component';
import { AllActivePoliciesComponent } from './components/policies/all-active-policies/all-active-policies.component';
import { AllProductsComponent } from './components/products/all-products/all-products.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';

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
    EditTaxComponent,
    AllStylesComponent,
    CreateStyleComponent,
    EditStyleComponent,
    AllMaterialsComponent,
    EditMaterialComponent,
    CreateMaterialComponent,
    CreateFinishComponent,
    EditFinishComponent,
    AllFinishesComponent,
    AllCitiesComponent,
    EditCityComponent,
    CreateCityComponent,
    AllAboutsComponent,
    AllActiveAboutsComponent,
    AllCategoriesComponent,
    AllCategoryDetailsComponent,
    CreateCategoryDetailsComponent,
    EditCategoryDetailsComponent,
    EditAboutComponent,
    CreateAboutComponent,
    EditPolicyComponent,
    CreatePolicyComponent,
    AllPoliciesComponent,
    AllActivePoliciesComponent,
    AllProductsComponent,
    CreateProductComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbCarouselModule,
    HttpClientModule,
    FontAwesomeModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ErrorDialogService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
 }
