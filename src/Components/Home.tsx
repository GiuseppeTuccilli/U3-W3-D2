import { useState , useEffect } from "react"
import {  Result  } from "../types/articles"
import { Container, Row,  Spinner } from "react-bootstrap"
import Button from 'react-bootstrap/Button';

import SingleArticle from "./SingleArticle";


const Home=()=>{
const [articles, setArticles]=useState<Result[]>([])
const [next, setNext]=useState<string | null>(null)
const [prev, setPrev]=useState<string | null>(null)

const [isLoading, setIsLoading]=useState(true)



 const getArticels=()=>{
   fetch('https://api.spaceflightnewsapi.net/v4/articles')
   .then((res)=>{
    if(res.ok){
        return res.json()
    } else{throw new Error('errore')}
   })
   .then((data)=>{
    
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
         <div className="d-flex justify-content-between my-3">
         {prev!==null?<Button  className="mt-3 me-3" variant="primary" onClick={()=>{getPrev()}}>Previous</Button>:<div></div>}
        {next!==null?<Button className="mt-3 ms-3" variant="primary" onClick={()=>{getNext()}}>Next</Button>:<div></div>}
       </div>
        <Row className="justify-content-center g-2">
       
    {isLoading ? <div className="text-center"><Spinner variant="danger"/></div>:
    articles.map((ar)=>{
        return(
                <SingleArticle key={ar.id} art={ar}/>
        )
    })
    }
       </Row>
       </Container>
)
}

export default Home