// src/pages/Home.jsx
import '../App.css'
function Hero() {
  return <>
    <div className=" ">
      <div className="hero-content flex flex-row lg:flex-row-reverse justify-between">
        <img
          src="./src/assets/hero.webp"
          className="imgA"
        />
        <div>
          <h1 className=" ">Starting At $899!</h1>
          <p className="text-4xl w-1/2 py-6 font-bold">
            The best notebook collection 2026.
          </p>
          <p className="text-lg  py-6">
            Exclusive offer <span className="text-red-500">-10%</span>  off this week
          </p>
          <button className="btn">Get Started</button>
        </div>
      </div>
    </div>
  </>
}
export default Hero;
