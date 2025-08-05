import React from "react";

interface MainContentProps {
  currentPage: "home" | "about" | "services" | "contact";
}

const MainContent: React.FC<MainContentProps> = ({ currentPage }) => {
  const getContent = () => {
    switch (currentPage) {
      case "home":
        return {
          title: "🏠 Welcome Home",
          content: (
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Welcome to our React + Vite Micro-Frontend Architecture demonstration!
              </p>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-slate-200 mb-4">Features:</h2>
                <ul className="space-y-3">
                  <li className="flex items-center text-lg text-green-400">
                    <span className="mr-2">✅</span> Module Federation with Vite
                  </li>
                  <li className="flex items-center text-lg text-green-400">
                    <span className="mr-2">✅</span> Dynamic micro-frontend loading
                  </li>
                  <li className="flex items-center text-lg text-green-400">
                    <span className="mr-2">✅</span> Error boundaries
                  </li>
                  <li className="flex items-center text-lg text-green-400">
                    <span className="mr-2">✅</span> Shared dependencies
                  </li>
                  <li className="flex items-center text-lg text-green-400">
                    <span className="mr-2">✅</span> Inter-MF communication
                  </li>
                  <li className="flex items-center text-lg text-blue-300">
                    <span className="mr-2">🎨</span> Tailwind CSS styling
                  </li>
                </ul>
              </div>
            </div>
          ),
        };

      case "about":
        return {
          title: "📖 About Us",
          content: (
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Learn more about our innovative micro-frontend architecture and the technologies that power it.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">🏗️ Architecture</h3>
                  <p className="text-gray-300">
                    Our micro-frontend architecture enables independent development, deployment, and scaling of
                    different parts of the application.
                  </p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-300 mb-3">⚡ Performance</h3>
                  <p className="text-gray-300">
                    Built with Vite for lightning-fast development and optimized production builds with Module
                    Federation capabilities.
                  </p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">🔧 Technology</h3>
                  <p className="text-gray-300">
                    Powered by React 18, TypeScript, Vite, and modern web standards for a robust development experience.
                  </p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3">🚀 Scalability</h3>
                  <p className="text-gray-300">
                    Each micro-frontend can be developed by different teams and deployed independently for maximum
                    scalability.
                  </p>
                </div>
              </div>
            </div>
          ),
        };

      case "services":
        return {
          title: "🛠️ Our Services",
          content: (
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Discover the powerful services and capabilities our micro-frontend platform provides.
              </p>
              <div className="space-y-6 mt-8">
                <div className="border-l-4 border-blue-400 pl-6 py-4 bg-gray-700 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">🔧 Development Services</h3>
                  <p className="text-gray-300">
                    Full-stack micro-frontend development with modern tooling, hot module replacement, and seamless
                    integration between applications.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-6 py-4 bg-gray-700 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-300 mb-2">🚀 Deployment Solutions</h3>
                  <p className="text-gray-300">
                    Independent deployment strategies, version management, and CI/CD pipeline integration for each
                    micro-frontend.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-6 py-4 bg-gray-700 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">🎯 Consulting & Support</h3>
                  <p className="text-gray-300">
                    Expert guidance on micro-frontend architecture, best practices, and optimization strategies for your
                    specific use case.
                  </p>
                </div>
                <div className="border-l-4 border-orange-400 pl-6 py-4 bg-gray-700 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-orange-300 mb-2">📚 Training & Workshops</h3>
                  <p className="text-gray-300">
                    Comprehensive training programs on Module Federation, Vite, React, and modern micro-frontend
                    patterns.
                  </p>
                </div>
              </div>
            </div>
          ),
        };

      case "contact":
        return {
          title: "📞 Get In Touch",
          content: (
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Ready to implement micro-frontends in your project? Let's discuss your requirements!
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">📧 Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <span className="mr-3">📧</span>
                        <span>contact@microfrontend.demo</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-3">📱</span>
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-3">🌍</span>
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-300 mb-4">💬 Social Media</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <span className="mr-3">🐙</span>
                        <span>GitHub: /micro-frontend-demo</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-3">🐦</span>
                        <span>Twitter: @microfrontend</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-3">💼</span>
                        <span>LinkedIn: /company/microfrontend</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">💡 Quick Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ),
        };

      default:
        return {
          title: "🏠 Welcome Home",
          content: <p className="text-lg text-gray-300">Welcome to our micro-frontend application!</p>,
        };
    }
  };

  const { title, content } = getContent();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-100 mb-4">{title}</h1>
      {content}
    </div>
  );
};

export default MainContent;
