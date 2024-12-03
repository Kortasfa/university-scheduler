const DAYS = ['Mon, Jun 12', 'Tue, Jun 13', 'Wed, Jun 14', 'Thu, Jun 15', 'Fri, Jun 16']
const GROUPS = ['7A', '5B', '8A']

interface Class {
  subject: string
  teacher: string
}

type Schedule = Record<string, Record<string , Record<string, Class>>>

const SCHEDULE_DATA: Schedule = {
  '7A': {
    '08:00 - 08:45': {
      'Tue, Jun 13': { subject: 'Spanish', teacher: 'Ms Taylor' },
      'Wed, Jun 14': { subject: 'Music', teacher: 'Mrs Miller' },
      'Fri, Jun 16': { subject: 'History', teacher: 'Ms Wilson' },
    },
    '09:00 - 09:45': {
      'Mon, Jun 12': { subject: 'Math', teacher: 'Mrs Johnson' },
      'Tue, Jun 13': { subject: 'Literature', teacher: 'Ms Martin' },
      'Thu, Jun 15': { subject: 'Science', teacher: 'Ms Rodriguez' },
      'Fri, Jun 16': { subject: 'Music', teacher: 'Mrs Miller' },
    },
    '10:00 - 10:45': {
      'Mon, Jun 12': { subject: 'English', teacher: 'Mrs Davis' },
      'Tue, Jun 13': { subject: 'French', teacher: 'Mrs Williams' },
      'Wed, Jun 14': { subject: 'Art', teacher: 'Ms Brown' },
      'Thu, Jun 15': { subject: 'Chemistry', teacher: 'Mrs Johnson' },
      'Fri, Jun 16': { subject: 'Art', teacher: 'Ms Brown' },
    },
    '11:00 - 11:45': {
      'Mon, Jun 12': { subject: 'Literature', teacher: 'Ms Martin' },
      'Tue, Jun 13': { subject: 'Spanish', teacher: 'Ms Taylor' },
      'Wed, Jun 14': { subject: 'French', teacher: 'Mrs Williams' },
      'Thu, Jun 15': { subject: 'Spanish', teacher: 'Ms Taylor' },
      'Fri, Jun 16': { subject: 'French', teacher: 'Mrs Williams' },
    },
    '12:00 - 12:45': {
      'Tue, Jun 13': { subject: 'Chemistry', teacher: 'Mrs Johnson' },
      'Wed, Jun 14': { subject: 'Literature', teacher: 'Ms Martin' },
      'Fri, Jun 16': { subject: 'Spanish', teacher: 'Ms Taylor' },
    },
    '13:00 - 13:45': {
      'Mon, Jun 12': { subject: 'Spanish', teacher: 'Ms Taylor' },
      'Tue, Jun 13': { subject: 'Art', teacher: 'Ms Brown' },
      'Wed, Jun 14': { subject: 'Spanish', teacher: 'Ms Taylor' },
      'Thu, Jun 15': { subject: 'Literature', teacher: 'Ms Martin' },
    },
  },
  '5B': {
    '08:00 - 08:45': {
      'Mon, Jun 12': { subject: 'Music', teacher: 'Mrs Miller' },
      'Tue, Jun 13': { subject: 'History', teacher: 'Ms Wilson' },
      'Wed, Jun 14': { subject: 'Science', teacher: 'Ms Rodriguez' },
      'Thu, Jun 15': { subject: 'Spanish', teacher: 'Ms Taylor' },
      'Fri, Jun 16': { subject: 'Science', teacher: 'Ms Rodriguez' },
    },
    '09:00 - 09:45': {
      'Mon, Jun 12': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Wed, Jun 14': { subject: 'History', teacher: 'Ms Wilson' },
      'Thu, Jun 15': { subject: 'Chemistry', teacher: 'Mrs Johnson' },
    },
    '10:00 - 10:45': {
      'Mon, Jun 12': { subject: 'French', teacher: 'Mrs Williams' },
      'Tue, Jun 13': { subject: 'Math', teacher: 'Mrs Johnson' },
      'Wed, Jun 14': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Thu, Jun 15': { subject: 'Music', teacher: 'Mrs Miller' },
      'Fri, Jun 16': { subject: 'Math', teacher: 'Mrs Johnson' },
    },
    '11:00 - 11:45': {
      'Mon, Jun 12': { subject: 'History', teacher: 'Ms Wilson' },
      'Tue, Jun 13': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Wed, Jun 14': { subject: 'Art', teacher: 'Ms Brown' },
      'Thu, Jun 15': { subject: 'History', teacher: 'Ms Wilson' },
      'Fri, Jun 16': { subject: 'Biology', teacher: 'Mrs Jackson' },
    },
    '12:00 - 12:45': {
      'Mon, Jun 12': { subject: 'Art', teacher: 'Ms Brown' },
      'Tue, Jun 13': { subject: 'Literature', teacher: 'Ms Martin' },
      'Wed, Jun 14': { subject: 'History', teacher: 'Ms Wilson' },
      'Thu, Jun 15': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Fri, Jun 16': { subject: 'Music', teacher: 'Mrs Miller' },
    },
    '13:00 - 13:45': {
      'Mon, Jun 12': { subject: 'Chemistry', teacher: 'Mrs Johnson' },
      'Tue, Jun 13': { subject: 'English', teacher: 'Mrs Davis' },
      'Wed, Jun 14': { subject: 'Math', teacher: 'Mrs Johnson' },
      'Fri, Jun 16': { subject: 'Biology', teacher: 'Mrs Jackson' },
    },
  },
  '8A': {
    '08:00 - 08:45': {
      'Mon, Jun 12': { subject: 'Science', teacher: 'Ms Rodriguez' },
      'Tue, Jun 13': { subject: 'Music', teacher: 'Mrs Miller' },
      'Wed, Jun 14': { subject: 'History', teacher: 'Ms Wilson' },
      'Thu, Jun 15': { subject: 'Art', teacher: 'Ms Brown' },
      'Fri, Jun 16': { subject: 'Literature', teacher: 'Ms Martin' },
    },
    '09:00 - 09:45': {
      'Tue, Jun 13': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Thu, Jun 15': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Fri, Jun 16': { subject: 'English', teacher: 'Mrs Davis' },
    },
    '10:00 - 10:45': {
      'Tue, Jun 13': { subject: 'French', teacher: 'Mrs Williams' },
      'Wed, Jun 14': { subject: 'English', teacher: 'Mrs Davis' },
      'Thu, Jun 15': { subject: 'Music', teacher: 'Mrs Miller' },
    },
    '11:00 - 11:45': {
      'Mon, Jun 12': { subject: 'Math', teacher: 'Mrs Johnson' },
      'Tue, Jun 13': { subject: 'History', teacher: 'Ms Wilson' },
      'Wed, Jun 14': { subject: 'Math', teacher: 'Mrs Johnson' },
      'Thu, Jun 15': { subject: 'French', teacher: 'Mrs Williams' },
      'Fri, Jun 16': { subject: 'History', teacher: 'Ms Wilson' },
    },
    '12:00 - 12:45': {
      'Mon, Jun 12': { subject: 'Biology', teacher: 'Mrs Jackson' },
      'Tue, Jun 13': { subject: 'Art', teacher: 'Ms Brown' },
      'Wed, Jun 14': { subject: 'Chemistry', teacher: 'Mrs Johnson' },
      'Thu, Jun 15': { subject: 'History', teacher: 'Ms Wilson' },
      'Fri, Jun 16': { subject: 'Art', teacher: 'Ms Brown' },
    },
    '13:00 - 13:45': {
      'Mon, Jun 12': { subject: 'Music', teacher: 'Mrs Miller' },
      'Tue, Jun 13': { subject: 'Chemistry', teacher: 'Mrs Johnson' },
      'Wed, Jun 14': { subject: 'French', teacher: 'Mrs Williams' },
      'Thu, Jun 15': { subject: 'Literature', teacher: 'Ms Martin' },
      'Fri, Jun 16': { subject: 'Biology', teacher: 'Mrs Jackson' },
    },
  },
}

const formatTimeSlot = (startTime: string, endTime: string) => {
  return `${startTime} - ${endTime}`
}

export {
  type Schedule,
  SCHEDULE_DATA,
  formatTimeSlot,
  DAYS,
  GROUPS
}