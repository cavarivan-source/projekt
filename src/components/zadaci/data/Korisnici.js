//import korisnici from "./data/korisnici.json";
import { useState } from "react";


const Korisnici = () => {

    const [korisnici, setKorisnici] = useState([]);

    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then( (data) => {
            setKorisnici(data);
        }
    )
       
    

    return (
        <div className="container">
            <h2>Popis korisnika</h2>
            <table className="table mt-3 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Korisnik</th>
                        <th scope="col">Nadimak</th>
                        <th scope="col">E-mail adresa</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">Web stranica</th>
                        <th scope="col">Tvrtka</th>
                        <th scope="col">Adresa</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                             korisnici.map((korisnik) => (
                                <tr>
                                    <td>{korisnik.id}</td>
                                    <td>{korisnik.name}</td>
                                    <td>{korisnik.username}</td>
                                    <td>{korisnik.email}</td>
                                    <td>{korisnik.phone}</td>
                                    <td>{korisnik.website}</td>
                                    <td>
                                        <p>{korisnik.company.name}</p>
                                        <p>{korisnik.company.catchPhrase}</p>
                                        <p>{korisnik.company.bs}</p>
                                    </td>
                                    <td>
                                        <p>{korisnik.address.street}</p>
                                        <p>{korisnik.address.suite}</p>
                                        <p>{korisnik.address.city}</p>
                                    </td>
                                </tr>   
                            )
                        )
                            
                        }

                           
                    
                </tbody>
            </table>
        </div>
    )











}

















export default Korisnici;