import React from 'react';

// import './styles/index.styl';

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this._setupState(props, true);

    this._moveStep = this._moveStep.bind(this);
    this._printNav = this._printNav.bind(this);

    // Call onStepChange for first time
    this.props.onStepChange(this.state.currentPage);
  }

  _setupState(props, init = false) {
    const state = {
      currentPage: props.currentPage
    }

    if (init) {
      this.state = state;
    } else {
      this.setState(state);
    }
  }

  componentWillReceiveProps(nextProps) {
    this._setupState(nextProps);
  }

  render() {
    let { currentPage } = this.state;
    let { children } = this.props;
    return (
      <div className="steps-component">
        <div className="steps-content">
          {
            this._printSteps(children, currentPage)
          }

          <ul className="steps-navigator">
            {
              this._printStepsLabel(children, currentPage)
            }
          </ul>
        </div>
          {/*{
            this._printNav(currentPage, children.length)
          }*/}
      </div>
    );
  }

  _printStepsLabel(children, currentPage) {
    return (
      React.Children.map(children, (child, index) => {
        let isActive = index + 1 === currentPage ? 'active-step' : '';
        let { customNavigator } = child.props;
        return (
          <li key={index} className={isActive} onClick={() => {this._moveStep(index + 1)}}>
            {/*{customNavigator ? customNavigator : index + 1}*/}
          </li>
        )
      })
    )
  }

  _printSteps(children, currentPage) {
    return (
      React.Children.map(children, (child, index) => {
        let stepNumber = index + 1;
        let isSibling = currentPage + 1 === stepNumber || currentPage - 1 === stepNumber;
        let settings = {
          key: index,
          index,
          stepNumber: stepNumber,
          isActive: currentPage === stepNumber,
          isSibling: this.props.mountOnlySiblings ? isSibling : true
        };
        return (
          // child.type === <Step/>
          <child.type {...settings}>
            {child.props.children}
          </child.type>
        );
      })
    )
  }

  _printNav(currentPage, childrenLength) {
    return (
      <div className="steps-nav">
        <button
          className="steps-nav-prev"
          onClick={() => {this._moveStep(currentPage - 1)}}
          disabled={currentPage === 1}
        >
          {this.props.prevButton}
        </button>
        <button
          className="steps-nav-next"
          onClick={() => {this._moveStep(currentPage + 1)}}
          disabled={currentPage === childrenLength}
        >
          {this.props.nextButton}
        </button>
      </div>
    )
  }

  _moveStep(step) {
    if (this.props.stepShouldChange()) {
      this.setState({
        currentPage: step
      });
      this.props.onStepChange(step);
    }
  }
}

Wizard.propTypes = {
  currentPage: React.PropTypes.number,
  stepShouldChange: React.PropTypes.func,
  onStepChange: React.PropTypes.func,
  mountOnlySiblings: React.PropTypes.bool
};

Wizard.defaultProps = {
  currentPage: 1,
  stepShouldChange: () => {return true;},
  onStepChange: () => {},
  prevButton: 'Prev',
  nextButton: 'Next',
  mountOnlySiblings: false
};
