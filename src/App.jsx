import { onAuthStateChanged } from "firebase/auth"; 
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login"; 
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import CreatePost from "./components/pages/CreatePost";
import EditPost from "./components/pages/EditPost";
import Search from "./components/pages/Search";
import Post from "./components/pages/Post";
import NotFound from "./components/pages/NotFound";
import Header from "./components/ui/Header";
import Container from "./components/ui/Container";
import Footer from "./components/ui/Footer";


export default function App() {
  const [user, setUser] = useState(undefined); 
  const { auth } = useAuthentication();
  const loadingUser = user === undefined; 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user); 
    }); 
  }, [auth]);

  if(loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <AuthProvider value={{ user }}>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/profile" element={!user ? <Navigate to="/login" /> : <Profile />} />
            <Route path="/myposts" element={!user ? <Navigate to="/login" /> : <Dashboard />} />
            <Route path="/myposts/create" element={!user ? <Navigate to="/login" /> : <CreatePost />} />
            <Route path="/myposts/edit/:id" element={!user ? <Navigate to="/login" /> : <EditPost />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/myposts/:id" element={<Post />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  )
}


