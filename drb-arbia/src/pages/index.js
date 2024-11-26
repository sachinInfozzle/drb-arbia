// src/pages/index.js (Home page)
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../style/header.css";
import "../style/demo.css";

import { fetchSinglePageDetails } from '../../lib/api'

export default function HomePage( {page} ) {
  const bannerImage = 'http://localhost:1337' + page.Sections[0].Image.url;
  const title = page.Sections?.[0]?.Title;
  const desc = page.Sections?.[0]?.Description;
  const btn = page.Sections?.[0]?.book_Now;
  

  const dualSideImageSection = page.Sections?.find(
    (section) => section.__component === "page.dual-side-image"
  );
  const dualSideImageTitle = dualSideImageSection?.Title;
  const dualSideImageContent = dualSideImageSection?.Content;
  
  const reviews = page.Sections?.find(
    (section) => section.__component === "page.reviews"
  );
  const reviewsTitle = reviews?.Title;
  const reviewsContent = reviews?.Content;
  
  const tripleImage = page.Sections?.find(
    (section) => section.__component === "page.triple-image"
  );
  const tripleTitle = tripleImage?.Title; // Updated to use `tripleImage`
  const tripleContent = tripleImage?.Content; // Updated to use `tripleImage`
  

  console.log('API Response:',title);

  return (
    <div>
      <Header />
      <main>
        <div class="banner-slider">
          <div class="slider-main">
            <img src={bannerImage} alt="loading" />
          </div>
          <div class="slider-content"> 
            <h1>{title}</h1>
          <h3> {desc}</h3>
          
          <a data-v-27903cf0="" href="https://drbarabia.book-onlinenow.net/index.aspx" class="custom-btn-opening btn btn-primary mt-auto" target="_blank">{btn}</a>
         </div>
        </div>
        
        <section class="path-section">
        <div class="container">
          {/* <CampSearch></CampSearch> */}
        <div className="row">
        <div className="col-md-8 offset-md-2 justify-content-center">
          {/* Path Shapes */}
          <div className="path-shapes" data-aos="fade-up">
            <img
              src="http://localhost:1337/uploads/shape_01_60d77e997c.png"
              className="shape-left"
              alt="Shape"
            />
            <img
              src="http://localhost:1337/uploads/shape_01_60d77e997c.png"
              className="shape-right"
              alt="Shape"
            />
          </div>

          {/* Section Header */}
          <div className="section-header" data-aos="fade-up">
            <h2 className="text-white custom-rtl">
            {dualSideImageTitle}
            </h2>
          </div>

          {/* Path Content */}
          <div className="path-content" data-aos="fade-up">
            <p className="majlis-p custom-rtl">
              {dualSideImageContent}
            </p>
          </div>
        </div>
      </div>
      </div>
      </section>

      {/* Path Images */}
      <div className="path-imgs">
        <div className="path-left" data-aos="fade-right">
          <img
            src="http://localhost:1337/uploads/path_left_26d5165379.png"
            className="img-fluid"
            alt="Path"
          />
        </div>
        <div className="path-right" data-aos="fade-left">
          <img
            src="http://localhost:1337/uploads/path_right_48ae8350da.png"
            className="img-fluid"
            alt="Path"
          />
        </div>
      </div>
      {/* <!-- Camp Section --> */}
      <section class="camp-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header mb-0 aos" data-aos="fade-up">
                <h2>{reviewsTitle}</h2>
                <h6 class="custom-hfont">
                  {reviewsContent}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Leaf Section */}
      <section class="leaf-section">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1 aos" data-aos="fade-up">
              <div class="section-header">
                <img
                  src="http://localhost:1337/uploads/full_colour_logo_e3691aee28.png"
                  class="img-fluid leaf-img-en"
                  alt="Leaf"
                />
                {/* <img
                  src="http://localhost:1337/uploads/the_leaf_ar_a276c4f5ce.png"
                  class="img-fluid leaf-img-ar"
                  alt="Leaf"
                /> */}
                {/* <!--	<h2>{}</h2>--> */}
                <p>{tripleContent}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 aos" data-aos="fade-up">
              <div class="leaf-img">
                <img
                  src="http://localhost:1337/uploads/leaf_01_2df45f8c56.png"
                  class="img-fluid"
                  alt="Leaf"
                />
              </div>
            </div>
            <div class="col-md-4 aos" data-aos="fade-up">
              <div class="leaf-img">
                <img
                  src="http://localhost:1337/uploads/leaf_06_229733d200.png"
                  class="img-fluid"
                  alt="Leaf"
                />
              </div>
            </div>
            <div class="col-md-4 aos" data-aos="fade-up">
              <div class="leaf-img">
                <img
                  src="http://localhost:1337/uploads/leaf_07_bcb40a71e1.png"
                  class="img-fluid"
                  alt="Leaf"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  const id = 'vlhhufkbyt1666z2aeel5b2l';
  const page = await fetchSinglePageDetails(locale, id);
  return { props: { page } };
}