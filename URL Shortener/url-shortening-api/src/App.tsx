import React from 'react';

function App() {
  return (
    <>
      <header>
        <nav className="nav">
          <div className="container nav__container">
            <div className="nav__brand">
              <img src="images/logo.svg" alt="shortly logo" className="nav__logo" />
              <ul className="nav__list">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Resources</a></li>
              </ul>
            </div>
            <div className="nav__buttons">
              <a href="#" className="btn btn--outline">Login</a>
              <a href="#" className="btn btn--primary">Sign Up</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="container hero__container">
            <div className="hero__content">
              <h1>More than just shorter links</h1>
              <p>Build your brand's recognition and get detailed insights on how your links are performing.</p>
              <a href="#" className="btn btn--primary">Get Started</a>
            </div>
            <img src="./images/illustration-working.svg" alt="Working illustration" className="hero__img" />
          </div>
        </section>
        
      </main>
    </>
  );
}

export default App;