import { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function CBanner() {
/*
 <iframe className="w-100 h-100" src={fila.href} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
*/





    const [datos, setDatos] = useState([]);
    const [setBanner, setBanners] = useState('');
    const [lgShow, setLgShow] = useState(false);
    useEffect(() => {
        const identificador = window.location.pathname.split('/');
        const categoriaApi = identificador[identificador.length - 1];

        fetch('http://localhost:3001/sliderES')
            .then(response => response.json())
            .then(data => {
                const imagenesFiltradas = data.filter(fila => fila.categoria === categoriaApi);
                setDatos(imagenesFiltradas);
                setBanners(categoriaApi);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    return (
        <>
            {datos.map((fila, index) => (
                <div key={fila.id}>
                    <div className="x_content">
                        <div className="container-fluid p-0 contenedor-imagen" >
                            <div className="x_content">
                                <div className="container-fluid p-0 contenedor-imagen">

                                    <div className="position-relative">
                                        <img src={fila.imagen} className="fondo" alt={fila.categoria} />
                                        <div className="position-absolute w-100 texto-superpuesto">
                                            <h1 className="text-white titulo-Intro">{fila.titulo}</h1>
                                            <p className="text-white">{fila.subtitulo}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                className="bi bi-play-circle-fill icono-reproducir " data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16" onClick={() => setLgShow(true)}>
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                        </div>
                    </div>


                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalFullscreenLabel" aria-hidden="true">
                        <div className="modal-dialog modal-fullscreen m-0">
                            <div className="modal-content">
                                <div className="modal-header bg-dark border-0">
                                    <h1 className="modal-title fs-4" id="exampleModalFullscreenLabel" />
                                    <button type="button" className="btn-close bg-red text-light" data-bs-dismiss="modal" aria-label="Cerca"></button>
                                </div>
                                <div className="modal-body bg-dark">
                                    <iframe className="w-100 h-100" src={fila.href} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Fragment>
                        
                        <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" style={{backgroundColor:'black'}}>
                            <Modal.Header closeButton style={{backgroundColor:'lightgray'}}>
                                
                            </Modal.Header>
                            <Modal.Body style={{backgroundColor:'lightgray'}}>
                            <div className="modal-body bg-dark" style={{height:'80vh'}}>
                            <iframe className="w-100 h-100" src={fila.href} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>  
                                </div>
                            </Modal.Body>
                        </Modal>
                      
                    </Fragment>



                </div>
            ))}
        </>
    )
}