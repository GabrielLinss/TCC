export const TOKEN_KEY = "@allocate-Token"
export const USER_ID = "@allocate-UserId"
export const USER_NAME = "@allocate-UserName"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const getUserId = () => localStorage.getItem(USER_ID)
export const getUserName = () => localStorage.getItem(USER_NAME)
export const login = (token, user_id, user_name) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_ID, user_id)
  localStorage.setItem(USER_NAME, user_name)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}
