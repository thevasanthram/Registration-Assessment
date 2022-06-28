import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
// import CascadingDropdown from './CascadingDropdown';

function validEmailRegex(value) {
  console.log('entering function');
  var emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailPattern.test(value);
}

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState('');
  const [state, setState] = useState([]);
  const [stateid, setStateid] = useState('');
  const [city, setCity] = useState([]);
  const [errors, setError] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries/flag/unicode')
      .then((response) => {
        setCountry(response.data.data);
      });

    console.log('country: ', country);
  }, []);

  const ChangeState = async (e) => {
    // console.log('entering');
    setCountryid(e.target.value);
    console.log('country name: ', countryid);

    axios
      .get('https://countriesnow.space/api/v0.1/countries/states', countryid)
      .then((response) => {
        setState(response.data.data);
      });

    console.log('state: ', state);
  };

  const ChangeCity = async (e) => {
    setStateid(e.target.value);

    axios
      .get('https://countriesnow.space/api/v0.1/countries/states', {
        country: countryid,
      })
      .then((response) => {
        setCity(response.data.data);
      });

    console.log('city: ', city);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const error = errors;
    switch (name) {
      case 'name':
        error.name =
          value.length > 30
            ? 'Full Name must be lesser than 30 characters!'
            : '';
        setName(value);
        break;
      case 'email':
        console.log('entering');
        error.email = validEmailRegex(value) ? '' : 'Email is not valid!';
        setEmail(value);
        break;
      case 'mobile':
        error.mobile =
          value.length == 10 &&
          (value[0] == 9 || value[0] == 8 || value[0] == 7 || value[0] == 6)
            ? ''
            : 'Mobile number must be 10 digits & starts with 9,8,7,6!';
        setMobile(value);
        break;
      default:
        break;
    }

    setError({ ...errors, [name]: error[`${name}`] });
    console.log(errors);
  };

  return (
    <div className='App'>
      <div class='form'>
        <h1>Registration</h1>
        <hr></hr>
        <form>
          <div class='form-group'>
            <label for='exampleInputName1'>Name</label>
            <input
              type='text'
              class='form-control'
              id='exampleInputName1'
              name='name'
              aria-describedby='nameHelp'
              placeholder='Enter name'
              value={name}
              onChange={handleChange}
              required
            />
            {errors.name.length > 0 && <span class='error'>{errors.name}</span>}
          </div>
          <div class='form-group'>
            <label for='exampleInputEmail1'>Email address</label>
            <input
              type='email'
              name='email'
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              onChange={handleChange}
              required
            />
            {errors.email.length > 0 && (
              <span class='error'>{errors.email}</span>
            )}
          </div>
          <div class='form-group'>
            <label for='exampleInputMobile1'>Mobile Number</label>
            <input
              type='number'
              name='mobile'
              class='form-control'
              id='exampleInputPassword1'
              required
              value={mobile}
              placeholder=' Enter mobile number'
              onChange={handleChange}
            />
            {errors.mobile.length > 0 && (
              <span class='error'>{errors.mobile}</span>
            )}
          </div>
          <div class='form-group'>
            <label for='exampleInputCountry1'>Country</label>
            <select class='custom-select' name='country' onChange={ChangeState}>
              <option>Select Country</option>
              {country.map((e, key) => {
                return (
                  <option key={key} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div class='form-group'>
            <label for='exampleInputState1'>State</label>
            <select class='custom-select' name='state' onChange={ChangeCity}>
              <option selected key={-1}>
                Select State
              </option>
              {state.map((e, key) => {
                return (
                  <option key={key} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div class='form-group'>
            <label for='exampleInputCity1'>City</label>
            <select class='custom-select' name='city'>
              <option selected>Select City</option>
              {city.map((e, key) => {
                return (
                  <option key={key} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
