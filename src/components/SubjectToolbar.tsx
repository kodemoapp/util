import styled from 'styled-components';

export const Root = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 8vh;
  z-index: 5;
  padding: 1rem;
  z-index: 5;
  font-size: ${({ theme }) => theme.fontSize.m};
  pointer-events: none;

  @media only screen and ${(props) => props.theme.breakpoints.l} {
    bottom: 2rem;
  }

  @media only screen and (max-height: 800px) {
    bottom: 1rem;
  }

  @media only screen and ${(props) => props.theme.breakpoints.m} {
    bottom: 0rem;
  }

  @media only screen and ${(props) => props.theme.breakpoints.s} {
    padding: 0;
    bottom: 0;
  }
`;

export const Content = styled.div<any>`
  display: flex;
  flex-direction: row;
  padding: 0 1rem;
  color: #fff;
  background: rgba(8, 8, 12, 0.6);
  backdrop-filter: blur(5px);
  max-width: 80%;
  max-width: min(80%, 800px);
  width: 100%;
  min-height: 50px;
  gap: 1rem;
  border-radius: 100px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  align-items: center;
  pointer-events: auto;

  ${(props) => props.autoWidth && 'width: auto;'}

  @media only screen and ${(props) => props.theme.breakpoints.l} {
    max-width: 90%;
  }

  @media only screen and ${(props) => props.theme.breakpoints.m} {
    max-width: 100%;
  }

  @media only screen and ${(props) => props.theme.breakpoints.s} {
    width: 100%;
    min-height: 40px;
    padding: 0 0.5rem;
    font-size: 12px;
    border-radius: 0;
  }

  button {
    border-radius: 100px;
  }
`;
