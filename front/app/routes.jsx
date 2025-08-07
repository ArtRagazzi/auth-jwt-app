import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './src/Pages/Login';
import Register from './src/Pages/Register';
import Home from './src/Pages/Home';
import PrivateRoute from './src/components/PrivateRoute';


function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                <Route 
                    path='/register' 
                    element={
                        <PrivateRoute>
                            <Register/>
                        </PrivateRoute>}>
                </Route>

                <Route 
                    path='/' 
                    element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>}>
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;