import Link from 'next/link';
import DefaultDashboardLayout from '../../layouts/DefaultDashboardLayout'
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Key } from 'react-feather';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Inicio from './carrousel/Inicio';
import Paginas from './carrousel/Paginas';
const Crud6 = () => {
    const [datos, setDatos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState('home');

    const ocultarMantenimiento = (seccion) => {
        setSeccionActiva(seccion);
    };

    const [formData, setFormData] = useState({
        id: '',
        texto: '',
        categoria: '',
        imagen: '',
        href: '',
    });
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };


    useEffect(() => {
        fetch('http://localhost:3001/slider2')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleEditClick = (id) => {
        setEditItemId(id);
        setLgShow(true);

        fetch(`http://localhost:3001/slider2/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    id: data.id,
                    texto: data.texto,
                    categoria: data.categoria,
                    imagen: data.imagen,
                    href: data.href,
                });
            })
            .catch((error) => {
                console.error('Error al obtener datos para editar:', error);
            });
    };

    const handleSaveClick = () => {
        if (editItemId) {
            fetch(`http://localhost:3001/slider2/${editItemId}`, {
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
            fetch('http://localhost:3001/slider2', {
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
                fetch(`http://localhost:3001/slider2/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Datos guardados:', data);
                        fetch('http://localhost:3001/slider2')
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
                <Row className="align-items-center">
                    <Col xl={12} lg={12} md={12} xs={12}>

                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-2 px-4">
                                <div className="d-flex align-items-center">

                                    <div className="lh-1">
                                        <h3 className="mb-2 text-secondary">FORMULARIO CARRUSEL</h3>
                                        <p>En el siguiente formulario podrás visualizar tus cambios del slider como también editar sus datos.</p>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                            {/* nav */}

                            <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${seccionActiva === 'home' ? 'active' : ''}`}
                                        href="#"
                                        onClick={() => ocultarMantenimiento('home')}
                                    >
                                        SLIDERS
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${seccionActiva === 'paginas' ? 'active' : ''}`}
                                        href="#"
                                        onClick={() => ocultarMantenimiento('paginas')}
                                    >
                                        MANTENIMIENTO
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        Otros
                                    </Link>
                                </li>

                            </ul>


                        </div>
                    </Col>
                </Row>
                <br />
                <Row className="mb-8 m-1">
                    {seccionActiva === 'paginas' && <Paginas />}
                    {seccionActiva === 'home' && <Inicio />}
                </Row>


            </DefaultDashboardLayout>
        </>
    )
}

export default Crud6