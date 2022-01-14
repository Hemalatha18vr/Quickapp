import React from "react";
import ViewData from '.././viewdata/viewdata';
class SaveData extends React.Component {
  state={
    json:[]
  }
   async componentDidMount(){
    console.log("componentdidmount");
 let response = await fetch('http://localhost:8080/stocks');
          let data = await response.text();
          let arr = JSON.parse(data);
          console.log(arr);
          this.setState({json:arr})
      }
  render() {
    return <div>
       {
          (this.state.json)==null? "loading...":  <ViewData data ={this.state.json}/>
        }
    </div>;
  }
}
export default SaveData;