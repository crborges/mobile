import { NavController, NavParams,Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Component, ViewChild } from '@angular/core';

import { EstoquePage } from '../estoque/estoque';
import { ProdutosPage } from '../produtos/produtos';
import { ComprasPage } from '../compras/compras';
import { VendasPage } from '../vendas/vendas';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = EstoquePage;
  pages: any[];
  constructor(public navCtrl: NavController,     public navParams: NavParams, public translateService: TranslateService) {
 
 
    translateService.get(['ESTOQUE', 'PRODUTOS', 'COMPRAS', 'VENDAS']).subscribe(
      values => {
        this.pages = [
          { title: values.ESTOQUE, component: HomePage },
          { title: values.PRODUTOS, component: ProdutosPage },
          { title: values.COMPRAS, component: ComprasPage },
          { title: values.VENDAS, component: VendasPage }
        ];
      }
    )

  }
ionViewDidLoad() {
  console.log('ionViewDidLoad HomePage');
}

openPage(page) {
  this.nav.setRoot(page.component);
}

sair() {
  this.nav.setRoot(LoginPage);
}
}

















