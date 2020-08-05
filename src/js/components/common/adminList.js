import province from '../../../data/province.json';
import dsitrict from '../../../data/district.json';
import municiplaity from '../../../data/municipality.json';

export const provinceLists = () => {
  const tempList = province.map(p => ({
    id: p.FIRST_PROV,
    name: p.prov_name,
    code: p.FIRST_PROV,
    label: p.prov_name,
    value: p.FIRST_PROV,
  }));
  tempList.unshift({ label: 'All Province', value: 'all' });
  return tempList;
};

export const districtLists = () => {
  const tempList1 = dsitrict.map(p => ({
    id: p.districtid,
    name: p.name,
    n_code: p.districtid,
    label: p.name,
    province_code: p.provinceid,
    code: p.districtid,
    value: p.districtid,
  }));
  tempList1.unshift({ label: 'All District', value: 'all' });
  return tempList1;
};

export const municipalityLists = () => {
  const tempList5 = municiplaity.map(p => ({
    code: p.munid,
    district_code: p.districtid,
    id: p.munid,
    name: p.lu_name,
    province_code: p.state,
    label: p.lu_name,
    value: p.munid,
  }));

  tempList5.sort(function(a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  tempList5.unshift({ label: 'All Municipality', value: 'all' });

  return tempList5;
};

export const districtListByProvince = (provinces, districts) => {
  const filteredDistricts = [];

  const dis = districtLists();
  dis.shift();

  provinces.map(pro => {
    dis.map(district => {
      if (district.province_code === pro.code) {
        filteredDistricts.push(district);
      }
      return true;
    });
    return true;
  });

  filteredDistricts.unshift({ label: 'All District', value: 'all' });
  return filteredDistricts;
};

export const muniByDistrict = (districts, munis) => {
  const filteredMunis = [];

  const tempMuni = municipalityLists();
  tempMuni.shift();

  districts.map(district => {
    tempMuni.map(muni => {
      if (muni.district_code === district.code) {
        filteredMunis.push(muni);
      }
      return true;
    });
    return true;
  });

  filteredMunis.unshift({ label: 'All Municipality', value: 'all' });
  return filteredMunis;
};
