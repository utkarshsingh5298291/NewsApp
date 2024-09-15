import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';


export class News extends Component {

    static defaultProps={
        country: 'in',
        pageSize:8
    }
    static defaultProps={
        country : PropTypes.string,
        pageSize: PropTypes.number
    }

   
    constructor()
    {
        super();
        console.log("Hello I am a constructor");
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
        console.log("cdm");
        let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d425313f4fc2457583da8e88e5480bb8&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }
      handlePeviousClick=async()=>{
        console.log("Previous");     
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=d425313f4fc2457583da8e88e5480bb8&page=${ this.state.page-1}&pageSize=${this.props.pageSize}`;
          
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
     
        this.setState({
            
            page: this.state.page-1,
            articles: parsedData.articles,
            loading:false
            
        })    
        
    }
     handleNextClick=async()=>{
        console.log("Next");
        if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))
        {

        }
        else{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=d425313f4fc2457583da8e88e5480bb8&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            
            page: this.state.page +1,
            articles: parsedData.articles,
            loading:false
        })     
        
    }
   
    }
  render() {
    return ( 
      <div className='container my-4'>
        <h1 className='text-center'>NewsApp -Top Headline</h1>
        {this.state.loading && <spiner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return(
                
               <div className='col-md-4' key={element.url}>
                    <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url}></NewsItem>
                </div>
                
            )
        })}
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePeviousClick}>&larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}> Next&rarr;</button>
        </div>
       
        
        </div>
     </div>
    )
  }
}

export default News