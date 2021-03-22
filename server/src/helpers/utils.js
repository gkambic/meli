
/***
 * @function formatResponseSearching
 * Ingresa la respuesta de la api y devuelve el formato solicitado
 */
export const formatResponseSearching = ( data ) => {

    let response ={};
    response.author = author();
    response.categories = categories(data.filters);
    response.items = items( data.results );
    return response;  
  }
  
  
  /***
   * @function formatResponseProduct
   * Dado el item y descipcion devuelve el formato solicitado
   */
  export const formatResponseProduct = ( item , description ) => {
    let response ={};
    response.author = author();
    response.item = createItem(item, description);
    return response;
  }
  
  
  /***
   * @function author 
   * Firma del json
   */
  const author = () => ({ name: 'Gaston', lastname: 'Kambic'});
  
  
  /***
   * @function items
   * Devuelve la seccion de items
   */
  const items = ( results ) => {
  
    const products = [];
  
    results.forEach(element => {
      products.push({
          id: element.id,
          title: element.title,
          price:{
            currency: element.currency_id,
            amount: element.price,
          },
          picture: element.thumbnail,
          condition: element.condition,
          free_shipping: element.shipping.free_shipping
      });
    });
  
    return products;
  }
  
  
  /***
   * @function categories
   * Devuelve la seccion Categorias
   */
  const categories = ( categories ) => {
  
    const breadcum = [];
    categories.forEach(element => {
      if(element.id === 'category'){
        const { values } = element;            
         values[0].path_from_root.forEach( c => {
           breadcum.push( c.name );
         });
      }    
    });
  
    return breadcum;
    
  }
  
  
  /***
   * @function createItem
   * Crea la estructura para la busqueda del detalle del producto
   */
  const createItem = ( item, description ) => {
  
    let newItem = {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price      
      },
      picture: item.pictures[0].secure_url,      
      sold_quantity : item.sold_quantity,
      description : description.plain_text,
    }
  
    newItem.condition = item.condition === 'new' ? 'Nuevo' : 'Usado';  
  
    return newItem;
  }