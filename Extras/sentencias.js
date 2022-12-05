// ---------------------------Relación uno a uno-----------------------

var usuarios = {
	nombre: 'Raquel',
	apellido: 'Dominguez',
	edad: 27,
	correo: 'raquel@example.com',
	direccionPostal: {calle: 'calle',ciudad: 'ciudad',estado: 'estado',codigoPostal: 1,numeroExt: 10}
}

db.users.insertOne(usuarios)



// ---------------------------Relación uno a muchos-----------------------

// 1.- Lista
var autor = {
	nombre: 'Stephen king',
	nacionalidad: 'Estadounidense',
	libros: [
	    {
	    	titulo: 'it',
	    	fechaLanzamiento: 1986
	    },{
	    	titulo: 'El resplandor',
	    	fechaLanzamiento: 1977
	    },{
	    	titulo: 'Misery',
	    	fechaLanzamiento: 1987
	    }
	]
}


// 2.- Llaves foraneas -> ObjectsId
var autor = {
	nombre: 'Stephen king',
	nacionalidad: 'Estadounidense',
}

db.autores.insertOne(autor)

// ObjectId("6097f494480881eb455b9815")

var libro1 = {
	titulo: 'it',
	fechaLanzamiento: 1986,
	autor_id: ObjectId("6097f494480881eb455b9815")
}

var libro2 = {
	titulo: 'El resplandor',
	fechaLanzamiento: 1977,
	autor_id: ObjectId("6097f494480881eb455b9815")
}

var libro3 = {
	titulo: 'Misery',
	fechaLanzamiento: 1987,
	autor_id: ObjectId("6097f494480881eb455b9815")
}

db.libros.insertMany([libro1, libro2, libro3])
db.autores.find({_id:ObjectId("6097f494480881eb455b9815")})

// Si los documentos poseen muchos atributos y estaran en constant actualizacion, es
// mejor separarla en colecciones

// Si los documentos poseen atributos y no estaran en actualizacion constantemente, es
// mejor usar listas



//  ----------------------------Crear indices---------------------------------

db.libros.createIndex(
    {
    	autor_id:1
    }
)

db.users.getIndexes() // ver indices, retorna una lista



//  --------------------------Union de colecciones---------------------------------

// $lookup -> join

db.autors.insertMany([
  { name: 'J.K Rowling', nacionality: 'Britain' },
  { name: 'George R. R. Martin', nacionality: 'American' },
]);

db.books.insertMany([
  {
    title:'Harry Pottter y la Piedra Filosofal',
    bornDate:1997,
    autor_id: ObjectId("6097f9ef480881eb455b9819"),
  },
  {
    title: 'Harry Pottter y el prisionero de Azkaban',
    bornDate: 1999,
    autor_id: ObjectId("6097f9ef480881eb455b9819"),
  },
]);

// Obtener todos los autores con su correspondiente listado de libros
// Obtener todos los autores que posean por lo menos un libro
db.autores.aggregate(
    [
        {
        	'$lookup':{from:'books',localField:'_id',foreignField:'author_id',as:'listadoLibros'}
        },{
        	'$match':{'listadoLibros':{'$ne':[]}}
        },{
        	'$project':{_id:false, nombre:true}
        },{// $unwind     desenvolver documentos en listas
        	'$unwind':'$listadoLibros'
        },{
        	'$project':{_id:false,nombre:true,libro:'$listadoLibros'}
        }
    ]
).pretty()


db.users.aggregate(
  [
    {
      '$lookup':{from:'books',localField:'_id',foreignField:'author_id',as:'listadoLibros'}
    },{
      '$match':{'listadoLibros':{'$ne':[]}}
    },{// $unwind     desenvolver documentos en listas
          '$unwind':'$listadoLibros'
    },{
      '$project':{name:true,libro:'$listadoLibros'}
    }
  ]
).pretty()


//  ------------------------Plan de ejecucion---------------------------------

db.autores.find({nombre:'Stephen king'}).explain() // Nos da informacion adicional de la consulta
// Podemos pasar un argumento a explain() que sea 'executionStats' para obtener aun mas informacion



//  ------------------------Crear colección-----------------------------------

// Podemos crear colecciones a base de reglas
db.createCollection( "contacts", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "phone" ],
      properties: {
         phone: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType : "string",
            pattern : "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
         status: {
            enum: [ "Unknown", "Incomplete" ],
            description: "can only be one of the enum values"
         }
      }
   } }
} )

var contacto = {
	phone:'000-00'
}

db.contacts.insertOne(contacto)

// No se persiste porque no cumplimos las reglas establecidas
var contacto = {
	number:'000-00',
	email:'rafael@mongodb.com',
	status:'Incomplete'
}

db.contacts.insertOne(contacto)



// ------------------------------------Respaldo de información-----------------------------------

// mongodump      mongorestore

// mongodump --db cursoMongoDB     es para guardar
// mongorestore --db cursoMongoDB dump/cursoMongoDB     es para reestablecer

// mongodump --collection autores -db cursoMongoDB     es para guardar una coleccion

// mongoresore --collection autores --db dump/cursoMongoDB/autores.bson     es para reestablecer una coleccion


















