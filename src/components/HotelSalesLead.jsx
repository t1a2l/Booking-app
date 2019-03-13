import React, { Component } from "react";
import styles from '../styles/index.scss';
import axios from 'axios';

export default class HotelSalesLead extends Component {
    constructor() {
        super();
        this.state = {
            BookingsArr: [],
            SalesArr: [],
            top3Arr: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.getSalesInfo();
    }

    getSalesInfo = e => {
        axios.get("https://interview-booking-api.herokuapp.com/api/bookings").then(res => {
            this.setState({
                BookingsArr: res.data,
                isLoading: false
            }, this.getLeadSales)
        });
    }

    formatDate = date => {

        let dateArr = date.split("-");
        if (dateArr[0] < 10) {
            dateArr[0] = '0' + dateArr[0];
        }
        if (dateArr[1] < 10) {
            dateArr[1] = '0' + dateArr[1];
        }
        return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    }

    getLeadSales = e => {
        let hotelBookings = this.state.BookingsArr;
        let sales = this.state.SalesArr;
        hotelBookings.forEach(element => {
            let checkInDate = this.formatDate(element.checkInDate);
            let checkOutDate = this.formatDate(element.checkOutDate);
            let date1 = new Date(checkInDate).getTime();
            let date2 = new Date(checkOutDate).getTime();
            let msec = date2 - date1;
            let hours = Math.floor((msec / 60000) / 60);
            if (element.hasOwnProperty('employee')) {
                let id = element.employee.id;
                let res = sales.find(item => {
                    return item.id === id
                });
                if (!res) {
                    let salesman = {
                        id: id,
                        firstName: element.employee.firstName,
                        lastName: element.employee.lastName,
                        profileImageUrl: element.employee.profileImageUrl,
                        hours: hours
                    }
                    sales.push(salesman);
                } else {
                    res.hours = res.hours + hours;
                }
            }
        });
        sales.sort((a, b) => (a.hours > b.hours) ? -1 : ((b.hours > a.hours) ? 1 : 0));
        this.setState({
            SalesArr: sales,
            top3Arr: [...this.state.top3Arr, sales[0], sales[1], sales[2]]
        })
    }

    render() {
        return (
            this.state.isLoading ?
                <div className="Loading">Loading Employee Stats</div> :
                <div className={styles}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1">
                                <div className="Employee-stats">Employee stats</div>
                            </div>
                        </div>
                        {
                            this.state.top3Arr.map((item, i) => {
                                let lastName = item.lastName.slice(0, 1) + ".";
                                let Index = item.profileImageUrl.lastIndexOf(".");
                                let image1 = [item.profileImageUrl.slice(0, Index), "@2x", item.profileImageUrl.slice(Index)].join('');
                                let image2 = [item.profileImageUrl.slice(0, Index), "@3x", item.profileImageUrl.slice(Index)].join('');
                                return (
                                    <div key={i} className="row">
                                        <div className="col-sm-1">
                                            <img alt="" src={item.profileImageUrl} srcSet={`${image1} 2x,${image2} 3x`} className="Bitmap"></img>
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="employee">{item.firstName} {lastName}</div>
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="-hours">{item.hours} hours</div>
                                        </div>
                                        <div className="col-sm-6">

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        );
    }
}
