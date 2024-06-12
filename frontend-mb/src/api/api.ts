export async function api(path: string, init?: RequestInit) {
  const apiPrefix = '/'
  const url = new URL(apiPrefix.concat(path), 'http://localhost:3333')

  return await fetch(url, init);
}