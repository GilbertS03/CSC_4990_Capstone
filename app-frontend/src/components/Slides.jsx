import chud from '../assets/ex1.jpg'
import pic1 from '../assets/ex2.jpg'
import pic2 from '../assets/ex3.jpg'
import '../App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Slides() {
  return (
    <div className="container-fluid d-flex justify-content-center w-50">
      <div
        id="carouselExampleIndicators"
        className="carousel slide text-center"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={chud} className="d-block w-100" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src={pic1} className="d-block w-100" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src={pic2} className="d-block w-100" alt="Third slide" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}

export default Slides;