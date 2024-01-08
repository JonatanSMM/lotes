"use client"
import CFooter from '../components/estructura/footer'
import CFormulario from '../components/estructura/formulario'
import CTop from '../components/estructura/top'
import CAdorno from '../components/estructura/adorno'
//import "./../../../estructura/ubicacion/page.modules.css";
//import type { Metadata } from 'next'
/*export const metadata: Metadata = {
  title: 'Compratulote.pe : Plantilla',
  description: 'Plantilla inicicial',
}*/


export default function EstructuraInicio() {
  //var textoResaltado = null;
  function cambiarColor() {
    /*console.log(this);
    if (textoResaltado) {
      textoResaltado.classList.remove("p-red");
    }
    texto.classList.add("p-red");
    textoResaltado = texto;*/
  }

  return (
    <>
      <div className="row bg-white">
        <CTop selMenu="ubicacion" pagenav="./../" />

        <div className="x_content" >
          <CAdorno />
          <div className="container">
            <div className="row g-5">
              <div className="col-md-7 col-lg-8">
                <h2 className="fw-bold text-danger">Conoce nuestra ubicación</h2>
                <div className="container mt-4">
                  <div className="row">
                    <div className="d-grid gap-2 d-md-block pb-3">
                      <button className="btn btn-danger fw-bold" type="button">¿Cómo llegar?</button>&nbsp;
                      <button className="btn btn-secondary fw-bold" type="button">Google Maps</button>
                    </div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105115.97064104833!2d-58.45320578267258!3d-34.582052521370876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b173ff2b9d%3A0xcc1a7520e4e81f5e!2sLago%20de%20Regatas!5e0!3m2!1ses!2spe!4v1696482107263!5m2!1ses!2spe"
                      width="600" height="450" loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                </div>
              </div>

              <CFormulario />
              <hr className="my-4 bg-red border-3" />
              <div className="row mb-4">
                <div className="col-md-7 col-lg-8">
                  <div className="container px-4 text-center">
                    <div className="row gx-5">
                      <div className="accordion" id="accordionExample">
                        <div id="collapseOne" className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample">
                          <div className="row">
                            <div className="col-md-6 pe-0">
                              <h1 className="fw-bold text-danger">Título de Video</h1>
                            </div>
                            <div className="col-md-6 ps-1">
                              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                                diam nonummy nibh eu</p>
                            </div>
                            <div
                              className="col-md-12 object-fit-cover border border-danger border-3 p-1">
                              <video autoPlay src="./../../recursosestructura/imagenes/video1.mp4" className="w-100" ></video>
                            </div>
                          </div>
                        </div>
                        <div id="collapseTwo" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>2.</strong> It is
                            hidde<h2>Recurso 2</h2>
                            though the transition does limit overflow.
                          </div>
                        </div>
                        <div id="collapseThree" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>3.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control the
                            overall appearance, a<h2>Recurso 3</h2>s with custom CSS or
                            overriding our default variables. It is also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                          </div>
                        </div>
                        <div id="collapseFour" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>4.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to st<h2>Recurso 4</h2>this with custom CSS or
                            overriding our default variables. It is also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                          </div>
                        </div>
                        <div id="collapseFive" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>5.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style<h2>Recurso 5</h2>also worth noting that
                            just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                          </div>
                        </div>
                        <div id="collapseSix" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>6.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style e<h2>Recurso 6</h2>also worth noting
                            that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                          </div>
                        </div>
                        <div id="collapseSeven" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>7.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style e<h2>Recurso 7</h2>lso worth noting
                            that just about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                          </div>
                        </div>
                        <div id="collapseEight" className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>T8.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style <h2>Recurso 8</h2>o worth noting that
                            just about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-lg-4 p-4 "><br />
                  <div className="no-left-top-shadow rounded-3">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item border border-top-1 border-bottom-0 p-1"><br />
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 01</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item border border-top-0 border-bottom-0 p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 02</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item border border-top-0 border-bottom-0 p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                            aria-expanded="false" aria-controls="collapseThree">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 03</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item border border-top-0 border-bottom-0 p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                            aria-expanded="false" aria-controls="collapseFour">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 04</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item border border-top-0 border-bottom-0 p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive"
                            aria-expanded="false" aria-controls="collapseFive">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 05</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item border border-top-0 border-bottom-0 p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix"
                            aria-expanded="false" aria-controls="collapseSix">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 06</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item border border-top-0 border-bottom-0 p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven"
                            aria-expanded="false" aria-controls="collapseSeven">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg> <span className="px-3 text" onClick={cambiarColor}>Dato Ubicación 07</span>
                          </button>
                        </h4>
                      </div>
                      <div className="accordion-item p-1">
                        <h4 className="accordion-header">
                          <button
                            className="accordion-button-no-icon collapsed rounded-5 bg-body border-0 focus-ring focus-ring-light px-4"
                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight"
                            aria-expanded="false" aria-controls="collapseEight">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                              fill="currentColor" className="bi bi-folder-fill crema"
                              viewBox="0 0 16 16">
                              <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                            </svg><span className="px-3" onClick={cambiarColor}>Dato Ubicación 08</span>
                          </button>
                        </h4>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <CFooter rutatmp='./../../' />
      </div>
    </>
  )
}
