import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as treatmentOutcomesByFacilitySelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesByFacility';

const TreatmentOutcomesByPartner = () => {
    const [treatmentOutcomesByPartner, setTreatmentOutcomesByPartner] = useState({});
    const treatmentOutcomesByPartnerData = useSelector(treatmentOutcomesByFacilitySelectors.getTreatmentOutcomesByPartner);

    const loadTreatmentOutcomesByPartner = useCallback(async () => {
        setTreatmentOutcomesByPartner({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: treatmentOutcomesByPartnerData.partnerCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'DEAD', data: treatmentOutcomesByPartnerData.data[1], type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'TRANSFER OUT', data: treatmentOutcomesByPartnerData.data[4], type: 'column', color: "#142459", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LTFU', data: treatmentOutcomesByPartnerData.data[2], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'STOPPED ART', data: treatmentOutcomesByPartnerData.data[3], type: 'column', color: "#FDC538", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'ACTIVE', data: treatmentOutcomesByPartnerData.data[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [treatmentOutcomesByPartnerData]);

    useEffect(() => {
        loadTreatmentOutcomesByPartner();
    }, [loadTreatmentOutcomesByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY PARTNER*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *This indicator is computed and displayed for the last completed month.
            </div>
        </div>
    );
};

export default TreatmentOutcomesByPartner;
