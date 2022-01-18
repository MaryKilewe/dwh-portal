import SectionHeader from '../../Shared/SectionHeader';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
const OVCTabs = Loadable({ loader: () => import('./OVCTabs'), loading: Loading, delay: LOADING_DELAY });

const OVC = () => {
    const branding = { title: "OVC", description: "OVERVIEW", overview: "OVC" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'ovc') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>

            <OVCTabs />
        </div>
    );
};

export default OVC;
