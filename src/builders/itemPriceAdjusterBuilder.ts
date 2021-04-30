import { ItemPriceAdjuster } from "../tests-to-implement/03_class_dependency_injected_into_sut"
import { pricingServiceBuilder } from "./pricingServiceBuilder"

export function itemPriceAdjusterBuilder() {
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
            return new ItemPriceAdjuster(serviceBuilder.build())
        }
    }

    return builder
}