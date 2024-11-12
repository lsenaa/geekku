import './App.css';
import { Route, Routes } from 'react-router';
import { Suspense } from 'react';
import Header from 'components/layout/header/Header';
import Footer from 'components/layout/footer/Footer';
import Router from 'routes/Router';

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;