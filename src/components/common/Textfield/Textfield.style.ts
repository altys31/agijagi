import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import {
  TextfieldColor,
  TextfieldSize,
  ValidationState,
} from './Textfield.types';

export interface SizeStyles {
  marginSize: string;
  containerSize: string;
  inputFontSize: string;
  activeFontSize: string;
  inactiveFontSize: string;
  labelPosition: string;
  translate: string;
}

export const Conatainer = styled.div`
  position: relative;
`;

export const bottomTextStyles: Record<ValidationState, string> = {
  danger: `color : ${theme.color.danger[600]}; `,
  success: `color : ${theme.color.success[600]}; `,
  normal: ` `,
};

export const textfieldStyles: Record<TextfieldSize, SizeStyles> = {
  sm: {
    marginSize: `
      margin: 8px 0px 0px 8px;
    `,
    containerSize: `
      height : 30px;
      width : 150px;
    `,
    inputFontSize: `0.75rem`,
    activeFontSize: `0.5rem`,
    inactiveFontSize: `0.8rem`,
    labelPosition: `
      left : 12px;
      bottom : 6px;
    `,
    translate: `
      translateY(-10px)
    `,
  },
  md: {
    marginSize: `
      margin: 10px 0px 0px 8px;
    `,
    containerSize: `
      height : 40px;
      width : 200px; 
    `,
    inputFontSize: `1rem`,
    activeFontSize: `0.625rem`,
    inactiveFontSize: `1.125rem`,
    labelPosition: `
      left : 12px;
      bottom : 8px;
      `,
    translate: `
      translateY(-12px)
    `,
  },
  lg: {
    marginSize: `
      margin: 12px 0px 0px 10px;
    `,
    containerSize: `
      height : 50px;
      width :  250px; 
    `,
    inputFontSize: `1.125rem`,
    activeFontSize: `0.75rem`,
    inactiveFontSize: `1.25rem`,
    labelPosition: `
      left : 12px;
      bottom : 8px;
    `,
    translate: `
      translateY(-20px)
      `,
  },
};

export const TextfieldContainer = styled.div<{
  color: TextfieldColor;
  size: TextfieldSize;
  fullWidth: boolean;
  fieldState: ValidationState;
  disable: boolean;
}>(
  (props) => css`
    position: relative;
    display: flex;
    ${textfieldStyles[props.size].containerSize};
    ${props.fullWidth ? 'width : 100%' : ''};
    border: 2px solid
      ${props.disable
        ? theme.color[props.color][200]
        : theme.color[props.color][400]};
    border-radius: 15px 15px 3px 3px;
    background-color: ${theme.color[props.color][200]};
    transition: all 0.3s;
    border-bottom: 3px solid
      ${props.disable
        ? theme.color[props.color][200]
        : props.fieldState !== 'normal'
        ? theme.color[props.fieldState][500]
        : theme.color[props.color][900]};
  `
);

export const Label = styled.div<{
  size: TextfieldSize;
  color: TextfieldColor;
  isColoredLabel: boolean;
  fieldState: ValidationState;
  isFloating: boolean;
  disable: boolean;
}>(
  (props) => css`
    position: absolute;
    font-size: ${props.isFloating
      ? textfieldStyles[props.size].activeFontSize
      : textfieldStyles[props.size].inactiveFontSize};
    font-weight: bold;
    transition: all 0.3s;
    transform: ${props.isFloating && textfieldStyles[props.size].translate};
    opacity: ${!props.isFloating && `60%`};
    color: ${props.disable
      ? theme.color.greyScale[400]
      : props.fieldState !== 'normal'
      ? theme.color[props.fieldState][500]
      : props.isColoredLabel && theme.color[props.color][900]};
    ${textfieldStyles[props.size].labelPosition};
  `
);

export const Textfield = styled.input<{
  fieldSize: TextfieldSize;
  color: TextfieldColor;
  isColoredLabel: boolean;
  fieldState: ValidationState;
  disabled: boolean;
}>(
  (props) => css`
    ${textfieldStyles[props.fieldSize].marginSize};
    width: 100%;
    height: 100%;
    background: transparent;
    transition: all 0.3s;
    border: none;
    font-size: ${textfieldStyles[props.fieldSize].inputFontSize};
    color: ${props.disabled
      ? theme.color.greyScale[500]
      : props.fieldState !== 'normal'
      ? theme.color[props.fieldState][500]
      : props.isColoredLabel && theme.color[props.color][900]};
    :focus {
      outline: none;
    }
  `
);

export const StateText = styled.div<{
  size: TextfieldSize;
  fieldState: ValidationState;
}>(
  (props) => css`
    position: absolute;
    opacity: ${props.fieldState === 'normal' ? `50%` : `100%`};
    margin-left: 0.75rem;
    font-size: ${textfieldStyles[props.size].activeFontSize};
    ${bottomTextStyles[props.fieldState]};
  `
);
