import React from 'react'
import './App.css';
// import FormikValidate from './components/FormikValidate'
import ValidateForm from './components/ValidateForm'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <ValidateForm />
      </div>
    )
  }
}

export default App;