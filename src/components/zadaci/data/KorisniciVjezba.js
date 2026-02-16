import korisnici from "./korisnici.json"

const KorisniciVjezba = () => {

    return (
    <div className="container">
        <h1>Profil korisnika</h1>

 
             {
             korisnici.map (
                    (korisnik) => (
                  <p> Korisnici: {korisnik.id} </p>
                    )

                )
                 
          } 
          </div>    
)
}
  
export default KorisniciVjezba