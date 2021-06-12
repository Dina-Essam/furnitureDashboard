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
