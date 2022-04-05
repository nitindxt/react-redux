import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
// import ThemeContext from "./ThemeContext"; // remove for redux's connect
import { connect, useSelector } from "react-redux";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");
  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          {/* {<ThemeContext.Consumer>} remove for redux
            {([theme]) => (*/}

          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            {/*earlier backgroundColor: theme */}
            Adopt {name}
          </button>
          {/* )} */}
          {/* {</ThemeContext.Consumer>} */}
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
//old way of passing props in redux
const mapStateToProps = ({ theme }) => ({ theme });
//above func syntax
/* 
function(props){
  return {theme: props.theme}
}
*/
//make a wrapper in redux
const ReduxWrappedDetails = connect(mapStateToProps)(Details);
//above API syntax is like connect(mapStateToProps) returns a functin which then is invoked by (Details)... older days of react :)

const WrappedDetails = () => {
  const params = useParams();
  // const theme = useSelector();
  return (
    <ErrorBoundary>
      <ReduxWrappedDetails params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
