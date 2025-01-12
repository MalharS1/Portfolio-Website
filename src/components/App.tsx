import Header from './Header.tsx'
import Cards from './Cards.tsx'
import Contact from './Contact.tsx'
import MeshBackground from './Background.tsx';
import SideProjects from './Side_Projects.tsx'


function App() {
  return (
    <> { /* Fragment */}
      <MeshBackground />
      <Header />
      <Cards id_nav="projects" />
      <Contact id_nav="contact" />
      <SideProjects />
    </>
  )
}

export default App