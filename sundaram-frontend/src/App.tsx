import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext'
import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'
import Hero from './components/Hero'
import OurCollection from './components/OurCollection'
import Testimonials from './components/Testinomials'
import ExploreCategories from './components/ExploreCategories'
import Videocarousel from './components/Videocarousel'
import DiscoverStyles from './components/DiscoverStyles'
import WomensDaySection from './components/WomansDaySection'
import RingPage from './components/collection/Pages/RingPage'
import NecklacesPage from './components/collection/Pages/NecklacePage'
import EarringsPage from './components/collection/Pages/EarringPage'
import BraceletsPage from './components/collection/Pages/BraceletsPage'
import MangalsutraPage from './components/collection/Pages/MangalsutraPage'
import Productview from './components/collection/Pages/Productview'
import AllCollections from './components/collection/Pages/AllCollections'
import AboutPage from './components/collection/Pages/AboutUs'
import ContactPage from './components/collection/Pages/ContactUs'
import BookAppointment from './components/collection/Pages/BookAppointment'
import NotFoundPage from './components/collection/Pages/NotFound'
import ScrollToTop from './components/collection/ScrollTop'
import BanglesPage from './components/collection/Pages/BanglesPage'
import VictorianPage from './components/collection/Pages/VictorianPage'
import ArtdecoPage from './components/collection/Pages/ArtdecoPage'
import SolitairePage from './components/collection/Pages/SolitairePage'
import NaturePage from './components/collection/Pages/NaturePage'
import VintagePage from './components/collection/Pages/VintagePage'
import YellowGoldPage from './components/collection/Pages/YellowGold'
import WhiteGoldPage from './components/collection/Pages/WhiteGold'
import RoseGoldPage from './components/collection/Pages/RoseGold'
import PlatinumPage from './components/collection/Pages/Platinum'
import DiamondPage from './components/collection/Pages/DiamondPage'
import NosepinesPage from './components/collection/Pages/Nosepine' 
import PendantPage from './components/collection/Pages/PedantPage'
import EngravingPage from './components/collection/Pages/EngravingPage'
import CleaningPage from './components/collection/Pages/CleaningPage'
import RepairPage from './components/collection/Pages/RepairPage'
import ResizingPage from './components/collection/Pages/ResizingPage'
import ServicesPage from './components/collection/Pages/ServicesPage'
import RestorationPage from './components/collection/Pages/RestorationPage'
import AuthenticationPage from './components/collection/Pages/AuthenticationPage'
import CustomDesignPage from './components/collection/Pages/CustomDesignPage'
import AppraisalPage from './components/collection/Pages/AppraisalPage'
import WishlistPage from './components/collection/Pages/WishlistPage'
import { WishlistProvider } from './context/WishlistContext'


function HomePage() {
  return (
    <>
      <Hero />
      <OurCollection />
      <ExploreCategories />
      <Videocarousel />
      <DiscoverStyles />
      <WomensDaySection />
      <Testimonials />
    </>
  )
}


function App() {
  return (
    <WishlistProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<AllCollections />} />
            <Route path="/collections/rings" element={<RingPage />} />
            <Route path="/collections/necklaces" element={<NecklacesPage />} />
            <Route path="/collections/earrings" element={<EarringsPage />} />
            <Route path="/collections/bracelets" element={<BraceletsPage />} />
            <Route path="/collections/mangalsutra" element={<MangalsutraPage />} />
            <Route path="/collections/bangles" element={<BanglesPage />} />
            <Route path="/collections/nosepines" element={<NosepinesPage />} />
            <Route path="/collections/pendant" element={<PendantPage />} />
            <Route path="/collections/style/victorian" element={<VictorianPage />} />
            <Route path="/collections/style/artdeco" element={<ArtdecoPage />} />
            <Route path="/collections/style/solitaire" element={<SolitairePage />} />
            <Route path="/collections/style/nature" element={<NaturePage />} />
            <Route path="/collections/style/vintage" element={<VintagePage />} />
            <Route path="/collections/metal/yellowgold" element={<YellowGoldPage />} />
            <Route path="/collections/metal/whitegold" element={<WhiteGoldPage />} />
            <Route path="/collections/metal/rosegold" element={<RoseGoldPage />} />
            <Route path="/collections/metal/platinum" element={<PlatinumPage />} />
            <Route path="/collections/metal/diamond" element={<DiamondPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/engraving" element={<EngravingPage />} />
            <Route path="/services/cleaning" element={<CleaningPage />} />
            <Route path="/services/repair" element={<RepairPage />} />
            <Route path="/services/resizing" element={<ResizingPage />} />
            <Route path="/services/restoration" element={<RestorationPage />} />
            <Route path="/services/authentication" element={<AuthenticationPage />} />
            <Route path="/services/custom-design" element={<CustomDesignPage />} />
            <Route path="/services/appraisal" element={<AppraisalPage />} />
            <Route path="/products/:id" element={<Productview />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CurrencyProvider>
    </WishlistProvider>
  )
}

export default App
