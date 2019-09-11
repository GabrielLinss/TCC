'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Allocate API is online' }
})

Route.group(() => {
  Route.post('login', 'AuthController.login')

  Route.get('rooms', 'RoomController.index')
  Route.get('rooms/:id', 'RoomController.show')

  Route.get('blocks', 'BlockController.index')
  Route.get('blocks/:id', 'BlockController.show')
}).prefix('api/v1')

Route.group(() => {
  Route.post('rooms', 'RoomController.store')
  Route.put('rooms/:id', 'RoomController.update')
  Route.delete('rooms/:id', 'RoomController.destroy')

  Route.post('blocks', 'BlockController.store')
  Route.put('blocks/:id', 'BlockController.update')
  Route.delete('blocks/:id', 'BlockController.destroy')

  Route.resource('users', 'UserController')
}).prefix('api/v1').middleware('auth')