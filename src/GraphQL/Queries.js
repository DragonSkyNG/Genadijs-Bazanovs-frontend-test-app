import { gql } from "@apollo/client";

export function getProducts(category = "all") {
  const GET_PRODUCTS = gql`
  query {
    category(input: { title: "${category}" }) {
      products {
        id
        name
        inStock
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        brand
      }
    }
  }
`;
  return GET_PRODUCTS;
}

export function getProductDetails(id) {
  const GET_PRODUCT_DETAILS = gql`
  query{
    product(id:  "${id}") {
      id
      name
      inStock
      gallery
      description
      category
      prices{
        amount
        currency{
          label
          symbol
        }
      }
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      brand
    }
  } 
`;
  return GET_PRODUCT_DETAILS;
}

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
