import type { Store, InsertStore } from '@shared/schema'

// Dados estáticos das lojas
const staticStores: Store[] = [
  {
    id: 1,
    name: 'Kenito Store Luanda Centro',
    address: 'Rua da Missão, 123',
    city: 'Luanda',
    province: 'Luanda',
    phone: '+244 923 456 789',
    email: 'luanda@kenito.ao',
    latitude: '-8.8383',
    longitude: '13.2344',
    type: 'retail',
    openHours: 'Segunda a Sexta: 8h às 18h, Sábado: 8h às 15h',
    createdAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: 2,
    name: 'Kenito Bar Marginal',
    address: 'Ilha de Luanda, Marginal',
    city: 'Luanda',
    province: 'Luanda',
    phone: '+244 923 456 790',
    email: 'bar@kenito.ao',
    latitude: '-8.7832',
    longitude: '13.2344',
    type: 'bar',
    openHours: 'Todos os dias: 18h às 2h',
    createdAt: new Date('2024-01-10T10:00:00Z')
  },
  {
    id: 3,
    name: 'Kenito Atacado Benguela',
    address: 'Avenida Norton de Matos, 456',
    city: 'Benguela',
    province: 'Benguela',
    phone: '+244 923 456 791',
    email: 'benguela@kenito.ao',
    latitude: '-12.5764',
    longitude: '13.4055',
    type: 'wholesale',
    openHours: 'Segunda a Sexta: 7h às 17h',
    createdAt: new Date('2024-01-05T10:00:00Z')
  },
  {
    id: 4,
    name: 'Kenito Restaurant Huambo',
    address: 'Rua José Martí, 789',
    city: 'Huambo',
    province: 'Huambo',
    phone: '+244 923 456 792',
    email: 'huambo@kenito.ao',
    latitude: '-12.7756',
    longitude: '15.7397',
    type: 'restaurant',
    openHours: 'Todos os dias: 12h às 22h',
    createdAt: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: 5,
    name: 'Kenito Store Lobito',
    address: 'Avenida da Independência, 321',
    city: 'Lobito',
    province: 'Benguela',
    phone: '+244 923 456 793',
    email: 'lobito@kenito.ao',
    latitude: '-12.3598',
    longitude: '13.5464',
    type: 'retail',
    openHours: 'Segunda a Sábado: 8h às 18h',
    createdAt: new Date('2023-12-20T10:00:00Z')
  }
];

export class StoreService {
  // Listar todas as lojas
  static async getAllStores(): Promise<Store[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...staticStores].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  // Buscar lojas por província
  static async getStoresByProvince(province: string): Promise<Store[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticStores
      .filter(store => store.province.toLowerCase() === province.toLowerCase())
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  // Buscar lojas por cidade
  static async getStoresByCity(city: string): Promise<Store[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticStores
      .filter(store => store.city.toLowerCase() === city.toLowerCase())
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  // Pesquisar lojas
  static async searchStores(query: string): Promise<Store[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const searchTerm = query.toLowerCase();
    return staticStores
      .filter(store => 
        store.name.toLowerCase().includes(searchTerm) ||
        store.address.toLowerCase().includes(searchTerm) ||
        store.city.toLowerCase().includes(searchTerm) ||
        store.province.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  // Criar nova loja (simulado)
  static async createStore(store: InsertStore): Promise<Store> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newStore: Store = {
      id: staticStores.length + 1,
      ...store,
      createdAt: new Date()
    };
    
    staticStores.push(newStore);
    return newStore;
  }

  // Buscar loja por ID
  static async getStore(id: number): Promise<Store | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticStores.find(store => store.id === id) || null;
  }

  // Atualizar loja (simulado)
  static async updateStore(id: number, updates: Partial<InsertStore>): Promise<Store> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const storeIndex = staticStores.findIndex(store => store.id === id);
    if (storeIndex === -1) {
      throw new Error('Store not found');
    }
    
    staticStores[storeIndex] = { ...staticStores[storeIndex], ...updates };
    return staticStores[storeIndex];
  }

  // Deletar loja (simulado)
  static async deleteStore(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const storeIndex = staticStores.findIndex(store => store.id === id);
    if (storeIndex === -1) {
      throw new Error('Store not found');
    }
    
    staticStores.splice(storeIndex, 1);
  }
}