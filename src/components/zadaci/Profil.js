//funkcija za prikaz korisnika

const Profil = () => {
const korisnik = {
        "ime" : "Ivan",
        "prezime" : "Ćavar",
        "godine" : 41,
        "vozacka" : true,
        "vjestine": [
        "HTML",
        "CSS",
        "JavaScript",
        "React"
        ],
        "adresa" :{
            "ulica" : "Utinjska 3g",
            "grad" : "Zagreb",
            "pbroj" : 10000
        }
    }

    //ova komponenta vraća informacije o korisniku
  return (
    <div className="container">
        <h1>Profil korisnika</h1>

    <p> Ime: {korisnik.ime} </p>
        <p> Prezime: {korisnik.prezime} </p>
        <p> Godine: {korisnik.godine} </p>
        <div>
            Vještine:
            <ul>
              

                {
                
                //Map koristimo za prolazak kroz niz (i ispisivanje vrijednosti, u ovom slučaju)
                korisnik.vjestine.map (
                    (vjestina,index) => (
                        <li key={vjestina}>{index+1}, {vjestina}</li>
                    )

                )
                
                }


            </ul>


        </div>

    <p> Ulica: {korisnik.adresa.ulica}</p>
        <p> Grad: {korisnik.adresa.grad}</p>
         <p> Poštanski broj: {korisnik.adresa.pbroj}</p>

        </div>
  )
}

export default Profil