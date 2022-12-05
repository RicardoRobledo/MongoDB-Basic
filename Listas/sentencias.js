// ------------------------Listas--------------------------

// Los documentos tambien pueden almacenar listas e incluso documentos

db.users.updateOne(
    {
    	name:'Fernando'
    },
    {
    	'$set':{courses:['Python', 'MongoDB', 'SQL', 'Kotlin']}
    }
)

db.users.updateOne(
    {
    	name:'Rafael'
    },
    {
    	'$set':{courses:['Python', 'MongoDB', 'Data Sciencist', 'Git']}
    }
)

// Obtener al usuario que posea los cursos de Python, MongoDB, SQL y Kotlin

db.users.findOne(
    {
        courses:['Python', 'MongoDB', 'SQL', 'Kotlin']
    }
)

db.users.findOne(
    {
        courses:['Python', 'MongoDB', 'SQL', 'Git'] // No coincide la lista con ninguno
    }
)

db.users.findOne(
    {
        courses:['Python', 'Kotlin', 'SQL', 'MongoDB'] // No coincide la lista con ninguno por el orden exacto
    }
)

// podemos usar $eq

db.users.findOne(
    {
        courses:{
        	'$eq':['Python', 'MongoDB', 'SQL', 'Kotlin']
        }
    }
)




// --------------------Busqueda por elementos--------------------------

// $all nos permite buscar elementos dento de listas para obtener documentos

// Obtener todos los usuarios que posean por curso MongoDB

db.users.find(
    {
    	courses:{'$all':['MongoDB']}
    }
).pretty()


// Obtener todos los usuarios que posean por curso MongoDB o SQL

db.users.find(
    {
    	courses:{
    	    '$all':['MongoDB', 'SQL', 'Python']// no importa el orden, $all funciona como and
        }
    }
).pretty()



// ----------------------Multiples condiciones------------------------

// Podemos obtener documentos a partir de atributos los cuales sean listas

db.users.find(
    {
    	courses: 'MongoDB' // Podemos pensar que aqui buscamos un atributo en un documento
    	                   // y no una lista, pero MongoDB se percata de que un atributo es una lista
    	                   // y si el elemento, en este caso MongoDB, existe entonces se obtiene el
    	                   // documento
    }
).pretty()

db.users.find(
    {
    	'$and':[{courses:'MongoDB'},{courses:'SQL'}]
    }
).pretty()

db.users.find(
    {
    	'$or':[{courses:'MongoDB'},{courses:'SQL'}]
    }
).pretty()


// ----------------------Operadores relacionales------------------------

db.users.updateOne(
    {
    	name: 'Fernando'
    },
    {
        '$set': {
        	scores:[9, 8, 9, 5, 10]
        }	
    }
)

db.users.updateOne(
    {
    	name: 'Uriel'
    },
    {
        '$set': {
        	scores:[10, 9, 9, 8, 10]
        }	
    }
)

db.users.find(
    {
    	scores: 10
    }
).pretty()


// Obtener todos los usuarios que posean por lo menos una calificacion de 10

db.users.find(
    {
    	scores:{'$eq':10}
    }
).pretty()


// Obtener todos los usuarios que hayan reprobado por lo menos una calificacion

db.users.find(
    {
    	scores:{'$lte':5}
    }
).pretty()



// ----------------------Insertar elementos en listas------------------------

// Vamos a modificar la longitd de nuestras listas

// '$pull' '$pop' '$push'

// '$push' nos permite insertar nuevos elementos a nuestras listas

db.users.updateOne(
    {name: 'Fernando'},
    {'$push':{courses:'MySQL'}}
)

// '$push' '$each' los usamos para que podamos agregar varios elementos a una lista

db.users.updateOne(
    {name: 'Rafael'},
    {'$push':{courses:{'$each':['Java', 'C#', 'Javascript']}}
    }
)



// ----------------------Insertar insertar por posicion------------------------

// '$position'

db.users.updateOne(
    {
    	name: 'Rafael'
    },
    {'$push':{courses:{'$each':['CSS', 'Kotlin'],'$position': 1}
    	}
    }
)

// ----------------------------Ordenar por elementos---------------------------

// '$sort'

db.users.updateOne(
    {
    	name: 'Fernando'
    },
    {'$push':{scores:{'$each':[10, 10],'$sort': 1}
    	}
    }
)

db.users.updateOne(
    {
    	name: 'Uriel'
    },
    {'$push':{scores:{'$each':[7, 7],'$sort': -1}
    	}
    }
)

// ----------------------------Eliminar elementos---------------------------

// $pull $ pop

db.users.updateMany(
    {
    	courses:{'$exists':true}
    },
    {'$pull':{courses:'Python'}}
)

// '$in'

db.users.updateMany(
    {
    	courses:{'$exists':true}
    },
    {'$pull':{courses:{'$in': ['Base de datos', 'C#']// Si un elemento no existe en una
    // lista de un documento solo se elimina el que se encuentre}}}
)


// ----------------------------Actualizar por indice--------------------------

// Cuando conocemos el indice
db.users.updateMany(
    {
    	scores:{'$exists':true}
    },
    {'$set':{'scores.0':5// Indicamos la lista y el indice
    	}
    }
)


// Cuando no conocemos el indice
db.users.updateMany(
    {
    	scores:{'$exists':true},
        scores: 9
    },{'$set':{'scores.$':6// Indicamos con '$' que no conocemos el indice en la lista,
        // pero podremos saberlo con una condicion
    	
    	}
    }
)



// ----------------------------Obtener elementos--------------------------

// $slice -> position o index

db.users.findOne(
    {
    	name:'Rafael'
    },
    {
    	_id:false,
    	name:true,
    	courses:{
    		'$slice':1// int o [], con numero indicamos que queremo un elemento
    		// a partir de su posicion en 1, hay que tener en cuenta que indicamos
    		// la posicion y no el indice del elemento, si queremos obtener el ultimo
    		// colocamos -1
    	}
    }
)

db.users.findOne(
    {name:'Rafael'},
    {_id:false,name:true,courses:{'$slice':1}}
)

// para obtener una porsion de la lista
db.users.findOne(
    {name:'Rafael'},
    {_id:false,name:true,courses:{'$slice':[0, 3]}}// con corchetes indicamos indices a
                                               // partir y finaliar, donde aqui si usamos
                                               // indices
)


// ---------------------------Busqueda por tamaño---------------------------

// Obtener todos los usuarios con 7 cursos
db.users.find(
    {courses:{'$size':5}}
).pretty()


// Obtener todos los usuarios con 4 cursos o mas
// $where
db.users.find(
    {
    	'$and':[
    	    {courses:{'$exists':true}},
    	    {'$where':'this.courses.length>=4'}
    	]
    }
).pretty()






