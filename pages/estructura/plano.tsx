"use client"
import CFooter from '../components/estructura/footer'
import CTop from '../components/estructura/top'
import CAdorno from '../components/estructura/adorno'
export default function EstructuraInicio() {
    function mostrarModal(idProyecto: String) {
        //const exampleModal = new bootstrap.Modal(document.getElementById('mensajeModal'))

        fetch("../recursosestructura/planos.json").then((dataresponse) => {
            return dataresponse.json();
        }).then((data) => {
            let _plano = data.planos.filter((plano: any) => plano.id == idProyecto)
            if (_plano.length == 0) {
                _plano = data.planos.filter((plano: any) => plano.id == "L001")[0];
            } else _plano = _plano[0];

            var placeholder = document.querySelector("#data-output");
            let out = "";
            if (_plano) {
                out += `
        <div class="row text-center text-success">
        <div class="col">
        ${_plano.manzana}
        </div>
        <div class="col">
        ${_plano.lote}
        </div>
        <div class="col">
        ${_plano.areaLote}<br>
        ${_plano.referencia}<br>
        Dimensión 1: ${_plano.dimension1}<br>
        Dimensión 2: ${_plano.dimension2}
        </div>
        
        </div>
        <hr class="my-4 bg-red border-3">
        <div class="row ">
            <div class="col-md-6 text-left">
                <div class="row text-left">
                    <div class="col-md-6 fw-bold">Precio Base:</div>
                    <div class="col-md-6">${_plano.precioBase}</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6 fw-bold">Descuento:</div>
                    <div class="col-md-6 ">${_plano.descuento} %</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6 fw-bold">Precio Descuento:</div>
                    <div class="col-md-6">s/ ${(_plano.precioBase * _plano.descuento) - _plano.precioBase}</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6 fw-bold">Inicial:</div>
                    <div class="col-md-6">s/ ${_plano.inicial}</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6 fw-bold">Saldo Restante:</div>
                    <div class="col-md-6">s/ 19,600.00</div>
                </div>
            </div>
        </div>
        <hr class="my-4 bg-red border-3">
        <div class="row">
            <div class="col-md-12 fw-bold pb-3">Financiamiento:</div>
            <div class="col-md-12 ">
                <table class="table table-borderless text-center table-bordered">
                    <thead class="table-dark ">
                        <tr>
                            <th>N° Cuotas</th>
                            <th>Cuota Mensual</th>
                            <th>Interés Anual</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="border-0 border-secondary-subtle">
                            <td>12</td>
                            <td>s/ ${_plano.cuota12}</td>
                            <td>${_plano.interesAnual} %</td>
                        </tr>
                        <tr class="border-0 border-secondary-subtle">
                            <td>18</td>
                            <td>s/ ${_plano.cuota18}</td>
                            <td>${_plano.interesAnual} %</td>
                        </tr>
                        <tr class="border-0 border-secondary-subtle">
                            <td>24</td>
                            <td>s/ ${_plano.cuota24}</td>
                            <td>${_plano.interesAnual} %</td>
                        </tr>
                        <tr class="border-0 border-bottom border-secondary-subtle ">
                            <td>36</td>
                            <td>s/ ${_plano.cuota36}</td>
                            <td>${_plano.interesAnual} %</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        `;
                //document.getElementById("precioBase").textContent = `${_plano.precioBase}`;
                //document.getElementById("descuento").textContent = `${_plano.descuento}%`;
            } else {
                out += "<p>El ID no se encontró en la base de datos.</p>";
            }

            if (placeholder != null)
                placeholder.innerHTML = out;
        })


    }
    function buscarInfo() {
        var imputManzana = document.getElementById('manzanaInput') as HTMLSelectElement;
        var imputLote = document.getElementById('loteInput') as HTMLSelectElement;
        var manzana = imputManzana != null ? imputManzana.value : '';
        var lote = imputLote != null ? imputLote.value : '';

        fetch("../recursosestructura/planos.json").then(function (response) {
            return response.json();
        }).then(function (data) {
            let _planos = data.planos.filter((plano: any) => { return plano.id === lote && plano.manzana === manzana });
            mostrarResultados(_planos);
        });
    }
    function mostrarResultados(resultados: any) {
        var placeholder = document.querySelector("#info-Plano");
        var out = "";
        if (resultados.length > 0) {
            for (var i = 0; i < resultados.length; i++) {
                var plano = resultados[i];
                out += `
            <div class="row fw-bold text-center ">
            <div class="col">
                Manzana:
            </div>
            <div class="col">
                Lote:
            </div>
            <div class="col">
                Área del Lote:
            </div>
        </div>
            <div class="row text-center text-success">
            <div class="col">
            ${plano.manzana}
            </div>
            <div class="col">
            ${plano.lote}
            </div>
            <div class="col">
            ${plano.areaLote}<br>
            ${plano.referencia}<br>
            Dimensión 1: ${plano.dimension1}<br>
            Dimensión 2: ${plano.dimension2}
            </div>  
            </div>
            <hr class="my-4 bg-red border-3">
            <div class="row ">
                <div class="col-md-6 text-left">
                    <div class="row text-left">
                        <div class="col-md-6 fw-bold">Precio Base:</div>
                        <div class="col-md-6">${plano.precioBase}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6 fw-bold">Descuento:</div>
                        <div class="col-md-6 ">${plano.descuento} %</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6 fw-bold">Precio Descuento:</div>
                        <div class="col-md-6">s/ ${(plano.precioBase * plano.descuento) - plano.precioBase}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6 fw-bold">Inicial:</div>
                        <div class="col-md-6">s/ ${plano.inicial}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6 fw-bold">Saldo Restante:</div>
                        <div class="col-md-6">s/ 19,600.00</div>
                    </div>
                </div>
            </div>
            <hr class="my-4 bg-red border-3">
            <div class="row">
                <div class="col-md-12 fw-bold pb-3">Financiamiento:</div>
                <div class="col-md-12 ">
                    <table class="table table-borderless text-center table-bordered">
                        <thead class="table-dark ">
                            <tr>
                                <th>N° Cuotas</th>
                                <th>Cuota Mensual</th>
                                <th>Interés Anual</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr class="border-0 border-secondary-subtle">
                                <td>12</td>
                                <td>s/ ${plano.cuota12}</td>
                                <td>${plano.interesAnual} %</td>
                            </tr>
                            <tr class="border-0 border-secondary-subtle">
                                <td>18</td>
                                <td>s/ ${plano.cuota18}</td>
                                <td>${plano.interesAnual} %</td>
                            </tr>
                            <tr class="border-0 border-secondary-subtle">
                                <td>24</td>
                                <td>s/ ${plano.cuota24}</td>
                                <td>${plano.interesAnual} %</td>
                            </tr>
                            <tr class="border-0 border-bottom border-secondary-subtle ">
                                <td>36</td>
                                <td>s/ ${plano.cuota36}</td>
                                <td>${plano.interesAnual} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
               
            `;
            }
        } else {
            out = "<p>No se encontraron resultados para los criterios de búsqueda.</p>";
        }

        if (placeholder != null)
            placeholder.innerHTML = out;
    }

    return (
        <>
            <div className="row bg-white">
                <CTop selMenu="plano" pagenav="./../" />

                <div className="x_content" >
                    <CAdorno />

                    <div className="container">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-12">
                                <h3>PLANO DE LOTIZACION</h3>
                                <img className="img-fluid" src="/images/icons/Recurso5.webp" useMap="#mapa-imagen" id="miImagen" />
                                <map name="mapa-imagen">
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 1" title="LOTE 1" coords="1052,166,899,186,898,244,1054,245" shape="poly" onClick={() => mostrarModal("L001")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 2" title="LOTE 2" coords="900,244,1054,306" shape="rect" onClick={() => mostrarModal("L002")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 3" title="LOTE 3" coords="899,306,1056,371" shape="rect" onClick={() => mostrarModal("L003")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 4" title="LOTE 4" coords="899,371,1056,431" shape="rect" onClick={() => mostrarModal("L004")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 5" title="LOTE 5" coords="900,433,1055,496" shape="rect" onClick={() => mostrarModal("L005")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 6" title="LOTE 6" coords="900,496,1058,569" shape="rect" onClick={() => mostrarModal("L006")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="Lote 7" title="Lote 7" coords="899,569,899,670,1057,677,1056,568" shape="poly" onClick={() => mostrarModal("L007")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 9" title="LOTE 9" coords="695,316,874,375" shape="rect" onClick={() => mostrarModal("L009")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 10" title="LOTE 10" coords="696,375,873,439" shape="rect" onClick={() => mostrarModal("L10")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 11" title="LOTE 11" coords="697,439,874,500" shape="rect" onClick={() => mostrarModal("L011")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 12" title="LOTE 12" coords="695,500,874,499,874,557,695,560" shape="poly" onClick={() => mostrarModal("L012")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 13" title="LOTE 13" coords="632,316,632,462,696,462,694,315" shape="poly" onClick={() => mostrarModal("L013")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 14" title="LOTE 14" coords="569,316,632,464" shape="rect" onClick={() => mostrarModal("L014")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 15" title="LOTE 15" coords="504,316,568,465" shape="rect" onClick={() => mostrarModal("L015")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 16" title="LOTE 16" coords="438,328,503,315,504,465,439,464" shape="poly" onClick={() => mostrarModal("L016")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 17" title="LOTE 17" coords="362,344,438,329,438,466,363,466" shape="poly" onClick={() => mostrarModal("L017")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 18" title="LOTE 18" coords="277,362,364,345,363,465,279,466" shape="poly" onClick={() => mostrarModal("L018")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 19" title="LOTE 19" coords="181,381,277,361,278,465,182,467" shape="poly" onClick={() => mostrarModal("L019")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 20" title="LOTE 20" coords="181,466,287,466,286,555,183,551" shape="poly" onClick={() => mostrarModal("L020")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 21" title="LOTE 21" coords="287,466,390,466,390,560,287,557" shape="poly" onClick={() => mostrarModal("L021")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 22" title="LOTE 22" coords="390,466,390,559,492,565,493,465" shape="poly" onClick={() => mostrarModal("L022")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 23" title="LOTE 23" coords="493,463,593,463,593,563,492,563" shape="poly" onClick={() => mostrarModal("L023")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 24" title="LOTE 24" coords="594,462,695,462,695,562,594,562" shape="poly" onClick={() => mostrarModal("L024")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 25" title="LOTE 25" coords="873,670,871,583,751,584,750,663" shape="poly" onClick={() => mostrarModal("L025")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 26" title="LOTE 26" coords="619,586,751,585,749,663,620,658" shape="poly" onClick={() => mostrarModal("L026")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 27" title="LOTE 27" coords="483,585,618,585,619,658,483,651" shape="poly" onClick={() => mostrarModal("L027")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 28" title="LOTE 28" coords="330,582,482,585,483,652,332,645" shape="poly" onClick={() => mostrarModal("L028")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 29" title="LOTE 29" coords="179,576,329,581,331,645,179,639" shape="poly" onClick={() => mostrarModal("L029")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 30" title="LOTE 30" coords="6,576,158,578,158,638,7,630" shape="poly" onClick={() => mostrarModal("L030")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 31" title="LOTE 31" coords="5,512,157,512,157,576,6,576" shape="poly" onClick={() => mostrarModal("L031")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 32" title="LOTE 32" coords="3,454,157,454,157,512,5,512" shape="poly" onClick={() => mostrarModal("L032")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 33" title="LOTE 33" coords="2,388,157,389,158,454,2,453" shape="poly" onClick={() => mostrarModal("L033")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 34" title="LOTE 34" coords="1,331,157,302,158,390,2,387" shape="poly" onClick={() => mostrarModal("L034")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 35" title="LOTE 35" coords="179,297,180,358,330,327,330,268" shape="poly" onClick={() => mostrarModal("L035")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 36" title="LOTE 36" coords="330,267,331,328,494,294,491,238" shape="poly" onClick={() => mostrarModal("L036")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 37" title="LOTE 37" coords="491,239,494,293,614,294,614,215" shape="poly" onClick={() => mostrarModal("L037")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 38" title="LOTE 38" coords="613,215,722,194,722,292,613,294" shape="poly" onClick={() => mostrarModal("L038")} />
                                    <area data-bs-toggle="modal" data-bs-target="#mensajeModal" alt="LOTE 39" title="LOTE 39" coords="722,195,813,178,812,293,721,292" shape="poly" onClick={() => mostrarModal("L039")} />
                                </map>
                                <div className="modal fade" id="mensajeModal" tabIndex={-1} aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <div className="modal-header bg-dark text-light">
                                                <h5 className="modal-title" id="exampleModalLabel">UBICACIÓN POR LOTE</h5>
                                                <button type="button" className="btn-close bg-red" data-bs-dismiss="modal"
                                                    aria-label="Cerrar"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row fw-bold text-center ">
                                                    <div className="col"> Manzana:</div>
                                                    <div className="col"> Lote: </div>
                                                    <div className="col"> Área del Lote: </div>
                                                </div>
                                                <div id="data-output">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 text-center">
                                    <span className="rounded-circle bg-danger p-2"><span className="p-2"></span></span>&nbsp; LOTES VENDIDOS
                                    &nbsp; &nbsp; &nbsp;
                                    <span className="rounded-circle bg-yellow p-2"><span className="p-2"> </span></span>&nbsp; LOTES SEPARADOS
                                </div>
                            </div>
                            <div className="bg-success rounded-5 text-center p-3">
                                <div className="row">
                                    <div className="col h3 text-light fw-bold">Encuentra tu Lote</div>
                                    <div className="col">
                                        <select className="form-select" defaultValue="Manzana" aria-label="Default select example" id="manzanaInput">
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="M">M</option>
                                            <option value="N">N</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select className="form-select" defaultValue="Lote" aria-label="Default select example" id="loteInput">
                                            <option value="L001">1</option>
                                            <option value="L002">2</option>
                                            <option value="L003">3</option>
                                            <option value="L004">4</option>
                                            <option value="L005">5</option>
                                            <option value="L006">6</option>
                                        </select>
                                    </div>
                                    <div className="col"><button type="button" className="btn btn-danger btn-lg" onClick={() => buscarInfo()}>Buscar</button>
                                    </div>
                                </div>
                            </div>
                            <div className=" container">
                                <div className=" py-3 px-5">
                                    <div id="info-Plano">
                                        <div className="row fw-bold text-center ">
                                            <div className="col">
                                                Manzana:
                                            </div>
                                            <div className="col">
                                                Lote:
                                            </div>
                                            <div className="col">
                                                Área del Lote:
                                            </div>
                                        </div>
                                        <hr className="my-4 bg-red border-3" />
                                        <div className="row ">
                                            <div className="col-md-6 text-left">
                                                <div className="row text-left">
                                                    <div className="col-md-6 fw-bold">Precio Base:</div>
                                                    <div className="col-md-6" id="precioBase">s/ 0,000.00</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-6 fw-bold">Descuento:</div>
                                                    <div className="col-md-6" id="descuento">0%</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-6 fw-bold">Precio Descuento:</div>
                                                    <div className="col-md-6">s/ 0,000.00</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-6 fw-bold">Inicial:</div>
                                                    <div className="col-md-6">s/ 0,000.00</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-6 fw-bold">Saldo Restante:</div>
                                                    <div className="col-md-6">s/ 0,000.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4 bg-red border-3" />
                                        <div className="row">
                                            <div className="col-md-12 fw-bold pb-3">Financiamiento:</div>
                                            <div className="col-md-12 ">
                                                <table className="table table-borderless text-center table-bordered">
                                                    <thead className="table-dark ">
                                                        <tr>
                                                            <th>N° Cuotas</th>
                                                            <th>Cuota Mensual</th>
                                                            <th>Interés Anual</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="">
                                                        <tr className="border-0 border-secondary-subtle">
                                                            <td>12</td>
                                                            <td>s/ 0,000.00</td>
                                                            <td>0 %</td>
                                                        </tr>
                                                        <tr className="border-0 border-secondary-subtle">
                                                            <td>18</td>
                                                            <td>s/ 0,000.00</td>
                                                            <td>0 %</td>
                                                        </tr>
                                                        <tr className="border-0 border-secondary-subtle">
                                                            <td>24</td>
                                                            <td>s/ 000.00</td>
                                                            <td>0 %</td>
                                                        </tr>
                                                        <tr className="border-0 border-bottom border-secondary-subtle ">
                                                            <td>36</td>
                                                            <td>s/ 000.00</td>
                                                            <td>0 %</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
                <CFooter rutatmp='./../../' />
                <div className="modal fade" id="mensajeModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header bg-dark text-light">
                                <h5 className="modal-title" id="exampleModalLabel">UBICACIÓN POR LOTE</h5>
                                <button type="button" className="btn-close bg-red" data-bs-dismiss="modal"
                                    aria-label="Cerrar"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row fw-bold text-center ">
                                    <div className="col"> Manzana:</div>
                                    <div className="col"> Lote: </div>
                                    <div className="col"> Área del Lote: </div>
                                </div>
                                <div id="data-output">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
