import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Sliders } from 'react-feather';
import Textarea from 'react-textarea-autosize'
function Crud4() {
    const [slider, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        texto: '',
        imagen: '',
        href: ''
    });
    const [objectName, setNombreObjeto] = useState(null);
    const [nombreObjetoEditar, setNombreObjetoEditar] = useState(null);
    const [indexEditar, setIndexEditar] = useState(null);
    

    useEffect(() => {
        fetch('http://localhost:3001/slider')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleEditClick = (key, id, index) => {
        setEditItemId(id);
        setLgShow(true);
        setNombreObjetoEditar(key);
        setIndexEditar(index);
    
        fetch(`http://localhost:3001/slider/${key}/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    texto: data.texto,
                    imagen: data.imagen,
                    href: data.href
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };
    
    const handleSaveClick = () => {
        if (nombreObjetoEditar !== null && indexEditar !== null) {
            const updatedSlider = slider.map((categoria) => {
                const key = Object.keys(categoria)[0];
                if (key === nombreObjetoEditar) {
                    return {
                        [key]: categoria[key].map((item, index) =>
                            index === indexEditar
                                ? { ...item, id: formData.id, texto: formData.texto, imagen: formData.imagen, href: formData.href }
                                : item
                        )
                    };
                }
                return categoria;
            });
    
            setDatos(updatedSlider);
            setLgShow(false);
            setNombreObjetoEditar(null);
            setIndexEditar(null);
        }
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
                                    <h4 className="mb-1"><strong>FORMULARIO SLIDER</strong>&nbsp;</h4>
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
                                        <thead>
                                            <tr className='table-dark'>
                                                <th></th>
                                                <th scope="col" className='text-light'>Id</th>
                                                <th scope="col" className='text-light'>Texto</th>
                                                <th scope="col" className='text-light'>Imagen</th>
                                                <th scope="col" className='text-light'>Ruta</th>
                                                <th scope='col' className='text-light'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {slider.map((categoria, indexCategoria) => {
                                                const key = Object.keys(categoria)[0];
                                                const values = categoria[key];
                                                return (
                                                    <React.Fragment key={indexCategoria}>
                                                        {values.map((value, index) => (
                                                            <tr key={`${indexCategoria}-${index}`}>
                                                                {index === 0 && (
                                                                    <React.Fragment>
                                                                        <td rowSpan={values.length} className='table-secondary text-center align-middle ' >{key}</td>
                                                                    </React.Fragment>
                                                                )}
                                                                <td>{value.id}</td>
                                                                <td>{value.texto}</td>
                                                                <td>{value.imagen}</td>
                                                                <td>{value.href !== undefined && value.href !== null ? Boolean(value.href).toString() : ''}</td>
                                                                <td>
                                                                    <Button onClick={() => handleEditClick(key, value.id,index)} >  <i className="fe fe-edit fa-lg text-light"></i>   </Button>{' '}
                                                                    <Button onClick={() => handleDeleteClick(value.id)} className='btn-danger'><i className="fe fe-trash fa-lg"></i></Button>{' '}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                );
                                            })}

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
                                <h4 ><strong>MANTENIMIENTO:</strong> SLIDER</h4>
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
                                                <input type="text" className="form-control" placeholder="Ruta" value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input type="text" className="form-control" placeholder="Ruta" value={formData.href} onChange={(e) => handleInputChange('href', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <input className="form-control" type="text" placeholder="Imagen" value={formData.imagen} onChange={(e) => handleInputChange('imagen', e.target.value)} />
                                            </div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className="col-md-12 col-12">
                                                <Textarea className='form-control' value={formData.texto} onChange={(e) => handleInputChange('texto', e.target.value)} />
                                            </div>
                                        </Row>
                                        {/* row */}

                                        {/* Location */}
                                        <Row className="mb-3 text-end">

                                            <Col md={12} xs={12}>
                                                <Button className="btn btn-primary" type="submit" >GUARDAR</Button>
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

export default Crud4