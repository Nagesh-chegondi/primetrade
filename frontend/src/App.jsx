import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element = {<LandingPage/>}/>
  <Route path="/dashboard" element ={<Dashboard/>}/>
</Routes>
</BrowserRouter>
  )
}

export default App;
