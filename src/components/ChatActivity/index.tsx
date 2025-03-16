import styles from '../../styles/chatactivity.module.scss'
import React, {Fragment, memo} from "react";

interface Options {
    id?: number;
    message?: string;
}

interface Metadata {
    question?: string;
    answer?: string;
    value: string;
    type?: string;
    options: Options[];
}

interface ChatActivityProps {
    questionState?: Metadata[],
    step?: number,
    updateState: React.Dispatch<React.SetStateAction<Metadata[]>>,
    updateStep: React.Dispatch<React.SetStateAction<number>>
}

const ChatActivity = ({ questionState = [], step = 0, updateState, updateStep }: ChatActivityProps) => {
    const currentQuestion = questionState![step || 0]

    const onChangeHandler = (e: any, step: number | undefined) => {
        const revisedQuestion = [...questionState]

        if (currentQuestion.type === 'radio') {
            if (typeof step === 'number') {
                revisedQuestion[step].value = e.target.dataset["itemid"]
            }
            
            updateState(revisedQuestion)
            const curStep = step || 0
            updateStep(curStep + 1)
        } else if (currentQuestion.type === 'textbox') {

            if (typeof step === 'number') {
                revisedQuestion[step].value = e.target.value
                updateState(revisedQuestion)
            }

            if (e.which === 13) {
                updateState(revisedQuestion)
                const curStep = step || 0
                updateStep(curStep + 1)
            }
        } else if (currentQuestion.type === 'checkbox') {
            const currentChecked = e.target.checked
            const id = e.target.dataset["itemid"]
            if (currentChecked) {
                if (typeof step === 'number') {
                    if (revisedQuestion[step].value === "") {
                        revisedQuestion[step].value = id
                    } else {
                        revisedQuestion[step].value = revisedQuestion[step].value + "-" + id
                    }
                }
            } else {
                if (typeof step === 'number') {
                    const idArr = revisedQuestion[step].value.split('-')
                    const updated = idArr.filter(item => item !== id)
                    revisedQuestion[step].value = updated.join('-')
                }
            }

            updateState(revisedQuestion)

        }


    }

    const onMoveHandler = (step: number) => {
        const curStep = step || 0
        updateStep(curStep + 1)
    }

    let elements
    switch (currentQuestion?.type) {
        case "radio":
            elements = currentQuestion.options.map(item => (
                <Fragment key={`radio-${step}-${item.id}`}>
                    <div className={styles.chatActivityRadio}>
                        <input type="radio" id={`radio-${step}-${item.id}`} name={`question-${step}`} data-itemid={item.id} onChange={(e) => onChangeHandler(e, step)} />
                        <label htmlFor={item.message}>{item.message}</label>
                    </div>
                </Fragment>
            ))
            break;
        case "textbox":
            elements = <>
                <input type="textbox" className={styles.textbox} id={`textbox-${step}}`} name={`textbox-${step}}`} value={currentQuestion.value} onChange={(e) => onChangeHandler(e, step)} onKeyDown={(e) => onChangeHandler(e, step)} />
            </>
            break;
        case "checkbox":
            elements = currentQuestion.options.map(item => (
                <Fragment key={`checkbox-${step}-${item.id}`}>
                    <div className={styles.chatActivityRadio}>
                        <input type="checkbox" id={`checkbox-${step}-${item.id}`} name={`checkbox-${step}`} data-itemid={item.id} onChange={(e) => onChangeHandler(e, step)} />
                        <label htmlFor={item.message} className={styles.chatBubblesOption}> {item.message}</label>
                    </div>

                </Fragment>
            ))
            elements.push(<button  key={`checkbox-${step}-button`} onClick={(e) => onMoveHandler(step)} className={styles.updatePush}>update</button>)
            break;
        default: {
            <div></div>
        }
    }

    return (
        <Fragment>
            <div id={`chatActivity-${step}`} className={styles.chatActivityWrapper}>
                {elements}
            </div>
        </Fragment>
    )
}

export default memo(ChatActivity)