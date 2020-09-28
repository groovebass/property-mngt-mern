import React, { useState } from 'react'
import { Typography, Button, Form,  Input } from 'antd';
import Axios from 'axios';
import FileUpload from '../utils/FileUpload';


const { Title } = Typography;
const { TextArea } = Input;

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
function AddProductPage(props) {
    
    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [LocationValue, setLocationValue] = useState(1);
    const [RentOrBuyValue, setRentOrBuyValue] = useState('Rent');
    const [BedroomsValue, setBedroomsValue] = useState(0);
    const [BathroomsValue, setBathroomsValue] = useState(0);
    const [ParkingValue, setParkingValue] = useState(0);
    const [FloorValue, setFloorValue] = useState(0);
    const [Images, setImages] = useState([]);


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onLocationSelectChange = (event) => {
        setLocationValue(event.currentTarget.value)
    }
    const onRentOrBuyChange = (event) => {
        setRentOrBuyValue(event.currentTarget.value)
    }
    const onBedroomsChange = (event) => {
        setBedroomsValue(event.currentTarget.value)
    }
    const onBathroomsChange = (event) =>{
        setBathroomsValue(event.currentTarget.value)
    }
    const onParkingChange = (event) => {
        setParkingValue(event.currentTarget.value)
    }
    const onFloorChange = (event) => {
        setFloorValue(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        // if (!TitleValue || !DescriptionValue || !PriceValue ||
        //     !LocationValue || !BedroomsValue || !RentOrBuyValue 
        //     || !BathroomsValue || !Images || !FloorValue || !ParkingValue
            
        //     ) {
        //     return alert('Select something or fill-in the fields first! Even if not changing the particular field')
        // }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            location: LocationValue,
            bedrooms: BedroomsValue,
            bathrooms: BathroomsValue,
            parking: ParkingValue,
            floor: FloorValue,
            rentOrBuy: RentOrBuyValue
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/properties')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Add Property</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price(R)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onLocationSelectChange} value={LocationValue}>
                    {Location.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br /><br />
                <select onChange={onRentOrBuyChange} value={RentOrBuyValue}>
                    {RentOrBuy.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br /><br />
                <label>Bedrooms</label>
                <Input
                    onChange={onBedroomsChange}
                    value={BedroomsValue}
                    type="number"
                />
                <br /><br />
                <label>Bathrooms</label>
                <Input
                    onChange={onBathroomsChange}
                    value={BathroomsValue}
                    type="number"
                />
                <br /><br />
                <label>Parking/Garage</label>
                <Input
                    onChange={onParkingChange}
                    value={ParkingValue}
                    type="number"
                />
                <br /><br />
                <label>Floor (Square Metres)</label>
                <Input
                    onChange={onFloorChange}
                    value={FloorValue}
                    type="number"
                />
                <br /><br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default AddProductPage
