export default function CAnuncio1() {
    return (
       <>
          <div className="fondo-red">
             <div className="container">
                <div className="row" >
                   <div className="align-self-stretch col-sm-12 col-md-4 anuncio1 text-center">
                     Anuncia tu Proyecto inmobiliario<br/>
                      <button className="btn btn-warning btnanunciaaqui">¡Aqui!</button> <br/>
                     Contactanos<br/>
                      <i className="fe fe-phone"></i> 074-307092
                   </div>
                   <div className=" align-self-stretch col-sm-12 col-md-8">
                      <a href="/">
                        <img src="anuncio1.jpg" className="img-responsive img-fluid" />
                      </a>
                   </div>
                </div>
             </div>
          </div>
       </>
    )
 }