import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from "../../redux/product/product.action";
import { selectCategories } from "../../redux/product/product.selector";
import styles from './catogories.module.scss';

function Catogories(){
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (<>
       {categories.map((category) => (
        <div className={styles.menuItem} key={category.id}>
                <div className={styles.backgroundImage} style={{
                    backgroundImage: `url(${category.photoUrl})`
                }}></div>
           <div className={styles.content}>
               <div className={styles.title}>{category.category.toUpperCase()}</div>
           </div>
       </div>
      ))}
    </>);
}

export default Catogories;