import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ComprasPage } from '../compras';
import { ProdutoService } from '../../../services/ProdutoService';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Compra } from '../../../model/Compra';



/**
 * Generated class for the CompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
})
export class CompraPage {
  public compra: Compra;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private produtoService: ProdutoService,
    private barcodeScanner: BarcodeScanner
  ) {
 
    this.compra = {
      quantidade: 0,
      produto: {
        valorUnitario: 0
      }
    } as Compra;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraPage');
  }

  itemSelected() {
    this.navCtrl.push(CompraPage);
   }


   scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (this.compra.produto.id != ""){
        this.compra.produto.id = barcodeData.text;
        this.buscarProduto(this.compra.produto.id);
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }


  buscarProduto(id) {
    this.produtoService.getById(id)
    .subscribe(produto => {
      if (produto){
        this.compra.produto = produto
      } else {
        const toast = this.toastCtrl.create({
          message: "Produto não encontrado",
          duration: 3000
        });
        toast.present();
      }
    });
  }

}

