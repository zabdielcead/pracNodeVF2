require('colors')

const mostrarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('================================'.blue);
        console.log('Seleccione una opcion');
        console.log('================================\n'.blue);


        console.log(`${'1.'.yellow} Crear tarea`);
        console.log(`${'2.'.yellow} Listar tarea`);
        console.log(`${'3.'.yellow} Listar tarea completada`);
        console.log(`${'4.'.yellow} Listar tarea pendiente`);
        console.log(`${'5.'.yellow} Completar tarea(s)`);
        console.log(`${'6.'.yellow} Salir\n`);


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion', (opt) => {
            //console.log({ opt });
            readline.close();
            resolve(opt);
        });
    })


}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'Enter'.blue} para continuar\n`, (opt) => {

            readline.close();
            resolve();
        });
    })

}

module.exports = {
    mostrarMenu,
    pausa
}