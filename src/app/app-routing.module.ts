import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { LogOutComponent } from './components/log-out/log-out.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AllColorsComponent } from './components/colors/all-colors/all-colors.component';
import { CreateColorComponent } from './components/colors/create-color/create-color.component';
import { EditColorComponent } from './components/colors/edit-color/edit-color.component';
import { AllCustomersComponent } from './components/customers/all-customers/all-customers.component';
import { GetCustomerByIdComponent } from './components/customers/get-customer-by-id/get-customer-by-id.component';
import { AllDiscountsComponent } from './components/discounts/all-discounts/all-discounts.component';
import { EditDiscountComponent } from './components/discounts/edit-discount/edit-discount.component';
import { AllTaxesComponent } from './components/taxes/all-taxes/all-taxes.component';
import { AllStylesComponent } from './components/styles/all-styles/all-styles.component';
import { CreateStyleComponent } from './components/styles/create-style/create-style.component';
import { EditStyleComponent } from './components/styles/edit-style/edit-style.component';
import { AllMaterialsComponent } from './components/materials/all-materials/all-materials.component';
import { CreateMaterialComponent } from './components/materials/create-material/create-material.component';
import { EditMaterialComponent } from './components/materials/edit-material/edit-material.component';
import { AllFinishesComponent } from './components/finishes/all-finishes/all-finishes.component';
import { CreateFinishComponent } from './components/finishes/create-finish/create-finish.component';
import { EditFinishComponent } from './components/finishes/edit-finish/edit-finish.component';
import { AllCitiesComponent } from './components/cities/all-cities/all-cities.component';
import { CreateCityComponent } from './components/cities/create-city/create-city.component';
import { EditCityComponent } from './components/cities/edit-city/edit-city.component';
import { AllAboutsComponent } from './components/abouts/all-abouts/all-abouts.component';
import { AllActiveAboutsComponent } from './components/abouts/all-active-abouts/all-active-abouts.component';
import { AllCategoriesComponent } from './components/categories/all-categories/all-categories.component';
import { AllCategoryDetailsComponent } from './components/categories/all-category-details/all-category-details.component';
import { CreateCategoryDetailsComponent } from './components/categories/create-category-details/create-category-details.component';
import { EditCategoryDetailsComponent } from './components/categories/edit-category-details/edit-category-details.component';
import { EditAboutComponent } from './components/abouts/edit-about/edit-about.component';
import { CreateAboutComponent } from './components/abouts/create-about/create-about.component';
import { AllPoliciesComponent } from './components/policies/all-policies/all-policies.component';
import { AllActivePoliciesComponent } from './components/policies/all-active-policies/all-active-policies.component';
import { CreatePolicyComponent } from './components/policies/create-policy/create-policy.component';
import { EditPolicyComponent } from './components/policies/edit-policy/edit-policy.component';

const routes =[
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        component: AllColorsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'colors',
        component: AllColorsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'colors/create-color',
        component: CreateColorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'colors/update-color/:id',
        component: EditColorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customers',
        component: AllCustomersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customers/:id',
        component: GetCustomerByIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'discounts',
        component: AllDiscountsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'discounts/update-discount/:id',
        component: EditDiscountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'taxes',
        component: AllTaxesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'taxes/update-tax/:id',
        component: EditDiscountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'styles',
        component: AllStylesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'styles/create-style',
        component: CreateStyleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'styles/update-style/:id',
        component: EditStyleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'materials',
        component: AllMaterialsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'materials/create-material',
        component: CreateMaterialComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'materials/update-material/:id',
        component: EditMaterialComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'finishes',
        component: AllFinishesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'finishes/create-finish',
        component: CreateFinishComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'finishes/update-finish/:id',
        component: EditFinishComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cities',
        component: AllCitiesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cities/create-city',
        component: CreateCityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cities/update-city/:id',
        component: EditCityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'abouts',
        component: AllAboutsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'abouts/update-about/:id',
        component: EditAboutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'abouts/create-about',
        component: CreateAboutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'abouts-active',
        component: AllActiveAboutsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories',
        component: AllCategoriesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories/details-category/:id',
        component: AllCategoryDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories/update-category/:id',
        component: EditCategoryDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories/create-category',
        component: CreateCategoryDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'policies',
        component: AllPoliciesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'policies/update-policy/:id',
        component: EditPolicyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'policies/create-policy',
        component: CreatePolicyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'policies-active',
        component: AllActivePoliciesComponent,
        canActivate: [AuthGuard],
      },

    ]
  },
  {
    path: 'logout',
    component: LogOutComponent,
  },
  {
    path: 'serverError',
    component: ServerErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
