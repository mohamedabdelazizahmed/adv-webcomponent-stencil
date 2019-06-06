import { Component, State ,Element } from '@stencil/core';
// create folder global and insert const API key 
import { AV_API_KEY } from '../../global/global';


@Component({
    tag: 'stock-price-v1',
    styleUrl: 'stock-price.css'
})
export class StockPriceV1 {
    // to access web-component like :host in css
    @Element() el: HTMLElement;
    @State() fetchedPrice: number;
    /**
      * 
      * onFetchStockPrice=>  When submit this form 
      * https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&apikey=demo
      */
    onFetchStockPrice(event: Event) {
        // console.log(".... onFetchStockPrice ... ");
        // event.preventDefault();
        // console.log("Submitted..");
        // fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        //     .then(res => {
        //         if (res.status !== 200) {
        //             throw new Error('Invalid');
        //         }
        //         // transform data to javascript object 
        //         return res.json();
        //     })
        //     .then(parsedRes => {
        //         console.log(parsedRes);
        //         // access object jaon as square brackes not dot becouse have space in price
        //         console.log(+parsedRes['Global Quote']['05. price']);
        //         this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

    }
    render() {
        return [
            <form onSubmit={this.onFetchStockPrice}>
                <input id="stock-symboly" />
                <button>Fetch</button>
            </form>,
            <div>
                Price :{0}
            </div>
        ];
    }
}