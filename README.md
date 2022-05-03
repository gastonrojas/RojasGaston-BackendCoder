# Repositorio de Gaston Rojas
# Curso Backend de Coderhouse

**Primera entrega del trabajo practico final.**

- Este stack utiliza node.js y express para crear los edpoints necesarios 
para generar la arquitectura REST.

- En el archivo server.js se inicia express para crear la app de backend,
usando las rutas solicitadas.

- De la clase Contenedor en src/containers/containers.js,
se inician 2 instancias(products y carts) que son consumidas por
los controladores de las rutas.

- Dentro de src/conroutes/products/index.js se encuentra el booleano
para asignar la variable de administrador. 

- Para el POST de api/productos se toman las variables nombre, descripcion, foto y precio (stock va por defecto)
del body, para el PUT se toman las mismas variables + stock tambien del body (id por param),
en ambos metodos con formato url encoded, que se pasan como parametros en las funciones de clase.
Si no se ingresa ningun valor en el POST se crea una caja misteriosa por defecto y en el caso
del PUT queda con los valores originales.

- Para el POST en api/carritos/:id/productos se toma id por param
y id_prod en el body. con los demas metodos se se toman
los datos por params.

- Toda la funcionalidad de la app backend fue probada por medio
de la aplicacion de escritorio Postman, pudiendose constatar 
las respuestas esperadas segun lo solicitado para la entrega.

- La comunicacion con el front es siempre con objetos en formato json
tanto para los datos solicitados por get asi como con los demas metodos,
indicando si fue exitosa la implementacion del metodo o si ocurrio algun 
tipo de error.



