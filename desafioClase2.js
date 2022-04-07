class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  getBooks() {
    const bookNames = [];
    for (let i = 0; i < this.libros.length; i++) {
      bookNames.push(this.libros[i].nombre);
    }
    return bookNames;
  }
  getBooksName () {
    return Object.values(this.libros[0])
  }
}

const yo = new Usuario('Gaston ', 'Rojas', [{ nombre: 'Js', autor: 'Joo' }], ['Libra']);

yo.getFullName();
yo.addMascota('Kiya');
yo.countMascotas();
yo.addBook('Lala', 'Jorge');
console.log(yo);
console.log(yo.getBooksName());