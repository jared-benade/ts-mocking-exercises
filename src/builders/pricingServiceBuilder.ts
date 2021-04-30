import { PricingService } from "../dependencies/PricingService"

export function pricingServiceBuilder() {
    const pricingService = new PricingService()

    const builder = {
        withMockedGetMarkUpPercentage(value: number) {
            pricingService.getMarkUpPercentage = jest.fn(() => Promise.resolve(value))
            return builder
        },
        withMockedGetMarkDownPercentage(value: number) {
            pricingService.getMarkDownPercentage = jest.fn(() => Promise.resolve(value))
            return builder
        },
        build() {
            return pricingService
        }
    }

    return builder
}