export default function CFooter(props:any) {
      let ruta=props.rutatmp||'./'
   return (
      <>
         <footer className="bg-dark text-light text-center py-3">
            <div className="container">
               <p>Copyright &copy; 2023 Los Arrecifes de Mórrope | Desarrollado por Compratulote.pe</p>
            </div>
         </footer>
         <div> 
            <a target="_blank" href="https://api.whatsapp.com/send?phone=51954498176" className="icon-footer-whatssap"><img className="" src={ruta+'images/icon-whatsapp.png'} /></a>
         </div>
      </>
   )
}