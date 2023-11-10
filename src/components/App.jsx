import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Error } from "./Error/Error";
import { Loader } from "./Loader/Loader";
import { MainContainer } from "./App.styled";
import { useSelector } from "react-redux";
import { getPhoneBookValue, getIsLoading, getError } from "redux/phoneBookSlice";

export const App = () => {
  const phoneBook = useSelector(getPhoneBookValue);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  return (
  <MainContainer>
    <h1>Phonebook</h1>
    <ContactForm />
    <h2>Contacts</h2>
    {phoneBook.length === 0 && !error && !isLoading ? "You don't have any contacts yet" : <Filter />}
    {isLoading && <Loader />}
    {error ? <Error /> : <ContactList />}
  </MainContainer>
  )
};
