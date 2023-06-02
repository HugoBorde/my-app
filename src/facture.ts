import { panier} from "./panier";
import { Produit } from "./produit";


//Effectue les taxe pour l'intégralité des produits dans un panier
//Multiplie le prix obtenu pour chaque produit par son nombre
//Additionne le résultat
//return le prix totale
export function addTaxe(panier : panier){
  let pan = panier.getPan;
  let prixTotale = 0;
  let tmp = 0;
  for(let i  = 0 ; i<pan.length; i++) {
    console.log("------------");
    tmp = taxe(pan[i]);
    console.log("tmp " + tmp);
    console.log("index " + i);
    if(pan[i].getNombre != 0 && pan[i].getPrix != 0)
    {
      prixTotale += tmp*pan[i].getNombre;
    }
  tmp = 0;
  console.log("PrixTotale = "+ prixTotale);
  }
  console.info(pan);
  return prixTotale;
}

//Effectue les taxe pour 1 seul produit
export function taxe(prod : Produit){
    let Pttc = prod.prix;
    let tauxtaxe = 1;
    let Parrondi = 0;

    if(prod.prix != 0){
      switch (prod.type){ //Switch pour Identifié le type
        case 0:
          //  console.log("nourriture/medicament");
            break;
        case 1 :
          //  console.log("livre");
            tauxtaxe +=  0.10;
            break;
        default :
          //  console.log("Autre");
            tauxtaxe +=  0.20;
        break;
    }

    if(prod.importes == true ){
      tauxtaxe +=  0.05;
    }

    Pttc = Pttc * tauxtaxe;

    Parrondi = arrondi(Pttc);

    return Parrondi;

    }
    return 0;

}

//arrondi le prix au 5 centimes supérieur
function arrondi(toRound : number){
    let reste = toRound % 0.05;
    let pr = 0.05 - reste;
    let Parrondi = 0;
    Parrondi = +(toRound + pr).toFixed(2);
    return Parrondi;
    }


