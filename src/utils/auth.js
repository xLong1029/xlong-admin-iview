import { GetCookie, SetCookie, DelCookie } from 'utils'

const TokenKey = 'xLongAdmin-Token'

export function getToken () {
  return GetCookie(TokenKey)
}

export function setToken (token) {
  return SetCookie(TokenKey, token)
}

export function removeToken () {
  return DelCookie(TokenKey)
}
