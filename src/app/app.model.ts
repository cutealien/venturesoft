export interface Category {
  idMenu: number
  "descripción": string
}

export interface Brand {
  idItem: number
  nombreMarca: string
  "descripción": string
  imagen: string
}

export interface CategoryResponse {
  error: boolean
  codigo: string
  message: string
  menuItems: Category[]
}

export interface BrandResponse {
  error: boolean
  codigo: string
  message: string
  menuItems: Brand[]
}
