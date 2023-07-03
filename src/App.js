// import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import Error404 from "./pages/Error404"
import RecordList from "./components/RecordList";
import AddEmployeeFormPage from "./pages/AddEmployeeFormPage";
import ProfilePage from "./pages/ProfilePage";
import EditEmployeeFormPage from "./pages/EditEmployeeFormPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />} >
            <Route path="/ems" element={<HomePage/>} />
            <Route path="/ems/profile-page" element={<ProfilePage/>}/>
            <Route path="/ems/add-employee" element = {<AddEmployeeFormPage/>}/>
            <Route path="/ems/update-employee" element = {<EditEmployeeFormPage/>}/>
            <Route path="*" element={<Error404/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
