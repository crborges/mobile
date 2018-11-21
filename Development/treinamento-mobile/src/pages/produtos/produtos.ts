import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProdutoPage } from './produto/produto';
import { Produto } from '../../model/Produto';
import { ProdutoService } from '../../services/ProdutoService';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  private produtos: Produto[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');

    this.produtoService.list()
        .subscribe(
          produtos => {
            this.produtos = produtos;
            this.produtoService.storeOnCache(produtos);
          },
          error => {
            this.produtoService.listFromCache()
            .subscribe(source => {
              this.produtos = source;
              console.log('Products listed => ', this.produtos);
            });
            console.log(error);
          });
  }


  itemSelected(item) {
    this.navCtrl.push(ProdutoPage, item);
  }

  doRefresh(refresher){
    this.produtoService.list()
        .subscribe(
          produtos => this.produtos = produtos,
          error => console.log(error),
          ()=>refresher.complete());
  }
}