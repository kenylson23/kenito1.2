import { supabase } from '@/lib/supabaseClient'
import type { User, InsertUser } from '@shared/schema'

export class UserService {
  // Listar todos os usuários
  static async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching users:', error)
      throw new Error(`Failed to fetch users: ${error.message}`)
    }

    return data || []
  }

  // Buscar usuário por ID
  static async getUser(id: number): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Usuário não encontrado
      }
      console.error('Error fetching user:', error)
      throw new Error(`Failed to fetch user: ${error.message}`)
    }

    return data
  }

  // Buscar usuário por username
  static async getUserByUsername(username: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Usuário não encontrado
      }
      console.error('Error fetching user by username:', error)
      throw new Error(`Failed to fetch user by username: ${error.message}`)
    }

    return data
  }

  // Criar novo usuário
  static async createUser(user: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      if (error.code === '23505') {
        throw new Error('Username already exists')
      }
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return data
  }

  // Atualizar usuário
  static async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      if (error.code === '23505') {
        throw new Error('Username already exists')
      }
      throw new Error(`Failed to update user: ${error.message}`)
    }

    return data
  }

  // Deletar usuário
  static async deleteUser(id: number): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting user:', error)
      throw new Error(`Failed to delete user: ${error.message}`)
    }
  }
}