// --------------------Crear documentos------------------

// insertOne     nos permite insertar un solo documento


var user2 = {
	name: 'Fernando',
	last_name: 'Garcia',
	age: 24,
	email: 'fernando@codigofacilito.com'
}

// Ejecutamos el metodo insertOne

db.users.insertOne(user2)


// insertMany

var user3 = {
	name: 'Uriel',
	last_name: 'Camacho',
	age: 27,
	email: 'Uriel@codigofacilito.com'
}

var user4 = {
	name: 'Marines',
	last_name: 'Mendez',
	age: 25,
	email: 'marines@codigofacilito.com'
}

// Este metodo no recibe los objetos directamente sino que recibe
// una lista con los documentos
db.users.insertMany([user3, user4])



// -----------------------Consultas--------------------------

// el metodo find() permite obtener documentos en concreto donde
// entre sus parentesis recibe como argumentos un objeto de
// criterios de busqueda que es ub objeto JSON

db.users.find(
	// Criterios -> Where, indicamos que queremos todos
    // los documentos de la coleccion users los cuales
    // posean el atributo age y tengan el valor de 25
    {age:25}, 

    // puede recibir mas de un argumento en el que hace referencia
    // a que atributos queremos obtener de la busqueda, en este caso es
    // como SELECT
    {name:true, email:true} 
    
).pretty()  // con pretty hacemos que la salida de find()
            // sea mas amigable

// por default el id se enviara en la respuesta, pero podemos indicar lo
// contrario colocando _id:false en los atributos como {name:true, email:true, _id:false}

// si tenemos muchisimos atributos y queremos excluir algunos de ellos colocamos
// false solamente en el segundo argumento {age:false} 

// Nota: no hay que separar los criterios despues de 2 satos de linea o
// mas porque obtendremos un error



// ------------------Diferente e igual------------------------ 

// $ne -> diferente a
// Obtengamos todos los usuarios cuya edad sea diferente a 25

db.users.find(
    {
    	age: {
    	    '$ne':25// Con esto indicamos a MongoDB que obtengamos los documentos cuya
    		        // atributo sea diferente a 25
    	            // Nota: Si su consulta incluye documentos internos, utilice comillas
    	            // simples para ellos. Además, use comillas para consultar valores de cadena
    	}
    }
)



// $eq -> igual a
// Obtengamos todos los usuarios cuya edad sea igual a 25

db.users.find(
    {
    	age: {
    	    '$eq':25// Con esto indicamos a MongoDB que obtengamos los documentos cuya
    		        // atributo sea igual a 25
    		        // Podemos omitir '$eq' y solo poner {age:25}
    	}
    }
).pretty()


// find nos puede retornar mas de un documento
// findOne           nos permite solo obtener un documento un documento a partir de un criterio y sera
// el primero que cumpla con las condiciones
db.users.findOne(
    {
    	age: {
    	    '$ne':25// Con esto indicamos a MongoDB que obtengamos los documentos cuya
    	            // atributo sea igual a 25
    	            // Podemos omitir '$eq' y solo poner {age:25}
    	}
    }
)// El metodo findOne no posee el metodo pretty()

// Si ejecutamos db.users.findOne() sin argumentos solo obtendremos el primer registro



// -------------------Operadores relacionales-----------------------


// $gt -> mayor a
// Obtener todos los usuarios cuya edad sea mayor a 20

db.users.find(
    {
    	age: {
            '$gt':20 // representa mayor que '>'
        }
    }
)


// $gt -> mayor o igual
// Obtener todos los usuarios cuya edad sea mayor o igual a 20

db.users.find(
    {
        age: {
            '$gte':26 // representa mayor que '>='
        }
    }
)


// $lte -> menor o igual
// Obtener todos los usuarios cuya edad sea menor o igual a 26

db.users.find(
    {
        age: {
            '$lte':26 // representa menor o igual que '<='
        }
    }
)


// $lt -> menor
// Obtener todos los usuarios cuya edad sea menor a 26

db.users.find(
    {
        age: {
            '$lte':26 // representa menor o que '<'
        }
    }
)

// Operadores logicos
// $gt >
// $gte >=
// $lt <
// $lte <=
// $eq ==
// $ne !=



// -------------------Operadores logicos-----------------------

// Operadores logicos
// $and y $or

// Obtener todos los usuarios cuya edad sea mayor a 20 y menor a 26

db.users.find(
    {
        '$and':[
            {
                age:{'$gt':20}
            },
            {
                age:{'$lt':26}
            }
        ]// Estos '[]' indican que se usara una lista
    }
).pretty()


// Obtener todos los usuarios cuyo nombre sea Eduardo o Uriel

db.users.find(
    {
        '$or':[
            {
                name:'Uriel'
            },
            {
                name:'Eduardo'
            }
        ]
    }
).pretty()



// Obtener todos los usuarios cuyo nombre sea Eduardo o Uriel o la edad
// sea mayor a 20 y menor a 25

db.users.find(
    {
        '$or':[
            {
                name:'Uriel'
            },
            {
                name:'Eduardo'
            },
            {
                '$and':[
                    {
                        age:{'$gt':20}
                    },
                    {
                        age:{'$lt':25}
                    }
                ]
            }
        ]
    }
).pretty()


// -------------------Expresiones regulares-----------------------

// Coleccion de libros mas vendidos
db.books.insertMany(
    [
        {title: 'Don quijote de la mancha', sales: 500},
        {title: 'Historia de dos ciudades', sales: 200}, 
        {title: 'El señor de los anillos', sales: 150}, 
        {title: 'El principito', sales: 140},
        {title: 'El hobbit', sales: 100},
        {title: 'Alicia en el país de las maravillas', sales: 100},
        {title: 'El código davincci', sales: 80},
        {title: 'El alquimista', sales: 65}
    ]
)

// like -> expresion regular
// Obtener todos los libros cuyo titulo comience con El
// Obtener todos los libros cuyo titulo finalice con s
// Obtener todos los libros que posean en su titulo la palabra la

db.books.find(
    {
        title: /^El/
    }
)

db.books.find(
    {
        title: /s$/
    }
)

db.books.find(
    {
        title: /la/
    }
)



// -------------------Busqueda dentro de listas-----------------------

// Obtener todos los usuarios cuyo nombre sea Eduardo o Uriel o Marines

// Podemos hacerlo asi
db.users.find(
    {
        '$or':[
            {
                name:'Uriel'
            },
            {
                name:'Eduardo'
            },
            {
                '$and':[
                    {
                        age:{'$gt':20}
                    },
                    {
                        age:{'$lt':25}
                    }
                ]
            }
        ]
    }
).pretty()

// podemos optimizarlo con busqueda dentro de listas


// para busqueda dentro de listas nos apoyamos de '$in'
db.users.find(
    {
        name: {
            '$in': ['Eduardo', 'Uriel', 'Marines']
        }
    }
).pretty()

// '$nin' es la contraparte de '$in'

// $in
// $nin



// -------------------Busqueda por atributos-----------------------

var user5 = {
    name: 'Rafael',
    email: 'Rafacodigofacilito.com',
    support: true,
    createdAt: new Date()
}

// Obtener todos los usuarios que posean apellido

db.users.find(
    {
        last_name: {
            '$exists':true // Verificamos si existe con '$exists'
        }
    }
)


// Obtener todos los usuarios cuyo atributo createdAt sea de tipo Daye

db.users.find({
    createdAt: {
        '$type': 'date'// Verificamos el tipo con '$type'
    }
})

db.users.find({
    $and:[
        {
            createdAt: {'$exists': true}
        },
        {
            createdAt: {'$type': 'date'}
        }
    ]
})


db.users.find({
    $and:[
        {
            createdAt: {'$exists': true}
        },
        {
            createdAt: {'$type': 'date'}
        }
    ]
})


// -------------------Obtener y actualizar elementos-----------------------

var rafael = db.users.findOne({
    name: 'Rafael'
})

// para cambiar un valor en el objeto
rafael.support = false

// hasta ahora no se ha actualiado el documento asi que para persistir los cambios
// tenemos que usar save pasandole un documetno como argumento
db.users.save(rafael)

// El metodo save recibe como argumento el objeto que queremos guardar y si no
// posee el atributo id entonces se crea un nuevo documento en la coleccion, en caso
// contrario solo se actualiza



// -----------------------Actualizar elementos----------------------------

// save no es la mejor forma para actualizar documentos, lo mejor es usar
// updateOne o updateMany
// no debemos de usar update(funcion extra) ya que es como insert donde no se recomienda

// Establecer el atributo support a los documentos que no lo tengan y por default
// vamos a establecerles el valor a falso
db.users.updateMany(
    // Se reciben 2 argumentos, el primero hace referencia a los criterios de busqueda
    // sobre que documentos vamos a actualizar y el segundo a los cambios a implementar
    {
        support: {// sobre que documentos vamos a aplicar la actualizacion
            '$exists': false
        }
    },
    {
        '$set': {// '$set' establecer nuevos valores
            support:false
        }
    }
)

db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        '$set':{
            support: true
        }// '$set' estableer un nuevo valor para el atributo, si el atributo no existe
        // lo crea, caso contrario lo actualiza
    }
)



// -----------------------unset----------------------------

// '$unset' es la contraparte de '$set' donde elimina atributos

db.users.updateOne(
    {
        createdAt: {'$exists':true}
    },
    {
        '$unset':{createdAt:true}
    }
)



// -----------------------Incrementar valores----------------------------

// '$inc' nos permite incrementar el valor de un atributo siendo
// principalmente para atributos de tipo entero

db.users.updateOne(
    {
        name: 'Rafael'
    },{
        '$inc': {
            age:1 // podemos poner valores negativos para restas e incrementar y
                  // decrementar no solo con 1, podemos usar otros valores enteros
        }
    }
)



// -----------------------upsert----------------------------

db.users.updateOne(
    {
        name: 'Luis'
    },{
        '$set': {
            age:27
        }
    },{
        upsert: true // Con upsert en este caso creamos el documento y lo
                     // actualizamos 
    }
)// lo que indicamos en conjunto es que actualice el documento de la coleccion
// users cuyo nombre sea Luis y establezca su edad a 27 y si no existe ningun
// documento que tenga el nombre Luis entonces procedemos a crearlo 



// -----------------------Eliminar documentos----------------------------

// remove({})

db.users.remove(
    {
        name: 'Luis'
    }
)

// Si ejecutamos este comando db.users.remove({}) elimina todos de la coleccion

// dropDatabase()-> eliminar una base de datos
// drop() -> eliminar una coleccion



// -------------------------------Cursor--------------------------------

// find -> retorna un cursor
// findOne -> retorna un documento
// pretty()
// count()
// limit() -> retorna un nuevo cursor
// skip()
// sort()

for(i=1; i<=100; i++){
    db.demo.insert(
        {name:'user'+i}
    )
}

// el cursor de find tiene una capacidad maxima de 20 elementos y para obtener los siguientes
// 20 debemos de usar 'it'

// podemos acceder a los diferentes metodos del cursor como pretty()
// podemos usar count() siendo la cantidad de documentos que se almacenan en una coleccion

// Obtener todos los usuarios con correo electronico codigofacilito

db.users.find(
    {
        email: /codigofacilito.com$/
    }
).count()



// Con limit() podemos limitar la cantidad de documentos que queremos obtener

// Obtener los primeros 2 ususarios de la coleccion users

db.users.find().limit(2)



// Podemos combinar limit() con skip() para saltar documentos

// Obtener el tercer usuario de la coleccion users

db.users.find().skip(2).limit() // saltamos 2 y obtenemos el tercero



// Con sort() podemos ordenar nuestros documentos

// Obtener el nombre de todos los usuarios ordenados alfabeticamente

db.users.find(
    {

    },
    {
        _id:false, name:true
    }
).sort({
    name:1
})// sort() recibe un nuevo objeto como argumento

// Podemos colocar los siguiente valores para ordenar:
// 1 - ascendente
// -1 - descendente



// Obtener el tercer usuario ordenado por su nombre de forma
// descendente

db.users.find().sort({
    name:-1
}).skip(2).limit(1)



// -----------------Encontrar y modificar------------------

// findAndModify

db.users.findAndModify(
    {
        query: {// query es para hacer referencia a los criterios de busqueda para actualizar
            name: 'Fernando'
        },
        update: {// update es para los cambios a establecer
            '$inc':{
                age:1
            }
        },
        new: true // Es para que nos retorne el objeto despues de la actualizacion

        // findAndModify recibe como argumento un objeto que debe poseer
        // como minimo estos 2 argumentos

    }// findAndModify puede poseer otros argumentos en sus atributos como sort, remove, upsert

)// findAndModify nos retorna el objeto para que posteriormente trabajemos con el
// new: false    antes de la actualizacion
// new: true    despues de la actualizacion



// -----------------Renombrar atributos------------------

db.users.updateMany(
    {},
    {
        '$rename': {
            last_name: 'lastName'
        }
    }
)

// Si lo colocamos asi: db.users.updateMany({}) se aplicara a todos los documentos




// -----------------Object-id-----------------

// El _id de los documentos es por default un objecto object-id, la clase
// object-id fue diseñada para ser lo mas ligera posible y facil de generar

// Nota: un object-id es unico para los documentos, las colecciones e inclusive
// para las computadoras, eso quiere decir que algunos object-id que usemos no los
// podremos encontrar nunca en ninguna otra computadora, esto se a la estructura que
// se maneja, siendo que un object-id utiliza 12 bytes para su almacenamiento los
// cuales nos dan un string de 24 caracteres alfanumericos

// Un object-id se componer de 4 partes:

// -Los 4 primeros byte corresponden a un time stamp siendo este el momento exacto en
// el que se ha insertado un documento

// -Los 3 siguientes bytes son un identificador unico de la maquina en el cual se esta
// ejecutando MongoDB

// -Los 2 bytes que le siguen son generados a partir de process id de la
// instancia de Mongo, esto para tener certeza de tener mas de una instancia ejecutandose
// de Mongo el id nunca se va a repetir

// Todo esto nos da un total de 9 bytes los cuales garantizan que el id nunca va a repetir

// -Los 3 ultimos byte hacen referencia a un contador incremental

// Nota: no es necesario usar object-id como identificador podemos usar otros como
// numeros enteros, aunque es mejor usar el object-id porque es bastante seguro







