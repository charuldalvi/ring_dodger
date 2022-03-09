import create from 'zustand'


const useStore = create(set => ({
    score: 0,
    lifeline: 3,
    resetScore: () => set(state => ({score: state.score = 0})),
    incrementScore: () => set(state => ({score: state.score + 10})),
    resetLifeline: () => set(state => ({lifeline: state.lifeline = 3})),
    decrementLifeline: () => set(state => ({lifeline: state.lifeline - 1})),
    incrementtLifeline: () => set(state => ({lifeline: state.lifeline + 1})),
    reset: false,
    setResetTrue: () => set(state => ({reset: true})),
    setResetFalse: () => set(state => ({reset: false})),
    nextlevel: false,
    setNextLevel: () => set(state => ({nextlevel: true})),
    setNextLevelFalse: () => set(state => ({nextlevel: false}))
}))

export default useStore
