export const AUTH_TOKEN_KEY = 'auth_token'
export function getToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY) || ''
}

export function setToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function removeToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
}
