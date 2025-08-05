import {  Author, Result} from "../types/articles"
import { useState, useEffect } from "react"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams , useNavigate} from "react-router-dom";
import { Alert } from "react-bootstrap"

const Details=()=>{
const[article, setArticle]=useState<Result | null>(null)
const[isLoading, setIsLoading]=useState(true)
const [authors, setAuthors]=useState<Author[]>([])
const params=useParams()
console.log(params)
const navigate=useNavigate()


const getDetails=()=>{
    fetch('https://api.spaceflightnewsapi.net/v4/articles/' + params.id)
    .then((res)=>{
        if(res.ok){
            return res.json()
        } else{throw new Error('errore')}
    })
    .then((data)=>{
        console.log(data)
        setArticle(data)
        setIsLoading(false)
        setAuthors(data.authors)
    })
    .catch((er)=>{
        console.log('errore nella chiamata', er)
        setIsLoading(false)
    })
}

useEffect(()=>{
    getDetails()
}, [])

return(
    <Container fluid>
        <Alert  variant="info">
        <Alert.Heading className="text-center">{article?.title}</Alert.Heading>
        <p className="text-center">
         Scorri in fondo per l'articolo completo
        </p>
        <hr />
        <Button variant="primary" onClick={()=>{navigate('/')}} >Home</Button>
        <div className="d-flex justify-content-end">
          
        </div>
      </Alert>
        
        <Row className="justify-content-center">
          
            {isLoading?<div className="text-center"><Spinner variant="info"/></div>:
              <Col xs={12} md={6}>
            <Card >
      <Card.Img variant="top" src={article?.image_url} style={{height:'18em', objectFit:'cover'}}/>
      <Card.Body>
        <Card.Title className="text-center">{article?.title}</Card.Title>
        <h3 className="text-center">Summary:</h3>
        <Card.Text>
            {article?.summary}
        </Card.Text>
        <Card.Text>
         Date: {article?.published_at.slice(0,11)}
        </Card.Text>
          <Card.Text>
         Authors: {authors.map((a)=>{return(<span key={a.name}>{a.name}</span>)})}
        </Card.Text>
        <Button variant="primary" ><a href={article?.url} className="text-decoration-none text-white">Vai all'articolo</a></Button>
      </Card.Body>
    </Card>
            </Col>
            }

        </Row>
    </Container>
)
}

export default Details