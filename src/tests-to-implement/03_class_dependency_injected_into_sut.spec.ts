import { describe, expect, it } from '@jest/globals'
import { itemBuilder } from '../builders/itemBuilder'
import { itemPriceAdjusterBuilder } from '../builders/itemPriceAdjusterBuilder'

jest.mock('../dependencies/PricingService')

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = itemBuilder().withPrice(10).build()
      const expected = 12

      const sut = itemPriceAdjusterBuilder().withMarkUpPercentage(20).build()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(expected)
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      const item = itemBuilder().withPrice(200).build()
      const expected = 160

      const sut = itemPriceAdjusterBuilder().withMarkDownPercentage(20).build()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(expected)
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      const item = itemBuilder().withPrice(100).build()
      const expected = 100

      const sut = itemPriceAdjusterBuilder().build()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(expected)
    })
  })
})