import * as React from "react"
import Svg, { Defs, ClipPath, Path, G, Use, Circle } from "react-native-svg"

function KR(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path fillOpacity={0.7} d="M-95.8-.4h682.7v512H-95.8z" />
        </ClipPath>
      </Defs>
      <G
        fillRule="evenodd"
        clipPath="url(#a)"
        transform="translate(89.8 .4) scale(.9375)"
      >
        <Path fill="#fff" d="M-95.8-.4H587v512H-95.8z" />
        <G transform="rotate(-56.3 361.6 -101.3) scale(10.66667)">
          <G id="c">
            <Path
              id="b"
              fill="#000001"
              d="M-6-26H6v2H-6zm0 3H6v2H-6zm0 3H6v2H-6z"
            />
            <Use xlinkHref="#b" width="100%" height="100%" y={44} />
          </G>
          <Path stroke="#fff" d="M0 17v10" />
          <Path fill="#cd2e3a" d="M0-12a12 12 0 010 24z" />
          <Path fill="#0047a0" d="M0-12a12 12 0 000 24A6 6 0 000 0z" />
          <Circle cy={-6} r={6} fill="#cd2e3a" />
        </G>
        <G transform="rotate(-123.7 191.2 62.2) scale(10.66667)">
          <Use xlinkHref="#c" width="100%" height="100%" />
          <Path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
        </G>
      </G>
    </Svg>
  )
}

export default KR
