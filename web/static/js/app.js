class School extends React.Component {
  render() {
    return <li>{this.props.name}</li>
  }
}

class Schools extends React.Component {
  constructor(props) {
    super(props)
    this.state = {schools: []}
  }

  componentDidMount() {
    $.get(this.props.source, result => {
      this.setState({schools: result})
    })
  }

  render() {
    return <ul>{this.state.schools.map(school =>
             <School key={school.id} {...school}/>)}
           </ul>
  }
}

React.render(
  <Schools source="/schools" />,
  $("#content")[0]
)
