import { Component, OnInit } from '@angular/core';
import {panier} from "src/panier"
import { addTaxe, taxe } from "src/facture";
import { Produit} from "src/produit";
import { NgForm } from '@angular/forms';

//  <Déclaration des Produit>
const chocolat = new Produit(1,"boîtes de chocolats importé",0.0,true,0);
const barChocolat = new Produit(2,"Barres de chocolat",0.0,false,0);

const livre = new Produit(3,"Livre",0.0,false,1);

const parfum = new Produit(4,"Flacons de parfum ",0.0,false,-1);
const parfumImport = new Produit(5,"Flacons de parfum importé",0.0,true,-1);

const migraine = new Produit(6,"boîtes de pilules contre la migraine",0.0,false,0);

const cd = new Produit(7,"CD musical",0.0,false,5);
const panier1  = new panier;
//  </Déclaration des Produit/>

//  <Ajout des produits au panier>
panier1.addToPan(chocolat);
panier1.addToPan(barChocolat);

panier1.addToPan(parfum);
panier1.addToPan(parfumImport);

panier1.addToPan(cd);

panier1.addToPan(livre);

panier1.addToPan(migraine);
//  </Ajout des produits au panier/>
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
  title = 'test-Borde';
  showTotale = false;
  pan = panier1.getPan;

  //Function appelé par le Form
  onClickSubmit(form : NgForm) {
    if(form.value.prix < 0){
      return;
    }
    for(let i  = 0 ; i<this.pan.length; i++) {
    //  console.log(i + " " + form.value.prix);
      if(this.pan[i].id == form.value.Prodid){
        this.pan[i].setPrix(form.value.prix);
      }
    }
  }
  //Appel la fonction addTaxe qui effectue les taxes pour tout le panier
  onFact(){
        addTaxe(panier1);
        /*
        //Tentative de refresh
        this.onPlus(1);
        this.onMoins(1);
        */
        this.showTotale = true;

  }

  onReset(){
    this.showTotale = false;
  }
  //Incrémentation du nombre d'un produit
  onPlus(id : number){
    let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id){
        pan[i].incrNombre();
      }
    }

  }
   //Décrémentation du nombre d'un produit
  onMoins(id : number){
    let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id){
        pan[i].decrNombre();
      }
    }

  }
  //Fonction Get
  getProduitPrix(id : number){
    let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id){
        return pan[i].getPrix;
      }
    }
    return 0;
   }

   getProduitName(id : number){
    let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id){
        return pan[i].getNom;
      }
    }
    return 'null';
   }
   getProduitNombre(id : number){
    let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id){
        return pan[i].getNombre;
      }

  }
  return 0;
}

getProduitID(id : number){
  let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id){
        return pan[i].getNombre;
      }
    }
    return 0;
}
//Création et Ajout d'un nouveau produit dans le panier
  onNewProduit(form : NgForm){
    let pan = panier1.getPan;

    for(let i  = 0 ; i<pan.length; i++) {
      if(form.value.id == pan[i].getId){
        return false;
      }
    }
    console.log("form string " + form.value.nom)
    if(form.value.nom !== ""){
      let prod = new Produit(form.value.id,form.value.nom,form.value.newPrix,form.value.importes,form.value.type);
      panier1.addToPan(prod);
      return true;
    }
    return false;

  }
  //Calcul le prix Taxé d'un produit
  prixPlusTaxe(id : number){
    let mTaxe = 0 ;
    let pan = panier1.getPan;
    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].id == id && pan[i].nombre > 0){
       mTaxe = taxe(pan[i]);
       mTaxe *= pan[i].getNombre;
      }
    }
    return mTaxe ;
  }
  //Affiche le prixTotale
   prixTotale(){
    let prixT = 0 ;
    let pan = panier1.getPan;
    prixT = addTaxe(panier1);
    return prixT.toFixed(2) ;

  }
  //Calcul le montant des taxe Totale
    prixTaxeTotale(){
    let pTT = 0 ;
    let pan = panier1.getPan;

    for(let i  = 0 ; i<pan.length; i++) {
      if(pan[i].getNombre != 0 && pan[i].getPrix != 0)
      {
        pTT += (taxe(pan[i])* pan[i].getNombre ) - (pan[i].prix * pan[i].getNombre ) ;
      }
    }
    return pTT.toFixed(2) ;
  }

}
