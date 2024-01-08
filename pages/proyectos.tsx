import type { Metadata } from 'next'
import COMTopInterno from './components/top/topInterno'
//import COMPFooter from './components/footer/footer2'
import COMPAnuncio1 from './components/anuncios/anuncio1'
import COMVerProyectos from './components/proyectos/verproyectos'
import CProductosSliders from './components/proyectos/slider'
export const metadata: Metadata = {
  title: 'Compratulote.pe : Proyectos',
  description: 'Página incial de compra tu lote',
  icons: {
    icon: '/images/compratulote.ico', // /public path
  },
}
export default function Proyectos() {  
  return (
    <>
     <COMTopInterno menu="proyectos" />
     <COMVerProyectos />     
     <CProductosSliders />
     <COMPAnuncio1 />
     
    </>
  )
}
