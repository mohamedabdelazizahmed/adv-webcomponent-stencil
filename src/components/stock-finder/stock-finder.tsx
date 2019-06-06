// import { Component, State,Event, EventEmitter } from '@stencil/core';
// import { AV_API_KEY } from '../../global/global';

// @Component({
//     tag: 'uc-stock-finder',
//     styleUrl: 'stock-finder.css',
//     shadow:true
// })
// export class StockFinder {
//     stockNameInput:HTMLInputElement;
//     @State() searchResults: {name: string,symbol: string}[] = [];

//     @Event({bubbles: true, composed: true}) ucSymbolSelected: EventEmitter<string>;

//     onFindStocks(event: Event){
//         event.preventDefault();
//         const stockName = this.stockNameInput.value;
//         fetch(``)
//         .then(res=>{
//             res.json();
//         })
//         .then(parsedRes=>{
//             console.log(parsedRes);
//             this.searchResults = parsedRes["bestMatches"].map(match=>{
//                 return {name:match['2. name'] , symbol:match['1. symbol']}
//             });
//         })
//         .catch((err)=>{
//             console.log(err);
  
//         });
//     }

//     onSelectSymboly(symbol: string){
//         this.ucSymbolSelected.emit(symbol);
//     }



    
    
//     render() {
//         return [
//             <form onSubmit={this.onFindStocks.bind(this)}>
//                 <input id="stock-symbol"
//                        ref={el=>(this.stockNameInput = el)}/>
//                 <button type="Submit">Find</button>       
//             </form>,
//             <ul>
//                 {
//                     this.searchResults.map(result=>{
//                           <li onClick={this.onSelectSymboly.bind(this,result.symbol)}><strong>{result.symbol}</strong> - {result.name}</li>
//                    })
//                 }
//             </ul>
//         ];
//     }
// }