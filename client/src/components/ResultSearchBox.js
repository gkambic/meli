
/**
 * Muestra los resultados obtenidos por la consulta al servidor
 */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/styles.scss';
import shipping from '../assets/ic_shipping.png';
import axios from 'axios';

export const ResultSearchBox = () => {
    
  const [itemsSearch, setitemsSearch] = useState([]);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => { 
    const { location } = history;
    const { search } = location;
    if(search === '?search='){
      history.push('/');
    }    
    
    searchService(search.substring( 8,search.length ));            
  }, [history.location.search]);


  const searchService = async ( param ) => {    
    const apiurl = process.env.REACT_APP_API_ENDPOINT;  
    const uri = `${apiurl}/items?q=${param}`;    
    const response = await axios.get(uri);
    const { data } = response;  

    setCategories(data.categories);
    setitemsSearch(data.items);      
  }

  const goToDetail = (item) => {
    history.push(`/items/${item.id}`); 
  
  }

  return (
    <>    
    <div style={{ marginTop:'16px',  display:'flex', marginLeft:'16px' }}>      
          {categories.map( (category) => {            
            if(category === categories[categories.length -1] ){
              return <p style={{marginLeft:'16px'}} > { `${category}`}</p>
            }else{
              return <p style={{marginLeft:'16px'}}> { `${category}   >`}</p>
            }            
          }) 
          }      
    </div>
      {       
        itemsSearch.map( (item) => {
            return  <div key={item.id} className="items_container_two" > 
              <div className="items_container" onClick={ () => goToDetail(item) } >                
                    <img 
                      src={item.picture}
                      className="items_img"
                      />

                  <div>
                    <div style={{ display:'flex' }}  >
                      <h3 > {item.price.currency} { item.price.amount } </h3> 
                      { item.free_shipping && <img src={shipping}  style={{height:'20px', marginLeft:'0.8rem', marginTop:'1.1rem' }} /> }                      
                    </div>
                    <p> {item.title } </p>                    
                  </div>

                  <div className="items_location" >
                    <p> Ubicacion </p>
                  </div>

              </div>
            </div>
        })       
      }      
    </>
  )
}
