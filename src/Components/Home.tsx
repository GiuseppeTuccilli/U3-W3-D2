import { useState , useEffect } from "react"
import { Root , Author, Result, Socials, Launch} from "../types/articles"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


const Home=()=>{
const [articles, setArticles]=useState<Result[]>([])
const [next, setNext]=useState<string | null>(null)
const [prev, setPrev]=useState<string | null>(null)

const [isLoading, setIsLoading]=useState(true)

const navigate=useNavigate()

 const getArticels=()=>{
   fetch('https://api.spaceflightnewsapi.net/v4/articles')
   .then((res)=>{
    if(res.ok){
        return res.json()
    } else{throw new Error('errore')}
   })
   .then((data)=>{
    console.log(data)
    setArticles(data.results)
    setNext(data.next)
    setPrev(data.previous)
    setIsLoading(false)
   })
   .catch((er)=>{
    console.log('errore nella chiamta', er)
    setIsLoading(false)
   })
 }

 const getNext=()=>{
      fetch(next)
   .then((res)=>{
    if(res.ok){
        return res.json()
    } else{throw new Error('errore')}
   })
   .then((data)=>{
    console.log(data)
    setArticles(data.results)
    setNext(data.next)
    setPrev(data.previous)
    setIsLoading(false)
   })
   .catch((er)=>{
    console.log('errore nella chiamta', er)
    setIsLoading(false)
   })
 }
 const getPrev=()=>{
      fetch(prev)
   .then((res)=>{
    if(res.ok){
        return res.json()
    } else{throw new Error('errore')}
   })
   .then((data)=>{
    console.log(data)
    setArticles(data.results)
    setNext(data.next)
    setPrev(data.previous)
    setIsLoading(false)
   })
   .catch((er)=>{
    console.log('errore nella chiamta', er)
    setIsLoading(false)
   })
 }

 useEffect(()=>{
    getArticels()
 }, [])
return(
    <Container>
        <Row className="justify-content-center g-2">
       
    {isLoading ? <div className="text-center"><Spinner variant="danger"/></div>:
    articles.map((ar)=>{
        return(
                 <Col xs={12} md={6} lg={4} key={ar.id}>
              <Card style={{height:'25em'}} className="d-flex flex-column">
      <Card.Img variant="top" src={ar.image_url} style={{height:'10em', objectFit:'cover'}} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{ar.title}</Card.Title>
        <Card.Text>
          Authors: {ar.authors.join(', ')}
        </Card.Text>
        <Card.Text className="mb-auto">
          Date: {ar.published_at.slice(0,9)}
        </Card.Text>
         
        <Button variant="primary" onClick={()=>{navigate('details/' + ar.id )}}>Dettagli</Button>
      </Card.Body>
    </Card>
    
    
    </Col>
        )
    })
    }
    
        
        </Row>
        <div className="d-flex justify-content-between m-3">
         {prev!==null?<Button  className="mt-3 me-3" variant="primary" onClick={()=>{getPrev()}}>Previous</Button>:<div></div>}
        {next!==null?<Button className="mt-3 ms-3" variant="primary" onClick={()=>{getNext()}}>Next</Button>:<div></div>}
       </div>
        </Container>
)
}

export default Home