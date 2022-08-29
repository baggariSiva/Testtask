import { Item } from "./itemType"

export interface Orders {
    date:string
    totalAmount:number
    items:Item[]
}