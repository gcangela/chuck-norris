import styled from 'styled-components';

export const ButtonGroup = styled.div`
  margin-bottom: 24px;
`;

export const MainHeading = styled.h1`
  margin: 32px 0;
  font-size: 48px;
`;

export const SubHeading = styled.h2`
  font-size: 32px;
  margin: 0 0 24px 0;
  text-align: center;
`;

export const List = styled.ul`
  position: relative;
  list-style: none;
`;

export const ListItem = styled.li`
  cursor: pointer;
  line-height: 28px;
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
  &::before {
    content: '😂';
    position: absolute;
    left: 0;
    font-size: 20px;
  }
  button {
    margin-left: 16px;
  }
`;

export const Button = styled.button<{ type?: 'add' | 'remove' }>`
  background: #e91e63;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;
