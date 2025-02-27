import { createSelector } from 'reselect';
import _ from 'lodash';

const listUnfiltered = state => state.currentOnArtOverview.listUnfiltered;
const listFiltered = state => state.currentOnArtOverview.listFiltered;

const listUnFilteredCurrentOnArtByAge = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFilteredCurrentOnArtByAge = state => state.currentOnArtByAgeSex.listFiltered;

const filtered = state => state.filters.filtered;


export const getCurrentOnARTOver20 = createSelector(
    [listUnFilteredCurrentOnArtByAge, listFilteredCurrentOnArtByAge, filtered],
    (listUnFilteredCurrentOnArtByAge, listFilteredCurrentOnArtByAge, filtered) => {
        const list = filtered ? listFilteredCurrentOnArtByAge : listUnFilteredCurrentOnArtByAge;
        const listExcluded = list.filter(obj => obj.ageGroup !== '<1'
            && obj.ageGroup !== '1-4'
            && obj.ageGroup !== '5-9'
            && obj.ageGroup !== '10-14'
            && obj.ageGroup !== '15-19');
        return  _.sumBy(listExcluded, 'txCurr');
    }
)

export const getCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.TX_CURR ? list.TX_CURR : 0;
    }
);

export const getEligibleForVl = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.Eligible4VL ? list.Eligible4VL : 0;
    }
);

export const getHasCurrentVl = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.Last12MonthVL ? list.Last12MonthVL : 0;
    }
);

export const getVirallySuppressed = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.Last12MVLSup ? list.Last12MVLSup : 0;
    }
);

export const getLowLevelViremia = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.LowViremia ? list.LowViremia : 0;
    }
);

export const getHighViralLoad = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.HighViremia ? list.HighViremia : 0;
    }
);
