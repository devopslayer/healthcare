import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NoPage from "./pages/NoPage/NoPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AppLayout from "./Layout/AppLayout";
import "./App.css";

function App() {
  return (
    <Router basename="/healthcare">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history" element={<NoPage />} />
          <Route path="calendar" element={<NoPage />} />
          <Route path="appointments" element={<NoPage />} />
          <Route path="statistics" element={<NoPage />} />
          <Route path="chat" element={<NoPage />} />
          <Route path="support" element={<NoPage />} />
          <Route path="settings" element={<NoPage />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
