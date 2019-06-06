import { Component, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'uc-stock-price',
    styleUrl: 'stock-price.css',
    shadow: true
})
/** https://www.alphavantage.co/
 *  API KEY: GUWWXFU6LZ0QG5ZW
 */
export class StockPrice {
    initialstockSymbol: string;
    // to access the vaue using ref attrbuite
    stockInput: HTMLInputElement;
    // to access web-component like :host in css
    @Element() el: HTMLElement;

    @State() fetchedPrice: number;
    // Two Way binding & input Validation 
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    //  show the error mesage 
    @State() error: string;
    // to set symbole outside component 
    @Prop() stockSymbol: any;

    @State() loading: any;

    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
        console.log('The value of myProp is: ', newValue);
        console.log('The Old value of myProp is: ', oldValue);
        if (newValue !== oldValue) {
            this.fetchStockPrice(newValue);
        }
    }

    /**
     * Two Way binding & input Validation
     * Running when user input event
     **/  
    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if (this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        } else {
            this.stockInputValid = false;
        }
    }



    /**
     * 
     * onFetchStockPrice=>  When submit this form 
     * https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&apikey=demo
     */
    onFetchStockPrice(event: Event) {
        event.preventDefault();
        console.log('submitted ...!!');

        // to get value for input HTML  using TypeScript by ref webcomponent  & 
        // property shadow root bescouse using  shadow true 
        // AAPL => Apple Stock Price . 
        //const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symboly")as HTMLInputElement).value ;
        //OR
        const stockSymbol = this.stockInput.value;

        // fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        // .then(res=>{
        //     if(res.status !== 200){
        //         throw new Error('Invalid');
        //     }
        //     return res.json();
        // })
        // .then(parsedRes=>{
        //     console.log(parsedRes);
        //     if(!parsedRes['Global Quote']['05. price']){
        //         throw new Error('Invalid  symbol !');
        //     }
        //     this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        // })
        // .catch(err=>{
        //     console.log(err);
        //     this.error = err.message;
        // });
        this.fetchStockPrice(stockSymbol); //MSFT
    }
    /**
     * Life Cycle Component 1...
     * load before render function and shadow DoM create and component load ... 
     * it's has access to the  DOM to the enviroment into which the component render
     */
    componentWillLoad() {
        console.log('... 1 - componentWillLoad ...');
        console.log("stockSymbol =>", this.stockSymbol);
    }
    /**
     * Life Cycle Component 2...
     * Running when component Loaded 
     * use stock-symboly Attrubite outside 
     * to set intial value when component Didload 
     */
    componentDidLoad() {
        console.log('....2 - componentDidLoad ...');
        if (!this.stockSymbol) {
            //      this.initialstockSymbol = this.stockSymbol;
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    /**
     * life cycle coomponent 3..
     * will fire before it will render becouse some prop or state property change
     * call becouse call fetchStockPrice in didLoad function and change  this.fetchedPrice
     * 
     */
    componentWillUpdate() {
        console.log('... 3- componentWillUpdate ...');
    }
    /**
     * life cycle coomponent 4..
     */
    componentDidUpdate() {
        console.log('... 4- componentDidUpdate ...');
        if (this.stockSymbol !== this.initialstockSymbol) {
            this.fetchStockPrice(this.stockSymbol);
        }
    }
    /**
      * life cycle coomponent 4..
      * when component was removed DOM 
      */
    componentDidUnload() {
        console.log('... 5- componentDidUnload ...');
    }




    /** 
     * Listen Custom Event (ucSymbolSelected) in stock-finder component ...
     * 
    */
    @Listen('body:ucSymbolSelected') //body: for buble
    onStockSymbolSelected(event: CustomEvent) {
        console.log('Received the custom event: ', event);
        console.log('stock symbol selected ... ', event.detail);
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail
            this.fetchStockPrice(this.stockSymbol);
        }
    }
    /**
     * 
     */
    hostData() {
        return { class: this.error ? 'error' : '' };
    }
    /**
     * Calling fetch Stock Price
     */
    fetchStockPrice(stockSymbol: string) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
                // Error Handling status response ...
                if (res.status !== 200) {
                    throw new Error('Invalid');
                }
                return res.json();
            })
            .then(parsedRes => {
                console.log(parsedRes);
                // Error Handling response without status in response...
                if (!parsedRes['Global Quote']['05. price']) {
                    throw new Error('Invalid  symbol !');
                }
                this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.error = err.message;
                this.fetchedPrice = null;
                this.loading = false;
            });
    }
    /**
     * Render HTML Component 
     */
    render() {
        console.log('...render....');
        let dataContent = <p>Please Enter a Symboly! </p> ;
        if (this.error) {
           dataContent =  <p>{this.error}</p>;
        }
        if (this.fetchedPrice) {
           dataContent =  <p>price ${this.fetchedPrice}</p>;
        }
        return [
        <form onSubmit={this.onFetchStockPrice.bind(this)}>
            <input type="text" id="stock-symboly"
                ref={el => this.stockInput = el}
                value={this.stockUserInput}
                onInput={this.onUserInput.bind(this)} />
            <button type="submit"
                disabled={!this.stockInputValid}>Fetch</button>
        </form>,
        <div>
            {/* <p>price ${this.fetchedPrice}</p> */}
            {dataContent}
        </div>
        ];
    }
}