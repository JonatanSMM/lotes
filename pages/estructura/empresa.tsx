"use client"
import CFooter from '../components/estructura/footer'
import CFormulario from '../components/estructura/formulario'
import CTop from '../components/estructura/top'
import CAdorno from '../components/estructura/adorno'
import CAnuncio from '../components/estructura/anuncio'
import { useEffect, useState } from 'react'
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
      .catch(error => console.error('Tenemos un error', error));
  }, []);

  return (
    <>
      <div className="row bg-white">
        <CTop selMenu="empresa" pagenav="./../" />
        <div className="x_content" >
          <CAdorno />
          <div className="container">
            <div className="row g-5 mb-3">
              <div className="col-md-7 col-lg-8">
                <CAnuncio />
                <div className="container mt-4 gx-5 ">
                  <div className="row">
                    <div className="col-md-6">
                      <img src="/images/icons/Img3.png" className="border w-100" />
                    </div>
                    <div className="col-md-6">
                      <img src="/images/icons/Img3.png" className="border w-100" />
                    </div>
                  </div>
                  {datos.map((fila, index) => (
                    <div className="row" key={fila.id}>
                      <div className="col-md-12 py-3 text-justify">
                        <h2 className="fw-bold text-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                          </svg> {fila.titulo}
                        </h2>
                        <p>{fila.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <CFormulario />
            </div>
          </div>
        </div>
        <CFooter rutatmp='./../../' />
      </div>
    </>
  )
}
