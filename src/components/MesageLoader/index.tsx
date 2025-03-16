import styles from '../../styles/messageloader.module.scss';

const MessageLoader = () => {
    
    return (
        <div className={styles.loaderWrapper}>
            <span className={styles.loaderBubble}>.</span>
            <span className={styles.loaderBubble}>.</span>
            <span className={styles.loaderBubble}>.</span>
            <span className={styles.loaderBubble}>.</span>
        </div>
    )
}

export default MessageLoader