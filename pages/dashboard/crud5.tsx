import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Crud5 = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        href: '',
        image: '',
        direccion: '',
        departamento: '',
        numerovistas: '',
        destacado: '',
        parques: '',
        jardines: '',
        luz: '',
        agua: '',
        pistas: '',
        veredas: '',
        lotesdesdem2: '',
        fecha_registro: ''
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        fetch('http://localhost:3001/proyectos')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);
    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/proyectos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    href: data.href,
                    image: data.image,
                    direccion: data.direccion,
                    departamento: data.departamento,
                    numerovistas: data.numerovistas,
                    destacado: data.destacado,
                    parques: data.parques,
                    jardines: data.jardines,
                    luz: data.luz,
                    agua: data.agua,
                    pistas: data.pistas,
                    veredas: data.veredas,
                    lotesdesdem2: data.lotesdesdem2,
                    fecha_registro: data.fecha_registro
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/proyectos/${editItemId}`, {
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
            fetch('http://localhost:3001/proyectos', {
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
                fetch(`http://localhost:3001/proyectos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/proyectos')
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
                                <h4 className="mb-1 text-secondary">FORMULARIO PROYECTOS</h4>
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
                                                <th scope="col">Descripcion</th>
                                                <th scope="col">Ruta</th>
                                                <th scope="col">Imagenes</th>
                                                <th scope="col">Direccion</th>
                                                <th scope="col">Departamento</th>
                                                <th scope="col">Visitas</th>
                                                <th scope="col">Destacado</th>
                                                <th scope="col">Parques</th>
                                                <th scope="col">Jardines</th>
                                                <th scope="col">Luz</th>
                                                <th scope="col">Agua</th>
                                                <th scope="col">Pistas</th>
                                                <th scope="col">Veredas</th>
                                                <th scope="col">Metro 2</th>
                                                <th scope="col">Fecha Registro</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <th scope="row">{fila.id}</th>
                                                    <td>{fila.titulo}</td>
                                                    <td><textarea className='form-control' value={fila.descripcion} style={{ width: '350px', border:'none', overflowY:'hidden'}} /></td>
                                                    <td>{fila.href}</td>
                                                    <td>{fila.image}</td>
                                                    <td>{fila.direccion}</td>
                                                    <td>{fila.departamento}</td>
                                                    <td>{fila.numerovistas}</td>
                                                    <td>{fila.destacado !== undefined && fila.destacado !== null ? Boolean(fila.destacado).toString() : ''}</td>
                                                    <td>{fila.parques !== undefined && fila.parques !== null ? Boolean(fila.parques).toString() : ''}</td>
                                                    <td>{fila.jardines !== undefined && fila.jardines !== null ? Boolean(fila.jardines).toString() : ''}</td>
                                                    <td>{fila.luz !== undefined && fila.luz !== null ? Boolean(fila.luz).toString() : ''}</td>
                                                    <td>{fila.agua !== undefined && fila.agua !== null ? Boolean(fila.agua).toString() : ''}</td>
                                                    <td>{fila.pistas !== undefined && fila.pistas !== null ? Boolean(fila.pistas).toString() : ''}</td>
                                                    <td>{fila.veredas !== undefined && fila.veredas !== null ? Boolean(fila.veredas).toString() : ''}</td>
                                                    <td>{fila.lotesdesdem2}</td>
                                                    <td>{fila.fecha_registro}</td>
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
                                <h4 ><strong>MANTENIMIENTO:</strong> PROYECTOS</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col xl={12} lg={12} md={12} xs={12} className='p-2'>
                                <div>
                                    {/* border */}
                                    <Form>
                                        {/* row */}
                                        <Row className="mb-3">
                                            <div className="col-sm-6 col-lg-6">
                                                <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <input className="form-control" type="text" placeholder="Fecha de Registro" value={formData.fecha_registro} onChange={(e) => handleInputChange('fecha_registro', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-md-3 col-3">
                                                <input className="form-control" type="text" placeholder="Departamento" value={formData.departamento} onChange={(e) => handleInputChange('departamento', e.target.value)} />
                                            </div>
                                            <div className="col-md-3 col-3">
                                                <input className="form-control" type="text" placeholder="Direccion" value={formData.direccion} onChange={(e) => handleInputChange('direccion', e.target.value)} />
                                            </div>
                                     
                                            <div className="col-md-3 col-3">
                                                <input className="form-control" type="text" placeholder="Views" value={formData.numerovistas} onChange={(e) => handleInputChange('numerovistas', e.target.value)} />
                                            </div>

                                            <div className='col-md-3 col-3'>
                                                <input className="form-control" type="text" placeholder="Areas por Mtrs 2" value={formData.lotesdesdem2} onChange={(e) => handleInputChange('lotesdesdem2', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <textarea className='form-control' value={formData.descripcion} onChange={(e) => handleInputChange('descripcion', e.target.value)} />
                                            </div>
                                        </Row>
                                    
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Imagen" value={formData.image} onChange={(e) => handleInputChange('image', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Parques</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.parques)} onChange={(e) => handleInputChange('parques', e.target.checked)} />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Jardines</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.jardines)} onChange={(e) => handleInputChange('jardines', e.target.checked)} />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Luz</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.luz)} onChange={(e) => handleInputChange('luz', e.target.checked)} />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Destacado</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.destacado)} onChange={(e) => handleInputChange('destacado', e.target.checked)} />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Agua</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.agua)} onChange={(e) => handleInputChange('agua', e.target.checked)} />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Pistas</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.pistas)} onChange={(e) => handleInputChange('pistas', e.target.checked)} />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-3">
                                                <div className='form-check form-switch'>
                                                    <label className="form-check-label"> Veredas</label>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                        checked={Boolean(formData.veredas)} onChange={(e) => handleInputChange('veredas', e.target.checked)} />
                                                </div>
                                            </div>
                                           
                                        </Row>
                                       
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Ruta" value={formData.href} onChange={(e) => handleInputChange('href', e.target.value)} />
                                            </div>
                                        </Row>

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

export default Crud5