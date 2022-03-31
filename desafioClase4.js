const fs = require('fs');
let arr = [];
let id = 1;
const escribirArchivo = async (route, arr) => {
  try {
    await fs.promises.writeFile(route, JSON.stringify(arr));
  } catch (err) {
    console.error(err);
  }
};

class Contenedor {
  constructor(route) {
    this.route = route;
  }
  save(obj) {
    obj.id = id;
    arr.push(obj);
    escribirArchivo(this.route, arr);
    id++;
    console.log(`Elemento guardado exitosamete bajo el id: ${obj.id}`);
    return obj.id;
  }
  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.route, 'utf-8');
      const parsedData = JSON.parse(data);
      return parsedData.find((obj) => obj.id === id) ?? null;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.route, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(this.route, 'utf-8');
      const parsedData = JSON.parse(data);
      const index = parsedData.findIndex((obj) => obj.id === id);
      if (index > -1) {
        const newData = parsedData.slice(0, index).concat(parsedData.slice(index + 1));
        arr = newData;
        escribirArchivo(this.route, arr);
        console.log('Elemento eliminado exitosamente');
      } else console.log('El objeto a eliminar no existe');
    } catch (error) {
      console.error(error);
    }
  }

  deleteAll() {
    arr = [];
    escribirArchivo(this.route, arr);
    console.log('Todos los elementos han sido eliminados');
  }
}

const caja = new Contenedor('./caja.txt');

caja.save({
  title: 'remera',
  price: 2200,
  thumbnail:
    'http://d3ugyf2ht6aenh.cloudfront.net/stores/029/842/products/nirvana1-2d1bbed349758198e516166141022282-640-0.jpg',
});

caja.save({
  title: 'pantalon',
  price: 6500,
  thumbnail:
    'https://media.revistagq.com/photos/5ca5eca84c7adb138100c90a/3:4/w_318,h_424,c_limit/el_pantalon_de_vestir_894893361.jpg',
});
caja.save({
  title: 'pantalon',
  price: 6500,
  thumbnail:
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad40dcaeed245839d39ad03016115dd_9366/Gorra_de_Beisbol_Liviana_Logo_Metalico_Azul_GR9692_01_standard.jpg',
});
