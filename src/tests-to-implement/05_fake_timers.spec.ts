import { describe, expect, it } from '@jest/globals'
import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {
  const oneWeekMilliseconds = 604800000
  beforeEach(() => {
    jest.useFakeTimers('modern');
  })

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a message containing the current time', () => {
    // Arrange
    const currentDate = new Date('2021-04-30T11:01:58.135+02:00');
    const expected = '[11:01:58 AM]: Today is Friday'

    jest.setSystemTime(currentDate)
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toEqual(expected)
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    const currentDate = new Date('2021-04-30T11:01:58.135+02:00')
    const beforeTimeElapsedExpected = '[11:01:58 AM]: Today is Friday'
    const afterTimeElapsedExpected = '[11:11:58 AM]: Today is Friday'
    const tenMinutesInMilliseconds = 600000

    jest.setSystemTime(currentDate)

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsedResult).toEqual(beforeTimeElapsedExpected)
    // Act
    jest.advanceTimersByTime(tenMinutesInMilliseconds)
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsedResult).toEqual(afterTimeElapsedExpected)
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    const seededDate = new Date('2021-05-03T11:01:58.135+02:00');
    const expected = 'Monday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(1)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(1)
    expect(afterTimeElapsedResult).toContain(expected)
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    const seededDate = new Date('2021-05-04T11:01:58.135+02:00');
    const expected = 'Tuesday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(2)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(2)
    expect(afterTimeElapsedResult).toContain(expected)
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    const seededDate = new Date('2021-05-05T11:01:58.135+02:00');
    const expected = 'Wednesday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(3)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(3)
    expect(afterTimeElapsedResult).toContain(expected)
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    const seededDate = new Date('2021-05-06T11:01:58.135+02:00');
    const expected = 'Thursday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(4)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(4)
    expect(afterTimeElapsedResult).toContain(expected)
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    const seededDate = new Date('2021-05-07T11:01:58.135+02:00');
    const expected = 'Friday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(5)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(5)
    expect(afterTimeElapsedResult).toContain(expected)
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    const seededDate = new Date('2021-05-08T11:01:58.135+02:00');
    const expected = 'Saturday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(6)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(6)
    expect(afterTimeElapsedResult).toContain(expected)
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    const seededDate = new Date('2021-05-09T11:01:58.135+02:00');
    const expected = 'Sunday'
    
    jest.setSystemTime(seededDate)
    const beforeTimeElapsed = new Date()

    const beforeTimeElapsedResult = generateDayMessage()
    expect(beforeTimeElapsed.getDay()).toBe(0)
    expect(beforeTimeElapsedResult).toContain(expected)
    // Act
    jest.advanceTimersByTime(oneWeekMilliseconds)
    const afterTimeElapsed = new Date()
    const afterTimeElapsedResult = generateDayMessage()
    // Assert
    expect(afterTimeElapsed.getDay()).toBe(0)
    expect(afterTimeElapsedResult).toContain(expected)
  })
})