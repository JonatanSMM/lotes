import { useEffect, useState } from 'react'
import CFooter from '../components/estructura/footer'
import CFormulario from '../components/estructura/formulario'
import CTop from '../components/estructura/top'
import CAnuncio from '../components/estructura/anuncio'
import CAdorno from '../components/estructura/adorno'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Compratulote.pe : Plantilla',
  description: 'Plantilla inicicial',
}
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');

  useEffect(() => {
    const verificador = window.location.pathname.split('/');
    const rptAPI = verificador[verificador.length - 1];
    fetch('http://localhost:3001/serviciosES')
      .then(response => response.json())
      .then(data => {
        const filtrado = data.filter(fila => fila.categoria === rptAPI);
        setDatos(filtrado);
        setBanners(rptAPI);
      })
      .catch(error => console.error("Se encontró un error"))
  }, []);
  return (
    <>
      <div className="row bg-white">
        <CTop selMenu="index" pagenav="./" />
        <div className="x_content">
          <CAdorno />
          <div className="container mb-3" >
            <div className="row g-5 py-4 p-2">
              <div className="col-md-7 col-lg-8">
                <CAnuncio />
                <div className="container text-center">
                  <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {datos.map((fila, index) => (
                      <div className="col">
                        <div className="p-3 border border-danger rounded-4">
                          <img src={fila.imagen} alt='imagen' className="img-fluid" />
                        </div>
                        <p className="text-danger py-2 fw-bold">{fila.titulo}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <CFormulario />
            </div>
            <div className="row p-2">
              {datos.length > 0 && (
                <>
                  <div className="col-md-7 col-lg-7" key={datos[0].id}>
                    <div className="carousel slide border border-danger border-2 p-2 h-100">
                      <div className="carousel-inner object-fit-cover">
                        <div className="carousel-item active">
                          <iframe src={datos[0].imagen1} className="w-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 col-lg-5" key={datos[0].id}>
                    <div className="border border-danger border-2 p-2 position-relative h-100">
                      <iframe src={datos[0].imagen2} className="w-100 h-100" allow="autoplay"></iframe>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <CFooter rutatmp='./' />
      </div>
    </>
  )
}
