var React = require("react");

var NavBar = React.createClass({

    render: function() {

        var Button = this.props.showBack ?
                        <button onClick={this.props.goBack}>Back</button> :
                        null;

        return  <div className="navbar">
                    {Button}
                    <h3>{this.props.title}</h3>
                </div>;
    }
});

var ListPage = React.createClass({
    render: function() {
        var people = this.props.people.map(function(person, i) {

            return  <li key={"person"+i}
                       onClick={this.props.clickHandler.bind(null, i)}>
                            {person.name}
                    </li>;

        }.bind(this));

        return  <ul>
                  {people}
                </ul>;
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            page: "list",
            people: [{
                name: "Freddy",
                age: 25
            }, {
                name: "Joe",
                age: 25
            }, {
                name: "Superman",
                age: 25
            }],
            currentPerson: 0
        }
    },
    showPersonDetails: function(personIndex) {
        this.setState({
            page: "detail",
            currentPerson: personIndex
        });
    },
    goToListPage: function() {
        this.setState({ page: "list"});
    },
    render: function() {
        var CurrentPage,
            currentTitle = "",
            showBack = false;

        if (this.state.page === "list") {
            CurrentPage = <ListPage people={this.state.people}
                                    clickHandler={this.showPersonDetails} />;
            currentTitle = "Liste de personnes";
        }
        if (this.state.page === "detail") {
            showBack = true;
            var currentPerson = this.state.people[this.state.currentPerson];
            CurrentPage = <DetailPage person={currentPerson} />
            currentTitle = currentPerson.name;
        }

        return  <div>
                    <NavBar title={currentTitle} showBack={showBack} goBack={this.goToListPage} />
                    {CurrentPage}
                </div>
    }
});

var DetailPage = React.createClass({
    render: function() {
        return  <div>
                    <h3>L'âge du capitaine est {this.props.person.age}</h3>
                </div>
    }
});

React.render(
    <App />,
    document.body
);
