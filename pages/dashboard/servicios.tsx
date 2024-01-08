import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Servicios = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        categoria: '',
        titulo: '',
        texto: '',
        imagen: '',
        style1: '',
        style2: ''

    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const filteredMenus = datos.filter((fila) =>
        (fila.texto.toLowerCase().includes(searchTerm.toLowerCase()) || fila.titulo.toLowerCase().includes(searchTerm.toLowerCase())));

    useEffect(() => {
        fetch('http://localhost:3001/serviciosES')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);



    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/serviciosES/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    categoria: data.categoria,
                    titulo: data.titulo,
                    texto: data.texto,
                    imagen: data.imagen,
                    style1: data.style1,
                    style2: data.style2

                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/serviciosES/${editItemId}`, {
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
            fetch('http://localhost:3001/serviciosES', {
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
                fetch(`http://localhost:3001/serviciosES/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/serviciosES')
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
                            <Card.Body>
                                <div className="mb-4 mb-lg-0">
                                    <h4 className="mb-1 text-secondary">FORMULARIO SERVICIOS</h4>
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
                                                <th scope="col">Categoria</th>
                                                <th scope="col">Titulo</th>
                                                <th scope="col">Texto</th>
                                                <th scope="col">Imagen</th>
                                                <th scope='col'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMenus.map((fila, index) => (
                                                <tr key={fila.id}>
                                                    <td>{fila.id}</td>
                                                    <td>{fila.categoria}</td>
                                                    <td>{fila.titulo}</td>
                                                    <td><textarea className='form-control no-scroll' value={fila.texto} style={{ width: '350px', border: 'none', overflowY: 'hidden', backgroundColor: 'white' }} disabled /></td>
                                                    <td>{fila.imagen}</td>
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
                                            <div className="col-md-4 col-4">
                                                <select className="form-select"
                                                    id="floatingSelect" aria-label="Floating label select example"
                                                    value={formData.categoria} onChange={(e) => handleInputChange('categoria', e.target.value)}>
                                                    <option value="" disabled>Selecciona un categoria</option>

                                                    {datos.filter((value, index, self) => index === self.findIndex((v) => v.categoria === value.categoria))
                                                        .map((fila, index) => (
                                                            <option key={index} value={fila.categoria}>{fila.categoria}</option>
                                                        ))}
                                                </select>
                                            </div>

                                            <div className="col-md-4 col-sm-4 col-4">
                                                <input type="text" className="form-control" placeholder="Id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} />
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-4">
                                                <input type="text" className="form-control" placeholder="Titulo" value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className='col-md-12 col-12 text-center'>
                                                <small style={{ color: '#BA7480' }}>Si se inserta iframe eliminar width, height y deberá ser reemplazado por className:'w-100 h-100 img-flid'</small>
                                                <input type="text" className="form-control" placeholder="<iframe src='https://ruta/vd.mp4' className:'w-100 h-100 img-flid' allow='autoplay'></iframe>" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Imagen: /ruta/imagen.png" value={formData.imagen} onChange={(e) => handleInputChange('imagen', e.target.value)} />
                                            </div>
                                        </Row>

                                        {formData.categoria === 'timeline' && (
                                            <>
                                                <Row className="mb-1">
                                                    <div className="col-md-6 col-6 text-center">
                                                        <input className="form-control" type="text" placeholder="Estilo: col" value={formData.style1} onChange={(e) => handleInputChange('style1', e.target.value)} />
                                                    </div>

                                                    <div className="col-md-6 col-6 text-center">
                                                        <input className="form-control" type="text" placeholder="Estilo: col" value={formData.style2} onChange={(e) => handleInputChange('style2', e.target.value)} />
                                                    </div>
                                                </Row>

                                                <Row className="mb-3">
                                                    <div className="col-md-6 col-6 text-center">
                                                        <small style={{ color: '#BA7480', lineHeight: '1px' }}>col + col = "Si se insertan 2 elementos: "imagen y iframe"</small>
                                                    </div>

                                                    <div className="col-md-6 col-6 text-center">
                                                        <small style={{ color: '#BA7480', lineHeight: '1px' }}>col + null= "Si queremos que la columna sea completa"</small>
                                                    </div>
                                                </Row>
                                            </>)
                                        }

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

export default Servicios