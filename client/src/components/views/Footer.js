import { Col,  Row} from 'antd'
import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='footer-container group'>
           <Row> 

            <Col className= 'col span_1_of_3 ' > 
            <ul >
                <li><h3> PROPERTIES</h3> </li>
                <li><a href='/rent'>To Rent </a>  </li>
                <li><a href='/buy'>To Buy</a>  </li>
            </ul>
            </Col>
            
            <Col className= 'col span_1_of_3' > 
                <ul >
                    <li><h3> COMPANY</h3> </li>
                    <li><a href='/about'> About</a>  </li>
                    <li><a href='/contact'> Contact</a>  </li>
                </ul>
            </Col>
            
            <Col className= 'col span_1_of_3' > 
                <ul >
                    <li>  <h3> MEDIA</h3> </li>
                    <li> <a href='/facebook'> Facebook</a> </li>
                    <li> <a href='/twitter'>Twitter</a>  </li>
                    <li> <a href='/instagram'>Instagram</a>  </li>
                </ul>
            </Col> 
            
            </Row>
         
          
          
        </div>
    )
}

export default Footer
