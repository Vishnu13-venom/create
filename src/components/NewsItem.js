import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title, Description, imageurl,author, date ,newsurl} = this.props;
    return (
      <div className="my-3">
      <div className="card">
  <img src={!imageurl?"https://cdnimg.rg.ru/img/content/226/66/67/iStock-1314587620_d_850.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{Description}...</p>
    <p className="card-text"><small className="text-muted">By {!author? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsurl} rel ="nonopener" className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem