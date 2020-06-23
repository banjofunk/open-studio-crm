import pathJoin from 'utils/pathJoin'
const API_URL = process.env.REACT_APP_API_URL

export function classTypePath(organizationId, classTypeId) {
  return API_URL + pathJoin('/organizations', organizationId, 'class-types', classTypeId)
}

export function classTypesPath(organizationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'class-types')
}

export function locationsPath(organizationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'locations')
}

export function locationPath(organizationId, locationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'locations', locationId)
}

export function organizationsPath() {
  return API_URL + pathJoin('/organizations')
}

export function locationRoomsPath(locationId) {
  return API_URL + pathJoin('/locations', locationId, 'rooms')
}

export function roomPath(roomId) {
  return API_URL + pathJoin('/rooms', roomId)
}

export function staffPath(staffId) {
  return API_URL + pathJoin('/staff', staffId)
}

export function usersPath(organizationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'users')
}

export function userPath(userId) {
  return API_URL + pathJoin('/users', userId)
}

export function productsPath(organizationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'products')
}

export function productPath(productId) {
  return API_URL + pathJoin('/products', productId)
}

export function classEventPath(classTypeId, classDate) {
  return API_URL + pathJoin('/class-events', classTypeId, classDate)
}

export function classEventsPath(organizationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'class-events')
}

export function classEventUsersPath(organizationId) {
  return API_URL + pathJoin('/organizations', organizationId, 'class-event-users')
}

export function classEventUserPath(classEventUserId) {
  return API_URL + pathJoin('/class-event-users', classEventUserId)
}
