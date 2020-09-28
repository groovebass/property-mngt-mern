import { Button, Card, Col, Rate, Result, Row } from 'antd';
import React from 'react';
import { HeartOutlined, SmileOutlined } from '@ant-design/icons';;




function HomePage() {
    return (
        <div style={{backgroundImage: "url( " +"/images/cape.jpg" + ") ", backgroundSize: 'cover'}} >
            
            <div style={{ width: '75%', margin: '2rem auto' }}> 
            <h1 style={{ textAlign: 'center', color: '#fff'}}> Welcome to Demawo Properties </h1>

                <div style={{ textAlign: 'center'}}> 
                <Button size="large" shape="round" type="primary">
                 <a href='/properties'> All Listings</a>  
                </Button>
                    <br/> <br/> <br/> 
                <Button size="large" shape="round" type="danger">
                <a href='/rent'> Properties to Rent</a>  
                </Button>
               

                <br/> <br/> <br/> 
                <Button size="large" shape="round" type="success">
                <a href='/buy'> Properties on Sale</a>  
                </Button>
                </div>
      
                <br /> <br />
                <Button size="large" shape="round" type="primary">
                <h2 style={{ color: '#fff'}}> Choose a Home </h2>
                </Button>
                <br /> <br />
                <Card  bordered={false}> 
         <p style={{ fontSize: '1rem'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Montes nascetur ridiculus mus mauris vitae ultricies leo. 
            Diam vel quam elementum pulvinar. Pretium quam vulputate dignissim suspendisse. 
            Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Augue lacus viverra vitae congue eu consequat ac felis.
            Nisl rhoncus mattis rhoncus urna neque viverra. Elit at imperdiet dui accumsan sit amet. 
            Quam viverra orci sagittis eu volutpat odio facilisis mauris. Bibendum at varius vel pharetra vel.
            Risus quis varius quam quisque id diam. Nunc faucibus a pellentesque sit. Mauris sit amet massa vitae tortor.
            Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
            Pharetra pharetra massa massa ultricies. Pharetra magna ac placerat vestibulum lectus mauris.
            Vitae auctor eu augue ut lectus. Ipsum consequat nisl vel pretium lectus quam id leo in. 
            Sapien et ligula ullamcorper malesuada.
        </p>
        </Card>
        <br /> <br />
        <Row gutter={[16, 16]}> 
        <Col lg={12} xs={24} >
        <h2 style={{ color: '#fff'}}> Rate  Us</h2>
        <Rate character={<HeartOutlined />} allowHalf />
         <br />
        </Col>
        <Col lg={12} xs={24} > 
        <Result
            icon={<SmileOutlined />}
                 title={ <h2 style={{ color: '#fff'}}>Ready to find your next home! </h2>}
             extra={<Button  size='large'  shape='round' type="primary"> 
             <a href='/contact'> Contact Us Now</a>
             </Button>}
        />,
        </Col>
        
        </Row>
      
      
      
      </div>

      

            
        </div>
    )
}

export default HomePage
