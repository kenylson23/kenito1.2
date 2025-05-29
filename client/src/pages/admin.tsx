import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { StoreService } from '@/services/storeService'
import { UserService } from '@/services/userService'
import type { Store, InsertStore, User, InsertUser } from '@shared/schema'

export default function Admin() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Estados para formulários
  const [newStore, setNewStore] = useState<Partial<InsertStore>>({
    name: '',
    address: '',
    city: '',
    province: '',
    phone: '',
    email: '',
    type: 'retail',
    openHours: ''
  })

  const [newUser, setNewUser] = useState<Partial<InsertUser>>({
    username: '',
    password: ''
  })

  // Queries para buscar dados
  const { data: stores = [], isLoading: storesLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: () => StoreService.getAllStores()
  })

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getAllUsers()
  })

  // Mutations para criar dados
  const createStoreMutation = useMutation({
    mutationFn: (store: InsertStore) => StoreService.createStore(store),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
      toast({
        title: 'Sucesso',
        description: 'Loja criada com sucesso!'
      })
      setNewStore({
        name: '',
        address: '',
        city: '',
        province: '',
        phone: '',
        email: '',
        type: 'retail',
        openHours: ''
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const createUserMutation = useMutation({
    mutationFn: (user: InsertUser) => UserService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: 'Sucesso',
        description: 'Usuário criado com sucesso!'
      })
      setNewUser({ username: '', password: '' })
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const deleteStoreMutation = useMutation({
    mutationFn: (id: number) => StoreService.deleteStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
      toast({
        title: 'Sucesso',
        description: 'Loja removida com sucesso!'
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => UserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: 'Sucesso',
        description: 'Usuário removido com sucesso!'
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStore.name || !newStore.address || !newStore.city || !newStore.province) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive'
      })
      return
    }
    createStoreMutation.mutate(newStore as InsertStore)
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.username || !newUser.password) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive'
      })
      return
    }
    createUserMutation.mutate(newUser as InsertUser)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Administração - Teste Supabase</h1>
      
      <Tabs defaultValue="stores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stores">Lojas</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="stores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar Nova Loja</CardTitle>
              <CardDescription>Adicione uma nova loja ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateStore} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="store-name">Nome da Loja *</Label>
                    <Input
                      id="store-name"
                      value={newStore.name || ''}
                      onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                      placeholder="Nome da loja"
                    />
                  </div>
                  <div>
                    <Label htmlFor="store-type">Tipo</Label>
                    <Select
                      value={newStore.type || 'retail'}
                      onValueChange={(value) => setNewStore({ ...newStore, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Varejo</SelectItem>
                        <SelectItem value="wholesale">Atacado</SelectItem>
                        <SelectItem value="restaurant">Restaurante</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="store-address">Endereço *</Label>
                  <Input
                    id="store-address"
                    value={newStore.address || ''}
                    onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                    placeholder="Endereço completo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="store-city">Cidade *</Label>
                    <Input
                      id="store-city"
                      value={newStore.city || ''}
                      onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="store-province">Província *</Label>
                    <Input
                      id="store-province"
                      value={newStore.province || ''}
                      onChange={(e) => setNewStore({ ...newStore, province: e.target.value })}
                      placeholder="Província"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="store-phone">Telefone</Label>
                    <Input
                      id="store-phone"
                      value={newStore.phone || ''}
                      onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                      placeholder="Telefone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="store-email">Email</Label>
                    <Input
                      id="store-email"
                      type="email"
                      value={newStore.email || ''}
                      onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="store-hours">Horário de Funcionamento</Label>
                  <Textarea
                    id="store-hours"
                    value={newStore.openHours || ''}
                    onChange={(e) => setNewStore({ ...newStore, openHours: e.target.value })}
                    placeholder="Ex: Segunda a Sexta: 8h às 18h"
                  />
                </div>

                <Button type="submit" disabled={createStoreMutation.isPending}>
                  {createStoreMutation.isPending ? 'Criando...' : 'Criar Loja'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lojas Cadastradas ({stores.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {storesLoading ? (
                <p>Carregando lojas...</p>
              ) : stores.length === 0 ? (
                <p>Nenhuma loja cadastrada ainda.</p>
              ) : (
                <div className="space-y-4">
                  {stores.map((store: Store) => (
                    <div key={store.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{store.name}</h3>
                          <p className="text-sm text-gray-600">{store.address}</p>
                          <p className="text-sm text-gray-600">{store.city}, {store.province}</p>
                          {store.phone && <p className="text-sm">📞 {store.phone}</p>}
                          {store.email && <p className="text-sm">📧 {store.email}</p>}
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                            {store.type}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteStoreMutation.mutate(store.id)}
                          disabled={deleteStoreMutation.isPending}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Usuário</CardTitle>
              <CardDescription>Adicione um novo usuário ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <Label htmlFor="user-username">Nome de Usuário *</Label>
                  <Input
                    id="user-username"
                    value={newUser.username || ''}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Nome de usuário"
                  />
                </div>
                <div>
                  <Label htmlFor="user-password">Senha *</Label>
                  <Input
                    id="user-password"
                    type="password"
                    value={newUser.password || ''}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Senha"
                  />
                </div>
                <Button type="submit" disabled={createUserMutation.isPending}>
                  {createUserMutation.isPending ? 'Criando...' : 'Criar Usuário'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usuários Cadastrados ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <p>Carregando usuários...</p>
              ) : users.length === 0 ? (
                <p>Nenhum usuário cadastrado ainda.</p>
              ) : (
                <div className="space-y-4">
                  {users.map((user: User) => (
                    <div key={user.id} className="border p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-sm text-gray-600">ID: {user.id}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteUserMutation.mutate(user.id)}
                        disabled={deleteUserMutation.isPending}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}