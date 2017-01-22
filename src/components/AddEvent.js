import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { SketchPicker } from 'react-color';
import { StickyContainer, Sticky  } from 'react-sticky';
import DatePicker from 'react-datepicker';
var classNames = require('classnames');

import EventCard from './EventCard';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      valid: true,
      submitted: false,
      approved: false,
      event_info: {
        name: "MangoHacks",
        color: "#F8B93E",
        logo_url: null,
        date: {
          from: moment().hour(12).toDate().getTime(),
          to: moment().hour(12).toDate().getTime(),
        },
        event_url: null,
        host: null,
        location: null,
        event_type: "hackathon",
        venue_needed: false,
        venue_confirmed: false
      },
      contact_info: {
        name: null,
        email: null
      }
    };
  }

  handleChange(event) {
    let valid = event.is_valid;
    let value = event.value;

    value.valid = this.checkValid();
    this.setState(value);
  }

  checkValid() {
    return this.state.event_info.name != null && 
      this.state.event_info.name.trim() != "" &&
      this.state.event_info.logo_url != null &&
      this.state.event_info.logo_url.trim() != "" &&
      this.state.event_info.event_url != null &&
      this.state.event_info.event_url.trim() != "" &&
      this.state.event_info.location != null &&
      this.state.event_info.location.trim() != "" &&
      this.state.event_info.host != null &&
      this.state.event_info.host.trim() != "" &&
      this.state.contact_info.name != null &&
      this.state.contact_info.name.trim() != "" &&
      this.state.contact_info.email != null &&
      this.state.contact_info.email.trim() != ""
  }

  render() {
    return (
      <StickyContainer>
        <div className="AddEvent">
          <div className="form-wrap">
            <h3>Event Details</h3>
            <EventForm
              event_info={this.state.event_info} 
              contact_info={this.state.contact_info}
              onChange={this.handleChange}
            />
          </div>
          <div className="card-wrap">
            <div>
              <Sticky topOffset={-80}>
                <h3>Event Preview</h3>
                <EventCard 
                  info={this.state.event_info} />
              </Sticky>
            </div>
          </div>
        </div>
      </StickyContainer>
    );
  }
}

export default AddEvent;

class EventForm extends React.Component {
  constructor(props){
    super(props);

    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextInputChange(event, propkey, valkey) {
    const {onChange} = this.props;
    const prev_prop = this.props[propkey];

    let state_frag = {
      is_valid: event.is_valid,
      value: {
        [propkey]: {
          ...prev_prop,
          [valkey]: event.value
        }
      }
    };
    onChange(state_frag);
  }
  
  onDateInputChange(event, propkey, date_type) {
    const {onChange} = this.props;
    const prev_prop = this.props[propkey];

    let date_val = {
      ...prev_prop.date,
      [date_type]: event.value.toDate().getTime()
    };

    let state_frag = {
      is_valid: event.is_valid,
      value: {
        [propkey]: {
          ...prev_prop,
          ["date"]: date_val
        }
      }
    };
    onChange(state_frag);
  }

  onSubmit() {
    console.log("is valid", this.props.valid);
    console.log("do submit")
  }
  
  render() {
    return (
      <form action="#" className="EventForm">
        <div className="InputGroup">
          <label>Event Name</label>
          <TextInput 
            name="event_name"
            placeholder="Floatie"
            value={this.props.event_info.name}
            onChange={(event) => this.onTextInputChange(event, "event_info", "name")}
            required={true}
          />
        </div>
        <div className="InputGroup color">
          <label>Color</label>
          <ColorInput
            color={this.props.event_info.color}
            onChange={(event) => this.onTextInputChange(event, "event_info", "color")}
          />
        </div>
        <div className="InputGroup">
          <label>Website URL</label>
          <TextInput 
            name="event_url"
            placeholder="http://floate.io"
            value={this.props.event_info.event_url}
            onChange={(event) => this.onTextInputChange(event, "event_info", "event_url")}
            required={true}
          />
        </div>
        <div className="InputGroup">
          <label>Logo URL</label>
          <TextInput 
            name="logo_url"
            placeholder="http://floate.io/logo.png"
            value={this.props.event_info.logo_url}
            onChange={(event) => this.onTextInputChange(event, "event_info", "logo_url")}
            required={true}
          />
          <span className="helper-text">Logo must be a transparent png.</span>
        </div>
        <div className="InputGroup">
          <label>Date</label>
          <DateInput 
            date={this.props.event_info.date.from}
            onChange={(event) => this.onDateInputChange(event, "event_info", "from")}
          />
          <DateInput 
            date={this.props.event_info.date.to}
            onChange={(event) => this.onDateInputChange(event, "event_info", "to")}
          />
        </div>
        <div className="InputGroup venue">
          <label>Venue Conformation <small>(optional)</small></label>
          <CheckboxInput
            label="We require a venue."
            value={this.props.event_info.vanue_needed}
            onChange={(event) => this.onTextInputChange(event, "event_info", "venue_needed")}
          />
          { this.props.event_info.venue_needed &&
              <CheckboxInput
                label="We have secured a venue."
                value={this.props.event_info.venue_confirmed}
                onChange={(event) => this.onTextInputChange(event, "event_info", "venue_confirmed")}
              />
          }
        </div>
        <div className="InputGroup">
          <label>School or Host</label>
          <TextInput 
            name="host"
            placeholder="Institute of Tech"
            value={this.props.event_info.host}
            onChange={(event) => this.onTextInputChange(event, "event_info", "host")}
            required={true}
          />
        </div>
        <div className="InputGroup">
          <label>Location</label>
          <TextInput 
            name="location"
            placeholder="Orlando"
            value={this.props.event_info.location}
            onChange={(event) => this.onTextInputChange(event, "event_info", "location")}
            required={true}
          />, FL
        </div>
        <div className="InputGroup">
          <label>Event Type</label>
          <SelectInput 
            name="event_type"
            value={this.props.event_info.event_type}
            onChange={(event) => this.onTextInputChange(event, "event_info", "event_type")}
            required={true}
          />
        </div>
        <div className="InputGroup">
          <label>Contact Name</label>
          <TextInput 
            name="contact_name"
            placeholder="Ada Lovelace"
            value={this.props.contact_info.name}
            onChange={(event) => this.onTextInputChange(event, "contact_info", "name")}
            required={true}
          />
          <span className="helper-text">Will not be shared publicly.</span>
        </div>
        <div className="InputGroup">
          <label>Contact Email</label>
          <TextInput 
            name="email"
            placeholder="ada@lovelace.io"
            value={this.props.contact_info.email}
            onChange={(event) => this.onTextInputChange(event, "contact_info", "email")}
            required={true}
            type="email"
          />
          <span className="helper-text">Will not be shared publicly.</span>
        </div>

        <div className="button-submit">
          <button disabled={!this.props.valid} onClick={this.onSubmit()}>
            Submit for Review
          </button>
        </div>
    </form>
    )
  }
}

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: props.value || false,
      is_valid: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({
        checked: nextProps.value
      });
    }
  }
  
  handleChange(event) {
    let is_valid = true;
    let value = !this.state.checked;

    this.setState({ 
      checked: value
    });

    this.props.onChange({
      is_valid: is_valid,
      value: value
    });
  }

  render() {
    const {label} = this.props;
    const value = this.state.checked;
    
    var classes = classNames({
      'CheckboxInput': true,
      'checked': value,
    });

    return (
      <div className={classes}>
        <span className="box" onClick={(event) => this.handleChange(event)}>
          {value && <span className="inner-box"></span>}
        </span>
        <span onClick={(event) => this.handleChange(event)} className="label">{label}</span>
      </div>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: props.value || '',
      is_required: props.required,
      is_valid: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange(event) {
    let value = event.target.value;
    let is_valid = !!value.trim();

    if (this.state.is_required) {
      this.setState({
        is_valid: is_valid

      });
    }
    this.setState({ value: value  });

    this.props.onChange({
      is_valid: is_valid,
      value: value
    });
  }

  render() {
    return (
      <input 
        type={this.props.type || "text" }
        name={this.props.name}
        onChange={this.handleChange}
        placeholder={this.props.placeholder || ''}
        value={this.state.value}
        required={this.props.required || false}
      />
    )
  }
}

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "open_event"
    }  

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let val = event.target.value;
    this.setState({
      value: val
    });

    this.props.onChange({
      is_valid: true,
      value: val
    });
  }

  render() {
    return (
      <div className="SelectInput">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="hackathon">Hackathon</option>
          <option value="workshop">Workshop</option>
          <option value="conference">Conference</option>
          <option value="meetup">Meetup</option>
          <option value="open_event">Open Event</option>
        </select>
      </div>
    );
  }
}

class DateInput extends React.Component {
  constructor(props){
    super(props);

    let date = props.date ? moment(props.date) : moment();
    this.state = {
      date: date,
      displayCalendar: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleClick() {
    this.setState({ displayCalendar: !this.state.displayCalendar });
  }

  handleClose() {
    this.setState({ displayCalendar: false });
  }
  
  handleChange(date) {
    date.hour(12);
    this.setState({
      date: date
    });

    this.props.onChange({
      is_valid: true,
      value: date
    });
  }

  render() {
    const styles = {
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
    };
    return (
      <div>
        <input 
          type="text"
          name={this.props.name}
          onClick={(event) => this.handleClick()}
          value={this.state.date.format('MMM. D')} 
          readOnly
        />
        { this.state.displayCalendar ? 
            <div style={ styles.popover  }>
              <div style={ styles.cover  } onClick={ this.handleClose  }/>
              <DatePicker 
                inline 
                minDate={moment()} 
                selected={ this.state.date  } 
                onChange={ this.handleChange  } 
              />
            </div> : 
            null 
        }
      </div>
    );
  }
}

class ColorInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      displayPicker: false,
      color: props.color
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ displayPicker: !this.state.displayPicker });
  }

  handleClose() {
    this.setState({ displayPicker: false });
  }

  handleChange(color) {
    this.setState({ color: color.hex })
    this.props.onChange({
      is_valid: true,
      value: color.hex 
    });
  }

  render() {
    const styles = {
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
    };
    return (
      <div>
        <span>#</span>
        <input 
          type="text"
          name={this.props.name}
          onClick={(event) => this.handleClick()}
          value={this.state.color.slice(1)} 
          readOnly
        />
        { this.state.displayPicker ? 
            <div style={ styles.popover  }>
              <div style={ styles.cover  } onClick={ this.handleClose  }/>
              <SketchPicker color={ this.state.color  } onChange={ this.handleChange  } />
            </div> : 
            null 
        }
      </div>
    )
  }
}


