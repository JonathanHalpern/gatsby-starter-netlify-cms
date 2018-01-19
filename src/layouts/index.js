import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import FixedOptions from '../components/FixedOptions';
import './index.css';

const Background = styled.div`
  background-image: url('img/Functional/yellow_mountains.jpg');
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  top: 0;
`;

const LeftWrapper = styled.div`
  @media(min-width: 1224px) {
    width: calc(100% - 340px);
  }
`;

const BodyWrapper = styled.div`
  padding: 30px;
  margin: 85px 15px 50px;
  max-width: 800px;
  background: white;
  @media(min-width: 600px) {
    padding: 15px;
    margin: 100px 30px 50px;
  }
  @media(min-width: 850px) {
    padding: 30px;
    margin: 100px auto 50px;
  }
  @media(min-width: 1224px) {
    margin: 50px auto;
  }
`;

const TemplateWrapper = ({ children }) => (
  <div>
    <Background />
    <Helmet title="Home | Year of the Challenge" />
    <Navbar />
    <LeftWrapper>
      <BodyWrapper>
        {children()}
        <FixedOptions />
      </BodyWrapper>
    </LeftWrapper>
  </div>
);

export default TemplateWrapper;
