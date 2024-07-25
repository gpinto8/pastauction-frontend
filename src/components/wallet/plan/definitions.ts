export interface Product {
  category: string
  currency: string
  family: number
  id: number
  name: string
  prezzo: number
  properties: {
    id: number
    product_id: number
    tipo: string
    value: string
  }
}
export interface ProductDetails {
  id: number
  family: number
  category: string
  tipologia: string
  prezzo: number
  currency: string
  name: string
  properties: {
    limit: string
    'expire(dd)': string
    'update(dd)': string
    graphs: string
    limit_daily: string
    available: string
  }
}

export type Plan = {
  name: string
  type: 'monthly' | 'annual' | 'perpetual' | 'bolts'
}

export const plans: Record<Plan['type'], Plan> = {
  monthly: {
    name: 'Monthly Plan',
    type: 'monthly',
  },
  annual: {
    name: 'Annual Plan',
    type: 'annual',
  },
  perpetual: {
    name: 'Perpetual Plan',
    type: 'perpetual',
  },
  bolts: {
    name: 'Bolts required',
    type: 'bolts',
  },
} as const

const [blue, yellow, green] = [
  {
    background: '#C1D7FC',
    active: '#0D6EFD',
  },
  {
    background: '#F9F2D1',
    active: '#E8C142',
  },
  {
    background: '#D5E3CE',
    active: '#6DA544',
  },
] as const

export const families: {
  [key: number]: {
    name: string
    plan: Plan
    color: {
      background: string
      active: string
    }
  }
} = {
  1: {
    name: 'Ready',
    plan: plans.monthly,
    color: yellow,
  },
  2: {
    name: 'Start',
    plan: plans.monthly,
    color: yellow,
  },
  3: {
    name: 'Go',
    plan: plans.annual,
    color: green,
  },
  4: {
    name: 'Pro',
    plan: plans.annual,
    color: green,
  },
  5: {
    name: 'PayPerUse',
    plan: plans.bolts,
    color: blue,
  },
  6: {
    name: 'Free',
    plan: plans.perpetual,
    color: blue,
  },
} as const