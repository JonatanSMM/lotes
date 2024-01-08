import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Crud = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        href: '',
        texto: '',
        icon: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.texto.toLowerCase().includes(searchTerm.toLowerCase()) || fila.href.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        fetch('http://localhost:3001/menus')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);



    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/menus/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    href: data.href,
                    texto: data.texto,
                    icon: data.icon,
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/menus/${editItemId}`, {
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
            fetch('http://localhost:3001/menus', {
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
                fetch(`http://localhost:3001/menus/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/menus')
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
            <DefaultDashboardLayout>
                <br />
                <Row className="mb-8 m-1">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <Card>
                            {/* card body */}
                            <Card.Body>
                                <div className="mb-4 mb-lg-0">
                                    <h4 className="mb-1 text-secondary">FORMULARIO MENU</h4>
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
                                                <th scope="col">N°</th>
                                                <th scope="col">Id</th>
                                                <th scope="col">Ruta</th>
                                                <th scope="col">Texto</th>
                                                <th scope="col">Iconos</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMenus.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{fila.id}</td>
                                                    <td>{fila.href}</td>
                                                    <td>{fila.texto}</td>
                                                    <td>{fila.icon}</td>
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
            </DefaultDashboardLayout>
        </>
    )
}

export default Crud