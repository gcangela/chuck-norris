import styled from 'styled-components';

export const ButtonGroup = styled.div`
  margin-bottom: 24px;
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
  grid-template-rows: min-content;
  line-height: 28px;
  padding: 8px 0;
  font-size: 14px;
  span {
    position: relative;
  }
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content;
    button {
      grid-row: 2;
      max-width: 150px;
      justify-self: center;
    }
  }
`;

export const Button = styled.button<{ type?: 'add' | 'remove' }>`
  background: #2194ff;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  height: 30px;
  min-width: 150px;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;
