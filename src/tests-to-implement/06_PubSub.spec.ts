import { describe, expect, it } from '@jest/globals'
import { PubSub } from '../tests-to-implement/06_PubSub'

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      const payload = { value: 123 }
      const [callbackExecution, mockedCallback] = getMockedCallbackAndExecution()
      const channel = 'test'

      const sut = PubSub.getInstance()

      await sut.subscribe(channel, mockedCallback)
      // Act
      await sut.publish(channel, payload)
      // Assert
      await callbackExecution()

      expect(mockedCallback).toHaveBeenCalledTimes(1)
      expect(mockedCallback).toHaveBeenCalledWith(payload)
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      const payload = { value: 123 }
      const [callbackExecution1, mockedCallback1] = getMockedCallbackAndExecution()
      const [callbackExecution2, mockedCallback2] = getMockedCallbackAndExecution()
      const channel = 'test'

      const sut = PubSub.getInstance()

      await sut.subscribe(channel, mockedCallback1)
      await sut.subscribe(channel, mockedCallback2)
      // Act
      await sut.publish(channel, payload)
      // Assert
      await Promise.all([callbackExecution1(), callbackExecution2()])

      expect(mockedCallback1).toHaveBeenCalledTimes(1)
      expect(mockedCallback1).toHaveBeenCalledWith(payload)

      expect(mockedCallback2).toHaveBeenCalledTimes(1)
      expect(mockedCallback2).toHaveBeenCalledWith(payload)
    })
  })

  function getMockedCallbackAndExecution(): [() => Promise<unknown>, jest.Mock<void, []>] {
    let resolvePromise: Function;
    function callbackExecution() {
      return new Promise((resolve, reject) => { resolvePromise = resolve })
    }
    const mockedCallback = jest.fn(() => {
      resolvePromise()
    })

    return [callbackExecution, mockedCallback]
  }
})
