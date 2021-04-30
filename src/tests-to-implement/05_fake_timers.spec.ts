import { describe, expect, it } from '@jest/globals'
import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  })

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a message containing the current time', () => {
    // Arrange
    const currentDate = new Date('2021-04-30T11:01:58.135+02:00');
    const expected = '[11:01:58 PM]: Today is Friday'

    jest.setSystemTime(currentDate)
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toEqual(expected)
  })

  it.skip('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    // Act
    // Assert
  })

  it.skip('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    // Act
    // Assert
  })
})
