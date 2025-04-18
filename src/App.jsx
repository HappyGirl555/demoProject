import logo from './logo.svg';
import './App.css';
import MainLayOut from "./layout/MainLayout"
import Product from "./pages/Product/Product"
import Payment from "./pages/Payment/Payment"
import About from "./pages/About/About"
import Home from "./pages/Home/Home"
import History from './pages/History/History';
import DescriptionHistory from "./pages/DescriptionHistory/DescriptionHistory"
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayOut/>}>
      <Route path='/' element={<Home/>} />
      <Route path='/product' element={<Product/>} /> 
      <Route path='/payment' element={<Payment/>} />
      <Route path='/about' element={<About/>} /> 
      <Route path='/history' element={<History/>}> 
        <Route path='descriptionHistory' element={<DescriptionHistory/>} />
      </Route>
    </Route>
  )
)


function App() {
  return <RouterProvider router={router}/>
}

export default App;
