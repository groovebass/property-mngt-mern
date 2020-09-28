import { Button, Drawer, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FileUpload from '../utils/FileUpload';


const Location = [
    {key: 'Sea Point', value: 'Sea Point'}, 
    {key: 'Bakoven', value: 'Bakoven'},		
    {key: 'Bantry Bay', value:'Bantry Bay'},
    {key: 'Camps Bay', value: 'Camps Bay'	 },	
    {key: 'Clifton', value: 'Clifton'	},	
    {key: 'Fresnaye', value: 'Fresnaye'},	
    {key: 'Green Point', value: 'Green Point'},	
    {key: 'Hout Bay', value: 'Hout Bay' },	
    {key: 'Imizamo Yethu', value: 'Imizamo Yethu'},	
    {key: 'Llandudno', value: 'Llandudno'},	
    {key: 'Mouille Point', value: 'Mouille Point'},	
    {key: 'Three Anchor Bay', value: 'Three Anchor Bay'},		
]
const RentOrBuy = [
    { key: 'Rent', value: 'Rent'}, 
    { key: 'Buy', value: 'Buy'}, 
]

function ManageProducts(props) {
    const [visible, setVisible] = useState(false);

    // const initialProductState = {
    //     id: null,
    //     title: '',
    //     description:'',
    //     price: null,
    //     images: [],
    //     location: '',
    //     bedrooms: null,
    //     bathrooms: null,
    //     parking: null,
    //     rentOrBuy: '' ,
    //     floor: null,
    // }
    // const [currentProduct, setProduct] = useState(initialProductState); 

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [parking, setParking] = useState('');
    const [floor, setFloor] = useState('');
    const [rentOrBuy, setRentOrBuy] = useState('');
    const [images, setImages] = useState([]);

    const [Products, setProducts] = useState([])
    const [message, setMessage] = useState("");
    
    
    const showDrawer = (product) => {
        setVisible(true);
        setId(product._id);
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setBathrooms(product.bathrooms);
        setBedrooms(product.bedrooms);
        setFloor(product.floor);
        setParking(product.parking);
        setRentOrBuy(product.rentOrBuy);
        setImages(product.images);
        setLocation(product.location);
    };

    const onClose = () => { setVisible(false); };

    // const UpdateProduct = (id, data) => {
    //     return Axios.put(`/api/product/${id}`, data);
    //   }; 

    const upDateHandler = (e) =>{
        e.preventDefault();
        async function updateProduct() {
            
            try {
                await Axios.put(`/api/product/${id}`);
                setMessage("The product was updated successfully!");
                props.history.push('/manage')
            } catch (error) {
                console.log(error);
            }
        }
        updateProduct();
    }

   
    
    const deleteHandler = ( ) => {
        Axios.delete(`/api/product/${id}`)
        .then (response => {
            console.log(response.data);
            props.history.push('/manage')
            setMessage("The product was deleted successfully!");
        })
        .catch(e => {
            console.log(e);
          });
      }

  
    useEffect(() => {
     listProducts(Products)
     
     console.log(Products);
   }, [Products])


   const listProducts = () => {
       Axios.get('/api/product/listProducts')
           .then(response => {
               if (response.data.success) {
                     setProducts(response.data.products)
                   } else {
                       alert('Failed to fetch product datas')
                   }
           })
           }  
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
         <table>
                <thead>
                 <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th> 
                    <th>Location</th>
                    <th>Bedrooms</th>
                    <th>Bathrooms</th>
                    <th>To Rent / Buy</th>
                    <th>Floor Size</th>
                    <th>Parking</th>
                 </tr>
                </thead>
                <tbody>
                    { Products.map(product => (<tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.location}</td>
                        <td>{product.bedrooms}</td>
                        <td>{product.bathrooms}</td>
                        <td>{product.rentOrBuy}</td>
                        <td>{product.floor}<span style={{fontSize:'1rem'}}>&#x33a1;</span></td>
                        <td>{product.parking}</td>
                        <td>
                        <Link
                         onClick={() => showDrawer (product)}
                        >
                            Edit
                        </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <Drawer
                    title="Edit Property"
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width={800}
                >

            <Form  >

                {/* DropZone */}
                <FileUpload onChange={(e) => setImages(e.target.value)} name= "images" id= "images "value={images}/>
                <br /><br />

                <label htmlFor="title">Title</label>
                <Input onChange={(e) => setTitle(e.target.value)} name="title" id="title" value={title} />
                <br /><br />
                
                <label htmlFor="description">Description</label>
                <TextArea onChange={ (e)=> setDescription(e.target.value) } name="description" id="description" value={description} />
                <br /><br />
                
                <label htmlFor="price">Price(R)</label>
                <Input  onChange={ (e) => setPrice(e.target.value)}  value={price} name="price" id="price"  type="number" />
                <br /><br />

                <select onChange={(e)=> setLocation(e.target.value)} value={location} name="location" id="location">
                    {Location.map(item => (<option key={item.key} value={item.key}>{item.value} </option> ))}
                </select>
                <br /><br />

                <select onChange={(e) => setRentOrBuy(e.target.value)} value={rentOrBuy} name="rentOrBuy" id="rentOrBuy">
                    {RentOrBuy.map(item => ( <option key={item.key} value={item.key}>{item.value} </option> ))}
                </select>
                <br /><br />

                <label htmlFor="bedrooms">Bedrooms</label>
                <Input onChange={(e)=> setBedrooms(e.target.value)} value={bedrooms} type="number" name="bedrooms" id="bedrooms" />
                <br /><br />

                <label htmlFor="bathrooms">Bathrooms</label>
                <Input  onChange={(e)=> setBathrooms(e.target.value)} value={bathrooms} type="number" name="bathrooms" id="bathrooms" />
                <br /><br />

                <label htmlFor="parking">Parking/Garage</label>
                <Input onChange={ (e) => setParking(e.target.value)} value={parking} type="number" name="parking" id="parking" />
                <br /><br />

                <label htmlFor="floor">Floor (Square Metres)</label>
                <Input onChange={(e) => setFloor(e.target.value) } value={floor}  type="number" name="floor" id="floor" />
                <br /><br />

                <Button
                    onClick={upDateHandler}
                    size="large" shape="round" type="primary"
                >
                   Update
                </Button>
                <p>{message}</p>
                <br /><br />
                <Button
                    onClick={deleteHandler}
                    size="large" shape="round" type='danger'
                >
                    Delete 
                </Button>

            </Form>

      </Drawer>          
        </div>
    )
}

export default ManageProducts














