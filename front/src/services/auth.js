export const TOKEN_KEY = "@allocate-Token"
export const REFRESH_TOKEN_KEY = "@allocate-RefreshToken"
export const USER_ID = "@allocate-UserId"
export const USER_NAME = "@allocate-UserName"
export const USER_ROLE = "@allocate-UserRole"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)
export const getUserId = () => localStorage.getItem(USER_ID)
export const getUserName = () => localStorage.getItem(USER_NAME)
export const getUserRole = () => localStorage.getItem(USER_ROLE)
export const login = (token, refresh_token, user_id, user_name, user_role) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
  localStorage.setItem(USER_ID, user_id)
  localStorage.setItem(USER_NAME, user_name)
  localStorage.setItem(USER_ROLE, user_role)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}
