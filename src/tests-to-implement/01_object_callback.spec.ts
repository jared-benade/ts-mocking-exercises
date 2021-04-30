import { describe, expect, it } from '@jest/globals'
import { execute } from '../tests-to-implement/01_object_callback'

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      const payload = createPayload({})
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toHaveBeenCalled()
    })

    it('calls the callback once', () => {
      // Arrange
      const payload = createPayload({})
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toHaveBeenCalledTimes(1)
    })

    it('calls the callback with correct value', () => {
      // Arrange
      const payload = createPayload({ id: 'some id', amount: 10 })
      const expected = '100 for some id'
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toHaveBeenCalledWith(expected)
    })
  })
})

function createPayload({ id = '', amount = 0 }) {
  return {
    callback: jest.fn(),
    id,
    amount
  }
}
