import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?q=trump&apiKey=d00cacf241c847f883eecaa42e314613&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false})
  }

  handlePrevClick = async()=> {
    console.log("Prev click");
    let url = `https://newsapi.org/v2/top-headlines?q=trump&apiKey=d00cacf241c847f883eecaa42e314613&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);  
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  }

  handleNextClick = async()=> {
    console.log("Next click");
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?q=trump&apiKey=d00cacf241c847f883eecaa42e314613&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      });
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMoney - Top Headlines</h1>
        {this.state.loading && <Spiner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4" key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage?element.urlToImage:"https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png"}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btm-sm btn-dark" onClick={this.handlePrevClick}>&larr;Prev</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} className="btn btm-sm btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
