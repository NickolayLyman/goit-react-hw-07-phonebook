import ContactsList from './components/ContactsList';
import ContactsFilter from './components/ContactsFilter';
import ContactForm from './components/ContactForm';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getVisibleContacts } from './redux/selectors';
import { fetchContacts } from './redux/operations';

import 'react-toastify/dist/ReactToastify.css';
import Button from './components/Button';
import Modal from './components/Modal';
import st from './App.module.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const contacts = useSelector(getContacts);
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const togleModal = () => setShowModal(!showModal);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={st.container}>
      <h1 className={st.title}>PHONEBOOK</h1>
      <Button onClick={togleModal} className={st.btn} value="Add  contact" />
      {showModal && (
        <Modal onClose={togleModal}>
          <ContactForm onClose={togleModal} />
        </Modal>
      )}
      <h2 className={st.subtitle}>Contacts</h2>
      {contacts.length > 1 && <ContactsFilter />}
      {visibleContacts.length > 0 && <ContactsList />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
      />
    </div>
  );
}

export default App;
