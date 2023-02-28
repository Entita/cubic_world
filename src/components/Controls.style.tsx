import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`

export const RotateButtonStyled = styled.button`
  display: flex;
  width: fit-content;
  border-radius: 4px;
  padding: 4px 12px;
  letter-spacing: 2px;
  font-weight: bold;
  outline: none;

  &:hover {
    background-color: darkgray;
  }

  &:active {
    background-color: gray;
  }
`

export const ArrowKeysWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BottomArrowKeysWrapperStyled = styled.div`
  display: flex;
`
