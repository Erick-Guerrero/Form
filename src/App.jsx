import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import ClientForm from './components/Form/Form';
import AuthGuard from './components/AuthGuard/AuthGuard';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>}/>

        <Route element={<AuthGuard />}>

          <Route exact path="/form" element={<ClientForm />}/>

        </Route>


      </Routes>
    </>
  );
}

export default App;
