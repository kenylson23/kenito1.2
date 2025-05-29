import { supabase } from '@/lib/supabaseClient'
import type { Store, InsertStore } from '@shared/schema'

export class StoreService {
  // Listar todas as lojas
  static async getAllStores(): Promise<Store[]> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching stores:', error)
      throw new Error(`Failed to fetch stores: ${error.message}`)
    }

    return data || []
  }

  // Buscar lojas por província
  static async getStoresByProvince(province: string): Promise<Store[]> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('province', province)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching stores by province:', error)
      throw new Error(`Failed to fetch stores by province: ${error.message}`)
    }

    return data || []
  }

  // Buscar lojas por cidade
  static async getStoresByCity(city: string): Promise<Store[]> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('city', city)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching stores by city:', error)
      throw new Error(`Failed to fetch stores by city: ${error.message}`)
    }

    return data || []
  }

  // Pesquisar lojas
  static async searchStores(query: string): Promise<Store[]> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .or(`name.ilike.%${query}%,address.ilike.%${query}%,city.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching stores:', error)
      throw new Error(`Failed to search stores: ${error.message}`)
    }

    return data || []
  }

  // Criar nova loja
  static async createStore(store: InsertStore): Promise<Store> {
    const { data, error } = await supabase
      .from('stores')
      .insert(store)
      .select()
      .single()

    if (error) {
      console.error('Error creating store:', error)
      throw new Error(`Failed to create store: ${error.message}`)
    }

    return data
  }

  // Buscar loja por ID
  static async getStore(id: number): Promise<Store | null> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching store:', error)
      return null
    }

    return data
  }

  // Atualizar loja
  static async updateStore(id: number, updates: Partial<InsertStore>): Promise<Store> {
    const { data, error } = await supabase
      .from('stores')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating store:', error)
      throw new Error(`Failed to update store: ${error.message}`)
    }

    return data
  }

  // Deletar loja
  static async deleteStore(id: number): Promise<void> {
    const { error } = await supabase
      .from('stores')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting store:', error)
      throw new Error(`Failed to delete store: ${error.message}`)
    }
  }
}