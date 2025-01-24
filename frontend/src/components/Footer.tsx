import { Github, Link, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-rose-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Left: About Us */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              FoodieDelight brings your favorite restaurants right to your doorstep. Enjoy the best food delivery experience.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="md:w-1/2 md:flex md:justify-end">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/shibbu04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://shivam04.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400"
                  aria-label="Portfolio"
                >
                  <Link className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/shivamsingh57680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} FoodieDlite. All rights reserved. <br />
            Developed by Shivam ❣️
          </p>
        </div>
      </div>
    </footer>
  );
}
