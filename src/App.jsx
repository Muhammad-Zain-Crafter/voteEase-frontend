import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import LogIn from "./pages/auth/Login";
import VoterDashboard from "./pages/dashboard/VoterDashboard";
import Results from "./pages/voting/Results";
import Profile from "./pages/user/Profile";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EditCandidate from "./pages/candidate/EditCandidate";
import CreateCandidate from "./pages/candidate/CreateCandidate";
import ReadCandidates from "./pages/candidate/ReadCandidates";
import VotingStatus from "./pages/voting/VotingStatus";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
          <Footer />
        </div>
      ),
    },
    {
      path: "/register",
      element: (
        <div>
          <Navbar />
          <Register />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Navbar />
          <LogIn />
        </div>
      ),
    },
    {
      path: "/voter-dashboard",
      element: (
        <div>
          <Navbar />
          <VoterDashboard />
          <Footer />
        </div>
      ),
    },
    {
      path: "/admin-dashboard",
      element: (
        <div>
          <Navbar />
          <AdminDashboard />
          <Footer />
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          <Navbar />
          <Profile />
          <Footer />
        </div>
      ),
    },
    {
      path: "/results",
      element: (
        <div>
          <Navbar />
          <Results />
          <Footer />
        </div>
      ),
    },
    {
      path: "/voting-status",
      element: (
        <div>
          <Navbar />
          <VotingStatus />
          <Footer />
        </div>
      ),
    },
    {
      path: "/admin/candidates",
      element: (
        <div>
          <Navbar />
          <ReadCandidates />
          <Footer />
        </div>
      ),
    },
    {
      path: "/admin/candidates/create",
      element: (
        <div>
          <Navbar />
          <CreateCandidate />
          <Footer />
        </div>
      ),
    },
    {
      path: "/admin/candidates/edit/:candidateId",
      element: (
        <div>
          <Navbar />
          <EditCandidate />
          <Footer />
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
