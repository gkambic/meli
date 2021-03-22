import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ProductDetail } from '../components/ProductDetail';
import { ResultSearchBox } from '../components/ResultSearchBox';
import { SearchBox } from '../components/SearchBox';

export const AppRouter = () => {

  return (  
    
    <Router>    
      <SearchBox />     
        <Switch>            
            <Route exact path="/items/:id" component={ ProductDetail  } />  
            <Route path="/items" component={ ResultSearchBox  } />           
            <Redirect to="/" />
        </Switch>      
    </Router>        
  )
}
