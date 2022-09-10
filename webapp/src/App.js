import { useState } from "react";

import './App.css';

function App() {

  const [Hemoglobin, setHemoglobin] = useState(0.0);
  const [MCH, setMCH] = useState(0.0);
  const [MCHC, setMCHC] = useState(0.0);
  const [MCV, setMCV] = useState(0.0);
  const [Gender, setGender] = useState(true);
  const [predictionColor, setPredictionColor] = useState("#00ff00");

  const [prediction, setPrediction] = useState("");
  const [confidance, setConfidance] = useState(0.0);

  const onSubmit = (event) => {
    event.preventDefault();

    let dataObj = [Gender, Hemoglobin, MCH, MCHC, MCV];

    console.log(dataObj);

    fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      body: JSON.stringify({data: dataObj})
    })
    .then(res => res.json()
      .then(data => {
        console.log(data);
        setPrediction(data.prediction);
        setConfidance(data.confidance);
      }))
    .catch(err => console.log(err))

  }

  return (
    <div className="App">
      

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <span className="navbar-brand">Anemia Detector</span>
        </div>
      </nav>
      

      <div className="container mt-4">


      <div className="row">
        <div className="col-12 col-sm-12 col-md-9 col-lg-8 mb-4">
          
          <div className="card">
            <div className="card-body p-3">

              <h4 className="card-title border-bottom pb-2"> INPUT YOUR VALUES BELOW</h4>

              {/* Form */}
              <form onSubmit={onSubmit}>

                <div className="row">

                  <div className="col">
                    <div className="mb-3">
                      <label  className="form-label">Hemoglobin</label>
                      <input type="number" step="0.01" className="form-control" required
                      onChange={(e) => setHemoglobin(e.target.value)} />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label  className="form-label">Gender</label>
                      <select className="form-select" required
                       onChange={(e) => setGender(e.target.value === 1)}>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col">
                    <div className="mb-3">
                      <label  className="form-label">MCH</label>
                      <input type="number" step="0.01" className="form-control"  required
                      onChange={(e) => setMCH(e.target.value)}  />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label  className="form-label">MCHC</label>
                      <input type="number" step="0.01" className="form-control"   required
                      onChange={(e) => setMCHC(e.target.value)}  />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label  className="form-label">MCV</label>
                      <input type="number" step="0.01" className="form-control"   required
                      onChange={(e) => setMCV(e.target.value)}  />
                    </div>
                  </div>

                </div>

                <button type="submit" className="btn btn-primary" style={{width: "100%"}}>Submit</button>
              </form>

            </div>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-3 col-lg-4">
          <div className="card">
            <div className="card-body p-3">
              <h4 className="card-title border-bottom pb-2">RESULTS</h4>

              <div className="row">
                <div className="col">
                  <h5>Prediction </h5>
                </div>
                <div className="col">
                  <h6 style={{textAlign: "right", color: prediction === 0? "green" : "red"}}><strong>{prediction === 1 ? "Have Anemia": "Don't Have Anemia"}</strong></h6>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <h5>Confidance </h5>
                </div>
                <div className="col">
                  <h6 style={{textAlign: "right"}}>{confidance}%</h6>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className=" card-body p-3">
              <h5 className="card-title">Some information about Anemia</h5>

              <table className="table table-sm table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col">Hemoglobin</th>
                    <td>A hemoglobin test measures the amount of hemoglobin in your blood. Hemoglobin is a protein in your red blood cells that carries oxygen to your body's organs and tissues and transports carbon dioxide from your organs and tissues back to your lungs.
                        If a hemoglobin test reveals that your hemoglobin level is lower than normal, it means you have a low red blood cell count (anemia). Anemia can have many different causes, including vitamin deficiencies, bleeding and chronic diseases.
                        If a hemoglobin test shows a higher than normal level, there are several potential causes — the blood disorder polycythemia vera, living at a high altitude, smoking and dehydration.</td>
                  </tr>
                  <tr>
                    <th scope="col">MCH</th>
                    <td>You might hear your doctor talk about MCH levels when they explain the results of certain blood tests. MCH is short for "mean corpuscular hemoglobin." It's the average amount in each of your red blood cells of a protein called hemoglobin, which carries oxygen around your body.
                        It's possible you'll learn about MCH when you get a blood test called a CBC (complete blood count). This test measures different parts of your blood, including red blood cells and white blood cells. Doctors use information from the CBC to calculate your MCH.</td>
                  </tr>
                  <tr>
                    <th scope="col">MCHC</th>
                    <td>The mean corpuscular hemoglobin concentration (MCHC) is the average concentration of hemoglobin in your red blood cells. Hemoglobin is the protein molecule that allows red blood cells to carry oxygen to tissues within your body.
                        Your MCHC can fall into low, normal, and high ranges, even if your red blood cell count is normal.</td>
                  </tr>
                  <tr>
                    <th scope="col">MCV</th>
                    <td>Mean corpuscular volume, or MCV, is a measurement of red blood cell size. A doctor usually requests an MCV test as part of a complete blood count, which analyzes many blood components, including white blood cells and platelets.
                        If a doctor suspects that a person has anemia, they will use an MCV test to confirm the type of anemia. Different MCV levels indicate specific types of anemia.</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

      </div>

      <footer className="bg-dark text-light">
        <p>Designed and created with <span style={{color: "red", fontSize: "20px"}}>♥</span> by: <strong>Moaz Mohammed El-Essawey</strong></p>
      </footer>

    </div>
  );
}

export default App;
