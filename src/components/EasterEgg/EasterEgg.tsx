import React, { useState, useCallback } from 'react'
import { FallingPanthers, FallingPanthersProps, useKonamiCheatCode } from '@unityswap/uikit'

const EasterEgg: React.FC<FallingPanthersProps> = (props) => {
  const [show, setShow] = useState(false)
  const startFalling = useCallback(() => setShow(true), [setShow])
  useKonamiCheatCode(startFalling)

  if (show) {
    return (
      <div onAnimationEnd={() => setShow(false)}>
        <FallingPanthers {...props} />
      </div>
    )
  }
  return null
}

export default React.memo(EasterEgg)
