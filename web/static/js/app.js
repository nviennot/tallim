const $ = jQuery

class Schools extends React.Component {
  componentDidMount() {
    $.get(this.props.source, result => {
      // if (this.isMounted()) {
        this.setState({
          schools: result
        })
      // }
    }.bind(this))
  }

  render() {
    const lis = (this.state || {schools:[]}).schools.map(school => <li>{school.name}</li>)
    return <ul>{lis}</ul>
  }

  getInitialState() {
    return {
      schools: []
    }
  }
}

React.render(
  <Schools source="/schools" />,
  $("#content")[0]
)
