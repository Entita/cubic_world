import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ArrowKeysWrapperStyled, BottomArrowKeysWrapperStyled, RotateButtonStyled, WrapperStyled } from './Controls.style'

export default function Controls({ rotateCube }: { rotateCube: Function }) {
  return (
    <WrapperStyled>
      <ArrowKeysWrapperStyled>
        <RotateButtonStyled onClick={() => rotateCube({ x: -Math.PI * .5 })}><ArrowDropUpIcon /></RotateButtonStyled>
        <BottomArrowKeysWrapperStyled>
          <RotateButtonStyled onClick={() => rotateCube({ y: -Math.PI * .5 })}><ArrowLeftIcon /></RotateButtonStyled>
          <RotateButtonStyled onClick={() => rotateCube({ x: Math.PI * .5 })}><ArrowDropDownIcon /></RotateButtonStyled>
          <RotateButtonStyled onClick={() => rotateCube({ y: Math.PI * .5 })}><ArrowRightIcon /></RotateButtonStyled>
        </BottomArrowKeysWrapperStyled>
      </ArrowKeysWrapperStyled>
    </WrapperStyled>
  )
}
