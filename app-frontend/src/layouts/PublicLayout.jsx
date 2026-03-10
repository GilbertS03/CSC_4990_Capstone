import Navbar from "../components/default-components/Navbar";
import Footer from "../components/default-components/Footer";

function PublicLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
}

export default PublicLayout;
