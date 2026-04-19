import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import cube2x2 from "../assets/2x2.png";
import cube3x3 from "../assets/3x3.png";
import cube4x4 from "../assets/4x4.png";
import cube5x5 from "../assets/5x5.png";
import pyraminx from "../assets/pyraminx.png";
import megaminx from "../assets/megaminx.png";
import skewb from "../assets/skewb.png";
import square1 from "../assets/square1.png";
import rubik2 from "../assets/rubik2.jpg";
import rubik1 from "../assets/rubik1.png";
import algo from "../assets/algo.png";

function AboutPage() {
  return (
    <div>
       <section className="bg-gray">
        <h2>What is Rubik’s Cube?</h2>
        <div className="flex-container">
          <div className="flex-item">
            <p>
              The Rubik’s Cube is a colorful 3D puzzle invented in 1974 by Hungarian architect Ernő Rubik. It has six sides, each made up of nine small squares with different colors. The objective is to twist and turn the cube until every side shows only one color.
              <br /><br />
              At first glance, the cube looks easy, but there are over 43 quintillion possible combinations. Solving it requires patience, strategy, and practice.
              <br /><br />
              Solving the cube improves logical thinking, memory, and problem-solving skills. Today it is popular worldwide, and many people compete in speedcubing competitions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray">
        <h2>Different Types of Rubik’s Cubes Used in Tournaments</h2>

        <div className="flex-container">
          <div className="flex-item">
            <img src={cube2x2} alt="2x2 Cube" />
            <h3>2x2 Cube (Pocket Cube)</h3>
            <p>The 2x2 cube only has corner pieces, making it smaller but still challenging.</p>
          </div>

          <div className="flex-item">
            <img src={cube3x3} alt="3x3 Cube" />
            <h3>3x3 Cube</h3>
            <p>The classic and most recognized Rubik’s Cube used in competitions.</p>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-item">
            <img src={cube4x4} alt="4x4 Cube" />
            <h3>4x4 Cube</h3>
            <p>More complex because it has no fixed center pieces.</p>
          </div>

          <div className="flex-item">
            <img src={cube5x5} alt="5x5 Cube" />
            <h3>5x5 Cube</h3>
            <p>A larger cube requiring more patience and piece organization.</p>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-item">
            <img src={pyraminx} alt="Pyraminx" />
            <h3>Pyraminx</h3>
            <p>A pyramid-shaped puzzle known for fast solving times.</p>
          </div>

          <div className="flex-item">
            <img src={megaminx} alt="Megaminx" />
            <h3>Megaminx</h3>
            <p>A twelve-sided puzzle requiring strong concentration.</p>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-item">
            <img src={skewb} alt="Skewb" />
            <h3>Skewb</h3>
            <p>Rotates around its corners creating unique movements.</p>
          </div>

          <div className="flex-item">
            <img src={square1} alt="Square-1" />
            <h3>Square-1</h3>
            <p>A puzzle that can change shape while being scrambled.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray">
        <h2>My Progress</h2>
        <ol>
          <li>Learned beginner solving methods</li>
          <li>Practiced to improve speed</li>
          <li>Studied advanced techniques</li>
        </ol>

        <div className="flex-container">
          <div className="flex-item"><img src={rubik2} alt="Rubik2" /></div>
          <div className="flex-item"><img src={rubik1} alt="Rubik1" /></div>
        </div>

        <div>
          <h2>Rubik's Cube Algorithms</h2>
          <img src={algo} className="wide-img" alt="Algorithms" />
        </div>
      </section>

      <section className="bg-gray">
        <blockquote>
          "The Rubik’s Cube teaches patience, logic, and perseverance."
        </blockquote>
      </section>

      <div className="flex-container">
        <div className="flex-item">
          <h1><Link to="/quiz">Quiz Game →</Link></h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
