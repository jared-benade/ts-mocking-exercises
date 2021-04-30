import { Item } from "../dependencies/Item";

export function itemBuilder() {
    const item: Item = {
        id: '',
        name: '',
        price: 0,
        description: '',
        created: new Date()
    }

    const builder = {
        withPrice(value: number) {
            item.price = value
            return builder
        },
        build() {
            return item
        }
    }

    return builder
}