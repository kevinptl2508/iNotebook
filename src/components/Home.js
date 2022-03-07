import Notes from './Notes';
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const { showAlert } = props;
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, []);

  return <div>
    {localStorage.getItem('token') && <div><AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert} /></div>}

  </div>;
};

export default Home;