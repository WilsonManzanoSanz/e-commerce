import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner/spinner.component';
import './shipping-form.style.scss';

class ShippingForm extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {...{
            displayName: '',
            phone: '',
            address: '',
            city: 0,
            department: '',
            newpassword:'',
            confirmPassword: '',
            validationMessage: '',
            idCard: 0,
            age: 0,
            departments: [],
            cities: [],
            loadingCities: false,
        }, ...this.props.info};
    }

    componentDidMount(){
        this.getDeparments();
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleChangeDeparment = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
        this.getCities(value);
    };

    getDeparments = async () => {
        try{
            let response = await fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json?$group=departamento&$select=departamento,MAX(c_digo_dane_del_departamento)&$order=departamento')
            const json = await response.json();
            this.setState({
                departments: json
            })
            if(this.state.department){
                this.getCities(this.state.department);
            }
            return json;
        } catch(error){
            console.error(error);
        }
    }

    getCities = async (departmentId) => {
        try{
            this.setState({loadingState: true});
            let response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?$where=c_digo_dane_del_departamento=${departmentId}&$select=municipio, c_digo_dane_del_municipio&$order=municipio`)
            const json = await response.json();
            this.setState({
                cities: json
            });
            this.setState({loadingState: false});
            return json;
        } catch(error){
            console.error(error);
            this.setState({loadingState: false});
        }
    }

    saveFile(){
        const inputFile = document.getElementById('category-image');
        inputFile.click();
    }
    
    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state, this.file);
    }
    
    render(){
        const { loading = {} } = this.props;
        const { departments, cities } = this.state;
        return(<form className="form-profile" id="user-form" onSubmit={this.submitForm}>
                    <FormInput name="displayName" type="text" label="Your full name" value={this.state.displayName} handleChange={this.handleChange} required/>
                    <FormInput name="phone" type="text" label="Your cellphone number" value={this.state.phone} handleChange={this.handleChange}/>
                    <FormInput name="address" type="text" label="Your full address" value={this.state.address} handleChange={this.handleChange}/>
                    <FormInput name="idCard" type="text" label="Your ID Card" value={this.state.idCard} handleChange={this.handleChange}/>
                     <FormControl>
                        <InputLabel id="label-select-department">Department</InputLabel>
                        <Select
                            labelId="label-select-department"
                            id="select-department"
                            value={`${this.state.department}`}
                            onChange={this.handleChangeDeparment}
                            name="department"
                            >
                            {   
                                departments.map((value, idx) => <MenuItem key={idx} value={value.MAX_c_digo_dane_del_departamento}>{value.departamento}</MenuItem>)
                                
                            }
                        </Select>
                    </FormControl>
                    
                    <FormControl>
                        <InputLabel id="label-select-city">City</InputLabel>
                        <Select
                            labelId="label-select-city"
                            id="select-city"
                            value={`${this.state.city}`}
                            onChange={this.handleChange}
                            name="city"
                            >
                            {   
                                cities.map((value, idx) => <MenuItem key={idx} value={value.c_digo_dane_del_municipio}>{value.municipio}</MenuItem>) 
                            }
                        </Select>
                    </FormControl>
                    {
                        this.props.profile && <React.Fragment>
                            <FormInput name="newpassword" type="password" label="Set your new passwrod" value={this.state.newpassword} handleChange={this.handleChange}/>
                            <FormInput name="confirmPassword" type="password" label="Repeat your new password" value={this.state.confirmPassword} handleChange={this.handleChange}/>
                        </React.Fragment>
                    }

                    {
                        /*
                        <DateInput
                            selected={this.state.date}
                            onSelect={this.handleSelect} //when day is clicked
                            onChange={this.handleChange} //only when value has changed
                        />
                        */
                    }
                    <p className="error-message">{ this.validationMessage }</p>
                    <input type="file" name="file" accept="image/*" id="category-image" style={{display:'none'}} onChange={this.onChangeHandler}/>
                    <div className="buttons">
                        { loading.loading ? (
                            <Spinner/>
                            ) : (
                                <React.Fragment>
                                       {this.props.profile && <Button classType="inverted" type="button" onClick={this.saveFile}>UPLOAD FILE</Button>}
                                        <Button type="submit">SUBMIT</Button>
                                </React.Fragment>
                            ) 
                        }
                    </div>
                </form>);
    }
}

ShippingForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    info: PropTypes.object,
    profile: PropTypes.bool,
    loading: PropTypes.bool
}

export default ShippingForm;