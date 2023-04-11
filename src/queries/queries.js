import { gql } from '@apollo/client';

const GET_PRODUCT = gql`
query Product ($id: String!) {
    product(id: $id) {
      id
        name
        brand
        description
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes{
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
    }
  }
`;

const GET_PRODUCTS = gql `
  query Products {
    categories {
      products {
        id
        name
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;

const GET_CURRENCIES = gql `
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

const GET_PRODUCTS_ALL = gql `
  query AllProducts {
    category {
      products {
        id
        name
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;

// get products by their category 
const GET_CATEGORIES = gql `
  query Categories {
    categories{
      name
      products{
        id
        name
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;


export { 
  GET_PRODUCTS, 
  GET_PRODUCT, 
  GET_CURRENCIES, 
  GET_PRODUCTS_ALL, 
  GET_CATEGORIES 
};