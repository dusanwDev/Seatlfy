import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ZoominDirective } from './directives/zoomin.directive';
import { HoverDirective } from './directives/hover.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { UserdashboardModule } from './components/userdashboard/userdashboard.module';
import { CategoriesModule } from './components/categories/categories.module';
import { SharedmoduleModule } from './components/sharedmodule/sharedmodule.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TestPipe } from './pipes/test.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CheckoutComponent,
    SignupComponent,
    SigninComponent,
    ZoominDirective,
    HoverDirective,
    FilterPipe,
    TestPipe,
    ErrorComponent,
    LoaderComponent,
  ],
  imports: [
    AppRoutingModule,
    CategoriesModule,
    UserdashboardModule,
    SharedmoduleModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
