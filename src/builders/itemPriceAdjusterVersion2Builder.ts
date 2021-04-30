import { ItemPriceAdjuster } from "../tests-to-implement/03_class_dependency_injected_into_sut"
import { ItemPriceAdjusterVersion2 } from "../tests-to-implement/04_class_dependency_initialized_within_sut"
import { pricingServiceBuilder } from "./pricingServiceBuilder"

export function itemPriceAdjusterVersion2Builder() {
    let serviceBuilder = pricingServiceBuilder()

    const builder = {
        withMarkUpPercentage(value: number) {
            serviceBuilder = serviceBuilder.withMockedGetMarkUpPercentage(value)
            return builder
        },
        withMarkDownPercentage(value: number) {
            serviceBuilder = serviceBuilder.withMockedGetMarkDownPercentage(value)
            return builder
        },
        build() {
            const itemPriceAdjuster = new ItemPriceAdjusterVersion2()
            itemPriceAdjuster['pricingService'] = serviceBuilder.build()
            return itemPriceAdjuster
        }
    }

    return builder
}