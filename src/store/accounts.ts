import { defineStore } from 'pinia'

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: number
  label: { text: string }[]
  type: AccountType
  login: string
  password: string | null
}

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),

  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        label: [],
        type: 'LDAP',
        login: '',
        password: null,
      })
    },

    updateAccount(id: number, updatedData: Partial<Account>) {
      const index = this.accounts.findIndex((acc) => acc.id === id)
      if (index !== -1) {
        const login = updatedData.login?.slice(0, 100) || ''
        const password = updatedData.password?.slice(0, 100) || null

        const label =
          updatedData.label?.map((l) => ({
            text: l.text.slice(0, 50),
          })) || []

        this.accounts[index] = {
          ...this.accounts[index],
          ...updatedData,
          login,
          password,
          label,
        }
        return this.accounts[index]
      }
    },

    deleteAccount(id: number) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id)
    },
  },

  persist: true,
})
