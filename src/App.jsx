import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/useContext";
import { SignInPage, SignUpPage } from "./pages";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
              <Route path="/cadastro" element={<SignUpPage/>} /> 
              <Route path="/" element={<SignInPage />} />
              <Route path="/home" element ={ <h1> tela de home</h1>} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>  
  )
}

export default App
