import { gql } from '@apollo/client';

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

export { GET_PRODUCT };