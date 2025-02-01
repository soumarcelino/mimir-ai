export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold">🧠 MimirAI</h1>
          <p className="mt-4 text-2xl">
            The revolutionary notes and tasks app powered by AI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* About Section */}
        <section id="about" className="space-y-6">
          <h2 className="text-4xl font-bold text-center">
            🧐 What is MimirAI?
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            MimirAI combines mythic wisdom with the power of artificial
            intelligence to help you manage your notes and tasks in an
            innovative and intuitive way. Organize your ideas, prioritize
            activities, and receive personalized suggestions to maximize your
            productivity.
          </p>
        </section>

        {/* Features Section */}
        <section id="features" className="space-y-8">
          <h2 className="text-4xl font-bold text-center">
            🌟 Innovative Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <h3 className="text-2xl font-semibold mb-2">📝 Smart Notes</h3>
              <p>
                Record ideas and insights effortlessly. Our AI organizes and
                highlights what matters most.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <h3 className="text-2xl font-semibold mb-2">
                ✅ Task Management
              </h3>
              <p>
                Create and monitor your tasks easily. Set priorities and track
                your progress in real time.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <h3 className="text-2xl font-semibold mb-2">
                🤖 Personalized Suggestions
              </h3>
              <p>
                Our AI analyzes your habits and offers recommendations to
                optimize your time and boost productivity.
              </p>
            </div>
            {/* Card 4 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <h3 className="text-2xl font-semibold mb-2">
                💻 Modern Interface
              </h3>
              <p>
                Enjoy a sleek and intuitive user experience designed to work
                perfectly on any device.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} MimirAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
