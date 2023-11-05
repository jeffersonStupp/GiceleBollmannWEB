export default class Produto{
public id:number;
public titulo:string;
public descricao:string;
public nota:number;
public imagem:string;
public preco:number;
constructor(obj?: any) {
  if (obj != null) {
    Object.assign(this, obj);
  }
}
}


