import { Fragment, useEffect, useState } from "react"
import styles from '../styles/chatbot.module.scss'
import data from '../data/index.json'
import ChatActivity from "../components/ChatActivity"
import { Metadata } from "../types"
import ChatBubbleConstruction from "../components/ChatBubbleConstruction"

export const ChatBotPage = () => {
    const [state, setState] = useState<Metadata[]>(data[0].metadata.questions)
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [completedQuestion, setCompletedQuestion] = useState<Metadata[]>([])
    const [showLoader, setShowLoader] = useState<boolean>(false)

    useEffect(() => {

        if (data) {
            setState([...data[0].metadata.questions])
        }
    }, [])

    useEffect(() => {

        if (currentStep === 0) {
            setCompletedQuestion([])
        }
        if (currentStep > 0 && currentStep <= state.length) {
            // const yetToComplete = state.slice(currentStep)
            const completed = state.slice(0, currentStep)
            setCompletedQuestion(completed)
        }
    }, [currentStep])

  

    return (
        <Fragment>
            <div className={styles.chatBotPage}>
                <div className={styles.chatMessageWrapper}>
                    <ChatBubbleConstruction questions={completedQuestion} step={currentStep} showLoader={showLoader} setShowLoader={setShowLoader} state={state}/>
                </div>
                <div className={styles.chatActionWrapper}>
                    <ChatActivity questionState={state} step={currentStep} updateState={setState} updateStep={setCurrentStep} />
                </div>
            </div>
        </Fragment>
    )
}