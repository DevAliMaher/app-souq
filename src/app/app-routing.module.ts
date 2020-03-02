import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { MobileDetailsComponent } from './mobiles/mobile-details/mobile-details.component';
import { MobilesListComponent } from './mobiles/mobiles-list/mobiles-list.component';
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './admin/admin.component';
import { MobileResolverService } from './shared/mobile-desc.resolver';
import { CartResolverService } from './shared/cart.resolver';
import { ProductsComponent } from './admin/products/products.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { EditComponent } from './admin/products/edit/edit.component';
import { AdminProductResolverService } from './shared/admin-product.resolver';
import { HeaderComponent } from './header/header.component';



const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', resolve: {items: CartResolverService} },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:index', component: EditComponent, resolve: {mobile: AdminProductResolverService}},
      { path: 'new-product', component: NewProductComponent },
    ]},
    { path: 'mobiles', component: MobilesComponent },
    { path: 'mobiles/:index', component: MobileDetailsComponent, resolve: {mobile: MobileResolverService} },
    { path: 'mobiles-list', component: MobilesListComponent },
    { path: 'mobiles-list/:index', component: MobileDetailsComponent, resolve: {mobile: MobileResolverService} },
    { path: 'user', component: UsersComponent, children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent},
      { path: 'sign-up', component: SignUpComponent }
    ] },
    { path: 'shopping-cart', component: ShoppingCartComponent, resolve: {items: CartResolverService} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
