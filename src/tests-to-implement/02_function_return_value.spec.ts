import { describe, expect, it } from '@jest/globals'
import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'
import { getAll } from '../dependencies/get_all'
import { itemBuilder } from '../builders/itemBuilder'

jest.mock('../dependencies/get_all')

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      const item1 = itemBuilder().withPrice(5).build()
      const item2 = itemBuilder().withPrice(11).build()
      const item3 = itemBuilder().withPrice(10).build()

      const mockGetAll = getAll as jest.MockedFunction<typeof getAll>
      mockGetAll.mockImplementation(() => Promise.resolve([item1, item2, item3]))
      // Act
      const result = await getAllItemsOnSale()
      // Assert
      expect(result).toEqual([item1])
    })
  })
})
