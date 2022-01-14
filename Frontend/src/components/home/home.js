import React, { Component }  from 'react';
import googlelogo from '../../images/GOOGL.png';
import fblogo from '../../images/FB.png';
import amazonlogo from '../../images/AMZN.svg';
import './home.css';
import Card from '../card/card';
import TablePagination from '@mui/material/TablePagination';
import AppPagination from '../apppagination/apppagination';

class Home extends React.Component {
state={
  cardjson:[["Google",googlelogo,1278.3],["Amazon",amazonlogo,88.3],["FB",fblogo,278.3]],
  json:[],
  stocks:[],
  queryjson:[]
}

    updateQuery(e){
        let arr = [];
        if(document.getElementById("searchname").value.length > 0){
            arr = this.state.json.filter((item)=>item.name.toLowerCase().includes(document.getElementById("searchname").value.toLowerCase()))
        }
        console.log(arr)
        this.setState({queryjson:arr})
    }

 async componentDidMount(){
  console.log("componentdidmount");
        const draggables = document.querySelectorAll('.draggable')
        const container = document.querySelector('.container')

        draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
        })
        container.addEventListener('dragover', e => {
            e.preventDefault()
             const draggable = document.querySelector('.dragging')
                container.appendChild(draggable);
        })

        let response = await fetch('http://api.marketstack.com/v1/tickers?access_key=94741a4501cf8fe1e16154755559dfce');
        let data = await response.text();
        let arr = JSON.parse(data).data;
        console.log(arr);     
        let response1 = await fetch('http://localhost:8080/stocks');
        let data1 = await response1.text();
        let arr1 = JSON.parse(data1);
        console.log(arr1);
        this.setState({json:arr,stocks:arr1})
    }
     handleChangePage(event, newPage){
      console.log("change");
    };
  render() {
    console.log(this.state.json)
    return <div>
        <div className="container holder">
          {
            this.state.cardjson.map((e)=>{
               return <Card data={e}/>
            })
          }
        </div>
        <div className='heady'>
        <div><b>Stock Details Table</b></div><div className="inputholder"><input type="text" placeholder="Search by Company Name" className="inputbox" id="searchname"  onChange={(e)=>{this.updateQuery(e)}} /></div>
        </div>
        {
          (this.state.json)==null? "loading...":  <AppPagination data ={this.state.json} stocks={this.state.stocks} query={this.state.queryjson} />
        }
   
    </div>;
  }
}
 
export default Home;