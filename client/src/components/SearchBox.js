
/**
 * Se encarga de enviar la busqueda al componente ResultSearchBox que es el que llamara a la api
 * 
*/

import React, { useState } from 'react';
import "../styles/styles.scss";
import logo from '../assets/Logo_ML.png';
import lupa from '../assets/ic_Search.png';
import { useHistory } from 'react-router-dom';

export const SearchBox = () => {

  const history = useHistory();
  const [search, setsearch] = useState('');

  const searching = (e) => {
    e.preventDefault();
    history.push(`/items?search=${search}`);    
  }

  const handleInputChange = (e) => {        
    setsearch(e.target.value);
  }

  const homeBack = ()=> { setsearch(''); history.push('/'); }


  return (
    <>

    <div className="search_box">      
          <form onSubmit={searching} className="container_search" >

            <div onClick={ homeBack }>
              <img  src={logo} alt="logo" className="logo_search" />
            </div>

            <input type="text" 
                  value={search} 
                  onChange={ handleInputChange  }
                  name="search" 
                  className="input_search" 
                  placeholder="Nunca dejes de buscar" />     

            <button  className="button_search" >
              <img  src={lupa} alt="lupa" />
            </button>

          </form>      
    </div>
      
    </>
  )
}
