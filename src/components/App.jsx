import React, { Component } from "react";
import styles from './App.module.scss';
import HotelHeader from './HotelHeader';
import HotelSalesLead from './HotelSalesLead';

export default class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <HotelHeader></HotelHeader>
                    <HotelSalesLead></HotelSalesLead>
                </div>
            </div>
        );
    }
}
