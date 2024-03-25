import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ID(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
      <Path fill="#e70011" d="M0 0h640v240H0z" />
      <Path fill="#fff" d="M0 240h640v240H0z" />
    </Svg>
  )
}

export default ID
