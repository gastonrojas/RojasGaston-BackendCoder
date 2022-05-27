export default class MemoryContainer {
  constructor() {
    this.elements = [];
  }

  getAll() {
    return this.elements;
  }

  save(name, description, image, price) {
    this.elements.push({
      id: !this.elements.length ? 1 : parseInt(this.elements[this.elements.length - 1].id) + 1,
      nombre: name || `caja`,
      descripcion: description || `misteriosa`,
      foto: image || `https://eldiadehoy.net/wp-content/uploads/2016/09/caja-simpsons.jpg`,
      precio: price || 45000,
      stock: 420,
    });
  }

  getById(i) {
    return this.elements.find((x) => x.id == i);
  }

  deleteById(id) {
    try {
      const index = this.elements.findIndex((obj) => obj.id == id);
      if (index > -1) {
        const newData = this.elements.slice(0, index).concat(this.elements.slice(index + 1));
        this.elements = newData;
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  updateProduct(id, name, description, image, price, stock) {
    const index = this.elements.findIndex((obj) => obj.id == id);
    if (index > -1) {
      this.elements[index] = {
        id: id,
        nombre: name || this.elements[index].nombre,
        descripcion: description || this.elements[index].descripcion,
        foto: image || this.elements[index].foto,
        precio: price || this.elements[index].precio,
        stock: stock || this.elements[index].stock,
      };

      return true;
    } else {
      return false;
    }
  }
  deleteAll() {
    this.elements = [];
  }

  addNewCart() {
    const id = !this.elements.length ? 1 : parseInt(this.elements[this.elements.length - 1].id) + 1;
    this.elements.push({
      id: id,
      productos: [],
    });

    return id;
  }

  addToCart(id, idProduct) {
    const cart = this.getById(id);
    const getProducts= productos.getById(idProduct);

    if (cart && productToAdd) {
      cart.productos.push(productToAdd);
    } else if (!cart) {
      return 'Ups! No encontramos el carrito que buscas...';
    } else if (!productToAdd) {
      return 'Ups! No existe ese producto...';
    }
  }

  getCartProducts(id) {
    const cart = this.getById(id);
    return cart.productos;
  }

  deleteProductFromCart(id, idProduct) {
    const cart = this.getById(id);
    if (!cart) return `Ups! No encontramos el carrito que buscas...`;

    const productIndex = cart.productos.findIndex((prod) => prod.id == idProduct);

    if (productIndex > -1) {
      cart.productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));
      return true;
    } else if (productIndex === -1) {
      return `Ups! No encontramos ese producto en tu carrito`;
    }
  }

  emptyCart(id) {
    const cart = this.getById(id);
    cart.productos = [];
  }
}
