import { useState, useEffect } from 'react';
import ContactList from './ContactsList/ContactList';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { Container, TitleContacts, TitlePhonebook } from './App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOCAL_STORAGE_KEY = 'contacts';

const App = () => {
  const [contacts, setcontacts] = useState(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const savedContactList = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  //   const contactList = JSON.parse(savedContactList);
  //   setcontacts(contactList);
  // }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filterContacts = ({ target: { value } }) => setFilter(value);
  const createContact = data => {
    const newContact = { id: nanoid(), ...data };
    const newContactName = newContact.name.toLowerCase();

    const findContact = contacts.find(
      contact => contact.name.toLowerCase() === newContactName
    );
    if (findContact) {
      return toast.info(`${newContact.name} is already in contacts.`);
    }

    setcontacts(prevState => [newContact, ...prevState]);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setcontacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm onSubmit={createContact}></ContactForm>
      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} handleChange={filterContacts}></Filter>
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      ></ContactList>
      <ToastContainer />
    </Container>
  );
};

export default App;
