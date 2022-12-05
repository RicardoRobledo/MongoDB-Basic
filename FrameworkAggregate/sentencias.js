// -------------------------Aggregate Framework------------------------------

// Podemos analizar, procesar, transformar y combinar documentos



// -------------------------Metodo aggregate------------------------------

// aggregate([ tareas ])

db.users.find(
    {age:{'$gt':25}}
)

db.users.aggregate(
	[
	    // Podemos poner 'n' tareas
	    {
	    	// '$match' es para los filtros
	    	'$match':{age:{'$gt':25}}
	    },
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	]
).pretty()// Nos retorna un cursor


// -------------------------Proyeccion pt1------------------------------

db.users.aggregate(
	[
	    {
	    	'$match':{age:{'$gt':25}}
	    },
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false, name:true, courses:true}
	    }
	]
).pretty()



// -------------------------Proyeccion pt2------------------------------

// $slice   $arrayElemtAt
db.users.aggregate(
	[
	    {
	    	'$match':{age:{'$gt':18}}
	    },
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,courses:true}
	    }
	]
).pretty()

db.users.aggregate(
	[
	    {
	    	'$match':{age:{'$gt':18}}
	    },
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,courses:true}
	    },
	    {
	    	'$project':{name:true,firstCourses:{'$slice':['$courses',2]}}
	    },
	    {
	    	'$project':{name:true,course:{'$arrayElemAt':['$firstCourses', 0]}}
	    }
	]
).pretty()

db.users.aggregate(
	[
	    {
	    	'$match':{age:{'$gt':18}}
	    },
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,courses:true}
	    },
	    {
	    	'$project':{name:true,firstCourses:{'$slice':['$courses',2]}}
	    },
	    {
	    	'$project':{name:true,course:{'$arrayElemAt':['$firstCourses', 0]}}
	    }
	]
).pretty()


// -------------------------Agregar campos-----------------------------

db.users.aggregate(
	[
	    {
	    	'$match':{age:{'$gt':18}}
	    },
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,courses:true}
	    },
	    {
	    	'$addFields':{currentDate: new Date(),newName:'$name'}
	    }
	]
).pretty()



// --------------------------Set-----------------------------

// $set

db.users.aggregate(
    {
    	'$match':{scores:{'$exists':true}}
    },
    {
    	'$project':{_id:false,name:true,scores:true}
    },
    {
    	'$set':{sum:{'$sum':'$scores'}}
    },
    {
    	'$set':{avg:{'$avg':'$scores'}}
    },
    {
    	'$match':{avg:{'$gt':7}}
    }
).pretty()



// ---------------------------Concatenar atributos-----------------------------

db.users.aggregate(
	[
    {
    	'$match':{$and:[{name:{'$exists':true}},{lastName:{'$exists':true}}]}
    },
    {
    	'$project':{_id:false,name:true,lastName:true}
    },
    {
    	'$project':{fullName:{'$concat':['$name', ' ', '$lastName']}}
    }
    ]
)

db.users.aggregate(
	[
    {
    	'$match':{$and:[{name:{'$exists':true}},{lastName:{'$exists':true}}]}
    },
    {
    	'$project':{fullName:{'$concat':['$name', ' ', '$lastName']}}
    }
    ]
).pretty()



// ---------------------------Group by-----------------------------

// Agrupar y contar la cantidad de items con respecto a su tipo
db.items.insertMany([
  {type: 'Camera', color: 'Red', price: 120},
  {type: 'Laptop', color: 'White', price: 400},
  {type:'Laptop', color: 'Black', price: 600},
  {type:'Camera', color: 'Silver', price: 200},
  {type:'Microphone', color: 'Black', price: 200},
  {type:'Mouse', color: 'White', price: 50},
  {type:'Monitor', color: 'White', price: 50},
])

db.items.aggregate(
	[
	    {
	    	'$group':{_id:'$type',total:{'$sum':1}}
	    },
	    {
	    	// HAVING
	    	'$match':{total:{'$gt':1}}
	    }
	]
)



// ---------------------------Ordenamiento-----------------------------

// $limit y $sort

// Obtener al usuario mas joven
db.users.aggregate(
    [
        {
        	'$sort':{age:1}
        },
        {
        	'$limit':1
        },
        {
            '$project':{_id:false,name:true,age:true}	
        }
    ]
)



// ---------------------------Map-----------------------------

// $map

db.users.aggregate(
	[
	    {
	    	'$match':{scores:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,scores:true}	
	    },
	    {
	    	'$project':{newListScores:{'$map':{input:'$scores',as:'$calificacion',in:'150'}}}
	    }
	]
)

db.users.aggregate(
	[
	    {
	    	'$match':{scores:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,scores:true}	
	    },
	    {
	    	'$project':{newListScores:{'$map':{input:'$scores',as:'calificacion',in:{'$muliply':['$$calificacion', 10]}}}}
	    }
	]
)

db.users.aggregate(
	[
	    {
	    	'$match':{courses:{'$exists':true}}
	    },
	    {
	    	'$project':{_id:false,name:true,courses:true}	
	    },
	    {
	    	'$project':{newList:{'$map':{input:'$courses',as:'course',in:{'$multiply':['$$course.progrss',10]}}}}
	    }
	]
)




















