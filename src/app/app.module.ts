import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainNavComponent } from './header/main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { MobileItemComponent } from './mobiles/mobile-item/mobile-item.component';
import { MobileDetailsComponent } from './mobiles/mobile-details/mobile-details.component';
import { MobilesListComponent } from './mobiles/mobiles-list/mobiles-list.component';
import { MobileListItemComponent } from './mobiles/mobiles-list/mobile-list-item/mobile-list-item.component';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { EditComponent } from './admin/products/edit/edit.component';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';

import { AuthService } from './shared/auth.service';
import { MobileService } from './shared/mobile.service';
import { AddsService } from './shared/adds.service';

import { MobileResolverService } from './shared/mobile-desc.resolver';
import { AdminProductResolverService } from './shared/admin-product.resolver';
import { CartResolverService } from './shared/cart.resolver';

import { FilterPipe } from './shared/filter.pipe';
import { ShortenPipe } from './shared/shorten.pipe';
import { AdminService } from './shared/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavComponent,
    HomeComponent,
    MobilesComponent,
    MobileItemComponent,
    MobileDetailsComponent,
    MobilesListComponent,
    MobileListItemComponent,
    FooterComponent,
    UsersComponent,
    SignInComponent,
    SignUpComponent,
    ShoppingCartComponent,
    AdminComponent,
    ProductsComponent,
    NewProductComponent,
    EditComponent,
    LoadingSpinner,
    FilterPipe,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
  ],
  providers: [MobileService, AddsService, MobileResolverService, CartResolverService, AdminProductResolverService, AuthService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
