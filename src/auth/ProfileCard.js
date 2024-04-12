import React, {Component} from 'react';


class ProfileCard extends Component {

  render(){
    return (
      <div className="">
        <div className="">
          <img src={this.props.pictureURL} alt="" height="150px" width="150px"/>
        </div>
      </div>
    )
  }
}

export default ProfileCard;