
export  interface BusinessTypeModel {
    _id: string
    name: string
    nameAr: string
    image: string,
    isActive: boolean,
    slug: string,
    businesses: string[],
    createdAt: Date
    updatedAt: Date
}