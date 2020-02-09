import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  button:not(:last-of-type) {
    margin-right: 8px;
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 374px) {
    button:not(:last-of-type) {
      margin-right: 0px;
      margin-bottom: 8px;
    }
  }
`;

export const MainHeading = styled.h1`
  margin: 32px 0;
  font-size: 48px;
  text-align: center;
`;

export const SubHeading = styled.h2`
  font-size: 32px;
  margin: 0 0 24px 0;
  text-align: center;
`;

export const List = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`;

export const ListItem = styled.li`
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  align-items: center;
  grid-template-columns: 5fr 1fr;
  line-height: 28px;
  font-size: 14px;
  span {
    position: relative;
  }
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    button {
      grid-row: 2;
      max-width: 150px;
      justify-self: center;
    }
  }
`;

export const Button = styled.button`
  color: #fff;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  height: 30px;
  min-width: 150px;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;
