import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CompraPage } from '../pages/compras/compra/compra';
import { ComprasPage } from '../pages/compras/compras';
import { EstoquePage } from '../pages/estoque/estoque';
import { ProdutoPage } from '../pages/produtos/produto/produto';
import { ProdutosPage } from '../pages/produtos/produtos';
import { VendaPage } from '../pages/vendas/venda/venda';
import { VendasPage } from '../pages/vendas/vendas';
import { ProdutoService } from '../services/ProdutoService';
import { DatabaseService } from '../services/DatabaseService';
import { SQLite } from '@ionic-native/sqlite';
import { SQLiteMock } from '../services/SQLiteMock';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    CompraPage, 
    ComprasPage, 
    EstoquePage ,
    ProdutoPage ,
    ProdutosPage,
    VendaPage ,
    VendasPage 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  
  ],
  bootstrap: [IonicApp],
  
  
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    CompraPage, 
    ComprasPage, 
    EstoquePage ,
    ProdutoPage ,
    ProdutosPage,
    VendaPage ,
    VendasPage 
  ],


  providers: [
    StatusBar,
    SplashScreen,
    /* tem que colocar as services aqui  */
    ProdutoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    FcmProvider,
    DatabaseService,
    /* PARA SER MOCKADO */
    { provide: SQLite, useClass: SQLiteMock }
    /* 
    PARA RODAR NO MUNDO REAL 
    ,
    SQLite
    */


  ]
})
export class AppModule {}


