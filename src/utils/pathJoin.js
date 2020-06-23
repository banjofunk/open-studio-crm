export default function pathJoin() {
  const parts = Array.prototype.slice.call(arguments)
  return parts
    .join('/')
    .replace(/\/+/g, '/')
}
