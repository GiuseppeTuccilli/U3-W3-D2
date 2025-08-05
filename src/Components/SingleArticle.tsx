import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Result } from '../types/articles';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
interface artToShow{
 art:Result
}

const SingleArticle=(props:artToShow)=>{
 const navigate=useNavigate()

    return(<Col xs={12} md={6} lg={4} key={props.art.id}>
              <Card style={{height:'23em'}} className="d-flex flex-column">
      <Card.Img variant="top" src={props.art.image_url} style={{height:'10em', objectFit:'cover'}} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{props.art.title}</Card.Title>
        
        <Card.Text className="mb-auto">
          Date: {props.art.published_at.slice(0,10)}
        </Card.Text>
         
        <Button variant="primary" onClick={()=>{navigate('details/' + props.art.id )}}>Dettagli</Button>
      </Card.Body>
    </Card> 
    
    
    </Col>)
}

export default SingleArticle

