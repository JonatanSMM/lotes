import { useEffect, useState } from "react";

export default function CNavbar({ pagenav = "" }) {
    const [datos, setDatos] = useState([]);
    const [selMenu, setSelMenu] = useState('');
    useEffect(() => {
        const urlParts = window.location.pathname.split('/');
        const categoriaFromUrl = urlParts[urlParts.length - 1];

        fetch('http://localhost:3001/menusES')
            .then(response => response.json())
            .then(data => {
                setDatos(data);
                setSelMenu(categoriaFromUrl);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    return (
        <>
            <div className="x_panel">
                <div className="x_title">
                    <ul className="nav flex-column flex-sm-row justify-content-center bg-white p-3">
                        {datos.map((fila, index) => (

                            <li key={fila.id} className="nav-item">
                               <img src={fila.icon} style={{zoom:'0.6'}}/> 
                               <strong> 
         <a className={`nav-link ${selMenu.toLowerCase() === fila.texto.toLowerCase() ? 'text-light active bg-red mx-2 rounded-5' : 'text-dark'
                                    }`}  href={'../estructura'+fila.href}>
                                 {fila.texto}
                                </a></strong>
                            </li>
                            
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}