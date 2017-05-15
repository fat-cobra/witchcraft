import { WaitingRoomPage } from './../pages/waiting-room/waiting-room.page';
import { RoomService } from './../services/room.service';
import { LoginPage } from './../pages/login/login.page';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WaitingRoomPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB_BTCW2PT1BkQDEPD9FbyTuQwWpC5ecDo',
      authDomain: 'witchcraft-fb499.firebaseapp.com',
      databaseURL: 'https://witchcraft-fb499.firebaseio.com',
      projectId: 'witchcraft-fb499',
      storageBucket: 'witchcraft-fb499.appspot.com',
      messagingSenderId: '966579536904'
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WaitingRoomPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomService,
  ]
})
export class AppModule {}
