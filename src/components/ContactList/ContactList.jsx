import { getFilter } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPhoneBookValue } from "redux/phoneBookSlice";
import { delContactThunk, getContactsThunk } from "api/api";
import { useEffect } from "react";
import { ContactsList, Contact, ButtonRemove } from "./ContactList.styled";

export const ContactList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContactsThunk())
    }, [dispatch]);

    const phoneBook = useSelector(getPhoneBookValue);
    const filterPhoneBook = useSelector(getFilter);

    const lowerFilter = filterPhoneBook.toLowerCase().trim();
    const visibleContacts = phoneBook.filter(({ name }) =>
        (name.toLowerCase().includes(lowerFilter)));
  
    const deleteContact = (contactId) => {
        dispatch(delContactThunk(contactId))
    };

    return (
        <ContactsList>
            {visibleContacts.map(({ name, number, id }) => (
                <Contact key={id}>
                    <p>{name}: {number}</p>
                    <ButtonRemove type="button" onClick={() => deleteContact(id)}>Delete</ButtonRemove>
                </Contact>))}
        </ContactsList>
    );
};