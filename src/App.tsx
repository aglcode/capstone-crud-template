import React, { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import LandingPage from "./pages/LandingPage"


function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div>
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <LandingPage />
    </div>
  );
}

export default App
