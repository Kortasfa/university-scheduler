import { Calendar, Clock, DropletsIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">University Schedule Maker App</h1>
            <p className="text-xl mb-8">A web-based software solution for universities that allows users to create class timetables with ease.</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <DropletsIcon className="mr-2" />
                Intuitive user interface with drag-and-drop support
              </li>
              <li className="flex items-center">
                <Clock className="mr-2" />
                Auto-assignment feature saves time on creating timetables
              </li>
              <li className="flex items-center">
                <Calendar className="mr-2" />
                Ensures compliance with government regulations
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img src="/placeholder.svg?height=400&width=600" alt="School Schedule Maker App Interface" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
