import { describe, expect, it } from '@jest/globals'
import { itemBuilder } from '../builders/itemBuilder'
import { InMemoryCache } from '../dependencies/InMemoryCache'
import { ItemRepository } from '../dependencies/ItemRepository'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { PubSub, PubSubChannels } from './06_PubSub'

describe('ItemProcessor', () => {
  jest.mock('./06_PubSub')

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      const itemRepository = new ItemRepository()
      const mockedPubSub = getMockedPubSub()
      itemRepository.getAll = jest.fn(() => Promise.resolve([itemBuilder().build()]))

      const sut = new ItemProcessor(new InMemoryCache(), itemRepository)
      // Act
      await Promise.all([sut.processItems(), sut.processItems()])
      // Assert
      expect(mockedPubSub.publish).toHaveBeenCalledTimes(1)
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const inMemoryCache = new InMemoryCache()
        const item = itemBuilder().build()

        itemRepository.getAll = jest.fn(() => Promise.resolve([item]))
        inMemoryCache.update = jest.fn()

        const sut = new ItemProcessor(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledTimes(1)
        expect(inMemoryCache.update).toHaveBeenCalledWith(item)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const item = itemBuilder().build()

        const mockedPubSub = getMockedPubSub()
        itemRepository.getAll = jest.fn(() => Promise.resolve([item]))

        const sut = new ItemProcessor(new InMemoryCache(), itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(mockedPubSub.publish).toHaveBeenCalledTimes(1)
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item)
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const item = itemBuilder().build()

        const mockedPubSub = getMockedPubSub()
        itemRepository.getAll = jest.fn(() => Promise.resolve([item]))

        const sut = new ItemProcessor(new InMemoryCache(), itemRepository)
        // Act
        await sut.processItems()
        await sut.processItems()
        // Assert
        expect(mockedPubSub.publish).toHaveBeenCalledTimes(1)
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item)
      })
    })

    describe('given newly added unprocessed items', () => {
      beforeEach(() => {
        jest.useFakeTimers('modern');
      })

      afterEach(() => {
        jest.useRealTimers();
      });

      it('processes all newly added items every x seconds', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const initialItem = itemBuilder().build()
        const additionalItem1 = itemBuilder().build()
        const additionalItem2 = itemBuilder().build()
        const items = [initialItem]

        const mockedPubSub = getMockedPubSub()
        itemRepository.getAll = jest.fn(() => Promise.resolve(items))

        const sut = new ItemProcessor(new InMemoryCache(), itemRepository)
        await sut.processItems()
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, initialItem)
        // Act
        items.push(additionalItem1)
        jest.advanceTimersToNextTimer()
        // Assert
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, additionalItem1)

        items.push(additionalItem2)
        jest.advanceTimersToNextTimer()

        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, additionalItem2)
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const inMemoryCache = new InMemoryCache()
        const item1 = itemBuilder().build()
        const item2 = itemBuilder().build()

        itemRepository.getAll = jest.fn(() => Promise.resolve([item1, item2]))
        inMemoryCache.update = jest.fn()

        const sut = new ItemProcessor(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledTimes(2)
        expect(inMemoryCache.update).toHaveBeenCalledWith(item1)
        expect(inMemoryCache.update).toHaveBeenCalledWith(item2)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const item1 = itemBuilder().build()
        const item2 = itemBuilder().build()

        const mockedPubSub = getMockedPubSub()
        itemRepository.getAll = jest.fn(() => Promise.resolve([item1, item2]))

        const sut = new ItemProcessor(new InMemoryCache(), itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(mockedPubSub.publish).toHaveBeenCalledTimes(2)
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item1)
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item2)
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const itemRepository = new ItemRepository()
        const item1 = itemBuilder().build()
        const item2 = itemBuilder().build()

        const mockedPubSub = getMockedPubSub()
        itemRepository.getAll = jest.fn(() => Promise.resolve([item1, item2]))

        const sut = new ItemProcessor(new InMemoryCache(), itemRepository)
        // Act
        await sut.processItems()
        await sut.processItems()
        await sut.processItems()
        // Assert
        expect(mockedPubSub.publish).toHaveBeenCalledTimes(2)
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item1)
        expect(mockedPubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item2)
      })
    })
  })
})

function getMockedPubSub() {
  const returnedPubSub = {
    publish: jest.fn()
  }

  const mockPubSub = PubSub as jest.MockedClass<typeof PubSub>
  mockPubSub.getInstance = jest.fn(() => {
    return returnedPubSub as any
  })
  return returnedPubSub
}

