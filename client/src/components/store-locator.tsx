import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Search, Phone, Clock, Filter } from "lucide-react";
import { Store } from "@shared/schema";
import { StoreService } from "@/services/storeService";

export default function StoreLocator() {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const angolianProvinces = [
    "Luanda", "Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango",
    "Cuanza Norte", "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Lunda Norte",
    "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire"
  ];

  const { data: stores = [], isLoading } = useQuery({
    queryKey: ['/api/stores', selectedProvince, selectedCity, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedProvince) params.append('province', selectedProvince);
      if (selectedCity) params.append('city', selectedCity);
      
      const response = await fetch(`/api/stores?${params}`);
      if (!response.ok) throw new Error('Failed to fetch stores');
      return response.json();
    }
  });

  const handleSearch = () => {
    // Search is handled automatically by the query dependencies
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedStore(null);
  };

  const getStoreTypeLabel = (type: string) => {
    switch (type) {
      case 'retail': return 'Loja';
      case 'wholesale': return 'Grossista';
      case 'restaurant': return 'Restaurante';
      case 'bar': return 'Bar';
      default: return 'Loja';
    }
  };

  return (
    <section id="pontos-venda" className="py-20 bg-gray-900 relative">
      <div className="geometric-pattern absolute inset-0 opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-6">
            PONTOS DE <span className="text-gradient">VENDA</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Encontre onde comprar Kenito perto de si em Angola
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-green-500/30 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-green-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar lojas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
            </div>
            
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-3 bg-black/40 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none"
            >
              <option value="">Todas as Províncias</option>
              {angolianProvinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Cidade..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
            />
            
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 transition-colors"
            >
              <Filter size={20} />
              Limpar
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Store List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-green-300 mb-6">
              {isLoading ? "Carregando..." : `${stores.length} pontos de venda encontrados`}
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {stores.map((store: Store, index: number) => (
                <motion.div
                  key={store.id}
                  className={`bg-black/50 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all ${
                    selectedStore?.id === store.id 
                      ? 'border-green-400 bg-green-500/10' 
                      : 'border-green-500/30 hover:border-green-400/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedStore(store)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-white">{store.name}</h4>
                      <span className="inline-block bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm mt-1">
                        {getStoreTypeLabel(store.type)}
                      </span>
                    </div>
                    <MapPin className="text-green-400 flex-shrink-0" size={20} />
                  </div>
                  
                  <div className="space-y-2 text-gray-300">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} />
                      {store.address}, {store.city}, {store.province}
                    </p>
                    
                    {store.phone && (
                      <p className="flex items-center gap-2">
                        <Phone size={16} />
                        {store.phone}
                      </p>
                    )}
                    
                    {store.openHours && (
                      <p className="flex items-center gap-2">
                        <Clock size={16} />
                        {store.openHours}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {!isLoading && stores.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Nenhum ponto de venda encontrado</p>
                  <p className="text-sm">Tente ajustar os filtros de pesquisa</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Store Details / Map Placeholder */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {selectedStore ? (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{selectedStore.name}</h3>
                
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="text-green-300 font-semibold mb-2">Endereço</h4>
                    <p>{selectedStore.address}</p>
                    <p>{selectedStore.city}, {selectedStore.province}</p>
                  </div>
                  
                  {selectedStore.phone && (
                    <div>
                      <h4 className="text-green-300 font-semibold mb-2">Telefone</h4>
                      <p>{selectedStore.phone}</p>
                    </div>
                  )}
                  
                  {selectedStore.email && (
                    <div>
                      <h4 className="text-green-300 font-semibold mb-2">Email</h4>
                      <p>{selectedStore.email}</p>
                    </div>
                  )}
                  
                  {selectedStore.openHours && (
                    <div>
                      <h4 className="text-green-300 font-semibold mb-2">Horário</h4>
                      <p>{selectedStore.openHours}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-green-300 font-semibold mb-2">Tipo</h4>
                    <p>{getStoreTypeLabel(selectedStore.type)}</p>
                  </div>
                </div>
                
                {/* Placeholder for future map integration */}
                <div className="mt-6 bg-gray-800/50 rounded-lg p-8 text-center">
                  <MapPin size={48} className="mx-auto mb-4 text-green-400" />
                  <p className="text-gray-400">Mapa em breve</p>
                  <p className="text-sm text-gray-500">Integração com mapas será adicionada</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin size={48} className="mx-auto mb-4 text-green-400 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">Selecione um ponto de venda</h3>
                <p className="text-gray-400">Clique numa loja da lista para ver os detalhes</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}