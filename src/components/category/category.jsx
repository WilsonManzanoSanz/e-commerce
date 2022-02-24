import React from 'react';
import styles from './category.module.scss';

export default function ({ category, openEditCard }) {
    return (<div className={styles.menuItem} key={category.id} onClick={() => openEditCard(category)}>
        <div className={styles.backgroundImage} style={{
            backgroundImage: `url(${category.photoUrl})`
        }}></div>
        <div className={styles.content}>
            <div className={styles.title}>{category.category.toUpperCase()}</div>
        </div>
    </div>)
}