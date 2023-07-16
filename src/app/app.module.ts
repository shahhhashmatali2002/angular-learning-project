import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { CartComponent } from './cart/cart.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BuyItemComponent } from './buy-item/buy-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingDetailsComponent } from './booking-details/booking-details.component';




const appRoutes: Routes = [
  {path: '', component: UserAuthenticationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'buyItem', component: BuyItemComponent},
  {path: 'bookingDetials', component: BookingDetailsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserAuthenticationComponent,
    CardComponent,
    CartComponent,
    BuyItemComponent,
    BookingDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
