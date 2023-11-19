export interface User {
  id: number
  name: string
  avatar: string
  email: string
  token: string
  roles_list: string[]
  created_at: Date
  updated_at: Date
}

export interface UserUpdateProfile {
  name: string
  last_name: string
  password: string
  phone_number: string
  email: string
}
