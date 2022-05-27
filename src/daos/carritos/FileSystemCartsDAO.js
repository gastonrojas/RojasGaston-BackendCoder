import FileSystemContainer from "../../containers/fileSystemContainer.js";

export default class FileSystemCartsDAO extends FileSystemContainer{
   constructor(ruta){
       super(`${ruta}/carts.json`)
   }
}

