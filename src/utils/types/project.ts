import type { User } from './user'

interface Task {
  id: number
  collection_name: string
  status: string
  is_workable: string
  closed_at: Date
}

interface MetricCalculation {
  id: number
  price: number
  final_price: number
  status: string
  created_at: Date
  updated_at: Date
}

export interface Project {
  id: number
  name: string
  client_name: string
  start_date: string
  revenue_percentage: number
  price_type: string
  cme_confirmed_at: Date
  assevered_at: Date
  cmc: MetricCalculation
  cme: MetricCalculation
  created_at: Date
  updated_at: Date
  project_manager: User
  tasks: Task[]
}
