import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const countryOptions = [
    { value: "India", label: "Tecnologia" },
    { value: "US", label: "US" },
    { value: "UK", label: "UK" },
    { value: "UAE", label: "UAE" },
];
const Crud3 = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        imagen: '',
        url: '',
        fecha_publicacion: ''
    });

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        fetch('http://localhost:3001/publicidad')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/publicidad/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    titulo: data.titulo,
                    imagen: data.imagen,
                    url: data.url,
                    fecha_publicacion: data.fecha_publicacion
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/publicidad/${editItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos actualizados:', data);
                })
                .catch((error) => {
                    console.error('Error al actualizar datos:', error);
                });

            setEditItemId(null);
        } else {
            fetch('http://localhost:3001/publicidad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos guardados:', data);
                })
                .catch((error) => {
                    console.error('Error al guardar datos:', error);
                });
        }
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
                                <h4 className="mb-1 text-secondary">FORMULARIO PUBLICIDAD</h4>
                                    <br />
                                    <div className='row text-end'>
                                        <div className='col-md-6 col-lg-6 col-xs-6'>
                                            &nbsp;
                                        </div>
                                        <div className='col-md-4 col-lg-4 col-xs-4 '>
                                            <input type='search' placeholder='Nueva busqueda' className='form-control'></input>
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
                                                <th scope="col">Imagen</th>
                                                <th scope="col">Ruta</th>
                                                <th scope="col">Fecha Publicidad</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <th scope="row">{fila.id}</th>
                                                    <td>{fila.titulo}</td>
                                                    <td>{fila.imagen}</td>
                                                    <td>{fila.url}</td>
                                                    <td>{fila.fecha_publicacion}</td>
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
                                <h4 ><strong>MANTENIMIENTO:</strong> PUBLICIDAD</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                                <div>
                                    {/* border */}
                                    <Form>
                                        {/* row */}
                                        <Row className="mb-3">
                                            <div className="col-sm-12 col-lg-12">
                                                <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Imagen" value={formData.imagen} onChange={(e) => handleInputChange('imagen', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Url" value={formData.url} onChange={(e) => handleInputChange('url', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Fecha Publicacion" value={formData.fecha_publicacion} onChange={(e) => handleInputChange('fecha_publicacion', e.target.value)} />
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

export default Crud3