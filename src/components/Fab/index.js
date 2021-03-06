import styled from 'styled-components'
import { BOX_SHADOW_1, BOX_SHADOW_2 } from 'Util/constants'

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;

  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  box-shadow: ${BOX_SHADOW_1};
  color: #fff;

  font-size: ${props => props.theme.font.size * 2}px;
  cursor: pointer;

  > * {
    position: relative;
    top: -2px;
  }

  a {
    color: inherit;
  }

  &:hover {
    box-shadow: ${BOX_SHADOW_2};
  }
`
