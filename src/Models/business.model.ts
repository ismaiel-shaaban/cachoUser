import {BusinessTypeModel} from "./businessType.model";

export  interface  BusinessModel {
    _id: string
    name: string
    vendor:  string
    email: string
    phoneNumber: string
    whatsappLink: string
    whatsappClick: number
    chatClick: boolean
    avgRating: number
    url: string
    logo: string
    businessTypes: BusinessTypeModel[] | string[]
    reviews:  string[]
    categories:  string[]
    address: string
    description: string
    video: string
    isActive?: boolean
    hasOffers?: boolean
    isAdminVerify?: boolean
    workingDays?: any
    geolocation?: any
    countryCode?: string
    distance?: number
    createdAt: Date
    updatedAt: Date

}