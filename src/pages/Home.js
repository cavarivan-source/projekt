import { useState, useEffect } from "react"
import WOW from "wowjs"
import FeaturedImg from "../components/zadaci/FeaturedImg";
import HeroSection from "../components/HeroSection";

const Home = () => {

const[page, setPage] = useState(null);   // stanje, početno stanje null i takvo je dok ne dodijeli novu vrijednost tom stanju

useEffect(() => {                   // kad se komponenta učita onda radi useEffect
const fetchPage = async () => {         // arrow funkcija, dohvati
  try{                           // Try i catch koristimo kad pokušavamo dohvatiti greške, da nemamo error greške (hvatamo je s catch)
    const response = await fetch (`https://front2.edukacija.online/backend/wp-json/wp/v2/pages/176?_embed`)
if(!response.ok){
  throw new Error ("Ne mogu povući podatke")
}
    const data = await response.json();
    setPage(data);
  } catch(err) {
console.log(err.message);
  }
}

fetchPage();       // s ovime pozivamo funkciju da je ispiše, paziti da to bude nakon funkcije

new WOW.WOW().init();
}, [] );


  
  if(!page) return <p>Učitavanje...</p>
  return (
    <>
    <HeroSection stranica={page} fallback="https://placehold.co/600x400" size="full"/>


    {/* <FeaturedImg page={page} fallback="https://placehold.co/600x400" size="thumbnail"/> */}
  <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>    
  </>
  )
}

export default Home