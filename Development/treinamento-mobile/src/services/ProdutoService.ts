import { Produto } from "../model/Produto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DatabaseService } from "./DatabaseService";
import "rxjs/Rx";
import { from } from "rxjs/observable/from";

/* cria um objeto java script que é injetavel  em outra pagina */
@Injectable()
export class ProdutoService {
    private baseUrl = 'https://treinamento-nodejs.herokuapp.com/produtos';
    constructor(public http: HttpClient, 
        public databaseService: DatabaseService) { }

    list(): Observable<Produto[]> {
        return this.http.get(this.baseUrl)
        .catch(err=> Observable.throw(err.message));
    }

    detail(id: string) {
        return this.http.get(this.baseUrl + '/' + id)
        .catch(err=> Observable.throw(err.message));
    }



    storeOnCache(produtos: Produto[]) {
        this.deleteAll().subscribe(() => {
            from(produtos).map((produto) => {
                return this.databaseService.executeSql(Produto.insertSql(), Produto.getValues(produto));
            }).subscribe(sqlresults => { console.log(sqlresults); }
            );
        });   
    }

    listFromCache():Observable<Produto[]> {
        return this.databaseService.executeSql(Produto.listAllSql())
            .map((result) => {
                var produtos : Produto[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    produtos.push(Produto.fromDatabase(result['rows'].item(i)));
                }
                return produtos;
            });
    }

    deleteAll() {
        return this.databaseService.executeSql(Produto.deleteAllSql());
    }

    getById(id: string): Observable<Produto> {
        return this.listFromCache()
        .map(produtos => produtos.filter(produto => produto.id == id)[0]);
}




}
