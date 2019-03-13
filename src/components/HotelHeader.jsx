import React, { Component } from "react";
import styles from '../styles/index.scss';
//import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default class HotelHeader extends Component {
    constructor() {
        super();
        this.state = {
            RoomsAvailable: "",
            ReservedRooms: "",
            CheckedIn: "",
            isLoading: true
        };
    }

    componentDidMount() {
        this.getGeneralInfo();
    }

    getGeneralInfo = e => {
        axios.get("https://interview-booking-api.herokuapp.com/api/booking-snapshot").then(res => {
            this.setState({
                RoomsAvailable: res.data.availableRooms,
                ReservedRooms: res.data.reservedRooms,
                CheckedIn: res.data.checkedIn,
                isLoading: false
            });
        });
    }

    render() {
        return (
            this.state.isLoading ?
                <div className="Loading">Loading General Info</div> :
                <div className={styles.app}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4" >
                                <div className="headerStyle">{this.state.RoomsAvailable}</div>
                                <div className="Rooms-available">Rooms available</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="headerStyle">{this.state.ReservedRooms}</div>
                                <div className="Reserved-rooms">Reserved rooms</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="headerStyle">{this.state.CheckedIn}</div>
                                <div className="Checked-in">Checked in</div>
                            </div>
                        </div>
                        <div className="Line"></div>
                    </div>
                </div>
        );
    }
}
