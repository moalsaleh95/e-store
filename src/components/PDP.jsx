import React, { Component } from 'react';
import { productAdded } from '../features/product/cartSlice';
import { fetchProduct } from '../features/product/pdpSlice';
import ColorAttribute from './ColorAttribute';
import OtherAttributes from './OtherAttributes';
import { connect } from 'react-redux';
import withRouter from './withRouter';

class PDP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAttribute: {},
      displayedImage: 0,
      attributesArrayLen: 1
    }

    this.dispatchProduct = this.dispatchProduct.bind(this)
    this.removeQuotes = this.removeQuotes.bind(this)
    this.imageSelector = this.imageSelector.bind(this)
    this.setSelectedAttribute = this.setSelectedAttribute.bind(this)
    this.updateSetSelectedAttribute = this.updateSetSelectedAttribute.bind(this)
  }

  updateSetSelectedAttribute(newState) {
    this.setState(prevState => {
      return { selectedAttribute: { ...prevState.selectedAttribute, ...newState } };
    })
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.dispatch(fetchProduct(id));
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.params;
    if (id !== prevProps.params.id) {
      this.props.dispatch(fetchProduct(id));
    }

    const { product } = this.props;
    if (prevProps.product !== product) {
      this.setState({
        attributesArrayLen: product?.attributes.length || 0,
      });
    }
  }
  

  dispatchProduct = () => {
    const { selectedAttribute, attributesArrayLen } = this.state;
    const { id } = this.props.params;
    const { product } = this.props;
    const newSelectedProduct = { ...product };

    if (Object.entries(selectedAttribute).length === attributesArrayLen) {
      newSelectedProduct.selectedAttribute = selectedAttribute;
      const newActionAttribute = this.removeQuotes(JSON.stringify(newSelectedProduct.selectedAttribute).split(' ').sort().join());
      newSelectedProduct.id = id + newActionAttribute
      newSelectedProduct.quantity = 1;
      
      this.props.dispatch(productAdded(newSelectedProduct));
      this.setState({ selectedAttribute: {} });
    } else {
      alert('Please Select a Variation Before Adding To Cart');
    }
  }

  removeQuotes = (str) => {
    return str.replace(/"/g, '');
  }

  imageSelector = (e) => {
    this.setState({ displayedImage: e.target.id });
  }

  setSelectedAttribute = (attribute, value) => {
    this.setState(prevState => {
      const selectedAttribute = { ...prevState.selectedAttribute };
      selectedAttribute[attribute] = value;
      return { selectedAttribute };
    });
  }


  render() {
    const { product, isLoading, error } = this.props;
    const { selectedCurrencyIndex } = this.props.ProductsInCart;
    const { selectedAttribute, displayedImage } = this.state;

    if (isLoading) return <p className='mx-auto container'>Loading...</p>;
    if (error) return <p className='mx-auto container'>Error : {error.message} + {error}</p>;

    if (product !== null) {
      const { name, brand, inStock, description, prices, gallery, attributes } = product;

      return (
        <>
          {!isLoading &&
            <div className='container mx-auto mt-pdp'>
              <div className='grid-container mt-pdp'>

                <div className='pdp-left-container'>
                  <div>
                    {gallery?.map((image, index) => <img className='pdp-sml-photos' onClick={this.imageSelector} id={index} key={index} src={image} alt="" />)}
                  </div>
                  <div>
                    <img className='pdp-big-photo' src={gallery[displayedImage]} alt="" />
                  </div>
                </div>

                <div className='pdp-right-container'>
                  <div className='pdp-title'>{brand}</div>
                  <div className='pdp-subtitle'>{name}</div>

                  <div>
                    {Object.values(attributes).map(value => {

                      {/* For Colors attribute */ }
                      if (value.name === 'Color') {
                        return (
                          <ColorAttribute selectedAttribute={this.state.selectedAttribute} updateSetSelectedAttribute={this.updateSetSelectedAttribute} value={value} />
                        )
                      }
                      else {
                        {/* For Other attribute */ }
                        return (
                          <OtherAttributes selectedAttribute={this.state.selectedAttribute} updateSetSelectedAttribute={this.updateSetSelectedAttribute} value={value} />
                        )
                      }
                    })}
                  </div>

                  <div>
                    <div>
                      <p className='size-color-price'>PRICE:</p>
                      {Array.isArray(prices) && prices[selectedCurrencyIndex] && <p className='price'>{prices[selectedCurrencyIndex].currency.symbol}{prices[selectedCurrencyIndex].amount}</p>}
                    </div>
                    <div className='add-to-cart-div'>
                      <button
                        className='add-to-cart-btn cursor-pointer'
                        onClick={() => this.dispatchProduct()}
                        style={inStock ? { background: '#5ECE7B', border: '2px solid #5ECE7B' } : { pointerEvents: 'none', background: 'grey', border: '2px solid grey' }} >
                        {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                      </button>
                    </div>
                    <p className='pdp-desc' dangerouslySetInnerHTML={{ __html: `${description}` }}></p>
                  </div>

                </div>
              </div>
            </div>
          }
        </>
      )
    }
    return null;
  }
}

const mapStateToProps = state => ({
  product: state.pdpProduct.product,
  isLoading: state.pdpProduct.isLoading,
  error: state.pdpProduct.error,
  ProductsInCart: state.productsAdded
});

export default withRouter(connect(mapStateToProps)(PDP));
