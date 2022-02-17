import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../core/upload';
import { fetchNewCategory, fetchUpdateCategory } from '../../redux/product/product.action';
import Button from '../button/button.component';

const CategoryCreate = ({initialState: category, onClose}: {initialState: any, onClose: Function}) => {

    const [categoryForm, setCategory] = useState(category);
    const [validationMessage, setValidationMessage] = useState('');
    let file: any = null;
    const title = categoryForm.id ? 'Edit' : 'Create';
    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if(!file && !categoryForm.photoUrl){
            setValidationMessage( 'Upload a file');
            return;
        }
        try {
            let photoUrl = categoryForm.photoUrl;
            if(file){
                const response = await uploadFile(file);
                photoUrl = response.path;
            }
            categoryForm.id ? await dispatch(fetchUpdateCategory({...categoryForm, ...{photoUrl}})) : await dispatch(fetchNewCategory({...categoryForm, ...{photoUrl}}));
            onClose(categoryForm);
            setCategory({category: ''});
        } catch (error) {
            onClose({category: ''});
        }
    }
    

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setCategory((oldCategory) => {
            return {...oldCategory, [name]: value}
        });
    };

    const saveFile = () => {
        const inputFile = document.getElementById('category-image') as HTMLInputElement;
        inputFile.click();
    }
    
    const onChangeHandler = (event: any) =>{
        file = event.target.files[0];
    }

    return (
        <div className="category-create">
            <h2 className="title">{`${title} Category`}</h2>
            <span className="description">{`${title} a new category for your product`}</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="category" type="text" label="Add your category" value={categoryForm.category} handleChange={handleChange} required/>
                <Button classType="inverted" type="button" onClick={saveFile}>UPLOAD FILE</Button>
                <p className="error-message">{ validationMessage }</p>
                <input type="file" name="file" accept="image/*" id="category-image" style={{display:'none'}} onChange={onChangeHandler}/>
                <div className="buttons">
                    <Button type="submit">SUBMIT</Button>
                </div>
            </form>
        </div>
    );
};

export default CategoryCreate;