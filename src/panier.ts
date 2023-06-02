import { Produit } from "./produit";

export class panier {
  pan : Produit[] = [];
  //crée un array de Produit
  addToPan(prod : Produit){
    this.pan.push(prod);
  }

  get getPan(){
    return this.pan;
  }
}







