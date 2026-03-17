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
        {tecaj.map((item) => (
            <tr key={`${item.drzava}-${item.valuta}-${item.datum_primjene}`}>
            <td>{item.drzava}</td>
            <td>{item.valuta}</td>
            <td>{item.kupovni_tecaj}</td>
            <td>{item.srednji_tecaj}</td>
            <td>{item.prodajni_tecaj}</td>
            <td>{item.datum_primjene}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
}
  


export default Tecaj