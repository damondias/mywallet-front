import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/useContext";
import { HomePage, SignInPage, SignUpPage, TransactionPage } from "./pages";


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
              <Route path="/cadastro" element={<SignUpPage/>} /> 
              <Route path="/" element={<SignInPage />} />
              <Route path="/nova-transacao/:tipo" element = { <TransactionPage/> }/>
              <Route path="/home" element ={ <HomePage/>} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>  
  )
}

export default App
