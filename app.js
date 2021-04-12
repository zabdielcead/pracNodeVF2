require('colors');

//const { mostrarMenu, pausa } = require('./helpers/helpers');
const { guardarDB, leerDB } = require('./helpers/guardararchivo');
const {
    inquireMenu,
    pausas,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    console.log('hola mundo');

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    //await pausas();

    do {
        opt = await inquireMenu();
        //console.log({ opt });
        // const tareas = new Tareas();
        // const tarea = new Tarea('comprar comida');
        // tareas._listado[tarea.id] = tarea;
        // console.log(tarea);
        // console.log(tareas);

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3': //listarcompletadas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
                break;

            case '6': //listar pendientes
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('tarea borrada');
                    }
                }



                break;


        }


        guardarDB(tareas.listadoArr);


        await pausas();

        // if (opt !== '0') {
        //     await pausa();
        // }

    } while (opt !== '0')


}

main();