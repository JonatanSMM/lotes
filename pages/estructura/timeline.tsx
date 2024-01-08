"use client"
import CFooter from '../components/estructura/footer'
import CTop from '../components/estructura/top'
import CFormulario from '../components/estructura/formulario'
import CAdorno from '../components/estructura/adorno'
import { Accordion } from 'react-bootstrap'
import CAnuncio from '../components/estructura/anuncio'
import { useEffect, useState } from 'react'



export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');



  /*function cambiarColor() {console.log(this);if (textoResaltado) {
     textoResaltado.classList.remove("p-red");} texto.classList.add("p-red");textoResaltado = texto; }*/

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
      .catch(error => console.error("Aquí hay un error", error));
  }, []);

  return (
   
      <div className="row bg-white">
        <CTop selMenu="timeline" pagenav="./../" />

        <div className="x_content" >
          <CAdorno />
          <div className="container">
            <div className="row g-5">
              <div className="col-md-7 col-lg-8">
                <CAnuncio />

                <div className='container'>
                  <div className='row'>
                    {datos.map((fila, index) => (
                      <Accordion>

                        <Accordion.Item eventKey="0" style={{ border: 'none', marginBottom: '10px' }}>
                          <Accordion.Header style={{ border: '1px solid lightgray', borderRadius: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                            <strong> {fila.titulo}</strong>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className='row '>
                              <div className={fila.style1}>
                                <img src={fila.imagen} alt='' className='img-fluid' />
                              </div>
                              <div className={fila.style2}>

                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>

                      </Accordion>
                    ))}
                  </div>

                </div>
                <div>
        

                </div>
              </div>
              <CFormulario />
              <br />
            </div>
          </div>
          <br />
        </div>

        <CFooter rutatmp='./../../' />
      </div >
    
  )
}
