import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DatabaseService } from '../services/DatabaseService';
import { Produto } from '../model/Produto';
import { Compra } from '../model/Compra';
import { Venda } from '../model/Venda';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
     platform: Platform
    ,statusBar: StatusBar
    ,splashScreen: SplashScreen
    ,databaseService: DatabaseService
    ,toastCtrl: ToastController
    ,fcm: FcmProvider
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
        
      databaseService.initDataBase([
        Produto,
        Compra,
        Venda
      ]);

        
      // Get a FCM token
      let token = fcm.getToken();
      console.log('FCM Token: ', token);

      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg['body'],
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()

  

      
    });
  }





}

