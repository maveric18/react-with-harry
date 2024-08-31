import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imgUrl, newsUrl, author, publishedAt} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: '18rem'}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%'}}>{author}</span>
            <img src={imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By <b>{!author?"Unknown":author}</b> Published at {new Date(publishedAt).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
