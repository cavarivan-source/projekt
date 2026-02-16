import tecaj from '../components/zadaci/data/tecaj.json';

const Tecaj = () => {
 
  return (
    <>
    <div className='container'>
    <table>
      <thead>
        <tr>
          <th>drzava</th>
          <th>valuta</th>
          <th>kupovni_tecaj</th>
          <th>srednji_tecaj</th>
          <th>prodajni_tecaj</th>
          <th>datum_primjene</th>


        </tr>
      </thead>
      <tbody>
        {tecaj.map((tecaj) => (
            <tr>
            <td>{tecaj.drzava}</td>
            <td>{tecaj.valuta}</td>
            <td>{tecaj.kupovni_tecaj}</td>
            <td>{tecaj.srednji_tecaj}</td>
            <td>{tecaj.prodajni_tecaj}</td>
            <td>{tecaj.datum_primjene}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
}
  


export default Tecaj