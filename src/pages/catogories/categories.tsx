import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CategoryCreate from "../../components/category-create/category-create.component";
import Modal from "../../components/modal/modal.component";
import { Category } from "../../core/models/category";
import { fetchCategories } from "../../redux/product/product.action";
import { selectCategories } from "../../redux/product/product.selector";
import styles from './catogories.module.scss';

function Catogories(){
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const [currentCategory, setCategory] = useState(new Category("", ""));
    const [openModal, setModalOpen] = useState(false);
    const [categoryIdx, setCategoryIdx] = useState(0);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    function openEditCard(category){
        setCategory(category);
        setCategoryIdx(categoryIdx+1)
        setModalOpen(true);
    }

    return (<>
       {categories.map((category) => (
        <div className={styles.menuItem} key={category.id} onClick={() => openEditCard(category)}>
                <div className={styles.backgroundImage} style={{
                    backgroundImage: `url(${category.photoUrl})`
                }}></div>
           <div className={styles.content}>
               <div className={styles.title}>{category.category.toUpperCase()}</div>
           </div>
       </div>
      ))}
    <Modal onClose={() => setModalOpen(false)} show={openModal}>
        <CategoryCreate onClose={() => setModalOpen(false)} initialState={currentCategory} key={categoryIdx}></CategoryCreate>
    </Modal>
    </>);
}

export default Catogories;