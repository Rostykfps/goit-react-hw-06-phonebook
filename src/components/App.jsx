import ContactList from './ContactsList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { Container, TitleContacts, TitlePhonebook } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Container>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm></ContactForm>
      <TitleContacts>Contacts</TitleContacts>
      <Filter></Filter>
      <ContactList></ContactList>
      <ToastContainer />
    </Container>
  );
};

export default App;
