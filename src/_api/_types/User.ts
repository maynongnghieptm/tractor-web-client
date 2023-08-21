import Entity, { EntityId } from './Entity'



export type UserId = EntityId

// global user role across the system (useful for SAAS or if organizations arn't used)
// Each user can have only one global role
// export type UserGlobalRole = 'admin' | 'support' | 'member'

export interface UserSubmissionData {
  fullname?: string
  username?: string | null
  email: string
  address: string
  password?: string
  active: boolean;
  
}

export interface User extends UserSubmissionData, Entity {
  id: UserId
 
}

export default User
