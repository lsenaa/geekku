import './App.css';
import Header from 'components/layout/header/Header';
import Footer from 'components/layout/footer/Footer';
import Router from 'routes/Router';

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
