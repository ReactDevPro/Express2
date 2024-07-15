import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import User from '../../Pages/User/User';
import Stocks from '../../Pages/Stocks/Stocks';
import Rapports from '../../Pages/Rapports/Rapports';
import Produit from '../../Pages/Categories/Produit';
import Categories from '../../Pages/Categories/Categories';
import Commandes from '../../Pages/Commandes/Commandes';
import Fournisseurs from '../../Pages/Fournisseurs/Fournisseurs';
import Ajouter from '../../Pages/Fournisseurs/Ajouter';                         // Ajouter Fournisseurs
import AjoutClient from '../../Pages/Clients/AjoutClient';
import Clients from '../../Pages/Clients/Clients';
import Finance from '../../Pages/Finance/Finance';
import ComdClient from '../../Pages/Commandes/Clientcomd/ComdClient';
import Reception from '../../Pages/Commandes/Fournisseurcomd/Reception';
import Notification from '../../Pages/Notification/Notification';
import Login from '../../Pages/Connexion/Login';
import SignUp from '../../Pages/inscription/SignUp';
import ResetPassword from '../../Pages/Reinitialiser/ResetPassword';
import Dashboard from '../../Pages/Dashboard/Dashboard';

function AppRouter(){
    return(
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/User' element={<User/>} />
                <Route path='/Stocks' element = {<Stocks/>}/>
                <Route path='/Rapports' element = {<Rapports/>}/>
                <Route path='/Produit' element = {<Produit/>}/>
                <Route path='/Categories' element = {<Categories/>}/>
                <Route path='/Commandes' element={<Commandes/>}/>
                <Route path='/Fournisseurs' element = {<Fournisseurs/>}/>
                <Route path='/Clients' element = {<Clients/>}/>
                <Route path='/Ajouter' element = {<Ajouter/>}/>
                <Route path='/AjoutClient' element = {<AjoutClient/>}/>
                <Route path='/Finance' element = {<Finance/>}/>
                <Route path='/ComdClient' element = {<ComdClient/>}/>
                <Route path='/Reception' element = {<Reception/>}/>
                <Route path='/Notification' element = {<Notification/>}/>
                <Route path='/Login' element = {<Login/>}/>
                <Route path='/SignUp' element = {<SignUp/>}/>
                <Route path='/ResetPassword' element = {<ResetPassword/>}/>
                <Route path='/Dashboard' element = {<Dashboard/>}/>
                
            </Routes>
    )
}


export default AppRouter;