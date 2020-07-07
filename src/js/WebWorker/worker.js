import { min } from 'd3';

export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;
    const { minmax, provincedata, partnershipAllData } = e.data;
    console.log(e.data);
    function CaculateCount(date, finalData, api) {
      const startDate = date[0];
      const endDate = date[1];
      // console.log(date, 'date');
      // console.log(finalData, 'finalData');
      // console.log(api, 'api');
      finalData.map((prov, i) => {
        // console.log(prov, 'prov 1st loop');
        api.map(data => {
          const parsedDate = Date.parse(data.start_date);
          if (prov.id === data.municipality_id) {
            // console.log(startDate, ' local startDate');
            // console.log(data.start_date, 'api startDate');
            // console.log(endDate, 'endDate');
            // console.log(data.start_date, 'api startDate');
            // console.log(startDate >= data.start_date, '1st date');
            // console.log(endDate <= data.start_date, '2nd date');
            if (parsedDate >= startDate && parsedDate <= endDate) {
              // console.log(data, 'data 3rd Loop');
              // console.log(data,'')
              // eslint-disable-next-line no-param-reassign
              finalData[i].count += 1;
            }
          }
          return true;
        });
        return true;
      });
      // console.log(finalData, 'finalData inside Function');
    }
    CaculateCount(minmax, provincedata, partnershipAllData);
    postMessage(provincedata);
  });
};
