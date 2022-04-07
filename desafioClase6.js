const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;
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
  async getRandom(){
    try{
      const array = await this.getAll() ?? []
      const randomIndex = Math.floor(Math.random()*array.length)
      console.log(randomIndex)
      return this.getById(randomIndex+1)
    }catch(err){
      console.error(err)
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

const products = new Contenedor('./products.txt');

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.error(`Error en Servidor ${error}`));

app.get('/products', async (req, res) => {
  try {
    const getAllProducts = await products.getAll();
    res.send(getAllProducts);
  } catch (err) {
    console.log(err);
  }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const randomProduct = await products.getRandom();
    res.send(randomProduct);
  } catch (err) {
    console.log(err);
  }
});
