import os
import pprint


def show_user(user):
	pp = pprint.PrettyPrinter(indent=4)
	pp.pprint(user)


def clear_system(function):

	def wrap(*args, **kwargs):
		os.system('clear') # Se supone que esto limpia la pantalla
		result = function(*args, **kwargs)
		input('')
		os.system('clear')

	wrap.__doc__=function.__doc__
	return wrap


@clear_system
def create_user(collection):
	"""A) Crear un usuario"""

	username = input('Username: ')
	edad = int(input('Edad: '))
	email = input('Email: ')

    # Documento -> Json -> Dic
	user = dict(username=username, edad=edad, email=email)

	direccion = input('¿Desea ingresar su direccion? (S/N)').lower()

	if direccion=='s':
		user['direccion']=get_address()

	collection.insert_one(user)

	show_user(user)

	return user


def get_address():
	calle = input('Calle:')
	ciudad = input('Ciudad:')
	estado = input('Estado:')
	codigo_postal = input('Codigo Postal:')

	direccion = dict(calle=calle, ciudad=ciudad, estado=estado, codigo_postal=codigo_postal)

	return direccion


@clear_system
def get_user(collection):
	"""B) Consultar usuario"""
	username = input('Username: ')

	user = collection.find_one(
		{'username':username},
		{'_id':False} 
	)

	if user:
		show_user(user)
		return user
	else:
		print("No se ha encontrado el documento")

	return user


def delete_user(collection):
	"""C) Eliminar usuario"""
	username = input('Username:')

	return collection.remove({'username':username})


def update_user(collection):
	"""D) Actualizar usuario"""
	print('Actualizar usuario')


def default(*args, **kwargs):
	print('Opcion no valida')
	

# Para crear funciones tenemos que ir a la pestaña Realm de Atlas y de igual forma para por Triggers















