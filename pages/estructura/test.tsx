"use client"
import CAdorno from '../components/estructura/adorno'
import { useQuill } from 'react-quilljs';
import { useState } from 'react'
import toolbar from '../dashboard/detalleinfo/toolbar'
import 'quill/dist/quill.snow.css'

export default function estructurainicio() {
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
        <div className="row bg-white">
            <div className="x_content" >
                <CAdorno />
                <div className="container">
                    <h1>Nueva nota</h1>
                    <form>
                        <label htmlFor='title'>Título:</label>
                        <input type='text' placeholder='titulo' id='value' value={title} onChange={handleChange}/>
                        <div className='editor'>
                            <div ref={quillRef}></div>
                        </div>
                        <button>Enviar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

