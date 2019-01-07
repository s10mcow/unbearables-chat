import React from 'react';
import styled from 'styled-components';

const LinksWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const LinkSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export default class Links extends React.PureComponent {
  render() {
    return (
      <LinksWrapper>
        <LinkSection>
          <h2>Store</h2>
        </LinkSection>
      </LinksWrapper>
    );
  }
}

//https://www.etsy.com/shop/KimsCookieShop
//https://www.etsy.com/shop/haileyroseceramics/items?ref=pagination&page=2
