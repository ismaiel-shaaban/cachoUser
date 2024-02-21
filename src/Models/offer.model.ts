
export  interface OfferModel {
    _id: string
    business:   string
    name?: string
    products:  string[]
    discount: number
    discountType: string
    image?: string
    isActive: boolean
    start: Date
    end: Date
    createdAt: Date
    updatedAt: Date

}