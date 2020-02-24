import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';


// import 'bootstrap/dist/js/bootstrap.min.js'





class App extends Component {
  state = {

    inputAge: 0,
    inputName: '',
    inputGroup: '1',

    persons: [
      // { id: 'aaaaa', name: 'Max', age: 28, group: "1" },
      // { id: 'bbbbb', name: 'Manu', age: 29, group: "2" },
      // { id: 'ccccc', name: 'Stephanie', age: 26, group: "3" }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  /*
  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }*/

  addPersonHandler = () => {
    const persons = this.state.persons;
    const name = this.state.inputName;
    const age = this.state.inputAge;
    const group = this.state.inputGroup;

    const id = Date.now(); //Timestamp
    console.log(id)
    persons.unshift({ id, name, age, group });
    this.setState({ persons })
  }

  nameInputHandler = (event) => {
    // console.log(event.target.value);
    const inputName = event.target.value;
    this.setState({ inputName })

  }

  ageInputHandler = (event) => {
    // console.log(event.target.value);
    const inputAge = event.target.value;
    this.setState({ inputAge })

  }

  groupInputHandler = (event) => {
    console.log(event.target.value)
    const inputGroup = event.target.value;
    this.setState({ inputGroup })
  }




  //////////////////////////////////////////////////////////////

  deletePersonHandler = (personindex) => {
    //const persons = this.state.persons.slice; 轉陣列舊方法
    const persons = [...this.state.persons]; //es6 轉為陣列方法better
    persons.splice(personindex, 1); //delete index
    this.setState({ persons: persons })

  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;

    });

    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  togglePersonsHandler = (event) => {
    const doesshow = this.state.showPersons;
    this.setState({ showPersons: !doesshow })
  }





  // render執行後真正呈現在畫面上
  render() {

    const style = {

      backgroundColor: 'yellow',
      font: 'inherit',
      border: '1px solid black',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { //radium套件
        backgroundColor: 'lightgreen',
        color: 'black'
      }



    };
    let persons = null;





    // if (this.state.showPersons) {


    persons = (
      <div>
        {this.state.persons.map((person, index) => {
          return <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            group={person.group}
            changed={(event) => this.nameChangedHandler(event, person.id)} />
        })}
      </div>
    );
    // }



    // style.backgroundColor = 'green';
    // //radium套件
    // style[':hover'] = {
    //   backgroundColor: 'lightgreen',
    //   color: 'black'
    // }




    let classes = []; //red bold(css檔裡的class)
    // if (this.state.persons.length <= 2) {
    //   classes.push('red'); //classes = ['red']
    // }
    // if (this.state.persons.length <= 1) {
    //   classes.push('bold'); //classes = ['red','bold']
    // }

    console.log(this.state.persons)
    let formStyle = {
      margin: 'auto',
      width: '200px',
      marginBottom: '5%',
      marginTop: '2%'


    }
    let inputStyle = {
      border: '1px solid black',
      margin: '10%',
    }

    return (

      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <p className={classes.join(' ')}>我每天都要去翔哥家玩 伊耶</p>
          {/* <button
            style={style}
            onClick={this.togglePersonsHandler}>Switch Name
          </button> */}
          <div style={inputStyle}>
            <p>
              Name: <input type='text' id='name' style={{ margin: '2%' }} onChange={(event) => this.nameInputHandler(event)} />
              Age: <input type='text' id='age' onChange={(event) => this.ageInputHandler(event)} />
              {/* Group:  <input type='text' id='group' onChange={(event) => this.groupInputHandler(event)} /> */}
              <Form.Group id='group' style={formStyle} onChange={(event) => this.groupInputHandler(event)}>
                <Form.Label>Select Group</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                </Form.Control>
              </Form.Group>

              <button
                onClick={this.addPersonHandler}>
                Add Name
            </button>
            </p>
          </div>



          <Card style={{ width: '30rem', margin: 'auto' }}>
            <Card.Header>Group 1</Card.Header>
            <ListGroup variant="flush">
              {this.state.persons.map((person, index) => {
                // console.log(person.group)
                if (person.group === '1') {
                  // { console.log('第一組') }
                  return <Person
                    click={() => this.deletePersonHandler(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    group={person.group}
                    changed={(event) => this.nameChangedHandler(event, person.id)} />
                }



              })}
            </ListGroup>
          </Card>
          <Card style={{ width: '30rem', margin: 'auto', marginTop: '1%'}}>
            <Card.Header>Group 2</Card.Header>
            <ListGroup variant="flush">
              {this.state.persons.map((person, index) => {
                // console.log(person.group)
                if (person.group === '2') {
                  // { console.log('第二組') }
                  return <Person
                    click={() => this.deletePersonHandler(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    group={person.group}
                    changed={(event) => this.nameChangedHandler(event, person.id)} />
                }



              })}
            </ListGroup>
          </Card>

        </div>

      </StyleRoot>

    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}



export default Radium(App);
