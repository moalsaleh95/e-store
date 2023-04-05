import { gql } from '@apollo/client';

const GET_PRODUCTS = gql `
  query Products {
    categories {
      products {
        name
        gallery
        category
      }
    }
  }
`;

const GET_PRODUCT = gql`
query Product ($id: String!) {
    product(id: $id) {
      name
      brand
      inStock
      description
      category
    }
  }
`;


export { GET_PRODUCTS, GET_PRODUCT };