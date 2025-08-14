import { Link, createFileRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {/* Theme toggle button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={isDark ? "/logo 4 .png" : "/logo 3 .png"}
              alt="Mementoria Logo"
              className="h-60 w-60 object-contain"
            />
          </div>
          <h1 className="text-6xl font-bold text-foreground">Mementoria</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Login / Register
          </Link>

          <Link
            to="/app"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 px-8"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
