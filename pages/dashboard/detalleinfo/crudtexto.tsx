import Link from 'next/link';
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Crudtexto = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        categoria: '',
        imagen1: '',
        imagen2: '',
        subTitulo: '',
        subMensaje1: '',
        subMensaje2: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || fila.categoria.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        fetch('http://localhost:3001/informacionES')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);



    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/informacionES/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    categoria: data.categoria,
                    imagen1: data.imagen1,
                    imagen2: data.imagen2,
                    subTitulo: data.subTitulo,
                    subMensaje1: data.subMensaje1,
                    subMensaje2: data.subMensaje2
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/informacionES/${editItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos actualizados:', data);
                    // Realizar otras acciones después de actualizar, si es necesario
                })
                .catch((error) => {
                    console.error('Error al actualizar datos:', error);
                });

            // Limpiar el estado de edición después de la actualización
            setEditItemId(null);
        } else {
            fetch('http://localhost:3001/informacionES', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos guardados:', data);
                    // Realizar otras acciones después de guardar, como redirigir o actualizar la lista de datos
                })
                .catch((error) => {
                    console.error('Error al guardar datos:', error);
                });
        }
    };

    const handleDeleteClick = (id) => {
        setIdToDelete(id);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Seguro de querer eliminar?",
            text: "Si elimina, no se puede deshacer los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Operación Existosa!",
                    text: "Su archivo ha sido eliminado.",
                    icon: "success"
                });
                fetch(`http://localhost:3001/informacionES/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/informacionES')
                            .then((response) => response.json())
                            .then((menusData) => {
                                setDatos(menusData);
                            })
                            .catch((error) => {
                                console.error('Error al actualizar menus:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error al guardar datos:', error);
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Operación cancelada",
                    text: "Archivo aún conservado",
                    icon: "error"
                });
            }
        });

    };

    return (
        <>
                <Row className="mb-8 m-1">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <Card>
                            {/* card body */}
                            <Card.Body>
                                <div className="mb-4 mb-lg-0">
                                    <br />
                                    <div className='row text-end'>
                                        <div className='col-md-6 col-lg-6 col-xs-6'>
                                            &nbsp;
                                        </div>
                                        <div className='col-md-4 col-lg-4 col-xs-4 '>
                                            <input type='search' placeholder='Nueva busqueda' className='form-control' onChange={(event) => setSearchTerm(event.target.value)}></input>
                                        </div>
                                        <div className='col'>
                                            <Button onClick={() => setLgShow(true)}>REGISTRAR</Button>{' '}
                                        </div>
                                    </div>
                                    <br />
                                    <Table hover responsive className="scroll text-nowrap">
                                        <thead >
                                            <tr className='table-secondary'>
                                                <th scope="col">Id</th>
                                                <th scope="col">Titulo</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Categoria</th>
                                                <th scope="col">Imagen 1</th>
                                                <th scope="col">Imagen 2</th>
                                                <th scope="col">SubTitulo</th>
                                                <th scope="col">Mensaje 1</th>
                                                <th scope="col">Mensaje 2</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMenus.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <td>{fila.id}</td>
                                                    <td>{fila.titulo}</td>
                                                    <td><textarea className='form-control no-scroll' value={fila.descripcion} style={{ width: '350px', border:'none', overflowY:'hidden'}}/></td>
                                                    <td>{fila.categoria}</td>
                                                    <td><textarea className='form-control no-scroll' value={fila.imagen1} style={{ width: '350px', border:'none', overflowY:'hidden'}}/></td>
                                                    <td><textarea className='form-control no-scroll' value={fila.imagen2} style={{ width: '350px', border:'none', overflowY:'hidden'}}/></td>
                                                    <td>{fila.subTitulo}</td>
                                                    <td><textarea className='form-control no-scroll' value={fila.subMensaje1} style={{ width: '350px', border:'none', overflowY:'hidden'}}/></td>
                                                    <td><textarea className='form-control no-scroll' value={fila.subMensaje2} style={{ width: '350px', border:'none', overflowY:'hidden'}}/></td>
                                                    <td>
                                                        <Button onClick={() => handleEditClick(fila.id)} >  <i className="fe fe-edit fa-lg text-light"></i>   </Button>{' '}
                                                        <Button onClick={() => handleDeleteClick(fila.id)} className='btn-danger'><i className="fe fe-trash fa-lg"></i></Button>{' '}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                <Fragment>
                    <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <h4 ><strong>MANTENIMIENTO:</strong> Página Menu</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                                <div>
                                    {/* border */}
                                    <Form>
                                        <Row className="mb-3">
                                            <div className="col-sm-12 col-lg-12">
                                                <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Ruta" value={formData.href} onChange={(e) => handleInputChange('href', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Texto" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Icono" value={formData.icon} onChange={(e) => handleInputChange('icon', e.target.value)} />
                                            </div>
                                        </Row>
                                        {/* row */}

                                        {/* Location */}
                                        <Row className="mb-3 text-end">

                                            <Col md={12} xs={12}>
                                                <Button className="btn btn-primary" type="submit" onClick={() => handleSaveClick()}>GUARDAR</Button>
                                                &nbsp;
                                                <Button className="btn btn-primary" type="reset" >LIMPIAR</Button>
                                            </Col>
                                        </Row>

                                    </Form>
                                </div>

                            </Col>
                        </Modal.Body>

                    </Modal>
                </Fragment>
            
        </>
    )
}

export default Crudtexto