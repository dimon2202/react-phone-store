import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
