import province from '../../../data/province.json';
import dsitrict from '../../../data/district.json';

export const provinceLists = () => {
  const tempList = province.map(p => ({
    id: p.FIRST_PROV,
    name: p.prov_name,
    code: p.FIRST_PROV,
    label: p.prov_name,
    value: p.FIRST_PROV,
  }));
  console.log('sacascasc', tempList);
  tempList.unshift({ label: 'All Province', value: 'all' });
  return tempList;
};

export const districtLists = () => {
  const tempList1 = dsitrict.map(p => ({
    id: p.FIRST_PROV,
    name: p.prov_name,
    code: p.FIRST_PROV,
  }));

  return tempList1;
};
