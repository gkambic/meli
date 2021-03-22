import { Router, response, request } from 'express';
import axios from 'axios';
import { formatResponseSearching, formatResponseProduct } from '../helpers/utils.js';

const apiLink = 'https://api.mercadolibre.com';
const apiSites = '/sites/MLA/';
const ProductLimit = 4;

const router = Router();

router.get('/items', async ( req= request , resp = response ) => {

  try {
    
    const { q } = req.query;
    const uri = `${apiLink}${apiSites}search?limit=${ProductLimit}&q=${q}`;  
    const result = await axios.get(uri);
    const { data } = result;
    
    const response = formatResponseSearching(data);
    resp.status(200).json(response);
    
  } catch (error) {

    console.log(error);
    resp.status(500).json({
      ok: false,      
    });    
  }
});


router.get( '/items/:id' , async (req = request, resp = response) => {

  const { id } = req.params;

  try {
    const item = await axios.get( `${apiLink}/items/${id}`);
    const description = await axios.get( `${apiLink}/items/${id}/description`)
    const response = formatResponseProduct(item.data, description.data);
    resp.status(200).json(response);
    
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,      
    });    
  }

});

export default router;