export interface categoryData {
  results: number
  metadata: Metadata
  data: category[]
  message:string
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface category {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
