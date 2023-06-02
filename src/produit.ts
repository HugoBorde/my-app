export class Produit {
id : number;
nombre: number;
nom: string;
prix: number;
importes : boolean;
type : number;

constructor(id : number ,nom : string , prix : number , importes : boolean , type : number ) {

  this.id = id;
  this.nombre = 0;
  this.importes = importes;
  this.nom = nom;
  this.prix = prix;
  this.type = type;

}
//Incrémente Nombre
  incrNombre() {
  this.nombre++;
}

//Décremente Nombre
//bloque valeurs négative
  decrNombre(){
    if(this.nombre == 0){
      return;
    }else{
      this.nombre-=1;
    }

  }


setPrix(pri : number){
    this.prix = pri;
  }

//Get
get getPrix(){
  return this.prix;
}

get getNom(){
  return this.nom;
}
get getNombre(){
  return this.nombre
}

get getId(){
  return this.id;
}

}

