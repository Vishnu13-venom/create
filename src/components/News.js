import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps  ={
      country: 'in',
      pageSize:8,
      category :'general'
    }
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category :PropTypes.string
    }

constructor(){
    super();
    console.log("hello I am constructor")
    this.state = {
        articles :[],
        loading : false,
        page: 1
    }
}
   async componentDidMount(){
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcfe594b4b334e52a7cc24fb366c9caa&page=1&pageSize=${this.props.pageSize}`;
       let data = await fetch(url)
       let parsedata = await data.json()
       console.log(parsedata);
       this.setState({articles: parsedata.articles, totalResults: parsedata.totalResults})
   }

   handlePrevClick = async()=>
   {
    console.log("Previous");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcfe594b4b334e52a7cc24fb366c9caa&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
       let data = await fetch(url)
       let parsedata = await data.json()
       console.log(parsedata);

       this.setState({
         page : this.state.page - 1,
         articles: parsedata.articles
       })
   }
   handleNextClick = async ()=>
   {
     console.log("Next");
     if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

     }
     else{
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcfe594b4b334e52a7cc24fb366c9caa&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
       let data = await fetch(url)
       let parsedata = await data.json()
       console.log(parsedata);

       this.setState({
         page : this.state.page + 1,
         articles: parsedata.articles
       }) 
      }
   }
 

  render() {
    return (
      <div className = "container my-3">
      <h1 className = "text-center" > DailyNews Dose - Top Headlines </h1>
      <div className = "row ">
      {this.state.articles.map((element)=>{
          return <div className = "col-md-4 " key = {element.url}>
            <NewsItem title = {element.title?element.title.slice(0.40):" "} Description = {element.description?element.description.slice(0,88):" "} imageurl = {element.urlToImage} newsurl = {element.url} author ={element.author} date={element.publishedAt}/> 
                 </div>   
                 })}
                            
                            
     </div>
      <div className="Container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick = {this.handlePrevClick} > &larr; Previous</button>
      <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick = {this.handleNextClick} >Next &rarr;</button>

      </div>
      </div>
    )
  }
}

export default News