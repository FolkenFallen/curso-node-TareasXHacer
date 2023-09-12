import colors from 'colors';

import { inquirerMenu,
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

console.clear();

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprimir menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': // Crear tarea 
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
            break;

            case '2': // Listar tareas
                tareas.listadoComppleto();
                await pausa();
            break;
            
            case '3': // Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                await pausa();
            break;
            
            case '4': // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                await pausa();
            break;

            case '5': // Completar tarea(s)
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                console.log('Tarea(s) modificada(s) correctamente');
                await pausa();
            break;

            case '6': // Eliminar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                    await pausa();
                }
            break;

        }

        // Guardar listado en archivo JSON
        guardarDB( tareas.listadoArr );

        if (opt === '0') { // Salir
            console.clear();
            console.log('==========='.green);
            console.log('  Cerrado'.green);
            console.log('===========\n'.green);
            await pausa();
        }

    } while ( opt !== '0' );

    console.clear();
}

main();
