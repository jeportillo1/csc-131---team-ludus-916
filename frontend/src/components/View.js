import React from "react";
import CategoryCards from "./Cards/CategoryCards";
import EntityCards from "./Cards/EntityCards";
import WinnerCards from "./Cards/WinnerCards";
import YearCards from "./Cards/YearCards";
import DefaultCards from "./Cards/DefaultCards";
import Master from "./fields/Master";
// import CategoryFields from "./fields/CategoryFields";
// import EntityFields from "./fields/EntityFields";
// import WinnerFields from "./fields/WinnerFields";
// import YearFields from "./fields/YearFields";

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      area: "",
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChangeInput(event) {
    this.setState({ value: event.target.value });
  }

  handleChangeSelect(event) {
    this.setState({ area: event.target.value });
  }

  dropdownFields() {
    let data = ["Choose your field", "category", "winner", "year", "entity"];
    let htmlString = "";
    data.forEach((item, index) => {
      htmlString += `<option value="${item}">${item}</option>"`;
    });
    return htmlString;
  }

  dropdownInput() {
    // ! make an if that changes the list object 'data' based on the state of the map object 'area'
    let data = [];
    switch (this.state.area) {
      case "winner":
        data = Master.info.winner;
        break;

      case "category":
        data = Master.info.category;
        break;

      case "year":
        data = Master.info.year;
        break;

      case "entity":
        data = Master.info.entity;
        break;

      default:
        data = [];
        break;
    }
    let htmlString = '<option value="Select a Field">Select a Field</option>';
    data.forEach((item, index) => {
      htmlString += `<option value="${item}">${item}</option>"`;
    });
    return htmlString;
  }

  getContent() {
    switch (this.state.area) {
      case "category":
        return <CategoryCards value={this.state.value} />;

      case "entity":
        return <EntityCards value={this.state.value} />;

      case "year":
        return <YearCards value={this.state.value} />;

      case "winner":
        return <WinnerCards value={this.state.value} />;

      default:
        return <DefaultCards value={this.state.value} />;
    }
  }

  // Change input to select where values are based on the diffrent values in the
  // diffrent options
  render() {
    // figure this out
    let renderHtml = this.dropdownFields();
    let renderHtml2 = this.dropdownInput();
    return (
      <div>
        <div class="row section1">
          <div class="col-md-12 main-navigation-con">
            <nav class="navbar main-navigation">
              <div class="container-fluid">
                <div class="navbar-header">
                  <button
                    type="button"
                    class="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#myNavbar"
                  >
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  {/* error here */}
                  <a
                    class="navbar-brand"
                    href="https://www.youtube.com/watch?v=oHg5SJYRHA0"
                  >
                    Ludus 916
                  </a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                  <ul class="nav navbar-nav">
                    <li class="active">
                      <a href="https://github.com/BalmaBrian/csc-131---team-ludus-916">
                        Oscar Api on Github
                      </a>
                    </li>
                    <li>
                      <a href="https://balmabrian.github.io/csc-131---team-ludus-916/">
                        Full Api Documentation
                      </a>
                    </li>
                    <li>
                      <a href="./AllRoutes.html">Tests on Routes</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h3>
                  Welcome to the Ludus 916 Bank of Oscar Nominations
                  <div>
                    <small>
                      If you want to find an oscar, you can search by entity,
                      year, category, and even winner.It might take a while to
                      load. If you want to make more complex searches please
                      check out our Documentation page on Github or our
                      Documentation website. You can also check our tests web
                      page to see real time unit testing.
                    </small>
                  </div>
                </h3>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="signup-form">
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <label>
                        Choose the Document Field of Interest:
                        <select
                          class="custom-select"
                          value={this.state.area}
                          onChange={this.handleChangeSelect}
                          dangerouslySetInnerHTML={{ __html: renderHtml }}
                        ></select>
                      </label>
                      <br />
                      <br />
                      <label>
                        Choose the Information of Interest:
                        <select
                          class="custom-select"
                          value={this.state.value}
                          onChange={this.handleChangeInput}
                          dangerouslySetInnerHTML={{ __html: renderHtml2 }}
                        ></select>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}
