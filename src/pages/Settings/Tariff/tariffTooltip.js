import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import {
    Icon
} from 'material-ui';

const TariffTooltip = ({data}) => {

    const {
        special_tariff_name
    } = data

    return (
        <div style={styles.container}>
            <a data-tip data-for='tariffTooltip'> <Icon style={styles.icon}>info</Icon> </a>
            <ReactTooltip
                className="tariffTooltip"
                place="right"
                effect="float"
                id='tariffTooltip'>
                <p className="tariffTooltip-tariff-name">{special_tariff_name}</p>
                <div className="tariffTooltip-info-container">
                    <div className="tariffTooltip-info-child-container">
                        <p>Condition</p>
                        <p className="indented">User Type: JLC</p>
                    </div>
                    <div className="tariffTooltip-info-child-container">
                        <p>Applied Tariff</p>
                        <p className="indented">Flat Tariff: Rp: 5.000</p>
                    </div>
                </div>
            </ReactTooltip>
        </div>
    )
}

const styles = {
    container: {
        display: 'inline',
        paddingLeft: 10
    },
    icon: {
        fontSize: 18
    }
}

export default TariffTooltip;