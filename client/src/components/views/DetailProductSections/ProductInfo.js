import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBath, faBed, faCar, faEye,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    const fullDate = moment().format("DD-MM-YYYY")


    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    


    return (
        <div>
            <Descriptions title="Property">
                <Descriptions.Item label="Price"> R {Product.price}</Descriptions.Item>
                <Descriptions.Item label="To Rent / Buy"> {Product.rentOrBuy} </Descriptions.Item>
                <Descriptions.Item label="Available from"> {fullDate}</Descriptions.Item>
                
                <Descriptions.Item label="">
                <FontAwesomeIcon icon={faBed} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/>
                {' '}
                {Product.bedrooms}
                </Descriptions.Item>

                <Descriptions.Item label="">
                <FontAwesomeIcon icon={faBath} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/>
                {' '}
                {Product.bathrooms}
                </Descriptions.Item>

                <Descriptions.Item label="">
                <FontAwesomeIcon icon={faMapMarkerAlt} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/>
                {' '}
                {Product.location}
                </Descriptions.Item>
                <Descriptions.Item label="">
                <FontAwesomeIcon icon={faCar} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/>
                {' '}
                {Product.parking}
                </Descriptions.Item>
                
                <Descriptions.Item label=""> 
                <FontAwesomeIcon icon={faEye} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/>
                  {' '}
                {Product.views}
                </Descriptions.Item>

                <Descriptions.Item label=" Floor Size "> 
                {Product.floor} <span style={{fontSize:'1rem'}}>&#x33a1;</span>            
                </Descriptions.Item>
                
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    
                >
                 <a href='/contact'> Contact</a>  
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
