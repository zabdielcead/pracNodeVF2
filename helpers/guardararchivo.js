const fs = require('fs');
const archivo = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = (data) => {

    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    console.log(info);
    const datas = JSON.parse(info);

    console.log(data);
    return datas;
}



module.exports = {
    guardarDB,
    leerDB
}