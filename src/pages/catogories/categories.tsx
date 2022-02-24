import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CategoryCreate from "../../components/category-create/category-create.component";
import Modal from "../../components/ui/modal/modal.component";
import { fetchCategories } from "../../redux/product/product.action";
import { selectCategories } from "../../redux/product/product.selector";
import Category from "../../components/category/category";
import { CategoryModel } from "../../core/models/category";

function Catogories(){
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const [currentCategory, setCategory] = useState(new CategoryModel("", ""));
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
        <Category category={category} openEditCard={openEditCard}></Category>
      ))}
    <Modal onClose={() => setModalOpen(false)} show={openModal}>
        <CategoryCreate onClose={() => setModalOpen(false)} initialState={currentCategory} key={categoryIdx}></CategoryCreate>
    </Modal>
    </>);
}

export default Catogories;