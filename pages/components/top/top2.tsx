import CMenusTop from "../menus/menutop";
import CAnimacion from "../slider/animacion";
import CTop1 from "./top1";

export default function CTop2(props:any) {
  const menu=props.menu||'inicio';
  return (
    <>
    <CTop1 />
    <div className="bg-blanco">
      <div className="container topbarlogo">
        <div className="row">
          <div className="text-center text-md-start col-sm-12 col-md-4">
              <a href="/" title="logo"><img src="/logo1.png" /></a>
          </div>
          <div className="text-center text-md-end col-sm-12 col-md-8 ">     
              <div className="row infocontact text-dark">
                <div className="col-sm-12 col-md-6">
                  <i className="fe fe-phone icontop"></i> 074-307092
                </div>
                <div className="col-sm-12 col-md-6">
                  <i className="fe fe-mail icontop "></i> operaciones@innovate.pe
                </div>
              </div>
          </div>
        </div>        
      </div>
      <CMenusTop menu={menu}/>
      <CAnimacion />
    </div>
    </>
   )
 }