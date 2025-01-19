import Header from './Header.tsx';
import Cards from './Cards.tsx';
import Contact from './Contact.tsx';
import MeshBackground from './Background.tsx';
import SideProjects from './Side_Projects.tsx';
import { HashRouter as Router, Route, Routes } from "react-router-dom";  // HashRouter better for only client side and no server

function App() {
  return (
    <Router>
      <Routes>

        {/* Default route (Home Page) */}
        <Route
          path="/"
          element={
            <>
              <MeshBackground />
              <Header />
              <Cards id_nav="projects" />
              <Contact id_nav="contact" />
            </>
          }
        />

        {/* Side Projects Page */}
        <Route path="/side-projects" element={<SideProjects />} />
      </Routes>
    </Router>
  )
}

export default App