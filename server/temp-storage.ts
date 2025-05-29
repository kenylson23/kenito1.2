import { type Store, type InsertStore } from "@shared/schema";

// Dados temporários das lojas da cerveja Kenito em Angola
const tempStores: Store[] = [
  {
    id: 1,
    name: "Kenito Store Luanda Centro",
    address: "Rua Rainha Ginga, 45",
    city: "Luanda",
    province: "Luanda",
    phone: "+244 923 456 789",
    email: "luanda@kenito.ao",
    latitude: "-8.8390",
    longitude: "13.2894",
    type: "retail",
    openHours: "08:00-22:00",
    createdAt: new Date("2024-01-15")
  },
  {
    id: 2,
    name: "Kenito Express Benguela",
    address: "Avenida Norton de Matos, 123",
    city: "Benguela",
    province: "Benguela",
    phone: "+244 912 345 678",
    email: "benguela@kenito.ao",
    latitude: "-12.5763",
    longitude: "13.4055",
    type: "retail",
    openHours: "09:00-21:00",
    createdAt: new Date("2024-02-01")
  },
  {
    id: 3,
    name: "Kenito Bar Huambo",
    address: "Largo da Independência, 78",
    city: "Huambo",
    province: "Huambo",
    phone: "+244 934 567 890",
    email: "huambo@kenito.ao",
    latitude: "-12.7756",
    longitude: "15.7361",
    type: "bar",
    openHours: "16:00-02:00",
    createdAt: new Date("2024-02-10")
  },
  {
    id: 4,
    name: "Kenito Distribuidor Lubango",
    address: "Rua da Samba, 234",
    city: "Lubango",
    province: "Huíla",
    phone: "+244 945 678 901",
    email: "lubango@kenito.ao",
    latitude: "-14.9176",
    longitude: "13.4902",
    type: "distributor",
    openHours: "07:00-18:00",
    createdAt: new Date("2024-02-15")
  },
  {
    id: 5,
    name: "Kenito Cabinda Premium",
    address: "Avenida Agostinho Neto, 567",
    city: "Cabinda",
    province: "Cabinda",
    phone: "+244 956 789 012",
    email: "cabinda@kenito.ao",
    latitude: "-5.5500",
    longitude: "12.2000",
    type: "retail",
    openHours: "08:00-20:00",
    createdAt: new Date("2024-03-01")
  }
];

export class TempStorage {
  private stores: Store[] = [...tempStores];
  private nextId = 6;

  async getAllStores(): Promise<Store[]> {
    return [...this.stores];
  }

  async getStoresByProvince(province: string): Promise<Store[]> {
    return this.stores.filter(store => 
      store.province.toLowerCase().includes(province.toLowerCase())
    );
  }

  async getStoresByCity(city: string): Promise<Store[]> {
    return this.stores.filter(store => 
      store.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  async searchStores(query: string): Promise<Store[]> {
    const searchTerm = query.toLowerCase();
    return this.stores.filter(store => 
      store.name.toLowerCase().includes(searchTerm) ||
      store.address.toLowerCase().includes(searchTerm) ||
      store.city.toLowerCase().includes(searchTerm) ||
      store.province.toLowerCase().includes(searchTerm)
    );
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const newStore: Store = {
      id: this.nextId++,
      name: insertStore.name,
      address: insertStore.address,
      city: insertStore.city,
      province: insertStore.province,
      phone: insertStore.phone || null,
      email: insertStore.email || null,
      latitude: insertStore.latitude || null,
      longitude: insertStore.longitude || null,
      type: insertStore.type ?? "retail",
      openHours: insertStore.openHours || null,
      createdAt: new Date()
    };
    this.stores.push(newStore);
    return newStore;
  }

  async getStore(id: number): Promise<Store | undefined> {
    return this.stores.find(store => store.id === id);
  }
}