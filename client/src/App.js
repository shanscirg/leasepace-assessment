import React from "react";
import "./stylesheets/App.css";
import Search from './components/Search';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Search />
      <Footer />
    </div>
  );
}


export default App;
