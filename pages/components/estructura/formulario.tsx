export default function CFormulario() {
   return (
      <>
<div className="col-md-5 col-lg-4 ">
   <div className="no-left-top-shadow rounded-3">
      <div className="bg-red border p-3" style={{borderStartStartRadius:'13px',borderTopRightRadius:'13px'}}>
         <h3 className="text-light fw-bold text-center">Quiero que
            me contacten</h3>
      </div>
      <form className="needs-validation border mb-5 p-4 rounded-bottom-1">
         <div className="row g-3">
            <div className="col-12">
               <label className="form-label">Nombres:</label>
               <div className="input-group has-validation">
                  <input type="text" className="form-control rounded-0" id="nombres"
                     placeholder="Ingresa tu nombre" required />
               </div>
            </div>
            <div className="col-12">
               <label className="form-label">Apellidos:</label>
               <div className="input-group has-validation">
                  <input type="text" className="form-control rounded-0" id="apellidos"
                     placeholder="Ingresa tus apellidos" required />
               </div>
            </div>
            <div className="col-12">
               <label className="form-label">DNI:</label>
               <div className="input-group has-validation">
                  <input type="text" className="form-control rounded-0" id="dni"
                     placeholder="N° DE DNI" required />
               </div>
            </div>
            <div className="col-12">
               <label className="form-label">CELULAR:</label>
               <div className="input-group has-validation">
                  <input type="text" className="form-control rounded-0" id="celular"
                     placeholder="N° de Celular" required />
               </div>
            </div>
            <div className="col-12">
               <label className="form-label">CORREO:</label>
               <div className="input-group has-validation">
                  <input type="text" className="form-control rounded-0" id="celular"
                     placeholder="Correo Electrónico" required />
               </div>
            </div>
         </div>
         <hr className="my-4 border-0" />
         <button className="w-100 btn btn-dark btn-lg fw-bold rounded-0"
            type="submit">ENVIAR</button>
         <br />
      </form>
   </div>
</div>
</>
   )
}