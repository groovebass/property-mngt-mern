import React, { useCallback, useEffect, useState } from 'react'
import Axios from 'axios';
import {  Col, Card, Row } from 'antd';
import ParkingRadioBox from './Parts/ParkingRadioBox';
import PriceRadioBox from './Parts/PriceRadioBox';
import RentOrBuyCheckBox from './Parts/RentOrBuyCheckBox';
import { location,price,rentOrBuy,bedrooms,bathrooms,parking } from './Parts/Data';
import SearchFeature from './Parts/SearchFeature';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome} from '@fortawesome/free-solid-svg-icons';
import ImageSlider from '../utils/ImageSlider';
import LocationCheckBox from './Parts/LocationCheckBox';
import BathroomsRadioBox from './Parts/BathroomsRadioBox';
import BedroomsRadioBox from './Parts/BedroomsRadioBox';




const { Meta } = Card;

function PropertiesPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        location: [],
        price: [],
        rentOrBuy: [],
        bedrooms: [],
        bathrooms: [],
        floor: [],
    })

    const getProducts = useCallback( (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    },[Products]);

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)

    }, [Limit,Skip,getProducts])

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`R${product.price}`}
                />
                <div>
                    <p>For: {product.rentOrBuy}</p>
                    <p> Location: {product.location}</p>
                    
                </div>
                 
            </Card>
        </Col>
    })


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  All Our Properties  <FontAwesomeIcon icon={faHome} type="align-right" style={{fontSize:'3rem', color: '#1890ff'}}/> </h2>
            </div>


            {/* Filter  */} {/* Search  */}
            
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}  >
                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

                </Col>
                <Col lg={12} xs={24} >
                    <LocationCheckBox
                        list={location}
                        handleFilters={filters => handleFilters(filters, "location")}
                    />
                </Col>
                <Col lg={12} xs={24} >
                    <RentOrBuyCheckBox
                        list={rentOrBuy}
                        handleFilters={filters => handleFilters(filters, "rentOrBuy")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <PriceRadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <ParkingRadioBox
                        list={parking}
                        handleFilters={filters => handleFilters(filters, "parking")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <BedroomsRadioBox
                        list={bedrooms}
                        handleFilters={filters => handleFilters(filters, "bedrooms")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <BathroomsRadioBox
                        list={bathrooms}
                        handleFilters={filters => handleFilters(filters, "bathrooms")}
                    />
                </Col>
            </Row>
            

            
            

                
            


            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
    )
}

export default PropertiesPage

