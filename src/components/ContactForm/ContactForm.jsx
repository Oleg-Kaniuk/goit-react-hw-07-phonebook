import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, getPhoneBookValue } from "redux/phoneBookSlice";
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Form, Input, Label, ButtonAdd } from "./ContactForm.styled";

export const ContactForm = () => {
    
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const phoneBook = useSelector(getPhoneBookValue);
    
    const onSubmitAddContact = (evt) => {
        evt.preventDefault();
        
        const data = { name, number };
        const obj = { ...data, id: nanoid() };

        if (newName(phoneBook, obj) !== undefined) {
            Notify.warning(`${obj.name} is already in contacts`, {
                width: '300px',
                position: 'right-top',
                timeout: 2000,
                fontSize: '20px',
            }); 
            reset();
            return;
        };

        dispatch(addContact(obj))
        
        reset();
    };

    const newName = (phoneBook, obj) => {
    return phoneBook.find(({ name }) =>
      name.toLowerCase() === obj.name.toLowerCase());
  };

    const onChangeInput = (evt) => {
        const { name, value } = evt.currentTarget;
        
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        };
    };

    const reset = () => {
        setName('');
        setNumber('');
    };
    
        return (
            <Form onSubmit={onSubmitAddContact}>
                <Label>
                    Name
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces"
                        required
                        onChange={onChangeInput}
                    />
                </Label>
                <Label>
                    Phone number
                    <Input
                        type="tel"
                        name="number"
                        value={number}
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={onChangeInput}
                    />
                </Label>
                <ButtonAdd type="submit">
                    Add contact
                </ButtonAdd>
            </Form>
        );
    }
