import { v4 as uuidv4 } from 'uuid';
import { Tarea } from './tarea.js';

class Tareas {
    
    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        } );

        return listado;

    }

    constructor () {
        this._listado = {};
    }

    cargarTareasFromArray ( tareas = [] ) {

        tareas.forEach ( tarea => {
            this._listado[tarea.id] = tarea;
        } );
    }

    crearTarea ( desc = '' ) {
        
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoComppleto () {
        
        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                        ? 'Completada'.green
                        : 'Pendiente'.red;

            console.log(idx, desc, ' :: ', estado);

        })
        console.log();
    }

    listarPendientesCompletadas ( completadas = true ) {

        console.log();
        let num = 1;
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                        ? 'Completada'
                        : 'Pendiente';

            if (completadas) {
                if ( estado === 'Completada') {
                    console.log(`${num}.`.green, desc, ' :: ', completadoEn.green);
                    num += 1;
                }
            } else {
                if ( estado === 'Pendiente') {
                    console.log(`${num}.`.green, desc, ' :: ', estado.red);
                    num += 1;
                }
            }           

        })
        console.log();

    }

    borrarTarea ( id = '' ) {
        
        if (this._listado[id] ) {
            delete this._listado[id];
        }

    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {
    
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
    
        })

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        })
    
    }

}

export { Tareas };