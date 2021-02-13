import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdStabilityStatusByPartner.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getStabilityStatusByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const stability = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            partners.push(list[i].partner.toUpperCase());
            stability.push(list[i].stable);
        }
        return { partners, stability };
    }
);

export const getStabilityStatusByPartnerMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const mmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            partners.push(list[i].partner.toUpperCase());
            mmd.push(list[i].mmd);
        }
        return { partners, mmd };
    }
);

export const getStabilityStatusByPartnerNonMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const nonMmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            partners.push(list[i].partner.toUpperCase());
            nonMmd.push(list[i].nonMmd);
        }
        return { partners, nonMmd };
    }
);