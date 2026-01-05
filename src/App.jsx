import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ChatLayout from "./components/Layout/ChatLayout";
import Home from "./pages/Home";
import AssessMyKnowledge from "./pages/AssessMyKnowledge";
import Roadmap from "./pages/Roadmap";
import ExploreDomains from "./pages/ExploreDomains";
import NewsTrends from "./pages/NewsTrends";
import ChatInterface from "./pages/ChatInterface";
import AuthPage from "./pages/AuthPage";
import Onboarding from "./pages/Onboarding";
import NewHome from "./pages/NewHome";
import AIMLRoadmap from "./pages/Roadmaps/AIMLRoadmap";
import { InterestProvider } from "./context/InterestContext";

const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center py-20 text-slate-500">
    <h1 className="text-2xl font-bold mb-2 text-slate-300">{title}</h1>
    <p>This module is currently under development.</p>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, isOnboarded, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null; // Or a loading spinner

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

// Check if already authenticated to prevent access to login
const PublicRoute = ({ children }) => {
  const { user, isOnboarded } = useAuth();
  if (user) {
    if (isOnboarded) return <Navigate to="/" replace />;
    return <Navigate to="/onboarding" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <InterestProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <AuthPage />
                    </PublicRoute>
                  }
                />

                {/* Onboarding */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />

                {/* Protected App Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <ChatLayout />
                    </ProtectedRoute>
                  }>
                  <Route index element={<NewHome />} />
                  <Route path="assess" element={<AssessMyKnowledge />} />
                  <Route
                    path="roadmaps"
                    element={<Navigate to="/roadmaps/ai-ml" replace />}
                  />
                  <Route path="roadmaps/ai-ml" element={<AIMLRoadmap />} />
                  <Route path="explore" element={<ExploreDomains />} />
                  <Route path="news" element={<NewsTrends />} />
                  <Route path="chat" element={<ChatInterface />} />
                  <Route
                    path="history"
                    element={<Placeholder title="Learning History" />}
                  />
                  <Route
                    path="settings"
                    element={<Placeholder title="Settings" />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </InterestProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
