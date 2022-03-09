import React from 'react'
import { useRecoilValue } from 'recoil'
import { scoreState } from '../gameState'

const UI = () => {

    const score = useRecoilValue(scoreState);

    return (
        <div style={{color: "white", position: "absolute", top: "0", left: "0", margin: "40px 80px"}}>
        <h1>`Score: ${score}`</h1>
</div>
    )
}

export default UI
