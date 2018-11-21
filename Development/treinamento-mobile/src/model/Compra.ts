import { Produto } from "./Produto";

export class Compra {
    id: string;
    produto: Produto;
    quantidade: number;
    data: Date;

    /*cria a tabela de compra no SQLITE */
    static createTableSql(): string {
        return 'CREATE TABLE IF NOT EXISTS ' + 
                'Compra(id TEXT PRIMARY KEY,' + 
                ' idProduto TEXT,' + 
                ' quantidade INTEGER,' + 
                ' data TEXT' + 
                ');';
    }

    static entityName() {
        return 'Compra';
    }



}


