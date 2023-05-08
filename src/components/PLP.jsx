import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { capFirstLetterFunc } from '../hooks/capFirstLetter';
import { fetchProducts } from '../features/product/plpSlice';
import withRouter from './withRouter';
import { connect } from 'react-redux';
// import { useQuery } from '@apollo/client';
// import { GET_CATEGORIES } from '../queries/queries';


class PLP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            category: 'all'
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchProducts());
    }

    render() {
        const { allFetchedProductsData, loading, error, selectedCurrencyIndex } = this.props;

        let { cat } = this.props.params;
        let location = this.props.location;

        let index = location.pathname === '/clothes' ? 1
            : location.pathname === '/tech' ? 2
                : location.pathname === '/all' ? 0
                    : location.pathname === '/' ? 0
                        : 0;

        let category = cat === '' ? 'all' : cat;

        const productsArray = (allFetchedProductsData)?.categories[index].products;

        if (loading) return <p className='container mx-auto'>Loading...</p>;
        if (error) return (<p className='container mx-auto'>Error : {error.message}</p>);

        return (
            <div className='container mx-auto'>
                <p className='plp-header'>{location.pathname === '/' ? "All" : capFirstLetterFunc(category)}</p>
                <div className='plp-container'>
                    {!loading && !error && productsArray && (
                        productsArray.map(product => {
                            const { id, name, gallery, prices, inStock } = product;
                            return (
                                <>
                                    <Link key={() => new Date.now().toJSON()} to={`/pdp/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                        <div className={`${!inStock ? 'outOfStockContainer' : ''}`}>
                                            <span className='outOfStockLayer' style={!inStock ? { visibility: 'visible' } : { visibility: 'hidden' }}>OUT OF STOCK</span>
                                            <div key={id} className='plp-card relative'>
                                                <img src={gallery[0]} alt={name} className='plp-img' />
                                                <p className='plp-title'>{name}</p>
                                                <p className='plp-price'>{prices[selectedCurrencyIndex]?.amount}{prices[selectedCurrencyIndex]?.currency.symbol}</p>
                                                <img className='greenCart absolute' alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADjElEQVR4nO2a208TQRSH+UuXxHiLxgd9MllEgaiJJApRiZd4CeADJhAFnhQjKFFjyI/SEEo1BaEKFShSUAq9HbMlHayGBw3LGTu/Sc5Lk+nOfN+cc7rdrfPgC8NXY1BH+L7qAaQAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAOCRgr7FZyEo080Ga4rfUT6STAiqjUCpIe6JbHYqzAoKxkf8hRyPN6mBqUsBecXqyVdK5jFRGx2yP+pqcEuDBl8HUKyPg8Zdn6utxTkBXcsAIGFp+p74e5wS0J7qNAKzF1NfjnIDG6ZtGwNzmgvp6nBNwKnq56peQ9nqcE1CPBsmX8qI1muO33RbgwZelrbQK/GKpKEciTRQQ25hREZDMpliCPPjyZjVioNz91BsqlK7koLnW6zQowIMvA6kRA6V3YShUKKNpmGsF9yBaZdeqHtCZ7DdQXi6/D/Van7NfzbValBqwdQKuJboMlIlMPLTrHI5ckEKpqN6ArRNwLnbjQBpjS/yOFQ3YOgEno5eqHtLUegO2TkA9GmS7mDNwwnouYEsDtk6AB19SWysGztmptppuwFYKmNpIGDhXPj6o6QZspYDR9LgRcG+ub9+/PzjxlRFkgvZ+rRPQnxo2gPoWXoTagAPZ2vu1TsDD+acG0PDK2L5+95nJ1qr6f3/+ifp+rRNwNdEpBzGyxW05NtGivl/rBDTErocOvyQlaZ95pL5XKwWciF4MDfx6/ruMr03L+ekO9X1aK8CDX3UzdtyCMuGcgMWtZSMgKEna63FOwNjaVNV/Ndo3S84JaPvlHaH9Htp7+y8EePDl+dJbCtCW0DHbI3Obi5IvFZgBGgIOjTeWX9r9llsvx2BqpPxZ2HMPMqwtQV75jendh/SVETy4D3suBWAHQnByfx/BZ2HPpQDsDXE1lwl9LgXgz/eEdsvIcOhzKQA7EIKmGYAMTnNwegOAf9OE/3UuBcCdsPpXkOdAUAAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCPowNOInpSaJA2fo428AAAAASUVORK5CYII="></img>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            );
                        })
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allFetchedProductsData: state.plpProducts.products,
        loading: state.plpProducts.isLoading,
        error: state.plpProducts.error,
        selectedCurrencyIndex: state.productsAdded.selectedCurrencyIndex
    };
};

export default withRouter(connect(mapStateToProps)(PLP));