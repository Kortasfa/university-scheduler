const TIMES = [
  "08:00 - 08:45",
  "09:00 - 09:45",
  "10:00 - 10:45",
  "11:00 - 11:45",
  "12:00 - 12:45",
  "13:00 - 13:45"
]

const DAYS = ['Mon, Jun 12', 'Tue, Jun 13', 'Wed, Jun 14', 'Thu, Jun 15', 'Fri, Jun 16']
const GROUPS = ['7A', '5B', '8A']

interface Class {
  subject: string
  teacher: string
  color: string
}

type Schedule = Record<string, Record<string, Record<string, Class>>>

const SCHEDULE_DATA: Schedule = {
  '7A': {
    '08:00 - 08:45': {
      'Tue, Jun 13': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
      'Wed, Jun 14': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
      'Fri, Jun 16': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
    },
    '09:00 - 09:45': {
      'Mon, Jun 12': { subject: 'Math', teacher: 'Mrs Johnson', color: 'bg-green-100' },
      'Tue, Jun 13': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
      'Thu, Jun 15': { subject: 'Science', teacher: 'Ms Rodriguez', color: 'bg-red-100' },
      'Fri, Jun 16': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
    },
    '10:00 - 10:45': {
      'Mon, Jun 12': { subject: 'English', teacher: 'Mrs Davis', color: 'bg-purple-100' },
      'Tue, Jun 13': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
      'Wed, Jun 14': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
      'Thu, Jun 15': { subject: 'Chemistry', teacher: 'Mrs Johnson', color: 'bg-pink-100' },
      'Fri, Jun 16': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
    },
    '11:00 - 11:45': {
      'Mon, Jun 12': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
      'Tue, Jun 13': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
      'Wed, Jun 14': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
      'Thu, Jun 15': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
      'Fri, Jun 16': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
    },
    '12:00 - 12:45': {
      'Tue, Jun 13': { subject: 'Chemistry', teacher: 'Mrs Johnson', color: 'bg-pink-100' },
      'Wed, Jun 14': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
      'Fri, Jun 16': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
    },
    '13:00 - 13:45': {
      'Mon, Jun 12': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
      'Tue, Jun 13': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
      'Wed, Jun 14': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
      'Thu, Jun 15': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
    },
  },
  '5B': {
    '08:00 - 08:45': {
      'Mon, Jun 12': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
      'Tue, Jun 13': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Wed, Jun 14': { subject: 'Science', teacher: 'Ms Rodriguez', color: 'bg-red-100' },
      'Thu, Jun 15': { subject: 'Spanish', teacher: 'Ms Taylor', color: 'bg-red-100' },
      'Fri, Jun 16': { subject: 'Science', teacher: 'Ms Rodriguez', color: 'bg-red-100' },
    },
    '09:00 - 09:45': {
      'Mon, Jun 12': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Wed, Jun 14': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Thu, Jun 15': { subject: 'Chemistry', teacher: 'Mrs Johnson', color: 'bg-pink-100' },
    },
    '10:00 - 10:45': {
      'Mon, Jun 12': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
      'Tue, Jun 13': { subject: 'Math', teacher: 'Mrs Johnson', color: 'bg-green-100' },
      'Wed, Jun 14': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Thu, Jun 15': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
      'Fri, Jun 16': { subject: 'Math', teacher: 'Mrs Johnson', color: 'bg-green-100' },
    },
    '11:00 - 11:45': {
      'Mon, Jun 12': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Tue, Jun 13': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Wed, Jun 14': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
      'Thu, Jun 15': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Fri, Jun 16': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
    },
    '12:00 - 12:45': {
      'Mon, Jun 12': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
      'Tue, Jun 13': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
      'Wed, Jun 14': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Thu, Jun 15': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Fri, Jun 16': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
    },
    '13:00 - 13:45': {
      'Mon, Jun 12': { subject: 'Chemistry', teacher: 'Mrs Johnson', color: 'bg-pink-100' },
      'Tue, Jun 13': { subject: 'English', teacher: 'Mrs Davis', color: 'bg-purple-100' },
      'Wed, Jun 14': { subject: 'Math', teacher: 'Mrs Johnson', color: 'bg-green-100' },
      'Fri, Jun 16': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
    },
  },
  '8A': {
    '08:00 - 08:45': {
      'Mon, Jun 12': { subject: 'Science', teacher: 'Ms Rodriguez', color: 'bg-red-100' },
      'Tue, Jun 13': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
      'Wed, Jun 14': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Thu, Jun 15': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
      'Fri, Jun 16': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
    },
    '09:00 - 09:45': {
      'Tue, Jun 13': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Thu, Jun 15': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Fri, Jun 16': { subject: 'English', teacher: 'Mrs Davis', color: 'bg-purple-100' },
    },
    '10:00 - 10:45': {
      'Tue, Jun 13': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
      'Wed, Jun 14': { subject: 'English', teacher: 'Mrs Davis', color: 'bg-purple-100' },
      'Thu, Jun 15': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
    },
    '11:00 - 11:45': {
      'Mon, Jun 12': { subject: 'Math', teacher: 'Mrs Johnson', color: 'bg-green-100' },
      'Tue, Jun 13': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Wed, Jun 14': { subject: 'Math', teacher: 'Mrs Johnson', color: 'bg-green-100' },
      'Thu, Jun 15': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
      'Fri, Jun 16': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
    },
    '12:00 - 12:45': {
      'Mon, Jun 12': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
      'Tue, Jun 13': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
      'Wed, Jun 14': { subject: 'Chemistry', teacher: 'Mrs Johnson', color: 'bg-pink-100' },
      'Thu, Jun 15': { subject: 'History', teacher: 'Ms Wilson', color: 'bg-yellow-100' },
      'Fri, Jun 16': { subject: 'Art', teacher: 'Ms Brown', color: 'bg-emerald-100' },
    },
    '13:00 - 13:45': {
      'Mon, Jun 12': { subject: 'Music', teacher: 'Mrs Miller', color: 'bg-rose-100' },
      'Tue, Jun 13': { subject: 'Chemistry', teacher: 'Mrs Johnson', color: 'bg-pink-100' },
      'Wed, Jun 14': { subject: 'French', teacher: 'Mrs Williams', color: 'bg-blue-100' },
      'Thu, Jun 15': { subject: 'Literature', teacher: 'Ms Martin', color: 'bg-yellow-100' },
      'Fri, Jun 16': { subject: 'Biology', teacher: 'Mrs Jackson', color: 'bg-indigo-100' },
    },
  },
}

export {
  SCHEDULE_DATA,
  TIMES,
  DAYS,
  GROUPS
}