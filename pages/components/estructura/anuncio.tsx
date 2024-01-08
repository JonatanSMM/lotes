import { useEffect, useState } from "react";


export default function CAnuncio() {
    const [datos, setDatos] = useState([]);
    const [banners, setBanners] = useState('');
    useEffect(() => {
      const verificador = window.location.pathname.split('/');
      const rptAPI = verificador[verificador.length - 1];
      fetch('http://localhost:3001/informacionES')
        .then(response => response.json())
        .then(data => {
          const filtrado = data.filter(fila =>fila.categoria ===rptAPI);
          setDatos(filtrado);
          setBanners(rptAPI);
        })
        .catch(error => console.error('Tenemos un error', error));
    }, []);
 return (
    <>
      {datos.map((fila, index) => (
                  <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.descripcion }} />
                ))}
    </>
 )
}