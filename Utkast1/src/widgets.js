import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

// Renders an information card using Bootstrap styles
// Attributes: title
export class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

// Renders a list group item using Bootstrap styles
// Attributes: to
class ListItem extends Component {
  render() {
    return this.props.to ? (
      <NavLink className="list-group-item tabellKnapper" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    ) : (
      <li className="list-group-item">{this.props.children}</li>
    );
  }
}

// Renders a list group using Bootstrap styles
export class List extends Component {
  static Item = ListItem;

  render() {
    return <ul className="list-group">{this.props.children}</ul>;
  }
}

// Renders a row using Bootstrap styles
export class Row extends Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

// Renders a column with specified width using Bootstrap styles
// Properties: width, right
export class Column extends Component {
  render() {
    return (
      <div
        className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
      >
        {this.props.children}
      </div>
    );
  }
}

// Renders a NavBar link using Bootstrap styles
// Attributes: exact, to
class NavBarLink extends Component {
  render() {
    return (
      <NavLink className="nav-link fontNavbarLink" activeClassName="active" exact={this.props.exact} to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

// Renders a NavBar using Bootstrap styles
// Attributes: brand
export class NavBar extends Component {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-secondary navbar-dark fontNavbar">
        {
          <NavLink className="navbar-brand logo" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
        }
        <ul className="navbar-nav">{this.props.children}</ul>
      </nav>
    );
  }
}

class NavColLink extends Component {
  render() {
    return (
      <NavLink
        id="fontSideMenyen"
        className="nav-link fontSideMeny"
        data-toggle="pill"
        activeClassName="active"
        exact={this.props.exact}
        to={this.props.to}
      >
        {this.props.children}
      </NavLink>
    );
  }
}

export class NavCol extends Component {
  static Link = NavColLink;

  render() {
    return (
      <div
        className="nav flex-column nav-pills sideMeny bg-light"
        id="v-pills-ta"
        role="tablist"
        aria-orientation="vertical"
      >
        <ul className="navbar-nav">{this.props.children}</ul>
      </div>
    );
  }
}

class TableInput extends Component {
  render() {
    return (
      <td>
        <input type="text" className="form-control-plaintext" value={this.props.children} kundenr={this.props.knr} />
      </td>
    );
  }
}
class TableRad extends Component {
  render() {
    return <tr>{this.props.children}</tr>;
  }
}

export class Table extends Component {
  static Rad = TableRad;
  static Input = TableInput;

  render() {
    return (
      <table className="table table-striped table-bordered table-condensed  " id={this.props.id}>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

// Renders a success button using Bootstrap styles
// Attributes: onClick
class ButtonSuccess extends Component {
  render() {
    return (
      <button type="button" id={this.props.id} className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Renders a danger button using Bootstrap styles
// Attributes: onClick
class ButtonDanger extends Component {
  render() {
    return (
      <button type="button" id={this.props.id} className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonDangerOutline extends Component {
  render() {
    return (
      <button type="button" className="btn btn-outline-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Renders a light button using Bootstrap styles
// Attributes: onClick
class ButtonLight extends Component {
  render() {
    return (
      <button type="button" id={this.props.id} className="btn btn-light" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonInfo extends Component {
  render() {
    return (
      <button type="button" id={this.props.id} className="btn btn-info" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonPrimary extends Component {
  render() {
    return (
      <button type="button" id={this.props.id} className="btn returnKnapp" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// export class SelectSearch extends Component {
//   $('#select-kunde').selectize(options);
// }

// Renders a button using Bootstrap styles
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static DangerOl = ButtonDangerOutline;
  static Light = ButtonLight;
  static Info = ButtonInfo;
  static Primary = ButtonPrimary;
}

// Renders a form label using Bootstrap styles
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

// Renders a form input using Bootstrap styles
// Attributes: type, value, onChange, required, pattern
class FormInput extends Component {
  render() {
    return (
      <input
        className="form-control"
        id={this.props.id}
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        required={this.props.required}
        pattern={this.props.pattern}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
      />
    );
  }
}

// Renders form components using Bootstrap styles
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
}
