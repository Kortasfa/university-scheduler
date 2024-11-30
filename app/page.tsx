import HeaderAuth from "@/components/header-auth";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, GraduationCap, Clock, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">UniSchedule</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* <Link href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link> */}
                {/* <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </Link>
                <Link href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </Link> */}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
             <HeaderAuth />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Create Your Perfect University Schedule
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Effortlessly plan your semester with our intuitive schedule maker. Designed specifically for university students and faculty.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Button size="lg" className="rounded-md shadow">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Calendar className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy Course Planning</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Drag and drop courses into your weekly schedule with our intuitive interface.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Clock className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Time Conflict Detection</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Automatically detect and prevent scheduling conflicts between courses.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Users className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Collaborative Planning</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Share and compare schedules with classmates to coordinate study groups and activities.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <GraduationCap className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Degree Progress Tracking</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Monitor your progress towards your degree requirements as you plan your schedule.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-500">
              Terms of Service
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 UniSchedule. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

