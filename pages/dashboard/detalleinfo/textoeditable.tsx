import Link from 'next/link';
import { FormSelect, DropFiles } from "widgets";
import { Col, Row, Form, Card, Button, Image, Table, Modal } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import toolbar from './toolbar'
import 'quill/dist/quill.snow.css'

const Textoeditable = () => {
    const [title, setTitle] = useState('');
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar
        }

    })

    const [content, setContent] = useState('');
    const handleChange = (event) => {
        setTitle(event.target.value)
    };
    return (
        <>
            <Row className="mb-8 m-1">
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Card>
                        {/* card body */}
                        <Card.Body>
                                <div className='row'>
                                    <div className="container">
                                        <form>
                                            <label htmlFor='title'>Título:</label>
                                            <input type='text' placeholder='titulo' id='value' value={title} onChange={handleChange} /><br /><br />
                                            <div className='editor'>
                                                <div ref={quillRef}></div>
                                            </div>
                                            <button>Enviar</button>
                                        </form>
                                    </div>
                                </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Textoeditable