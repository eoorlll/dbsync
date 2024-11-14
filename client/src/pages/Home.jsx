import { 
  useEffect 
} from 'react'
import DatabaseTable from '../components/DatabaseTable';
import { 
  requestStart, 
  requestSuccess, 
  requestFailure, 
  getItemsSuccess, 
  getUpdatedSuccess,
  changingStart,
  changeStringSuccess,
  changeStringFailure,
  updateLastCheck
} from '../redux/database/databaseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/pages/home.scss'

const Home = () => {
  const int = 30000;
  const readableInt = int < 60000 ? `${int / 1000} seconds` : `${Math.floor(int / 60000) } min`;
  const { changing, error: errorMessage, lastCheck } = useSelector((state) => state.database);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(requestStart());

      const res = await fetch(`http://localhost:3000/data/all`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(requestFailure("Something went wrong"));
      }
      
      if (res.ok) {
        dispatch(requestSuccess());
        dispatch(getItemsSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(requestFailure("Something went wrong"));
    }
  };

  const getUpdatedData = async () => {
    try {
      dispatch(requestStart());

      const res = await fetch(`http://localhost:3000/data/updated?time=${int}`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(requestFailure("Something went wrong"));
      }
      
      if (res.ok) {
        dispatch(requestSuccess());
        dispatch(getUpdatedSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(requestFailure("Something went wrong"));
    }
  };

  const handleChange = async () => {
    try {
      dispatch(changingStart());

      const res = await fetch('http://localhost:3000/data/random', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch(changeStringSuccess());
    
      if (res.ok) {
        dispatch(changeStringSuccess());
      } else {
        dispatch(changeStringFailure("Failed to change content"));
      }
        
    } catch (error) {
        console.log(error);
        dispatch(changeStringFailure("Something went wrong"));
    }
  }

  useEffect(() => {    
    getData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getUpdatedData();
      dispatch(updateLastCheck( Date.now()))
    }, int);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home-page page">
        <div className="container">
            <div className="home-page__header">
              <button 
                className="btn"
                type="button"
                onClick={handleChange}
                disabled={changing}
              >
                {changing ? "Loading..." : "Change one random row"}
              </button>
              <div className="home-page__info">
                <p>Changes are checked every {readableInt}. { lastCheck && `Last time checked: ${new Date(lastCheck).toLocaleString()}` }</p>
              </div>
            </div>
            {errorMessage && (
              <div className="home-page__error">
                <p>{errorMessage}</p>
              </div>
             )}
            <div className="home-page__content">
              <div className="database-table">
                <DatabaseTable />
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home