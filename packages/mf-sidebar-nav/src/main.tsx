import React from "react";
import ReactDOM from "react-dom/client";
import SideBarNav from "./SideBarNav";
import "./index.css";

const StandaloneSideBarNavApp: React.FC = () => {
  return (
    <div className="h-screen relative bg-gray-50">
      <SideBarNav />
      {/* Main content area that doesn't get pushed by the sidebar */}
      <div className="h-full pl-16 transition-all duration-300">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">🧭 Sidebar Navigation</h1>
          <p className="text-gray-600 mb-4">
            This is the standalone sidebar navigation microfrontend. The sidebar expands on hover without pushing the
            main content.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h2 className="font-semibold text-blue-800 mb-2">🎯 Features:</h2>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Fixed positioning - overlays content without pushing</li>
              <li>Hover to expand/collapse sidebar</li>
              <li>Smooth animations with Tailwind CSS</li>
              <li>White background with shadow</li>
              <li>Responsive design</li>
              <li>Customizable navigation items</li>
              <li>Bottom-aligned secondary items</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
            <h2 className="font-semibold text-green-800 mb-2">💡 Usage:</h2>
            <p className="text-green-700">
              Hover over the sidebar to expand it. Notice how the main content stays in place and doesn't get pushed.
              The sidebar overlays the content with a shadow effect.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            When integrated in the host application, this sidebar can be used for navigation between different sections
            without affecting the layout of the main content area.
          </p>

          {/* Demo content to show it doesn't get pushed */}
          <div className="mt-8 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Sample Content 1</h3>
              <p className="text-gray-600">This content stays in place when the sidebar expands.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Sample Content 2</h3>
              <p className="text-gray-600">The sidebar overlay doesn't push this content around.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Sample Content 3</h3>
              <p className="text-gray-600">Perfect for maintaining layout stability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StandaloneSideBarNavApp />
  </React.StrictMode>
);
