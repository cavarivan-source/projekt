import Korisnik from './data/korisnik.json';

//funkcija za prikaz korisnika

const Profil = () => {
const KorisnikObjekt= {

        "ime" : "Ivan", //string
        "prezime" : "Ćavar", // string
        "godine" : 41, //number
        "vozacka" : true, //boolean
        "vjestine": [      //array / niz    
              "HTML",
        "CSS",
        "JavaScript",
        "React"
        
        ],
      

        "adresa" :{                   //objekt
            "ulica" : "Utinjska 3g",
            "grad" : "Zagreb",
            "pbroj" : 10000,
            "drzava":{
                "naziv" : "Hrvatska",
                "oznaka" : "HR",
                "valuta" : "EUR"
            }
        }
    }
    //ovo je JSON format, tekstualni oblik, string

const KorisnikJSON ={ "ime" : "Ivan", "prezime" : "Ćavar", "godine" : 41, "vozacka" : true, "vjestine": [ "HTML", "CSS", "JavaScript", "React" ], "adresa" :{ "ulica" : "Utinjska 3g", "grad" : "Zagreb", "pbroj" : 10000 } }
//Pomoću JSON.parse() ga pretvaramo u Javascript objekt

const Korisnik =JSON.parse(KorisnikJSON)

    //ova komponenta vraća informacije o korisniku
  return (
    <div className="container">
        <h1>Profil korisnika</h1>

    <p> Ime: {Korisnik.ime} </p>
        <p> Prezime: {Korisnik.prezime} </p>
        <p> Godine: {Korisnik.godine} </p>
        <div>
            Vještine:
            <ul>
              

                {
                
                //Map koristimo za prolazak kroz niz (i ispisivanje vrijednosti, u ovom slučaju)
                Korisnik.vjestine.map (
                    (vjestina,index) => (
                        <li>{index+1}, {vjestina}</li>
                    )

                )
                
                }


            </ul>


        </div>

    <p> Ulica: {Korisnik.adresa.ulica}</p>
        <p> Grad: {Korisnik.adresa.grad}</p>
         <p> Poštanski broj: {Korisnik.adresa.pbroj}</p>

        </div>
  )
}

export default Profil