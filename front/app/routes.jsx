import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './src/Pages/Login';
import Register from './src/Pages/Register';


function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;