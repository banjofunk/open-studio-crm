import pathJoin from 'utils/pathJoin'

export function classTypesPath() {
  return pathJoin('/classes')
}

export function classTypePath(classTypeId) {
  return pathJoin('/classes', classTypeId)
}

export function editClassTypePath(classTypeId) {
  return pathJoin('/classes', classTypeId, 'edit')
}

export function locationsPath() {
  return pathJoin('/locations')
}

export function locationPath(locationId) {
  return pathJoin('/locations', locationId)
}

export function editLocationPath(locationId) {
  return pathJoin('/locations', locationId, 'edit')
}

export function classEventsPath() {
  return pathJoin('/schedule')
}

export function roomPath(locationId, roomId) {
  return pathJoin('/locations', locationId, 'rooms', roomId)
}

export function editRoomPath(locationId, roomId) {
  return pathJoin('/locations', locationId, 'rooms', roomId, 'edit')
}

export function usersPath() {
  return pathJoin('/users')
}

export function userPath(userId) {
  return pathJoin('/users', userId)
}

export function editUserPath(userId) {
  return pathJoin('/users', userId, 'edit')
}

export function productsPath(productId) {
  return pathJoin('/products')
}

export function productPath(productId) {
  return pathJoin('/products', productId)
}

export function editProductPath(productId) {
  return pathJoin('/products', productId, 'edit')
}
