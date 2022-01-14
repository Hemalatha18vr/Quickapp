import React, { Component }  from 'react';
import TablePagination from '@mui/material/TablePagination';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './apppagination.css' 
import axios from 'axios';


var prices ="";
var arr =[];
var stocks=[];
var symbols=[];
var queryjson=[];
export default function AppPagination(props) {
  arr= props.data;
  stocks = props.stocks;
  queryjson = props.query;
  if(queryjson.length>0){
    arr= queryjson;
  }
  console.log(stocks)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const registerStock = async (e) => {
      e.preventDefault();
      try {
        let stock = {};
        stock.companyName= e.target.getAttribute("name");
        stock.symbol= e.target.getAttribute("symbol");
        stock.marketCap= e.target.getAttribute("marketcap");
        stock.CurrentPrice= e.target.parentElement.nextElementSibling.innerText;
       const res = await axios.post('http://localhost:8080/stocks',stock);
  console.log("Stock Added")
  console.log(res.data);
  window.location.href="/home";
       return res;
   } catch (error) {
    console.log(error.response)
    return (error.response);
     }
     
   }
   
   const openSaveData = (event) => {
    window.location.href="./view";
  };
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, arr.length - page * rowsPerPage);
 
      stocks.map(e=> symbols.push(e.symbol))
  return (
      <div className="mydata">      
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Company Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right"> Action </TableCell>
            <TableCell align="right">Current Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { arr
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{row.stock_exchange.name}</TableCell>
                <TableCell align="right">
                  
                  {
                    symbols.includes(row.symbol)?
                    <button type="button" onClick={openSaveData} class="btn btn-secondary viewbutton">View</button>
                  :<button type="button" name={row.name} symbol={row.symbol} marketcap ={row.stock_exchange.name}  onClick={registerStock} class="btn btn-primary">Save Data</button>
                  }
                  
                  </TableCell>
                <TableCell align="right">{(Math.random()*1000).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={arr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
    </div>
  );
}