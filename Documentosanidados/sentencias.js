// --------------------------documentos anidados-----------------------

db.users.updateOne(
    {
    	name:'Uriel'
    },{
    	'$set':{address:{state:'CDMX',city:'CDMX',postalCode:1}
    	}
    }
)

db.users.updateOne(
    {
    	name:'Marines'
    },{
    	'$set':{address:{state:'CDMX',city:'CDMX',postalCode:1,number:10,street:'Calle numero 1', references:['Casa color azul', 'a un costado de una tienda']}
    	}
    }
)


// --------------------------Dot notattion-----------------------

// Obtener todos los usuarios que posean una direccion postal
// Obtener todos los usuarios que posean un codigo postal 1 y un numero igual a 10
// Obtener la primera referencia de los usuarios con codigo postal y referencias

db.users.find(
    {
    	address: {'$exists':true}
    }
).pretty()

db.users.find(
    {
    	'address.postalCode':1
    }
).pretty()

db.users.find(
    {
    	'$and':[{'address.postalCode':1},{'address.number':{'$gte':10}},{'address.number':{'$exists':true}}]
    }
).pretty()

db.users.find(
    {
    	'$and':[{address:{'$exists':true}},{'address.postalCode':{'$exists':true}}]
    },{
    	_id:false,
    	name:true,
    	'address.references':{'$slice':1}
    }
).pretty()



// ----------------------------Actualizar elementos----------------------------

db.users.updateOne(
    {
    	name:'Uriel'
    },{
    	'$set':{'address.number':20,'address.references':['Fuera de la casa esta un parque','fuera de la casa esta un pino (arbol)']}
    }
)

db.users.updateOne(
    {
    	name:'Marines'
    },{
    	'$push':{'address.references':{'$each':['Fuera de la casa hay un rio','En la esquina hay un campo de tenis']}}
    }
)

db.users.updateOne(
    {
    	name:'Marines',
    	'address.references':'a un costado de una tienda'
    },{
    	'$set':{'address.references.$':'A un costado de una tienda'}
    }
)



// -----------------------------Listado de documentos------------------------

db.users.updateMany(
    {
    	courses:{'$exists':true}
    },{
    	'$unset':{courses:true}
    }
)

db.users.updateOne(
    {
    	name:'Rafael'
    },{
    	'$set':{courses:[{title:'Base de datos',progress:100,completed:true},{title:'Python',progress:100,completed:true},{title:'Java',progress:30,completed:false}]}
    }
)


// --------------------------ElemMatch--------------------------

// $elemMatch

// Obtener todos los usuario que hayan completado por lo menos un curso
// Obtener todos los usuarios con un progreso mayor a 80

db.users.find(
    {
    	// Queremos todos los documentos que posean el atributo completed:true ecomo atributo
    	courses:{'$elemMatch':{completed:true}}
    }
)

db.users.find(
    {
    	courses:{'$elemMatch':{progress:{'$gte':80}}}
    }
)


// --------------------------Proyecciones--------------------------

// Obtener el nombre del usuario junto con el titulo de cada uno de sus cursos

db.users.find(
    {
    	courses:{'$exists':true}
    },{
    	_id:false,
    	name:true,
    	'courses.title':true
    }
)



// ------------------Actualizar documentos de listas-------------------

db.users.updateOne(
    {
    	name:'Fernando'
    },{
    	'$set':{'courses.2.progress':100,'courses.2.completed':true}
    }
)

db.users.updateOne(
    {
    	name:'Rafael',
    	'courses.title':'Java'
    },{
    	'$set':{'courses.$.progress':100,'courses.$.completed':true,'courses.$.tutor':{'name':'Scott'}}
    }
)

db.users.updateOne(
    {
    	name:'Rafael',
    	'courses.title':'Java'
    },{
    	'$set':{'courses.$.tutor.name':'Leon'}
    }
)
