import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzVlUptakeAmongAlHivEnrolledInOtzBySex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzVlUptakeAmongAlHivEnrolledInOtzBySex.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOtzVlUptakeAmongAlHivEnrolledInOtzBySex());
    }
}

export const fetchOtzVlUptakeAmongAlHivEnrolledInOtzBySex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_VL_UPTAKE_AMONG_ALHIV_ENROLLED_IN_OTZ_BY_SEX_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getVlUptakeAmongAlHivEnrolledInOtzBySex', params);
    dispatch({ type: actionTypes.CT_OTZ_VL_UPTAKE_AMONG_ALHIV_ENROLLED_IN_OTZ_BY_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
