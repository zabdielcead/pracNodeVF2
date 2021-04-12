const Tarea = require('./tarea');
class Tareas {


    constructor() {
        this._listado = {};
    }


    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            //console.log(key);
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    };

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);


        });


    }

    listarPendientesCompletadas(completadas = true) {

        let contador = 0;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const xtado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                //mostrar completads

                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${completadoEn}`);
                }


            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${xtado}`);
                }
            }




        });
    }


    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;